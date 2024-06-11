import Footer from "@/components/client/Footer"
import Navbar from "@/components/client/NavBar"
import Provider from "@/components/client/Provider"
import "@/styles/globals.css"
export const dynamic = 'force-dynamic'
const ClientLayout = ({ children }) => {
    return (
        <div>
            <Provider>
                <Navbar></Navbar>
            </Provider>
            <div className="lg:w-10/12 lg:mx-auto w-full mt-10 px-3">
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ClientLayout
