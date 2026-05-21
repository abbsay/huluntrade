// Mock Database for Products
// In a real application, this would come from an API backend.

export const mockProducts = [
  // 1. News
  {
    id: 'mini-spinner-pop',
    categoryId: 'news',
    name: 'Mini Spinner Pop',
    image: '/images/categories/news.png',
    description: 'A super fun, rotating lollipop that spins as you lick! Comes in fruity strawberry and blue raspberry flavors.',
    features: ['Spinning Handle', 'Strawberry & Blue Raspberry', 'Interactive Toy'],
    weight: '25g',
    packaging: 'Display Box (12 pcs)'
  },
  {
    id: 'double-dipper-popping',
    categoryId: 'news',
    name: 'Double Dipper Popping Powder',
    image: '/images/categories/news.png',
    description: 'Dip your sweet lollipop into the electric popping candy powder and watch it crackle on your tongue!',
    features: ['Popping Sensation', 'Double Flavor Hook', 'Crackly Fun'],
    weight: '30g',
    packaging: 'Individual Sachet'
  },

  // 2. Lollipop
  {
    id: '15g-lollipop',
    categoryId: 'lollipop',
    name: 'Neon Laser Pop',
    image: '/images/categories/lollipop.png',
    description: 'A classic 15g hard candy lollipop with a flashing LED handle! Light up the night while enjoying a sweet cherry flavor.',
    features: ['Flashing LED Light', 'Cherry Flavor', 'On a Stick'],
    weight: '15g',
    packaging: 'Display Box (24 pcs)'
  },
  {
    id: 'fluffy-cloud-marshmallow-pop',
    categoryId: 'lollipop',
    name: 'Fluffy Cloud Pop',
    image: '/images/categories/lollipop.png',
    description: 'A sweet, fluffy marshmallow lollipop shaped like a happy cloud, dipped in bright rainbow sprinkles.',
    features: ['Super Soft Marshmallow', 'Rainbow Sprinkles', 'Sweet Vanilla Accent'],
    weight: '40g',
    packaging: 'Individually Wrapped'
  },

  // 3. Dip & Lick
  {
    id: 'foot-dip-lick',
    categoryId: 'dip_lick',
    name: 'Sweet Foot Dip & Lick',
    image: '/images/categories/dip_lick.png',
    description: 'A classic foot-shaped lollipop with sour popping powder. Fun, tangy, and absolutely delicious!',
    features: ['Foot-shaped Lollipop', 'Sour Dip Powder', 'Tangy & Sweet'],
    weight: '35g',
    packaging: 'Individual Sachet (18 pcs)'
  },
  {
    id: 'magic-wand-dip',
    categoryId: 'dip_lick',
    name: 'Magic Wand Dip & Glow',
    image: '/images/categories/dip_lick.png',
    description: 'A magical star-shaped lollipop with glittery, glowing dipping sugar powder.',
    features: ['Star Shape', 'Glittery Dipping Sugar', 'Fruit Blast Flavors'],
    weight: '32g',
    packaging: 'Shining Sachet'
  },

  // 4. Bubble Gum
  {
    id: 'bubble-gum-tape',
    categoryId: 'bubble_gum',
    name: 'Giant Bubble Gum Tape',
    image: '/images/categories/bubble_gum.png',
    description: 'Six feet of sweet, juicy bubble gum rolled up in a cool plastic dispenser. Bubble blowing champion\'s choice!',
    features: ['6 Feet Long', 'Juicy Fruit Flavor', 'Handy Dispenser'],
    weight: '56g',
    packaging: 'Plastic Roll Case'
  },
  {
    id: 'tattoo-bubble-gum',
    categoryId: 'bubble_gum',
    name: 'Tattoo Bubble Gum',
    image: '/images/categories/bubble_gum.png',
    description: 'Individually wrapped bubble gum with cool temporary tattoos inside. Collect them all!',
    features: ['Bubble Blowing Gum', 'Fun Temporary Tattoos', 'Assorted Fruity Flavors'],
    weight: '5g',
    packaging: 'Wrap (100 pcs)'
  },

  // 5. Sprays
  {
    id: 'sour-blast-spray',
    categoryId: 'sprays',
    name: 'Sour Blast Candy Spray',
    image: '/images/categories/sprays.png',
    description: 'A liquid candy spray that packs a super sour punch! Spray on your tongue for an instant flavor explosion.',
    features: ['Super Sour Liquid', 'Pocket Sized Spray', 'Apple & Blueberry flavors'],
    weight: '25ml',
    packaging: 'Spray Bottle'
  },
  {
    id: 'fruity-mist-spray',
    categoryId: 'sprays',
    name: 'Fruity Mist Spray',
    image: '/images/categories/sprays.png',
    description: 'A sweet and refreshing liquid candy spray in delicious green apple and blueberry flavors.',
    features: ['Sweet Liquid Mist', 'Double-headed Option', 'Mild and Fruity'],
    weight: '30ml',
    packaging: 'Display Box (24 pcs)'
  },

  // 6. Roll-On
  {
    id: 'crazy-roll-on',
    categoryId: 'roll_on',
    name: 'Crazy Roll-On Liquid Candy',
    image: '/images/categories/roll_on.png',
    description: 'Roll it on your tongue! A fun, roller-ball bottle filled with juicy, sweet strawberry liquid candy.',
    features: ['Roller-ball Tip', 'Thick Strawberry Liquid', 'No Spills Design'],
    weight: '40g',
    packaging: 'Roller Bottle'
  },
  {
    id: 'sour-roller',
    categoryId: 'roll_on',
    name: 'Super Sour Roller',
    image: '/images/categories/roll_on.png',
    description: 'A sour liquid candy roller that delivers a tangy burst of flavor in a roll-on bottle.',
    features: ['Roller Ball', 'Super Sour Zest', 'Cola and Apple flavors'],
    weight: '40g',
    packaging: 'Display Box (18 pcs)'
  },

  // 7. Squeeze Gel
  {
    id: 'monster-squeeze-gel',
    categoryId: 'squeeze_gel',
    name: 'Monster Squeeze Candy Gel',
    image: '/images/categories/squeeze_gel.png',
    description: 'Squeeze the tube to enjoy delicious, thick candy gel in grape and blue raspberry flavors.',
    features: ['Toothpaste-style Tube', 'Thick Candy Gel', 'Intense Fruity Flavor'],
    weight: '50g',
    packaging: 'Squeeze Tube'
  },
  {
    id: 'paint-brush-gel',
    categoryId: 'squeeze_gel',
    name: 'Paint Brush Gel Tube',
    image: '/images/categories/squeeze_gel.png',
    description: 'Paint your tongue with sweet, colorful candy gel. Comes with a fun paintbrush tip!',
    features: ['Paintbrush Tip', 'Colorful Food Gel', 'Interactive Toy Style'],
    weight: '45g',
    packaging: 'Plastic Tube with Brush'
  },

  // 8. Powder Candy
  {
    id: 'popping-magic-powder',
    categoryId: 'powder_candy',
    name: 'Popping Magic Powder',
    image: '/images/categories/powder_candy.png',
    description: 'Fun, crackling popping candy powder that fizzles and pops when it touches your tongue.',
    features: ['Intense Fizzing', 'Assorted Flavors', 'Popular Party Favor'],
    weight: '12g',
    packaging: 'Individual Packet (50 pcs)'
  },
  {
    id: 'sour-powder-straws',
    categoryId: 'powder_candy',
    name: 'Sour Powder Straws',
    image: '/images/categories/powder_candy.png',
    description: 'Fruity straws filled with sweet and tangy powder. Pour it in and enjoy the zing!',
    features: ['Tangy Powdery Center', 'Giant Straw Lengths', 'Fruity Flavors'],
    weight: '20g',
    packaging: 'Display Bag'
  },

  // 9. Licore
  {
    id: 'rainbow-licorice-wheels',
    categoryId: 'licore',
    name: 'Rainbow Licorice Wheels',
    image: '/images/categories/jelly.png',
    description: 'Colorful, coiled licorice laces that you can unroll and chew. Fun fruit flavors!',
    features: ['Coiled Roll-out Design', 'Multicolor Gummy Laces', 'Strawberry & Apple Base'],
    weight: '60g',
    packaging: 'Individual Wrap'
  },
  {
    id: 'sour-apple-belts',
    categoryId: 'licore',
    name: 'Sour Apple Licorice Belts',
    image: '/images/categories/jelly.png',
    description: 'Long, sugary licorice ribbons coated in extra sour green apple powder.',
    features: ['Flat Gummy Ribbon', 'Coated in Sour Sugar', 'Zesty Green Apple'],
    weight: '50g',
    packaging: 'Flat Pouch'
  },

  // 10. Chocolate
  {
    id: 'surprise-chocolate-egg',
    categoryId: 'chocolate',
    name: 'Surprise Chocolate Egg',
    image: '/images/categories/chocolate.png',
    description: 'A delicious milk chocolate egg with a fun, collectable toy surprise hidden inside!',
    features: ['Milk & White Chocolate Layer', 'Toy Capsule Inside', 'Collectible Series'],
    weight: '20g',
    packaging: 'Foil Wrapped (24 pcs)'
  },
  {
    id: 'choco-banana-pops',
    categoryId: 'chocolate',
    name: 'Choco Banana Pops',
    image: '/images/categories/chocolate.png',
    description: 'Banana-flavored sweet candy dipped in a rich, creamy chocolate coating on a stick.',
    features: ['Banana Candy Center', 'Chocolate Glaze Coating', 'Lollipop Style'],
    weight: '30g',
    packaging: 'Display Box (12 pcs)'
  },

  // 11. Candies
  {
    id: 'rainbow-drops',
    categoryId: 'candies',
    name: 'Sparkling Rainbow Drops',
    image: '/images/categories/hard_candy.png',
    description: 'Fruit-flavored hard candy drops with a sparkling sugar dust coating. Colorful and sweet.',
    features: ['Fruity Drops', 'Sparkling Candy Dust', 'Long-lasting Flavor'],
    weight: '45g',
    packaging: 'Tin Box'
  },
  {
    id: 'mini-fruit-candy-box',
    categoryId: 'candies',
    name: 'Mini Fruit Candy Box',
    image: '/images/categories/hard_candy.png',
    description: 'A cute pocket-sized box filled with tiny, crunchy fruit-shaped hard candies.',
    features: ['Cute Pocket Tin', 'Crunchy Hard Bites', 'Mini Fruits Shapes'],
    weight: '25g',
    packaging: 'Slide Top Metal Tin'
  },

  // 12. Other
  {
    id: '35g-marshmallow',
    categoryId: 'other',
    name: '35g Marshmallow Sweet Twist',
    image: '/images/categories/other.png',
    description: 'Soft, fluffy, and delicious marshmallow twist. Perfect for hot cocoa or a sweet snack!',
    features: ['Soft Fluffy Texture', 'Pastel Twists', 'Individually Packaged'],
    weight: '35g',
    packaging: 'Standard Bag'
  },
  {
    id: 'surprise-toy-candy-cup',
    categoryId: 'other',
    name: 'Surprise Toy Candy Cup',
    image: '/images/categories/other.png',
    description: 'A cute plastic cup containing mixed sweet candies and a surprise toy inside!',
    features: ['Candy Assortment', 'Random Surprise Toy', 'Reusable Plastic Cup'],
    weight: '80g',
    packaging: 'Covered Cup'
  }
];

export const getProductsByCategory = (categoryId) => {
  return mockProducts.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};
