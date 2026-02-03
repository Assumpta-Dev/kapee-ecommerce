import { useState, useEffect } from 'react';
import { FaBox, FaDollarSign, FaArrowUp } from 'react-icons/fa';
import { productAPI } from '../../api/apiProductNew';
import { useAuth } from '../../context/AuthContext';

const VendorDashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const productsRes = await productAPI.getAll().catch(() => ({ data: [] }));
      const products = productsRes.data || [];
      
      // Filter products by vendor (assuming products have vendorId field)
      const vendorProducts = products.filter((product: any) => 
        product.vendorId === user?._id || product.createdBy === user?._id
      );
      
      // Calculate revenue (mock calculation)
      const revenue = vendorProducts.reduce((sum: number, product: any) => 
        sum + (product.price * (product.sold || 0)), 0
      );

      setStats({
        totalProducts: vendorProducts.length,
        totalRevenue: revenue,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'My Products',
      value: stats.totalProducts,
      icon: FaBox,
      color: 'bg-blue-500',
      trend: '+5%',
      isPositive: true,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: FaDollarSign,
      color: 'bg-blue-500',
      trend: '+12%',
      isPositive: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendor Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <FaArrowUp /> : <FaArrowUp className="rotate-180" />}
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
        <h2 className="text-2xl font-bold mb-2">Welcome to Kapee Vendor Dashboard!</h2>
        <p className="text-blue-100">
          Manage your products efficiently. Add new products, track sales, and grow your business on our platform.
        </p>
      </div>
    </div>
  );
};

export default VendorDashboardPage;