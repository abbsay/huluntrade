import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const LOGO_FILES = [
  'SOUR-CRAZY-ROLL.jpg',
  'SPINER-CANDY-LOGO.jpg',
  'boom-spray-LOGO.jpg',
  'dr.-lab-minic-andy.jpg',
  'logo-2.jpg',
  'logo-3.jpg',
  'logo-4.jpg',
  'logo-5.jpg',
  'logo-7.jpg',
  'logo-9.jpg',
  'logo-10.jpg',
  'logo-11.jpg',
  'logo-12.jpg',
  'logo-13.jpg',
  'logo-14.jpg'
];

function LogoSlider() {
  return (
    <div className="logo-slider-container">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 5, spaceBetween: 30 },
          1024: { slidesPerView: 7, spaceBetween: 40 },
        }}
        allowTouchMove={false}
        className="logo-swiper"
      >
        {LOGO_FILES.map((file, idx) => (
          <SwiperSlide key={idx} className="logo-item">
            <img src={`/images/logos/${file}`} alt={`Partner Brand ${idx + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LogoSlider;
