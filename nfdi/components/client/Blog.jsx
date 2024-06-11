import Image from "next/image";
import Link from "next/link";
import "@/styles/ck.css"
const Blog = ({blog, numLine}) => {
    return (
        <div className="xsm:flex gap-3 rounded-md">
            <Link href={"/more/blog/" + blog.slug} className="xsm:w-1/3 w-full">
                <Image className="cursor-pointer xsm:aspect-square aspect-4/3 object-cover rounded-md hover:scale-105 duration-150" src={blog.thumb} width={400} height={200}></Image>
            </Link>
            <div className="xsm:w-2/3 w-full mt-2 xsm:mt-0">
                <div className="font-semibold">{blog.title}</div>
                <div style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: blog.content }} className={`mt-1 text-sm prose  ${numLine == 2 ? "max-h-10" : "max-h-20"} ck-content ${numLine == 2 ? "line-clamp-2" : "line-clamp-4"} `}></div>
                <Link href={"/more/blog/" + blog.slug} className="underline font-medium underline-offset-4 decoration-primary-500">
                    Đọc thêm
                </Link>
            </div>
        </div>
    );
}

export default Blog;