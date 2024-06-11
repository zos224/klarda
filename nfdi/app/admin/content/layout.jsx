import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Quản lý nội dung | Klarda",
  };

  const ContentLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default ContentLayout;