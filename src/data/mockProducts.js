// Mock Database for Products
// In a real application, this would come from an API backend.

export const mockProducts = [
  // Marshmallow
  {
    id: '35g-marshmallow',
    categoryId: 'marshmallow',
    name: '35g Marshmallow',
    image: '/images/categories/lollipop.png',
    description: 'Soft, fluffy, and delicious 35g marshmallow. Perfect for a sweet treat!',
    features: ['Soft Texture', 'Sweet Flavor', 'Individually Packaged'],
    weight: '35g',
    packaging: 'Standard Bag'
  },
  
  // Jelly
  {
    id: '50g-jelly',
    categoryId: 'jelly',
    name: '50g Jelly',
    image: '/images/categories/jelly.png',
    description: 'Fruity and chewy 50g jelly candy. Bursting with delicious flavors.',
    features: ['Fruity Taste', 'Chewy Texture', 'Fun Snack'],
    weight: '50g',
    packaging: 'Standard Bag'
  },
  {
    id: '48g-jelly',
    categoryId: 'jelly',
    name: '48g Jelly',
    image: '/images/slider/SLIDER-CHAMELEON-POP-kopia.jpg',
    description: 'A classic 48g jelly treat, packed with sweet and vibrant fruit flavors.',
    features: ['Classic Jelly', 'Mixed Fruit', 'Chewy'],
    weight: '48g',
    packaging: 'Standard Bag'
  },
  {
    id: '8g-jelly',
    categoryId: 'jelly',
    name: '8g Jelly',
    image: '/images/logos/logo-3.jpg',
    description: 'Bite-sized 8g jelly candy. A small treat with big flavor!',
    features: ['Bite Sized', 'Convenient Snack', 'Fruit Flavors'],
    weight: '8g',
    packaging: 'Small Pouch'
  },

  // Hard Candy
  {
    id: '35g-bear-candy',
    categoryId: 'hard_candy',
    name: '35g Bear Candy',
    image: '/images/logos/SOUR-CRAZY-ROLL.jpg',
    description: 'Cute bear-shaped hard candy that lasts long and tastes great.',
    features: ['Bear Shape', 'Long-lasting', 'Sweet Taste'],
    weight: '35g',
    packaging: 'Display Box'
  },
  {
    id: '15g-lollipop',
    categoryId: 'hard_candy',
    name: '15g Lollipop',
    image: '/images/slider/MR-SQ-POP-SLIDER.jpg',
    description: 'A classic 15g hard candy lollipop on a stick.',
    features: ['Classic Lollipop', 'Sweet & Fruity', 'On a Stick'],
    weight: '15g',
    packaging: 'Display Box'
  }
];

export const getProductsByCategory = (categoryId) => {
  return mockProducts.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};
