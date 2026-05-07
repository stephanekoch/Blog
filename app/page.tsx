import Link from 'next/link'
import { getSiteConfig, getEssays, getTools, formatDate, estimateReadTime } from '@/lib/content'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  const config = getSiteConfig()
  const essays = getEssays().slice(0, 4)
  const tools = getTools().slice(0, 3)

  return (
    <div className="wrap">
      <div className="section">
        <div className="section-label">Essays</div>
        {essays.map(e => (
          <Link key={e.slug} href={`/essays/${e.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="item-row">
              <div className="item-title">{e.frontmatter.title}</div>
              <div className="item-meta">
                {formatDate(e.frontmatter.date)}
                <span className="item-dot" />
                {estimateReadTime(e.content)} min
              </div>
            </div>
          </Link>
        ))}
        <Link href="/essays" className="all-link">All essays →</Link>
      </div>
      <div className="rule" />
      <div className="section">
        <div className="section-label">Tools</div>
        {tools.map(t => (
          <Link key={t.slug} href={`/tools/${t.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="item-row">
              <div className="item-title">{t.frontmatter.title}</div>
              <div className="item-meta">{formatDate(t.frontmatter.date)}</div>
            </div>
          </Link>
        ))}
        <Link href="/tools" className="all-link">All tools →</Link>
      </div>
      <div className="rule" />
      <div className="bio-section">
        <p className="bio-text">{config.bioText}</p>
      </div>
      <div className="rule" />
      <Footer config={config} />
    </div>
  )
}
