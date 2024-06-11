import LinkNav from "@/components/client/LinkNav";
import moment from "moment-timezone";
import Link from "next/link";
import "@/styles/ck.css"
export const dynamic = 'force-dynamic';
async function getBlog(slug) {
    const res = await fetch(process.env.APP_URL + '/api/blog/' + slug, {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}
const ViewBlogPage = async ({params}) => {
    const slug = params.slug
    const blog = await getBlog(slug)
    return (
        <div>
            <LinkNav />
            <div className="mt-10">
                <div className="text-end">
                    {moment.tz(blog.date, "Asia/Ho_Chi_Minh").format("DD/MM/YYYY")}
                </div>
                <div className="text-2xl font-extrabold">
                    {blog.title}
                </div>
                <div className="mt-7 flex gap-5 flex-wrap">
                    {blog.blogBlogCategorys.map((category, index) => (
                        <Link key={index} className="border-primary-500 text-primary-600 border px-4 py-2 rounded-md font-semibold" href={"#"}>{category.blogCategory.name}</Link>
                    ))}
                </div>
                <div style={{maxWidth: "none"}} dangerouslySetInnerHTML={{ __html: blog.content }} className="mt-10 prose ck-content"/>
            </div>
        </div>
    )
}

export default ViewBlogPage;