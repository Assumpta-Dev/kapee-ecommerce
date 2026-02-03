import { useState, useEffect } from 'react';
import { FaShoppingCart, FaBox, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatCards = () => {
    if (user?.role === 'admin') {
      return [
        {
          title: 'Total Orders',
          value: stats.totalOrders,
          icon: FaShoppingCart,
          color: 'bg-blue-500',
          trend: '+12%',
          isPositive: true,
        },
        {
          title: 'Total Products',
          value: stats.totalProducts,
          icon: FaBox,
          color: 'bg-blue-500',
          trend: '+8%',
          isPositive: true,
        },
        {
          title: 'Total Categories',
          value: stats.totalCategories,
          icon: FaUsers,
          color: 'bg-blue-500',
          trend: '+3%',
          isPositive: true,
        },
        {
          title: 'Total Users',
          value: stats.totalUsers,
          icon: FaDollarSign,
          color: 'bg-blue-500',
          trend: '+15%',
          isPositive: true,
        },
      ];
    } else {
      return [
        {
          title: 'My Products',
          value: stats.totalProducts,
          icon: FaBox,
          color: 'bg-blue-500',
          trend: '+8%',
          isPositive: true,
        },
        {
          title: 'Total Categories',
          value: stats.totalCategories,
          icon: FaUsers,
          color: 'bg-blue-500',
          trend: '+3%',
          isPositive: true,
        },
        {
          title: 'My Orders',
          value: stats.totalOrders,
          icon: FaShoppingCart,
          color: 'bg-blue-500',
          trend: '+12%',
          isPositive: true,
        },
      ];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {getStatCards().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                <span>{stat.trend}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Kapee {user?.role === 'admin' ? 'Admin' : 'Vendor'} Dashboard!</h2>
        <p className="text-blue-100">
          {user?.role === 'admin' 
            ? 'Manage your e-commerce platform efficiently. Track orders, products, categories, and customers all in one place.'
            : 'Manage your products efficiently. Add new products, track sales, and grow your business on our platform.'}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
