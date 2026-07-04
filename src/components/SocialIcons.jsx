// Troque os links abaixo pelos perfis reais da loja.
const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/quatroraizes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@quatroraizes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M15 3c.5 2.4 2.3 4.2 4.7 4.5" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@quatroraizes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M11 9.8v4.4l4-2.2z" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/quatroraizes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5v6M8 7.8v.2M12.5 16.5v-3.6c0-1.2.8-2 2-2s2 .8 2 2v3.6" />
      </svg>
    )
  }
]

export default function SocialIcons({ className = '' }) {
  return (
    <div className={`social-row ${className}`}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
