import prisma from '@/db/prisma'
import slugify from 'slugify'

export const POST = async (req) => {
    let blog = {
        title: '',
        content: '',
        date: '',
        thumb: '',
    }

    const formData = await req.formData();
    const id = parseInt(formData.get('id'))
    blog.title = formData.get('title')
    blog.content = formData.get('content')
    blog.date = new Date()
    blog.thumb = formData.get('thumb')
    const imageUpload = formData.get('image-upload')
    const blogCats = JSON.parse(formData.get('blogCats'))
    blog.slug = slugify(blog.title, {
        locale: 'vi',
        lower: true
    })

    try {
        if (imageUpload instanceof File) {
            if (blog.thumb !== '') {
                const fileName = blog.thumb.split('/').pop()
    
                await fetch(process.env.UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileName: fileName })
                })
            }
            const formData = new FormData()
            formData.append('upload', imageUpload)
            const response = await fetch(process.env.UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            blog.thumb = data.url
        }
        
        if (id) {
            const updatedblog = await prisma.Blog.update({ where: { id: id }, data: blog })
            await prisma.Blog_BlogCategory.deleteMany({where: {idBlog: id}})
            for (let i = 0; i < blogCats.length; i++) {
                const newBlog_BlogCategory = await prisma.Blog_BlogCategory.create({ data: { idBlogCategory: parseInt(blogCats[i].idBlogCategory), idBlog: id } })
            }
            if (updatedblog) {
                return new Response("OK", {status: 200})
            }
            else {
                return new Response("Không tìm thấy dự án", {status: 500})
            }
        }
        else {
            const newblog = await prisma.Blog.create({ data: blog })
            for (let i = 0; i < blogCats.length; i++) {
                const newBlog_BlogCategory = await prisma.Blog_BlogCategory.create({ data: { idBlogCategory: parseInt(blogCats[i].idBlogCategory), idBlog: newblog.id } })
            }
            if (newblog) {
                return new Response("OK", {status: 200})
            }
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}