import React, { useState } from 'react';
import { OpeningScreen } from './features/Intro/OpeningScreen';
import { ComicBook, COMIC_PAGES } from './features/Shop/ComicBook';
import { ProductCard } from './features/Shop/ProductCard';
import { ProductDetailModal } from './features/Shop/ProductDetailModal';
import { CartDrawer } from './features/Shop/CartDrawer';
import { CheckoutModal } from './features/Shop/CheckoutModal';
import { AdminModal } from './features/Admin/AdminModal';
import { LabAssistant } from './features/AI/LabAssistant';
import { PromoBanner } from './components/PromoBanner';
import { Footer } from './components/Footer';
import { GhostMascot } from './components/GhostMascot';
import { INITIAL_PRODUCTS, Product } from './data/products';
import { useCart } from './hooks/useCart';
import { getBackendStatus } from './lib/supabase';
import { ShoppingBag, Play, Instagram, ShieldCheck, Database } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0); // Starts on Page 1: Why Shop With Sean

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    isFirstOrder,
    totalItemsCount
  } = useCart();

  const backendStatus = getBackendStatus();

  // Admin inventory updates
  const handleUpdateProductStatus = (id: string, newStatus: Product['status']) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const handleReserveDeposit = (product: Product) => {
    addToCart(product, true);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black flex flex-col justify-between font-sans selection:bg-yellow-300 selection:text-black">
      {/* 1. FULLSCREEN OPENING SCREEN GATE (Phase 1) */}
      {!hasEntered && (
        <OpeningScreen
          onEnterShop={() => {
            setHasEntered(true);
            setCurrentPage(0); // Starts on Page 1
          }}
        />
      )}

      {/* 2. PROMO BANNER (Phase 3 First-Time Shopper 5% Offer) */}
      <PromoBanner />

      {/* 3. MAIN APP HEADER */}
      <header className="bg-white border-b-6 border-black sticky top-0 z-40 select-none shadow-[0px_4px_0px_#000]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand Left: Logo & Interactive Ghost Mascot */}
          <div className="flex items-center gap-3">
            {/* Interactive Ghost Mascot: Floats, winks, speech bubble on hover/tap */}
            <GhostMascot
              size={56}
              interactive={true}
              speechText="SEAN DID IT! CUSTOMIZED 4U!"
            />

            <div>
              <div className="flex items-center gap-2">
                <span className="comic-font text-2xl md:text-4xl tracking-wider text-black leading-none">
                  SEANDIDMYWRIST
                </span>
                <span className="hidden sm:inline-block bg-yellow-300 text-black comic-font text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] -rotate-2">
                  CUSTOM LAB
                </span>
              </div>
              <p className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                Hand-built G-Shock GA2100 CasiOak • Chicago & NWI
              </p>
            </div>
          </div>

          {/* Quick Header Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-black uppercase">
            <button
              onClick={() => setCurrentPage(4)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 4 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              Showcase ($85)
            </button>
            <button
              onClick={() => setCurrentPage(5)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 5 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              Custom ($100)
            </button>
            <button
              onClick={() => setCurrentPage(6)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 6 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              AP Band ($110)
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 2 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              Meet-Ups
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 1 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              $20 Deposit
            </button>
            <button
              onClick={() => setCurrentPage(9)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 9 ? 'text-red-600 underline decoration-2' : ''
              }`}
            >
              Sold Vault
            </button>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Replay Intro Cinematic Button */}
            <button
              onClick={() => setHasEntered(false)}
              className="hidden sm:flex items-center gap-1.5 bg-gray-100 hover:bg-yellow-200 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
              title="Re-play the Casio G-Shock materialization intro scene"
            >
              <Play size={13} className="fill-black" />
              <span>REPLAY INTRO</span>
            </button>

            {/* Instagram Quick Link */}
            <a
              href="https://www.instagram.com/seandidmywrist/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
            >
              <Instagram size={14} className="text-pink-600" />
              <span>@SEANDIDMYWRIST</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white px-3.5 py-1.5 text-base md:text-lg flex items-center gap-2 cursor-pointer transition-colors relative"
              aria-label={`Open shopping cart with ${totalItemsCount} items`}
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">HAUL</span>
              {totalItemsCount > 0 && (
                <span className="bg-yellow-400 text-black comic-font text-xs px-2 py-0.5 border border-black rounded-full">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 4. MAIN COMIC BOOK EXPERIENCE SPREAD */}
      <main className="flex-grow">
        <ComicBook
          products={products}
          onAddToCart={(product, isDeposit) => addToCart(product, isDeposit)}
          onViewDetails={(product) => setSelectedProduct(product)}
          onReserveDeposit={handleReserveDeposit}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalItemsCount}
          currentPage={currentPage}
          onPageChange={(pageIdx) => setCurrentPage(pageIdx)}
        />
      </main>

      {/* 5. FLOATING AI LAB ASSISTANT (Phase 6) */}
      <LabAssistant
        onNavigateToPage={(pageIdx) => setCurrentPage(pageIdx)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 6. MODALS & DRAWERS */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, isDeposit) => addToCart(p, isDeposit)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        discountAmount={discountAmount}
        total={total}
        isFirstOrder={isFirstOrder}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onClearCart={clearCart}
      />

      {/* Admin Control Center Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProductStatus={handleUpdateProductStatus}
        onUpdateProductPrice={handleUpdateProductPrice}
      />

      {/* 7. SITE FOOTER */}
      <Footer
        onNavigateToPage={(pageIdx) => setCurrentPage(pageIdx)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
