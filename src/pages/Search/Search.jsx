import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import { getCategoryBySlug } from '../../data/categories.js'
import {
  PAGE_SIZE,
  availabilityFilters,
  countSearchFilters,
  parseSearchParams,
  priceFilters,
  queryShop,
  searchParamsToSearch,
  searchSortOptions,
} from '../../data/shop.js'
import { storefronts } from '../../data/storefronts.js'
import ShopFilters from '../Shop/ShopFilters.jsx'
import ShopSheet from '../Shop/ShopSheet.jsx'
import SearchProduct from './SearchProduct.jsx'
import '../Shop/Shop.css'
import './Search.css'

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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.2 16.2 20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function activeChips(filters) {
  const chips = []

  if (filters.storefront !== 'all') {
    const house = storefronts.find((item) => item.slug === filters.storefront)
    if (house) chips.push({ key: 'house', label: house.name })
  }

  filters.categoryIds.forEach((slug) => {
    const category = getCategoryBySlug(slug)
    if (category) chips.push({ key: `cat-${slug}`, label: category.name, slug })
  })

  if (filters.price !== 'all') {
    const price = priceFilters.find((item) => item.id === filters.price)
    if (price) chips.push({ key: 'price', label: price.label })
  }

  if (filters.availability !== 'all') {
    const stock = availabilityFilters.find((item) => item.id === filters.availability)
    if (stock) chips.push({ key: 'stock', label: stock.label })
  }

  return chips
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseSearchParams(searchParams), [searchParams])
  const [queryDraft, setQueryDraft] = useState(filters.q)
  const [sheet, setSheet] = useState(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const firstLoad = useRef(true)

  const results = useMemo(() => queryShop(filters), [filters])
  const shown = results.slice(0, visible)
  const chips = useMemo(() => activeChips(filters), [filters])
  const activeCount = countSearchFilters(filters)
  const queryLabel = filters.q.trim()

  const applyFilters = useCallback(
    (next) => {
      setSearchParams(searchParamsToSearch(next), { replace: true })
    },
    [setSearchParams],
  )

  function handleFilterChange(next) {
    applyFilters({ ...next, q: queryDraft })
  }

  function submitSearch(event) {
    event.preventDefault()
    applyFilters({ ...filters, q: queryDraft })
  }

  function clearFilters() {
    applyFilters({
      q: queryDraft,
      storefront: 'all',
      categoryIds: [],
      price: 'all',
      availability: 'all',
      sort: filters.sort,
    })
  }

  function clearSearch() {
    setQueryDraft('')
    applyFilters({ ...filters, q: '' })
    inputRef.current?.focus()
  }

  function removeChip(chip) {
    if (chip.key === 'house') {
      handleFilterChange({ ...filters, storefront: 'all', categoryIds: [] })
      return
    }
    if (chip.key === 'price') {
      handleFilterChange({ ...filters, price: 'all' })
      return
    }
    if (chip.key === 'stock') {
      handleFilterChange({ ...filters, availability: 'all' })
      return
    }
    if (chip.slug) {
      handleFilterChange({
        ...filters,
        categoryIds: filters.categoryIds.filter((id) => id !== chip.slug),
      })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setQueryDraft(filters.q)
  }, [filters.q])

  useEffect(() => {
    setVisible(PAGE_SIZE)
    if (firstLoad.current) {
      firstLoad.current = false
      return undefined
    }
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 240)
    return () => window.clearTimeout(timer)
  }, [searchParams])

  const countLabel =
    results.length === 1 ? '1 matching product' : `${results.length} matching products`
  const foundLabel = results.length === 1 ? '1 product found' : `${results.length} products found`
  const houseLabel =
    filters.storefront === 'all'
      ? `Searching across ${storefronts.length} houses`
      : `Searching in ${storefronts.find((house) => house.slug === filters.storefront)?.name ?? 'SV Hub'}`

  return (
    <section className="search" aria-labelledby="search-heading">
      <div className="search__grain" aria-hidden="true" />

      <header className="search__hero">
        <div className="search__container">
          <Reveal className="search__intro">
            <div className="search__intro-copy">
              <p className="search__eyebrow">Search</p>
              <h1 id="search-heading">Search Results</h1>
              <p className="search__lede">
                Find native rice, thokku, masalas and handmade soaps from both houses.
              </p>
            </div>
            <p className="search__hero-count" aria-live="polite">
              {countLabel}
            </p>
          </Reveal>

          <Reveal className="search__field-wrap" delay={80}>
            <form className="search__bar" role="search" onSubmit={submitSearch}>
              <span className="search__bar-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <label className="sr-only" htmlFor="search-query">
                Search products
              </label>
              <input
                ref={inputRef}
                id="search-query"
                type="search"
                value={queryDraft}
                placeholder="Try Karuppu Kavuni, thokku, or vetiver soap"
                autoComplete="off"
                onChange={(event) => setQueryDraft(event.target.value)}
              />
              <button type="submit" className="search__bar-btn">
                Search
                <Arrow />
              </button>
            </form>
            <p className="search__context">
              <span>{foundLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{houseLabel}</span>
            </p>
          </Reveal>
        </div>
      </header>

      <div className="search__dock" aria-label="Search controls">
        <button
          type="button"
          className="search__dock-btn"
          aria-haspopup="dialog"
          aria-expanded={sheet === 'filters'}
          onClick={() => setSheet('filters')}
        >
          Filter{activeCount ? ` · ${activeCount}` : ''}
        </button>
        <button
          type="button"
          className="search__dock-btn"
          aria-haspopup="dialog"
          aria-expanded={sheet === 'sort'}
          onClick={() => setSheet('sort')}
        >
          Sort
        </button>
        <p className="search__dock-count">{countLabel}</p>
      </div>

      <div className="search__container search__layout">
        <aside className="search__panel" aria-label="Search filters">
          <p className="search__panel-title">Filters</p>
          <ShopFilters
            filters={filters}
            onChange={handleFilterChange}
            showSearch={false}
            idPrefix="search"
          />
        </aside>

        <div className="search__main">
          <div className="search__controls">
            <p className="search__count" aria-live="polite">
              {countLabel}
            </p>
            <label className="search__sort" htmlFor="search-sort">
              <span>Sort</span>
              <span aria-hidden="true">·</span>
              <select
                id="search-sort"
                value={filters.sort}
                onChange={(event) =>
                  applyFilters({ ...filters, q: queryDraft, sort: event.target.value })
                }
              >
                {searchSortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {chips.length ? (
            <div className="search__chips" aria-label="Active filters">
              <p className="search__chips-label">Filtered by</p>
              <ul>
                {chips.map((chip) => (
                  <li key={chip.key}>
                    <button type="button" onClick={() => removeChip(chip)}>
                      {chip.label}
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Remove {chip.label} filter</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="search__clear" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          ) : null}

          {loading ? (
            <ul className="search__grid" aria-busy="true" aria-label="Loading products">
              {Array.from({ length: Math.min(6, Math.max(shown.length, 3)) }, (_, index) => (
                <li key={index} className="search-skel" aria-hidden="true">
                  <span className="search-skel__media" />
                  <span className="search-skel__line search-skel__line--type" />
                  <span className="search-skel__line search-skel__line--name" />
                  <span className="search-skel__line search-skel__line--price" />
                </li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            <div className="search__empty">
              <p className="search__empty-kicker">Nothing found</p>
              <h2>We couldn’t find that goodness just yet.</h2>
              <p>
                {queryLabel
                  ? `“${queryLabel}” isn’t in the catalogue right now. Try another word, or wander the houses.`
                  : 'Try a product name — or explore everything we keep on the shelves.'}
              </p>
              <div className="search__empty-actions">
                <button type="button" className="search__text-cta" onClick={clearSearch}>
                  Clear search
                </button>
                <Link to="/shop" className="search__text-cta">
                  Explore all products
                  <Arrow />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="search__aside-note">Goodness, found.</p>
              <ul className="search__grid">
                {shown.map((product, index) => (
                  <li key={product.id} style={{ '--i': index }}>
                    <SearchProduct product={product} index={index} />
                  </li>
                ))}
              </ul>

              <div className="search__more-row">
                <p>
                  Showing {shown.length} of {results.length}
                </p>
                {shown.length < results.length ? (
                  <button type="button" className="search__text-cta" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
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
        labelledBy="search-filter-sheet"
        onClose={() => setSheet(null)}
      >
        <div className="search__sheet-tools">
          {activeCount ? (
            <button type="button" className="search__clear" onClick={clearFilters}>
              Clear all
            </button>
          ) : (
            <span />
          )}
        </div>
        <ShopFilters
          filters={filters}
          onChange={handleFilterChange}
          idPrefix="search-sheet"
          showSearch={false}
        />
      </ShopSheet>

      <ShopSheet
        open={sheet === 'sort'}
        title="Sort"
        labelledBy="search-sort-sheet"
        onClose={() => setSheet(null)}
      >
        <div className="shop-filters__choices">
          {searchSortOptions.map((option) => (
            <label key={option.id} className="shop-filters__choice shop-filters__choice--row">
              <input
                type="radio"
                name="search-sheet-sort"
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

export default Search
