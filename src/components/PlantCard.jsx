import { useState } from 'react'
import CategoryIcon from './CategoryIcon'
import { useCart } from '../context/CartContext'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PlantCard({ plant }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const outOfStock = plant.stock <= 0
  const lowStock = plant.stock > 0 && plant.stock <= 5

  function handleAdd() {
    if (outOfStock) return
    addItem(plant.id, qty)
    setAdded(true)
    setQty(1)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="card">
      <div className="card-illus">
        {plant.image ? <img src={plant.image} alt={plant.name} /> : <CategoryIcon category={plant.category} />}
      </div>
      <div className="card-name-row">
        <div>
          <h3>{plant.name}</h3>
          <span className="latin">{plant.latinName}</span>
        </div>
        <span className="price">{currency.format(plant.price)}</span>
      </div>
      <p className="desc">{plant.description}</p>

      {plant.curiosity && (
        <details className="curio">
          <summary>Curiosidade</summary>
          <p className="curio-text">{plant.curiosity}</p>
        </details>
      )}

      <span className={`stock-line ${lowStock ? 'baixo' : ''}`}>
        {outOfStock ? 'Esgotado' : `${plant.stock} em estoque`}
      </span>

      <div className="card-foot">
        <div className="qty-stepper">
          <button type="button" aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span>{qty}</span>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQty((q) => Math.min(plant.stock || 1, q + 1))}
          >
            +
          </button>
        </div>
        <button type="button" className={`add-btn ${added ? 'added' : ''}`} onClick={handleAdd} disabled={outOfStock}>
          {outOfStock ? 'Esgotado' : added ? 'Adicionado ✦' : 'Adicionar'}
        </button>
      </div>
    </article>
  )
}
