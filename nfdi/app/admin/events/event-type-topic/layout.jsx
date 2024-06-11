import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const dynamic = 'force-dynamic'
export const metadata = {
    title: "Thể loại - Chủ đề Sự kiện | Klarda",
  };

const EventTypeTopicLayout = ({children}) => {
return (
        <DefaultLayout>
        {children}
        </DefaultLayout>
    );
};

export default EventTypeTopicLayout;