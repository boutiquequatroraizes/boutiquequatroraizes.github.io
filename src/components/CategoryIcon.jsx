// Ícone de linha simples usado quando a planta ainda não tem foto cadastrada.
// Fica fácil trocar por ilustrações melhores depois.
export default function CategoryIcon({ category }) {
  const common = { viewBox: '0 0 100 100', fill: 'none', strokeWidth: '2.2', strokeLinecap: 'round' }

  switch (category) {
    case 'raiz-terra':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 90 L50 45" />
          <path d="M50 55 C30 45 25 30 22 15" />
          <path d="M50 50 C65 42 72 28 76 14" />
          <circle cx="22" cy="15" r="4" fill="var(--flor)" stroke="none" />
          <circle cx="76" cy="14" r="4" fill="var(--flor)" stroke="none" />
          <circle cx="50" cy="20" r="4" fill="var(--flor)" stroke="none" />
        </svg>
      )
    case 'raiz-sombra':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 92 L50 55" />
          <path d="M50 60 C25 55 18 35 28 18 C34 30 40 40 50 45 C60 40 66 30 72 18 C82 35 75 55 50 60 Z" />
        </svg>
      )
    case 'raiz-aroma':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 90 L50 30" />
          <path d="M50 35 L40 25 M50 40 L38 32 M50 45 L36 40 M50 50 L34 48" />
          <path d="M50 35 L60 25 M50 40 L62 32 M50 45 L64 40 M50 50 L66 48" />
        </svg>
      )
    case 'raiz-pedra':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 55 C35 55 25 65 30 78 C40 72 45 65 50 55 Z" />
          <path d="M50 55 C65 55 75 65 70 78 C60 72 55 65 50 55 Z" />
          <circle cx="50" cy="48" r="7" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 90 L50 20" />
        </svg>
      )
  }
}
