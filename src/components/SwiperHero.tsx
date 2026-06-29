import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
      duration: 0.6,
    },
  },
};

function SwiperHero() {
  const slides = [
    { id: 1, image: '/images/slider/banner1.svg', alt: 'Hulun Sweets Delicious Candies Banner' },
    { id: 2, image: '/images/slider/banner2.svg', alt: 'Hulun Sweets Fun Shapes & Tasty Candy Banner' },
  ];

  return (
    <motion.section
      className="hero"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        style={{ borderRadius: '1rem', overflow: 'hidden' }}
      >
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
              <motion.div
                className="hero-slide"
                role="img"
                aria-label={slide.alt}
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, duration: 0.7 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.section>
  );
}

export default SwiperHero;
