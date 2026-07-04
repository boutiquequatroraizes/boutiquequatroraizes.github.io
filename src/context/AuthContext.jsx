import { createContext, useContext, useState } from 'react'

// ATENÇÃO — login de demonstração:
// Este projeto é 100% front-end (sem servidor), então esta autenticação é
// básica: ela só serve para esconder a área /admin de visitantes casuais e
// evitar que ela seja indexada/linkada. Qualquer pessoa com um pouco de
// conhecimento técnico poderia inspecionar o código e encontrar a senha.
//
// Para um site real, com mais de um administrador ou dados sensíveis,
// troque isto por autenticação de verdade num backend (ex.: Firebase Auth,
// Supabase Auth, Auth0, ou seu próprio servidor com JWT).
//
// Troque o usuário e a senha abaixo antes de publicar o site:
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'quatroraizes2026'

const SESSION_KEY = 'qr_admin_session'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  )
  const [error, setError] = useState('')

  function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
      return true
    }
    setError('Usuário ou senha incorretos.')
    return false
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
