import { useState } from 'react';
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
  FaShoppingCart,
  FaTh,
  FaBox,
  FaChevronDown,
  FaChevronUp,
  FaListAlt,
  FaTags,
  FaUsers,
  FaBullhorn,
  FaQuestionCircle,
  FaCog,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (user?.role !== 'admin' && user?.role !== 'vendor') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this dashboard.
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
              <span className="font-bold text-xl">Kapee {user?.role === 'admin' ? 'Admin' : 'Vendor'}</span>
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

        {/* Search */}
        {!isSidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/admin')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaTh className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Dashboard</span>}
          </Link>

          <Link
            to="/admin/orders"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/admin/orders') || location.pathname.startsWith('/admin/orders')
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={{ display: user?.role === 'admin' ? 'flex' : 'none' }}
          >
            <FaShoppingCart className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Orders</span>}
          </Link>

          {/* Product with submenu */}
          <div className="mb-1">
            <button
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${
                location.pathname.startsWith('/admin/products') ||
                location.pathname.startsWith('/admin/categories')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FaBox className="text-lg" />
                {!isSidebarCollapsed && <span className="font-medium">Product</span>}
              </div>
              {!isSidebarCollapsed &&
                (isProductMenuOpen ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                ))}
            </button>

            {!isSidebarCollapsed && isProductMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/admin/products"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive('/admin/products')
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaListAlt className="text-base" />
                  <span>Product List</span>
                </Link>
                <Link
                  to="/admin/categories"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive('/admin/categories')
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ display: user?.role === 'admin' ? 'flex' : 'none' }}
                >
                  <FaTags className="text-base" />
                  <span>Product Categories</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/admin/customers"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/admin/customers')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={{ display: user?.role === 'admin' ? 'flex' : 'none' }}
          >
            <FaUsers className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Customers</span>}
          </Link>

          <Link
            to="/admin/campaigns"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/admin/campaigns')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={{ display: user?.role === 'admin' ? 'flex' : 'none' }}
          >
            <FaBullhorn className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Campaign</span>}
          </Link>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <Link
            to="/admin/help"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            <FaQuestionCircle className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Help Center</span>}
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            <FaCog className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Settings</span>}
          </Link>

          {/* User Profile */}
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 px-3 py-3 mt-4 border-t border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName || 'John'} {user?.lastName || 'Doe'}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user?.role || 'Premium'}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FaCog className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaPlus className="text-blue-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaCalendar className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <FaComments className="text-gray-600 text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <FaBell className="text-gray-600 text-xl" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaFlag className="text-gray-600 text-xl" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
