import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'customer' as 'customer' | 'vendor' | 'admin'
  });
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[900px] max-w-[95%] bg-white rounded shadow-lg grid grid-cols-2 animate-scaleIn">
        {/* LEFT SIDE */}
        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Login' : 'Create Account'}</h2>
          <p className="text-sm leading-relaxed">
            {isLogin 
              ? 'Get access to your Orders, Wishlist and Recommendations.'
              : 'Join us to start shopping and enjoy exclusive benefits.'
            }
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-black cursor-pointer"
          >
            ×
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  required
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {!isLogin && (
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-800">
                  <input type="checkbox" className="bg-blue-600"/>
                  Remember me
                </label>

                <a href="#" className="text-blue-600 hover:underline">
                  Lost your password?
                </a>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'LOG IN' : 'CREATE ACCOUNT')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
