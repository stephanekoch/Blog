import type { SiteConfig } from '@/lib/content'

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">Steph Koch-Yang</span>
        <div className="footer-links">
          <a href={config.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${config.email}`}>Contact</a>
        </div>
      </div>
    </footer>
  )
}
