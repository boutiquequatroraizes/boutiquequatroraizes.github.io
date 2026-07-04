import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { CATEGORIES } from '../data/seedPlants'

// Observação: propositalmente NÃO existe nenhum link para /admin aqui.
// A área administrativa só é acessada por quem digitar a URL diretamente.
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalQty, setIsOpen } = useCart()

  return (
    <header className="site-nav">
      <div className="wrap nav-row">
        <a href="#top" className="brand">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20,34 L20,20" stroke="var(--musgo)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M20,20 C12,16 8,10 6,4" stroke="var(--musgo)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M20,20 C16,14 14,8 15,2" stroke="var(--terra)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M20,20 C24,14 26,8 25,2" stroke="var(--flor)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M20,20 C28,16 32,10 34,4" stroke="var(--raiz)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <span className="brand-name">Quatro Raízes</span>
        </a>

        <nav className={`cat-links ${menuOpen ? 'open' : ''}`} id="catLinks">
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} onClick={() => setMenuOpen(false)}>
              {cat.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="catLinks"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menu
          </button>
          <button className="cart-btn" onClick={() => setIsOpen(true)} aria-haspopup="dialog">
            Carrinho <span className="cart-count">{totalQty}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
