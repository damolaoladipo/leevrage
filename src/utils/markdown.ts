import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
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

export async function getAllPosts(): Promise<BlogPost[]> {
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
        } as BlogPost
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
