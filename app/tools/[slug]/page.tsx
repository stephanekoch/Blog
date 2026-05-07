import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  getSiteConfig, getTool, getToolSlugs, getEssay,
  formatDate, type ToolFrontmatter,
} from '@/lib/content'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getToolSlugs().map(slug => ({ slug }))
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params

  let tool
  try { tool = getTool(slug) } catch { notFound() }

  const config = getSiteConfig()
  const fm = tool.frontmatter as ToolFrontmatter

  let linkedEssay = null
  if (fm.linkedEssay) {
    try { linkedEssay = getEssay(fm.linkedEssay) } catch {}
  }

  const mdxComponents = {
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
  }

  return (
    <div className="wrap">
      <div className="tool-header">
        <Link href="/tools" className="back-link">← Tools</Link>
        <div className="tool-h1">{fm.title}</div>
        <div className="tool-meta-line">Published {formatDate(fm.date)}</div>
      </div>
      <div className="rule" />
      <div className="tool-body">
        <MDXRemote source={tool.content} components={mdxComponents} />
        {linkedEssay && (
          <div className="linked-card">
            <div className="linked-card-label">From the essay</div>
            <Link href={`/essays/${linkedEssay.slug}`} className="linked-card-title">
              {linkedEssay.frontmatter.title} →
            </Link>
          </div>
        )}
      </div>
      <div className="rule" />
      <Footer config={config} />
    </div>
  )
}
