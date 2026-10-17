import { useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  isDepositReservation?: boolean;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sdmw_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isFirstOrder, setIsFirstOrder] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sdmw_first_order_discount');
      return saved !== 'false'; // defaults to true for new visitors
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdmw_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, isDeposit: boolean = false) => {
    if (product.status === 'coming-soon' || product.status === 'sold') return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.isDepositReservation === isDeposit
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isDepositReservation === isDeposit
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, isDepositReservation: isDeposit }];
    });
  };

  const removeFromCart = (productId: string, isDeposit: boolean = false) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.isDepositReservation === isDeposit)
      )
    );
  };

  const updateQuantity = (productId: string, delta: number, isDeposit: boolean = false) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.isDepositReservation === isDeposit) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.isDepositReservation ? 20 : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountRate = isFirstOrder ? 0.05 : 0;
  const discountAmount = Math.round(subtotal * discountRate * 100) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    isFirstOrder,
    setIsFirstOrder,
    totalItemsCount
  };
}
