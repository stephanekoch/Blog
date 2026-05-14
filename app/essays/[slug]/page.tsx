import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  getSiteConfig, getEssay, getEssaySlugs, getTool,
  formatDate, estimateReadTime, extractHeadings,
  type EssayFrontmatter,
} from '@/lib/content'
import { EssaySidebar } from '@/components/EssaySidebar'
import { NavUpdater } from '@/components/NavUpdater'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getEssaySlugs().map(slug => ({ slug }))
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params

  let essay
  try { essay = getEssay(slug) } catch { notFound() }

  const config = getSiteConfig()
  const fm = essay.frontmatter as EssayFrontmatter
  const headings = extractHeadings(essay.content)
  const readTime = estimateReadTime(essay.content)

  let linkedTool = null
  if (fm.linkedTool) {
    try { linkedTool = getTool(fm.linkedTool) } catch {}
  }

  const mdxComponents = {
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = typeof children === 'string' ? children : ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 id={id} {...props}>{children}</h2>
    },
  }

  return (
    <>
      <NavUpdater headings={headings} isEssayPage />
      <div className="essay-layout">
        <EssaySidebar headings={headings} />
        <div className="essay-main">
          <div className="essay-h1">{fm.title}</div>
          <div className="essay-byline">
            Steph Koch-Yang
            <span className="item-dot" />
            {formatDate(fm.date)}
            <span className="item-dot" />
            {readTime} min read
          </div>
          <div className="rule" />
          <div className="essay-body" style={{ paddingTop: '22px' }}>
            <MDXRemote source={essay.content} components={mdxComponents} />
            {linkedTool && (
              <div className="linked-card">
                <div className="linked-card-label">Related tool</div>
                <Link href={`/tools/${linkedTool.slug}`} className="linked-card-title">
                  {linkedTool.frontmatter.title} →
                </Link>
                <div className="linked-card-desc">{linkedTool.frontmatter.excerpt}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="essay-footer-wrap">
        <div className="rule" />
        <Footer config={config} />
      </div>
    </>
  )
}
