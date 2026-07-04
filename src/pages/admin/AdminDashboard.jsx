import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlants } from '../../context/PlantsContext'
import { CATEGORIES } from '../../data/seedPlants'
import CategoryIcon from '../../components/CategoryIcon'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function AdminDashboard() {
  const { plants, updatePlant, deletePlant } = usePlants()
  const [editingStock, setEditingStock] = useState({})

  const totalPlantas = plants.length
  const totalEstoque = plants.reduce((sum, p) => sum + Number(p.stock || 0), 0)
  const estoqueBaixo = plants.filter((p) => p.stock > 0 && p.stock <= 5).length
  const esgotadas = plants.filter((p) => p.stock <= 0).length

  function categoryLabel(id) {
    return CATEGORIES.find((c) => c.id === id)?.label || id
  }

  function handleStockChange(id, value) {
    setEditingStock((prev) => ({ ...prev, [id]: value }))
  }

  function saveStock(id) {
    const value = editingStock[id]
    if (value === undefined) return
    const parsed = Math.max(0, parseInt(value, 10) || 0)
    updatePlant(id, { stock: parsed })
    setEditingStock((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function handleDelete(id, name) {
    if (window.confirm(`Remover "${name}" do catálogo? Essa ação não pode ser desfeita.`)) {
      deletePlant(id)
    }
  }

  return (
    <div className="admin-content">
      <h1>Estoque</h1>
      <p className="admin-sub">Visão geral do catálogo e das quantidades disponíveis.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="tag">Plantas cadastradas</span>
          <div className="stat-value">{totalPlantas}</div>
        </div>
        <div className="stat-card">
          <span className="tag">Unidades em estoque</span>
          <div className="stat-value">{totalEstoque}</div>
        </div>
        <div className="stat-card">
          <span className="tag">Estoque baixo (≤ 5)</span>
          <div className="stat-value">{estoqueBaixo}</div>
        </div>
        <div className="stat-card">
          <span className="tag">Esgotadas</span>
          <div className="stat-value">{esgotadas}</div>
        </div>
      </div>

      <div className="admin-toolbar">
        <h2 style={{ fontSize: '1.1rem' }}>Catálogo</h2>
        <Link to="/admin/plantas/nova" className="btn btn-primary">
          + Nova planta
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr key={plant.id}>
                <td>
                  <div className="thumb">
                    {plant.image ? (
                      <img src={plant.image} alt={plant.name} />
                    ) : (
                      <CategoryIcon category={plant.category} />
                    )}
                  </div>
                </td>
                <td>
                  <strong>{plant.name}</strong>
                  <div className="tag" style={{ color: '#7a6a52', marginTop: 2 }}>
                    {plant.latinName}
                  </div>
                </td>
                <td>{categoryLabel(plant.category)}</td>
                <td>{currency.format(plant.price)}</td>
                <td>
                  <input
                    className="stock-input"
                    type="number"
                    min="0"
                    value={editingStock[plant.id] ?? plant.stock}
                    onChange={(e) => handleStockChange(plant.id, e.target.value)}
                    onBlur={() => saveStock(plant.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveStock(plant.id)}
                  />
                  {plant.stock > 0 && plant.stock <= 5 && <div className="badge-baixo">baixo</div>}
                  {plant.stock <= 0 && <div className="badge-baixo">esgotado</div>}
                </td>
                <td>
                  <div className="row-actions">
                    <Link to={`/admin/plantas/${plant.id}/editar`}>Editar</Link>
                    <button className="danger" onClick={() => handleDelete(plant.id, plant.name)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {plants.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: 30, color: '#7a6a52' }}>
                  Nenhuma planta cadastrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
