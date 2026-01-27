import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";

export default function Layout(){
    return (
      <>
        <Navbar />
        <CartDrawer />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    );
}