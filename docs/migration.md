## Plan: Integrate Pages CMS with Leeverage Next.js Project

**Overview:** Migrate your hardcoded content (properties, testimonials, FAQs, links) and existing blog posts into Pages CMS, creating a unified `.pages.yml` configuration that enables non-developers to manage all content types through a single UI. This involves creating a standardized content directory structure, configuring Pages CMS with field definitions matching your existing data types, and updating components to fetch from the new CMS-managed files instead of hardcoded arrays.

### Steps

1. **Create content directory structure** — Organize blog, properties, testimonials, FAQs, and navigation data into separate collections under a new `content/` directory, mirroring your existing field schemas (blog posts in `content/blog`, properties in `content/properties`, etc.).

2. **Create `.pages.yml` configuration file** — Define all 7 content types (blogs, properties, testimonials, featured properties, nav links, footer links, FAQs) with field definitions, media paths, and validation rules matching your TypeScript types in `src/types/`.

3. **Migrate existing blog posts from Markdown** — Convert the 9 blog posts in `markdown/blogs/` to the new CMS structure, preserving frontmatter fields (title, date, coverImage, author, authorImage, excerpt, detail, tag).

4. **Migrate hardcoded content to JSON/YAML files** — Convert properties (10), testimonials (2), featured properties (4), navigation links (5), footer links (6), and FAQs (3) from TypeScript arrays in `src/app/api/` into CMS-managed collection files.

5. **Update API routes and utilities** — Modify `src/utils/markdown.ts`, `src/app/api/propertyhomes.tsx`, `src/app/api/testimonial.tsx`, and other data sources to read from the new `content/` directory instead of hardcoded data.

6. **Update components to reference new data paths** — Ensure components like `src/components/Home/Properties/`, `src/components/Home/Blog/`, `src/components/Home/Testimonial/`, and FAQs pull from updated API routes.

7. **Test and deploy `.pages.yml` with sample content** — Push the configuration and migrated content to GitHub, connect your repo to Pages CMS, and verify the UI renders all content types correctly before going live.

### Implementation Decisions (SELECTED)

1. **Content file format** — **JSON** for consistency across all collections (blogs, properties, testimonials, etc.). This simplifies Pages CMS configuration and component parsing.

2. **Image management** — Use `public/media` for all CMS-uploaded images. Existing images remain in `public/images/` subdirectories. Update references as content is edited.

3. **Dynamic route optimization** — Add `generateStaticParams()` to property and blog detail pages for SSG after CMS migration.

---

## Detailed Implementation Guide

### Phase 1: Initial Setup

#### 1A. Pages CMS Account Setup

1. Go to **[https://pagescms.org](https://pagescms.org)** and click **Sign in with GitHub**
2. Authorize Pages CMS to access your GitHub account
3. Navigate to your Leeverage repository
4. Pages CMS will prompt you to install the GitHub App for write access
   - Click **Install** and confirm permissions
   - This allows Pages CMS to commit content changes directly to your repo

#### 1B. Create Content Directory Structure

Create the following folder structure in your repository root:

```
content/
├── blog/
│   ├── blog-1.json
│   ├── blog-2.json
│   └── ... (9 blog posts)
├── properties/
│   ├── serenity-height-villas.json
│   ├── mountain-retreat-villa.json
│   └── ... (10 properties)
├── testimonials/
│   ├── testimonial-1.json
│   └── testimonial-2.json
├── featured-properties/
│   ├── featured-1.json
│   ├── featured-2.json
│   ├── featured-3.json
│   └── featured-4.json
├── navigation/
│   └── nav-links.json
├── footer/
│   └── footer-links.json
└── faqs/
    └── faqs.json
```

### Phase 2: Create `.pages.yml` Configuration

#### 2A. `.pages.yml` File (Root Directory)

Create `.pages.yml` at your repository root with complete configuration for all 7 content types:

```yaml
# Pages CMS Configuration for Leeverage
media: public/media

content:
  # Blog Posts Collection
  - name: blog
    label: Blog Posts
    type: collection
    path: content/blog
    format: json
    view:
      fields: [title, date, author]
    fields:
      - name: title
        label: Title
        type: string
        required: true
      - name: slug
        label: Slug
        type: string
        required: true
        help: "URL-friendly name (e.g., home-buying-tips)"
      - name: excerpt
        label: Excerpt
        type: string
        required: true
        help: "Short summary for listing pages"
      - name: detail
        label: Content
        type: rich-text
        required: true
        help: "Full blog post content"
      - name: coverImage
        label: Cover Image
        type: image
        required: true
      - name: author
        label: Author Name
        type: string
        required: true
      - name: authorImage
        label: Author Image
        type: image
        required: true
      - name: date
        label: Publish Date
        type: date
        required: true
      - name: tag
        label: Category Tag
        type: string
        required: true
        options: ["Tip", "Guide", "News", "Tutorial"]

  # Properties Collection
  - name: properties
    label: Properties
    type: collection
    path: content/properties
    format: json
    view:
      fields: [name, location, rate]
    fields:
      - name: name
        label: Property Name
        type: string
        required: true
      - name: slug
        label: Slug
        type: string
        required: true
        help: "URL-friendly name (e.g., serenity-height-villas)"
      - name: location
        label: Location
        type: string
        required: true
      - name: rate
        label: Price
        type: string
        required: true
        help: "Format: '$1,250,000 per year'"
      - name: beds
        label: Bedrooms
        type: number
        required: true
      - name: baths
        label: Bathrooms
        type: number
        required: true
      - name: area
        label: Area (sq meters)
        type: number
        required: true
      - name: images
        label: Property Images
        type: object
        list: true
        required: true
        fields:
          - name: src
            label: Image URL
            type: image
            required: true

  # Testimonials Collection
  - name: testimonials
    label: Testimonials
    type: collection
    path: content/testimonials
    format: json
    view:
      fields: [name, position]
    fields:
      - name: review
        label: Review Text
        type: rich-text
        required: true
      - name: name
        label: Customer Name
        type: string
        required: true
      - name: position
        label: Position/Role
        type: string
        required: true
      - name: image
        label: Profile Image
        type: image
        required: true

  # Featured Properties Collection
  - name: featured-properties
    label: Featured Properties
    type: collection
    path: content/featured-properties
    format: json
    view:
      fields: [alt]
    fields:
      - name: src
        label: Featured Image
        type: image
        required: true
      - name: alt
        label: Alt Text
        type: string
        required: true

  # Navigation Links (Single File)
  - name: navigation
    label: Navigation
    type: document
    path: content/navigation/nav-links.json
    format: json
    fields:
      - name: links
        label: Navigation Links
        type: object
        list: true
        fields:
          - name: label
            label: Link Label
            type: string
            required: true
          - name: href
            label: URL
            type: string
            required: true

  # Footer Links (Single File)
  - name: footer
    label: Footer
    type: document
    path: content/footer/footer-links.json
    format: json
    fields:
      - name: links
        label: Footer Links
        type: object
        list: true
        fields:
          - name: label
            label: Link Label
            type: string
            required: true
          - name: href
            label: URL
            type: string
            required: true

  # FAQs (Single File)
  - name: faqs
    label: FAQs
    type: document
    path: content/faqs/faqs.json
    format: json
    fields:
      - name: items
        label: FAQ Items
        type: object
        list: true
        fields:
          - name: question
            label: Question
            type: string
            required: true
          - name: answer
            label: Answer
            type: rich-text
            required: true
```

---

### Phase 3: Migrate Content

#### 3A. Blog Posts Migration

**Example: `content/blog/home-buying-tips.json`**

```json
{
  "title": "Home buying tips",
  "slug": "home-buying-tips",
  "excerpt": "Essential tips for first-time home buyers",
  "detail": "Buying your first home is an exciting milestone. Here are key tips to guide your journey...",
  "coverImage": "/images/blog/blog-1.jpg",
  "author": "Arlene McCoy",
  "authorImage": "/images/users/arlene.jpg",
  "date": "2025-02-05",
  "tag": "Tip"
}
```

**Migration Steps:**
1. For each MDX file in `markdown/blogs/`:
   - Extract YAML frontmatter
   - Convert filename to kebab-case slug: `blog_1.mdx` → `home-buying-tips.json`
   - Extract markdown body into `detail` field
   - Save as JSON in `content/blog/`

#### 3B. Properties Migration

**Example: `content/properties/serenity-height-villas.json`**

```json
{
  "name": "Serenity height villas",
  "slug": "serenity-height-villas",
  "location": "Mumbai, India",
  "rate": "$1,250,000 per year",
  "beds": 4,
  "baths": 3,
  "area": 450,
  "images": [
    {
      "src": "/images/properties/property1/hero.jpg"
    },
    {
      "src": "/images/properties/property1/room1.jpg"
    }
  ]
}
```

#### 3C. Testimonials Migration

**Example: `content/testimonials/testimonial-1.json`**

```json
{
  "review": "Great service and excellent properties. Highly recommended!",
  "name": "John Smith",
  "position": "CEO, Tech Company",
  "image": "/images/users/john.jpg"
}
```

#### 3D. Featured Properties Migration

**Example: `content/featured-properties/featured-1.json`**

```json
{
  "src": "/images/properties/property1/featured.jpg",
  "alt": "Luxury villa in mountains"
}
```

#### 3E. Navigation Links Migration

**File: `content/navigation/nav-links.json`**

```json
{
  "links": [
    { "label": "Home", "href": "/" },
    { "label": "Properties", "href": "/properties" },
    { "label": "Hospitality", "href": "/hospitality" },
    { "label": "Services", "href": "/services" },
    { "label": "Contact", "href": "/contactus" }
  ]
}
```

#### 3F. Footer Links Migration

**File: `content/footer/footer-links.json`**

```json
{
  "links": [
    { "label": "Luxury Villas", "href": "/luxury-villa" },
    { "label": "Residential Homes", "href": "/residential-homes" },
    { "label": "Apartments", "href": "/appartment" },
    { "label": "Contact Us", "href": "/contactus" },
    { "label": "Blog", "href": "/blogs" },
    { "label": "Hospitality", "href": "/hospitality" }
  ]
}
```

#### 3G. FAQs Migration

**File: `content/faqs/faqs.json`**

```json
{
  "items": [
    {
      "question": "How do I purchase a property?",
      "answer": "Our sales team will guide you through the process. Contact us for detailed information."
    },
    {
      "question": "What payment options are available?",
      "answer": "We accept various payment methods including bank transfers, installments, and cryptocurrency."
    },
    {
      "question": "Are properties furnished?",
      "answer": "All our properties are sold unfurnished. Customization options are available."
    }
  ]
}
```

---

### Phase 4: Update API Routes & Utilities

#### 4A. Update `src/utils/markdown.ts`

**Before:**
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'markdown/blogs')

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  // ... existing code
}
```

**After:**
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export async function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(contentDirectory)
    const posts = fileNames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(contentDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(fileContent)
        return {
          ...data,
          slug: data.slug || filename.replace('.json', '')
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(contentDirectory, `${slug}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
```

#### 4B. Update `src/app/api/propertyhomes.tsx`

**Before:**
```typescript
export const propertyHomes = [
  {
    name: "Serenity height villas",
    slug: "serenity-height-villas",
    // ... hardcoded data
  },
  // ... more properties
]
```

**After:**
```typescript
import fs from 'fs'
import path from 'path'

const propertiesDirectory = path.join(process.cwd(), 'content/properties')

function loadProperties() {
  try {
    const fileNames = fs.readdirSync(propertiesDirectory)
    const properties = fileNames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(propertiesDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(fileContent)
      })
    return properties
  } catch (error) {
    console.error('Error loading properties:', error)
    return []
  }
}

export const propertyHomes = loadProperties()
```

#### 4C. Update `src/app/api/testimonial.tsx`

**Before:**
```typescript
export const testimonials = [
  {
    review: "Great service...",
    name: "John Doe",
    // ... hardcoded
  }
]
```

**After:**
```typescript
import fs from 'fs'
import path from 'path'

const testimonialDirectory = path.join(process.cwd(), 'content/testimonials')

function loadTestimonials() {
  try {
    const fileNames = fs.readdirSync(testimonialDirectory)
    const testimonials = fileNames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(testimonialDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(fileContent)
      })
    return testimonials
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return []
  }
}

export const testimonials = loadTestimonials()
```

#### 4D. Update `src/app/api/featuredproperty.tsx`

```typescript
import fs from 'fs'
import path from 'path'

const featuredDirectory = path.join(process.cwd(), 'content/featured-properties')

function loadFeaturedProperties() {
  try {
    const fileNames = fs.readdirSync(featuredDirectory)
    const featured = fileNames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(featuredDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(fileContent)
      })
    return featured
  } catch (error) {
    console.error('Error loading featured properties:', error)
    return []
  }
}

export const featuredProprty = loadFeaturedProperties()
```

#### 4E. Update `src/app/api/navlink.tsx`

```typescript
import fs from 'fs'
import path from 'path'

const navLinksPath = path.join(process.cwd(), 'content/navigation/nav-links.json')

function loadNavLinks() {
  try {
    const fileContent = fs.readFileSync(navLinksPath, 'utf8')
    const data = JSON.parse(fileContent)
    return data.links || []
  } catch (error) {
    console.error('Error loading nav links:', error)
    return []
  }
}

export const navlinks = loadNavLinks()
```

#### 4F. Update `src/app/api/footerlinks.tsx`

```typescript
import fs from 'fs'
import path from 'path'

const footerLinksPath = path.join(process.cwd(), 'content/footer/footer-links.json')

function loadFooterLinks() {
  try {
    const fileContent = fs.readFileSync(footerLinksPath, 'utf8')
    const data = JSON.parse(fileContent)
    return data.links || []
  } catch (error) {
    console.error('Error loading footer links:', error)
    return []
  }
}

export const footerlinks = loadFooterLinks()
```

---

### Phase 5: Update Components

#### 5A. Update FAQs Component

**File: `src/components/Home/FAQs/index.tsx`**

**Before:**
```typescript
const faqItems = [
  {
    question: "How do I purchase a property?",
    answer: "Our sales team..."
  },
  // ... hardcoded
]
```

**After:**
```typescript
import fs from 'fs'
import path from 'path'

const faqsPath = path.join(process.cwd(), 'content/faqs/faqs.json')

function loadFAQs() {
  try {
    const fileContent = fs.readFileSync(faqsPath, 'utf8')
    const data = JSON.parse(fileContent)
    return data.items || []
  } catch (error) {
    console.error('Error loading FAQs:', error)
    return []
  }
}

export default function FAQs() {
  const faqItems = loadFAQs()
  // ... rest of component
}
```

#### 5B. Add `generateStaticParams()` to Dynamic Routes

**File: `src/app/(site)/properties/[slug]/page.tsx`**

```typescript
import { propertyHomes } from '@/app/api/propertyhomes'

export async function generateStaticParams() {
  return propertyHomes.map((property) => ({
    slug: property.slug,
  }))
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  // ... existing code
}
```

**File: `src/app/(site)/blogs/[slug]/page.tsx`**

```typescript
import { getAllPosts } from '@/utils/markdown'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  // ... existing code
}
```

---

### Phase 6: Testing & Validation Checklist

- [ ] **Directory Structure**: Verify `content/` folder exists with all subdirectories
- [ ] **`.pages.yml` Syntax**: Validate YAML syntax (no indentation errors)
- [ ] **Content Files**: Ensure all JSON files are valid (use JSON validator online)
- [ ] **API Routes**: Run `npm run build` successfully with no TypeScript errors
- [ ] **Blog Listing**: Verify blogs load and sort by date descending
- [ ] **Blog Detail**: Test dynamic slug routes (e.g., `/blogs/home-buying-tips`)
- [ ] **Properties**: Check all 10 properties display on properties page
- [ ] **Property Detail**: Test property detail page with `generateStaticParams()`
- [ ] **Testimonials**: Verify testimonials render in carousel
- [ ] **Featured Properties**: Check featured section displays images
- [ ] **Navigation**: Verify header and footer links work
- [ ] **FAQs**: Test accordion expand/collapse functionality
- [ ] **Pages CMS UI**: Connect repo and verify all content types appear in editor
- [ ] **GitHub Commits**: Confirm Pages CMS commits changes to branch

---

### Phase 7: Deployment Steps

1. **Commit & Push Content Structure**
   ```bash
   git add content/ .pages.yml
   git commit -m "Add Pages CMS content structure and configuration"
   git push origin main
   ```

2. **Connect Repository to Pages CMS**
   - Go to https://pagescms.org
   - Select your Leeverage repo
   - Pages CMS will detect `.pages.yml` automatically
   - Verify all content types appear in the editor interface

3. **Test CMS UI**
   - Add a new blog post via Pages CMS
   - Edit an existing property
   - Verify changes commit to GitHub

4. **Deploy to Production**
   - Merge to main branch
   - Trigger your deployment pipeline
   - Verify content loads on live site

---

### Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Pages CMS doesn't detect config | Ensure `.pages.yml` is at repository root, not in subdirectory |
| "Cannot read properties from undefined" | Verify JSON syntax in content files (valid JSON required) |
| Images not loading | Check image paths are correct (relative to public folder) |
| Build fails with TypeScript errors | Ensure all API files have proper imports and type definitions |
| Dynamic routes don't generate | Verify `generateStaticParams()` is exported from route files |
| FAQs not rendering | Check `content/faqs/faqs.json` has `items` array at root level |
| Navigation links missing | Verify `content/navigation/nav-links.json` has `links` array |

---

### Summary of Changes

| File/Component | Change | Impact |
|---|---|---|
| `.pages.yml` | NEW | Enables Pages CMS management of all content types |
| `content/` directory | NEW | Houses all CMS-managed content files (JSON) |
| `src/utils/markdown.ts` | UPDATED | Reads from `content/blog/` instead of `markdown/blogs/` |
| `src/app/api/propertyhomes.tsx` | UPDATED | Loads properties from `content/properties/` |
| `src/app/api/testimonial.tsx` | UPDATED | Loads testimonials from `content/testimonials/` |
| `src/app/api/featuredproperty.tsx` | UPDATED | Loads featured properties from `content/featured-properties/` |
| `src/app/api/navlink.tsx` | UPDATED | Loads nav links from `content/navigation/nav-links.json` |
| `src/app/api/footerlinks.tsx` | UPDATED | Loads footer links from `content/footer/footer-links.json` |
| `src/components/Home/FAQs/index.tsx` | UPDATED | Loads FAQs from `content/faqs/faqs.json` |
| Dynamic route files | UPDATED | Added `generateStaticParams()` for SSG optimization |



---

## Research Findings: Content Structure & Components

### Current Content File Structure & Locations

**Blog Content:**
- Location: `markdown/blogs/`
- Format: MDX files with YAML frontmatter
- Files: 9 blog files (blog_1.mdx through blog_9.mdx)

**Other Content Types:**
- Properties: Hardcoded in `src/app/api/propertyhomes.tsx` (10 properties listed)
- Testimonials: Hardcoded in `src/app/api/testimonial.tsx` (2 testimonials listed)
- Featured Properties: Hardcoded in `src/app/api/featuredproperty.tsx` (4 items listed)
- Navigation Links: Hardcoded in `src/app/api/navlink.tsx` (5 nav items)
- Footer Links: Hardcoded in `src/app/api/footerlinks.tsx` (6 footer items)
- FAQs: Hardcoded in `src/components/Home/FAQs/index.tsx` (3 FAQ items)

### Data Types & Field Names

**Blog Posts** (from `src/types/blog.ts`):
```typescript
{
  id?: number
  title?: string
  slug?: string
  excerpt?: string
  coverImage?: string
  date: string
  tag: string
  detail: string
  author?: string
  authorImage?: string
}
```

**Blog MDX Frontmatter Example:**
```yaml
title: Home buying tips
excerpt: Home buying tips
date: 2025-02-05
coverImage: /images/blog/blog-1.jpg
author: Arlene McCoy
authorImage: /images/users/arlene.jpg
detail: Buying your first home is an exciting milestone...
tag: Tip
```

**Properties** (from `src/types/properyHomes.ts`):
```typescript
{
  name: string
  slug: string
  location: string
  rate: string
  beds: number
  baths: number
  area: number
  images: PropertyImage[]
}

interface PropertyImage {
  src: string
}
```
- 10 properties currently stored

**Testimonials** (from `src/types/testimonial.ts`):
```typescript
{
  review: string
  name: string
  position: string
  image: string
}
```
- 2 testimonials currently stored

**Featured Properties** (from `src/types/featuredProperty.ts`):
```typescript
{
  scr: string
  alt: string
}
```
- 4 featured properties currently stored

**Navigation Links** (from `src/types/navlink.ts`):
```typescript
{
  label: string
  href: string
}
```
- 5 nav links

**Footer Links** (from `src/types/footerlinks.ts`):
```typescript
{
  label: string
  href: string
}
```
- 6 footer links

**FAQs** (Hardcoded - no separate type file):
- 3 FAQ items with question/answer structure

### How Components Currently Load & Render Content

**Blog Loading Pipeline:**
- File: `src/app/(site)/blogs/page.tsx`
- Uses: `getAllPosts()` function from `src/utils/markdown.ts`
- Process: Reads from `markdown/blogs/`, parses MDX frontmatter, extracts fields, sorts by date descending
- Renders via `Blog` component

**Blog Detail Page:**
- File: `src/app/(site)/blogs/[slug]/page.tsx`
- Uses: `getPostBySlug()` and `markdownToHtml()` from markdown utils
- Converts markdown to HTML using `remark` and `rehype` libraries

**Properties Loading:**
- File: `src/app/(site)/properties/page.tsx`
- Direct import: `import { propertyHomes } from '@/app/api/propertyhomes'`
- Maps all 10 properties to card component

**Properties Detail Page:**
- File: `src/app/(site)/properties/[slug]/page.tsx`
- Uses slug matching to find property

**Testimonials Loading:**
- File: `src/components/Home/Testimonial/index.tsx`
- Direct import: `import { testimonials } from '@/app/api/testimonial'`
- Rendered in carousel component

**Featured Properties Loading:**
- File: `src/components/Home/FeaturedProperty/index.tsx`
- Direct import: `import { featuredProprty } from '@/app/api/featuredproperty'`

**Navigation & Footer:**
- Direct imports from API files
- Static on all pages

**FAQs:**
- Hardcoded in component
- Accordion component from shadcn/ui

### Content Type Summary for CMS

1. **Blog Posts** — Currently in `markdown/blogs/` (9 posts)
   - Fields: title, excerpt, date, coverImage, author, authorImage, detail, tag, content
   
2. **Properties** — Hardcoded in `src/app/api/propertyhomes.tsx` (10 items)
   - Fields: name, slug, location, rate, beds, baths, area, images
   
3. **Testimonials** — Hardcoded in `src/app/api/testimonial.tsx` (2 items)
   - Fields: review, name, position, image
   
4. **Featured Properties** — Hardcoded in `src/app/api/featuredproperty.tsx` (4 items)
   - Fields: src, alt
   
5. **Navigation Links** — Hardcoded in `src/app/api/navlink.tsx` (5 items)
   - Fields: label, href
   
6. **Footer Links** — Hardcoded in `src/app/api/footerlinks.tsx` (6 items)
   - Fields: label, href
   
7. **FAQs** — Hardcoded in `src/components/Home/FAQs/index.tsx` (3 items)
   - Fields: question, answer
