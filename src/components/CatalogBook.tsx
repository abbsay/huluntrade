import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslatedPath } from '../i18n';
import confetti from 'canvas-confetti';

interface Product {
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

interface CatalogBookProps {
  products: Product[];
  currentLang?: string;
}

interface CategoryGroup {
  id: string;
  code: string;
  name: string;
  desc: string;
  tagline: string;
  items: Product[];
}

export default function CatalogBook({ products, currentLang = 'en' }: CatalogBookProps) {
  const translatePath = useTranslatedPath(currentLang);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSKUs, setSelectedSKUs] = useState<Record<string, boolean>>({});

  const groups: CategoryGroup[] = [
    {
      id: 'marshmallow',
      code: 'SEC-01',
      name: currentLang === 'ar' ? 'مارشميلو (Marshmallows)' : currentLang === 'ru' ? 'Маршмеллоу (Marshmallow)' : currentLang === 'fr' ? 'Guimauves (Marshmallow)' : 'Marshmallows',
      tagline: '35g Twist Pops & 3D Figures',
      desc: currentLang === 'ar' ? 'أشكال كرتونية ثلاثية الأبعاد وعصي حلزونية ملونة، معتمدة حلال ومثالية لعروض المتاجر.' :
            currentLang === 'ru' ? '3D фигурки на палочке и яркие спирали из 100% халяльного желатина.' :
            currentLang === 'fr' ? 'Figurines 3D et sucettes torsadées moelleuses, certifiées 100% Halal.' :
            'Fluffy 3D character pops & swirl twist sticks. 100% Halal export standard.',
      items: products.filter((p) => p.categoryId === 'marshmallow'),
    },
    {
      id: 'jelly',
      code: 'SEC-02',
      name: currentLang === 'ar' ? 'حلوى الجيلي (Jelly Gummies)' : currentLang === 'ru' ? 'Жевательный мармелад (Jelly)' : currentLang === 'fr' ? 'Gélifiés aux fruits (Jelly)' : 'Fruit Jelly & Gummies',
      tagline: '50g, 48g, 8g Fruit Juice Packs',
      desc: currentLang === 'ar' ? 'حلوى جيلي طرية وشفافة بخلاصات الفواكه الطبيعية وتغليف محكم.' :
            currentLang === 'ru' ? 'Сочный жевательный мармелад с натуральным фруктовым соком.' :
            currentLang === 'fr' ? 'Bonbons gélifiés tendres et translucides aux extraits naturels de fruits.' :
            'Chewy, crystal-clear fruit gummies made with natural juice extract.',
      items: products.filter((p) => p.categoryId === 'jelly'),
    },
    {
      id: 'hard_candy',
      code: 'SEC-03',
      name: currentLang === 'ar' ? 'المصاصات الفنية وحلوى الكريستال (Lollipops)' : currentLang === 'ru' ? 'Леденцы и карамель (Lollipops)' : currentLang === 'fr' ? 'Sucettes & Bonbons Durs' : 'Artisanal Lollipops & Hard Candy',
      tagline: '15g Swirl Pops & 35g Bear Candy',
      desc: currentLang === 'ar' ? 'مصاصات فنية حلزونية يدوية الصنع وعلب عرض تجزئة 24 قطعة.' :
            currentLang === 'ru' ? 'Фигурные леденцы ручной работы в дисплей-боксах по 24 штуки.' :
            currentLang === 'fr' ? 'Sucettes torsadées artisanales présentées en boîtes présentoirs de 24 pièces.' :
            'Handcrafted swirl lollipops & crystal drop candy in retail display trays.',
      items: products.filter((p) => p.categoryId === 'hard_candy'),
    },
  ];

  const visibleGroups = groups
    .map((g) => {
      let items = g.items;
      if (activeCategory !== 'all' && g.id !== activeCategory) {
        return null;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        items = items.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            (p.packaging && p.packaging.toLowerCase().includes(q))
        );
      }
      if (items.length === 0) return null;
      return { ...g, items };
    })
    .filter(Boolean) as CategoryGroup[];

  const toggleSelect = (id: string) => {
    setSelectedSKUs((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  const selectedCount = Object.keys(selectedSKUs).length;
  const selectedItems = products.filter((p) => selectedSKUs[p.id]);

  const selectAll = () => {
    const next: Record<string, boolean> = { ...selectedSKUs };
    visibleGroups.forEach((g) => {
      g.items.forEach((p) => {
        next[p.id] = true;
      });
    });
    setSelectedIds(next);
  };

  const setSelectedIds = (obj: Record<string, boolean>) => setSelectedSKUs(obj);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const whatsappInquiryUrl = () => {
    const phone = '8613967427888';
    if (selectedCount === 0) {
      const text = `Hello Hulun Sweets! I reviewed your 2026 Product Price List & Catalog Sheet and would like to request full FOB container pricing.`;
      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }
    const itemsList = selectedItems
      .map((p, idx) => `${idx + 1}. [${p.id.toUpperCase()}] ${p.name} — ${p.weight || '35g'} (${p.packaging || 'Box'})`)
      .join('\n');
    const text = `Hello Hulun Sweets! I am inquiring from your 2026 Product Sheet regarding these ${selectedCount} selected items:\n\n${itemsList}\n\nPlease provide official export quotation and CBM volume.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const triggerConfettiCelebration = () => {
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-choco font-sans selection:bg-strawberry selection:text-white pb-32">
      {/* ── PRINT STYLES ── */}
      <style>{`
        @media print {
          header, footer, .no-print, .sticky-action-bar, .sticky-rfq-drawer {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .sheet-row {
            break-inside: avoid !important;
            border-bottom: 1px solid #d1d5db !important;
          }
          .sheet-header {
            background-color: #f3f4f6 !important;
            color: #111827 !important;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
        }
      `}</style>

      {/* ── TOP STICKY TOOLBAR ── */}
      <div className="no-print sticky top-[6.5rem] z-40 bg-white/95 backdrop-blur-xl border-b border-choco/10 py-3.5 px-4 md:px-8 shadow-sm">
        <div className="max-w-[1300px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-black uppercase tracking-widest text-mocha/60 mr-2 rtl:mr-0 rtl:ml-2">
              {currentLang === 'ar' ? 'تصفية القائمة:' : 'Filter:'}
            </span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-choco text-white shadow-sm'
                  : 'bg-cream text-mocha hover:bg-strawberry/10 hover:text-strawberry'
              }`}
            >
              {currentLang === 'ar' ? 'الكل (57 صنف)' : 'All 57 Items'}
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveCategory(g.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
                  activeCategory === g.id
                    ? 'bg-strawberry text-white shadow-sm'
                    : 'bg-cream text-mocha hover:bg-strawberry/10 hover:text-strawberry'
                }`}
              >
                <span>{g.id === 'marshmallow' ? (currentLang === 'ar' ? 'مارشميلو' : 'Marshmallow') : g.id === 'jelly' ? (currentLang === 'ar' ? 'جيلي' : 'Jelly') : (currentLang === 'ar' ? 'مصاصات' : 'Lollipops')}</span>
                <span className="text-[10px] opacity-60">({g.items.length})</span>
              </button>
            ))}
          </div>

          {/* Search Box & Print PDF */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'ar' ? 'بحث سريع عن صنف أو رقم SKU...' : 'Quick SKU or keyword filter...'}
                className="w-full pl-9 pr-8 rtl:pl-8 rtl:pr-9 py-2 bg-cream/70 rounded-full text-xs font-bold text-choco placeholder:text-mocha/50 border border-choco/10 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none"
              />
              <span className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-xs text-mocha/50">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-mocha/50 hover:text-choco"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream hover:bg-white text-choco font-bold text-xs border border-choco/10 shadow-sm transition-all"
              title="Print or Save PDF"
            >
              <span>🖨️</span>
              <span className="hidden md:inline">{currentLang === 'ar' ? 'طباعة / حفظ PDF' : 'Print PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN PRODUCT LIST SHEET CONTAINER ── */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-8">

        {/* ── HEADER MANIFEST (Clean B2B Header) ── */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-choco/10 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-strawberry" />
              <span className="font-mono text-xs font-black tracking-widest text-strawberry uppercase">
                2026 Official Line Sheet & Export Manifest
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-choco tracking-tight">
              {currentLang === 'ar' ? 'قائمة مواصفات منتجات حلويات هولون' : 'Hulun Sweets Product Catalog List'}
            </h1>
            <p className="text-mocha text-sm font-medium mt-2 max-w-2xl">
              {currentLang === 'ar'
                ? 'قائمة مفصلة بجميع الأصناف المصنعة في مصنع إيوو: المواصفات، الأوزان الصافية، خيارات التغليف، معتمدة حلال ومطابقة لمعايير سلامة الأغذية العالمية.'
                : 'Complete factory-direct confectionery line sheet. Detailed specifications, net weights, packaging formats, Halal certifications, and container shipping parameters.'}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-choco/10 pt-4 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 flex-shrink-0">
            <div className="text-right rtl:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mocha/60 block">Factory Origin</span>
              <span className="text-sm font-black font-display text-choco">Yiwu, Zhejiang, China</span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mocha/60 block">Standards</span>
              <span className="text-sm font-black font-display text-emerald-600">Halal / HACCP / OEM</span>
            </div>
          </div>
        </div>

        {/* ── SECTION GROUPS ── */}
        <div className="space-y-12">
          {visibleGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-3xl border border-choco/10 shadow-sm overflow-hidden">
              {/* Group Banner Row */}
              <div className="bg-[#FAF4EE] px-6 py-4 border-b border-choco/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black bg-choco text-white px-2.5 py-1 rounded-md">
                    {group.code}
                  </span>
                  <h2 className="text-xl font-black font-display text-choco">
                    {group.name}
                  </h2>
                  <span className="text-xs text-mocha font-semibold hidden sm:inline">
                    — {group.tagline}
                  </span>
                </div>
                <div className="text-xs font-bold text-strawberry">
                  {group.items.length} {currentLang === 'ar' ? 'صنف متوفر' : 'SKUs Available'}
                </div>
              </div>

              {/* Product Rows List */}
              <div className="divide-y divide-choco/5">
                {group.items.map((item, idx) => {
                  const isChecked = !!selectedSKUs[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`sheet-row p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer hover:bg-[#FFFDFB] ${
                        isChecked ? 'bg-strawberry/5' : ''
                      }`}
                    >
                      {/* Left: Checkbox + Number + Thumbnail + Info */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Checkbox */}
                        <div
                          className="no-print flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelect(item.id)}
                            className="w-4 h-4 rounded accent-strawberry cursor-pointer"
                          />
                        </div>

                        {/* Line Number */}
                        <span className="font-mono text-xs font-bold text-mocha/40 w-6 text-center flex-shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        {/* Crisp Thumbnail Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cream/70 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-choco/5 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>

                        {/* Title, SKU & Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-black text-strawberry bg-strawberry/10 px-2 py-0.5 rounded">
                              {item.id.toUpperCase()}
                            </span>
                            <a
                              href={translatePath(`/product/${item.id}`)}
                              onClick={(e) => e.stopPropagation()}
                              className="font-black font-display text-choco hover:text-strawberry transition-colors text-base sm:text-lg truncate"
                            >
                              {item.name}
                            </a>
                          </div>
                          <p className="text-xs text-mocha font-medium line-clamp-1 max-w-xl">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Middle / Right: Parameters and Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t sm:border-t-0 border-choco/5 pt-3 sm:pt-0">
                        {/* Net Weight */}
                        <div className="text-left rtl:text-right min-w-[70px]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mocha/50 block">
                            Net Weight
                          </span>
                          <span className="text-sm font-black font-display text-choco">
                            {item.weight || '35g'}
                          </span>
                        </div>

                        {/* Packaging format */}
                        <div className="text-left rtl:text-right min-w-[110px] hidden md:block">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mocha/50 block">
                            Packaging
                          </span>
                          <span className="text-xs font-bold text-mocha truncate block">
                            {item.packaging || 'Standard Bag'}
                          </span>
                        </div>

                        {/* Certification Pill */}
                        <div className="hidden lg:block">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 whitespace-nowrap">
                            ✓ Halal Export
                          </span>
                        </div>

                        {/* Details Link */}
                        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={translatePath(`/product/${item.id}`)}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-cream hover:bg-strawberry hover:text-white text-choco font-bold text-xs transition-colors"
                          >
                            <span>{currentLang === 'ar' ? 'التفاصيل' : 'Specs'}</span>
                            <span className="rtl:rotate-180">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM FOOTER SIGN-OFF ── */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-choco/10 text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left rtl:text-right">
            <span className="text-xs font-bold text-strawberry uppercase tracking-wider block mb-1">
              Direct Manufacturer & Global Supply
            </span>
            <h3 className="text-lg font-black font-display text-choco">
              Hulun Trade Co., Ltd. — Confectionery Export Division
            </h3>
            <p className="text-xs text-mocha mt-1">
              Yiwu International Trade City, Zhejiang, China • Tel/WhatsApp: +86 13967427888 • Email: Van001@huluntrade.com
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              onClick={selectAll}
              className="px-5 py-2.5 rounded-full bg-cream hover:bg-choco hover:text-white text-choco font-bold text-xs transition-colors border border-choco/10"
            >
              {currentLang === 'ar' ? 'تحديد كل القائمة للطلب' : 'Select All Listed'}
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-strawberry text-white font-bold text-xs shadow-md shadow-strawberry/25 hover:bg-rose-500 transition-colors"
            >
              {currentLang === 'ar' ? 'حفظ بصيغة PDF' : 'Save as PDF'}
            </button>
          </div>
        </div>

      </div>

      {/* ── STICKY RFQ FLOATING BAR (FOR SELECTED ITEMS) ── */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="no-print sticky-rfq-drawer fixed bottom-6 left-4 right-4 max-w-3xl mx-auto z-50 bg-white/95 backdrop-blur-2xl rounded-full p-3 sm:p-4 border-2 border-strawberry/30 shadow-[0_20px_50px_rgba(255,107,157,0.3)] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 pl-2 rtl:pl-0 rtl:pr-2">
              <div className="w-10 h-10 rounded-full bg-strawberry text-white font-black font-display text-base flex items-center justify-center flex-shrink-0 shadow-md">
                {selectedCount}
              </div>
              <div className="text-xs sm:text-sm font-bold text-choco">
                <span>{selectedCount} {currentLang === 'ar' ? 'أصناف محددة لطلب التسعير' : 'Selected Products for Wholesale Quote'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSKUs({})}
                className="px-3.5 py-2 rounded-full text-xs font-bold text-mocha hover:text-rose-500 transition-colors"
              >
                {currentLang === 'ar' ? 'إلغاء' : 'Clear'}
              </button>

              <a
                href={whatsappInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfettiCelebration}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black font-display text-xs tracking-wide shadow-md hover:scale-105 transition-transform"
              >
                <span>💬</span>
                <span>{currentLang === 'ar' ? 'إرسال إلى واتساب' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
