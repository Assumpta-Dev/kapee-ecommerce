import PriceBadge from "../components/PriceBadge";
import { FaStar, FaHeart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import{FaExchangeAlt, FaSearch} from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import type { Product } from "../Model/product";





export const shop: Product []= [
  { id:1, img: "/1 (25).jpg", tag: "Men's Fashion", title: "Premium Leather Casual Shoes", rate: 4, price: "$99" },
  { id: 2, img: "/1 (20).jpg", tag: "Female Bags", title: "Designer Handbag Collection", rate: 4, price: "$70" },
  { id: 3, img: "/1 (19).jpg", tag: "Female pants", title: "Slim Fit Denim Jeans", rate: 4, price: "$13" },
  { id: 4, img: "/1 (40).jpg", tag: "Trouser", title: "Formal Business Trousers", rate: 4, price: "$100" },
  { id: 5, img: "/1 (17).jpg", tag: "Party wear", title: "Elegant Evening Dress", rate: 4, price: "$70" },
  { id: 6, img: "/1 (60).jpg", tag: "Girl's shoes", title: "Kids Comfort Sneakers", rate: 4, price: "$43" },
  { id: 7, img: "/1 (55).jpg", tag: "Men's complete", title: "Men's Complete Outfit Set", rate: 4, price: "$99" },
  { id: 8, img: "/1 (31).jpg", tag: "Female shoes", title: "Women's Classic Pumps", rate: 4, price: "$74" },
  { id: 9, img: "/1 (30).jpg", tag: "High hills", title: "Stiletto High Heels", rate: 4, price: "$30" },
  { id: 10, img: "/1 (74).jpg", tag: "Tops", title: "Casual Cotton T-Shirt", rate: 4, price: "$55" },
  { id: 11, img: "/1 (23).jpg", tag: "Female Pant", title: "Wide Leg Palazzo Pants", rate: 4, price: "$55" },
  { id: 12, img: "/1 (51).jpg", tag: "Men's Fashion", title: "Men Hooded Navy Blue & Grey T-Shirt", rate: 5, price: "$39" },
];
function SHOP(){
  const navigate = useNavigate();
 


return (
  <>
    {/* ===== SHOP HEADER ===== */}
    <div className="flex flex-col items-center text-center gap-2 min-h-[200px] bg-gray-100 pt-12">
      <h3 className="text-4xl font-bold text-gray-800">SHOP</h3>

      <p className="text-sm">
        <a href="/#" className="hover:text-blue-500">
          HOME
        </a>{" "}
        / SHOP
      </p>

      <PriceBadge price={39} />
    </div>

    {/* MAIN SHOP SECTION */}
    <div className="w-full border-t-2 border-blue-800 p-6">
      <div className="grid grid-cols-[280px_1fr] gap-6 min-h-[500px]">
        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-4 border-r border-gray-200">
          {/* PRODUCT CATEGORIES */}
          <div className="relative group">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <h3 className="font-bold text-lg text-gray-700 uppercase">
                Product Categories
              </h3>
              <FaChevronDown className="transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute left-0 w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
              <ul className="flex flex-col text-gray-600">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Accessories (7)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Beauty & Care (2)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Jewellery (4)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Men (7)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Jackets & Coats
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Shoes (3)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Watches (4)
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Women (9)
                </li>
              </ul>
            </div>
          </div>

          {/* PRICES DROPDOWN */}
          <div className="relative group">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <h3 className="font-bold text-lg text-gray-700 uppercase">
                Filter By Price
              </h3>
              <FaChevronDown className="transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute left-0 w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <ul className="flex flex-col text-gray-600">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Under $25
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  $25 – $50
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  $50 – $100
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  $100 – $200
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Above $200
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===== RIGHT: PRODUCTS AREA ===== */}
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <p className="text-gray-600 text-sm">
              Showing 1–12 Products of 48 Products
            </p>

            <div className="flex items-center gap-6">
              {/* View icons */}
              <div className="flex gap-2 text-blue-600 text-lg">
                <button className="hover:text-blue-800">▦</button>
                <button className="hover:text-blue-800">☰</button>
              </div>

              {/* Show dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select className="border px-2 py-1 text-sm">
                  <option>12</option>
                  <option>24</option>
                  <option>36</option>
                </select>
              </div>

              {/* Sorting */}
              <select className="border px-3 py-1 text-sm">
                <option>Default sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-6">
            {shop.map((item, index) => (
              <div
                key={index}
                className="group bg-white shadow-xl  rounded overflow-hidden"
              >
                {/* IMAGE WRAPPER */}
                <div className="relative overflow-hidden">
                  {/* Featured badge */}
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 z-10">
                    FEATURED
                  </span>

                  {/* Wishlist */}
                  <FaHeart className="absolute top-2 right-2 text-white z-10 cursor-pointer stroke-black stroke-2" />

                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"
                  />

                  {/* Hover actions */}
                  <div
                    className="
    absolute inset-x-0 bottom-0
    bg-blue-600 text-white
    flex items-center justify-evenly px-4 py-3
    translate-y-full group-hover:translate-y-0
    transition-transform duration-300
  "
                  >
                    <span
                      className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <FaExchangeAlt className="text-lg" />
                      SELECT OPTIONS
                    </span>

                    <span
                      className="flex items-center text-sm cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <FaSearch className="text-lg" />
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-xs text-gray-500 uppercase">{item.tag}</p>
                  <p className="font-medium text-blue-600 hover:underline cursor-pointer">
                    {item.title}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <span className="bg-green-600 text-white px-2 rounded text-xs flex items-center gap-1">
                      {item.rate}
                      <FaStar className="text-white" />
                    </span>
                    <span className="text-gray-500 text-sm">(2)</span>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold">
                    {item.price}{" "}
                    <span className="text-green-600 text-sm font-medium">
                      19% Off
                    </span>
                  </p>

                  {/* Colors (show on hover) */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-blue-600"></span>
                    <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                    <span className="w-4 h-4 rounded-full bg-red-800"></span>
                  </div>

                  {/* Sizes (show on hover) */}
                  <div className="flex gap-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer hover:border-blue-600">
                      S
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer hover:border-blue-600">
                      M
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer hover:border-blue-600">
                      L
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default SHOP;