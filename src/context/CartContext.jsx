import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)

    function lineKey(item) {
      return `${item.id}::${item.weight ?? ''}`
    }

    function addItem(product, quantity = 1) {
      const qty = Math.max(1, Number(quantity) || 1)

      setItems((current) => {
        const key = lineKey(product)
        const existing = current.find((item) => lineKey(item) === key)

        if (existing) {
          return current.map((item) =>
            lineKey(item) === key ? { ...item, quantity: item.quantity + qty } : item,
          )
        }

        return [...current, { ...product, quantity: qty }]
      })
    }

    function setItemQuantity(product, quantity) {
      const qty = Math.max(0, Number(quantity) || 0)

      setItems((current) => {
        const key = lineKey(product)
        if (qty === 0) return current.filter((item) => lineKey(item) !== key)

        const existing = current.find((item) => lineKey(item) === key)
        if (existing) {
          return current.map((item) => (lineKey(item) === key ? { ...item, quantity: qty } : item))
        }

        return [...current, { ...product, quantity: qty }]
      })
    }

    function quantityOf(product) {
      const key = lineKey(product)
      return items.find((item) => lineKey(item) === key)?.quantity ?? 0
    }

    function clearCart() {
      setItems([])
    }

    return { items, count, addItem, setItemQuantity, quantityOf, clearCart }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
