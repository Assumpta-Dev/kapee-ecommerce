import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FaEye,
  FaTrash,
  FaEdit,
  FaChevronRight,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShippingFast,
  FaBuilding,
  FaHashtag
} from 'react-icons/fa';
import { orderAPI } from '../../api/apiOrder';
import type { OrderData } from '../../api/apiOrder';

const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orderId && orders.length > 0) {
      const order = orders.find(o => o._id === orderId);
      if (order) {
        setSelectedOrder(order);
      }
    }
  }, [orderId, orders]);

  const fetchOrders = async () => {
    try {
      // Mock data since backend might not have orders endpoint yet
      const mockOrders: OrderData[] = [
        {
          _id: 'OD24321',
          orderNumber: 'OD24321',
          customerId: {
            _id: '1',
            name: 'Travis Adam',
            email: 'travis_ad@mail.com',
            phone: '+614 234 567'
          },
          items: [
            {
              productId: '1',
              name: 'IPol Pro S6 5G',
              image: '/public/1 (1).jpg',
              specs: ['256 GB', 'Black'],
              quantity: 1,
              price: 450.00
            },
            {
              productId: '2',
              name: 'TWS Earphone M1',
              image: '/public/1 (2).jpg',
              specs: ['Black'],
              quantity: 1,
              price: 100.00
            },
            {
              productId: '3',
              name: 'Earphone G1',
              image: '/public/1 (3).jpg',
              specs: ['Wired', 'Black'],
              quantity: 1,
              price: 145.00
            }
          ],
          status: 'processing',
          paymentMethod: 'Visa *9021',
          subtotal: 695.00,
          discount: -50.00,
          shipping: 25.00,
          insurance: 0.00,
          tax: 34.75,
          total: 704.75,
          shippingAddress: {
            street: 'U2186 Joyce Street Rocky Mount',
            city: 'California',
            state: 'CA',
            zipCode: '24567',
            country: 'USA'
          },
          billingAddress: {
            street: 'U2186 Joyce Street Rocky Mount',
            city: 'California',
            state: 'CA',
            zipCode: '24567',
            country: 'USA'
          },
          shippingMethod: 'Flat',
          trackingNumber: 'O12022311P',
          createdAt: '2024-01-14T10:14:00Z'
        }
      ];

      try {
        const response = await orderAPI.getAll();
        setOrders(response.data || mockOrders);
      } catch (error) {
        // Use mock data if API fails
        setOrders(mockOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order: OrderData) => {
    setSelectedOrder(order);
    setSearchParams({ id: order._id || order.orderNumber });
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
    setSearchParams({});
  };

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderAPI.delete(id);
        fetchOrders();
        if (selectedOrder?._id === id) {
          handleBackToList();
        }
      } catch (error) {
        console.error('Failed to delete order:', error);
        alert('Failed to delete order');
      }
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderData['status']) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700',
      processing: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const filteredOrders = orders.filter(order =>
    statusFilter === 'all' ? true : order.status === statusFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  // Order Details View
  if (selectedOrder) {
    return (
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/admin" className="text-purple-600 hover:text-purple-700">
            Dashboard
          </Link>
          <FaChevronRight className="text-gray-400 text-xs" />
          <button onClick={handleBackToList} className="text-purple-600 hover:text-purple-700">
            Orders
          </button>
          <FaChevronRight className="text-gray-400 text-xs" />
          <span className="text-gray-600">Order Details</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-sm text-gray-600">Order ID</span>
                <p className="text-lg font-semibold">#{selectedOrder.orderNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Products</span>
                <p className="text-lg font-semibold">{selectedOrder.items.length} Product</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
                <FaEye className="inline ml-2 text-gray-400" />
              </div>
              <div>
                <span className="text-sm text-gray-600">Date</span>
                <p className="text-sm font-medium">
                  {new Date(selectedOrder.createdAt || '').toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder._id!, e.target.value as OrderData['status'])}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <FaFileInvoice />
                <span>Invoice</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items & Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <input type="checkbox" className="w-4 h-4" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64/3B82F6/FFFFFF?text=Product';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {item.specs.map((spec, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">#{selectedOrder.orderNumber}</div>
                    <div className="text-sm">
                      {item.quantity} x{' '}
                      <span className="line-through text-gray-400">${item.price.toFixed(2)}</span>
                      <span className="text-red-500 ml-1">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="font-semibold">${(item.quantity * item.price).toFixed(2)}</div>
                    <button
                      onClick={() => handleDeleteOrder(selectedOrder._id!)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded"></div>
                    <span className="font-medium">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-red-500">${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Insurance</span>
                    <span>${selectedOrder.insurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Details, Shipping, Address */}
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-600">Name</span>
                  <span className="ml-auto font-medium">{selectedOrder.customerId.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-600">Email</span>
                  <span className="ml-auto font-medium text-right">{selectedOrder.customerId.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaPhone className="text-gray-400" />
                  <span className="text-gray-600">Phone</span>
                  <span className="ml-auto font-medium">{selectedOrder.customerId.phone}</span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Shipping</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FaShippingFast className="text-gray-400" />
                  <span className="text-gray-600">Shipping</span>
                  <span className="ml-auto font-medium">{selectedOrder.shippingMethod}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaBuilding className="text-gray-400" />
                  <span className="text-gray-600">Company</span>
                  <span className="ml-auto font-medium text-right">{selectedOrder.customerId.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaHashtag className="text-gray-400" />
                  <span className="text-gray-600">Number</span>
                  <span className="ml-auto font-medium">{selectedOrder.trackingNumber}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>Billing Address</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed ml-6">
                    {selectedOrder.billingAddress.street}<br />
                    {selectedOrder.billingAddress.city} - {selectedOrder.billingAddress.zipCode}, {selectedOrder.billingAddress.country}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>Shipping Address</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed ml-6">
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Orders List View
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {order.customerId.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(order.createdAt || '').toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-purple-600 hover:text-purple-700"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      title="Edit Order"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order._id!)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete Order"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
