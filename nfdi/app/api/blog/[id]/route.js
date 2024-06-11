import prisma from "@/db/prisma";
import fs from "fs";
export const GET = async(request, {params}) => {
    try {
        let pps;
        if (params.id == "all") {
            pps = await prisma.Blog.findMany({})
        }
        else if (params.id == 'new4') {
            pps = await prisma.Blog.findMany({take: 4, orderBy: {date: 'desc'}})
        }
        else if (params.id == "byCategory") {
            const url = new URL(request.url)
            const id = url.searchParams.get('id')
            pps = await prisma.Blog_BlogCategory.findMany({where: {idBlogCategory: parseInt(id)}, include: {blog: true}})
        }
        else if (params.id.includes("-")) {
            pps = await prisma.Blog.findFirst({where: {slug: params.id}, include: {blogBlogCategorys: {include: {blogCategory: true}}}})
        }
        else {
            pps = await prisma.Blog.findUnique({where: {id: parseInt(params.id)}, include: {blogBlogCategorys: {include: {blogCategory: true}}}})
        }
        if (pps) {
            return new Response(JSON.stringify(pps), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const Blog = await prisma.Blog.findUnique({where: {id: parseInt(params.id)}})
        const fileName = Blog.thumb.split('/').pop()
        await fetch(process.env.UPLOAD_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })
        const response = await prisma.Blog.delete({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}