import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../data/products';
import { GShockWatch } from '../../components/GShockWatch';
import { X, ShieldCheck, ShoppingBag, Bookmark, Check, MapPin, Truck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, isDeposit?: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const isAvailable = product.status === 'available';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-white border-6 border-black shadow-[12px_12px_0px_#000] p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white hover:bg-red-600 p-2 border-2 border-black shadow-[3px_3px_0px_#fde047] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Comic Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-yellow-300 text-black comic-font text-sm md:text-base px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              {product.collection.toUpperCase()}
            </span>
            <span className="text-xs font-black tracking-wider uppercase text-gray-500">
              ID: #{product.id.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Showcase */}
            <div className="relative aspect-square bg-[#f9fafb] border-4 border-black p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 halftone opacity-15 pointer-events-none" />

              {product.isWatch ? (
                <GShockWatch
                  size={240}
                  bezelColor={product.colorway.bezel}
                  dialColor={product.colorway.dial}
                  indicesColor={product.colorway.indices}
                  accentColor={product.colorway.accent}
                  strapColor={product.colorway.strap}
                  animateHands={true}
                />
              ) : (
                <div className="comic-font text-3xl text-center">
                  STREETWEAR ARCHIVE
                </div>
              )}
            </div>

            {/* Content & Actions */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="comic-font text-3xl md:text-4xl text-black leading-none mb-2">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="comic-font text-4xl text-black">
                    {product.price > 0 ? `$${product.price}` : 'COMING SOON'}
                  </span>
                  {product.isWatch && (
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 border border-black px-2 py-0.5">
                      or $20 deposit hold
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-gray-800 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Build Features */}
                <div className="mb-6">
                  <h4 className="comic-font text-lg text-black underline mb-2">
                    SPECIFICATIONS & CRAFT
                  </h4>
                  <ul className="space-y-1.5 text-xs font-bold text-gray-700">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Handover & Delivery Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-black mb-6">
                  <div className="bg-yellow-50 border-2 border-black p-2 flex items-center gap-2">
                    <MapPin size={16} className="text-black shrink-0" />
                    <span>Free Chicago / NWI Meet-Ups</span>
                  </div>
                  <div className="bg-yellow-50 border-2 border-black p-2 flex items-center gap-2">
                    <Truck size={16} className="text-black shrink-0" />
                    <span>$10 Tracked USPS Priority</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t-2 border-black">
                {isAvailable ? (
                  <>
                    <button
                      onClick={() => {
                        onAddToCart(product, false);
                        onClose();
                      }}
                      className="ink-btn w-full bg-black hover:bg-yellow-400 hover:text-black text-white text-xl py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <ShoppingBag size={20} />
                      <span>ADD TO HAUL (${product.price})</span>
                    </button>

                    {product.isWatch && (
                      <button
                        onClick={() => {
                          onAddToCart(product, true);
                          onClose();
                        }}
                        className="ink-btn w-full bg-yellow-300 hover:bg-yellow-400 text-black text-lg py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Bookmark size={18} />
                        <span>RESERVE WITH $20 DEPOSIT (7-DAY HOLD)</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="bg-red-100 border-3 border-red-600 p-3 text-center">
                    <p className="comic-font text-red-600 text-xl">
                      {product.status === 'coming-soon' ? 'DROP COMING SOON' : 'CURRENTLY UNAVAILABLE'}
                    </p>
                    <p className="text-xs font-bold text-red-800 mt-1">
                      Stay tuned to @seandidmywrist on Instagram for the drop.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
