import React, { useState } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PriceBadge from "../components/PriceBadge";
import apiClient from "../api/apiClient";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponOpen, setCouponOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States (US)'
  });

  const shippingCost = 5.0;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.role !== 'customer') {
      alert('Please login as a customer to place an order');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/orders', {
        billingDetails: billingData
      });

      if (response.data.status === 'success') {
        setOrderSuccess(true);
        await clearCart();
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Order placement failed:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. You will be redirected to the homepage shortly.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting in 3 seconds...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-gray-50 border-t-2 border-blue-500 p-4 mb-8 text-sm text-gray-600">
        <span className="mr-1">Have a coupon?</span>
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Click here to enter your code
        </button>

        {couponOpen && (
          <div className="mt-4 p-4 border border-gray-200 rounded flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Coupon code"
              className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-colors">
              Apply coupon
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Billing details</h2>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={billingData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={billingData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={billingData.address}
                onChange={handleInputChange}
                placeholder="House number and street name"
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={billingData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={billingData.zipCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={billingData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={billingData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Placing Order...' : `Place Order - $${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white p-6 border-2 border-gray-100 rounded-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your order</h2>

            <div className="mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-3 mb-3 text-sm font-bold text-gray-600 uppercase tracking-wider">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {items.length === 0 ? (
                <div className="text-gray-500 py-4 text-center">
                  Your cart is empty.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b border-gray-100 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.productId.images && item.productId.images.length > 0 ? `http://localhost:7000${item.productId.images[0]}` : 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=Product'}
                          alt={item.productId.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm max-w-[150px] sm:max-w-[200px] truncate">
                          {item.productId.name}
                        </p>
                        <p className="text-gray-500 text-sm">× {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-blue-600">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PriceBadge price={finalTotal} />
    </div>
  );
};

export default Checkout;