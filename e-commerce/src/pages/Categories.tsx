import { useSearchParams } from "react-router-dom";
import { FaStar, FaHeart, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useApi";
import PriceBadge from "../components/PriceBadge";

function Categories() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const { data: products = [], isLoading } = useProducts();

  // Filter products based on category or search query
  const filteredProducts = products.filter((product: any) => {
    if (category) {
      return (
        (product.category || product.tag)?.toLowerCase().includes(category.toLowerCase()) ||
        (product.name || product.title)?.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (searchQuery) {
      return (
        (product.name || product.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category || product.tag)?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

  const displayTitle = category || searchQuery || "Products";
  const breadcrumbText = category ? category.toUpperCase() : searchQuery ? `SEARCH: ${searchQuery.toUpperCase()}` : "PRODUCTS";

  return (
    <>
      {/* Category Header */}
      <div className="flex flex-col items-center text-center gap-2 min-h-[200px] bg-gray-100 pt-12">
        <h3 className="text-4xl font-bold text-gray-800 capitalize">{displayTitle}</h3>
        <p className="text-sm">
          <a href="/" className="hover:text-blue-500">HOME</a> / 
          <a href="/shop" className="hover:text-blue-500 ml-1">SHOP</a> / 
          <span className="ml-1">{breadcrumbText}</span>
        </p>
        <PriceBadge price={39} />
      </div>

      {/* Main Category Section */}
      <div className="w-full border-t-2 border-blue-800 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <p className="text-gray-600 text-sm">
              Showing {filteredProducts.length} products {category ? `for "${category}"` : searchQuery ? `for "${searchQuery}"` : ''}
            </p>
            <select className="border px-3 py-1 text-sm">
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white shadow-xl rounded overflow-hidden">
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((item: any) => (
                <div
                  key={item.id || item._id}
                  className="group bg-white shadow-xl rounded overflow-hidden"
                >
                  {/* Image Wrapper */}
                  <div className="relative overflow-hidden">
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 z-10">
                      FEATURED
                    </span>
                    <FaHeart className="absolute top-2 right-2 text-white z-10 cursor-pointer stroke-black stroke-2" />
                    
                    <img
                      src={item.image || item.img}
                      alt={item.name || item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"
                    />

                    {/* Hover Actions */}
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

                  {/* Content */}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                No products found {category ? `for "${category}"` : searchQuery ? `for "${searchQuery}"` : ''}
              </h3>
              <p className="text-gray-500 mb-6">
                Try browsing our other categories or return to the shop.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Categories;