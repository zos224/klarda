import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Quản lý Blog | Klarda",
  };

const PPManager = ({children}) => {
    return (
            <DefaultLayout>
                {children}
            </DefaultLayout>
        );
    };

export default PPManager;