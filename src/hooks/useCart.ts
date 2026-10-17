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

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem('sdmw_promo_code') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdmw_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sdmw_promo_code', promoCode);
    } catch (e) {
      console.error('Failed to save promo code', e);
    }
  }, [promoCode]);

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

  // Subtotal Calculation
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.isDepositReservation ? 20 : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Exact Discount Rules:
  // 1. Any order above $125 is 10% off with code ONESTOPSHOP
  // 2. Orders $85 and up include 5% discount
  // 3. Orders less than $80 (and under $85) receive NO 5% discount ($0 discount)
  const isOneStopShopActive = promoCode.trim().toUpperCase() === 'ONESTOPSHOP';
  let discountAmount = 0;
  let appliedDiscountName = '';

  if (isOneStopShopActive && subtotal > 125) {
    discountAmount = Math.round(subtotal * 0.10 * 100) / 100;
    appliedDiscountName = '10% OFF (Code: ONESTOPSHOP)';
  } else if (subtotal >= 85) {
    discountAmount = Math.round(subtotal * 0.05 * 100) / 100;
    appliedDiscountName = '5% OFF (Orders $85+)';
  } else {
    discountAmount = 0;
    appliedDiscountName = '';
  }

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'ONESTOPSHOP') {
      setPromoCode('ONESTOPSHOP');
      if (subtotal > 125) {
        return { success: true, message: 'Code ONESTOPSHOP applied: 10% OFF your order!' };
      } else {
        const remaining = Math.max(0, 126 - subtotal);
        return {
          success: true,
          message: `Code ONESTOPSHOP saved! Add $${remaining.toFixed(2)} more to reach $125 and activate 10% OFF.`
        };
      }
    }
    return { success: false, message: 'Invalid code. Use ONESTOPSHOP on orders over $125.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

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
    appliedDiscountName,
    promoCode,
    applyPromoCode,
    removePromoCode,
    total,
    totalItemsCount,
    isFirstOrder: subtotal >= 85 // Only true if order is $85 and up
  };
}
