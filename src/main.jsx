import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { PlantsProvider } from './context/PlantsContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import './styles/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlantsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </PlantsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
