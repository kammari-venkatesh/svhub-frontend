import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ui/ProductCard.jsx'
import { getCategoryBySlug } from '../../data/categories.js'
import {
  countListingFilters,
  listingParamsToSearch,
  parseListingParams,
  queryShop,
  sortOptions,
} from '../../data/shop.js'
import { getStorefront } from '../../data/storefronts.js'
import ShopFilters from '../Shop/ShopFilters.jsx'
import ShopSheet from '../Shop/ShopSheet.jsx'
import '../Shop/Shop.css'
import './Category.css'

const HEADLINE = 'Traditional Goodness, Made for Everyday Life.'
const LISTING_PAGE_SIZE = 6

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProductSkeleton() {
  return (
    <div className="shop-skel category-skel" aria-hidden="true">
      <span className="shop-skel__media" />
      <span className="shop-skel__line shop-skel__line--type" />
      <span className="shop-skel__line shop-skel__line--name" />
      <span className="shop-skel__line shop-skel__line--price" />
      <span className="shop-skel__line shop-skel__line--cta" />
    </div>
  )
}

function splitHeadline(text) {
  const comma = text.indexOf(',')
  if (comma === -1) return text

  return (
    <>
      {text.slice(0, comma + 1)}
      <br />
      {text.slice(comma + 1).trim()}
    </>
  )
}

function Category() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)
  const house = category ? getStorefront(category.storefront) : null
  const accent = house?.accentToken === 'terracotta' ? 'terracotta' : 'espresso'

  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseListingParams(searchParams), [searchParams])
  const [queryDraft, setQueryDraft] = useState(filters.q)
  const [sheet, setSheet] = useState(null)
  const [visible, setVisible] = useState(LISTING_PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const prevSlug = useRef(slug)

  const queryFilters = useMemo(
    () => ({
      ...filters,
      categoryIds: category ? [category.slug] : ['__none__'],
    }),
    [filters, category],
  )

  const results = useMemo(() => (category ? queryShop(queryFilters) : []), [category, queryFilters])
  const shown = results.slice(0, visible)
  const activeCount = countListingFilters(filters)
  const sortLabel = sortOptions.find((option) => option.id === filters.sort)?.label ?? 'Featured'
  const allUnavailable = results.length > 0 && results.every((product) => product.stock === 'out-of-stock')
  const showingUnavailable = filters.availability === 'out-of-stock'
  const searchPlaceholder = category
    ? `Search ${category.name.toLowerCase()}…`
    : 'Search rice, pickles, soaps…'

  const applyFilters = useCallback(
    (next) => {
      setSearchParams(listingParamsToSearch(next), { replace: true })
    },
    [setSearchParams],
  )

  function handleFilterChange(next) {
    applyFilters({ ...next, q: queryDraft })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setSheet(null)

    if (prevSlug.current !== slug) {
      setQueryDraft('')
      setSearchParams(new URLSearchParams(), { replace: true })
      prevSlug.current = slug
    }
  }, [slug, setSearchParams])

  useEffect(() => {
    setQueryDraft(filters.q)
  }, [filters.q])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (queryDraft.trim() === filters.q) return
      applyFilters({ ...filters, q: queryDraft })
    }, 220)

    return () => window.clearTimeout(timer)
  }, [queryDraft, filters, applyFilters])

  useEffect(() => {
    setVisible(LISTING_PAGE_SIZE)
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 280)
    return () => window.clearTimeout(timer)
  }, [searchParams, slug])

  function clearFilters() {
    setQueryDraft('')
    applyFilters({
      q: '',
      storefront: 'all',
      categoryIds: [],
      price: 'all',
      availability: 'all',
      sort: filters.sort,
    })
  }

  const countLabel = results.length === 1 ? '1 product' : `${results.length} products`

  const crumbs = (
    <nav className="category__crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      <Link to="/shop">Shop</Link>
      {house ? (
        <>
          <span aria-hidden="true">/</span>
          <Link to={house.to}>{house.name}</Link>
        </>
      ) : null}
      <span aria-hidden="true">/</span>
      <span aria-current="page">{category?.name ?? 'Category'}</span>
    </nav>
  )

  if (!category) {
    return (
      <section className="shop category" aria-labelledby="category-heading">
        <span className="shop__grain" aria-hidden="true" />
        <header className="shop__intro">
          <div className="shop__container">
            {crumbs}
            <p className="shop__eyebrow">Shop</p>
            <h1 id="category-heading" className="shop__title">
              This category is on its way.
            </h1>
            <p className="shop__copy">Return to the shop to keep exploring SV Hub.</p>
            <Link to="/shop" className="category__back">
              Back to shop
              <Arrow />
            </Link>
          </div>
        </header>
      </section>
    )
  }

  return (
    <section className={`shop category category--${accent}`} aria-labelledby="category-heading">
      <span className="shop__grain" aria-hidden="true" />

      <header className="shop__intro">
        <div className="shop__container">
          {crumbs}
        </div>

        <div className="shop__container shop__intro-grid">
          <div className="shop__intro-copy">
            <p className="shop__eyebrow">{category.name}</p>
            <h1 id="category-heading" className="shop__title">
              {splitHeadline(HEADLINE)}
            </h1>
            <p className="shop__note">
              <span>{house?.kicker ?? 'From the house'}</span>
              <svg viewBox="0 0 168 14" fill="none" aria-hidden="true">
                <path
                  d="M2.4 9.6c18.8-4.8 36.2 2.8 55.1.4 16.6-2.1 31.8-6.6 48.4-4.2 14.2 2 27.6 5.8 42.6 2.4 7.4-1.7 14.2-4.2 17.8-1.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </p>
          </div>

          <div className="shop__intro-aside">
            <p className="shop__copy">{category.description}</p>
            <p className="shop__meta">
              {countLabel}
              <span aria-hidden="true"> · </span>
              {house?.name}
            </p>
            <figure className="category__still">
              <img src={category.image} alt="" />
              <figcaption>{category.name}</figcaption>
            </figure>
          </div>
        </div>
      </header>

      <div className="shop__container shop__layout">
        <aside className="shop__sidebar" aria-label="Product filters">
          <div className="shop__sidebar-head">
            <p className="shop__sidebar-title">Filter</p>
            {activeCount ? (
              <button type="button" className="shop__text-btn" onClick={clearFilters}>
                Clear all
              </button>
            ) : null}
          </div>
          <ShopFilters
            filters={filters}
            searchValue={queryDraft}
            onSearch={setQueryDraft}
            onChange={handleFilterChange}
            idPrefix="category"
            lockedCategory
            searchPlaceholder={searchPlaceholder}
          />
        </aside>

        <div className="shop__main">
          <div className="shop__toolbar">
            <label className="shop__search-wrap shop__search-wrap--mobile" htmlFor="category-mobile-search">
              <span className="sr-only">Search {category.name}</span>
              <input
                id="category-mobile-search"
                type="search"
                className="shop-filters__search"
                placeholder={searchPlaceholder}
                value={queryDraft}
                onChange={(event) => setQueryDraft(event.target.value)}
                autoComplete="off"
              />
            </label>

            <p className="shop__count" aria-live="polite">
              {loading ? 'Finding products…' : countLabel}
            </p>

            <div className="shop__toolbar-actions">
              <label className="shop__sort-desktop" htmlFor="category-sort">
                <span>Sort by</span>
                <select
                  id="category-sort"
                  value={filters.sort}
                  onChange={(event) =>
                    applyFilters({ ...filters, q: queryDraft, sort: event.target.value })
                  }
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="shop__chip-btn"
                aria-haspopup="dialog"
                aria-expanded={sheet === 'filters'}
                onClick={() => setSheet('filters')}
              >
                Filter{activeCount ? ` · ${activeCount}` : ''}
              </button>
              <button
                type="button"
                className="shop__chip-btn"
                aria-haspopup="dialog"
                aria-expanded={sheet === 'sort'}
                onClick={() => setSheet('sort')}
              >
                Sort
              </button>
            </div>
          </div>

          {loading ? (
            <ul className="shop__grid category__grid" aria-busy="true" aria-label="Loading products">
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  <ProductSkeleton />
                </li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            <div className="shop__empty">
              <p className="shop__empty-eyebrow">
                {showingUnavailable ? 'Out of stock' : 'No matches'}
              </p>
              <h2>
                {showingUnavailable
                  ? 'Nothing in this category is out of stock.'
                  : `No ${category.name.toLowerCase()} matched those filters.`}
              </h2>
              <p>
                {showingUnavailable
                  ? 'Every listed item is available to add to cart, or try another filter.'
                  : 'Try another search, or clear the filters to see everything in this category.'}
              </p>
              <button type="button" className="shop__empty-btn" onClick={clearFilters}>
                Clear filters
                <Arrow />
              </button>
            </div>
          ) : (
            <>
              {allUnavailable || showingUnavailable ? (
                <p className="category__oos" role="status">
                  {allUnavailable
                    ? 'These items are currently out of stock.'
                    : 'Showing out-of-stock items in this category.'}
                </p>
              ) : null}

              <ul className="shop__grid category__grid" aria-label={`${category.name} products`}>
                {shown.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>

              <div className="shop__footer">
                <p className="shop__shown">
                  Showing {shown.length} of {results.length}
                </p>
                {shown.length < results.length ? (
                  <button
                    type="button"
                    className="shop__more"
                    onClick={() => setVisible((n) => n + LISTING_PAGE_SIZE)}
                  >
                    Load more
                    <Arrow />
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      <ShopSheet
        open={sheet === 'filters'}
        title="Filter"
        labelledBy="category-filter-sheet"
        onClose={() => setSheet(null)}
      >
        <div className="shop__sheet-tools">
          <p className="shop__sheet-meta">{countLabel}</p>
          {activeCount ? (
            <button type="button" className="shop__text-btn" onClick={clearFilters}>
              Clear all
            </button>
          ) : null}
        </div>
        <ShopFilters
          filters={filters}
          searchValue={queryDraft}
          onSearch={setQueryDraft}
          onChange={handleFilterChange}
          idPrefix="category-sheet"
          lockedCategory
          searchPlaceholder={searchPlaceholder}
        />
      </ShopSheet>

      <ShopSheet
        open={sheet === 'sort'}
        title="Sort"
        labelledBy="category-sort-sheet"
        onClose={() => setSheet(null)}
      >
        <p className="shop__sheet-current">Current · {sortLabel}</p>
        <div className="shop-filters__choices">
          {sortOptions.map((option) => (
            <label key={option.id} className="shop-filters__choice shop-filters__choice--row">
              <input
                type="radio"
                name="category-sheet-sort"
                checked={filters.sort === option.id}
                onChange={() => {
                  applyFilters({ ...filters, q: queryDraft, sort: option.id })
                  setSheet(null)
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </ShopSheet>
    </section>
  )
}

export default Category
