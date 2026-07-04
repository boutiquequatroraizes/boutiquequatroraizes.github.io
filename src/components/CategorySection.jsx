import PlantCard from './PlantCard'

export default function CategorySection({ category, plants }) {
  const items = plants.filter((p) => p.category === category.id)

  return (
    <section className="categoria" id={category.id}>
      <div className="wrap">
        <div className="cat-head">
          <div>
            <span className="tag">
              {category.label} · {category.subtitle}
            </span>
            <h2>{category.subtitle}</h2>
          </div>
          <p>{category.description}</p>
        </div>

        {items.length > 0 ? (
          <div className="cards">
            {items.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#7a6a52', fontSize: '0.9rem' }}>
            Nenhuma planta cadastrada nesta categoria ainda.
          </p>
        )}
      </div>
    </section>
  )
}
