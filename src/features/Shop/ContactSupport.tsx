import React, { useState } from 'react';
import { Instagram, Send, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';

export const ContactSupport: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Custom Build Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Title */}
      <div className="ink-panel bg-black text-white p-6 md:p-8 border-4 border-black -rotate-0.5">
        <span className="bg-yellow-300 text-black comic-font text-xs md:text-sm px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#fff]">
          CONNECT WITH THE LAB
        </span>
        <h2 className="comic-font text-4xl md:text-6xl text-white mt-2">
          CONTACT & DIRECT SUPPORT
        </h2>
        <p className="text-xs md:text-sm font-bold text-gray-300 mt-1 max-w-xl">
          Have a question about custom colorways, reserving with a deposit, or scheduling a Chicago/NWI meet-up? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram Direct DM Card */}
        <div className="ink-panel bg-white p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_#000] mb-4">
              <Instagram size={28} />
            </div>
            <h3 className="comic-font text-3xl text-black mb-1">FASTEST RESPONSE: INSTAGRAM</h3>
            <p className="text-xs font-bold text-gray-500 uppercase mb-4">@SEANDIDMYWRIST</p>
            <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed mb-4">
              Sean posts daily behind-the-scenes laboratory builds, customer wrist shots, and flash inventory drops directly on Instagram stories. DM anytime for custom color requests.
            </p>
          </div>

          <a
            href="https://www.instagram.com/seandidmywrist/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white text-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Instagram size={20} />
            <span>OPEN @SEANDIDMYWRIST</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="ink-panel bg-white p-6">
          <h3 className="comic-font text-3xl text-black mb-1">DIRECT LAB MESSAGE</h3>
          <p className="text-xs font-bold text-gray-500 uppercase mb-4">EMAIL DISPATCH DESK</p>

          {sent ? (
            <div className="bg-yellow-50 border-3 border-black p-6 text-center space-y-3">
              <CheckCircle2 size={40} className="text-green-600 mx-auto" />
              <h4 className="comic-font text-2xl text-black">MESSAGE DISPATCHED!</h4>
              <p className="text-xs font-bold text-gray-700">
                Thanks, {name}! Sean reviews inquiries personally and will respond to {email} within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setMessage('');
                }}
                className="ink-btn bg-black text-white text-xs px-4 py-2 mt-2"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block comic-font text-sm text-black mb-1">YOUR NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-black p-2 font-bold text-xs bg-gray-50 focus:bg-yellow-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block comic-font text-sm text-black mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black p-2 font-bold text-xs bg-gray-50 focus:bg-yellow-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block comic-font text-sm text-black mb-1">TOPIC</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border-2 border-black p-2 font-bold text-xs bg-gray-50"
                >
                  <option value="Custom Build Inquiry">Custom Build / 1-of-1 Inquiry</option>
                  <option value="Chicago Meetup Scheduling">Chicago / NWI Meet-Up Scheduling</option>
                  <option value="Deposit Reservation Question">Deposit & Reservation Hold</option>
                  <option value="Warranty & Tuning">Warranty & Movement Service</option>
                </select>
              </div>

              <div>
                <label className="block comic-font text-sm text-black mb-1">MESSAGE *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What watch or custom concept are you thinking of?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-2 border-black p-2 font-bold text-xs bg-gray-50 focus:bg-yellow-50 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="ink-btn w-full bg-black hover:bg-yellow-400 hover:text-black text-white text-xl py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send size={16} />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
