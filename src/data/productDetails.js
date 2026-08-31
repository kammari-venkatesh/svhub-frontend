import { images } from './images.js'
import { getCategoryBySlug } from './categories.js'
import { getProductBySlug, getRelatedProducts, products } from './products.js'
import { getStorefront } from './storefronts.js'

const RECENT_KEY = 'svhub.recentlyViewed'
const RECENT_LIMIT = 8

export const defaultShipping = {
  summary: 'Packed and sent from Coimbatore, Tamil Nadu.',
  notes: [
    'Most orders leave within 2–4 working days.',
    'Delivery times vary by location.',
    'Free shipping on orders above ₹499.',
    'Please see our shipping policy for full details.',
  ],
}

function gallery(hero, extras, name) {
  const seen = new Set()
  return [{ src: hero, alt: `${name}` }, ...extras].filter((item) => {
    if (!item?.src || seen.has(item.src)) return false
    seen.add(item.src)
    return true
  })
}

function riceGallery(product) {
  return gallery(product.image, [
    { src: images.rice, alt: 'Native rice in a traditional brass vessel' },
    { src: images.farmland, alt: 'A colourful South Indian paddy field' },
    { src: images.cooking, alt: 'Home cooking served on a banana leaf' },
  ], product.name)
}

function pickleGallery(product) {
  return gallery(product.image, [
    { src: images.pickles, alt: 'Traditional pickle jars' },
    { src: images.cooking, alt: 'A South Indian meal on a banana leaf' },
    { src: images.ingredients, alt: 'Spices used in traditional kitchens' },
  ], product.name)
}

function masalaGallery(product) {
  return gallery(product.image, [
    { src: images.masalas, alt: 'Ground masalas and whole spices' },
    { src: images.ingredients, alt: 'Spices for everyday cooking' },
    { src: images.cooking, alt: 'Home cooking on a banana leaf' },
  ], product.name)
}

function soapGallery(product) {
  return gallery(product.image, [
    { src: images.handmadeSoaps, alt: 'Handmade soap bars' },
    { src: images.herbs, alt: 'Fresh herbs used in traditional care' },
    { src: images.carePrep, alt: 'Botanical ingredients prepared by hand' },
  ], product.name)
}

function sweetGallery(product) {
  return gallery(product.image, [
    { src: images.sweets, alt: 'Traditional sweets' },
    { src: images.cooking, alt: 'A festive South Indian meal' },
    { src: images.ingredients, alt: 'Jaggery and kitchen spices' },
  ], product.name)
}

function savouryGallery(product) {
  return gallery(product.image, [
    { src: images.savouries, alt: 'Homemade-style savouries' },
    { src: images.cooking, alt: 'Snacks for sharing at the table' },
    { src: images.ingredients, alt: 'Rice flour and spices' },
  ], product.name)
}

function mealGallery(product) {
  return gallery(product.image, [
    { src: images.meals, alt: 'A wholesome South Indian meal' },
    { src: images.cooking, alt: 'Food served on a banana leaf' },
    { src: images.rice, alt: 'Native rice for everyday meals' },
  ], product.name)
}

function pack(product, id, label, sku, factor = 1) {
  const price = Math.round((product.price * factor) / 10) * 10
  const originalPrice = product.originalPrice
    ? Math.round((product.originalPrice * factor) / 10) * 10
    : null
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null

  return {
    id,
    label,
    sku,
    price,
    originalPrice,
    discount,
    stock: product.stock,
  }
}

function ricePacks(product, skuBase) {
  return [
    pack(product, '500g', '500 g', `${skuBase}-500`, 1),
    pack(product, '1kg', '1 kg', `${skuBase}-1KG`, 1.85),
  ]
}

function thokkuPacks(product, skuBase) {
  return [
    pack(product, '200g', '200 g', `${skuBase}-200`, 1),
    pack(product, '400g', '400 g', `${skuBase}-400`, 1.8),
  ]
}

function singlePack(product, sku) {
  return [
    pack(product, product.weight.replace(/\s+/g, '').toLowerCase(), product.weight, sku, 1),
  ]
}

const copy = {
  'kullakar-rice': {
    sku: 'SVH-NH-KUL-500',
    description:
      'Kullakar is a traditional native rice grown in Tamil Nadu and cooked in homes for everyday meals. The grain is small, with a warm, earthy flavour that sits comfortably beside sambar, kuzhambu and simple vegetable sides.',
    ingredients: ['Kullakar rice'],
    information: [
      { label: 'Origin', value: 'Tamil Nadu' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Form', value: 'Unpolished native rice' },
      { label: 'Best for', value: 'Everyday meals' },
      { label: 'Storage', value: 'Keep in a cool, dry place in an airtight tin' },
    ],
  },
  'karuppu-kavuni-rice': {
    sku: 'SVH-NH-KKV-500',
    description:
      'Karuppu Kavuni is a dark native rice known in Tamil kitchens for festive and everyday cooking. The grain cooks to a soft, slightly sticky texture and is often served with coconut, jaggery or simple savoury sides.',
    ingredients: ['Karuppu Kavuni rice'],
    information: [
      { label: 'Origin', value: 'Tamil Nadu' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Form', value: 'Unpolished native rice' },
      { label: 'Best for', value: 'Festive and everyday cooking' },
      { label: 'Storage', value: 'Keep in a cool, dry place in an airtight tin' },
    ],
  },
  'mappillai-samba-rice': {
    sku: 'SVH-NH-MSB-500',
    description:
      'Mappillai Samba is a robust native rice with a distinctive aroma. It is a staple grain in many Tamil households, cooked as everyday rice or used in traditional preparations.',
    ingredients: ['Mappillai Samba rice'],
    information: [
      { label: 'Origin', value: 'Tamil Nadu' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Form', value: 'Unpolished native rice' },
      { label: 'Best for', value: 'Everyday rice and traditional dishes' },
      { label: 'Storage', value: 'Keep in a cool, dry place in an airtight tin' },
    ],
  },
  'venthaya-thokku': {
    sku: 'SVH-NH-VTH-200',
    description:
      'A traditional fenugreek thokku made in small batches with a familiar home-kitchen taste. Spoon it beside rice, curd rice or dosa — the way it is eaten in many Tamil homes.',
    ingredients: ['Fenugreek', 'Tamarind', 'Sesame oil', 'Red chilli', 'Salt', 'Traditional spices'],
    information: [
      { label: 'Style', value: 'Small-batch thokku' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Thick, spoonable pickle' },
      { label: 'Storage', value: 'Refrigerate after opening. Use a dry spoon.' },
      { label: 'Shelf life', value: 'See date on the jar' },
    ],
  },
  'tomato-thokku': {
    sku: 'SVH-NH-TTH-200',
    description:
      'Slow-cooked tomato thokku with a tangy, savoury finish. Made in the traditional pickle style for the everyday table — rice, dosa, idli or a simple sandwich.',
    ingredients: ['Tomato', 'Tamarind', 'Sesame oil', 'Red chilli', 'Salt', 'Traditional spices'],
    information: [
      { label: 'Style', value: 'Small-batch thokku' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Thick, spoonable pickle' },
      { label: 'Storage', value: 'Refrigerate after opening. Use a dry spoon.' },
      { label: 'Shelf life', value: 'See date on the jar' },
    ],
  },
  'karuveppilai-thokku': {
    sku: 'SVH-NH-KTH-200',
    description:
      'A curry-leaf thokku prepared with sesame oil and spices, the way it is made in many Tamil homes. A spoonful brings the flavour of karuveppilai to plain rice or tiffin.',
    ingredients: ['Curry leaves', 'Sesame oil', 'Tamarind', 'Red chilli', 'Salt', 'Traditional spices'],
    information: [
      { label: 'Style', value: 'Small-batch thokku' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Thick, spoonable pickle' },
      { label: 'Storage', value: 'Refrigerate after opening. Use a dry spoon.' },
      { label: 'Shelf life', value: 'See date on the jar' },
    ],
  },
  'vadu-maanga-thokku': {
    sku: 'SVH-NH-VMG-200',
    description:
      'Young mango thokku with a sharp, pickled flavour. Packed in jars for the pantry and meant to be eaten in small spoons with rice or tiffin.',
    ingredients: ['Young mango', 'Sesame oil', 'Red chilli', 'Salt', 'Mustard', 'Traditional spices'],
    information: [
      { label: 'Style', value: 'Small-batch thokku' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Chunky pickled thokku' },
      { label: 'Storage', value: 'Refrigerate after opening. Use a dry spoon.' },
      { label: 'Shelf life', value: 'See date on the jar' },
    ],
  },
  'garam-masala': {
    sku: 'SVH-NH-GRM-100',
    description:
      'A house blend of whole spices, roasted and ground for everyday cooking. Stir it into gravies, dals and vegetable dishes at the end of cooking.',
    ingredients: ['Coriander', 'Cumin', 'Cinnamon', 'Cloves', 'Cardamom', 'Black pepper', 'Bay leaf'],
    information: [
      { label: 'Style', value: 'Freshly ground masala' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Use', value: 'Gravies, dals and everyday cooking' },
      { label: 'Storage', value: 'Keep sealed in a cool, dry place' },
    ],
  },
  'chat-masala': {
    sku: 'SVH-NH-CHT-100',
    description:
      'A tangy seasoning for fruit, chaat and salads. Ground in small batches so the flavour stays bright in the tin.',
    ingredients: ['Cumin', 'Black salt', 'Dried mango', 'Coriander', 'Chilli', 'Asafoetida'],
    information: [
      { label: 'Style', value: 'Freshly ground masala' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Use', value: 'Fruit, chaat and salads' },
      { label: 'Storage', value: 'Keep sealed in a cool, dry place' },
    ],
  },
  'noodles-masala': {
    sku: 'SVH-NH-NDL-100',
    description:
      'A savoury seasoning blend for noodles and stir-fried vegetables. Made for home cooking, not restaurant kits — simple spices, clearly listed.',
    ingredients: ['Coriander', 'Cumin', 'Chilli', 'Garlic', 'Onion', 'Salt', 'Traditional spices'],
    information: [
      { label: 'Style', value: 'Seasoning blend' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Use', value: 'Noodles and stir-fried vegetables' },
      { label: 'Storage', value: 'Keep sealed in a cool, dry place' },
    ],
  },
  'kasthuri-manjal-soap': {
    sku: 'SVH-SC-KMS-100',
    description:
      'A handmade soap with kasthuri manjal, a familiar botanical from South Indian homes. Made in small batches as a simple bathing bar — no exaggerated claims, just traditional ingredients in a bar you can use every day.',
    ingredients: ['Saponified oils', 'Kasthuri manjal (wild turmeric)', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  'vettiver-soap': {
    sku: 'SVH-SC-VVS-100',
    description:
      'Handmade soap scented with vettiver (khus), a traditional root used in South Indian baths. A quiet, earthy bar made by hand in small batches.',
    ingredients: ['Saponified oils', 'Vettiver', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  'hibiscus-soap': {
    sku: 'SVH-SC-HBS-100',
    description:
      'Handmade soap with hibiscus, a flower long used in traditional hair and bath preparations. A botanical bar for an ordinary, honest wash.',
    ingredients: ['Saponified oils', 'Hibiscus', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  'kuppaimeni-soap': {
    sku: 'SVH-SC-KPM-100',
    description:
      'Handmade soap with kuppaimeni, a familiar garden herb in Tamil Nadu. Made in small batches for an everyday bath.',
    ingredients: ['Saponified oils', 'Kuppaimeni', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  'sweet-basil-soap': {
    sku: 'SVH-SC-SBS-100',
    description:
      'Handmade soap with sweet basil. A clean, herbal bar made by hand — simple enough for daily use, rooted in familiar kitchen herbs.',
    ingredients: ['Saponified oils', 'Sweet basil', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  'multanimitti-soap': {
    sku: 'SVH-SC-MNM-100',
    description:
      'Handmade soap with multani mitti (Fuller’s earth), a traditional cleansing clay. A simple bar for the bath, made in small batches in Coimbatore.',
    ingredients: ['Saponified oils', 'Multani mitti', 'Water', 'Natural fragrance'],
    information: [
      { label: 'Style', value: 'Handmade soap' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Use', value: 'Everyday bath' },
      { label: 'Storage', value: 'Keep dry between uses' },
    ],
  },
  athirasam: {
    sku: 'SVH-NH-ATH-250',
    description:
      'Athirasam is a traditional sweet made with rice flour and jaggery, the way it is prepared for festivals and family gatherings. Soft, aromatic and meant to be shared.',
    ingredients: ['Rice flour', 'Jaggery', 'Cardamom', 'Ghee', 'Sesame'],
    information: [
      { label: 'Style', value: 'Traditional sweet' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Best for', value: 'Festivals and gifting' },
      { label: 'Storage', value: 'Keep in an airtight box in a cool place' },
    ],
  },
  'mysore-pak': {
    sku: 'SVH-NH-MSP-250',
    description:
      'Mysore Pak made in the traditional style with gram flour, ghee and sugar. A familiar sweet for celebrations and the everyday tea tray.',
    ingredients: ['Gram flour', 'Ghee', 'Sugar'],
    information: [
      { label: 'Style', value: 'Traditional sweet' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Best for', value: 'Festivals, gifting and tea time' },
      { label: 'Storage', value: 'Keep in an airtight box in a cool place' },
    ],
  },
  thattai: {
    sku: 'SVH-NH-THT-200',
    description:
      'Thattai — a crisp, homemade-style savoury made with rice flour and spices. Packed for snacking, travel and sharing with tea.',
    ingredients: ['Rice flour', 'Urad dal', 'Chilli', 'Curry leaves', 'Salt', 'Oil'],
    information: [
      { label: 'Style', value: 'Traditional savoury' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Crisp' },
      { label: 'Storage', value: 'Keep sealed in a cool, dry place' },
    ],
  },
  murukku: {
    sku: 'SVH-NH-MRK-200',
    description:
      'Murukku twisted in the familiar home style, fried until crisp. A pantry savoury for tea time — when it is in stock.',
    ingredients: ['Rice flour', 'Urad dal flour', 'Cumin', 'Sesame', 'Salt', 'Oil'],
    information: [
      { label: 'Style', value: 'Traditional savoury' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Texture', value: 'Crisp' },
      { label: 'Storage', value: 'Keep sealed in a cool, dry place' },
    ],
  },
  'idiyappam-meal': {
    sku: 'SVH-NH-IDY-1S',
    description:
      'A wholesome idiyappam meal packed for days when you want a familiar South Indian plate without starting from scratch. Best enjoyed fresh after it arrives.',
    ingredients: ['Rice idiyappam', 'Coconut', 'Seasonal accompaniment'],
    information: [
      { label: 'Style', value: 'Prepared daily meal' },
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Serve', value: '1 person' },
      { label: 'Storage', value: 'Refrigerate on arrival. Finish by the date on the pack.' },
    ],
    shipping: {
      summary: 'Prepared meals are packed in Coimbatore for dispatch the same or next working day.',
      notes: [
        'Please refrigerate as soon as the meal arrives.',
        'Finish within the date printed on the pack.',
        'Delivery windows may be tighter than pantry staples.',
        'Free shipping on orders above ₹499 still applies.',
      ],
    },
  },
}

const galleries = {
  'native-rice': riceGallery,
  pickles: pickleGallery,
  masalas: masalaGallery,
  'handmade-soaps': soapGallery,
  sweets: sweetGallery,
  savouries: savouryGallery,
  'daily-meals': mealGallery,
}

function variantsFor(product, extra) {
  if (product.category === 'native-rice') {
    return ricePacks(product, extra.sku.replace(/-\d+.*/, ''))
  }
  if (product.category === 'pickles') {
    return thokkuPacks(product, extra.sku.replace(/-\d+.*/, ''))
  }
  return singlePack(product, extra.sku)
}

export function getProductDetail(slug) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const extra = copy[product.id] ?? {}
  const sku = extra.sku ?? `SVH-${product.id.slice(0, 8).toUpperCase()}`
  const buildGallery = galleries[product.category]
  const variants = extra.variants ?? variantsFor(product, { sku })

  return {
    ...product,
    slug: product.id,
    sku,
    description:
      extra.description ??
      `${product.name} is a ${product.type.toLowerCase()} from SV Hub, packed in Coimbatore for everyday homes.`,
    ingredients: extra.ingredients ?? [product.name],
    information: extra.information ?? [
      { label: 'Packed in', value: 'Coimbatore' },
      { label: 'Net weight', value: product.weight },
      { label: 'Storefront', value: getStorefront(product.storefront)?.name ?? 'SV Hub' },
    ],
    shipping: extra.shipping ?? defaultShipping,
    gallery: extra.gallery ?? (buildGallery ? buildGallery(product) : gallery(product.image, [], product.name)),
    variants,
    categoryMeta: getCategoryBySlug(product.category),
    storefrontMeta: getStorefront(product.storefront),
  }
}

export function relatedFor(product, limit = 4) {
  return getRelatedProducts(product, limit)
}

export function rememberViewed(id) {
  if (typeof window === 'undefined' || !id) return
  try {
    const current = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]')
    const list = Array.isArray(current) ? current.filter((item) => item !== id) : []
    window.localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...list].slice(0, RECENT_LIMIT)))
  } catch {
    // Ignore private-mode or blocked storage.
  }
}

export function readViewed(excludeId, limit = 4) {
  if (typeof window === 'undefined') return []
  try {
    const current = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]')
    if (!Array.isArray(current)) return []
    return current
      .filter((id) => id !== excludeId)
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .slice(0, limit)
  } catch {
    return []
  }
}
