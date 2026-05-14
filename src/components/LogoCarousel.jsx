import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const LOGOS = [
  '/images/logos/logo-13.jpg',
  '/images/logos/logo-14.jpg',
  '/images/logos/boom-spray-LOGO.jpg',
  '/images/logos/SPINER-CANDY-LOGO.jpg',
  '/images/logos/SOUR-CRAZY-ROLL.jpg',
  '/images/logos/logo-2.jpg',
  '/images/logos/logo-3.jpg',
  '/images/logos/logo-4.jpg',
  '/images/logos/logo-5.jpg',
  '/images/logos/logo-7.jpg',
  '/images/logos/dr.-lab-minic-andy.jpg',
  '/images/logos/logo-9.jpg',
  '/images/logos/logo-10.jpg',
  '/images/logos/logo-11.jpg',
  '/images/logos/logo-12.jpg',
];

function LogoCarousel() {
  return (
    <section id="logo-slider" aria-label="Brand partners">
      <Swiper
        modules={[Autoplay]}
        className="logo-swiper"
        loop={true}
        speed={4000}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove={true}
        spaceBetween={0}
        breakpoints={{
          0:    { slidesPerView: 2 },
          480:  { slidesPerView: 3 },
          768:  { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {LOGOS.map((src, i) => (
          <SwiperSlide key={i} className="logo-item">
            <img src={src} alt={`Brand ${i + 1}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default LogoCarousel;
