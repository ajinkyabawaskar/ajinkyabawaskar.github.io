import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const PAGES_DIR = path.join(process.cwd(), 'content/pages')

export interface Post {
  slug: string
  category: string
  title: string
  date: string
  content: string
}

export function getAllPosts(): Post[] {
  const posts: Post[] = []
  const categories = fs.readdirSync(POSTS_DIR)

  for (const category of categories) {
    const categoryPath = path.join(POSTS_DIR, category)
    if (!fs.statSync(categoryPath).isDirectory()) continue

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const slug = file.replace('.md', '')
      posts.push({
        slug,
        category,
        title: data.title || slug,
        date: data.date || '1970-01-01',
        content,
      })
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, category, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    category,
    title: data.title || slug,
    date: data.date || '1970-01-01',
    content,
  }
}

export function getAllCategories(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => fs.statSync(path.join(POSTS_DIR, f)).isDirectory())
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export interface PageContent {
  title: string
  content: string
}

export function getPage(slug: string): PageContent | null {
  const filePath = path.join(PAGES_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    title: data.title || slug,
    content,
  }
}