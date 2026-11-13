'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, Bot, MessageCircle, ArrowRight } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  recommendations?: { name: string; slug: string; price: string }[];
}

export default function AIStyleAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Vanakkam! I am your Dhigaa Couture Stylist. Are you looking for a wedding Muhurtham silk, Chettinad cotton, or festival attire today?',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Rule-based intelligent styling recommendations in English
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let responseText = '';
      let recs: { name: string; slug: string; price: string }[] | undefined = undefined;

      if (lower.includes('wedding') || lower.includes('muhurtham') || lower.includes('bride')) {
        responseText =
          'For a South Indian wedding or Muhurtham, a heavy Kanchipuram silk saree with 3-shuttle Korvai border and pure tested gold zari is timeless. Crimson red, golden mustard, and golden ivory are auspicious choices.';
        recs = [
          { name: 'Aadya Royal Crimson Kanchipuram Silk', slug: 'aadya-royal-crimson-kanchipuram-silk', price: '₹18,500' },
          { name: 'Thangam Golden Ivory Bridal Muhurtham', slug: 'thangam-golden-ivory-bridal-silk', price: '₹26,500' },
        ];
      } else if (lower.includes('cotton') || lower.includes('daily') || lower.includes('casual') || lower.includes('summer')) {
        responseText =
          'Our Chettinad combed cotton handlooms are woven with high-count threads in Erode and Chettinad. They provide incredible breathability while carrying traditional temple borders.';
        recs = [
          { name: 'Swarnam Mustard Traditional Chettinad Cotton', slug: 'swarnam-mustard-chettinad-cotton', price: '₹2,450' },
          { name: 'Valli Earthy Chettinad Brown Checks', slug: 'valli-earthy-chettinad-brown-checks', price: '₹2,600' },
        ];
      } else if (lower.includes('budget') || lower.includes('cheap') || lower.includes('affordable') || lower.includes('price')) {
        responseText =
          'We have handloom cottons and featherlight semi-silks starting under ₹2,500, up to royal bridal silks. What specific budget range do you have in mind?';
      } else if (lower.includes('blouse') || lower.includes('stitch') || lower.includes('tailor')) {
        responseText =
          'Our master artisans in Erode offer custom blouse tailoring with reinforced lining and Maggam embroidery for ₹999. You can record your measurements on our Custom Stitching page.';
      } else {
        responseText =
          'Every thread at Dhigaa tells a story. Would you like to explore our Kanchipuram silks, bridal lehengas, or book a live WhatsApp video shopping appointment with our Erode atelier?';
        recs = [
          { name: 'Mayura Teal & Gold Pure Silk', slug: 'mayura-teal-gold-pure-silk', price: '₹16,200' },
          { name: 'Maragatham Emerald Green Banarasi', slug: 'maragatham-emerald-green-banarasi', price: '₹14,800' },
        ];
      }

      setMessages([...newMessages, { sender: 'ai', text: responseText, recommendations: recs }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Style Assistant"
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-[#F5EEE2] dark:text-[#1B1512] shadow-luxury border border-[#B8924A]/40 hover:scale-105 active:scale-95 transition-all text-xs font-semibold"
      >
        <Sparkles className="w-4 h-4 text-[#B8924A] dark:text-[#1B1512] animate-pulse" />
        <span className="hidden sm:inline">AI Couture Stylist</span>
      </button>

      {/* Slide-out Chat Drawer */}
      {isOpen && (
        <aside
          aria-label="AI couture stylist chat"
          className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-96 max-h-[520px] bg-[#FAF7F2] dark:bg-[#1E1714] rounded-3xl shadow-2xl border border-[#B8924A]/40 z-50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-[#F5EEE2] dark:bg-[#2B211C] border-b border-[#B8924A]/25 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B8924A]/20 border border-[#B8924A] flex items-center justify-center text-[#B8924A]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-sm font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  Dhigaa Stylist AI
                </h2>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online &bull; Handloom Advisory</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-white"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#2B211C] text-white dark:bg-[#B8924A] dark:text-[#1B1512] rounded-tr-none'
                      : 'bg-white dark:bg-[#281F1A] border border-[#B8924A]/25 text-[#2B211C] dark:text-[#F5EEE2] rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Recommendations if any */}
                {m.recommendations && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {m.recommendations.map((rec, rIdx) => (
                      <Link
                        key={rIdx}
                        href={`/products/${rec.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl bg-white dark:bg-[#281F1A] border border-[#B8924A]/30 flex items-center justify-between hover:border-[#B8924A] transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-[11px] text-[#2B211C] dark:text-[#F5EEE2]">
                            {rec.name}
                          </div>
                          <div className="text-[10px] text-[#B8924A] font-bold">{rec.price}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B8924A]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Suggestions & Input */}
          <div className="p-3 bg-[#F5EEE2]/50 dark:bg-[#1E1714] border-t border-[#B8924A]/20 space-y-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px]">
              {['Wedding Silks', 'Chettinad Cotton', 'Blouse Stitching', 'Under ₹3,000'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInput(chip)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-[#281F1A] border border-[#B8924A]/30 text-[#6A5446] dark:text-[#E8D5C8] whitespace-nowrap hover:border-[#B8924A]"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fabrics, colors or styling..."
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#281F1A] border border-[#B8924A]/40 text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] hover:bg-[#6A5446] transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </aside>
      )}
    </>
  );
}

