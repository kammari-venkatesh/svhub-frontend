import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatPrice } from '../../utils/money.js'
import { formatOrderDate, getAccountOrders, padCount } from '../../data/account.js'
import { EmptyState, OrderPreview, StatusBadge } from './OrderList.jsx'
import './Orders.css'

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function Orders() {
  const { user } = useAuth()
  const orders = user ? getAccountOrders(user) : []
  const countLabel = orders.length === 1 ? '1 order' : `${padCount(orders.length)} orders`

  return (
    <div className="account-panel orders">
      <header className="orders__header">
        <p className="orders__eyebrow">My Orders</p>
        <h2 id="orders-heading" className="orders__title">
          Your Orders
        </h2>
        <p className="orders__copy">
          Track every pot of rice, jar of thokku and bar of soap on its way from our kitchen to yours.
        </p>
        <p className="orders__count" aria-live="polite">
          {countLabel}
        </p>
      </header>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          copy="Your first SV Hub order is waiting to find its way home."
          to="/shop"
          action="Explore products →"
        />
      ) : (
        <>
          <div className="orders__table-wrap">
            <table className="orders__table">
              <caption className="sr-only">Your SV Hub orders</caption>
              <thead>
                <tr>
                  <th scope="col">Order number</th>
                  <th scope="col">Date</th>
                  <th scope="col">Products</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">
                      <Link to={`/account/orders/${order.id}`}>{order.number}</Link>
                    </th>
                    <td>{formatOrderDate(order.date)}</td>
                    <td>
                      <OrderPreview order={order} />
                    </td>
                    <td className="orders__amount">{formatPrice(order.amount)}</td>
                    <td>
                      <StatusBadge status={order.paymentStatus} tone="payment" />
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <Link to={`/account/orders/${order.id}`} className="orders__view">
                        View
                        <Arrow />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="orders__cards">
            {orders.map((order) => (
              <li key={order.id} className="orders__card">
                <div className="orders__card-top">
                  <p className="orders__card-number">{order.number}</p>
                  <p className="orders__card-date">{formatOrderDate(order.date)}</p>
                </div>
                <OrderPreview order={order} />
                <p className="orders__card-amount">{formatPrice(order.amount)}</p>
                <div className="orders__card-badges">
                  <StatusBadge status={order.paymentStatus} tone="payment" />
                  <StatusBadge status={order.status} />
                </div>
                <Link to={`/account/orders/${order.id}`} className="orders__view">
                  View order
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Orders
