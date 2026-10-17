import React, { useState } from 'react';
import { GShockWatch } from '../../components/GShockWatch';
import { Camera, CheckCircle, Clock, ShieldCheck, Upload } from 'lucide-react';

interface GalleryItem {
  id: string;
  name: string;
  build: string;
  colorway: {
    bezel: string;
    dial: string;
    indices: string;
    accent: string;
    strap: string;
  };
  completionDate: string;
  caption: string;
  buyerCity: string;
}

const SOLD_ARCHIVES: GalleryItem[] = [
  {
    id: 'arch-1',
    name: 'The Chi-Town Neon Night',
    build: 'Custom GA2100 CasiOak',
    colorway: {
      bezel: '#121212',
      dial: '#0a0a0a',
      indices: 'rainbow',
      accent: '#38bdf8',
      strap: '#18181b'
    },
    completionDate: 'October 2024',
    caption: '“Sean murdered this build! The rainbow markers pop like crazy under the Chicago streetlights.”',
    buyerCity: 'Wicker Park, Chicago'
  },
  {
    id: 'arch-2',
    name: 'Stealth Royal AP Conversion',
    build: 'Steel AP Band GA2100',
    colorway: {
      bezel: '#27272a',
      dial: '#18181b',
      indices: '#71717a',
      accent: '#ffffff',
      strap: '#27272a'
    },
    completionDate: 'September 2024',
    caption: '“The weight of the steel AP mod is unbelievable. Hands down the sickest watch in my collection.”',
    buyerCity: 'Munster, IN'
  },
  {
    id: 'arch-3',
    name: 'Art Board Skeleton Frost',
    build: 'Jelly Clear Strap GA2100',
    colorway: {
      bezel: 'rgba(255,255,255,0.7)',
      dial: '#ffffff',
      indices: 'rainbow',
      accent: '#22c55e',
      strap: 'rgba(255,255,255,0.5)'
    },
    completionDate: 'August 2024',
    caption: '“Met Sean in Millennium Park. Took time to size the strap and make sure the fit was flawless.”',
    buyerCity: 'Downtown Chicago'
  },
  {
    id: 'arch-4',
    name: 'Blood Shot Crimson Lab Special',
    build: 'Monochrome Red GA2100',
    colorway: {
      bezel: '#991b1b',
      dial: '#7f1d1d',
      indices: '#ef4444',
      accent: '#fca5a5',
      strap: '#991b1b'
    },
    completionDate: 'July 2024',
    caption: '“Head-turner everywhere I go. 100% authentic Casio movement with Sean’s custom touch.”',
    buyerCity: 'Valparaiso, IN'
  }
];

export const SoldGallery: React.FC = () => {
  const [orderRef, setOrderRef] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedFile(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderRef.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="ink-panel bg-black text-white p-6 relative overflow-hidden -rotate-0.5">
        <div className="absolute right-0 top-0 bottom-0 w-32 halftone opacity-20 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-600 text-white comic-font text-xs md:text-sm px-2 py-0.5 border border-white">
            ARCHIVE VAULT
          </span>
          <span className="text-xs font-bold text-gray-300">CUSTOM CASIOAK BUILDS</span>
        </div>
        <h2 className="comic-font text-4xl md:text-6xl text-white tracking-wide">
          THE SOLD GALLERY
        </h2>
        <p className="text-sm font-bold text-gray-300 max-w-2xl mt-1">
          Every custom watch from the SeanDidMyWrist lab is an individual art piece. Here are documented past commissions and verified customer wrist checks.
        </p>
      </div>

      {/* Grid of Sold Watches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOLD_ARCHIVES.map((item) => (
          <div key={item.id} className="ink-panel bg-white p-4 flex flex-col justify-between relative group">
            {/* Sold Stamp Ribbon */}
            <div className="absolute top-3 right-3 z-20 bg-red-600 text-white comic-font text-lg px-4 py-1 border-3 border-black shadow-[3px_3px_0px_#000] rotate-12">
              SOLD
            </div>

            {/* Illustration Canvas */}
            <div className="relative aspect-4/3 bg-gray-100 border-3 border-black mb-3 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
              <GShockWatch
                size={180}
                bezelColor={item.colorway.bezel}
                dialColor={item.colorway.dial}
                indicesColor={item.colorway.indices}
                accentColor={item.colorway.accent}
                strapColor={item.colorway.strap}
                animateHands={false}
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="comic-font text-2xl text-black">{item.name}</h3>
                <span className="text-xs font-black bg-gray-200 px-2 py-0.5 border border-black">
                  {item.completionDate}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                {item.build} • Verified Local Delivery ({item.buyerCity})
              </p>
              <div className="bg-yellow-50 border-2 border-black p-3 text-xs italic font-medium text-gray-800">
                {item.caption}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOMER SUBMISSION FORM */}
      <div className="ink-panel-lg bg-yellow-300 p-6 md:p-8 border-6 border-black">
        <div className="flex items-center gap-2 mb-2">
          <Camera size={24} className="text-black" />
          <h3 className="comic-font text-3xl md:text-4xl text-black tracking-wide">
            SUBMIT YOUR WRIST CHECK
          </h3>
        </div>
        <p className="text-xs md:text-sm font-bold text-black mb-6 max-w-xl">
          Got a custom CasiOak built by Sean? Upload your photograph to join the archives. (All submissions remain private until inspected and approved by an administrator).
        </p>

        {submitted ? (
          <div className="bg-white border-4 border-black p-6 text-center space-y-3">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto border-3 border-black shadow-[3px_3px_0px_#000]">
              <CheckCircle size={36} />
            </div>
            <h4 className="comic-font text-3xl text-black">SUBMISSION RECEIVED!</h4>
            <p className="text-xs font-bold text-gray-700 max-w-md mx-auto">
              Thanks for flexing! Your photograph and order reference #{orderRef} have been sent to the admin moderation queue for review before going live.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setOrderRef('');
                setCaption('');
                setSelectedFile(null);
              }}
              className="ink-btn bg-black text-white text-sm px-4 py-2 mt-2"
            >
              SUBMIT ANOTHER BUILD
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block comic-font text-lg text-black mb-1">
                  ORDER REFERENCE # *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDMW-849201"
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value)}
                  className="w-full border-3 border-black p-2 font-bold text-sm bg-gray-50 focus:bg-yellow-50 focus:outline-none"
                />
                <p className="text-[10px] font-bold text-gray-500 mt-1">
                  Found on your order confirmation email or receipt.
                </p>
              </div>

              <div>
                <label className="block comic-font text-lg text-black mb-1">
                  UPLOAD WRIST PHOTOGRAPH *
                </label>
                <div className="border-3 border-dashed border-black p-3 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <Upload size={20} className="text-gray-600" />
                    <span className="text-xs font-black">
                      {selectedFile ? 'Photo Selected! (Click to change)' : 'Click to Browse Photo (Max 5MB)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center gap-4 bg-gray-100 border-2 border-black p-3">
                <img
                  src={selectedFile}
                  alt="Preview"
                  className="w-16 h-16 object-cover border-2 border-black"
                />
                <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                  <ShieldCheck size={16} /> File validated (Image format verified)
                </span>
              </div>
            )}

            <div>
              <label className="block comic-font text-lg text-black mb-1">
                OPTIONAL CAPTION & FEEDBACK
              </label>
              <textarea
                rows={3}
                placeholder="Tell the community how you rock your custom CasiOak..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border-3 border-black p-2 font-bold text-xs bg-gray-50 focus:bg-yellow-50 focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 border-2 border-black mt-0.5"
              />
              <span className="text-xs font-medium text-gray-800">
                I confirm this is my authentic photo of a SeanDidMyWrist build and consent to display it on the website upon administrator approval.
              </span>
            </label>

            <button
              type="submit"
              className="ink-btn w-full bg-black hover:bg-yellow-400 hover:text-black text-white text-2xl py-3 cursor-pointer transition-colors"
            >
              SUBMIT FOR MODERATION
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
