import { getCategoriesByStorefront } from './categories.js'
import { whyItems } from './home.js'
import { images } from './images.js'
import { products } from './products.js'
import { getStorefront } from './storefronts.js'
import { testimonials, testimonialsIntro } from './testimonials.js'

export const nutriHub = getStorefront('nutri-hub')

export const nutriHubIntro = {
  eyebrow: 'House of Food',
  kicker: 'Nutri-Hub',
  title: 'Rooted in Tradition, Made for Every Day.',
  copy: 'Organic staples, native grains, authentic masalas, traditional pickles, sweets, savouries and wholesome daily meals.',
  cta: 'Shop Nutri-Hub',
  ctaTo: '/shop?house=nutri-hub',
  image: images.farmland,
  imageAlt: 'A colourful South Indian paddy field',
}

export const nutriHubStills = [
  { src: images.rice, alt: 'Native rice in a traditional brass vessel', label: 'Native rice' },
  { src: images.farmland, alt: 'Rice fields', label: 'Rice fields' },
  { src: images.ingredients, alt: 'Traditional masalas and spices', label: 'Masalas' },
  { src: images.pickles, alt: 'Traditional pickles', label: 'Pickles' },
  { src: images.cooking, alt: 'Home cooking on a banana leaf', label: 'Home cooking' },
]

export const nutriHubCategoryTitles = {
  'native-rice': 'Organic Staples & Native Rice',
  pickles: 'Pickles / Thokku',
  masalas: 'Masalas & Seasonings',
  sweets: 'Traditional Sweets',
  savouries: 'Savouries',
  'daily-meals': 'Wholesome Daily Meals',
}

export const nutriHubCategoryIntro = {
  eyebrow: 'Shop the House',
  title: 'From the grain to the table.',
  copy: 'Six everyday kitchens of Nutri-Hub — native rice, small-batch thokku, regional masalas, sweets, savouries and wholesome meals.',
}

export const nutriHubFeaturedIntro = {
  eyebrow: 'From the Kitchen',
  title: 'Staples for every day.',
  copy: 'A few of our most-loved grains, thokku and masalas — made for modern homes, rooted in traditional ingredients.',
}

const featuredIds = [
  'kullakar-rice',
  'karuppu-kavuni-rice',
  'mappillai-samba-rice',
  'venthaya-thokku',
  'tomato-thokku',
  'karuveppilai-thokku',
  'garam-masala',
  'chat-masala',
]

export const nutriHubFeatured = featuredIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean)

export const nutriHubCategories = getCategoriesByStorefront('nutri-hub').map((category) => ({
  ...category,
  displayName: nutriHubCategoryTitles[category.slug] ?? category.name,
}))

export const nutriHubStory = {
  eyebrow: 'From Farm to Home',
  title: 'Grown with care. Meant for the kitchen.',
  copy: 'From indigenous grains to traditional recipes, Nutri-Hub brings the goodness of our roots into modern homes — grown with care, made by hand, and meant for everyday tables.',
  principles: [
    {
      number: '01',
      title: 'Native grains',
      copy: 'Indigenous rice and staples grown with patience, not fashion.',
    },
    {
      number: '02',
      title: 'Traditional methods',
      copy: 'Thokku, masalas and meals made the way our kitchens remember them.',
    },
    {
      number: '03',
      title: 'Everyday tables',
      copy: 'Honest food for daily cooking — pure, traditional, and close to home.',
    },
  ],
  figures: [
    { src: images.farmer, alt: 'A farmer gathering harvested paddy in a rural field' },
    { src: images.rice, alt: 'Native rice grains in a traditional brass vessel' },
    { src: images.cooking, alt: 'A traditional South Indian meal served at home' },
  ],
}

export const nutriHubGrain = {
  eyebrow: 'From Farm to Home',
  title: 'From the grain to the table.',
  copy: nutriHubStory.copy,
  frames: [
    {
      src: images.rice,
      alt: 'Native rice grains in a traditional brass vessel',
      label: '01 / Native grains',
      role: 'lead',
    },
    {
      src: images.pickles,
      alt: 'Traditional pickles',
      label: '02 / Traditional methods',
      role: 'pickle',
    },
    {
      src: images.ingredients,
      alt: 'South Indian spices, turmeric, mustard and dried chillies',
      label: 'Masalas',
      role: 'spice',
    },
    {
      src: images.cooking,
      alt: 'A traditional South Indian meal served at home',
      label: 'Everyday table',
      role: 'table',
    },
  ],
}

export const nutriHubManifesto = {
  eyebrow: nutriHub.kicker,
  title: 'Traditional Goodness',
  copy: nutriHub.copy,
  watermark: 'Goodness',
  items: [
    whyItems[0],
    whyItems[1],
    whyItems[2],
    {
      number: '04',
      title: nutriHubStory.principles[2].title,
      copy: nutriHubStory.principles[2].copy,
    },
  ],
}

export const nutriHubStories = {
  eyebrow: testimonialsIntro.eyebrow,
  title: testimonialsIntro.title,
  copy: testimonialsIntro.copy,
  disclaimer: testimonialsIntro.disclaimer,
  items: testimonials.filter((item) => item.id !== 3),
}

export const nutriHubClose = {
  eyebrow: 'Taste of Tradition',
  headline: 'Bring Native Goodness Home',
  copy: 'Explore organic staples, native grains and traditional recipes — gathered in one house.',
  cta: nutriHubIntro.cta,
  ctaTo: '/shop?house=nutri-hub',
  secondary: { label: 'Our Story', to: '/about' },
  image: images.rice,
}
