import ECommerce from "@/components/admin/E-commerce.jsx";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout.jsx";
export const dynamic = 'force-dynamic'
export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
