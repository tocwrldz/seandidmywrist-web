import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../../data/products';
import { GShockWatch } from '../../components/GShockWatch';
import { ShoppingBag, Bookmark, Eye, ShieldCheck, Shirt } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, isDeposit?: boolean) => void;
  onViewDetails: (p: Product) => void;
  onReserveDeposit: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onReserveDeposit
}) => {
  const isAvailable = product.status === 'available';
  const isComingSoon = product.status === 'coming-soon';
  const isReserved = product.status === 'reserved';
  const isSold = product.status === 'sold';

  return (
    <div className="ink-panel bg-white p-4 flex flex-col justify-between relative group hover:shadow-[10px_10px_0px_#000000] transition-all">
      {/* Status Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 pointer-events-none">
        {isComingSoon && (
          <div className="bg-red-600 text-white comic-font text-sm md:text-base px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg]">
            COMING SOON‼️
          </div>
        )}
        {isReserved && (
          <div className="bg-amber-400 text-black comic-font text-sm md:text-base px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-2">
            RESERVED (7-DAY HOLD)
          </div>
        )}
        {isSold && (
          <div className="bg-black text-white comic-font text-sm md:text-base px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0px_#ef4444] rotate-[-3deg]">
            SOLD OUT
          </div>
        )}
        {isAvailable && product.collection === 'Custom Collection' && (
          <div className="bg-yellow-300 text-black comic-font text-xs px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
            CUSTOM HAND-BUILT
          </div>
        )}
      </div>

      {/* Visual Product Showcase */}
      <div
        onClick={() => onViewDetails(product)}
        className="relative w-full aspect-square bg-[#fafafa] border-3 border-black mb-3 overflow-hidden flex items-center justify-center cursor-pointer group-hover:bg-yellow-50/40 transition-colors"
      >
        <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />

        {product.isWatch ? (
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-full h-full flex items-center justify-center p-2"
          >
            <GShockWatch
              size={170}
              bezelColor={product.colorway.bezel}
              dialColor={product.colorway.dial}
              indicesColor={product.colorway.indices}
              accentColor={product.colorway.accent}
              strapColor={product.colorway.strap}
              animateHands={false}
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_#000] mb-3">
              <Shirt size={38} />
            </div>
            <p className="comic-font text-xl text-black">{product.name}</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">Streetwear Apparel</p>
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white p-1.5 border-2 border-black shadow-[2px_2px_0px_#fde047]">
          <Eye size={16} />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            onClick={() => onViewDetails(product)}
            className="comic-font text-xl md:text-2xl text-black leading-tight cursor-pointer hover:text-red-600 transition-colors"
          >
            {product.name}
          </h3>
          <div className="comic-font text-2xl text-black shrink-0 bg-yellow-300 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
            {product.price > 0 ? `$${product.price}` : 'TBA'}
          </div>
        </div>

        <p className="text-xs text-gray-700 font-medium line-clamp-2 mb-3">
          {product.description}
        </p>

        {product.isWatch && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-3 bg-gray-100 border border-black px-2 py-1">
            <ShieldCheck size={14} className="text-black shrink-0" />
            <span className="truncate">Includes 1-Yr Movement Warranty</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t-2 border-black flex flex-col gap-2 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* View Details */}
          <button
            onClick={() => onViewDetails(product)}
            className="ink-btn bg-white hover:bg-gray-100 text-black text-xs md:text-sm py-2 px-2 flex items-center justify-center gap-1 cursor-pointer"
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={14} />
            <span>DETAILS</span>
          </button>

          {/* Add To Cart */}
          <button
            onClick={() => onAddToCart(product, false)}
            disabled={!isAvailable}
            className={`ink-btn text-xs md:text-sm py-2 px-2 flex items-center justify-center gap-1 transition-all ${
              isAvailable
                ? 'bg-black text-white hover:bg-yellow-400 hover:text-black cursor-pointer'
                : 'bg-gray-200 text-gray-400 border-gray-400 shadow-none cursor-not-allowed'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            <span>{isAvailable ? 'ADD' : 'INACTIVE'}</span>
          </button>
        </div>

        {/* Deposit Reservation Button (Available for watches) */}
        {product.isWatch && (
          <button
            onClick={() => onReserveDeposit(product)}
            disabled={!isAvailable}
            className={`w-full py-1.5 px-2 text-xs font-black uppercase tracking-wider border-2 border-black flex items-center justify-center gap-1.5 transition-all ${
              isAvailable
                ? 'bg-yellow-300 hover:bg-yellow-400 text-black shadow-[3px_3px_0px_#000] cursor-pointer'
                : 'bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed'
            }`}
            title="Reserve this watch with a $20 deposit for 7 business days"
            aria-label={`Reserve ${product.name} with $20 deposit`}
          >
            <Bookmark size={13} />
            <span>HOLD WITH $20 DEPOSIT</span>
          </button>
        )}
      </div>
    </div>
  );
};
