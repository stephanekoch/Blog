import Link from 'next/link'
import { getSiteConfig, getEssays, formatDate, estimateReadTime } from '@/lib/content'
import { Footer } from '@/components/Footer'

export default function EssaysPage() {
  const config = getSiteConfig()
  const essays = getEssays()

  return (
    <div className="wrap">
      <div className="page-hero">
        <Link href="/" className="back-link">← Home</Link>
        <div className="page-title">Essays</div>
      </div>
      <div className="rule" />
      <div style={{ padding: '4px 0 0' }}>
        {essays.map(e => (
          <Link key={e.slug} href={`/essays/${e.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="list-row">
              <div className="lr-title">{e.frontmatter.title}</div>
              <div className="lr-excerpt">{e.frontmatter.excerpt}</div>
              <div className="lr-meta">
                {formatDate(e.frontmatter.date)}
                <span className="item-dot" />
                {estimateReadTime(e.content)} min read
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="rule" />
      <Footer config={config} />
    </div>
  )
}
