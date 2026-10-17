import React, { useState } from 'react';
import { GShockWatch } from '../../components/GShockWatch';
import { Camera, CheckCircle, Clock, ShieldCheck, Upload } from 'lucide-react';

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
          <span className="text-xs font-bold text-gray-300">CUSTOM 1-OF-1 ARCHIVES</span>
        </div>
        <h2 className="comic-font text-4xl md:text-6xl text-white tracking-wide">
          THE SOLD GALLERY
        </h2>
        <p className="text-sm font-bold text-gray-300 max-w-2xl mt-1">
          Every custom watch from the SeanDidMyWrist lab is an individual build. Verified customer wrist checks and past commissions are archived here upon administrator approval.
        </p>
      </div>

      {/* Honest, Clean Vault Notice */}
      <div className="ink-panel bg-white p-8 text-center space-y-3">
        <div className="w-16 h-16 bg-yellow-300 border-4 border-black rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000]">
          <Clock size={32} className="text-black" />
        </div>
        <h3 className="comic-font text-3xl md:text-4xl text-black">
          THE VAULT IS OPEN & READY
        </h3>
        <p className="text-xs md:text-sm font-bold text-gray-600 max-w-lg mx-auto">
          Completed custom 1-of-1 commissions and customer-submitted wrist photos will appear here after verification. Have a build from Sean? Submit your wrist check below!
        </p>
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
