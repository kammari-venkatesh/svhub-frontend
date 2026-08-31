import { images } from './images.js'

export const categories = [
  {
    id: 'native-rice',
    name: 'Native Rice',
    slug: 'native-rice',
    storefront: 'nutri-hub',
    image: images.nativeRice,
    description: 'Indigenous grains grown with care for everyday pots of rice, kanji and festive meals.',
    to: '/category/native-rice',
  },
  {
    id: 'pickles',
    name: 'Pickles & Thokku',
    slug: 'pickles',
    storefront: 'nutri-hub',
    image: images.pickles,
    description: 'Small-batch thokku and pickles made the way they belong on a South Indian table.',
    to: '/category/pickles',
  },
  {
    id: 'masalas',
    name: 'Masalas & Seasonings',
    slug: 'masalas',
    storefront: 'nutri-hub',
    image: images.masalas,
    description: 'Regional masalas and seasonings measured for home cooking, not restaurant theatrics.',
    to: '/category/masalas',
  },
  {
    id: 'sweets',
    name: 'Traditional Sweets',
    slug: 'sweets',
    storefront: 'nutri-hub',
    image: images.sweets,
    description: 'Time-honoured sweets made in small batches with native ingredients.',
    to: '/category/sweets',
  },
  {
    id: 'savouries',
    name: 'Savouries',
    slug: 'savouries',
    storefront: 'nutri-hub',
    image: images.savouries,
    description: 'Crisp, homemade-style snacks for tea-time and everyday sharing.',
    to: '/category/savouries',
  },
  {
    id: 'daily-meals',
    name: 'Daily Meals',
    slug: 'daily-meals',
    storefront: 'nutri-hub',
    image: images.meals,
    description: 'Wholesome prepared meals rooted in South Indian kitchens.',
    to: '/category/daily-meals',
  },
  {
    id: 'handmade-soaps',
    name: 'Handmade Soaps',
    slug: 'handmade-soaps',
    storefront: 'self-care',
    image: images.handmadeSoaps,
    description: 'Herbal soaps made by hand with traditional ingredients for everyday care.',
    to: '/category/handmade-soaps',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getCategoriesByStorefront(slug) {
  return categories.filter((category) => category.storefront === slug)
}
