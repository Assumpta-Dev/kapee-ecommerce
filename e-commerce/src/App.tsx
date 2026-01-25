import Layout from "./Layout";
import Blogs from "./pages/BLOGS";
import Home from "./pages/HOME";
import CONTACT from "./pages/CONTACT";
import SHOP from "./pages/SHOP";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<CONTACT />} />
          <Route path="/shop" element={<SHOP />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
