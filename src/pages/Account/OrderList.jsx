import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/money.js'
import { formatOrderDate, statusClass } from '../../data/account.js'

export function StatusBadge({ status, tone = 'order' }) {
  const kind = tone === 'payment' ? `pay-${statusClass(status)}` : statusClass(status)

  return (
    <span className={`account-status account-status--${kind}`}>
      <span className="account-status__dot" aria-hidden="true" />
      <span className="sr-only">{tone === 'payment' ? 'Payment status: ' : 'Order status: '}</span>
      {status}
    </span>
  )
}

export const StatusMark = StatusBadge

export function EmptyState({ title, copy, to, action, onAction }) {
  return (
    <div className="account-empty">
      <h3>{title}</h3>
      <p>{copy}</p>
      {to ? (
        <Link to={to} className="account-text-link">
          {action}
        </Link>
      ) : onAction ? (
        <button type="button" className="account-text-link" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  )
}

export function OrderPreview({ order }) {
  const first = order.items?.[0]
  const extra = Math.max((order.items?.length || 0) - 1, 0)
  if (!first) return <span>—</span>

  return (
    <div className="account-row__preview">
      {first.image ? <img src={first.image} alt="" width="48" height="48" /> : null}
      <p>
        {first.name}
        {extra ? (
          <span>
            {' '}
            + {extra} more {extra === 1 ? 'item' : 'items'}
          </span>
        ) : null}
      </p>
    </div>
  )
}

export function OrderList({ orders, emptyTitle, emptyCopy, emptyCta }) {
  if (!orders.length) {
    return (
      <EmptyState
        title={emptyTitle}
        copy={emptyCopy}
        to={emptyCta?.to ?? '/shop'}
        action={emptyCta?.label ?? 'Explore products →'}
      />
    )
  }

  return (
    <ul className="account-rows">
      {orders.map((order) => (
        <li key={order.id}>
          <Link to={`/account/orders/${order.id}`} className="account-row">
            <div className="account-row__main">
              <p className="account-row__number">{order.number}</p>
              <p className="account-row__meta">
                <span>{formatOrderDate(order.date)}</span>
                <span>{formatPrice(order.amount)}</span>
              </p>
              <OrderPreview order={order} />
            </div>
            <div className="account-row__side">
              <StatusBadge status={order.status} />
              <span className="account-row__view">
                View
                <span aria-hidden="true"> →</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
