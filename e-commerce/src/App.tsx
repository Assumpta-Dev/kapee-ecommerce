import Layout from "./Layout";
import Blogs from "./pages/BLOGS";
import Home from "./pages/HOME";
import CONTACT from "./pages/CONTACT";
import SHOP from "./pages/SHOP";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<CONTACT />} />
        <Route path="/shop" element={<SHOP />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
