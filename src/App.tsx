import React, { useState } from 'react';
import { OpeningScreen } from './features/Intro/OpeningScreen';
import { ComicBook } from './features/Shop/ComicBook';
import { ProductDetailModal } from './features/Shop/ProductDetailModal';
import { CartDrawer } from './features/Shop/CartDrawer';
import { CheckoutModal } from './features/Shop/CheckoutModal';
import { AdminModal } from './features/Admin/AdminModal';
import { LabAssistant } from './features/AI/LabAssistant';
import { PromoBanner } from './components/PromoBanner';
import { Footer } from './components/Footer';
import { GhostMascot } from './components/GhostMascot';
import { LoyaltyPunchCard } from './components/LoyaltyPunchCard';
import { GhostPunchCardModal } from './components/GhostPunchCardModal';
import { AuthModal } from './components/AuthModal';
import { AccountProfileModal } from './components/AccountProfileModal';
import { INITIAL_PRODUCTS, Product } from './data/products';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { getBackendStatus } from './lib/supabase';
import { ShoppingBag, Play, Instagram, Tag, User, Sparkles } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0); // Starts on Chapter 1: GA2100 Showcase

  // Ghost Magic Punch Pop-up state
  const [ghostModalData, setGhostModalData] = useState<{
    isOpen: boolean;
    watchesBought: number;
    previousPunches: number;
    newPunches: number;
  }>({
    isOpen: false,
    watchesBought: 1,
    previousPunches: 0,
    newPunches: 1
  });

  const {
    currentUser,
    users,
    signUp,
    signIn,
    signOut,
    loginAsDemo,
    addWatchPunches,
    redeemFreeWatch,
    resetUserPunches
  } = useAuth();

  const {
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
    totalItemsCount
  } = useCart(currentUser);

  const activePunches = currentUser ? currentUser.loyaltyPunches : 0;
  const activeFreeWatches = currentUser ? currentUser.freeWatchesEarned : 0;

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

  /**
   * Watch-only purchase handler: triggers the ghost poof animation
   * and sequential 5-hole punch animation.
   */
  const handleWatchPurchaseSuccess = (
    watchCount: number,
    orderId: string,
    grandTotal: number,
    itemsSummary: string
  ) => {
    if (currentUser && watchCount > 0) {
      const result = addWatchPunches(watchCount, orderId, grandTotal, itemsSummary);
      if (result) {
        setGhostModalData({
          isOpen: true,
          watchesBought: watchCount,
          previousPunches: result.previousPunches,
          newPunches: result.newPunches
        });
      }
    }
  };

  /**
   * Interactive simulation: allows testing 1, 2, or 5 watches directly!
   */
  const handleSimulateWatchPurchase = (count: number) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    const orderId = 'SDMW-SIM-' + Math.floor(100000 + Math.random() * 900000);
    const result = addWatchPunches(count, orderId, count * 90, `${count}x Simulated Custom Watch`);
    if (result) {
      setGhostModalData({
        isOpen: true,
        watchesBought: count,
        previousPunches: result.previousPunches,
        newPunches: result.newPunches
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black flex flex-col justify-between font-sans selection:bg-yellow-300 selection:text-black">
      {/* 1. FULLSCREEN OPENING SCREEN GATE */}
      {!hasEntered && (
        <OpeningScreen
          onEnterShop={() => {
            setHasEntered(true);
            setCurrentPage(0); // Starts on Chapter 1: Page 1
          }}
        />
      )}

      {/* 2. PROMO BANNER (5% off $85+, 10% off $125+ with ONESTOPSHOP, 5 punches = free watch) */}
      <PromoBanner />

      {/* 3. MAIN APP HEADER */}
      <header className="bg-white border-b-6 border-black sticky top-0 z-40 select-none shadow-[0px_4px_0px_#000]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand Left: Logo & Interactive Ghost Mascot */}
          <div className="flex items-center gap-3">
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

          {/* Quick Header Navigation Links Organized by Chapters */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-black uppercase">
            {/* Chapter 1: Watches */}
            <button
              onClick={() => setCurrentPage(0)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 0 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 1: GA2100 Showcase ($90)"
            >
              Showcase ($90)
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 1 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 1: Custom Collection ($110)"
            >
              Custom ($110)
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 2 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 1: AP Band Collection ($125)"
            >
              AP Band ($125)
            </button>

            {/* Chapter 2: Cloths */}
            <button
              onClick={() => setCurrentPage(4)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 4 || currentPage === 5 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 2: Streetwear & Cloths"
            >
              Cloths
            </button>

            {/* Chapter 3: Info */}
            <button
              onClick={() => setCurrentPage(6)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 6 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 3: Why Shop With Sean"
            >
              Why Shop
            </button>
            <button
              onClick={() => setCurrentPage(8)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 8 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 3: Chicago Meet-Ups"
            >
              Meet-Ups
            </button>
            <button
              onClick={() => setCurrentPage(7)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 7 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 3: $20 Deposit Policy"
            >
              $20 Deposit
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 3 ? 'text-red-600 underline decoration-2' : ''
              }`}
              title="Chapter 1: The Sold Archives Vault"
            >
              Sold Vault
            </button>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* VIP Account & Punch Card Header Trigger */}
            {currentUser ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-1.5 bg-yellow-300 hover:bg-yellow-400 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                title={`Logged in as ${currentUser.name}. Click to view VIP profile & 5-hole punch card.`}
                aria-label="View VIP Account and 5-hole punch card"
              >
                <User size={14} className="text-black" />
                <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                <span className="bg-black text-yellow-300 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {currentUser.loyaltyPunches}/5 🎟️
                </span>
                {currentUser.hasSignupBonus && (
                  <span className="hidden lg:inline bg-red-600 text-white text-[9px] font-black px-1 py-0.2 border border-black uppercase">
                    5% BONUS
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 bg-black hover:bg-yellow-400 hover:text-black text-yellow-300 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                title="Sign Up with Gmail & Phone for your VIP Loyalty Card + 5% OFF!"
              >
                <User size={14} />
                <span className="font-black">SIGN UP</span>
                <span className="text-[10px] bg-yellow-300 text-black px-1.5 py-0.2 font-black rounded-full">
                  5% OFF
                </span>
              </button>
            )}

            {/* Replay Intro Cinematic Button */}
            <button
              onClick={() => setHasEntered(false)}
              className="hidden md:flex items-center gap-1.5 bg-gray-100 hover:bg-yellow-200 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
              title="Re-play the Casio G-Shock materialization intro scene"
            >
              <Play size={13} className="fill-black" />
              <span>INTRO</span>
            </button>

            {/* Instagram Quick Link */}
            <a
              href="https://www.instagram.com/seandidmywrist/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 border-2 border-black px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
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

      {/* 4. INTERACTIVE COMIC BOOK APP (With Table of Contents & Compact Preview) */}
      <main className="flex-grow py-2 sm:py-4">
        <ComicBook
          products={products}
          onAddToCart={addToCart}
          onViewDetails={(product) => setSelectedProduct(product)}
          onReserveDeposit={handleReserveDeposit}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenLoyaltyCard={() => setIsLoyaltyOpen(true)}
          loyaltyPunches={activePunches}
          cartCount={totalItemsCount}
          currentPage={currentPage}
          onPageChange={(pageIdx) => setCurrentPage(pageIdx)}
        />
      </main>

      {/* 5. FLOATING AI LAB ASSISTANT */}
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
        appliedDiscountName={appliedDiscountName}
        stackingNotice={stackingNotice}
        total={total}
        promoCode={promoCode}
        onApplyPromoCode={applyPromoCode}
        onRemovePromoCode={removePromoCode}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
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
        appliedDiscountName={appliedDiscountName}
        stackingNotice={stackingNotice}
        onClearCart={clearCart}
        currentUser={currentUser}
        onWatchPurchaseSuccess={handleWatchPurchaseSuccess}
        onAddLoyaltyPunch={() => handleSimulateWatchPurchase(1)}
        loyaltyPunches={activePunches}
        onOpenLoyaltyCard={() => setIsLoyaltyOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* VIP Loyalty 5-Hole Punch Card Modal */}
      <LoyaltyPunchCard
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        punches={activePunches}
        freeWatchesEarned={activeFreeWatches}
        currentUser={currentUser}
        onAddPunch={(cnt) => handleSimulateWatchPurchase(cnt || 1)}
        onRedeemReward={redeemFreeWatch}
        onResetCard={resetUserPunches}
        onOpenAuth={() => {
          setIsLoyaltyOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* The Ghost of SeanDidMyWrist Magic Poof & Punch Modal */}
      <GhostPunchCardModal
        isOpen={ghostModalData.isOpen}
        onClose={() => setGhostModalData((prev) => ({ ...prev, isOpen: false }))}
        currentUser={currentUser}
        watchesBought={ghostModalData.watchesBought}
        previousPunches={ghostModalData.previousPunches}
        newPunches={ghostModalData.newPunches}
        onRedeemReward={redeemFreeWatch}
      />

      {/* Auth Modal (VIP Loyalty Card Sign Up with Gmail & Phone, 5% Bonus) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSignUp={signUp}
        onSignIn={signIn}
        onLoginDemo={loginAsDemo}
        users={users}
        initialTab="signup"
        onAccountCreated={() => {
          setIsLoyaltyOpen(true);
        }}
      />

      {/* Account Profile & Rewards Ledger Modal */}
      {currentUser && (
        <AccountProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currentUser={currentUser}
          onSignOut={signOut}
          onRedeemReward={redeemFreeWatch}
          onSimulateWatchPurchase={handleSimulateWatchPurchase}
          onOpenLoyaltyCard={() => {
            setIsProfileOpen(false);
            setIsLoyaltyOpen(true);
          }}
        />
      )}

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
