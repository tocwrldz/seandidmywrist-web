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
  ShoppingBag,
  Sliders,
  X,
  Search,
  RotateCcw,
  Check,
  Tag,
  BookOpen,
  Watch,
  Shirt,
  Info
} from 'lucide-react';

interface ComicBookProps {
  products: Product[];
  onAddToCart: (p: Product, isDeposit?: boolean) => void;
  onViewDetails: (p: Product) => void;
  onReserveDeposit: (p: Product) => void;
  onOpenCart: () => void;
  onOpenLoyaltyCard?: () => void;
  loyaltyPunches?: number;
  cartCount: number;
  initialPageIndex?: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

export interface ComicPageItem {
  id: string;
  title: string;
  chapter: 'chapter-1' | 'chapter-2' | 'chapter-3';
  chapterName: string;
  type: 'collection' | 'editorial';
  collectionName?: 'GA2100 Showcase' | 'Custom Collection' | 'GA2100 AP Band Collection' | 'Sweatsuits' | 'Socks and Beanies';
  description?: string;
}

export const COMIC_PAGES: ComicPageItem[] = [
  // =========================================================================
  // CHAPTER 1: WATCHES
  // =========================================================================
  {
    id: 'ga2100-showcase',
    title: 'GA2100 Showcase ($85)',
    chapter: 'chapter-1',
    chapterName: 'CHAPTER 1: WATCHES',
    type: 'collection',
    collectionName: 'GA2100 Showcase',
    description: 'Core CasiOak colorways in triple black, monochrome, rainbow & midnight blue.'
  },
  {
    id: 'custom-collection',
    title: 'Custom Collection ($100)',
    chapter: 'chapter-1',
    chapterName: 'CHAPTER 1: WATCHES',
    type: 'collection',
    collectionName: 'Custom Collection',
    description: 'Handbuilt custom timepieces featuring bespoke hand-painted dials & accents.'
  },
  {
    id: 'ap-band',
    title: 'GA2100 AP Band Collection ($110)',
    chapter: 'chapter-1',
    chapterName: 'CHAPTER 1: WATCHES',
    type: 'collection',
    collectionName: 'GA2100 AP Band Collection',
    description: 'Luxury stainless steel Royal Oak bracelet conversions with butterfly clasps.'
  },
  {
    id: 'sold-gallery',
    title: 'The Sold Archives Vault',
    chapter: 'chapter-1',
    chapterName: 'CHAPTER 1: WATCHES',
    type: 'editorial',
    description: 'Lookbook of historical 1-of-1 client custom commissions and archive drops.'
  },

  // =========================================================================
  // CHAPTER 2: CLOTHS
  // =========================================================================
  {
    id: 'sweatsuits',
    title: 'Sweatsuits (Nike & Essentials)',
    chapter: 'chapter-2',
    chapterName: 'CHAPTER 2: CLOTHS',
    type: 'collection',
    collectionName: 'Sweatsuits',
    description: 'Curated Nike Tech Fleece & Essentials sets matched to custom timepieces.'
  },
  {
    id: 'socks-beanies',
    title: 'Socks and Beanies (Supreme)',
    chapter: 'chapter-2',
    chapterName: 'CHAPTER 2: CLOTHS',
    type: 'collection',
    collectionName: 'Socks and Beanies',
    description: 'Authentic Supreme Hanes crew socks & ribbed winter knit box logo beanies.'
  },

  // =========================================================================
  // CHAPTER 3: INFO
  // =========================================================================
  {
    id: 'why-shop',
    title: 'Why Shop With Sean',
    chapter: 'chapter-3',
    chapterName: 'CHAPTER 3: INFO',
    type: 'editorial',
    description: 'Sean’s dedication to verified authenticity, craftsmanship, and local community.'
  },
  {
    id: 'deposit-info',
    title: '$20 Deposit & Sunday Cutoff',
    chapter: 'chapter-3',
    chapterName: 'CHAPTER 3: INFO',
    type: 'editorial',
    description: 'Complete policy on 7-day watch reservations and Sunday 5PM CT cutoff rules.'
  },
  {
    id: 'chicago-meetups',
    title: 'Chicago Meet-Ups',
    chapter: 'chapter-3',
    chapterName: 'CHAPTER 3: INFO',
    type: 'editorial',
    description: 'Designated safe pickup hubs throughout the Chicago loop and downtown.'
  },
  {
    id: 'nwi-meetups',
    title: 'Northwest Indiana Meet-Ups',
    chapter: 'chapter-3',
    chapterName: 'CHAPTER 3: INFO',
    type: 'editorial',
    description: 'Regional meet-up spots across Northwest Indiana (Hammond, Merrillville, Schererville).'
  },
  {
    id: 'contact-support',
    title: 'Contact and Support',
    chapter: 'chapter-3',
    chapterName: 'CHAPTER 3: INFO',
    type: 'editorial',
    description: 'Direct DM line, order inquiries, bespoke commissions, and lab guarantees.'
  }
];

export const CHAPTERS = [
  {
    id: 'chapter-1' as const,
    chapterNumber: 1,
    name: 'WATCHES',
    title: 'CHAPTER 1: WATCHES',
    icon: Watch,
    badge: '4 SECTIONS',
    color: 'bg-black text-white hover:bg-yellow-400 hover:text-black',
    activeColor: 'bg-yellow-400 text-black border-black',
    firstPageIndex: 0
  },
  {
    id: 'chapter-2' as const,
    chapterNumber: 2,
    name: 'CLOTHS',
    title: 'CHAPTER 2: CLOTHS',
    icon: Shirt,
    badge: '2 SECTIONS',
    color: 'bg-black text-white hover:bg-yellow-400 hover:text-black',
    activeColor: 'bg-yellow-400 text-black border-black',
    firstPageIndex: 4
  },
  {
    id: 'chapter-3' as const,
    chapterNumber: 3,
    name: 'INFO',
    title: 'CHAPTER 3: INFO',
    icon: Info,
    badge: '5 SECTIONS',
    color: 'bg-black text-white hover:bg-yellow-400 hover:text-black',
    activeColor: 'bg-yellow-400 text-black border-black',
    firstPageIndex: 6
  }
];

export const ComicBook: React.FC<ComicBookProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  onReserveDeposit,
  onOpenCart,
  onOpenLoyaltyCard,
  loyaltyPunches = 0,
  cartCount,
  currentPage,
  onPageChange
}) => {
  const [showIndex, setShowIndex] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Active Chapter Selector (defaults to current page's chapter)
  const activePageMeta = COMIC_PAGES[currentPage] || COMIC_PAGES[0];
  const [selectedChapterTab, setSelectedChapterTab] = useState<'chapter-1' | 'chapter-2' | 'chapter-3'>(
    activePageMeta.chapter
  );

  // Sync selected tab with current page when user flips
  useEffect(() => {
    if (activePageMeta) {
      setSelectedChapterTab(activePageMeta.chapter);
    }
  }, [currentPage, activePageMeta]);

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'reserved'>('all');
  const [filterPrice, setFilterPrice] = useState<'all' | 'under100' | '100plus'>('all');
  const [filterSearch, setFilterSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const totalPages = COMIC_PAGES.length;

  // ENSURE SCREEN RESETS TO TOP WHEN PAGE FLIPS
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  const goToNextPage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (currentPage < totalPages - 1) {
      setDirection('next');
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const goToPrevPage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (currentPage > 0) {
      setDirection('prev');
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const jumpToPage = (index: number) => {
    const safeIdx = Math.max(0, Math.min(index, totalPages - 1));
    setDirection(safeIdx > currentPage ? 'next' : 'prev');
    onPageChange(safeIdx);
    setShowIndex(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      goToNextPage();
    } else if (diff < -45) {
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

  // Animation variants
  const pageVariants: any = {
    enter: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22 }
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.16 }
    })
  };

  // Current collection products with filtering applied
  const currentCollectionProducts = activePageMeta.type === 'collection' && activePageMeta.collectionName
    ? products.filter((p) => p.collection === activePageMeta.collectionName)
    : [];

  const allFilteredProducts = products.filter((p) => {
    if (filterAvailability === 'available' && p.status !== 'available') return false;
    if (filterAvailability === 'reserved' && p.status !== 'reserved') return false;
    if (filterPrice === 'under100' && p.price >= 100) return false;
    if (filterPrice === '100plus' && p.price < 100) return false;
    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchColor = p.colorway.style.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchColor) return false;
    }
    return true;
  });

  const filteredProducts = currentCollectionProducts.filter((p) => {
    if (filterAvailability === 'available' && p.status !== 'available') return false;
    if (filterAvailability === 'reserved' && p.status !== 'reserved') return false;
    if (filterPrice === 'under100' && p.price >= 100) return false;
    if (filterPrice === '100plus' && p.price < 100) return false;
    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchColor = p.colorway.style.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchColor) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return 0;
  });

  const hasActiveFilters =
    filterAvailability !== 'all' ||
    filterPrice !== 'all' ||
    filterSearch.trim() !== '' ||
    sortOrder !== 'default';

  const resetFilters = () => {
    setFilterAvailability('all');
    setFilterPrice('all');
    setFilterSearch('');
    setSortOrder('default');
  };

  // Pages under selected chapter tab
  const chapterPages = COMIC_PAGES.filter((p) => p.chapter === selectedChapterTab);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 md:py-6 select-none">
      {/* ===================================================================== */}
      {/* 1. TABLE OF CONTENTS HEADER (With Chapter 1-Watches, Chapter 2-Cloths, Chapter 3-Info) */}
      {/* ===================================================================== */}
      <div className="bg-yellow-300 border-4 sm:border-6 border-black shadow-[6px_6px_0px_#000] p-3 sm:p-4 mb-4">
        {/* Table of Contents Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-black text-yellow-300 comic-font text-xs sm:text-sm px-2.5 py-0.5 border border-black -rotate-1">
              ISSUE DIRECTORY
            </span>
            <h2 className="comic-font text-2xl sm:text-4xl text-black tracking-wide leading-none">
              TABLE OF CONTENTS
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-black bg-white px-2 py-0.5 border border-black">
              PAGE {currentPage + 1} OF {totalPages}
            </span>
            <button
              onClick={() => setShowIndex(true)}
              className="bg-black text-white hover:bg-red-600 px-2 py-0.5 text-xs font-bold border border-black flex items-center gap-1 cursor-pointer transition-colors"
              title="Open full expanded index"
            >
              <List size={13} />
              <span>FULL INDEX</span>
            </button>
          </div>
        </div>

        {/* The 3 Main Chapters: Chapter 1-Watches, Chapter 2-Cloths, Chapter 3-Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {CHAPTERS.map((ch) => {
            const Icon = ch.icon;
            const isTabActive = selectedChapterTab === ch.id;
            const isCurrentPageInChapter = activePageMeta.chapter === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterTab(ch.id);
                  // Jump to the first page of that chapter
                  jumpToPage(ch.firstPageIndex);
                }}
                className={`p-2.5 sm:p-3 border-3 border-black text-left flex items-center justify-between transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-black text-yellow-300 shadow-[3px_3px_0px_#ef4444] -translate-y-0.5'
                    : 'bg-white hover:bg-yellow-100 text-black shadow-[2px_2px_0px_#000]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 border-2 border-black ${isTabActive ? 'bg-yellow-300 text-black' : 'bg-black text-white'}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="comic-font text-base sm:text-lg leading-tight">
                      {ch.title}
                    </div>
                    <div className={`text-[10px] font-bold uppercase ${isTabActive ? 'text-yellow-200' : 'text-gray-500'}`}>
                      {ch.badge}
                    </div>
                  </div>
                </div>
                {isCurrentPageInChapter && (
                  <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 border border-black animate-pulse">
                    OPEN
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sub-sections of the selected Chapter - Press any section button to jump! */}
        <div className="bg-white border-3 border-black p-2.5 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-200 text-xs font-bold text-gray-700">
            <span className="flex items-center gap-1.5 text-black font-black">
              <BookOpen size={14} className="text-black" />
              <span>
                {selectedChapterTab === 'chapter-1' && 'CHAPTER 1: WATCHES SECTIONS — PRESS TO VIEW:'}
                {selectedChapterTab === 'chapter-2' && 'CHAPTER 2: CLOTHS SECTIONS — PRESS TO VIEW:'}
                {selectedChapterTab === 'chapter-3' && 'CHAPTER 3: INFO SECTIONS — PRESS TO VIEW IN COMIC FORMAT:'}
              </span>
            </span>
            <span className="text-[10px] text-gray-500">Tap to jump</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {chapterPages.map((page) => {
              const pageIdx = COMIC_PAGES.findIndex((p) => p.id === page.id);
              const isActive = currentPage === pageIdx;

              return (
                <button
                  key={page.id}
                  onClick={() => jumpToPage(pageIdx)}
                  className={`px-2.5 py-1 text-xs font-bold border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-[2px_2px_0px_#000] font-black'
                      : 'bg-gray-50 hover:bg-yellow-200 text-black'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${isActive ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {pageIdx + 1}
                  </span>
                  <span>{page.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. COMIC NAVIGATION TOOLBAR (Prev / Next, Page Dropdown, Filter, Cart) */}
      {/* ===================================================================== */}
      <div className="bg-white border-4 border-black p-2 sm:p-2.5 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-[4px_4px_0px_#000]">
        {/* Left: Prev / Next Buttons & Page Picker */}
        <div className="flex items-center gap-1 bg-yellow-300 border-2 border-black p-1 shadow-[2px_2px_0px_#000]">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`p-1 font-black border-2 border-black flex items-center gap-1 text-xs transition-colors cursor-pointer ${
              currentPage === 0
                ? 'opacity-30 border-gray-400 bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-black hover:text-white'
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <div className="flex items-center px-1">
            <select
              value={currentPage}
              onChange={(e) => jumpToPage(Number(e.target.value))}
              className="comic-font text-xs sm:text-sm bg-white border border-black px-1.5 py-0.5 focus:outline-none cursor-pointer text-black"
              aria-label="Select comic page"
            >
              {COMIC_PAGES.map((p, idx) => (
                <option key={p.id} value={idx} className="font-sans font-bold text-xs text-black bg-white">
                  Page {idx + 1}: {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-1 font-black border-2 border-black flex items-center gap-1 text-xs transition-colors cursor-pointer ${
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

        {/* Right: Filter Toggle, Punch Card, Haul */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`ink-btn px-2.5 py-1.5 text-xs flex items-center gap-1 cursor-pointer transition-all ${
              isFilterOpen || hasActiveFilters
                ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_#ef4444]'
                : 'bg-white hover:bg-gray-100 text-black'
            }`}
            title="Filter and sort watches"
          >
            <Sliders size={14} />
            <span className="font-black">FILTER</span>
            {hasActiveFilters && (
              <span className="bg-red-600 text-white text-[9px] px-1 py-0.2 rounded-full font-bold animate-pulse">
                ON
              </span>
            )}
          </button>

          {/* Loyalty Punch Card Trigger */}
          {onOpenLoyaltyCard && (
            <button
              onClick={onOpenLoyaltyCard}
              className="ink-btn bg-yellow-300 hover:bg-yellow-400 text-black px-2.5 py-1.5 text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title="View your 5-hole VIP Loyalty Punch Card"
            >
              <Tag size={14} />
              <span className="hidden sm:inline">PUNCH CARD</span>
              <span className="bg-black text-yellow-300 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {loyaltyPunches}/5
              </span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white px-3 py-1.5 text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShoppingBag size={14} />
            <span>HAUL</span>
            {cartCount > 0 && (
              <span className="bg-yellow-400 text-black comic-font text-xs px-1.5 py-0.2 border border-black rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* FILTER DRAWER / PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="ink-panel bg-yellow-100 border-4 border-black p-3.5 sm:p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Sliders size={16} className="text-black" />
                  <h4 className="comic-font text-lg sm:text-xl text-black">
                    CATALOG FILTER & SORT
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="bg-red-600 text-white hover:bg-black text-[11px] font-bold px-2 py-0.5 border border-black flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={11} />
                      <span>RESET</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-black text-white hover:bg-red-600 p-1 border border-black transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div>
                  <label className="block font-black text-gray-800 mb-1">SEARCH WATCHES:</label>
                  <div className="relative">
                    <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g. Stealth, Rainbow, AP..."
                      value={filterSearch}
                      onChange={(e) => setFilterSearch(e.target.value)}
                      className="w-full bg-white border-2 border-black pl-7 pr-2 py-1 font-bold focus:outline-none focus:bg-yellow-50 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-black text-gray-800 mb-1">AVAILABILITY:</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setFilterAvailability('all')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterAvailability === 'all' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterAvailability('available')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterAvailability === 'available' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      In Stock
                    </button>
                    <button
                      onClick={() => setFilterAvailability('reserved')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterAvailability === 'reserved' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      Hold
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-black text-gray-800 mb-1">PRICE RANGE:</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setFilterPrice('all')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterPrice === 'all' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterPrice('under100')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterPrice === 'under100' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      &lt;$100
                    </button>
                    <button
                      onClick={() => setFilterPrice('100plus')}
                      className={`flex-1 py-1 px-1 border-2 border-black font-bold text-center cursor-pointer ${
                        filterPrice === '100plus' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                      }`}
                    >
                      $100+
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-black text-gray-800 mb-1">SORT ORDER:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="w-full bg-white border-2 border-black p-1 font-bold text-xs focus:outline-none"
                  >
                    <option value="default">Default Catalog Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {activePageMeta.type !== 'collection' && hasActiveFilters && (
                <div className="mt-2.5 pt-2 border-t-2 border-black flex flex-wrap items-center justify-between gap-2 bg-white p-2 border border-black">
                  <span className="font-bold text-xs text-black">
                    🎯 Found <span className="font-black text-red-600">{allFilteredProducts.length} matching watches</span>.
                  </span>
                  <button
                    onClick={() => jumpToPage(0)} // Jump to GA2100 Showcase in Chapter 1
                    className="ink-btn bg-black text-white text-xs px-2.5 py-1 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  >
                    JUMP TO WATCH CHAPTER
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CLICKABLE COMIC INDEX MODAL */}
      <AnimatePresence>
        {showIndex && (
          <div className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs select-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white border-6 border-black shadow-[10px_10px_0px_#000] p-5 sm:p-7 max-h-[88vh] overflow-y-auto my-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-4">
                <div>
                  <span className="bg-yellow-300 comic-font text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                    COMPLETE ISSUE DIRECTORY
                  </span>
                  <h3 className="comic-font text-3xl sm:text-4xl text-black mt-1">
                    TABLE OF CONTENTS
                  </h3>
                </div>
                <button
                  onClick={() => setShowIndex(false)}
                  className="bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer"
                  aria-label="Close index"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Grouped by Chapters */}
              <div className="space-y-4">
                {CHAPTERS.map((ch) => {
                  const pages = COMIC_PAGES.filter((p) => p.chapter === ch.id);
                  return (
                    <div key={ch.id} className="border-3 border-black bg-yellow-50 p-3 shadow-[2px_2px_0px_#000]">
                      <div className="bg-black text-yellow-300 comic-font text-sm px-2.5 py-1 inline-block mb-2">
                        {ch.title}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pages.map((page) => {
                          const idx = COMIC_PAGES.findIndex((p) => p.id === page.id);
                          const isCurrent = currentPage === idx;
                          return (
                            <button
                              key={page.id}
                              onClick={() => jumpToPage(idx)}
                              className={`text-left p-2.5 border-2 border-black flex items-center gap-2.5 transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-yellow-300 shadow-[2px_2px_0px_#000] font-black'
                                  : 'bg-white hover:bg-yellow-100 hover:translate-x-0.5'
                              }`}
                            >
                              <span className="w-6 h-6 bg-black text-white comic-font text-xs flex items-center justify-center shrink-0 border border-black">
                                {idx + 1}
                              </span>
                              <div>
                                <p className="comic-font text-sm sm:text-base text-black leading-tight">
                                  {page.title}
                                </p>
                                <p className="text-[10px] text-gray-500 font-bold">
                                  {page.type === 'collection' ? 'Product Showcase' : 'Editorial Feature'}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 3. MAIN COMIC BOOK SPREAD CONTAINER (Compact, clean preview format) */}
      {/* ===================================================================== */}
      <div
        id="comic-spread-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white border-5 sm:border-7 border-black shadow-[8px_8px_0px_#000] p-3 sm:p-6 overflow-hidden touch-pan-y"
      >
        {/* Halftone subtle dots across paper page */}
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
            {/* ------------------------------------------------------------- */}
            {/* CHAPTER 3 & EDITORIAL PAGES: Business Info in Comic Format */}
            {/* ------------------------------------------------------------- */}
            {activePageMeta.id === 'why-shop' && <WhyShop />}
            {activePageMeta.id === 'deposit-info' && <PoliciesPage />}
            {activePageMeta.id === 'chicago-meetups' && <Meetups />}
            {activePageMeta.id === 'nwi-meetups' && <Meetups />}
            {activePageMeta.id === 'sold-gallery' && <SoldGallery />}
            {activePageMeta.id === 'contact-support' && <ContactSupport />}

            {/* ------------------------------------------------------------- */}
            {/* PRODUCT COLLECTION PAGES (Chapter 1 Watches & Chapter 2 Cloths) */}
            {/* ------------------------------------------------------------- */}
            {activePageMeta.type === 'collection' && (
              <div className="space-y-4 sm:space-y-5">
                {/* Collection Heading Banner */}
                <div className="ink-panel bg-black text-white p-3.5 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="bg-yellow-300 text-black comic-font text-xs px-2 py-0.5 border border-black shadow-[1px_1px_0px_#fff]">
                      {activePageMeta.chapterName} • PAGE {currentPage + 1}
                    </span>
                    <h3 className="comic-font text-2xl sm:text-4xl text-white mt-1">
                      {activePageMeta.collectionName?.toUpperCase()}
                    </h3>
                  </div>

                  <div className="bg-yellow-400 text-black comic-font text-lg sm:text-xl px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#fff] rotate-1">
                    {activePageMeta.id === 'ga2100-showcase' && '$85 PER WATCH'}
                    {activePageMeta.id === 'custom-collection' && '$100 PER WATCH'}
                    {activePageMeta.id === 'ap-band' && '$110 PER WATCH'}
                    {activePageMeta.id === 'sweatsuits' && 'COMING SOON‼️'}
                    {activePageMeta.id === 'socks-beanies' && 'COMING SOON‼️'}
                  </div>
                </div>

                {/* Filter Active Notice on Collection Page */}
                {hasActiveFilters && (
                  <div className="bg-yellow-100 border-2 border-black p-2 flex items-center justify-between text-xs font-bold">
                    <span>
                      Active Filter: Showing {filteredProducts.length} of {currentCollectionProducts.length} items
                    </span>
                    <button
                      onClick={resetFilters}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}

                {/* Compact Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="ink-panel bg-gray-50 p-6 text-center space-y-2">
                    <p className="comic-font text-xl text-black">NO ITEMS MATCH YOUR ACTIVE FILTER</p>
                    <p className="text-xs font-bold text-gray-500">
                      Try resetting your filter parameters or search term.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="ink-btn bg-black text-white text-xs px-3 py-1 cursor-pointer"
                    >
                      RESET FILTERS
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                        onReserveDeposit={onReserveDeposit}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comic Book Page Bottom Navigation Strip */}
        <div className="mt-6 pt-3 border-t-3 border-black flex items-center justify-between text-xs font-bold">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 cursor-pointer ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-red-600'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous Page</span>
          </button>

          <span className="comic-font text-sm bg-yellow-300 px-2.5 py-0.5 border border-black">
            PAGE {currentPage + 1} OF {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1 cursor-pointer ${
              currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-red-600'
            }`}
          >
            <span>Next Page</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
