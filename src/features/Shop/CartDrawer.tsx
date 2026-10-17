import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../hooks/useCart';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bookmark, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
  isFirstOrder: boolean;
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
  total,
  isFirstOrder,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
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

            {/* Offer Banner */}
            {isFirstOrder && (
              <div className="bg-yellow-300 border-b-3 border-black p-2.5 text-center">
                <p className="comic-font text-sm text-black tracking-wide">
                  🎉 FIRST ORDER 5% DISCOUNT APPLIED AT CHECKOUT!
                </p>
              </div>
            )}

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

            {/* Bottom Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="bg-white border-t-4 border-black p-5 space-y-3">
                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex justify-between text-gray-700">
                    <span>SUBTOTAL:</span>
                    <span className="font-mono text-sm">${subtotal.toFixed(2)}</span>
                  </div>

                  {isFirstOrder && (
                    <div className="flex justify-between text-green-700">
                      <span>FIRST ORDER DISCOUNT (5%):</span>
                      <span className="font-mono text-sm">-${discountAmount.toFixed(2)}</span>
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
