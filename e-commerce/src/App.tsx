import Layout from "./Layout";
import Blogs from "./pages/BLOGS";
import Home from "./pages/HOME";
import CONTACT from "./pages/CONTACT";
import SHOP from "./pages/SHOP";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import VendorDashboard from "./components/VendorDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import ProductsPage from "./pages/admin/ProductsPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/Cart";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Routes>
        {/* Public Routes with Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<CONTACT />} />
          <Route path="/shop" element={<SHOP />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        </Route>

        {/* Admin Routes without Navbar/Footer */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrdersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminLayout>
              <CategoriesPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <ProductsPage />
            </AdminLayout>
          }
        />
      </Routes>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
