import LinkNav from "@/components/client/LinkNav";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
export const dynamic = 'force-dynamic'
async function getLinks() {
    const res = await fetch(process.env.APP_URL + '/api/link/all', {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}
const LinksPage = async () => {
    const links = await getLinks()
    return (
        <div>
            <LinkNav />
            <div className="flex flex-col gap-3 mt-10">
                {links.map((link, index) => (
                    <div className="flex gap-3">
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                        <Link key={index} href={link.link} target="_blank">
                            {link.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LinksPage;