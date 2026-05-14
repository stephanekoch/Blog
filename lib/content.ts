import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export interface EssayFrontmatter {
  title: string
  date: string
  excerpt: string
  linkedTool?: string
}

export interface ToolFrontmatter {
  title: string
  date: string
  excerpt: string
  linkedEssay?: string
}

export interface ContentItem {
  slug: string
  frontmatter: EssayFrontmatter | ToolFrontmatter
  content: string
}

export interface SiteConfig {
  navTagline: string
  bioText: string
  bioText2: string
  linkedIn: string
  email: string
  logos: { name: string; file: string }[]
  aboutBody: string
}

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return matter(raw)
}

export function getSiteConfig(): SiteConfig {
  const { data, content } = readMdxFile(path.join(CONTENT_ROOT, 'config.mdx'))
  return {
    navTagline: data.navTagline ?? '',
    bioText: data.bioText ?? '',
    bioText2: data.bioText2 ?? '',
    linkedIn: data.linkedIn ?? '',
    email: data.email ?? '',
    logos: data.logos ?? [],
    aboutBody: content.trim(),
  }
}

function getSlugs(dir: string) {
  const full = path.join(CONTENT_ROOT, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter(f => f.endsWith('.mdx') && !f.startsWith('_'))
    .map(f => f.replace(/\.mdx$/, ''))
}

function getItem(dir: string, slug: string): ContentItem {
  const filePath = path.join(CONTENT_ROOT, dir, `${slug}.mdx`)
  const { data, content } = readMdxFile(filePath)
  return { slug, frontmatter: data as EssayFrontmatter & ToolFrontmatter, content }
}

function getAllItems(dir: string): ContentItem[] {
  return getSlugs(dir)
    .map(slug => getItem(dir, slug))
    .sort((a, b) => {
      const da = new Date(a.frontmatter.date).getTime()
      const db = new Date(b.frontmatter.date).getTime()
      return db - da
    })
}

export const getEssays = () => getAllItems('essays')
export const getEssay = (slug: string) => getItem('essays', slug)
export const getEssaySlugs = () => getSlugs('essays')

export const getTools = () => getAllItems('tools')
export const getTool = (slug: string) => getItem('tools', slug)
export const getToolSlugs = () => getSlugs('tools')

export function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function extractHeadings(content: string): { id: string; text: string }[] {
  const lines = content.split('\n')
  return lines
    .filter(l => l.startsWith('## '))
    .map(l => {
      const text = l.replace(/^## /, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { id, text }
    })
}
