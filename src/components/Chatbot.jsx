import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Bot, User } from 'lucide-react';

const CHAT_DATA = {
  menu: {
    text: "👋 Welcome!\nExplore our Paint Protection Films and find the right one for your car.",
    options: [
      { label: "🔍 Compare Films", next: "compare" },
      { label: "🤖 Recommend Me", next: "recommend" },
      { label: "🛡️ Best Protection", next: "best_protection" },
    ]
  },
  compare: {
    text: "Here’s a quick overview:\n\n**Nova** – 6.5 mil | 3 yrs\nBasic daily protection\n\n**Plus** – 7.5 mil | 4 yrs\nBetter durability & clarity\n\n**Elite** – 8.5 mil | 7 yrs\nPremium balance of strength\n\n**Master** – 9.5 mil | 10 yrs\nMaximum protection",
    options: [
      { label: "View Nova", next: "nova" },
      { label: "View Plus", next: "plus" },
      { label: "View Elite", next: "elite" },
      { label: "View Master", next: "master" },
      { label: "🏠 Main Menu", next: "menu" }
    ]
  },
  master: {
    text: "🛡️ **Master – 9.5 mil | 10 Years**\nBuilt for extreme conditions.\n\n✔ Thickest Shield\n✔ Max Puncture Resistance\n✔ Extreme Weather Proof\n✔ Mirror-Like Clarity\n✔ Instant Self-Healing",
    options: [
      { label: "Compare All", next: "compare" },
      { label: "See Other Options", next: "compare" },
      { label: "🏠 Main Menu", next: "menu" },
    ]
  },
  elite: {
    text: "💎 **Elite – 8.5 mil | 7 Years**\nPerfect balance of performance & finish.\n\n✔ Instant Self-Healing\n✔ Ceramic Infused Layer\n✔ Extreme Impact Resistance\n✔ Stain Resistance",
    options: [
      { label: "Compare All", next: "compare" },
      { label: "See Other Options", next: "compare" },
      { label: "🏠 Main Menu", next: "menu" },
    ]
  },
  plus: {
    text: "⚙️ **Plus – 7.5 mil | 4 Years**\nProfessional standard film.\n\n✔ Advanced Self-Healing\n✔ Ultra-Clear Gloss\n✔ Anti-Yellowing Tech\n✔ Enhanced Durability",
    options: [
      { label: "Compare All", next: "compare" },
      { label: "See Other Options", next: "compare" },
      { label: "🏠 Main Menu", next: "menu" },
    ]
  },
  nova: {
    text: "🚗 **Nova – 6.5 mil | 3 Years**\nIdeal for daily driving.\n\n✔ Standard Self-Healing\n✔ High Gloss Finish\n✔ UV Protection",
    options: [
      { label: "Compare All", next: "compare" },
      { label: "See Other Options", next: "compare" },
      { label: "🏠 Main Menu", next: "menu" },
    ]
  },
  recommend: {
    text: "I can suggest the best option 👇\nWhat do you need?",
    options: [
      { label: "Daily Driving", next: "rec_daily" },
      { label: "Luxury Finish", next: "rec_luxury" },
      { label: "Off-road Protection", next: "rec_offroad" },
      { label: "Budget Option", next: "rec_budget" },
    ]
  },
  rec_daily: {
    text: "👍 Go with **Nova** or **Plus**\nBalanced protection for everyday use.",
    options: [
      { label: "View Plus", next: "plus" },
      { label: "Compare All", next: "compare" },
      { label: "Back", next: "recommend" },
    ]
  },
  rec_luxury: {
    text: "💎 Choose **Elite**\nHigh clarity with ceramic layer.",
    options: [
      { label: "View Details", next: "elite" },
      { label: "Compare All", next: "compare" },
      { label: "Back", next: "recommend" },
    ]
  },
  rec_offroad: {
    text: "🛡️ Best is **Master**\nMaximum thickness & durability.",
    options: [
      { label: "View Details", next: "master" },
      { label: "Compare All", next: "compare" },
      { label: "Back", next: "recommend" },
    ]
  },
  rec_budget: {
    text: "💰 **Nova** is the best value option.",
    options: [
      { label: "View Details", next: "nova" },
      { label: "Compare All", next: "compare" },
      { label: "Back", next: "recommend" },
    ]
  },
  best_protection: {
    text: "🏆 Want the highest level of protection?\n\n👉 **Master – 9.5 mil | 10 Years**\n\n✔ Thickest film\n✔ Extreme durability\n✔ Weather & puncture resistant",
    options: [
      { label: "View Details", next: "master" },
      { label: "Compare All", next: "compare" },
      { label: "🏠 Main Menu", next: "menu" }
    ]
  }
};

const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    // Bold formatting "**text**" -> <strong>text</strong>
    const parts = line.split(/(\*\*.*?\*\*)/g);
    
    return (
      <span key={i} className="block">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
        {line === '' && <br />}
      </span>
    );
  });
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Initial bot message on mount or open if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          sender: 'bot',
          ...CHAT_DATA['menu']
        }]);
        setIsTyping(false);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleOptionClick = (option) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: option.label
    };

    // Remove options from the last bot message so they can't be clicked again
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].options = [];
      }
      return [...newMessages, userMsg];
    });

    setIsTyping(true);

    // Simulate bot thinking/typing
    setTimeout(() => {
      const nextNode = CHAT_DATA[option.next];
      if (nextNode) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          ...nextNode
        }]);
      }
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating CTA */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,174,239,0.5)] animate-pulse-slow group"
          >
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[101] w-[calc(100vw-48px)] sm:w-[380px] h-[550px] max-h-[80vh] bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Micheal PPF Assistant</h3>
                  <p className="text-zinc-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-accent text-black rounded-br-sm' 
                        : 'bg-white/10 text-zinc-300 rounded-bl-sm border border-white/5 shadow-inner'
                    }`}
                  >
                    {msg.sender === 'bot' ? formatText(msg.text) : msg.text}
                  </motion.div>
                  
                  {/* Options (only show for the latest bot message if options exist) */}
                  {msg.options && msg.options.length > 0 && idx === messages.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 flex flex-col gap-2 w-[85%] max-w-[280px]"
                    >
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm bg-black/40 hover:bg-accent/20 border border-white/10 hover:border-accent/50 rounded-xl text-left text-white transition-all duration-200 group"
                        >
                          <span className="font-medium">{opt.label}</span>
                          <ChevronRight size={16} className="text-zinc-500 group-hover:text-accent transition-colors" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start"
                >
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm p-3.5 flex items-center gap-1.5 w-fit">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
            
            {/* Footer / Input area replacement */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#161616] flex items-center justify-center">
              <p className="text-[11px] text-zinc-500 tracking-wider">SELECT AN OPTION ABOVE TO CHAT</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
