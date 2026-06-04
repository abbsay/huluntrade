import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {
  const { t } = useI18n();
  return (
    <main id="company" className="fun-page-bg">
      <div className="wave-top"></div>
      
      {/* Playful Floating Decorations */}
      <div className="floating-candy float-1">🎈</div>
      <div className="floating-candy float-2">✨</div>
      <div className="floating-candy float-3">🍬</div>
      <div className="floating-candy float-4">🍭</div>

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
