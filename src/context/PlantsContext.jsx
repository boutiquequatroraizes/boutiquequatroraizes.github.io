import { createContext, useContext, useEffect, useState } from 'react'
import { seedPlants } from '../data/seedPlants'

// IMPORTANTE: neste projeto os dados são salvos em localStorage, ou seja,
// eles vivem no navegador de cada dispositivo. Isso é ótimo para desenvolver
// e customizar no VS Code, mas significa que o estoque cadastrado no seu
// notebook não aparece automaticamente no celular de outra pessoa.
// Para uma loja "de verdade" com vários administradores/dispositivos, o passo
// natural é trocar este context por chamadas a uma API/backend (Node, Firebase,
// Supabase etc.) — a interface (as funções abaixo) pode continuar igual.

const STORAGE_KEY = 'qr_plants_v1'

const PlantsContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Não foi possível ler o estoque salvo:', err)
  }
  return seedPlants
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
    } catch (err) {
      console.error('Não foi possível salvar o estoque:', err)
    }
  }, [plants])

  function addPlant(data) {
    let id = slugify(data.name)
    if (plants.some((p) => p.id === id)) {
      id = `${id}-${Math.floor(Math.random() * 1000)}`
    }
    const newPlant = { ...data, id }
    setPlants((prev) => [...prev, newPlant])
    return newPlant
  }

  function updatePlant(id, data) {
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  function deletePlant(id) {
    setPlants((prev) => prev.filter((p) => p.id !== id))
  }

  function getPlant(id) {
    return plants.find((p) => p.id === id)
  }

  return (
    <PlantsContext.Provider
      value={{ plants, addPlant, updatePlant, deletePlant, getPlant }}
    >
      {children}
    </PlantsContext.Provider>
  )
}

export function usePlants() {
  const ctx = useContext(PlantsContext)
  if (!ctx) throw new Error('usePlants precisa estar dentro de <PlantsProvider>')
  return ctx
}
