'use client';

import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit, Check, Eye, MoveUp, MoveDown, Sparkles } from 'lucide-react';

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState<'sections' | 'banners' | 'announcements'>('sections');
  const [saveMessage, setSaveMessage] = useState('');

  const [sections, setSections] = useState([
    { id: '1', name: '3D Silk Cloth Interactive Hero Banner', type: '3D_HERO', active: true },
    { id: '2', name: 'Artisan Heritage & Weaving Storytelling ("every thread has a story")', type: 'STORY', active: true },
    { id: '3', name: 'Royal Muhurtham & Festive Silk Curations', type: 'GRID_COLLECTION', active: true },
    { id: '4', name: 'Shop By Budget Strip (Under ₹2,000 / ₹2,000-₹5,000 / Premium Silk)', type: 'BUDGET_STRIP', active: true },
    { id: '5', name: 'Best Sellers & New Loom Arrivals', type: 'CAROUSEL', active: true },
    { id: '6', name: '3D Real-time Saree Fabric & Zari Visualizer', type: '3D_VISUALIZER', active: true },
    { id: '7', name: 'Bespoke Atelier Services (Custom Blouse, Video Shopping, Erode Trial)', type: 'SERVICES', active: true },
    { id: '8', name: 'Customer Testimonials & Real Stock Photo Reviews', type: 'REVIEWS', active: true },
    { id: '9', name: 'Instagram Atelier Gallery Feed (@dhigaa_fashions)', type: 'INSTAGRAM', active: true },
  ]);

  const [announcements, setAnnouncements] = useState([
    'Complimentary Insured Shipping Across India on Orders Above ₹2,500',
    'Erode Patrons: Same-Day Doorstep Express & Store Pickup Available',
    'The Royal Pongal & Wedding Muhurtham Silk Edit 2026 is Live',
    'Bespoke Tailoring & Live WhatsApp Video Shopping: +91 9092806555',
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleToggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setSections(copy);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements([...announcements, newAnnouncement.trim()]);
    setNewAnnouncement('');
  };

  const handleDeleteAnnouncement = (idx: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== idx));
  };

  const handleSaveCMS = () => {
    setSaveMessage('Storefront CMS layout synchronized live!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B8924A]" />
            <span>Visual CMS & Homepage Builder</span>
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Drag, rearrange and toggle storefront sections, promo banners and announcements
          </p>
        </div>

        <button
          onClick={handleSaveCMS}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B8924A] text-[#1B1512] font-bold text-xs hover:bg-[#997334] transition-colors shadow-gold-glow"
        >
          <Check className="w-4 h-4" />
          <span>Publish Changes</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#B8924A]/20 pb-2">
        <button
          onClick={() => setActiveTab('sections')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'sections'
              ? 'bg-[#B8924A] text-[#1B1512]'
              : 'text-[#E8D5C8]/80 hover:text-white'
          }`}
        >
          Homepage Layout Sections ({sections.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'announcements'
              ? 'bg-[#B8924A] text-[#1B1512]'
              : 'text-[#E8D5C8]/80 hover:text-white'
          }`}
        >
          Header Announcement Ticker ({announcements.length})
        </button>
      </div>

      {activeTab === 'sections' && (
        <div className="space-y-3">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                sec.active
                  ? 'bg-[#1E1714] border-[#B8924A]/30'
                  : 'bg-[#140D0B] border-gray-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#140D0B] text-[#B8924A] font-bold text-xs flex items-center justify-center border border-[#B8924A]/30">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">{sec.name}</h4>
                  <span className="text-[10px] font-mono text-[#B8924A] uppercase">
                    TYPE: {sec.type}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded bg-[#140D0B] text-gray-300 hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 rounded bg-[#140D0B] text-gray-300 hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleToggleSection(sec.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    sec.active
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {sec.active ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <form onSubmit={handleAddAnnouncement} className="flex gap-2">
            <input
              type="text"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Add exciting promo text or Erode delivery notice..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1E1714] border border-[#B8924A]/40 text-xs text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#B8924A] text-[#1B1512] font-semibold text-xs hover:bg-[#997334] transition-colors shrink-0"
            >
              Add Ticker Notice
            </button>
          </form>

          <div className="space-y-2">
            {announcements.map((msg, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1E1714] border border-[#B8924A]/20 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5 text-xs text-[#F5EEE2]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8924A] shrink-0" />
                  <span>{msg}</span>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(idx)}
                  className="text-gray-400 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

