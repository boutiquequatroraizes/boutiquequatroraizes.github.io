import SocialIcons from './SocialIcons'
import { CATEGORIES } from '../data/seedPlants'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <h3>Quatro Raízes</h3>
          <p>
            Loja de paisagismo e plantas. Cada espécie chega com cuidado, descrição e uma
            curiosidade para plantar junto.
          </p>
          <span className="tag" style={{ marginTop: 18, display: 'block' }}>
            Siga a Quatro Raízes
          </span>
          <SocialIcons />
        </div>
        <div>
          <span className="tag">Contato</span>
          <ul>
            <li>contato@quatroraizes.com.br</li>
            <li>(21) 99999-0000</li>
            <li>Rio de Janeiro, RJ</li>
          </ul>
        </div>
        <div>
          <span className="tag">Categorias</span>
          <ul>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a href={`#${cat.id}`}>{cat.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} Quatro Raízes. Todos os direitos reservados.</span>
        <span>Entrega em todo o Brasil</span>
      </div>
    </footer>
  )
}
