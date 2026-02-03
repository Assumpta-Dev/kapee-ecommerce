import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPlus,
  FaCalendar,
  FaComments,
  FaBell,
  FaFlag,
  FaTh,
  FaBox,
  FaEdit,
  FaTrash,
  FaImage,
  FaQuestionCircle,
  FaCog,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../api/apiProductNew';
import { categoryAPI } from '../api/apiCategoryNew';

interface Category {
  _id: string;
  name: string;
  image: string;
  description?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: any;
  quantity: number;
  images: string[];
}

const VendorDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
    images: null as FileList | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:7000/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      const allProducts = response.data || [];
      // Filter products by vendor if needed
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        categoryId: product.categoryId._id || product.categoryId,
        quantity: product.quantity.toString(),
        images: null
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        quantity: '',
        images: null
      });
    }
    setShowAddProduct(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      quantity: '',
      images: null
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        quantity: parseInt(formData.quantity),
        images: formData.images || undefined
      };

      if (editingProduct) {
        await productAPI.update(editingProduct._id, productData);
      } else {
        await productAPI.create(productData);
      }

      handleCloseModal();
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      images: e.target.files
    }));
  };

  if (user?.role !== 'vendor') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You don't have permission to access the vendor dashboard.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="font-bold text-xl">Kapee</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isSidebarCollapsed ? (
              <FaChevronRight className="text-gray-600" />
            ) : (
              <FaChevronLeft className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition bg-blue-600 text-white`}>
            <FaTh className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Vendor Dashboard</span>}
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 px-3 py-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName || 'John'} {user?.lastName || 'Doe'}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user?.role || 'Vendor'}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <button 
              onClick={() => handleOpenModal()}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FaPlus className="text-blue-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaCalendar className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <FaBell className="text-gray-600 text-xl" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendor Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                    <FaBox className="text-white text-xl" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">My Products</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                    <FaBox className="text-white text-xl" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Categories</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                    <FaBox className="text-white text-xl" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Orders</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to Kapee Vendor Dashboard!</h2>
              <p className="text-blue-100">
                Manage your products efficiently. Add new products, track sales, and grow your business on our platform.
              </p>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaPlus />
                  Add Product
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="h-48 bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={`http://localhost:7000${product.images[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Product';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImage className="text-gray-400 text-4xl" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-blue-600">${product.price}</span>
                        <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded hover:bg-red-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-16">
                  <FaBox className="text-gray-300 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Your First Product
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <label className="cursor-pointer block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                      <FaImage className="text-gray-400 text-3xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.images && formData.images.length > 0
                          ? `${formData.images.length} file(s) selected`
                          : "Click to upload images"}
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;