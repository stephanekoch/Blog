import Link from 'next/link'
import { getSiteConfig, getTools, formatDate } from '@/lib/content'
import { Footer } from '@/components/Footer'

export default function ToolsPage() {
  const config = getSiteConfig()
  const tools = getTools()

  return (
    <div className="wrap">
      <div className="page-hero">
        <Link href="/" className="back-link">← Home</Link>
        <div className="page-title">Tools</div>
      </div>
      <div className="rule" />
      <div style={{ padding: '4px 0 0' }}>
        {tools.map(t => (
          <Link key={t.slug} href={`/tools/${t.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="list-row">
              <div className="lr-title">{t.frontmatter.title}</div>
              <div className="lr-excerpt">{t.frontmatter.excerpt}</div>
              <div className="lr-meta">{formatDate(t.frontmatter.date)}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="rule" />
      <Footer config={config} />
    </div>
  )
}
