import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
  };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQty: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalQty: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && user.role === 'customer' && token) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user, token]);

  const fetchCart = async () => {
    if (!token || !user || user.role !== 'customer') return;
    
    try {
      const response = await fetch('http://localhost:7000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!token || !user || user.role !== 'customer') {
      alert('Please login as a customer to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:7000/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQty = async (productId: string, quantity: number) => {
    if (!token || quantity < 1) return;
    
    try {
      const response = await fetch(`http://localhost:7000/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:7000/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setItems([]);
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalQty,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
