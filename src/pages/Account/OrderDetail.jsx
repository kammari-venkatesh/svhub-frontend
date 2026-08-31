import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatPrice } from '../../utils/money.js'
import { formatOrderDate, getAccountOrder, orderTotals } from '../../data/account.js'
import { productHref, products } from '../../data/products.js'
import OrderTimeline from '../../components/order/OrderTimeline.jsx'
import AccountLoginPrompt from './AccountLoginPrompt.jsx'
import './OrderDetail.css'

function orderHeading(number) {
  const value = String(number || '').trim()
  if (!value) return 'Order details'
  return value.startsWith('#') ? `Order ${value}` : `Order #${value}`
}

function crumbNumber(number) {
  const value = String(number || '').trim()
  if (!value) return 'Order'
  return value.startsWith('#') ? value : `#${value}`
}

function itemTotal(item) {
  return Number(item.price || 0) * (item.quantity || 1)
}

function itemHref(item) {
  const match = products.find(
    (product) =>
      product.id === item.id ||
      product.slug === item.slug ||
      product.name === item.name,
  )
  return match ? productHref(match) : ''
}

function formatPhone(phone) {
  const raw = String(phone || '').trim()
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  return raw
}

function addressFromOrder(address) {
  if (!address) return null
  const lines = Array.isArray(address.lines) ? address.lines.filter(Boolean) : []
  const street = String(address.street || lines[0] || '')
    .replace(/,$/, '')
    .trim()
  const cityState = String(address.city && address.state ? `${address.city}, ${address.state}` : lines[1] || '')
  const [city = '', state = ''] = address.city
    ? [address.city, address.state || '']
    : cityState.split(',').map((part) => part.trim())
  const pin = String(address.pin || lines[2] || '')
    .replace(/,$/, '')
    .replace(/[^\d]/g, '')
    .trim()
  const name = address.name || ''
  const phone = address.phone || ''
  const label = address.label || ''
  if (!name && !street && !phone && !lines.length) return null
  return { label, name, street, city, state, pin, phone, lines }
}

function Arrow({ back = false }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {back ? (
        <path
          d="M13 8H3M6.5 4.5 3 8l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function StatusLine({ label, value }) {
  const pending = String(value).toLowerCase() === 'pending' || String(value).toLowerCase() === 'failed'
  return (
    <p className={`od-status${pending ? ' is-pending' : ''}`}>
      <span>{label}</span>
      <span className="od-status__value">
        <span className="od-status__dot" aria-hidden="true" />
        {value}
      </span>
    </p>
  )
}

function OrderDetail() {
  const { user } = useAuth()
  const { orderId } = useParams()

  if (!user) {
    return (
      <div className="account-panel">
        <AccountLoginPrompt
          title="Log in to view this order"
          copy="Sign in to see order details, delivery status and the items you purchased."
        />
      </div>
    )
  }

  const order = getAccountOrder(orderId, user)

  if (!order) {
    return (
      <div className="account-panel od">
        <Link to="/account/orders" className="od-back">
          <Arrow back />
          All orders
        </Link>
        <div className="account-empty">
          <h2>Order not found</h2>
          <p>We couldn’t find this order. It may have been moved, or the link is out of date.</p>
          <Link to="/account/orders" className="od-action">
            Back to orders
            <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  const totals = orderTotals(order)
  const address = addressFromOrder(order.address)
  const heading = orderHeading(order.number)
  const items = order.items || []
  const count = items.length
  const countLabel = count === 1 ? '1 item' : `${count} items`

  return (
    <article className="od" aria-labelledby="od-heading">
      <nav className="od-crumb" aria-label="Account">
        <Link to="/account">My Account</Link>
        <span aria-hidden="true">/</span>
        <Link to="/account/orders">Orders</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{crumbNumber(order.number)}</span>
      </nav>

      <Link to="/account/orders" className="od-back">
        <Arrow back />
        All orders
      </Link>

      <header className="od-head">
        <div className="od-head__main">
          <p className="od-kicker">Order details</p>
          <h1 id="od-heading">{heading}</h1>
          <p className="od-head__date">{formatOrderDate(order.date)}</p>
        </div>
        <div className="od-head__meta">
          <StatusLine label="Payment" value={order.paymentStatus} />
          <StatusLine label="Order status" value={order.status} />
        </div>
      </header>

      <OrderTimeline status={order.status} />

      <section className="od-block" aria-labelledby="od-items-heading">
        <div className="od-block__head">
          <h2 id="od-items-heading">Your order</h2>
          <p>{countLabel}</p>
        </div>
        {items.length ? (
          <ul className="od-items">
            {items.map((item, index) => {
              const href = itemHref(item)
              const image = item.image ? (
                <img src={item.image} alt="" width="96" height="96" />
              ) : (
                <span className="od-items__thumb" aria-hidden="true" />
              )
              return (
                <li key={`${item.name}-${item.weight}-${index}`}>
                  {href ? (
                    <Link to={href} className="od-items__media" aria-label={item.name}>
                      {image}
                    </Link>
                  ) : (
                    <span className="od-items__media">{image}</span>
                  )}
                  <div className="od-items__info">
                    {href ? (
                      <Link to={href} className="od-items__name">
                        {item.name}
                      </Link>
                    ) : (
                      <p className="od-items__name">{item.name}</p>
                    )}
                    {item.weight ? <p className="od-items__weight">{item.weight}</p> : null}
                  </div>
                  <p className="od-items__qty">
                    <span>Qty</span> {item.quantity || 1}
                  </p>
                  <p className="od-items__price">
                    <span>Price</span>
                    {formatPrice(item.price)}
                  </p>
                  <p className="od-items__total">
                    <span>Total</span>
                    {formatPrice(itemTotal(item))}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="od-note">No items are listed on this order.</p>
        )}
      </section>

      <div className="od-split">
        <section className="od-block" aria-labelledby="od-deliver-heading">
          <h2 id="od-deliver-heading" className="od-kicker">
            Deliver to
          </h2>
          {address ? (
            <div className="od-address">
              {address.label ? <p className="od-address__label">{address.label}</p> : null}
              {address.name ? <p className="od-address__name">{address.name}</p> : null}
              {address.street ? <p>{address.street}</p> : null}
              {address.city || address.state ? (
                <p>{[address.city, address.state].filter(Boolean).join(', ')}</p>
              ) : null}
              {address.pin ? <p>{address.pin}</p> : null}
              {!address.street && address.lines.length
                ? address.lines.map((line) => <p key={line}>{line}</p>)
                : null}
              {address.phone ? <p className="od-address__phone">{formatPhone(address.phone)}</p> : null}
            </div>
          ) : (
            <p className="od-note">No delivery address is on file for this order.</p>
          )}
        </section>

        <div className="od-side">
          <section className="od-block" aria-labelledby="od-summary-heading">
            <h2 id="od-summary-heading" className="od-kicker">
              Order summary
            </h2>
            <dl className="od-summary">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd>
              </div>
              <div>
                <dt>Discount</dt>
                <dd>{totals.discount ? `− ${formatPrice(totals.discount)}` : formatPrice(0)}</dd>
              </div>
              <div className="od-summary__total">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>
          </section>

          {order.payment || order.paymentStatus ? (
            <section className="od-block" aria-labelledby="od-pay-heading">
              <h2 id="od-pay-heading" className="od-kicker">
                Payment
              </h2>
              <dl className="od-pay">
                {order.payment ? (
                  <div>
                    <dt>Method</dt>
                    <dd>{order.payment}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Status</dt>
                  <dd>{order.paymentStatus}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>
      </div>

      <div className="od-actions">
        <Link to="/shop" className="od-action od-action--primary">
          Continue shopping
          <Arrow />
        </Link>
        <Link to="/contact" className="od-action">
          Contact support
          <Arrow />
        </Link>
      </div>
    </article>
  )
}

export default OrderDetail
