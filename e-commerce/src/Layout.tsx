import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}