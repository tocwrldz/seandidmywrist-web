import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../hooks/useCart';
import { SHIPPING_POLICY } from '../../data/policies';
import { checkDepositEligibility, calculateReservationDeadline, formatDeadline } from '../../lib/businessRules';
import { X, CheckCircle, ShieldAlert, CreditCard, DollarSign, MapPin, Truck, Check, Bookmark } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discountAmount,
  onClearCart
}) => {
  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(true);
  const [shippingMethodIndex, setShippingMethodIndex] = useState(0);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('IL');
  const [zip, setZip] = useState('');
  const [meetupLocation, setMeetupLocation] = useState('Millennium Park (Chicago)');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cashapp' | 'zelle' | 'deposit'>('stripe');
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const selectedShipping = SHIPPING_POLICY.methods[shippingMethodIndex];
  const shippingFee = selectedShipping.price;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const hasDepositItems = cart.some((i) => i.isDepositReservation);

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    if (selectedShipping.price > 0 && (!street.trim() || !city.trim() || !zip.trim())) {
      setErrorMsg('Please enter your complete shipping address for postal delivery.');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    // Check Sunday Cutoff if Deposit Hold is selected
    if (paymentMethod === 'deposit' || hasDepositItems) {
      const eligibility = checkDepositEligibility();
      if (!eligibility.allowed) {
        setErrorMsg(eligibility.reason || 'Deposit reservations are closed on Sundays after 5:00 PM CT.');
        return;
      }
    }

    setIsProcessing(true);
    setErrorMsg('');

    // Simulate verified server-side transaction & order reference generation
    setTimeout(() => {
      const newOrderId = 'SDMW-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      setIsProcessing(false);
      setStep('confirmed');
      onClearCart();
    }, 1200);
  };

  const deadlineDate = calculateReservationDeadline();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white border-6 border-black shadow-[12px_12px_0px_#000] p-6 md:p-8 max-h-[92vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="border-b-4 border-black pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-300 comic-font text-sm px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                SEANDIDMYWRIST CHECKOUT
              </span>
              <span className="text-xs font-bold text-gray-500">
                {step === 'info' && 'STEP 1 OF 2: CONTACT & SHIPPING'}
                {step === 'payment' && 'STEP 2 OF 2: PAYMENT & VERIFICATION'}
                {step === 'confirmed' && 'ORDER CONFIRMED'}
              </span>
            </div>
            <h2 className="comic-font text-3xl md:text-4xl text-black mt-1">
              {step === 'confirmed' ? 'YO! YOU’RE LOCKED IN!' : 'LOCK IN YOUR ORDER'}
            </h2>
          </div>

          {errorMsg && (
            <div className="bg-red-100 border-3 border-red-600 p-3 mb-4 flex items-start gap-2">
              <ShieldAlert className="text-red-600 shrink-0 mt-0.5" size={18} />
              <p className="text-xs font-bold text-red-800">{errorMsg}</p>
            </div>
          )}

          {/* STEP 1: INFO & SHIPPING */}
          {step === 'info' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block comic-font text-lg text-black mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full border-3 border-black p-2.5 font-bold text-sm focus:outline-none focus:bg-yellow-50"
                  />
                </div>
                <div>
                  <label className="block comic-font text-lg text-black mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full border-3 border-black p-2.5 font-bold text-sm focus:outline-none focus:bg-yellow-50"
                  />
                </div>
              </div>

              <div>
                <label className="block comic-font text-lg text-black mb-1">
                  PHONE NUMBER (FOR ORDER & MEET-UP UPDATES)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(312) 555-0199"
                  className="w-full border-3 border-black p-2.5 font-bold text-sm focus:outline-none focus:bg-yellow-50"
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="w-4 h-4 border-2 border-black"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    Send me SMS updates when my watch is ready or dispatched (Opt-out anytime by replying STOP).
                  </span>
                </label>
              </div>

              {/* Shipping Method Selector */}
              <div>
                <label className="block comic-font text-lg text-black mb-1">
                  FULFILLMENT & DELIVERY METHOD *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {SHIPPING_POLICY.methods.map((method, idx) => (
                    <div
                      key={idx}
                      onClick={() => setShippingMethodIndex(idx)}
                      className={`p-3 border-3 border-black cursor-pointer transition-all ${
                        shippingMethodIndex === idx
                          ? 'bg-yellow-300 shadow-[4px_4px_0px_#000]'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="comic-font text-sm text-black">{method.name}</span>
                        <span className="comic-font text-lg text-black">
                          {method.price === 0 ? 'FREE' : `$${method.price}`}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-600">{method.timeline}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditional Address or Meet-up Spot */}
              {shippingMethodIndex === 0 ? (
                <div className="bg-gray-50 border-3 border-black p-3">
                  <label className="block comic-font text-sm text-black mb-1 flex items-center gap-1.5">
                    <MapPin size={16} /> PREFERRED PUBLIC MEET-UP REGION
                  </label>
                  <select
                    value={meetupLocation}
                    onChange={(e) => setMeetupLocation(e.target.value)}
                    className="w-full border-2 border-black p-2 font-bold text-sm bg-white"
                  >
                    <option value="Millennium Park (Chicago)">Millennium Park Plaza (Downtown Chicago)</option>
                    <option value="Wicker Park Square (Chicago)">Wicker Park Square (Damen & Milwaukee)</option>
                    <option value="Navy Pier (Chicago)">Navy Pier Public Esplanade</option>
                    <option value="Centennial Park (Munster, IN)">Centennial Park (Munster, Northwest Indiana)</option>
                    <option value="Valparaiso Square (Valparaiso, IN)">Valparaiso Square (Downtown Valpo, IN)</option>
                    <option value="Highland Library (Highland, IN)">Highland Library Public Concourse (45th Ave, IN)</option>
                  </select>
                  <p className="text-[11px] font-bold text-gray-500 mt-1">
                    * Sean confirms exact date and public time slot via email/SMS after order placement.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border-3 border-black p-3 space-y-2">
                  <label className="block comic-font text-sm text-black flex items-center gap-1.5">
                    <Truck size={16} /> SHIPPING DESTINATION
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street Address (e.g. 1420 N Michigan Ave)"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full border-2 border-black p-2 font-bold text-xs bg-white"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Chicago)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border-2 border-black p-2 font-bold text-xs bg-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State (IL or IN)"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="border-2 border-black p-2 font-bold text-xs bg-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="ZIP Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="border-2 border-black p-2 font-bold text-xs bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Order Breakdown Box */}
              <div className="bg-yellow-50 border-3 border-black p-3 space-y-1 text-xs font-bold">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>First Order Discount (5%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({selectedShipping.name}):</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xl comic-font text-black pt-2 border-t-2 border-black">
                  <span>ESTIMATED TOTAL:</span>
                  <span className="text-2xl">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="ink-btn w-full bg-black hover:bg-yellow-400 hover:text-black text-white text-2xl py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>CONTINUE TO PAYMENT</span>
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT & VERIFICATION */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="border-3 border-black p-3 bg-gray-50">
                <p className="text-xs font-bold text-gray-700">
                  Customer: <span className="text-black font-black">{name}</span> ({email})
                </p>
                <p className="text-xs font-bold text-gray-700">
                  Fulfillment: <span className="text-black font-black">{selectedShipping.name}</span>
                </p>
                <p className="text-xs font-bold text-gray-700">
                  Total Due: <span className="text-black font-black text-sm">${grandTotal.toFixed(2)}</span>
                </p>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block comic-font text-lg text-black mb-2">
                  CHOOSE PAYMENT OPTION
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 border-3 border-black flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-all ${
                      paymentMethod === 'stripe' ? 'bg-yellow-300 shadow-[4px_4px_0px_#000]' : 'bg-white'
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="comic-font text-sm">CARD / APPLE PAY</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cashapp')}
                    className={`p-3 border-3 border-black flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-all ${
                      paymentMethod === 'cashapp' ? 'bg-green-400 shadow-[4px_4px_0px_#000]' : 'bg-white'
                    }`}
                  >
                    <DollarSign size={20} />
                    <span className="comic-font text-sm">CASH APP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('zelle')}
                    className={`p-3 border-3 border-black flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-all ${
                      paymentMethod === 'zelle' ? 'bg-purple-300 shadow-[4px_4px_0px_#000]' : 'bg-white'
                    }`}
                  >
                    <CheckCircle size={20} />
                    <span className="comic-font text-sm">ZELLE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('deposit')}
                    className={`p-3 border-3 border-black flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-all ${
                      paymentMethod === 'deposit' ? 'bg-amber-300 shadow-[4px_4px_0px_#000]' : 'bg-white'
                    }`}
                  >
                    <Bookmark size={20} />
                    <span className="comic-font text-sm">$20 DEPOSIT HOLD</span>
                  </button>
                </div>
              </div>

              {/* Method Details */}
              {paymentMethod === 'stripe' && (
                <div className="ink-panel-sm bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="comic-font text-lg">STRIPE SECURE CHECKOUT</span>
                    <span className="text-[10px] font-black bg-gray-200 border border-black px-2 py-0.5">
                      SANDBOX / TEST MODE READY
                    </span>
                  </div>
                  <div className="border-2 border-black p-3 bg-gray-50 text-xs font-mono">
                    <p className="font-bold text-gray-500 mb-1">MOCK CARD EMULATION (4242...)</p>
                    <div className="flex justify-between py-1">
                      <span>Card Number:</span>
                      <span>•••• •••• •••• 4242</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Exp Date / CVC:</span>
                      <span>12/28 • 123</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-gray-600">
                    * In production, this securely opens the live Stripe Elements or Hosted Checkout session via STRIPE_SECRET_KEY.
                  </p>
                </div>
              )}

              {paymentMethod === 'cashapp' && (
                <div className="ink-panel-sm bg-green-50 p-4 space-y-2">
                  <h4 className="comic-font text-xl text-green-900">CASH APP BUSINESS VERIFICATION</h4>
                  <p className="text-xs font-bold text-gray-800">
                    Send order total (${grandTotal.toFixed(2)}) to: <span className="bg-black text-white px-2 py-0.5 font-mono">$seandidmywrist</span>
                  </p>
                  <p className="text-[11px] font-medium text-gray-600">
                    Include your order name ("{name}") in the Cash App note. Orders are officially marked Paid upon server webhook or verified bank ledger sync.
                  </p>
                </div>
              )}

              {paymentMethod === 'zelle' && (
                <div className="ink-panel-sm bg-purple-50 p-4 space-y-2">
                  <h4 className="comic-font text-xl text-purple-900">ZELLE BANK TRANSFER</h4>
                  <p className="text-xs font-bold text-gray-800">
                    Send to verified recipient: <span className="bg-black text-white px-2 py-0.5 font-mono">seandidmywrist@gmail.com</span>
                  </p>
                  <p className="text-[11px] font-medium text-gray-600">
                    Zelle transfers settle directly without third-party processing fees. Verification occurs against banking statements.
                  </p>
                </div>
              )}

              {paymentMethod === 'deposit' && (
                <div className="ink-panel-sm bg-amber-50 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="comic-font text-xl text-amber-900">7-DAY RESERVATION HOLD POLICY</h4>
                    <span className="text-[10px] font-black bg-black text-white px-2 py-0.5">
                      HOLD PERIOD
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-800">
                    Deposit Amount: <span className="bg-black text-white px-2 py-0.5 font-mono">$20.00</span>
                  </p>
                  <p className="text-xs text-gray-700">
                    Your chosen watch is locked exclusively in the lab until <span className="font-bold underline">{formatDeadline(deadlineDate)}</span> (7 business days).
                  </p>
                  <p className="text-[11px] font-bold text-amber-950">
                    Sunday Cutoff Reminder: New deposits are not accepted on Sundays after 5:00 PM Central Time. Cancellations retain 50% deposit refund policy.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="ink-btn bg-gray-200 hover:bg-gray-300 text-black px-4 py-3"
                >
                  BACK
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="ink-btn flex-grow bg-black hover:bg-yellow-400 hover:text-black text-white text-2xl py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {isProcessing ? (
                    <span className="comic-font text-xl">LOCKING IN ORDER...</span>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>{paymentMethod === 'deposit' ? 'CONFIRM $20 DEPOSIT' : 'CONFIRM & PLACE ORDER'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 bg-yellow-300 border-4 border-black rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000]">
                <CheckCircle size={44} className="text-black" />
              </div>

              <div className="bg-black text-white px-4 py-2 inline-block border-2 border-black -rotate-1 shadow-[4px_4px_0px_#fde047]">
                <h3 className="comic-font text-3xl md:text-4xl">ORDER #{orderId}</h3>
              </div>

              <p className="comic-font text-xl text-black">
                THANK YOU, {name.toUpperCase()}!
              </p>

              <div className="ink-panel-sm bg-gray-50 p-4 max-w-md mx-auto text-left text-xs font-bold space-y-2">
                <p>
                  Status: <span className="bg-green-600 text-white px-2 py-0.5">VERIFIED IN THE LAB</span>
                </p>
                <p>
                  Customer Email: <span className="text-gray-700">{email}</span>
                </p>
                <p>
                  Fulfillment: <span className="text-gray-700">{selectedShipping.name}</span>
                </p>
                {paymentMethod === 'deposit' ? (
                  <p className="text-amber-800 bg-amber-100 p-2 border border-black">
                    ⏱️ Deposit verified! Your watch is held until {formatDeadline(deadlineDate)}. Remaining balance settles at meet-up or before shipment.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    A confirmation email and SMS dispatch updates have been logged. Keep your order ID safe.
                  </p>
                )}
              </div>

              <p className="text-xs font-bold text-gray-500">
                Follow <a href="https://www.instagram.com/seandidmywrist/" target="_blank" rel="noopener noreferrer" className="text-black underline">@seandidmywrist</a> on Instagram for custom build reveals.
              </p>

              <button
                onClick={onClose}
                className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white text-xl px-8 py-3 mx-auto transition-colors cursor-pointer"
              >
                BACK TO COMIC CATALOG
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
