import  { StrictMode } from "react"; // import React and StrictMode
import { createRoot } from "react-dom/client"; // import createRoot
import { BrowserRouter } from "react-router-dom"; // import BrowserRouter
import App from "./App"; // import your App component
import { CartProvider } from "./context/Cart"; // import your CartProvider
import "./index.css"; // import global styles

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
