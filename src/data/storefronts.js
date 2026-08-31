import { images } from './images.js'

export const storefronts = [
  {
    id: 'nutri-hub',
    slug: 'nutri-hub',
    name: 'Nutri-Hub',
    kicker: 'House of Food',
    accent: '#532F1A',
    accentToken: 'espresso',
    copy: 'Organic food and traditional goodness for everyday living.',
    cta: 'Explore Nutri-Hub',
    to: '/nutri-hub',
    image: images.nutriHub,
    imageAlt: 'Native South Indian rice in a traditional brass vessel',
    categorySlugs: ['native-rice', 'pickles', 'masalas', 'sweets', 'savouries', 'daily-meals'],
    extraLabels: [],
  },
  {
    id: 'self-care',
    slug: 'self-care',
    name: 'Self-Care',
    kicker: 'House of Care',
    accent: '#AA5733',
    accentToken: 'terracotta',
    copy: 'Handmade natural care rooted in traditional ingredients.',
    cta: 'Explore Self-Care',
    to: '/self-care',
    image: images.selfCare,
    imageAlt: 'Handmade herbal soap bars stacked on marble',
    categorySlugs: ['handmade-soaps'],
    extraLabels: ['Herbal Ingredients', 'Natural Care'],
  },
]

export function getStorefront(slug) {
  return storefronts.find((house) => house.slug === slug)
}
