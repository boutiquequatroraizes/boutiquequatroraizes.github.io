import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPlantForm from './pages/admin/AdminPlantForm'

// Rotas da loja pública ("/") e da área administrativa ("/admin/...").
// Nenhum componente público contém link para /admin — quem administra o
// site precisa conhecer a URL diretamente.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="plantas/nova" element={<AdminPlantForm />} />
        <Route path="plantas/:id/editar" element={<AdminPlantForm />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
