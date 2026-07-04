import { createContext, useContext, useMemo, useState } from 'react'
import { usePlants } from './PlantsContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { plants } = usePlants()
  const [items, setItems] = useState({}) // { [plantId]: quantidade }
  const [isOpen, setIsOpen] = useState(false)

  function addItem(plantId, qty = 1) {
    setItems((prev) => ({ ...prev, [plantId]: (prev[plantId] || 0) + qty }))
    setIsOpen(true)
  }

  function removeItem(plantId) {
    setItems((prev) => {
      const next = { ...prev }
      delete next[plantId]
      return next
    })
  }

  function setQty(plantId, qty) {
    setItems((prev) => ({ ...prev, [plantId]: qty }))
  }

  function clearCart() {
    setItems({})
  }

  const detailedItems = useMemo(() => {
    return Object.entries(items)
      .map(([id, qty]) => {
        const plant = plants.find((p) => p.id === id)
        if (!plant) return null
        return { plant, qty }
      })
      .filter(Boolean)
  }, [items, plants])

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, { plant, qty }) => sum + plant.price * qty, 0),
    [detailedItems]
  )

  const totalQty = useMemo(
    () => detailedItems.reduce((sum, { qty }) => sum + qty, 0),
    [detailedItems]
  )

  return (
    <CartContext.Provider
      value={{
        items: detailedItems,
        subtotal,
        totalQty,
        addItem,
        removeItem,
        setQty,
        clearCart,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}
