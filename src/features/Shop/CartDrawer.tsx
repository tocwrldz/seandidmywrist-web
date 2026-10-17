import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../hooks/useCart';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, AlertCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedDiscountName?: string;
  total: number;
  promoCode?: string;
  onApplyPromoCode?: (code: string) => { success: boolean; message: string };
  onRemovePromoCode?: () => void;
  onUpdateQuantity: (productId: string, delta: number, isDeposit?: boolean) => void;
  onRemoveItem: (productId: string, isDeposit?: boolean) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discountAmount,
  appliedDiscountName = '',
  total,
  promoCode = '',
  onApplyPromoCode,
  onRemovePromoCode,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim() || !onApplyPromoCode) return;
    const res = onApplyPromoCode(inputCode);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setInputCode('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-6 border-black z-[100] shadow-[-10px_0px_0px_#000] flex flex-col justify-between select-none"
            role="dialog"
            aria-label="Shopping Cart"
          >
            {/* Top Bar */}
            <div className="bg-black text-white p-5 border-b-4 border-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={22} className="text-yellow-400" />
                <h2 className="comic-font text-3xl tracking-wider">YOUR HAUL</h2>
              </div>
              <button
                onClick={onClose}
                className="bg-white text-black hover:bg-yellow-400 p-1.5 border-2 border-black transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Offer Guidance Status Banner */}
            <div className="bg-yellow-300 border-b-3 border-black p-2.5 text-center text-xs font-bold text-black">
              {subtotal >= 125 ? (
                <p>
                  🎉 Order qualifies for <span className="underline font-black">10% OFF</span> with code <span className="bg-black text-white px-1.5 py-0.5 font-mono">ONESTOPSHOP</span>!
                </p>
              ) : subtotal >= 85 ? (
                <p>
                  ✅ <span className="underline font-black">5% DISCOUNT APPLIED</span> on your order! (Add ${(126 - subtotal).toFixed(2)} more for 10% off with ONESTOPSHOP)
                </p>
              ) : (
                <p>
                  💡 Orders $85+ get <span className="underline font-black">5% OFF</span>! Add ${(85 - subtotal).toFixed(2)} to unlock. (Orders under $80 do not receive 5% off)
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-20 h-20 bg-gray-100 border-4 border-black rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={36} className="text-gray-400" />
                  </div>
                  <p className="comic-font text-3xl text-black">YOUR HAUL IS EMPTY!</p>
                  <p className="text-xs font-bold text-gray-500 max-w-xs mt-2">
                    Flip through the comic catalog and snag a custom CasiOak before it gets locked.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const isDeposit = item.isDepositReservation;
                  const unitPrice = isDeposit ? 20 : item.product.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${isDeposit ? 'deposit' : 'full'}-${idx}`}
                      className="ink-panel-sm bg-gray-50 p-3 flex gap-3 relative"
                    >
                      {/* Product Preview Thumbnail */}
                      <div className="w-18 h-18 bg-white border-2 border-black flex items-center justify-center shrink-0 p-1">
                        <span className="comic-font text-lg text-black text-center leading-tight">
                          {item.product.name.split(' ')[0]}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="comic-font text-lg text-black leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, isDeposit)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {isDeposit && (
                          <div className="inline-block bg-yellow-300 text-black text-[10px] font-black uppercase px-1.5 py-0.5 border border-black mb-1">
                            $20 Deposit (7-Day Reservation Hold)
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border-2 border-black bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1, isDeposit)}
                              className="px-2 py-0.5 hover:bg-gray-200 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 py-0.5 font-bold text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1, isDeposit)}
                              className="px-2 py-0.5 hover:bg-gray-200 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="comic-font text-xl text-black">
                            ${itemTotal}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Summary & Promo Code Section */}
            {cart.length > 0 && (
              <div className="bg-white border-t-4 border-black p-5 space-y-3">
                {/* Promo Code Input */}
                <form onSubmit={handleApply} className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. ONESTOPSHOP)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="w-full bg-gray-50 border-2 border-black pl-8 pr-2 py-1.5 text-xs font-bold uppercase focus:outline-none focus:bg-yellow-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black hover:bg-yellow-400 hover:text-black text-white px-3 py-1.5 border-2 border-black text-xs font-bold transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage && (
                  <div className={`p-2 border border-black text-xs font-bold flex items-center gap-1.5 ${promoMessage.isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}>
                    {promoMessage.isError ? <AlertCircle size={14} /> : <Check size={14} />}
                    <span>{promoMessage.text}</span>
                  </div>
                )}

                {promoCode === 'ONESTOPSHOP' && (
                  <div className="flex justify-between items-center bg-yellow-100 border border-black p-1.5 text-xs font-bold">
                    <span className="text-black">Code applied: ONESTOPSHOP</span>
                    {onRemovePromoCode && (
                      <button
                        onClick={onRemovePromoCode}
                        className="text-red-600 hover:underline text-[11px]"
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                )}

                {/* Subtotals & Discounts */}
                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex justify-between text-gray-700">
                    <span>SUBTOTAL:</span>
                    <span className="font-mono text-sm">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 ? (
                    <div className="flex justify-between text-green-700">
                      <span>DISCOUNT ({appliedDiscountName || '5% off $85+'}):</span>
                      <span className="font-mono text-sm">-${discountAmount.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-gray-400 text-[11px]">
                      <span>DISCOUNT (Orders $85+):</span>
                      <span>$0.00</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>ESTIMATED SHIPPING:</span>
                    <span className="text-[11px] uppercase">Calculated at checkout (Free meet-up / $10 USPS)</span>
                  </div>

                  <div className="flex justify-between text-2xl comic-font text-black pt-2 border-t-2 border-black">
                    <span>TOTAL:</span>
                    <span className="text-3xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-gray-100 p-2 border border-black">
                  <ShieldCheck size={14} className="text-black shrink-0" />
                  <span>Inventory verified before order lock. Safe & secure.</span>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="ink-btn w-full bg-black hover:bg-yellow-400 hover:text-black text-white text-2xl py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
