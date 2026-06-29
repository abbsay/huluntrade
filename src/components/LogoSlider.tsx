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
    <div className="py-12 bg-transparent overflow-hidden border-none">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-cream before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-cream after:to-transparent">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={3500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            // Smooth continuous ticker effect
          }}
          slidesPerView={1.8}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 3.2, spaceBetween: 24 },
            768: { slidesPerView: 4.5, spaceBetween: 32 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
          }}
          allowTouchMove={false}
          className="w-full !transition-timing-linear"
        >
          {LOGO_FILES.map((file, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-300 hover:scale-105 transform cursor-default">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[1.5rem] bg-white/40 backdrop-blur-sm flex justify-center items-center p-3 sm:p-5 shadow-sm border border-choco/5 mix-blend-normal hover:bg-white transition-colors duration-500">
                <img 
                  src={`/images/logos/${file}`} 
                  alt={`Partner Brand ${idx + 1}`} 
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add a tiny CSS override exclusively for this linear ticker animation */}
      <style>{`
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}

export default LogoSlider;
