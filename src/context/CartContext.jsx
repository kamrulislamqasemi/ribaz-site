import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'ribaz_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  function addItem(item) {
    const id = item.id || `${item.type || 'product'}-${item.slug}-${item.weight || 'default'}`
    setItems((prev) => {
      const existing = prev.find((x) => x.id === id)
      if (existing) return prev.map((x) => x.id === id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x)
      return [...prev, { ...item, id, quantity: item.quantity || 1 }]
    })
  }

  function updateQuantity(id, quantity) {
    const qty = Math.max(1, Number(quantity || 1))
    setItems((prev) => prev.map((x) => x.id === id ? { ...x, quantity: qty } : x))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  function clearCart() { setItems([]) }

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0), [items])
  const count = useMemo(() => items.reduce((sum, item) => sum + Number(item.quantity || 1), 0), [items])

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal, count }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
