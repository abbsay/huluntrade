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

interface Chapter {
  id: string;
  num: string;
  code: string;
  themeBg: string;
  badgeBg: string;
  tagline: string;
  title: string;
  desc: string;
  heroImg: string;
  items: Product[];
}

export default function CatalogBook({ products, currentLang = 'en' }: CatalogBookProps) {
  const translatePath = useTranslatedPath(currentLang);

  const [activeChapter, setActiveChapter] = useState<string>('all');
  const [selectedSKUs, setSelectedSKUs] = useState<Record<string, boolean>>({});

  // Organize by chapters
  const chapters: Chapter[] = [
    {
      id: 'marshmallow',
      num: '01',
      code: 'CH-01',
      themeBg: 'from-pink-500/10 via-rose-400/5 to-transparent',
      badgeBg: 'bg-pink-100 text-pink-600 border-pink-200',
      tagline: currentLang === 'ar' ? 'سحاب طري ولذة لا تنتهي' : currentLang === 'ru' ? 'Облачная текстура и нежность' : currentLang === 'fr' ? 'La douceur aérienne' : 'Cloud-Soft Confectionery',
      title: currentLang === 'ar' ? 'تشكيلة المارشميلو الفاخرة' : currentLang === 'ru' ? 'Премиальная коллекция Маршмеллоу' : currentLang === 'fr' ? 'Collection Guimauves d’Exception' : 'Fluffy Marshmallow Series',
      desc: currentLang === 'ar' ? 'مصنوعة بتقنية فقاعات الهواء الدقيقة ومكونات حلال 100%، بأشكال ثلاثية الأبعاد جذابة وأعواد ملونة تلائم عروض السوبرماركت ومحلات الهدايا.' :
            currentLang === 'ru' ? 'Воздушный марشмеллоу, произведенный по технологии микро-пузырьков из 100% халяльных ингредиентов. Яркие 3D фигурки и спирали.' :
            currentLang === 'fr' ? 'Élaborées avec notre technologie exclusive de micro-bulles d’air et des ingrédients 100% Halal. Formes 3D ludiques et torsades fruitées.' :
            'Engineered with micro-bubble technology and 100% Halal gelatin. Features charming 3D cartoon characters, fruity twist pops, and gift display trays.',
      heroImg: '/images/categories/minimal_marshmallow.svg',
      items: products.filter((p) => p.categoryId === 'marshmallow'),
    },
    {
      id: 'jelly',
      num: '02',
      code: 'CH-02',
      themeBg: 'from-amber-500/10 via-orange-400/5 to-transparent',
      badgeBg: 'bg-amber-100 text-amber-700 border-amber-200',
      tagline: currentLang === 'ar' ? 'عصير فواكه طبيعي وقوام مطاطي مثالي' : currentLang === 'ru' ? 'Натуральный сок и сочная текстура' : currentLang === 'fr' ? 'Plein fruit et fraîcheur' : 'Rich Fruit Gum & Jellies',
      title: currentLang === 'ar' ? 'حلوى الجيلي والمارملاد الغني' : currentLang === 'ru' ? 'Фруктовый желейный мармелад' : currentLang === 'fr' ? 'Bonbons Gélifiés Fruités' : 'Juicy Jelly Gummy Series',
      desc: currentLang === 'ar' ? 'حلوى جيلي شفافة وطرية بنكهات المانجو، الفراولة، والتفاح مع عبوات مغلقة بعناية للحفاظ على الطراوة والنكهة المركزة.' :
            currentLang === 'ru' ? 'Прозрачный жевательный мармелад с насыщенным вкусом манго, клубники и винограда в герметичной экспортной упаковке.' :
            currentLang === 'fr' ? 'Gélifiés translucides et moelleux aux extraits concentrés de mangue, fraise et pomme dans des sachets hermétiques fraîcheur.' :
            'Crystal-clear chewy gummies packed with concentrated fruit puree. Available in 50g, 48g, and 8g grab-and-go retail packs.',
      heroImg: '/images/categories/minimal_jelly.svg',
      items: products.filter((p) => p.categoryId === 'jelly'),
    },
    {
      id: 'hard_candy',
      num: '03',
      code: 'CH-03',
      themeBg: 'from-purple-500/10 via-fuchsia-400/5 to-transparent',
      badgeBg: 'bg-purple-100 text-purple-700 border-purple-200',
      tagline: currentLang === 'ar' ? 'فن السكر اليدوي وقرمشة ساحرة' : currentLang === 'ru' ? 'Артизанальная карамель и хруст' : currentLang === 'fr' ? 'L’art du sucre croquant' : 'Handmade Swirls & Hard Candy',
      title: currentLang === 'ar' ? 'المصاصات الفنية وحلوى الكريستال' : currentLang === 'ru' ? 'Артизанальные леденцы на палочке' : currentLang === 'fr' ? 'Sucettes Artisanales & Bonbons Durs' : 'Artisanal Lollipops & Drops',
      desc: currentLang === 'ar' ? 'مصاصات حلزونية ملونة مصنوعة يدوياً بدقة فائقة وأشكال قلوب وزهور ساحرة، بالإضافة إلى حلوى الدببة المبهجة بألوان كريستالية.' :
            currentLang === 'ru' ? 'Разноцветные леденцы ручной работы в форме сердец, цветов и фигурок медведей в удобных шоу-боксах по 24 штуки.' :
            currentLang === 'fr' ? 'Sucettes torsadées faites à la main en forme de cœurs et fleurs, accompagnées de nos célèbres oursons en sucre cuit.' :
            'Handcrafted swirl lollipops in eye-catching floral, heart, and character shapes, presented in shelf-ready 24-piece retail counter displays.',
      heroImg: '/images/categories/minimal_hard_candy.svg',
      items: products.filter((p) => p.categoryId === 'hard_candy'),
    },
  ];

  const visibleChapters = activeChapter === 'all'
    ? chapters
    : chapters.filter((c) => c.id === activeChapter);

  const toggleSelect = (id: string) => {
    setSelectedSKUs((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  const selectedCount = Object.keys(selectedSKUs).length;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const selectedItems = products.filter((p) => selectedSKUs[p.id]);

  const whatsappInquiryUrl = () => {
    const phone = '8613967427888';
    if (selectedCount === 0) {
      const text = `Hello Hulun Sweets! I have reviewed your 2026 Product Catalog Lookbook and would like to request full pricing, MOQ, and export container details.`;
      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }
    const itemsList = selectedItems
      .map((p, idx) => `${idx + 1}. SKU: ${p.id} (${p.name} - ${p.weight || '35g'}, ${p.packaging || 'Box'})`)
      .join('\n');
    const text = `Hello Hulun Sweets! I am inquiring from your 2026 Product Catalog regarding the following ${selectedCount} selected items:\n\n${itemsList}\n\nPlease share export wholesale pricing (FOB) and container packing parameters.`;
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
    <div className="w-full bg-[#FAF7F2] text-choco font-sans selection:bg-strawberry selection:text-white pb-32">
      {/* ── PRINT-ONLY STYLES INJECTION ── */}
      <style>{`
        @media print {
          header, footer, .no-print, #print-action-bar, .sticky-rfq-drawer {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .page-break {
            page-break-before: always !important;
            break-before: page !important;
          }
          .catalog-card {
            box-shadow: none !important;
            border: 1px solid #e5e5e5 !important;
          }
        }
      `}</style>

      {/* ── TOP EDITORIAL FLOATING ACTION BAR ── */}
      <div className="no-print sticky top-[6.5rem] z-40 bg-white/90 backdrop-blur-xl border-b border-choco/10 py-3 px-4 md:px-8 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Chapter Quick Jump Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-black uppercase tracking-widest text-mocha/60 mr-2 rtl:mr-0 rtl:ml-2">
              {currentLang === 'ar' ? 'الأقسام:' : 'Index:'}
            </span>
            <button
              onClick={() => setActiveChapter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
                activeChapter === 'all'
                  ? 'bg-choco text-white shadow-sm'
                  : 'bg-cream text-mocha hover:bg-strawberry/10 hover:text-strawberry'
              }`}
            >
              {currentLang === 'ar' ? 'عرض الكتالوج كاملاً' : 'Full Book'}
            </button>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
                  activeChapter === ch.id
                    ? 'bg-strawberry text-white shadow-sm'
                    : 'bg-cream text-mocha hover:bg-strawberry/10 hover:text-strawberry'
                }`}
              >
                <span className="opacity-70">{ch.code}</span>
                <span>{ch.id === 'marshmallow' ? (currentLang === 'ar' ? 'مارشميلو' : 'Marshmallow') : ch.id === 'jelly' ? (currentLang === 'ar' ? 'جيلي' : 'Jelly') : (currentLang === 'ar' ? 'مصاصات' : 'Lollipops')}</span>
                <span className="text-[10px] opacity-60">({ch.items.length})</span>
              </button>
            ))}
          </div>

          {/* Action Buttons: Print PDF & Inquiry */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream hover:bg-white text-choco font-bold text-xs border border-choco/10 shadow-sm transition-all hover:shadow"
              title="Print or Save as PDF"
            >
              <span>🖨️</span>
              <span>{currentLang === 'ar' ? 'طباعة / حفظ PDF' : currentLang === 'ru' ? 'Печать / Сохранить в PDF' : currentLang === 'fr' ? 'Imprimer en PDF' : 'Print / Save PDF'}</span>
            </button>

            <a
              href={whatsappInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerConfettiCelebration}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>💬</span>
              <span>{currentLang === 'ar' ? 'طلب تسعير الحاوية' : 'WhatsApp Inquiry'}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10">

        {/* ── COVER SPREAD (MAGAZINE COVER STYLE) ── */}
        <div className="bg-gradient-to-br from-choco via-[#2D1F17] to-black text-white rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden mb-24">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-strawberry/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glowOrange/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Stamp Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-strawberry text-white shadow-md">
                Official Export Lookbook 2026
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/10">
                100% Halal & HACCP Certified
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/10">
                Direct Yiwu Factory Supply
              </span>
            </div>

            {/* Huge Display Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[1.05] mb-6">
              Hulun Sweets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-strawberry via-pink-300 to-amber-300">
                Confectionery Catalog
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mb-12">
              {currentLang === 'ar'
                ? 'الدليل التصديري الشامل لأحدث خطوط إنتاج المارشميلو والجيلي والمصاصات الفنية من مصنع هولون بمدينة إيوو للتجارة الدولية.'
                : currentLang === 'ru'
                ? 'Официальный экспортный каталог кондитерской продукции 2026: нежный маршмеллоу, сочное желе и леденцы прямо от производителя в Иу.'
                : currentLang === 'fr'
                ? 'Le catalogue officiel d’exportation 2026: guimauves d’exception, bonbons gélifiés fruités et sucettes artisanales fabriqués à Yiwu.'
                : 'The complete 2026 wholesale confectionery product collection, designed for international supermarket chains, global distributors, and OEM private labels.'}
            </p>

            {/* Spec Sheet Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-white/90">
              <div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Total Varieties</div>
                <div className="text-3xl font-black font-display text-white">57 Items</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Export Nations</div>
                <div className="text-3xl font-black font-display text-white">40+ Countries</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Certification</div>
                <div className="text-3xl font-black font-display text-strawberry">Halal / HACCP</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">Supply Mode</div>
                <div className="text-3xl font-black font-display text-amber-300">OEM / Bulk FCL</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CHAPTER SPREADS ── */}
        <div className="space-y-32">
          {visibleChapters.map((chapter) => (
            <section key={chapter.id} id={chapter.id} className="scroll-mt-40">
              {/* Chapter Header Card (Magazine Spread Divider) */}
              <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-choco/5 shadow-[0_20px_50px_rgba(61,44,35,0.06)] relative overflow-hidden mb-12">
                {/* Background Tint Gradient */}
                <div className={`absolute top-0 right-0 rtl:right-auto rtl:left-0 w-96 h-96 bg-gradient-to-bl ${chapter.themeBg} rounded-full blur-3xl pointer-events-none`} />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl sm:text-5xl font-black font-display text-strawberry">
                        {chapter.num}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${chapter.badgeBg}`}>
                        {chapter.tagline}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black font-display text-choco tracking-tight mb-4">
                      {chapter.title}
                    </h2>

                    <p className="text-mocha text-base sm:text-lg leading-relaxed font-medium mb-6">
                      {chapter.desc}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold text-mocha/70">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-strawberry" />
                        {chapter.items.length} {currentLang === 'ar' ? 'أصناف في هذا القسم' : 'Products in this Chapter'}
                      </span>
                      <span>•</span>
                      <span>Ready for Container Shipping</span>
                    </div>
                  </div>

                  {/* Right Hero Illustration */}
                  <div className="w-44 h-44 sm:w-56 sm:h-56 flex-shrink-0 bg-cream/70 rounded-[2.5rem] p-8 border border-choco/5 flex items-center justify-center filter drop-shadow-xl">
                    <img
                      src={chapter.heroImg}
                      alt={chapter.title}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Chapter Products Grid (Editorial Gallery Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {chapter.items.map((item, idx) => {
                  const isChecked = !!selectedSKUs[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`catalog-card group relative flex flex-col bg-white rounded-[2rem] border p-5 transition-all duration-300 ${
                        isChecked
                          ? 'border-strawberry ring-2 ring-strawberry/30 shadow-xl'
                          : 'border-choco/5 shadow-[0_10px_30px_rgba(61,44,35,0.04)] hover:shadow-[0_20px_45px_rgba(255,107,157,0.15)] hover:-translate-y-1.5'
                      }`}
                    >
                      {/* Top SKU Badge & Select Action */}
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="font-mono font-black text-mocha/70 bg-cream px-2.5 py-1 rounded-md border border-choco/5">
                          {item.id.toUpperCase()}
                        </span>
                        <button
                          onClick={() => toggleSelect(item.id)}
                          className={`no-print flex items-center gap-1 px-3 py-1 rounded-full font-bold text-[11px] transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-strawberry text-white'
                              : 'bg-cream hover:bg-strawberry/10 text-mocha hover:text-strawberry border border-choco/5'
                          }`}
                        >
                          <span>{isChecked ? '✓' : '+'}</span>
                          <span>{isChecked ? 'Selected' : 'RFQ'}</span>
                        </button>
                      </div>

                      {/* Product Image Box */}
                      <a
                        href={translatePath(`/product/${item.id}`)}
                        className="relative aspect-square w-full bg-gradient-to-b from-[#FFF9F9] to-white rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-[#FFF5F7] transition-colors block"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute bottom-2 left-2 text-[10px] font-black uppercase text-mocha/40 font-mono">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                      </a>

                      {/* Product Data */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <a href={translatePath(`/product/${item.id}`)}>
                            <h3 className="text-base font-black font-display text-choco group-hover:text-strawberry transition-colors line-clamp-1 mb-1">
                              {item.name}
                            </h3>
                          </a>
                          <p className="text-xs text-mocha font-medium line-clamp-2 leading-relaxed mb-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Specs Box */}
                        <div className="pt-3 border-t border-choco/5 grid grid-cols-2 gap-2 text-xs font-bold text-mocha">
                          <div className="bg-cream/60 p-2 rounded-xl">
                            <span className="text-[10px] text-mocha/60 block uppercase">Weight</span>
                            <span className="text-choco font-black">{item.weight || '35g'}</span>
                          </div>
                          <div className="bg-cream/60 p-2 rounded-xl truncate">
                            <span className="text-[10px] text-mocha/60 block uppercase">Pack</span>
                            <span className="text-choco font-black truncate block">{item.packaging || 'Box'}</span>
                          </div>
                        </div>

                        {/* Bottom Link */}
                        <div className="mt-3 pt-2">
                          <a
                            href={translatePath(`/product/${item.id}`)}
                            className="text-xs font-bold text-strawberry hover:underline inline-flex items-center gap-1"
                          >
                            <span>{currentLang === 'ar' ? 'عرض المواصفات الفنية' : 'View Full Specs'}</span>
                            <span className="rtl:rotate-180">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* ── BACK COVER / FACTORY DIRECT CONTACT SPREAD ── */}
        <div className="page-break mt-32 bg-white rounded-[3rem] p-8 md:p-16 border border-choco/5 shadow-[0_20px_50px_rgba(61,44,35,0.06)] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left rtl:lg:text-right">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-100 text-amber-800 mb-4 inline-block">
              Yiwu Export Headquarters
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-choco tracking-tight mb-4">
              {currentLang === 'ar' ? 'جاهزون لشحن حاوياتك إلى أي ميناء في العالم' : 'Ready to Ship Containers to Any Global Port'}
            </h2>
            <p className="text-mocha text-base sm:text-lg leading-relaxed font-medium mb-8">
              {currentLang === 'ar'
                ? 'تواصل مع فريق خبراء التصدير في حلويات هولون للحصول على عينات مجانية، قوائم الأسعار الرسمية، وعروض أسعار FOB و CIF المنافسة.'
                : 'Contact our export department for free sample kits, official container FOB pricing, custom mold development, and multi-language retail packaging design.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="tel:+8613967427888"
                className="px-6 py-3.5 rounded-full bg-choco text-white font-bold text-sm hover:scale-105 transition-transform"
              >
                📞 +86 13967427888
              </a>
              <a
                href="mailto:Van001@huluntrade.com"
                className="px-6 py-3.5 rounded-full bg-cream text-choco hover:bg-strawberry hover:text-white font-bold text-sm transition-colors border border-choco/10"
              >
                ✉️ Van001@huluntrade.com
              </a>
            </div>
          </div>

          <div className="w-48 h-48 sm:w-60 sm:h-60 bg-cream/80 rounded-full p-8 flex items-center justify-center filter drop-shadow-xl flex-shrink-0">
            <img src="/logo.png" alt="Hulun Sweets" className="w-full h-full object-contain" />
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
                <span>{selectedCount} {currentLang === 'ar' ? 'أصناف محددة لطلب التسعير' : 'Selected Products for Quote'}</span>
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
                <span>{currentLang === 'ar' ? 'إرسال إلى واتساب' : 'WhatsApp RFQ'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
