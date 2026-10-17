import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../data/products';
import { ProductCard } from './ProductCard';
import { WhyShop } from './WhyShop';
import { PoliciesPage } from './PoliciesPage';
import { Meetups } from './Meetups';
import { SoldGallery } from '../Gallery/SoldGallery';
import { ContactSupport } from './ContactSupport';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Sparkles,
  ShoppingBag,
  Sliders,
  X,
  EyeOff
} from 'lucide-react';

interface ComicBookProps {
  products: Product[];
  onAddToCart: (p: Product, isDeposit?: boolean) => void;
  onViewDetails: (p: Product) => void;
  onReserveDeposit: (p: Product) => void;
  onOpenCart: () => void;
  cartCount: number;
  initialPageIndex?: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

export const COMIC_PAGES = [
  { id: 'why-shop', title: 'Why Shop With Sean', type: 'editorial' },
  { id: 'deposit-info', title: 'Deposit Information', type: 'editorial' },
  { id: 'chicago-meetups', title: 'Chicago Meet-Ups', type: 'editorial' },
  { id: 'nwi-meetups', title: 'Northwest Indiana Meet-Ups', type: 'editorial' },
  { id: 'ga2100-showcase', title: 'GA2100 Showcase ($85)', type: 'collection', collectionName: 'GA2100 Showcase' },
  { id: 'custom-collection', title: 'Custom Collection ($100)', type: 'collection', collectionName: 'Custom Collection' },
  { id: 'ap-band', title: 'GA2100 AP Band Collection ($110)', type: 'collection', collectionName: 'GA2100 AP Band Collection' },
  { id: 'sweatsuits', title: 'Sweatsuits (Coming Soon)', type: 'collection', collectionName: 'Sweatsuits' },
  { id: 'socks-beanies', title: 'Socks and Beanies (Coming Soon)', type: 'collection', collectionName: 'Socks and Beanies' },
  { id: 'sold-gallery', title: 'The Sold Archives Gallery', type: 'editorial' },
  { id: 'contact-support', title: 'Contact and Support', type: 'editorial' }
];

export const ComicBook: React.FC<ComicBookProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  onReserveDeposit,
  onOpenCart,
  cartCount,
  currentPage,
  onPageChange
}) => {
  const [showIndex, setShowIndex] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalPages = COMIC_PAGES.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection('next');
      onPageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection('prev');
      onPageChange(currentPage - 1);
    }
  };

  const jumpToPage = (index: number) => {
    setDirection(index > currentPage ? 'next' : 'prev');
    onPageChange(index);
    setShowIndex(false);
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next page
      goToNextPage();
    } else if (diff < -45) {
      // Swiped right -> prev page
      goToPrevPage();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'Home') {
        jumpToPage(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const activePageMeta = COMIC_PAGES[currentPage];

  // Motion variants for comic book page flip
  const pageVariants = {
    enter: (dir: string) => ({
      x: reducedMotion ? 0 : dir === 'next' ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.05 : 0.22,
        ease: 'easeOut' as const
      }
    },
    exit: (dir: string) => ({
      x: reducedMotion ? 0 : dir === 'next' ? -40 : 40,
      opacity: 0,
      transition: {
        duration: reducedMotion ? 0.05 : 0.15
      }
    })
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-6 select-none">
      {/* COMIC MASTHEAD & NAVIGATION TOOLBAR (Top Bar with immediate controls) */}
      <div className="ink-panel bg-white p-3 md:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 sticky top-[72px] z-30 shadow-[4px_4px_0px_#000]">
        {/* Left: Contents Index Trigger */}
        <button
          onClick={() => setShowIndex(true)}
          className="ink-btn bg-yellow-300 hover:bg-yellow-400 text-black px-3.5 py-2 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          aria-label="Open Comic Index"
        >
          <List size={16} />
          <span>INDEX ({totalPages} PAGES)</span>
        </button>

        {/* Center: TOP QUICK PAGE FLIPPER (Always accessible on mobile without scrolling!) */}
        <div className="flex items-center gap-1 bg-yellow-300 border-3 border-black p-1 shadow-[3px_3px_0px_#000]">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`p-1.5 font-black border-2 border-black flex items-center gap-1 text-xs transition-colors cursor-pointer ${
              currentPage === 0
                ? 'opacity-30 border-gray-400 bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-black hover:text-white'
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <span className="comic-font text-sm md:text-lg px-2.5 whitespace-nowrap">
            PAGE {currentPage + 1} OF {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-1.5 font-black border-2 border-black flex items-center gap-1 text-xs transition-colors cursor-pointer ${
              currentPage === totalPages - 1
                ? 'opacity-30 border-gray-400 bg-gray-100 cursor-not-allowed'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
            aria-label="Next Page"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Right: Quick Cart & Accessibility Controls */}
        <div className="flex items-center gap-2">
          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`p-2 border-2 border-black transition-colors text-xs font-bold cursor-pointer ${
              reducedMotion ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
            title={reducedMotion ? 'Page animations OFF (Reduced Motion)' : 'Page animations ON'}
            aria-label="Toggle reduced motion"
          >
            <Sliders size={16} />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white px-3.5 py-2 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer transition-colors relative"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={16} />
            <span>HAUL</span>
            {cartCount > 0 && (
              <span className="bg-yellow-400 text-black comic-font text-xs px-1.5 py-0.2 border border-black rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CLICKABLE COMIC INDEX MODAL */}
      <AnimatePresence>
        {showIndex && (
          <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white border-6 border-black shadow-[12px_12px_0px_#000] p-6 md:p-8 max-h-[88vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6">
                <div>
                  <span className="bg-yellow-300 comic-font text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                    TABLE OF CONTENTS
                  </span>
                  <h3 className="comic-font text-4xl text-black mt-1">COMIC BOOK INDEX</h3>
                </div>
                <button
                  onClick={() => setShowIndex(false)}
                  className="bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer"
                  aria-label="Close index"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COMIC_PAGES.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => jumpToPage(idx)}
                    className={`text-left p-3.5 border-3 border-black flex items-center gap-3 transition-all cursor-pointer ${
                      currentPage === idx
                        ? 'bg-yellow-300 shadow-[4px_4px_0px_#000] font-black'
                        : 'bg-gray-50 hover:bg-yellow-100 hover:translate-x-1'
                    }`}
                  >
                    <span className="w-8 h-8 bg-black text-white comic-font text-lg flex items-center justify-center shrink-0 border border-black">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="comic-font text-xl text-black leading-tight">
                        {page.title}
                      </p>
                      <p className="text-[11px] font-bold text-gray-500 uppercase">
                        {page.type === 'collection' ? 'Product Showcase' : 'Editorial Feature'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN COMIC BOOK SPREAD CONTAINER (with Mobile Touch Swipe) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[500px] bg-white border-6 md:border-8 border-black shadow-[10px_10px_0px_#000] p-4 md:p-8 overflow-hidden touch-pan-y"
      >
        {/* Halftone subtle dots across the paper page */}
        <div className="absolute inset-0 halftone opacity-8 pointer-events-none" />

        {/* Comic Page Turn Animator */}
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* Page Type 1: Editorial Sections */}
            {activePageMeta.id === 'why-shop' && <WhyShop />}
            {activePageMeta.id === 'deposit-info' && <PoliciesPage />}
            {activePageMeta.id === 'chicago-meetups' && <Meetups />}
            {activePageMeta.id === 'nwi-meetups' && <Meetups />}
            {activePageMeta.id === 'sold-gallery' && <SoldGallery />}
            {activePageMeta.id === 'contact-support' && <ContactSupport />}

            {/* Page Type 2: Product Collections */}
            {activePageMeta.type === 'collection' && (
              <div className="space-y-6">
                {/* Collection Heading Banner */}
                <div className="ink-panel bg-black text-white p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <span className="bg-yellow-300 text-black comic-font text-xs md:text-sm px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#fff]">
                      ISSUE #1 • PAGE {currentPage + 1}
                    </span>
                    <h2 className="comic-font text-3xl md:text-5xl text-white mt-1">
                      {activePageMeta.collectionName?.toUpperCase()}
                    </h2>
                  </div>

                  <div className="bg-yellow-400 text-black comic-font text-xl md:text-2xl px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_#fff] rotate-1">
                    {activePageMeta.id === 'ga2100-showcase' && '$85 PER WATCH'}
                    {activePageMeta.id === 'custom-collection' && '$100 PER WATCH'}
                    {activePageMeta.id === 'ap-band' && '$110 PER WATCH'}
                    {activePageMeta.id === 'sweatsuits' && 'COMING SOON‼️'}
                    {activePageMeta.id === 'socks-beanies' && 'COMING SOON‼️'}
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {products
                    .filter((p) => p.collection === activePageMeta.collectionName)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                        onReserveDeposit={onReserveDeposit}
                      />
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM COMIC PAGE-TURN CONTROLS */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Prev Page Button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`ink-btn px-6 py-3 flex items-center gap-2 text-xl md:text-2xl cursor-pointer ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-400 border-gray-400 shadow-none cursor-not-allowed'
              : 'bg-white hover:bg-yellow-300 text-black'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft size={24} />
          <span>PREVIOUS PAGE</span>
        </button>

        {/* Center Page Indicator Badge */}
        <div className="flex items-center gap-3">
          <div className="comic-font text-2xl md:text-3xl bg-yellow-300 border-4 border-black px-6 py-2 shadow-[4px_4px_0px_#000]">
            PAGE {currentPage + 1} OF {totalPages}
          </div>
        </div>

        {/* Next Page Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className={`ink-btn px-6 py-3 flex items-center gap-2 text-xl md:text-2xl cursor-pointer ${
            currentPage === totalPages - 1
              ? 'bg-gray-200 text-gray-400 border-gray-400 shadow-none cursor-not-allowed'
              : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
          }`}
          aria-label="Next Page"
        >
          <span>NEXT PAGE</span>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
