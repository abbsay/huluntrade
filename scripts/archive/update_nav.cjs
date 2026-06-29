const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, 'src', 'routes', '__root.tsx');
let rootContent = fs.readFileSync(rootPath, 'utf8');

// 1. Add lucide imports
if(!rootContent.includes('lucide-react')) {
  rootContent = rootContent.replace(
    "import appCss from '../index.css?url'",
    "import appCss from '../index.css?url'\nimport { Home, Candy, Heart, Send } from 'lucide-react'"
  );
}

// 2. Change NavItems definition
rootContent = rootContent.replace(
  /const navItems = \[\s*\{ id: 'home',[\s\S]*?\];/g,
  `const navItems = [
    { id: 'home',        path: '/',        label: t('nav.home',     'Home'),    icon: Home },
    { id: 'products',    path: '/products', label: t('nav.products', 'Products'), icon: Candy },
    { id: 'about',       path: '/about',    label: t('nav.about',   'About us'), icon: Heart },
    { id: 'contact-nav', path: '/contact',  label: t('nav.contact', 'Contact'),  icon: Send },
  ];`
);

// 3. Change Desktop Nav rendering
const oldNavRegex = /<nav className="hidden lg:flex flex-1 items-center justify-center">[\s\S]*?<\/nav>/;
const newNav = `<nav className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-50/70 px-4 py-2 rounded-[2rem] border border-gray-100/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.id} className="relative z-10 w-24">
                    <Link to={item.path} className="block group w-full">
                      <motion.div
                        className="flex flex-col items-center justify-center py-2.5 cursor-pointer select-none relative z-10"
                        initial="initial"
                        whileHover="hover"
                        whileTap={{ scale: 0.92 }}
                      >
                        <motion.div
                          variants={{
                            initial: { y: 0, scale: 1 },
                            hover: { y: -6, scale: 1.15, rotate: item.id === 'home' ? 0 : item.id === 'products' ? 12 : item.id === 'about' ? -10 : -15 }
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          className={\`mb-1 transition-colors duration-300 \${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-pink-500'}\`}
                        >
                          <Icon strokeWidth={isActive ? 2.5 : 1.5} className="w-7 h-7 drop-shadow-sm" />
                        </motion.div>
                        
                        <span className={\`text-[11px] font-black uppercase tracking-widest transition-colors duration-300 \${isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-800'}\`}>
                          {item.label}
                        </span>
                      </motion.div>
                      
                      {/* Magical Active Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-200/50 z-0"
                          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>`;
rootContent = rootContent.replace(oldNavRegex, newNav);

// 4. Update the header height from h-16 to h-[6.5rem] to accommodate taller icons properly
rootContent = rootContent.replace(
  /<div className="flex items-center justify-between h-16">/g,
  `<div className="flex items-center justify-between h-[5.5rem] lg:h-[6rem]">`
);

// 5. Update content padding to match taller header
rootContent = rootContent.replace(
  /<main className="flex-grow w-full z-0 pt-20">/g,
  `<main className="flex-grow w-full z-0 pt-32 lg:pt-36">`
);

// 6. Fix mobile icon rendering since they are components now
const mobileLinkOld = /<span className="text-2xl bg-white\/20 p-2 rounded-xl backdrop-blur-sm">\{item\.icon\}<\/span>/g;
rootContent = rootContent.replace(mobileLinkOld, `<span className="bg-white/20 p-2 text-current rounded-xl backdrop-blur-sm shadow-sm border border-black/5"><item.icon className="w-6 h-6" strokeWidth={2} /></span>`);

fs.writeFileSync(rootPath, rootContent);
console.log('✅ Advanced Nav Updated Successfully');
