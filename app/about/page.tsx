import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSiteConfig } from '@/lib/content'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export default function AboutPage() {
  const config = getSiteConfig()

  return (
    <div className="wrap">
      <div className="about-hero">
        <div className="about-name">Steph Koch-Yang</div>
        <div className="about-section-title">About</div>
        <div className="about-body">
          <MDXRemote source={config.aboutBody} />
        </div>
        <div className="about-section-title">Previously</div>
        <div className="logos-row">
          {config.logos.map(logo => {
            const logoPath = path.join(process.cwd(), 'public', 'images', 'logos', logo.file)
            const logoDarkPath = logo.fileDark ? path.join(process.cwd(), 'public', 'images', 'logos', logo.fileDark) : null
            const exists = fs.existsSync(logoPath)
            const existsDark = logoDarkPath ? fs.existsSync(logoDarkPath) : false
            return (
              <span key={logo.name} className="logo-pill">
                {exists ? (
                  <Image
                    src={`/images/logos/${logo.file}`}
                    alt={logo.name}
                    width={60}
                    height={20}
                    className="logo-light"
                    style={{ objectFit: 'contain', display: 'inline-block' }}
                  />
                ) : null}
                {existsDark ? (
                  <Image
                    src={`/images/logos/${logo.fileDark}`}
                    alt={logo.name}
                    width={60}
                    height={20}
                    className="logo-dark"
                    style={{ objectFit: 'contain', display: 'inline-block' }}
                  />
                ) : null}
                {!exists && !existsDark ? logo.name : null}
              </span>
            )
          })}
        </div>
      </div>
      <div className="rule" />
      <Footer config={config} />
    </div>
  )
}
