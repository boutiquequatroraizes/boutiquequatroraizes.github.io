import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { isAuthenticated, login, error } = useAuth()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/admin'
    return <Navigate to={from} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Área administrativa</h1>
        <p className="hint">Acesso restrito da equipe Quatro Raízes.</p>

        {error && <p className="form-error">{error}</p>}

        <div className="field">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Entrar
        </button>
      </form>
    </div>
  )
}
