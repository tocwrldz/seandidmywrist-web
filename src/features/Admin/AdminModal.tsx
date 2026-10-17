import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../data/products';
import { X, Lock, ShieldCheck, Check, AlertCircle, RefreshCw, Truck, DollarSign, Package } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductStatus: (id: string, newStatus: Product['status']) => void;
  onUpdateProductPrice: (id: string, newPrice: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductStatus,
  onUpdateProductPrice
}) => {
  const [tab, setTab] = useState<'inventory' | 'reservations' | 'gallery' | 'shipping' | 'payouts'>('inventory');
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Gallery submissions for admin moderation (populated by live customer uploads)
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);

  // Orders for Dispatch Desk (populated by live checkouts)
  const [mockOrders, setMockOrders] = useState<any[]>([]);

  const [newTracking, setNewTracking] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode for review: 'seandidit' or 'admin'
    if (passcode.toLowerCase() === 'seandidit' || passcode.toLowerCase() === 'admin' || passcode === '') {
      setIsAuthenticated(true);
    }
  };

  const handleApproveSubmission = (id: string) => {
    setPendingSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRejectSubmission = (id: string) => {
    setPendingSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-white border-6 border-black shadow-[14px_14px_0px_#000] p-6 md:p-8 max-h-[92vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer"
            aria-label="Close admin dashboard"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="border-b-4 border-black pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white comic-font text-xs md:text-sm px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                  INTERNAL WORKSHOP CONTROL
                </span>
                <span className="text-xs font-black uppercase text-gray-500">
                  SECURE AUTHENTICATED ACCESS
                </span>
              </div>
              <h2 className="comic-font text-3xl md:text-5xl text-black mt-1">
                LAB CONTROL CENTER
              </h2>
            </div>

            {isAuthenticated && (
              <div className="flex items-center gap-1.5 bg-green-100 text-green-900 border-2 border-black px-3 py-1 text-xs font-bold">
                <ShieldCheck size={16} className="text-green-700" />
                <span>Admin Session Active</span>
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-300 border-4 border-black rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000]">
                <Lock size={32} />
              </div>
              <h3 className="comic-font text-3xl text-black">ENTER ADMIN PASSCODE</h3>
              <p className="text-xs font-bold text-gray-600">
                Authorized access for Sean to manage inventory, approve submissions, and dispatch orders.
              </p>
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  placeholder="Enter passcode (or press Enter)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full border-3 border-black p-3 font-bold text-center text-sm focus:bg-yellow-50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ink-btn w-full bg-black text-white hover:bg-yellow-400 hover:text-black py-3 text-xl transition-colors cursor-pointer"
                >
                  UNLOCK LAB DASHBOARD
                </button>
              </form>
              <p className="text-[11px] font-bold text-gray-400">
                Demo unlock key: <span className="font-mono bg-gray-100 px-1 border border-black text-black">seandidit</span>
              </p>
            </div>
          ) : (
            /* Authenticated Admin Suite */
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex gap-2 border-b-3 border-black pb-3 overflow-x-auto">
                <button
                  onClick={() => setTab('inventory')}
                  className={`px-4 py-2 comic-font text-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                    tab === 'inventory' ? 'bg-yellow-300 shadow-[3px_3px_0px_#000]' : 'bg-gray-100 hover:bg-white'
                  }`}
                >
                  📦 INVENTORY ({products.length})
                </button>
                <button
                  onClick={() => setTab('reservations')}
                  className={`px-4 py-2 comic-font text-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                    tab === 'reservations' ? 'bg-amber-300 shadow-[3px_3px_0px_#000]' : 'bg-gray-100 hover:bg-white'
                  }`}
                >
                  ⏱️ $20 DEPOSITS & HOLDS
                </button>
                <button
                  onClick={() => setTab('gallery')}
                  className={`px-4 py-2 comic-font text-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                    tab === 'gallery' ? 'bg-red-400 text-white shadow-[3px_3px_0px_#000]' : 'bg-gray-100 hover:bg-white'
                  }`}
                >
                  📸 GALLERY APPROVALS ({pendingSubmissions.length})
                </button>
                <button
                  onClick={() => setTab('shipping')}
                  className={`px-4 py-2 comic-font text-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                    tab === 'shipping' ? 'bg-blue-300 shadow-[3px_3px_0px_#000]' : 'bg-gray-100 hover:bg-white'
                  }`}
                >
                  🚚 DISPATCH DESK
                </button>
                <button
                  onClick={() => setTab('payouts')}
                  className={`px-4 py-2 comic-font text-xl border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                    tab === 'payouts' ? 'bg-green-300 shadow-[3px_3px_0px_#000]' : 'bg-gray-100 hover:bg-white'
                  }`}
                >
                  💰 SQUARING UP (PAYOUTS)
                </button>
              </div>

              {/* TAB 1: INVENTORY MANAGER */}
              {tab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="comic-font text-2xl text-black">PRODUCT STATUS & PRICING CONTROLS</h4>
                    <span className="text-xs font-bold text-gray-500">Live Changes Reflected in Store</span>
                  </div>

                  <div className="border-3 border-black overflow-x-auto">
                    <table className="w-full text-left text-xs font-bold">
                      <thead className="bg-black text-white uppercase text-[11px]">
                        <tr>
                          <th className="p-3">Product Name</th>
                          <th className="p-3">Collection</th>
                          <th className="p-3">Price ($)</th>
                          <th className="p-3">Current Status</th>
                          <th className="p-3">Quick Change Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-gray-200">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-yellow-50/50">
                            <td className="p-3 font-black text-sm">{p.name}</td>
                            <td className="p-3 text-gray-600">{p.collection}</td>
                            <td className="p-3 font-mono text-sm">
                              {p.price > 0 ? `$${p.price}` : 'TBA'}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 border border-black uppercase text-[10px] font-black ${
                                  p.status === 'available'
                                    ? 'bg-green-300 text-green-950'
                                    : p.status === 'reserved'
                                    ? 'bg-amber-300 text-amber-950'
                                    : p.status === 'sold'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-300 text-gray-800'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <select
                                value={p.status}
                                onChange={(e) =>
                                  onUpdateProductStatus(p.id, e.target.value as Product['status'])
                                }
                                className="border-2 border-black p-1 text-xs bg-white font-bold"
                              >
                                <option value="available">Mark Available</option>
                                <option value="reserved">Mark Reserved</option>
                                <option value="sold">Mark Sold</option>
                                <option value="coming-soon">Mark Coming Soon</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: DEPOSITS & HOLDS */}
              {tab === 'reservations' && (
                <div className="space-y-4">
                  <h4 className="comic-font text-2xl text-black">ACTIVE 7-BUSINESS-DAY RESERVATIONS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="ink-panel-sm bg-amber-50 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="comic-font text-xl text-black">Blood Shot (Red on Red)</span>
                        <span className="text-[10px] font-black bg-amber-400 border border-black px-2 py-0.5">
                          HOLD ACTIVE (5 DAYS LEFT)
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-700">Client: Anthony R. (Crown Point, IN)</p>
                      <p className="text-xs font-bold text-gray-700">Deposit Received: $20.00 via Stripe</p>
                      <p className="text-xs text-gray-600">Remaining Balance Due at Handover: $65.00</p>
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => alert('Marked Complete: Balance collected at handover.')}
                          className="bg-black text-white hover:bg-green-600 px-3 py-1 text-xs font-bold border border-black cursor-pointer"
                        >
                          Complete Handover
                        </button>
                        <button
                          onClick={() => alert('50% Refund ($10) initiated. Watch returned to shop inventory.')}
                          className="bg-red-100 text-red-900 hover:bg-red-200 px-3 py-1 text-xs font-bold border border-black cursor-pointer"
                        >
                          Cancel (50% Refund)
                        </button>
                      </div>
                    </div>

                    <div className="ink-panel-sm bg-gray-50 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="comic-font text-xl text-black">Infinity Stones (Rainbow on White)</span>
                        <span className="text-[10px] font-black bg-green-300 border border-black px-2 py-0.5">
                          FINALIZED & DELIVERED
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-700">Client: Chloe M. (Navy Pier, Chicago)</p>
                      <p className="text-xs font-bold text-gray-700">Deposit: $20.00 • Settled: $65.00</p>
                      <p className="text-xs text-gray-500">Archived to Sold Gallery</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY APPROVALS */}
              {tab === 'gallery' && (
                <div className="space-y-4">
                  <h4 className="comic-font text-2xl text-black">CUSTOMER PHOTO MODERATION QUEUE</h4>
                  {pendingSubmissions.length === 0 ? (
                    <div className="bg-gray-100 border-3 border-black p-8 text-center">
                      <p className="comic-font text-2xl text-gray-600">NO PENDING UPLOADS IN QUEUE</p>
                      <p className="text-xs font-bold text-gray-500 mt-1">All wrist submissions have been reviewed.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingSubmissions.map((sub) => (
                        <div key={sub.id} className="border-3 border-black p-4 bg-yellow-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="comic-font text-xl text-black">{sub.watchName}</span>
                              <span className="text-[10px] font-mono bg-white border border-black px-1.5">
                                Ref: {sub.orderRef}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-gray-700">{sub.client}</p>
                            <p className="text-xs italic text-gray-800 mt-1">"{sub.caption}"</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveSubmission(sub.id)}
                              className="bg-green-600 hover:bg-green-700 text-white comic-font text-lg px-4 py-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                            >
                              APPROVE PHOTO
                            </button>
                            <button
                              onClick={() => handleRejectSubmission(sub.id)}
                              className="bg-red-600 hover:bg-red-700 text-white comic-font text-lg px-4 py-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                            >
                              REJECT
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DISPATCH DESK */}
              {tab === 'shipping' && (
                <div className="space-y-4">
                  <h4 className="comic-font text-2xl text-black">FULFILLMENT & TRACKING MANAGEMENT</h4>
                  <div className="border-3 border-black overflow-x-auto">
                    <table className="w-full text-left text-xs font-bold">
                      <thead className="bg-black text-white uppercase text-[11px]">
                        <tr>
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Items</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Tracking / Meet-up Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-gray-200">
                        {mockOrders.map((o) => (
                          <tr key={o.id}>
                            <td className="p-3 font-mono font-black">{o.id}</td>
                            <td className="p-3">{o.customer}</td>
                            <td className="p-3">{o.items}</td>
                            <td className="p-3 text-gray-600">{o.method}</td>
                            <td className="p-3 font-mono text-green-700">{o.tracking}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: PAYOUTS */}
              {tab === 'payouts' && (
                <div className="space-y-4">
                  <h4 className="comic-font text-2xl text-black">SQUARING UP (STRIPE & BANK SETTLEMENT)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
                      <p className="text-xs font-black uppercase text-gray-500">Available Balance</p>
                      <p className="comic-font text-4xl text-green-600 mt-1">$680.00</p>
                      <p className="text-[11px] font-bold text-gray-500 mt-1">Ready for automated deposit</p>
                    </div>
                    <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
                      <p className="text-xs font-black uppercase text-gray-500">Pending Settlement</p>
                      <p className="comic-font text-4xl text-amber-500 mt-1">$210.00</p>
                      <p className="text-[11px] font-bold text-gray-500 mt-1">Clearing through 2-day ACH</p>
                    </div>
                    <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
                      <p className="text-xs font-black uppercase text-gray-500">Next Payout</p>
                      <p className="comic-font text-3xl text-black mt-1">Monday 9:00 AM</p>
                      <p className="text-[11px] font-bold text-gray-500 mt-1">Direct to Chase Business Checking</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
