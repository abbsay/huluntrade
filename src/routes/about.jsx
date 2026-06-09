import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      { title: 'About Us — Hulun Sweets' },
      { name: 'description', content: 'Learn about Hulun Sweets — crafting delicious, cute, and playful candies since 2015. Our mission is to share the joy of sweets with candy lovers of all ages!' },
    ],
  }),
})

function About() {
  const { t } = useI18n();
  return (
    <main id="company" className="fun-page-bg">
      <div className="wave-top"></div>
      
      {/* Playful Floating Decorations */}
      <div className="floating-candy float-1" aria-hidden="true">🎈</div>
      <div className="floating-candy float-2" aria-hidden="true">✨</div>
      <div className="floating-candy float-3" aria-hidden="true">🍬</div>
      <div className="floating-candy float-4" aria-hidden="true">🍭</div>

      <div className="storybook-container">
        <h1 className="products-title bounce-anim fun-title">{t('about.title')}</h1>
        
        <div className="storybook-card">
          <div className="storybook-content">
            <p className="story-text">{t('about.story')}</p>
            <p className="story-closing"><strong>{t('about.closing')} 💖</strong></p>
          </div>
        </div>
      </div>

      <div className="wave-bottom"></div>
    </main>
  );
}
