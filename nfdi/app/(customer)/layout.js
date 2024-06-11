import Provider from "@/components/client/Provider"
import "@/styles/globals.css"
export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Người dùng',
}

export default function CustomerLayout({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
