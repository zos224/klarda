import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Quản lý tuyển dụng | Klarda",
  };

  const PositionLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default PositionLayout;