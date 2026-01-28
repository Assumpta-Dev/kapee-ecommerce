import PriceBadge from "../components/PriceBadge";
import { FaStar, FaHeart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import{FaExchangeAlt, FaSearch} from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useApi";

function SHOP(){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data: products = [], isLoading } = useProducts();

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? products.filter((product: any) => 
        (product.name || product.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category || product.tag)?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

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
              Showing {filteredProducts.length} Products {searchQuery ? `for "${searchQuery}"` : 'of all Products'}
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
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-white shadow-xl rounded overflow-hidden">
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((item: any, index: number) => (
                <div
                  key={item.id || item._id || index}
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
                      src={item.image || item.img}
                      alt={item.name || item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"
                    />

                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 bg-blue-600 text-white flex items-center justify-evenly px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span
                        className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
                        onClick={() => navigate(`/product/${item.id || item._id}`)}
                      >
                        <FaExchangeAlt className="text-lg" />
                        SELECT OPTIONS
                      </span>

                      <span
                        className="flex items-center text-sm cursor-pointer"
                        onClick={() => navigate(`/product/${item.id || item._id}`)}
                      >
                        <FaSearch className="text-lg" />
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">{item.category || item.tag}</p>
                    <h4 className="font-semibold text-gray-800">{item.name || item.title}</h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white px-2 rounded text-sm">
                        {item.rating || item.rate || 4}
                        <FaStar className="inline ml-1 mb-0.5" />
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default SHOP;