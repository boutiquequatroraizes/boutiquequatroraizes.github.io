import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong style={{ fontFamily: 'var(--f-display)' }}>Quatro Raízes</strong>
            <span className="admin-badge">Admin</span>
          </div>
          <nav className="admin-nav">
            <Link to="/admin">Estoque</Link>
            <Link to="/admin/plantas/nova">Nova planta</Link>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              Ver site
            </Link>
            <button onClick={logout}>Sair</button>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
