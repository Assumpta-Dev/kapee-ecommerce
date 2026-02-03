import { useCart } from "../context/Cart";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, totalPrice, isOpen, closeCart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;
  const progressPercentage = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity" 
        onClick={closeCart} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <button onClick={closeCart} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h2 className="text-lg font-bold uppercase tracking-wide">MY CART</h2>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Your cart is empty</p>
              <button 
                onClick={closeCart}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                  <div className="w-20 h-24 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                    <img 
                      src={item.productId.images && item.productId.images.length > 0 ? `http://localhost:7000${item.productId.images[0]}` : 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=Product'} 
                      alt={item.productId.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm text-gray-800 font-medium line-clamp-2 pr-4">
                        {item.productId.name}
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.productId._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {item.quantity} × <span className="font-bold text-gray-900">${item.productId.price.toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-bold uppercase">SUBTOTAL:</span>
              <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Free Shipping Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="bg-blue-600 text-white px-1 rounded">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                {remainingForFreeShipping > 0 
                  ? <span>Spend <span className="font-bold text-gray-900">${remainingForFreeShipping.toFixed(2)}</span> to get <span className="font-bold text-gray-900">free shipping</span></span>
                  : <span className="text-green-600 font-bold">You've unlocked free shipping!</span>
                }
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  closeCart();
                  navigate('/cart');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors uppercase"
              >
                VIEW CART
              </button>
              <button 
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition-colors uppercase"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
