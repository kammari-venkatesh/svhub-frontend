import { images } from './images.js'

export const categories = [
  {
    id: 'native-rice',
    name: 'Native Rice',
    slug: 'native-rice',
    storefront: 'nutri-hub',
    image: images.nativeRice,
    description: 'Indigenous grains grown with care for everyday meals.',
    to: '/category/native-rice',
  },
  {
    id: 'pickles',
    name: 'Pickles & Thokku',
    slug: 'pickles',
    storefront: 'nutri-hub',
    image: images.pickles,
    description: 'Traditional thokku and pickles made in small batches.',
    to: '/category/pickles',
  },
  {
    id: 'masalas',
    name: 'Masalas & Seasonings',
    slug: 'masalas',
    storefront: 'nutri-hub',
    image: images.masalas,
    description: 'Regional masalas and seasonings for home cooking.',
    to: '/category/masalas',
  },
  {
    id: 'sweets',
    name: 'Traditional Sweets',
    slug: 'sweets',
    storefront: 'nutri-hub',
    image: images.sweets,
    description: 'Time-honoured sweets made with native ingredients.',
    to: '/category/sweets',
  },
  {
    id: 'savouries',
    name: 'Savouries',
    slug: 'savouries',
    storefront: 'nutri-hub',
    image: images.savouries,
    description: 'Crisp, homemade-style snacks for everyday sharing.',
    to: '/category/savouries',
  },
  {
    id: 'daily-meals',
    name: 'Daily Meals',
    slug: 'daily-meals',
    storefront: 'nutri-hub',
    image: images.meals,
    description: 'Wholesome meals rooted in South Indian kitchens.',
    to: '/category/daily-meals',
  },
  {
    id: 'handmade-soaps',
    name: 'Handmade Soaps',
    slug: 'handmade-soaps',
    storefront: 'self-care',
    image: images.handmadeSoaps,
    description: 'Herbal soaps made by hand with traditional ingredients.',
    to: '/category/handmade-soaps',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getCategoriesByStorefront(slug) {
  return categories.filter((category) => category.storefront === slug)
}
