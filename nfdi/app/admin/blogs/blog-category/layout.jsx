import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Quản lý danh mục bài viết | Klarda",
  };

const BlogCaregoryManagerLayout = ({children}) => {
    return (
            <DefaultLayout>
                {children}
            </DefaultLayout>
        );
    };

export default BlogCaregoryManagerLayout;