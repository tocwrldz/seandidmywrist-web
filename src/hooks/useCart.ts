import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { UserProfile } from './useAuth';

export interface CartItem {
  product: Product;
  quantity: number;
  isDepositReservation?: boolean;
}

export function useCart(currentUser?: UserProfile | null) {
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

  // ANTI-STACKING DISCOUNT POLICY:
  // "grant %5 upon sign up but don’t allow deal or coupon stacking"
  // Rule 1: ONESTOPSHOP code gives 10% off for orders > $125.
  // Rule 2: User with hasSignupBonus gets 5% off.
  // Rule 3: Orders $85+ automatically get 5% off.
  // CRITICAL ANTI-STACKING:
  // - Only the SINGLE HIGHEST discount applies at any time. Discounts NEVER combine or sum up.
  const isOneStopShopActive = promoCode.trim().toUpperCase() === 'ONESTOPSHOP';
  const hasSignup5Percent = !!currentUser?.hasSignupBonus;
  const qualifiesForOrder85Deal = subtotal >= 85;

  let discountAmount = 0;
  let appliedDiscountName = '';
  let stackingNotice = '';

  if (isOneStopShopActive && subtotal > 125) {
    // 10% off overrides and supersedes any 5% deals (no stacking: 10% max)
    discountAmount = Math.round(subtotal * 0.10 * 100) / 100;
    appliedDiscountName = '10% OFF (Code: ONESTOPSHOP)';
    stackingNotice = 'Highest single deal applied: 10% OFF. (No stacking allowed with other deals or signup bonuses).';
  } else if (hasSignup5Percent && qualifiesForOrder85Deal) {
    // Both 5% signup bonus and $85+ promotion match, but strict NO STACKING: single 5% only (not 10%)
    discountAmount = Math.round(subtotal * 0.05 * 100) / 100;
    appliedDiscountName = '5% OFF (VIP Welcome & Orders $85+)';
    stackingNotice = 'Strict anti-stacking: Deals do not combine. Single 5% discount applied.';
  } else if (hasSignup5Percent) {
    // Loyalty Sign-Up bonus grants 5% off any order regardless of size
    discountAmount = Math.round(subtotal * 0.05 * 100) / 100;
    appliedDiscountName = '5% OFF (VIP Member Sign-Up Bonus)';
    stackingNotice = '5% Welcome bonus applied to your account. (Deal & coupon stacking prohibited).';
  } else if (qualifiesForOrder85Deal) {
    discountAmount = Math.round(subtotal * 0.05 * 100) / 100;
    appliedDiscountName = '5% OFF (Orders $85+)';
    stackingNotice = 'Volume order discount 5% applied. (Coupons do not stack).';
  } else {
    discountAmount = 0;
    appliedDiscountName = '';
    stackingNotice = '';
  }

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'ONESTOPSHOP') {
      setPromoCode('ONESTOPSHOP');
      if (subtotal > 125) {
        return {
          success: true,
          message: 'Code ONESTOPSHOP applied: 10% OFF! (Replaces 5% bonus — no stacking allowed).'
        };
      } else {
        const remaining = Math.max(0, 126 - subtotal);
        return {
          success: true,
          message: `Code ONESTOPSHOP saved! Add $${remaining.toFixed(2)} more to reach $125 for 10% OFF. (Coupons & deals do not stack).`
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
    stackingNotice,
    promoCode,
    applyPromoCode,
    removePromoCode,
    total,
    totalItemsCount,
    isFirstOrder: subtotal >= 85 || hasSignup5Percent
  };
}
