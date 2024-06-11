import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Cài đặt SEO",
};

const SettingSEOLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
}

export default SettingSEOLayout;