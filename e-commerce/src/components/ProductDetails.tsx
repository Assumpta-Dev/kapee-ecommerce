import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useApi";
import { useCart } from "../context/Cart";
import { 
  FaStar, 
  FaHeart, 
  FaChevronLeft,
} from "react-icons/fa";
import { 
  Share2, 
  Maximize, 
  Ruler, 
  Shuffle, 
  Truck, 
  CircleQuestionMark,
  Clock,
  Eye,
  Tag as TagIcon,
} from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import CountdownTimer from "./CountdownTimer";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import PaymentMethods from "./PaymentMethods";
import PriceBadge from "./PriceBadge";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const product = products.find((p: any) => (p.id || p._id).toString() === id);
  const { addToCart, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([1, 2]);

  if (!product) return <p className="p-10 text-center">Product not found</p>;

  // Use actual product data
  const productImages = [
    product.image || product.img, 
    product.image || product.img, 
    product.image || product.img, 
    product.image || product.img
  ];
  
  // Dynamic breadcrumb using product's tag
  const breadcrumbItems = ["Home", "Shop", product.category || product.tag, product.name || product.title];
  
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Gray", value: "#6B7280" },
    { name: "Maroon", value: "#7C2D12" },
  ];
  
  const sizes = ["L", "M", "S"];
  
  const highlights = [
    "Regular Fit.",
    "Full sleeves.",
    "70% cotton, 30% polyester.",
    "Easy to wear and versatile as Casual.",
    "Machine wash, tumble dry.",
  ];

  const services = [
    { text: "30 Day Return Policy", hasTooltip: true },
    { text: "Cash on Delivery available", hasTooltip: true },
    { text: "Free Delivery", hasTooltip: true },
  ];

  // Get related products excluding current one
  const relatedProducts = products.filter((p: any) => (p.id || p._id) !== (product.id || product._id)).slice(0, 3);
  
  // Parse price for calculations
  const numericPrice = typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price;
  const discountedPrice = (numericPrice * 0.81).toFixed(2); // 19% off
  const priceRange = {
    min: parseFloat(discountedPrice),
    max: numericPrice
  };

  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="bg-white">
      {/* Price Badge - Fixed Position */}
      <PriceBadge price={numericPrice} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-24 cursor-pointer border-2 rounded overflow-hidden transition-all ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group">
              <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 z-10 rounded-sm">
                FEATURED
              </span>

              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-[600px] object-cover rounded-lg"
              />

              <button
                className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col gap-5">
            {/* Back and Share Icons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <FaChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name || product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 font-semibold">
                {product.rating || product.rate || 4} <FaStar className="text-white text-xs" />
              </span>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer days={338} hours={11} minutes={50} seconds={48} />

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${priceRange.min.toFixed(2)}–${numericPrice}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">
                19% Off
              </span>
            </div>

            {/* Stock Status */}
            <p className="text-green-600 font-semibold text-lg">In Stock</p>

            {/* Special Offers */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <TagIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">
                    Special Price
                  </span>{" "}
                  <span className="text-gray-700">
                    Get extra 19% off (price inclusive of discount)
                  </span>{" "}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    T & C
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TagIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Bank Offer</span>{" "}
                  <span className="text-gray-700">
                    10% instant discount on VISA Cards
                  </span>{" "}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    T & C
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TagIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">No cost EMI</span>{" "}
                  <span className="text-gray-700">
                    $49/month. Standard EMI also available
                  </span>{" "}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    View Plans
                  </a>
                </div>
              </div>
            </div>

            {/* Brand Logo */}
            <div className="bg-gray-900 text-white px-6 py-4 rounded-lg flex items-center gap-3 w-fit">
              <span className="text-4xl font-bold">K</span>
              <div>
                <p className="font-bold text-lg">{product.category || product.tag}</p>
                <p className="text-xs text-gray-400">{product.name || product.title}</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Services:</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                    {service.text}
                    {service.hasTooltip && (
                      <CircleQuestionMark className="w-4 h-4 text-gray-400" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Highlights:</h3>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selector */}
            <ColorSelector colors={colors} />

            {/* Size Selector */}
            <SizeSelector sizes={sizes} />

            {/* Current Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
              <span className="text-xl text-gray-400 line-through">${numericPrice}</span>
            </div>

            {/* Quantity Selector */}
            <QuantitySelector
              initialQuantity={quantity}
              onQuantityChange={setQuantity}
            />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-sm transition-colors text-lg"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-sm transition-colors text-lg"
              >
                BUY NOW
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-wrap gap-6 text-sm">
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FaHeart className="w-4 h-4" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Ruler className="w-4 h-4" />
                Size Guide
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Shuffle className="w-4 h-4" />
                Compare
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex flex-wrap gap-6 text-sm border-t pt-4">
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Truck className="w-4 h-4" />
                Delivery & Return
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <CircleQuestionMark className="w-4 h-4" />
                Ask a Question
              </button>
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Estimated Delivery:</span>
              <span>29 January - 02 February</span>
            </div>

            {/* People Viewing */}
            <div className="flex items-center gap-2 text-gray-700 bg-blue-50 p-3 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>
                <strong className="text-gray-900">49</strong> People viewing this
                product right now!
              </span>
            </div>

            {/* Payment Methods */}
            <PaymentMethods />

            {/* Product Meta */}
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">SKU:</span>
                <span className="text-gray-700">SKU-{product.id || product._id}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">Category:</span>
                <span className="text-gray-700">{product.category || product.tag}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">Tags:</span>
                <span className="text-gray-700">{product.category || product.tag}, {product.name || product.title}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">Brand:</span>
                <span className="text-gray-700">Premium Brand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Bought Together
          </h2>

          <div className="flex flex-wrap items-end gap-6">
            {/* Product Cards */}
            <div className="flex gap-4">
              {relatedProducts.map((item: any) => (
                <div key={item.id || item._id} className="relative">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(item.id || item._id)}
                    onChange={() => toggleProductSelection(item.id || item._id)}
                    className="absolute top-2 right-2 w-5 h-5 accent-blue-600 z-10 cursor-pointer"
                  />
                  <div className="w-48 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.image || item.img}
                      alt={item.name || item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price and Button */}
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  $70.00 – $95.00
                </span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-sm transition-colors text-lg">
                SELECT OPTIONS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
