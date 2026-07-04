import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlants } from '../../context/PlantsContext'
import { CATEGORIES } from '../../data/seedPlants'
import CategoryIcon from '../../components/CategoryIcon'

const emptyForm = {
  name: '',
  latinName: '',
  category: CATEGORIES[0].id,
  price: '',
  stock: '',
  image: null,
  description: '',
  curiosity: ''
}

// Aviso importante sobre as fotos: elas são convertidas para base64 e salvas
// junto com o restante dos dados em localStorage. Isso funciona bem para um
// catálogo pequeno, mas o localStorage tem um limite de alguns MB por
// navegador. Para uma loja com muitas fotos em alta resolução, o próximo
// passo é subir as imagens para um serviço de armazenamento (ex.: Cloudinary,
// S3, Supabase Storage) e salvar apenas a URL aqui.
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AdminPlantForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const { getPlant, addPlant, updatePlant } = usePlants()

  const [form, setForm] = useState(emptyForm)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (isEditing) {
      const existing = getPlant(id)
      if (existing) {
        setForm({ ...existing, price: String(existing.price), stock: String(existing.stock) })
      } else {
        setNotFound(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    update('image', dataUrl)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      name: form.name.trim(),
      latinName: form.latinName.trim(),
      category: form.category,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      image: form.image || null,
      description: form.description.trim(),
      curiosity: form.curiosity.trim()
    }

    if (isEditing) {
      updatePlant(id, payload)
    } else {
      addPlant(payload)
    }
    navigate('/admin')
  }

  if (notFound) {
    return (
      <div className="admin-content">
        <p>Planta não encontrada.</p>
      </div>
    )
  }

  return (
    <div className="admin-content">
      <h1>{isEditing ? 'Editar planta' : 'Nova planta'}</h1>
      <p className="admin-sub">
        {isEditing ? 'Atualize as informações e salve.' : 'Preencha os dados para adicionar ao catálogo.'}
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Foto</label>
          <div className="image-preview">
            {form.image ? <img src={form.image} alt="Pré-visualização" /> : <CategoryIcon category={form.category} />}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Nome popular</label>
            <input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="latinName">Nome científico</label>
            <input
              id="latinName"
              value={form.latinName}
              onChange={(e) => update('latinName', e.target.value)}
              placeholder="Ex.: Monstera deliciosa"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="category">Categoria (raiz)</label>
            <select id="category" value={form.category} onChange={(e) => update('category', e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} — {cat.subtitle}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="price">Preço (R$)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
            />
          </div>
        </div>

        <div className="field" style={{ maxWidth: 200 }}>
          <label htmlFor="stock">Estoque (unidades)</label>
          <input
            id="stock"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={(e) => update('stock', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            required
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="curiosity">Curiosidade</label>
          <textarea
            id="curiosity"
            value={form.curiosity}
            onChange={(e) => update('curiosity', e.target.value)}
            placeholder="Um fato interessante sobre a planta"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Salvar alterações' : 'Adicionar planta'}
          </button>
          <button type="button" className="btn btn-ghost" style={{ color: 'var(--raiz)', borderColor: 'rgba(42,31,22,0.3)' }} onClick={() => navigate('/admin')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
