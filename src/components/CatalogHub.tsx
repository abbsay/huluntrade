import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations, useTranslatedPath } from '../i18n';
import confetti from 'canvas-confetti';

export interface ProductItem {
  id: string;
  categoryId: string;
  subcategoryId?: string;
  name: string;
  image: string;
  description: string;
  features?: string[];
  weight?: string;
  packaging?: string;
}

interface CatalogHubProps {
  products: ProductItem[];
  currentLang?: string;
}

// 3D Tilt Card Component
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="h-full w-full"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, { badge: string; border: string; glow: string; dot: string }> = {
  marshmallow: {
    badge: 'text-pink-600 bg-pink-50 border-pink-200',
    border: 'hover:border-pink-300 hover:shadow-pink-500/20',
    glow: 'from-pink-500/10 to-transparent',
    dot: 'bg-pink-500',
  },
  jelly: {
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
    border: 'hover:border-amber-300 hover:shadow-amber-500/20',
    glow: 'from-amber-500/10 to-transparent',
    dot: 'bg-amber-500',
  },
  hard_candy: {
    badge: 'text-purple-600 bg-purple-50 border-purple-200',
    border: 'hover:border-purple-300 hover:shadow-purple-500/20',
    glow: 'from-purple-500/10 to-transparent',
    dot: 'bg-purple-500',
  },
  candy_toy: {
    badge: 'text-sky-600 bg-sky-50 border-sky-200',
    border: 'hover:border-sky-300 hover:shadow-sky-500/20',
    glow: 'from-sky-500/10 to-transparent',
    dot: 'bg-sky-500',
  },
};

export default function CatalogHub({ products, currentLang = 'en' }: CatalogHubProps) {
  const t = useTranslations(currentLang);
  const translatePath = useTranslatedPath(currentLang);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeWeight, setActiveWeight] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'weight'>('default');
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: currentLang === 'ar' ? 'جميع الحلويات' : currentLang === 'ru' ? 'Все сладости' : currentLang === 'fr' ? 'Tous les bonbons' : 'All Candies' },
    { id: 'marshmallow', label: t('products_page.marshmallow', 'Marshmallows') },
    { id: 'jelly', label: t('products_page.jelly', 'Jelly Candies') },
    { id: 'hard_candy', label: t('products_page.hard_candy', 'Hard Candy & Pops') },
    { id: 'candy_toy', label: t('products_page.candy_toy', 'Candy Toys') },
  ];

  const weightFilters = [
    { id: 'all', label: currentLang === 'ar' ? 'كل الأوزان' : currentLang === 'ru' ? 'Все фасовки' : currentLang === 'fr' ? 'Tous poids' : 'All Weights' },
    { id: '35g', label: '35g' },
    { id: '50g', label: '50g' },
    { id: '48g', label: '48g' },
    { id: '15g', label: '15g' },
    { id: '8g', label: '8g' },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.categoryId === activeCategory);
    }

    if (activeWeight !== 'all') {
      list = list.filter((p) => p.weight === activeWeight);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.packaging && p.packaging.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'weight') {
      const getNum = (w?: string) => (w ? parseInt(w) || 0 : 0);
      list.sort((a, b) => getNum(b.weight) - getNum(a.weight));
    }

    return list;
  }, [products, activeCategory, activeWeight, searchQuery, sortBy]);

  // Selection Logic
  const toggleSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  const selectedCount = Object.keys(selectedIds).length;
  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds[p.id]),
    [products, selectedIds]
  );

  const selectAllFiltered = () => {
    const next: Record<string, boolean> = { ...selectedIds };
    filteredProducts.forEach((p) => {
      next[p.id] = true;
    });
    setSelectedIds(next);
  };

  const clearSelection = () => {
    setSelectedIds({});
  };

  // WhatsApp Multi-product RFQ link
  const whatsappUrl = useMemo(() => {
    const phone = '8613967427888';
    const lines = selectedProducts.map(
      (p, i) => `${i + 1}. SKU: ${p.id} (${p.name}, ${p.weight || '35g'}, ${p.packaging || 'Box'})`
    );
    const text = `Hello Hulun Sweets! I would like to request an export wholesale quotation for ${selectedCount} selected confectionery products:\n\n${lines.join(
      '\n'
    )}\n\nPlease provide FOB quotation, CBM/Carton packing details, and MOQ. Thank you!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }, [selectedProducts, selectedCount]);

  const triggerExportRFQ = () => {
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="relative">
      {/* ── 1. PRO TOOLBAR & MULTI-DIMENSIONAL CONTROLS ── */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-choco/5 shadow-[0_20px_50px_rgba(61,44,35,0.06)] mb-12">
        {/* Row 1: Search, Sort & View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-choco/5">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLang === 'ar'
                  ? 'ابحث بالاسم أو الرمز (SKU) أو الوزن...'
                  : currentLang === 'ru'
                  ? 'Поиск по SKU, названию или весу...'
                  : currentLang === 'fr'
                  ? 'Recherche par nom, SKU ou poids...'
                  : 'Search by SKU, candy name, or pack size...'
              }
              className="w-full pl-12 pr-10 rtl:pl-10 rtl:pr-12 py-3.5 bg-cream/60 rounded-full text-choco font-medium text-sm border border-choco/5 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none transition-all"
            />
            <span className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-mocha/60 text-lg">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 text-mocha/50 hover:text-choco font-bold text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls Right: Counter, Sorter & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Count Pill */}
            <div className="px-4 py-2 bg-cream rounded-full text-xs font-bold font-display text-mocha">
              <span className="text-strawberry font-black">{filteredProducts.length}</span>{' '}
              {currentLang === 'ar' ? 'منتج معروض' : currentLang === 'ru' ? 'показано' : currentLang === 'fr' ? 'articles' : 'Products'}
            </div>

            {/* Sorter Dropdown */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-cream rounded-full text-xs font-bold text-choco border border-choco/5 focus:ring-2 focus:ring-strawberry/30 outline-none cursor-pointer"
            >
              <option value="default">{currentLang === 'ar' ? 'الترتيب الافتراضي' : currentLang === 'ru' ? 'По умолчанию' : 'Default Sorting'}</option>
              <option value="name">{currentLang === 'ar' ? 'الاسم (A-Z)' : 'Name (A-Z)'}</option>
              <option value="weight">{currentLang === 'ar' ? 'الوزن (الأكبر أولاً)' : 'Weight (High to Low)'}</option>
            </select>

            {/* View Switcher: Showroom Grid vs Pro Table */}
            <div className="flex items-center bg-cream p-1 rounded-full border border-choco/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-strawberry shadow-sm'
                    : 'text-mocha hover:text-choco'
                }`}
                title="Showroom 3D Grid"
              >
                <span>🎴</span>
                <span className="hidden sm:inline">{currentLang === 'ar' ? 'معرض 3D' : 'Showroom'}</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-strawberry shadow-sm'
                    : 'text-mocha hover:text-choco'
                }`}
                title="B2B Quick Order Table"
              >
                <span>📋</span>
                <span className="hidden sm:inline">{currentLang === 'ar' ? 'جدول B2B' : 'B2B Matrix'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="pt-6 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-mocha/50 mr-2 rtl:mr-0 rtl:ml-2">
            {currentLang === 'ar' ? 'الفئة:' : currentLang === 'ru' ? 'Категория:' : 'Category:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-display tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-strawberry text-white shadow-md shadow-strawberry/25 scale-105'
                  : 'bg-cream text-choco hover:bg-strawberry/10 border border-choco/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Weight Specification Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-mocha/50 mr-2 rtl:mr-0 rtl:ml-2">
            {currentLang === 'ar' ? 'الوزن:' : currentLang === 'ru' ? 'Фасовка:' : 'Spec Size:'}
          </span>
          {weightFilters.map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveWeight(w.id)}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                activeWeight === w.id
                  ? 'bg-choco text-white shadow-sm'
                  : 'bg-cream/60 text-mocha hover:bg-cream border border-choco/5'
              }`}
            >
              {w.label}
            </button>
          ))}

          {/* Quick selection helper buttons */}
          <div className="ml-auto rtl:ml-0 rtl:mr-auto flex items-center gap-3 pt-2 sm:pt-0">
            <button
              onClick={selectAllFiltered}
              className="text-xs font-bold text-mocha hover:text-strawberry transition-colors underline decoration-dotted"
            >
              {currentLang === 'ar' ? 'تحديد الكل للطلب' : 'Select All Filtered'}
            </button>
            {selectedCount > 0 && (
              <button
                onClick={clearSelection}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors"
              >
                {currentLang === 'ar' ? 'إلغاء التحديد' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. VIEW A: SHOWROOM 3D TILT CARDS GRID ── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-24">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isSelected = !!selectedIds[product.id];
              const colors = CATEGORY_COLORS[product.categoryId] || CATEGORY_COLORS.marshmallow;

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="h-full"
                >
                  <TiltCard>
                    <div
                      className={`relative flex flex-col h-full bg-white rounded-[2.5rem] border p-6 transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? 'ring-4 ring-strawberry/40 border-strawberry shadow-2xl shadow-strawberry/25'
                          : `border-choco/5 shadow-[0_15px_35px_rgba(61,44,35,0.05)] ${colors.border}`
                      }`}
                    >
                      {/* Ambient corner glow */}
                      <div
                        className={`absolute top-0 right-0 rtl:right-auto rtl:left-0 w-36 h-36 bg-gradient-to-bl ${colors.glow} rounded-full blur-xl pointer-events-none`}
                      />

                      {/* Top Action Bar: SKU & Selection Checkbox */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="font-mono text-[11px] font-bold text-mocha/70 bg-cream px-2.5 py-1 rounded-md border border-choco/5">
                          {product.id}
                        </span>

                        {/* Interactive RFQ Selection Pill */}
                        <button
                          onClick={(e) => toggleSelect(product.id, e)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-strawberry text-white shadow-sm'
                              : 'bg-cream text-mocha hover:bg-strawberry/10 hover:text-strawberry border border-choco/5'
                          }`}
                        >
                          <span>{isSelected ? '✓' : '+'}</span>
                          <span>{isSelected ? (currentLang === 'ar' ? 'تم الاختيار' : 'Selected') : (currentLang === 'ar' ? 'طلب تسعير' : 'Inquire')}</span>
                        </button>
                      </div>

                      {/* Product Image Stage */}
                      <a
                        href={translatePath(`/product/${product.id}`)}
                        className="relative aspect-square w-full bg-gradient-to-b from-cream/60 to-white rounded-3xl p-6 flex items-center justify-center mb-5 group overflow-hidden block"
                      >
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-115 group-hover:rotate-2 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${colors.badge}`}>
                            {t(`products_page.${product.categoryId}`, product.categoryId)}
                          </span>
                        </div>
                      </a>

                      {/* Product Meta */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <a href={translatePath(`/product/${product.id}`)}>
                            <h3 className="text-lg font-black font-display text-choco hover:text-strawberry transition-colors line-clamp-1 mb-1.5">
                              {product.name}
                            </h3>
                          </a>
                          <p className="text-xs text-mocha font-medium line-clamp-2 leading-relaxed mb-4">
                            {product.description}
                          </p>
                        </div>

                        {/* Specs Strip */}
                        <div className="pt-3 border-t border-choco/5 flex items-center justify-between text-xs font-bold text-mocha">
                          <span className="inline-flex items-center gap-1">
                            ⚖️ {product.weight || '35g'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-mocha/70 truncate max-w-[120px]">
                            📦 {product.packaging || 'Box'}
                          </span>
                        </div>

                        {/* View Specs Link */}
                        <div className="mt-4">
                          <a
                            href={translatePath(`/product/${product.id}`)}
                            className="w-full py-2.5 rounded-full bg-cream hover:bg-strawberry hover:text-white text-choco font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                          >
                            <span>{currentLang === 'ar' ? 'عرض المواصفات التصديرية' : currentLang === 'ru' ? 'Спецификация' : currentLang === 'fr' ? 'Spécifications' : 'View Specifications'}</span>
                            <span className="rtl:rotate-180">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* ── 3. VIEW B: B2B PRO SPECIFICATION MATRIX (TABLE) ── */
        <div className="bg-white rounded-[2.5rem] border border-choco/5 shadow-[0_20px_50px_rgba(61,44,35,0.06)] overflow-hidden mb-24">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-cream/80 text-mocha text-xs font-black uppercase tracking-wider border-b border-choco/5">
                  <th className="p-4 pl-6 rtl:pl-4 rtl:pr-6 text-center w-12">
                    <input
                      type="checkbox"
                      checked={filteredProducts.length > 0 && filteredProducts.every((p) => selectedIds[p.id])}
                      onChange={(e) => (e.target.checked ? selectAllFiltered() : clearSelection())}
                      className="w-4 h-4 rounded accent-strawberry cursor-pointer"
                    />
                  </th>
                  <th className="p-4 w-20 text-center">{currentLang === 'ar' ? 'الصورة' : 'Photo'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'الرمز (SKU)' : 'SKU / Model'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'الاسم' : 'Candy Title'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'القسم' : 'Category'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'الوزن الصافي' : 'Net Weight'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'نوع التغليف' : 'Packaging'}</th>
                  <th className="p-4">{currentLang === 'ar' ? 'الشهادات' : 'Compliance'}</th>
                  <th className="p-4 pr-6 rtl:pr-4 rtl:pl-6 text-center">{currentLang === 'ar' ? 'إجراء' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-choco/5 text-sm">
                {filteredProducts.map((product) => {
                  const isSelected = !!selectedIds[product.id];
                  return (
                    <tr
                      key={product.id}
                      onClick={() => toggleSelect(product.id)}
                      className={`hover:bg-cream/40 transition-colors cursor-pointer ${
                        isSelected ? 'bg-strawberry/5' : ''
                      }`}
                    >
                      <td className="p-4 pl-6 rtl:pl-4 rtl:pr-6 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(product.id)}
                          className="w-4 h-4 rounded accent-strawberry cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <div className="w-14 h-14 bg-cream/70 rounded-xl p-1.5 flex items-center justify-center mx-auto overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain filter drop-shadow-sm"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-xs text-mocha">
                        {product.id}
                      </td>
                      <td className="p-4 font-bold font-display text-choco hover:text-strawberry transition-colors">
                        <a href={translatePath(`/product/${product.id}`)}>
                          {product.name}
                        </a>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cream text-mocha border border-choco/5">
                          {t(`products_page.${product.categoryId}`, product.categoryId)}
                        </span>
                      </td>
                      <td className="p-4 font-black font-display text-choco">
                        {product.weight || '35g'}
                      </td>
                      <td className="p-4 text-mocha text-xs font-medium">
                        {product.packaging || 'Standard Bag'}
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          ✓ Halal / HACCP
                        </span>
                      </td>
                      <td className="p-4 pr-6 rtl:pr-4 rtl:pl-6 text-center" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={translatePath(`/product/${product.id}`)}
                          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-cream hover:bg-strawberry hover:text-white text-choco font-bold text-xs transition-colors"
                        >
                          <span>{currentLang === 'ar' ? 'عرض' : 'Inspect'}</span>
                          <span className="rtl:rotate-180">→</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 4. STICKY BULK RFQ INQUIRY DRAWER ── */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-6 left-4 right-4 max-w-4xl mx-auto z-[9999] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-4 sm:p-6 border-2 border-strawberry/30 shadow-[0_25px_60px_rgba(255,107,157,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            {/* Left: Summary & Selected Mini Previews */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-strawberry text-white font-black font-display text-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-strawberry/40">
                {selectedCount}
              </div>

              <div>
                <div className="text-sm font-black font-display text-choco">
                  {currentLang === 'ar' ? 'تم اختيار أصناف لطلب التسعير بالجملة' : 'Export Inquiry Selection'}
                </div>
                <div className="text-xs text-mocha font-medium flex items-center gap-2">
                  <span>{selectedCount} {currentLang === 'ar' ? 'أصناف محددة' : 'Varieties Selected'}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">100% Halal / OEM Ready</span>
                </div>
              </div>

              {/* Mini Avatars */}
              <div className="hidden md:flex items-center -space-x-2 rtl:space-x-reverse ml-2 rtl:ml-0 rtl:mr-2 overflow-hidden max-w-[140px]">
                {selectedProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="w-9 h-9 rounded-full bg-cream border-2 border-white overflow-hidden shadow-sm flex-shrink-0"
                  >
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={clearSelection}
                className="px-4 py-3 rounded-full bg-cream hover:bg-rose-50 text-rose-500 font-bold text-xs transition-colors"
              >
                {currentLang === 'ar' ? 'إفراغ القائمة' : 'Clear'}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerExportRFQ}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-black font-display text-sm tracking-wide shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"
              >
                <span>💬</span>
                <span>{currentLang === 'ar' ? 'إرسال طلب التسعير المباشر' : 'Instant WhatsApp RFQ'}</span>
                <span className="rtl:rotate-180">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
