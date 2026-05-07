# Steph Koch-Yang — Site Handoff

## The sentence to paste into Claude Code

> "Build this as a Next.js site with Tailwind CSS and the Lora + Inter Google Fonts.
> Use the file at design/prototype.html as the complete design spec — match it exactly,
> including all spacing, typography, colours, light/dark mode, scroll behaviour (tagline
> fades on scroll, nav stays sticky), and the essay sidebar with sticky Contents + back arrow.
> Set up MDX for content with these folders: content/essays, content/tools, and content/config.mdx.
> Each essay MDX file should auto-generate a page at /essays/[slug].
> Each tool MDX file should auto-generate a page at /tools/[slug].
> Use the frontmatter fields in the template files: title, date, excerpt, and optionally
> linkedEssay or linkedTool. The linked cross-references should render as the grey card
> shown at the bottom of essay and tool pages in the prototype.
> All site-wide text (nav tagline, bio, About page content, LinkedIn URL, email, and logo list)
> must be read from content/config.mdx — never hardcoded.
> Logos are stored in public/images/logos/ and referenced by filename from config.mdx.
> On mobile, the essay sidebar is hidden and replaced by a Contents button in the nav.
> Deploy to Vercel connected to GitHub — every push to main should auto-deploy."


## Tech stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Fonts: Lora (serif) + Inter (sans) via Google Fonts
- Content: MDX with gray-matter frontmatter
- Deployment: Vercel + GitHub


## What lives where

| What you want to change        | File to edit                          |
|-------------------------------|---------------------------------------|
| Nav tagline                   | content/config.mdx                    |
| About page text               | content/config.mdx                    |
| Bio text (homepage bottom)    | content/config.mdx                    |
| LinkedIn / email links        | content/config.mdx                    |
| Company logos (About page)    | content/config.mdx + public/images/logos/ |
| New essay                     | content/essays/your-title.mdx         |
| New tool                      | content/tools/your-title.mdx          |
| Design / layout changes       | Ask Claude Code, referencing design/prototype.html |


## Your content workflow

### Writing a new essay
1. Duplicate content/essays/_template.mdx
2. Rename: your-essay-title.mdx (lowercase, hyphens)
3. Fill in the frontmatter (title, date, excerpt, optional linkedTool)
4. Write using ## for section headings
5. Git push → live at /essays/your-essay-title in ~30 seconds

### Writing a new tool
1. Duplicate content/tools/_template.mdx
2. Rename: your-tool-name.mdx
3. Fill in the frontmatter (title, date, excerpt, optional linkedEssay)
4. Write the description, then ask Claude Code to build the interactive component
5. Git push → live at /tools/your-tool-name

### Updating site-wide text
1. Open content/config.mdx in TextEdit
2. Edit any field between the --- lines or the About page body text below
3. Save → git push → live in ~30 seconds

### Adding a logo
1. Save the SVG (or PNG) file into public/images/logos/
2. Add an entry in content/config.mdx under logos:
     - name: Company Name
       file: company-name.svg
3. Git push → done


## Folder structure
/
├── app/
│   ├── page.tsx                  ← homepage
│   ├── essays/
│   │   ├── page.tsx              ← essays list
│   │   └── [slug]/page.tsx       ← single essay
│   ├── tools/
│   │   ├── page.tsx              ← tools list
│   │   └── [slug]/page.tsx       ← single tool
│   └── about/
│       └── page.tsx              ← about page
├── components/
│   ├── Nav.tsx
│   ├── EssaySidebar.tsx
│   ├── ToolEmbed.tsx
│   └── ToolInteractive.tsx
├── content/
│   ├── config.mdx                ← EDIT THIS for site-wide text
│   ├── essays/                   ← DROP ESSAYS HERE
│   │   └── _template.mdx
│   └── tools/                    ← DROP TOOLS HERE
│       └── _template.mdx
├── public/
│   └── images/
│       └── logos/                ← DROP LOGO FILES HERE
│           └── README.txt
└── design/
    └── prototype.html            ← design spec (do not delete)
