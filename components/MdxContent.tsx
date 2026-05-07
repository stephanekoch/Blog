'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MdxContentProps {
  source: MDXRemoteSerializeResult
  components?: Record<string, React.ComponentType<unknown>>
}

export function MdxContent({ source, components }: MdxContentProps) {
  return <MDXRemote {...source} components={components} />
}
