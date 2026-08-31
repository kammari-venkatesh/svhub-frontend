import { images } from './images.js'
import { products } from './products.js'
import { getStorefront } from './storefronts.js'

export const selfCare = getStorefront('self-care')

export const selfCareIntro = {
  eyebrow: 'Self-Care',
  kicker: 'House of Care',
  title: 'Simple Care, Rooted in Nature.',
  copy: 'Handmade herbal soaps inspired by traditional ingredients and everyday care.',
  cta: 'Shop Self-Care',
  ctaHref: '#handmade-soaps',
  image: images.careHero,
  imageAlt: 'Handmade herbal soap bars stacked with dried botanicals',
}

export const selfCareCollectionIntro = {
  eyebrow: 'The Collection',
  title: 'Our Artisan Soaps',
  copy: 'Six bars, each named for the ingredient that shapes it — mixed and cut by hand.',
}

export const selfCareProductIds = [
  'vettiver-soap',
  'kuppaimeni-soap',
  'kasthuri-manjal-soap',
  'sweet-basil-soap',
  'hibiscus-soap',
  'multanimitti-soap',
]

export const selfCareNotes = {
  'vettiver-soap': 'Named for vettiver',
  'kuppaimeni-soap': 'Named for kuppaimeni',
  'kasthuri-manjal-soap': 'Named for kasthuri manjal',
  'sweet-basil-soap': 'Named for sweet basil',
  'hibiscus-soap': 'Named for hibiscus',
  'multanimitti-soap': 'Named for multanimitti',
}

export const selfCareProducts = selfCareProductIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean)

export const selfCareStory = {
  eyebrow: 'The Process',
  title: 'Crafted by hand, as intended.',
  lede: 'These soaps begin with herbs, oils and clays that have long belonged in South Indian homes.',
  copy: 'Each bar is mixed, poured and cut by hand — a small-batch craft meant for everyday washing, not for extravagant promises.',
  cta: 'Learn about our ingredients',
  ctaHref: '#handmade-soaps',
  figure: {
    src: images.carePrep,
    alt: 'Wooden spoons of turmeric and herbal powders used in traditional care',
  },
  cardTitle: 'Made by hand',
  cardCopy: 'Every bar is prepared slowly, in small quantities, without industrial shortcuts.',
}

export const selfCareClose = {
  eyebrow: 'House of Care',
  headline: 'Explore Handmade Care',
  copy: 'Choose a bar named for its ingredient, and bring a little handmade care into the rhythm of your day.',
  cta: 'Shop Self-Care',
  ctaHref: '#handmade-soaps',
}
