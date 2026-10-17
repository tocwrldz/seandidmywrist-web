import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PRODUCTS } from '../../data/products';
import { DEPOSIT_POLICY, WARRANTY_POLICY, MEETUP_LOCATIONS, SHIPPING_POLICY } from '../../data/policies';
import { checkDepositEligibility } from '../../lib/businessRules';
import { MessageSquare, X, Send, Bot, Sparkles, User, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  actionDestination?: number;
  actionLabel?: string;
}

interface LabAssistantProps {
  onNavigateToPage?: (pageIndex: number) => void;
  onOpenCart?: () => void;
}

export const LabAssistant: React.FC<LabAssistantProps> = ({
  onNavigateToPage,
  onOpenCart
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Yo! I’m Sean’s Lab Assistant 🤖. Ask me about custom GA2100 CasiOak builds, current prices, the $20 deposit hold, or our Chicago & NWI meet-ups!'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Grounded Assistant Knowledge Engine (Accurate, safe, strictly reflects approved store data)
  const processQuery = (userQuery: string): { reply: string; actionDestination?: number; actionLabel?: string } => {
    const q = userQuery.toLowerCase();
    const eligibility = checkDepositEligibility();

    // 1. Price queries
    if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
      if (q.includes('custom') || q.includes('who cares') || q.includes('marley')) {
        return {
          reply: 'The Custom Collection is $110 per watch (including "Who Cares, I’m Already Late" and "Bob Marley" multicolor).',
          actionDestination: 1,
          actionLabel: 'View Custom Collection ($110)'
        };
      }
      if (q.includes('ap') || q.includes('steel') || q.includes('band')) {
        return {
          reply: 'The GA2100 AP Band Collection is $125 per watch. These feature 316L stainless steel AP-style bezels and integrated bracelets.',
          actionDestination: 2,
          actionLabel: 'View AP Band Collection ($125)'
        };
      }
      if (q.includes('sock') || q.includes('beanie')) {
        return {
          reply: 'Supreme Socks are $20 (4-pack in black or white), and Supreme Beanies are $75. Note: Apparel is currently marked COMING SOON in Chapter 2.',
          actionDestination: 5,
          actionLabel: 'View Chapter 2: Cloths'
        };
      }
      return {
        reply: 'Current pricing across our workshop:\n• Chapter 1: GA2100 Showcase: $90\n• Custom Collection: $110\n• AP Band Conversion: $125\n• All watches are eligible for a $20 deposit hold!',
        actionDestination: 0,
        actionLabel: 'Browse Showcase ($90)'
      };
    }

    // 2. Deposit & Hold queries
    if (q.includes('deposit') || q.includes('reserve') || q.includes('hold') || q.includes('sunday')) {
      const sundayNotice = eligibility.allowed
        ? `Deposits are currently OPEN (${eligibility.centralTimeString}).`
        : `⚠️ SUNDAY CUTOFF ACTIVE: New deposits close Sundays at 5:00 PM CT (${eligibility.centralTimeString}) and re-open Monday.`;

      return {
        reply: `Here are our exact Deposit Rules:\n• Minimum Deposit: $20 to lock your watch.\n• Duration: Held for 7 business days exclusively.\n• Cancellation / Expiration: 50% refund policy if canceled.\n• Sunday Cutoff: No new deposits after 5:00 PM Central Time.\n\n${sundayNotice}`,
        actionDestination: 7,
        actionLabel: 'Read Deposit Information'
      };
    }

    // 3. Meet-ups (Chicago & NWI)
    if (q.includes('meet') || q.includes('chicago') || q.includes('indiana') || q.includes('nwi') || q.includes('pickup') || q.includes('local')) {
      return {
        reply: 'Sean provides free in-person handovers at verified public locations!\n• Chicago: Millennium Park Plaza, Wicker Park Square, Navy Pier, River North.\n• Northwest Indiana: Centennial Park (Munster), Valparaiso Square, Highland Library concourse, Crown Point.\nAll meet-ups are scheduled in safe public places with time to try on the watch.',
        actionDestination: 8,
        actionLabel: 'View Chicago & NWI Meet-ups'
      };
    }

    // 4. Warranty & Quality
    if (q.includes('warranty') || q.includes('authentic') || q.includes('real') || q.includes('guarantee')) {
      return {
        reply: 'All watches come with a 1-Year Limited Movement Warranty! We use 100% genuine Casio GA2100 movements with Carbon Core Guard and 200M water resistance. It covers internal movement accuracy, hand alignment, and custom dial components.',
        actionDestination: 6,
        actionLabel: 'Read Warranty Details'
      };
    }

    // 5. Shipping
    if (q.includes('ship') || q.includes('tracking') || q.includes('delivery') || q.includes('mail')) {
      return {
        reply: 'Shipping Options:\n• Local Meet-Up: FREE (Chicago & NWI)\n• USPS Priority Insured: $10 (2-3 business days with tracking)\n• Expedited Signature Delivery: $25 (1-2 business days)\nEvery watch is double-boxed in comic-themed protective packaging.',
        actionDestination: 7,
        actionLabel: 'View Shipping Policies'
      };
    }

    // 6. Specific Models
    if (q.includes('rainbow') || q.includes('infinity') || q.includes('stones') || q.includes('blood shot') || q.includes('art board')) {
      return {
        reply: 'Looking for a colorful build? The "Rainbow on White (Infinity Stones)", "Rainbow on Black (Night Sky)", and "Red on Red (Blood Shot)" are part of our GA2100 Showcase for $90!',
        actionDestination: 0,
        actionLabel: 'Explore Showcase Models'
      };
    }

    // 7. Custom 1-of-1 requests / Instagram
    if (q.includes('custom') || q.includes('dm') || q.includes('instagram') || q.includes('sean') || q.includes('contact')) {
      return {
        reply: 'Have a custom colorway idea? Reach out to Sean directly on Instagram @seandidmywrist or check our Contact page in Chapter 3. He discusses custom 1-of-1 requests, special strap conversions, and sizing questions!',
        actionDestination: 10,
        actionLabel: 'Contact Sean & Support'
      };
    }

    // Default Fallback
    return {
      reply: 'I’m here to help with watches ($90-$125), deposit holds ($20 for 7 days), Chicago & NWI meet-ups, and warranties. You can also DM Sean directly on Instagram @seandidmywrist for custom 1-of-1 inquiries!',
      actionDestination: 10,
      actionLabel: 'Contact Sean on Instagram'
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processQuery(userText);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.reply,
        actionDestination: response.actionDestination,
        actionLabel: response.actionLabel
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120] select-none">
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="mb-4 w-[330px] sm:w-[380px] bg-white border-5 border-black shadow-[10px_10px_0px_#000] flex flex-col h-[520px] overflow-hidden"
            role="dialog"
            aria-label="SeanDidMyWrist AI Shopping Assistant"
          >
            {/* Header */}
            <div className="bg-black text-white p-3.5 border-b-4 border-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-300 text-black border-2 border-black flex items-center justify-center font-bold text-xs">
                  🤖
                </div>
                <div>
                  <h3 className="comic-font text-xl tracking-wider leading-none">
                    LAB ASSISTANT
                  </h3>
                  <span className="text-[10px] font-black text-yellow-300 uppercase">
                    SeanDidMyWrist Official Bot
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white text-black hover:bg-yellow-400 p-1 border-2 border-black transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-[#fafafa]">
              <div className="text-[11px] font-bold text-gray-500 bg-white border border-black p-2 text-center shadow-[2px_2px_0px_#000]">
                ⚡ Verified data on prices, deposits, meet-ups & warranty.
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3 max-w-[85%] border-3 border-black text-xs font-bold leading-relaxed shadow-[3px_3px_0px_#000] whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-yellow-300 text-black'
                        : 'bg-white text-black'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Quick Navigation Action Button */}
                  {msg.actionDestination !== undefined && onNavigateToPage && (
                    <button
                      onClick={() => {
                        onNavigateToPage(msg.actionDestination!);
                        setIsOpen(false);
                      }}
                      className="mt-1.5 text-[11px] font-black uppercase bg-black text-white hover:bg-yellow-400 hover:text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
                    >
                      👉 {msg.actionLabel || 'Jump to Page'}
                    </button>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white border-2 border-black px-3 py-1.5 w-max">
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-200" />
                  <span className="ml-1 font-mono">Checking lab records...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t-2 border-black bg-white flex gap-1.5 overflow-x-auto text-[11px] font-bold">
              <button
                onClick={() => setInput('What are current watch prices?')}
                className="bg-gray-100 hover:bg-yellow-200 border border-black px-2 py-0.5 whitespace-nowrap cursor-pointer"
              >
                Watch Prices?
              </button>
              <button
                onClick={() => setInput('How does the $20 deposit work?')}
                className="bg-gray-100 hover:bg-yellow-200 border border-black px-2 py-0.5 whitespace-nowrap cursor-pointer"
              >
                $20 Deposit?
              </button>
              <button
                onClick={() => setInput('Where are Chicago meet-ups?')}
                className="bg-gray-100 hover:bg-yellow-200 border border-black px-2 py-0.5 whitespace-nowrap cursor-pointer"
              >
                Meet-ups?
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t-4 border-black bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about watches, deposits, meet-ups..."
                className="flex-grow border-2 border-black p-2 font-bold text-xs bg-gray-50 focus:bg-yellow-50 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white p-2.5 border-2 border-black transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="ink-panel-lg bg-yellow-300 hover:bg-yellow-400 text-black p-4 flex items-center gap-2 cursor-pointer transition-colors relative"
        aria-label="Open AI Shopping Assistant"
      >
        <span className="comic-font text-2xl hidden md:inline">LAB ASSISTANT</span>
        <MessageSquare size={28} className="text-black" />
        {/* Pulsing indicator */}
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 border-2 border-black rounded-full animate-ping" />
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 border-2 border-black rounded-full" />
      </motion.button>
    </div>
  );
};
