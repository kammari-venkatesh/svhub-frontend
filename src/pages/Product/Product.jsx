import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductGallery from '../../components/product/ProductGallery.jsx'
import Button from '../../components/ui/Button.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import QuantitySelector from '../../components/ui/QuantitySelector.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { getProductDetail, readViewed, rememberViewed, relatedFor } from '../../data/productDetails.js'
import { formatPrice } from '../../utils/money.js'
import './Product.css'

const stockLabels = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
}

const PAGE_TITLE = 'SV Hub — Pure Native Goodness'

function Arrow({ size = 13 }) {
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

function CrumbSep() {
  return (
    <span className="pdp__crumb-sep" aria-hidden="true">
      /
    </span>
  )
}

function ProductNotFound() {
  return (
    <section className="pdp pdp--missing" aria-labelledby="pdp-missing-heading">
      <div className="pdp__container">
        <nav className="pdp__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <CrumbSep />
          <Link to="/shop">Shop</Link>
          <CrumbSep />
          <span aria-current="page">Product</span>
        </nav>
        <p className="pdp__eyebrow">Product</p>
        <h1 id="pdp-missing-heading">This product is not in the catalogue.</h1>
        <p className="pdp__missing-copy">
          It may have been moved, or the link is out of date. Browse the shop to find native rice,
          thokku, masalas and handmade soaps.
        </p>
        <Button to="/shop" arrow>
          Browse the shop
        </Button>
      </div>
    </section>
  )
}

function DetailBlock({ title, children }) {
  return (
    <section className="pdp-detail">
      <h2>{title}</h2>
      <div className="pdp-detail__body">{children}</div>
    </section>
  )
}

function ProductRail({ id, eyebrow, title, products }) {
  if (!products.length) return null

  return (
    <section className="pdp-rail" aria-labelledby={id}>
      <div className="pdp__container">
        <header className="pdp-rail__header">
          <p className="pdp__eyebrow">{eyebrow}</p>
          <h2 id={id}>{title}</h2>
        </header>
        <ul className="pdp-rail__grid">
          {products.map((item) => (
            <li key={item.id}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Product() {
  const { slug } = useParams()
  const product = useMemo(() => getProductDetail(slug), [slug])
  const related = useMemo(() => (product ? relatedFor(product, 4) : []), [product])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!product) {
      document.title = PAGE_TITLE
      return undefined
    }
    document.title = `${product.name} · SV Hub`
    rememberViewed(product.id)
    return () => {
      document.title = PAGE_TITLE
    }
  }, [product])

  if (!product) {
    return <ProductNotFound />
  }

  return <ProductView key={product.id} product={product} related={related} />
}

function ProductView({ product, related }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const [recent] = useState(() => readViewed(product.id, 4))
  const actionsRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)

  const variant =
    product.variants.find((item) => item.id === variantId) ?? product.variants[0] ?? null
  const accentToken = product.storefrontMeta?.accentToken === 'terracotta' ? 'terracotta' : 'espresso'
  const accent = product.storefrontMeta?.accent ?? 'var(--espresso-brown)'
  const outOfStock = (variant?.stock ?? product.stock) === 'out-of-stock'
  const stock = variant?.stock ?? product.stock
  const price = variant?.price ?? product.price
  const originalPrice = variant?.originalPrice ?? product.originalPrice
  const discount = variant?.discount ?? product.discount
  const sku = variant?.sku ?? product.sku
  const hasCompare = Boolean(originalPrice && originalPrice > price)
  const houseName = product.storefrontMeta?.name
  const categoryName = product.categoryMeta?.name
  const categoryTo = product.categoryMeta?.to ?? '/shop'
  const houseTo = product.storefrontMeta?.to ?? '/shop'

  useEffect(() => {
    if (!justAdded) return undefined
    const timer = window.setTimeout(() => setJustAdded(false), 1800)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  useEffect(() => {
    const node = actionsRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting)
      },
      { threshold: 0.15, rootMargin: '-48px 0px 0px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const cartProduct = {
    ...product,
    price,
    originalPrice,
    discount,
    sku,
    weight: variant?.label ?? product.weight,
    stock,
  }

  function handleAdd() {
    if (outOfStock) return
    addItem(cartProduct, quantity)
    setJustAdded(true)
  }

  function handleBuy() {
    if (outOfStock) return
    addItem(cartProduct, quantity)
    navigate('/cart')
  }

  const addLabel = outOfStock ? 'Out of stock' : justAdded ? 'Added' : 'Add to cart'
  const ctaVariant = accentToken === 'terracotta' ? 'terracotta' : 'espresso'

  return (
    <div className={`pdp pdp--${accentToken}`} style={{ '--pdp-accent': accent }}>
      <section className="pdp__hero" aria-labelledby="pdp-heading">
        <div className="pdp__container">
          <nav className="pdp__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <CrumbSep />
            <Link to="/shop">Shop</Link>
            <CrumbSep />
            <Link to={houseTo}>{houseName}</Link>
            <CrumbSep />
            <Link to={categoryTo}>{categoryName}</Link>
            <CrumbSep />
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="pdp__layout">
            <ProductGallery
              key={product.id}
              images={product.gallery}
              name={product.name}
              discount={discount}
              accent={accent}
            />

            <div className="pdp__info">
              <p className="pdp__type">{product.type}</p>
              <h1 id="pdp-heading">{product.name}</h1>
              <p className="pdp__house">
                <Link to={houseTo}>{houseName}</Link>
                {categoryName ? (
                  <>
                    <span aria-hidden="true"> · </span>
                    <Link to={categoryTo}>{categoryName}</Link>
                  </>
                ) : null}
              </p>

              <p className="pdp__price-row">
                <span className="pdp__price">{formatPrice(price)}</span>
                {hasCompare ? (
                  <s className="pdp__original">{formatPrice(originalPrice)}</s>
                ) : null}
                {discount ? <span className="pdp__save">{discount}% off</span> : null}
              </p>

              <p className={`pdp__stock pdp__stock--${stock}`}>
                <span className="pdp__stock-mark" aria-hidden="true" />
                {stockLabels[stock]}
                {stock === 'low-stock' ? ' — a few packs left' : null}
              </p>

              {sku ? (
                <p className="pdp__sku">
                  SKU <span>{sku}</span>
                </p>
              ) : null}

              <p className="pdp__lede">{product.description}</p>

              {product.variants.length ? (
                <fieldset className="pdp__variants">
                  <legend>Weight / variant</legend>
                  <div className="pdp__variant-list">
                    {product.variants.map((item) => {
                      const selected = item.id === variant?.id
                      const unavailable = item.stock === 'out-of-stock'
                      return (
                        <label
                          key={item.id}
                          className={`pdp__variant${selected ? ' is-selected' : ''}${
                            unavailable ? ' is-unavailable' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="pdp-variant"
                            value={item.id}
                            checked={selected}
                            disabled={unavailable && !selected}
                            onChange={() => setVariantId(item.id)}
                          />
                          <span className="pdp__variant-label">{item.label}</span>
                          <span className="pdp__variant-price">{formatPrice(item.price)}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ) : null}

              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                disabled={outOfStock}
              />

              <div className="pdp__actions" ref={actionsRef}>
                <Button
                  variant={ctaVariant}
                  disabled={outOfStock}
                  onClick={handleAdd}
                  aria-live="polite"
                  aria-label={
                    outOfStock
                      ? `${product.name} is out of stock`
                      : `Add ${quantity} ${product.name} to cart`
                  }
                >
                  {addLabel}
                </Button>
                <Button
                  variant="secondary"
                  disabled={outOfStock}
                  onClick={handleBuy}
                  aria-label={outOfStock ? `${product.name} is out of stock` : `Buy ${product.name} now`}
                >
                  Buy now
                </Button>
              </div>

              <ul className="pdp__trust">
                <li>Packed in Coimbatore</li>
                <li>Traditional methods</li>
                <li>Small-batch packing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pdp__details" aria-label="Product details">
        <div className="pdp__container pdp__details-grid">
          <DetailBlock title="Description">
            <p>{product.description}</p>
          </DetailBlock>

          <DetailBlock title="Ingredients">
            <ul className="pdp__ingredients">
              {product.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock title="Product information">
            <dl className="pdp__facts">
              {product.information.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div>
                <dt>Availability</dt>
                <dd>{stockLabels[stock]}</dd>
              </div>
            </dl>
          </DetailBlock>

          <DetailBlock title="Weight / variants">
            <ul className="pdp__packs">
              {product.variants.map((item) => (
                <li key={item.id}>
                  <span>{item.label}</span>
                  <span>{formatPrice(item.price)}</span>
                  <span>{stockLabels[item.stock]}</span>
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock title="Shipping information">
            <p>{product.shipping.summary}</p>
            <ul className="pdp__ship-notes">
              {product.shipping.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <Link className="pdp__policy" to="/shipping">
              Read the shipping policy
              <Arrow />
            </Link>
          </DetailBlock>
        </div>
      </section>

      <ProductRail
        id="pdp-related-heading"
        eyebrow="Related"
        title="From the same kitchen."
        products={related}
      />
      <ProductRail
        id="pdp-recent-heading"
        eyebrow="Recently viewed"
        title="Back to the pantry."
        products={recent}
      />

      <div
        className={`pdp-sticky${showSticky ? ' is-visible' : ''}`}
        aria-hidden={!showSticky}
      >
        <div className="pdp-sticky__inner">
          <div className="pdp-sticky__price">
            <p>{formatPrice(price)}</p>
            <span>{product.name}</span>
          </div>
          <button
            type="button"
            className="pdp-sticky__cart"
            disabled={outOfStock}
            tabIndex={showSticky ? 0 : -1}
            aria-label={
              outOfStock
                ? `${product.name} is out of stock`
                : `Add ${quantity} ${product.name} to cart`
            }
            onClick={handleAdd}
          >
            {addLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
