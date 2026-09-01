#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'

const SITE_URL = 'https://ajinkyabawaskar.github.io'
const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const OUT_DIR = path.join(process.cwd(), 'out')

function slugFromFilename(filename) {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
}

function getAllPosts() {
  const posts = []
  const categories = fs.readdirSync(POSTS_DIR)

  for (const category of categories) {
    const categoryPath = path.join(POSTS_DIR, category)
    if (!fs.statSync(categoryPath).isDirectory()) continue

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const slug = slugFromFilename(file)
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

async function main() {
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Variable',
    description: 'A web log about programming, software, technology, life and my thoughts in general.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/assets/favicon.svg`,
    favicon: `${SITE_URL}/assets/favicon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ajinkya Bawaskar`,
    updated: posts.length > 0 ? new Date(posts[0].date) : new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
    author: {
      name: 'Ajinkya Bawaskar',
      email: 'ajinkyabawaskar2@gmail.com',
      link: SITE_URL,
    },
  })

  for (const post of posts) {
    const postUrl = `${SITE_URL}/${post.category.toLowerCase()}/${post.slug}/`
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.content.slice(0, 300).replace(/[#*`\[\]]/g, '') + '...',
      content: post.content,
      author: [
        {
          name: 'Ajinkya Bawaskar',
          email: 'ajinkyabawaskar2@gmail.com',
          link: SITE_URL,
        },
      ],
      date: new Date(post.date),
    })
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(OUT_DIR, 'feed.xml'), feed.rss2())
  console.log(`RSS feed generated at ${OUT_DIR}/feed.xml (${posts.length} items)`)
}

main().catch(console.error)