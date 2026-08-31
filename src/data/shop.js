import { categories } from './categories.js'
import { products } from './products.js'
import { storefronts } from './storefronts.js'

export const shopIntro = {
  eyebrow: 'Shop',
  title: 'Pure Goodness, All in One Place.',
  copy: 'Explore traditional foods, native staples, authentic masalas and handmade self-care products.',
}

export const PAGE_SIZE = 12

export const priceFilters = [
  { id: 'all', label: 'Any price' },
  { id: 'under-200', label: 'Under ₹200' },
  { id: '200-250', label: '₹200 – ₹250' },
  { id: 'over-250', label: 'Above ₹250' },
]

export const availabilityFilters = [
  { id: 'all', label: 'Any availability' },
  { id: 'in-stock', label: 'In stock' },
  { id: 'low-stock', label: 'Low stock' },
  { id: 'out-of-stock', label: 'Out of stock' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A to Z' },
  { id: 'discount', label: 'Discount' },
]

export const searchSortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'newest', label: 'Newest' },
]

function matchesPrice(product, price) {
  if (price === 'under-200') return product.price < 200
  if (price === '200-250') return product.price >= 200 && product.price <= 250
  if (price === 'over-250') return product.price > 250
  return true
}

function parsePage(value) {
  const page = Number.parseInt(value ?? '1', 10)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function parseShopParams(searchParams) {
  const categoriesParam = searchParams.get('cat')

  return {
    q: searchParams.get('q') ?? '',
    storefront: searchParams.get('house') ?? 'all',
    categoryIds: categoriesParam ? categoriesParam.split(',').filter(Boolean) : [],
    price: searchParams.get('price') ?? 'all',
    availability: searchParams.get('stock') ?? 'all',
    sort: searchParams.get('sort') ?? 'featured',
    page: parsePage(searchParams.get('page')),
  }
}

export function parseSearchParams(searchParams) {
  return {
    ...parseShopParams(searchParams),
    sort: searchParams.get('sort') ?? 'relevance',
  }
}

export function searchParamsToSearch(filters) {
  const next = shopParamsToSearch({
    ...filters,
    sort: filters.sort === 'relevance' ? 'featured' : filters.sort,
    page: 1,
  })
  if (filters.sort && filters.sort !== 'relevance') next.set('sort', filters.sort)
  else next.delete('sort')
  return next
}

export function countSearchFilters(filters) {
  let count = 0
  if (filters.storefront !== 'all') count += 1
  if (filters.categoryIds.length) count += filters.categoryIds.length
  if (filters.price !== 'all') count += 1
  if (filters.availability !== 'all') count += 1
  return count
}

export function shopParamsToSearch(filters) {
  const next = new URLSearchParams()

  if (filters.q?.trim()) next.set('q', filters.q.trim())
  if (filters.storefront !== 'all') next.set('house', filters.storefront)
  if (filters.categoryIds.length) next.set('cat', filters.categoryIds.join(','))
  if (filters.price !== 'all') next.set('price', filters.price)
  if (filters.availability !== 'all') next.set('stock', filters.availability)
  if (filters.sort !== 'featured') next.set('sort', filters.sort)
  if (filters.page > 1) next.set('page', String(filters.page))

  return next
}

export function parseListingParams(searchParams) {
  return {
    q: searchParams.get('q') ?? '',
    storefront: 'all',
    categoryIds: [],
    price: searchParams.get('price') ?? 'all',
    availability: searchParams.get('stock') ?? 'all',
    sort: searchParams.get('sort') ?? 'featured',
    page: parsePage(searchParams.get('page')),
  }
}

export function listingParamsToSearch(filters) {
  const next = new URLSearchParams()

  if (filters.q.trim()) next.set('q', filters.q.trim())
  if (filters.price !== 'all') next.set('price', filters.price)
  if (filters.availability !== 'all') next.set('stock', filters.availability)
  if (filters.sort !== 'featured') next.set('sort', filters.sort)
  if (filters.page > 1) next.set('page', String(filters.page))

  return next
}

export function countListingFilters(filters) {
  let count = 0
  if (filters.q.trim()) count += 1
  if (filters.price !== 'all') count += 1
  if (filters.availability !== 'all') count += 1
  return count
}

export function countActiveFilters(filters) {
  let count = 0
  if (filters.q.trim()) count += 1
  if (filters.storefront !== 'all') count += 1
  if (filters.categoryIds.length) count += filters.categoryIds.length
  if (filters.price !== 'all') count += 1
  if (filters.availability !== 'all') count += 1
  return count
}

export function queryShop(filters) {
  const needle = filters.q.trim().toLowerCase()

  let list = products.filter((product) => {
    if (filters.storefront !== 'all' && product.storefront !== filters.storefront) return false
    if (filters.categoryIds.length && !filters.categoryIds.includes(product.category)) return false
    if (!matchesPrice(product, filters.price)) return false
    if (filters.availability !== 'all' && product.stock !== filters.availability) return false

    if (needle) {
      const category = categories.find((item) => item.slug === product.category)
      const house = storefronts.find((item) => item.slug === product.storefront)
      const haystack = [product.name, product.type, product.weight, category?.name, house?.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(needle)) return false
    }

    return true
  })

  if (filters.sort === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  } else if (filters.sort === 'name') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  } else if (filters.sort === 'discount') {
    list = [...list].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
  } else if (filters.sort === 'newest') {
    list = [...list].reverse()
  } else if (filters.sort === 'relevance' && needle) {
    list = [...list].sort((a, b) => relevanceScore(b, needle) - relevanceScore(a, needle))
  }

  return list
}

function relevanceScore(product, needle) {
  const name = product.name.toLowerCase()
  if (name === needle) return 4
  if (name.startsWith(needle)) return 3
  if (name.includes(needle)) return 2
  return 1
}

export function categoryCounts(storefront = 'all') {
  const pool =
    storefront === 'all' ? products : products.filter((product) => product.storefront === storefront)

  return categories
    .filter((category) => storefront === 'all' || category.storefront === storefront)
    .map((category) => ({
      ...category,
      count: pool.filter((product) => product.category === category.slug).length,
    }))
}
