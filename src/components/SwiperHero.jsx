import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function SwiperHero() {
  const slides = [
    { id: 1, image: '/images/slider/banner1.png', alt: 'Hulun Trade Banner 1' },
    { id: 2, image: '/images/slider/banner2.png', alt: 'Hulun Trade Banner 2' },
  ];

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide"
              role="img"
              aria-label={slide.alt}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default SwiperHero;
