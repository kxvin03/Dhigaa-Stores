'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Upload,
  Download,
  Edit,
  Trash2,
  Sparkles,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // New product form
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    price: '',
    compareAtPrice: '',
    stock: '10',
    fabric: 'Pure Kanchipuram Silk',
    zariType: 'Tested Gold Zari',
    borderType: 'Traditional Korvai Temple Border',
    occasion: 'Bridal, Wedding, Festive',
    color: 'Crimson Red',
    colorHex: '#8B1E2E',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    description: 'Handwoven pure silk creation with traditional craftsmanship.',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatusMessage('Product created successfully!');
        setIsAddModalOpen(false);
        fetchProducts();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkImportCSV = async () => {
    if (!confirm('Re-import all products from /assets/products.csv? Existing SKUs will be synchronized.')) return;
    try {
      setStatusMessage('Syncing products from CSV...');
      const res = await fetch('/api/admin/bulk-import', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setStatusMessage(`Successfully imported ${data.count} items from products.csv`);
        fetchProducts();
        setTimeout(() => setStatusMessage(''), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(search.toLowerCase()));

    const categoryName = typeof p.category === 'object' ? p.category?.name : p.category;
    const matchesCat = categoryFilter === 'ALL' || categoryName === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-[#B8924A]" />
            <span>Catalogue & Inventory Management</span>
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Total {products.length} creations in catalogue &bull; Real-time variant & stock control
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleBulkImportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2B211C] border border-[#B8924A]/40 text-xs font-semibold text-[#E8D5C8] hover:bg-[#3C2F28] transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#B8924A]" />
            <span>Import products.csv</span>
          </button>

          <a
            href="/assets/products.csv"
            download="dhigaa_products_export.csv"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2B211C] border border-[#B8924A]/40 text-xs font-semibold text-[#E8D5C8] hover:bg-[#3C2F28] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#B8924A]" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B8924A] text-[#1B1512] font-semibold text-xs hover:bg-[#997334] transition-colors shadow-gold-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Creation</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU or fabric..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#140D0B] border border-[#B8924A]/30 text-xs text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'Sarees', 'Bridal Wear', 'Salwar Suits', 'Kurtis', 'Kids Pattu Pavadai', 'Jewellery & Accessories'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#B8924A] text-[#1B1512]'
                    : 'bg-[#140D0B] text-[#E8D5C8]/80 hover:text-white border border-[#B8924A]/20'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#140D0B] text-[#E8D5C8]/70 border-b border-[#B8924A]/20 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Creation</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Fabric / Weave</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8924A]/15 text-[#F5EEE2]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#E8D5C8]/60">
                    Loading atelier creations...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#E8D5C8]/60">
                    No creations found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const img =
                    p.imageUrl ||
                    p.images?.[0]?.url ||
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80';
                  const catName = typeof p.category === 'object' ? p.category?.name : p.category;

                  return (
                    <tr key={p.id} className="hover:bg-[#251D19] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-[#B8924A]/30 bg-[#140D0B]">
                            <Image src={img} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="font-semibold text-white line-clamp-1">{p.name}</div>
                            <div className="text-[10px] text-[#B8924A] font-mono mt-0.5">{p.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#E8D5C8] font-medium">{catName}</td>
                      <td className="py-3 px-4 text-[#E8D5C8]/80">
                        <div>{p.fabric}</div>
                        {p.zariType && <div className="text-[10px] text-[#B8924A]">{p.zariType}</div>}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{formatINR(p.price)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock <= 2
                              ? 'bg-red-950/60 text-red-400 border border-red-500/40'
                              : p.stock <= 5
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Published</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded hover:bg-[#B8924A]/20 text-[#B8924A]"
                            title="Preview on Store"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#1E1714] border border-[#B8924A] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B8924A]/30">
              <h3 className="font-serif text-lg font-bold text-white">Add New Handloom Creation</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aadya Royal Crimson Kanchipuram Silk"
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Bridal Wear">Bridal Wear</option>
                    <option value="Salwar Suits">Salwar Suits</option>
                    <option value="Kurtis">Kurtis</option>
                    <option value="Kids Pattu Pavadai">Kids Pattu Pavadai</option>
                    <option value="Jewellery & Accessories">Jewellery & Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Selling Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="18500"
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Original Price (Compare At)</label>
                  <input
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                    placeholder="22000"
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Fabric Details</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="Pure Mulberry Silk"
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Zari Specification</label>
                  <input
                    type="text"
                    value={formData.zariType}
                    onChange={(e) => setFormData({ ...formData, zariType: e.target.value })}
                    placeholder="Pure Gold Tested Zari"
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#E8D5C8] font-semibold block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#E8D5C8] font-semibold block mb-1">Artisan Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/40 text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#B8924A] text-[#140D0B] font-bold hover:bg-[#997334]"
                >
                  Save & Publish to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

