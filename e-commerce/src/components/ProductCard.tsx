import { FaHeart, FaStar, FaRandom, FaLayerGroup, FaSearchPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: any;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleIconClick = (action: string) => {
    // All actions navigate to product detail page for now
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-start shadow-lg h-full border border-gray-200 p-2 group relative overflow-hidden">
      <div className="relative w-full h-48">
        <img
          src={
            product.images && product.images.length > 0
              ? `http://localhost:7000${product.images[0]}`
              : "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Product"
          }
          alt={product.name || `Image ${index + 1}`}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Product`;
          }}
        />
        <FaHeart className="absolute top-2 right-8 text-white stroke-gray-400 stroke-[30]" />

        {/* Hover actions - Blue button bar with 3 icons */}
        <div className="absolute inset-x-0 bottom-0 bg-blue-600 text-white flex items-center justify-evenly px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="p-2 hover:bg-blue-700 rounded transition-colors"
            onClick={() => handleIconClick("shuffle")}
            title="Shuffle"
          >
            <FaRandom className="text-xl" />
          </button>
          <button
            className="px-3 py-2 hover:bg-blue-700 rounded transition-colors text-sm font-medium"
            onClick={() => handleIconClick("select-options")}
            title="Select Options"
          >
            SELECT OPTIONS
          </button>
          <button
            className="p-2 hover:bg-blue-700 rounded transition-colors"
            onClick={() => handleIconClick("quickview")}
            title="Quick View"
          >
            <FaSearchPlus className="text-xl" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-800">
        {product.categoryId?.name || "Category"}
      </p>
      <p className="mt-2 text-sm font-medium text-gray-800">{product.name}</p>
      <p className="mt-2 text-sm font-medium text-gray-800 text-white bg-blue-500 px-2 rounded">
        4.5 <FaStar className="inline-block text-white mb-1" />
      </p>

      {/* Price and color selector row */}
      <div className="flex items-center gap-3 mt-2">
        <p className="text-lg font-medium text-gray-800">
          ${product.price} <span className="text-green-500">50 % off</span>
        </p>

        {/* Color selector dots - visible on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-5 h-5 rounded-full border-2 border-white ring-1 ring-gray-300 bg-blue-600 hover:ring-2 hover:ring-blue-600 transition-all"
            title="Blue"
            onClick={() => handleIconClick("color-blue")}
          />
          <button
            className="w-5 h-5 rounded-full border-2 border-white ring-1 ring-gray-300 bg-red-600 hover:ring-2 hover:ring-red-600 transition-all"
            title="Red"
            onClick={() => handleIconClick("color-red")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
