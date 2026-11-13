'use client';

import React, { useState } from 'react';
import { Palette, Sparkles, Check, RotateCcw, Eye } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminThemeEditorPage() {
  const { theme, updateTheme } = useTheme();
  const [savedMessage, setSavedMessage] = useState('');

  const [primary, setPrimary] = useState(theme.primary || '#6A5446');
  const [secondary, setSecondary] = useState(theme.secondary || '#B8924A');
  const [cream, setCream] = useState(theme.cream || '#F5EEE2');
  const [espresso, setEspresso] = useState(theme.espresso || '#2B211C');
  const [blush, setBlush] = useState(theme.blush || '#E8D5C8');
  const [borderRadius, setBorderRadius] = useState(theme.borderRadius || '0.75rem');
  const [fontHeading, setFontHeading] = useState(theme.fontHeading || 'Playfair Display');
  const [enable3D, setEnable3D] = useState(true);

  const handleColorChange = (key: string, val: string) => {
    if (key === 'primary') setPrimary(val);
    if (key === 'secondary') setSecondary(val);
    if (key === 'cream') setCream(val);
    if (key === 'espresso') setEspresso(val);
    if (key === 'blush') setBlush(val);

    updateTheme({ [key]: val });
  };

  const handleResetDefaults = () => {
    const defaults = {
      primary: '#6A5446',
      secondary: '#B8924A',
      cream: '#F5EEE2',
      espresso: '#2B211C',
      blush: '#E8D5C8',
      borderRadius: '0.75rem',
      fontHeading: 'Playfair Display',
    };
    setPrimary(defaults.primary);
    setSecondary(defaults.secondary);
    setCream(defaults.cream);
    setEspresso(defaults.espresso);
    setBlush(defaults.blush);
    setBorderRadius(defaults.borderRadius);
    setFontHeading(defaults.fontHeading);
    updateTheme(defaults);
    setSavedMessage('Brand defaults restored!');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleSaveTheme = () => {
    setSavedMessage('Brand theme changes applied live across storefront!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#B8924A]" />
            <span>Theme & Visual Identity Studio</span>
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Customize boutique colors, luxury typography and 3D simulation parameters in real time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2B211C] border border-[#B8924A]/30 text-xs font-semibold text-[#E8D5C8] hover:bg-[#3C2F28] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSaveTheme}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B8924A] text-[#1B1512] font-bold text-xs hover:bg-[#997334] transition-colors shadow-gold-glow"
          >
            <Check className="w-4 h-4" />
            <span>Save Theme Settings</span>
          </button>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Grid: Settings on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Colors */}
          <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8924A]" />
              <span>Palette & Brand CSS Variables</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Primary Accent (--primary)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#B8924A]/40"
                  />
                  <input
                    type="text"
                    value={primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-xs font-mono text-white"
                  />
                </div>
                <span className="text-[10px] text-[#E8D5C8]/60 mt-1 block">Warm Taupe Brown</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Secondary Zari Accent (--secondary)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#B8924A]/40"
                  />
                  <input
                    type="text"
                    value={secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-xs font-mono text-white"
                  />
                </div>
                <span className="text-[10px] text-[#E8D5C8]/60 mt-1 block">Antique Gold Accent</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Silk Cream Surface (--cream)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={cream}
                    onChange={(e) => handleColorChange('cream', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#B8924A]/40"
                  />
                  <input
                    type="text"
                    value={cream}
                    onChange={(e) => handleColorChange('cream', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-xs font-mono text-white"
                  />
                </div>
                <span className="text-[10px] text-[#E8D5C8]/60 mt-1 block">Light Heritage Silk</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Espresso Obsidian (--espresso)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={espresso}
                    onChange={(e) => handleColorChange('espresso', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#B8924A]/40"
                  />
                  <input
                    type="text"
                    value={espresso}
                    onChange={(e) => handleColorChange('espresso', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-xs font-mono text-white"
                  />
                </div>
                <span className="text-[10px] text-[#E8D5C8]/60 mt-1 block">Dark Mode Background</span>
              </div>
            </div>
          </div>

          {/* Typography & Geometry */}
          <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
            <h3 className="font-serif text-base font-bold text-white">Typography & Geometry</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Heading Font Family
                </label>
                <select
                  value={fontHeading}
                  onChange={(e) => {
                    setFontHeading(e.target.value);
                    updateTheme({ fontHeading: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-xs text-white focus:outline-none"
                >
                  <option value="Playfair Display">Playfair Display (Default Luxury)</option>
                  <option value="Cormorant Garamond">Cormorant Garamond (Editorial Elegance)</option>
                  <option value="Georgia">Georgia (Classic Traditional)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
                  Border Radius ({borderRadius})
                </label>
                <input
                  type="range"
                  min="0.25"
                  max="1.5"
                  step="0.125"
                  value={parseFloat(borderRadius)}
                  onChange={(e) => {
                    const val = `${e.target.value}rem`;
                    setBorderRadius(val);
                    updateTheme({ borderRadius: val });
                  }}
                  className="w-full mt-2 accent-[#B8924A]"
                />
              </div>
            </div>
          </div>

          {/* 3D Features Settings */}
          <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center justify-between">
              <span>3D WebGL Cloth Simulation</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enable3D}
                  onChange={(e) => setEnable3D(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B8924A]" />
              </label>
            </h3>
            <p className="text-xs text-[#E8D5C8]/80 leading-relaxed">
              Enables real-time shader waving silk cloth on the homepage hero with golden dust particle physics. On low-spec devices, an optimized 2D fallback is automatically rendered.
            </p>
          </div>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 p-6 rounded-3xl border border-[#B8924A]/40 bg-[#FAF7F2] text-[#2B211C] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B8924A]/30">
              <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Component Preview</span>
              </span>
              <span className="text-[10px] text-[#6A5446]">Dynamic CSS Variables</span>
            </div>

            {/* Simulated Saree Card */}
            <div
              className="p-4 bg-white rounded-2xl border shadow-sm space-y-3"
              style={{
                borderColor: `${secondary}55`,
                borderRadius: borderRadius,
              }}
            >
              <div
                className="w-full h-36 rounded-xl relative overflow-hidden flex items-center justify-center text-white font-bold"
                style={{
                  background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                  borderRadius: borderRadius,
                }}
              >
                <div className="text-center p-3">
                  <div className="text-sm font-serif">Dhigaa Pure Kanchipuram Silk</div>
                  <div className="text-[10px] opacity-80 mt-1">Where grace meets grandeur</div>
                </div>
              </div>

              <div>
                <h4
                  className="text-base font-bold"
                  style={{ fontFamily: fontHeading, color: primary }}
                >
                  Aadya Royal Crimson Silk Saree
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">Pure Gold Zari 2G Tested &bull; Korvai Temple Border</p>
                <div className="text-sm font-bold mt-2" style={{ color: secondary }}>
                  ₹18,500
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  className="flex-1 py-2 text-xs font-semibold text-white shadow transition-all"
                  style={{
                    backgroundColor: primary,
                    borderRadius: borderRadius,
                  }}
                >
                  Add to Bag
                </button>
                <button
                  className="px-3 py-2 text-xs font-semibold border"
                  style={{
                    borderColor: secondary,
                    color: secondary,
                    borderRadius: borderRadius,
                  }}
                >
                  Enquire WA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

