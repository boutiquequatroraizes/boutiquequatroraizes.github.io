import { CATEGORIES } from '../data/seedPlants'

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wrap">
        <h2>Por que quatro raízes?</h2>
        <div className="manifesto-cols">
          {CATEGORIES.map((cat) => (
            <div className="manifesto-item" key={cat.id}>
              <span className="tag">{cat.label}</span>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
