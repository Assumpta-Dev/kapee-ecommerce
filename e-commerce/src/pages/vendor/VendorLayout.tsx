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
  FaTh,
  FaBox,
  FaQuestionCircle,
  FaCog,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout = ({ children }: VendorLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
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

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <Link
            to="/vendor"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/vendor')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaTh className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">Dashboard</span>}
          </Link>

          <Link
            to="/vendor/products"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition ${
              isActive('/vendor/products')
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaBox className="text-lg" />
            {!isSidebarCollapsed && <span className="font-medium">My Products</span>}
          </Link>
        </nav>

        <div className="border-t border-gray-200 p-4 space-y-1">
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
                  {user?.role || 'Vendor'}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
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

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;