import DefaultLayout from "@/components/admin/Layouts/DefaultLayout"
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Cài đặt chung | Klarda",
  };

const SettingLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default SettingLayout