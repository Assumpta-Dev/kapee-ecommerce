import { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
  };
  quantity: number;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      navigate('/');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:7000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch(`http://localhost:7000/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:7000/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      const response = await fetch('http://localhost:7000/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FaShoppingCart className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 flex items-center gap-2"
          >
            <FaTrash />
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item._id} className="p-6 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.productId.images && item.productId.images.length > 0 ? (
                    <img
                      src={`http://localhost:7000${item.productId.images[0]}`}
                      alt={item.productId.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${encodeURIComponent(item.productId.name.charAt(0))}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">
                        {item.productId.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-600">${item.productId.price.toFixed(2)} each</p>
                  <p className="text-sm text-gray-500">
                    {item.productId.quantity} available
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  
                  <span className="w-12 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                    disabled={item.quantity >= item.productId.quantity}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="text-red-600 hover:text-red-700 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total: ${calculateTotal().toFixed(2)}</span>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;