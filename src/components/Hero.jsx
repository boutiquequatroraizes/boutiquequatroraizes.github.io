export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Loja de paisagismo &amp; plantas</span>
          <h1>
            Quatro raízes,
            <br />
            <em>um jardim</em> só seu.
          </h1>
          <p className="lede">
            Selecionamos árvores nativas, plantas de sombra, temperos e suculentas em quatro
            frentes de cuidado. Cada planta chega com sua história — e um pouco de curiosidade
            para regar a conversa.
          </p>
          <div className="hero-ctas">
            <a href="#raiz-terra" className="btn btn-primary">
              Ver catálogo
            </a>
            <a href="#manifesto" className="btn btn-ghost">
              Conhecer as 4 raízes
            </a>
          </div>
        </div>
        <div>
          <svg
            className="root-art"
            viewBox="0 0 400 320"
            role="img"
            aria-label="Ilustração de uma raiz se dividindo em quatro caminhos"
          >
            <path className="trunk" pathLength="1" d="M200,300 L200,210" />
            <path className="b1" pathLength="1" d="M200,210 C150,180 95,145 55,85" />
            <path className="b2" pathLength="1" d="M200,210 C175,165 150,105 138,45" />
            <path className="b3" pathLength="1" d="M200,210 C225,165 250,105 262,45" />
            <path className="b4" pathLength="1" d="M200,210 C250,180 305,145 345,85" />
            <a href="#raiz-terra">
              <circle cx="55" cy="85" r="7" stroke="#9AC2A4" />
            </a>
            <a href="#raiz-sombra">
              <circle cx="138" cy="45" r="7" stroke="#CDB77D" />
            </a>
            <a href="#raiz-aroma">
              <circle cx="262" cy="45" r="7" stroke="#C98F5A" />
            </a>
            <a href="#raiz-pedra">
              <circle cx="345" cy="85" r="7" stroke="#B08B6E" />
            </a>
          </svg>
        </div>
      </div>
    </section>
  )
}
