'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, X, Sparkles, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/storefront/ProductCard';
import QuickViewModal from '@/components/storefront/QuickViewModal';
import { formatINR } from '@/lib/currency';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Filters State
  const [category, setCategory] = useState(initialCategory.toUpperCase());
  const [selectedFabric, setSelectedFabric] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [sortOption, setSortOption] = useState('featured');
  const [search, setSearch] = useState(initialSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { label: 'All Creations', value: 'ALL' },
    { label: 'Kanchipuram & Cottons (Sarees)', value: 'SAREES' },
    { label: 'Bridal Muhurtham Trousseau', value: 'BRIDAL-WEAR' },
    { label: 'Salwar Sets & Anarkalis', value: 'SALWAR-SUITS' },
    { label: 'Kurtis & Tunics', value: 'KURTIS' },
    { label: 'Kids Pattu Pavadai', value: 'KIDS-PATTU-PAVADAI' },
    { label: 'Temple Jewellery & Accessories', value: 'JEWELLERY-ACCESSORIES' },
  ];

  const fabrics = [
    'ALL',
    'Pure Mulberry Silk',
    'Chettinad Cotton',
    'Organza Tissue',
    'Chanderi Silk',
    'Raw Silk',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (category !== 'ALL') {
          const pCatSlug = p.category?.slug?.toUpperCase() || '';
          if (!pCatSlug.includes(category)) return false;
        }

        // Fabric Filter
        if (selectedFabric !== 'ALL') {
          if (!p.fabric || !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
            return false;
          }
        }

        // Price Filter
        if (priceRange === 'UNDER_3K' && p.price >= 3000) return false;
        if (priceRange === '3K_10K' && (p.price < 3000 || p.price > 10000)) return false;
        if (priceRange === '10K_20K' && (p.price < 10000 || p.price > 20000)) return false;
        if (priceRange === 'ABOVE_20K' && p.price <= 20000) return false;

        // Search Query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchFab = p.fabric?.toLowerCase().includes(q);
          const matchColor = p.color?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchFab && !matchColor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price_asc') return a.price - b.price;
        if (sortOption === 'price_desc') return b.price - a.price;
        if (sortOption === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // default featured
      });
  }, [products, category, selectedFabric, priceRange, sortOption, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B8924A]/20 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">
            Handcrafted in Erode & Kanchipuram
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2] mt-1">
            Boutique Catalogue
          </h1>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1">
            Showing {filteredProducts.length} authentic handloom creations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search silk, zari, color..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B8924A]/30 bg-white/70 dark:bg-[#1E1714] text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
            />
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden p-2 rounded-full border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] hover:bg-[#B8924A]/10"
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar on Desktop + Products on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6">
          {/* Categories */}
          <div className="p-5 rounded-2xl glass-card border border-[#B8924A]/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8924A]">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    category === cat.value
                      ? 'bg-[#B8924A] text-[#1B1512] font-semibold'
                      : 'text-[#6A5446] dark:text-[#E8D5C8] hover:bg-[#B8924A]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Types */}
          <div className="p-5 rounded-2xl glass-card border border-[#B8924A]/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8924A]">Fabric Weave</h3>
            <div className="space-y-1">
              {fabrics.map((fab) => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedFabric === fab
                      ? 'bg-[#B8924A] text-[#1B1512] font-semibold'
                      : 'text-[#6A5446] dark:text-[#E8D5C8] hover:bg-[#B8924A]/10'
                  }`}
                >
                  {fab === 'ALL' ? 'All Fabrics' : fab}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="p-5 rounded-2xl glass-card border border-[#B8924A]/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8924A]">Price Range</h3>
            <div className="space-y-1">
              {[
                { label: 'All Budgets', value: 'ALL' },
                { label: 'Under ₹3,000', value: 'UNDER_3K' },
                { label: '₹3,000 - ₹10,000', value: '3K_10K' },
                { label: '₹10,000 - ₹20,000', value: '10K_20K' },
                { label: 'Above ₹20,000 (Bridal)', value: 'ABOVE_20K' },
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPriceRange(p.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    priceRange === p.value
                      ? 'bg-[#B8924A] text-[#1B1512] font-semibold'
                      : 'text-[#6A5446] dark:text-[#E8D5C8] hover:bg-[#B8924A]/10'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid (3 columns on desktop) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sorting Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1E1714] border border-[#B8924A]/20">
            <span className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
              {filteredProducts.length} items found
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6A5446] dark:text-[#E8D5C8] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border border-[#B8924A]/30 rounded-lg px-2.5 py-1 text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-20 text-center text-[#B8924A] font-serif">
              Loading handcrafted creations...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                No creations match your filter
              </h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
                Try adjusting your price range, fabric or search query.
              </p>
              <button
                onClick={() => {
                  setCategory('ALL');
                  setSelectedFabric('ALL');
                  setPriceRange('ALL');
                  setSearch('');
                }}
                className="px-4 py-2 rounded-full bg-[#B8924A] text-[#1B1512] font-semibold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#B8924A] border-t-transparent mx-auto mb-4" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

