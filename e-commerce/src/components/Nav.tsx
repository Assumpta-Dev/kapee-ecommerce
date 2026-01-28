import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import { FaUser, FaHeart, FaShoppingBag, FaEnvelope, FaQuestionCircle, FaChevronDown, FaBlog, FaBars } from "react-icons/fa"; 
import { useCart } from "../context/Cart";



function Navbar() {
   const { totalQty, totalPrice, openCart } = useCart();
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <nav className="navbar w-full  flex flex-wrap bg-blue-500 shadow-lg">
      <div className="top-nav w-full flex justify-between text-white pt-4 pr-4 pl-4 border-b border-white pb-1">
        <ul className="flex items-center w-full text-sm  gap-4 cursor-pointer">
          <li className="flex text-center border-r border-white">
            <Link to="/"></Link>
          </li>
          <li className="flex-2 text-center border-r border-white">
            <Link to="/language" className="flex gap-2">
              ENGLISH <FaChevronDown></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex-2 text-center border-r border-white">
            <Link to="/dollar" className="flex gap-1">
              $ DOLLAR <FaChevronDown></FaChevronDown>{" "}
            </Link>
          </li>
          <li className=" flex-3 text-center border-r border-white">
            <Link to="/"></Link>
          </li>
          <li className="flex-3 text-center border-r border-l border-white">
            <Link to="/welcome">WELCOME TO OUR STORE! </Link>
          </li>
          <li className="flex-1 text-center border-r border-white">
            <Link to="/blogs" className="flex gap-2">
              <FaBlog></FaBlog>BLOG
            </Link>
          </li>
          <li className="flex-1 text-center border-r border-white">
            <Link to="/faq" className="flex gap-2">
              <FaQuestionCircle></FaQuestionCircle>FAQ{" "}
            </Link>
          </li>
          <li className="flex-2 text-center border-r border-white">
            <Link to="/contact" className="flex gap-2">
              <FaEnvelope></FaEnvelope>CONTACT US{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/"> </Link>
          </li>
        </ul>
      </div>
      <div className="flex md:flex-row items-center justify-between w-full m-2 space-x-10 text-white p-4">
        <h3 className=" font-bold font-size-lg px-4 text-4xl">Kapee.</h3>
        <SearchBar />
        {/* USER ICON */}

        <button
          onClick={() => setOpenLogin(true)}
          className="text-white flex items-center gap-1 cursor-pointer"
        >
          <FaUser className="w-6 h-6" />
        </button>

        {/* LOGIN MODAL */}
        {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
        <div className="">
          <Link to="/cart" className="relative text-white flex items-center">
            <FaHeart className="w-6 h-6" />

            {/* Cart count badge */}
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
        <div className="">
          <button
            onClick={openCart}
            className="text-white flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <FaShoppingBag className="w-6 h-6" />

              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </div>

            <div className="flex flex-col leading-tight">
              <p className="text-sm">Cart</p>
              <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
            </div>
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between bg-white">
        <ul className="w-full flex items-center text-sm font-bold p-4 gap-4">
          <li className="flex text-center border-r border-white ">
            <Link to="/" className="flex gap-1"></Link>
          </li>
          <li className="flex text-center border-r border-l border-black min-h-[30px] px-4">
            <Link to="/shop" className="flex gap-2">
              SHOP BY DEPARTMENT{" "}
              <FaBars className="text-gray-400"></FaBars>{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/#" className="flex gap-1">
              HOME{" "}
              <FaChevronDown className="text-gray-400"></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/shop" className="flex gap-1">
              SHOP
              <FaChevronDown className=" text-gray-400"></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/language" className="flex gap-1">
              PAGES{" "}
              <FaChevronDown className="text-gray-400"></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/blogs" className="flex gap-1">
              BLOG{" "}
              <FaChevronDown className="text-gray-400"></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex text-center border-r border-white">
            <Link to="/language" className="flex gap-1">
              ELEMENTS{" "}
              <FaChevronDown className="text-gray-400"></FaChevronDown>{" "}
            </Link>
          </li>
          <li className="flex-1 text-center border-r border-white">
            <Link to="/dollar" className="flex gap-1">
              BUY NOW
            </Link>
          </li>
        </ul>
      </div>
      {/* Mobile Menu Button */}
      <div className="hidden md:flex  md:hidden">
        <button className="text-white">☰</button>
      </div>
    </nav>
  );
}
export default Navbar;
