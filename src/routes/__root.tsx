import { HeadContent, Scripts, Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { I18nProvider } from '../i18n'
import { ReactLenis } from '@studio-freight/react-lenis'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import appCss from '../index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#009fe3' },
      { name: 'description', content: 'Hulun Sweets — Delicious, Cute & Playful Candies. Fluffy marshmallows, juicy jellies, sweet lollipops, and creative candy toys made to bring smiles and joy to everyone!' },
      { title: 'Hulun Sweets — Delicious, Cute & Playful Candies' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/logo.jpg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Noto+Sans+Arabic:wght@400;500;600&family=Noto+Sans:wght@400;500;600&family=Oswald:wght@400;500;600&family=Poppins:wght@300;400;600;700&family=Quicksand:wght@400;500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss }
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Graceful degradation for mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-cream text-choco font-sans">
        {/* Only enable Lenis on desktop to save battery/performance on mobile */}
        {isMobile ? (
          <I18nProvider>
            <RootLayout>{children}</RootLayout>
          </I18nProvider>
        ) : (
          <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothWheel: true, wheelMultiplier: 1.2, orientation: "vertical", gestureOrientation: "vertical" }}>
            <I18nProvider>
              <RootLayout>{children}</RootLayout>
            </I18nProvider>
          </ReactLenis>
        )}
        
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div className="flex flex-col flex-grow relative w-full">
      <Header />
      <main className="flex-grow w-full z-0">
        <AnimatePresence mode="wait">
          {/* Added will-change-transform for hardware acceleration */}
          <motion.div 
            key={location.pathname} 
            className="will-change-transform" /* GPU Accel */
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.99 }} 
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }} 
            exit={{ opacity: 0, y: -40, filter: 'blur(12px)', scale: 0.99 }} 
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
