"use client"
import Blog from "@/components/client/Blog";
import LinkNav from "@/components/client/LinkNav";
import { useEffect, useState } from "react";

const BlogPage = () => {
    const [blogCategories, setBlogCategories] = useState([])
    const [blogs, setBlogs] = useState([])
    const [currentCategory, setCurrentCategory] = useState(0)
    useEffect(() => {
        const fetchBlogCategories = async () => {
            const res = await fetch("/api/blog-category/get")
            if (res.ok) {
                const data = await res.json()
                setBlogCategories(data)
                if (data.length > 0) {
                    setCurrentCategory(data[0].id)
                }
            }
        }
        fetchBlogCategories()
    }, [])

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch("/api/blog/byCategory?id=" + currentCategory)
            if (res.ok) {
                const data = await res.json()
                setBlogs(data)
            }
        }

        if (currentCategory != 0) {
            fetchBlogs()
        }
    }, [currentCategory])
    return (
        <div>
            <LinkNav />
            <div className="flex md:flex-row flex-col mt-10 gap-20">
                <div className="flex flex-col gap-2 md:w-1/4 w-full">
                    {blogCategories.map((blogCategory, index) => (
                        <span className={`underline underline-offset-2 cursor-pointer font-semibold ${currentCategory == blogCategory.id ? "text-primary-600 decoration-primary-600" : ""}`} key={index} onClick={() => {setCurrentCategory(blogCategory.id)}}>{blogCategory.name}</span>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-20 md:w-3/4 w-full">
                    {blogs.map((blog, index) => (
                        <Blog blog={blog.blog}  numLine={4} key={index}/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default BlogPage;