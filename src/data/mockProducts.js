// Mock Database for Products
// In a real application, this would come from an API backend.

export const mockProducts = [
  // Lollipops
  {
    id: 'spiner-candy',
    categoryId: 'lollipop',
    name: 'Spiner Candy Lollipop',
    image: '/images/logos/SPINER-CANDY-LOGO.jpg',
    description: 'A fun, spinning lollipop that brings joy to every bite! Features a colorful swirly design and a sweet strawberry flavor.',
    features: ['Fruit Flavored', 'Interactive Spinner', 'Individually Wrapped'],
    weight: '15g per piece',
    packaging: 'Display Box (24 pieces)'
  },
  {
    id: 'rainbow-swirl',
    categoryId: 'lollipop',
    name: 'Rainbow Swirl Pop',
    image: '/images/categories/lollipop.png',
    description: 'The classic giant rainbow swirl lollipop. Perfect for parties and gifts!',
    features: ['Mixed Fruit Flavor', 'Giant Size', 'Vibrant Colors'],
    weight: '50g per piece',
    packaging: 'Display Box (12 pieces)'
  },
  
  // Sprays
  {
    id: 'mr-sq-pop',
    categoryId: 'sprays',
    name: 'Mr. SQ POP Spray',
    image: '/images/slider/MR-SQ-POP-SLIDER.jpg',
    description: 'A sour and sweet liquid candy spray that delivers a blast of flavor! Kids love the fun spray bottle.',
    features: ['Sour Apple & Blue Raspberry', 'Liquid Candy', 'Fun Spray Action'],
    weight: '20ml',
    packaging: 'Display Box (30 pieces)'
  },
  {
    id: 'boom-spray',
    categoryId: 'sprays',
    name: 'Boom Spray Liquid Candy',
    image: '/images/logos/boom-spray-LOGO.jpg',
    description: 'Explosive sour flavor in every spray! The ultimate treat for thrill-seekers.',
    features: ['Extreme Sour', 'Pocket Sized', 'Liquid Candy'],
    weight: '15ml',
    packaging: 'Display Box (36 pieces)'
  },

  // Chocolate
  {
    id: 'alien-car-chocolate',
    categoryId: 'chocolate',
    name: 'Alien Car Chocolate Surprise',
    image: '/images/slider/ALIEN-CAR-SLIDER.jpg',
    description: 'Delicious milk chocolate shaped like a fun alien car. Comes with a hidden candy surprise inside!',
    features: ['Rich Milk Chocolate', 'Toy Surprise Included', 'Fun Shape'],
    weight: '30g',
    packaging: 'Display Box (24 pieces)'
  },

  // Hard Candy
  {
    id: 'sour-crazy-roll',
    categoryId: 'hard_candy',
    name: 'Sour Crazy Roll',
    image: '/images/logos/SOUR-CRAZY-ROLL.jpg',
    description: 'A continuous roll of sweet and sour hard candy. Unroll the fun!',
    features: ['Sweet & Sour', 'Interactive Dispenser', 'Long-lasting'],
    weight: '25g',
    packaging: 'Display Box (24 pieces)'
  },

  // Jelly
  {
    id: 'chameleon-pop-jelly',
    categoryId: 'jelly',
    name: 'Chameleon Pop Jelly Bean',
    image: '/images/slider/SLIDER-CHAMELEON-POP-kopia.jpg',
    description: 'Chewy, fruity jelly candies that magically change color on your tongue!',
    features: ['Color Changing', 'Chewy Texture', 'Mixed Berry Flavor'],
    weight: '40g',
    packaging: 'Display Box (18 pieces)'
  },

  // Squeeze Gel
  {
    id: 'happy-tools-gel',
    categoryId: 'squeeze_gel',
    name: 'Happy Tools Squeeze Gel',
    image: '/images/slider/SLIDER-HAPPY-TOOLS.jpg',
    description: 'Squeeze out the fun with this gel candy! Shaped like fun builder tools.',
    features: ['Gel Candy', 'Tool Shapes', 'Strawberry & Apple'],
    weight: '35g',
    packaging: 'Display Box (24 pieces)'
  },

  // Roll On
  {
    id: 'jb-slider-roll-on',
    categoryId: 'roll_on',
    name: 'JB Slider Roll-On Candy',
    image: '/images/slider/JB-SLIDER.jpg',
    description: 'Roll it on your tongue for a burst of liquid candy flavor!',
    features: ['Roll-on Applicator', 'Liquid Candy', 'Sour Cherry'],
    weight: '20ml',
    packaging: 'Display Box (24 pieces)'
  }
];

export const getProductsByCategory = (categoryId) => {
  return mockProducts.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};
