import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)

    function addItem(product) {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)

        if (existing) {
          return current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        }

        return [...current, { ...product, quantity: 1 }]
      })
    }

    return { items, count, addItem }
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
