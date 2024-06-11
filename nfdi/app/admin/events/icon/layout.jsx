import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Icon thường dùng | Klarda",
  };

const IconLayout = ({children}) => {
return (
        <DefaultLayout>
        {children}
        </DefaultLayout>
    );
};

export default IconLayout;