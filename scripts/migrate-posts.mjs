#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SOURCE_POSTS_DIR = path.join(process.cwd(), '_posts')
const TARGET_POSTS_DIR = path.join(process.cwd(), 'content/posts')

function slugifyCategory(cat) {
  return cat.toLowerCase()
}

function transformContent(content) {
  return content
    .replace(/\{\{\s*"(\/assets\/img\/[^"]+)"\s*\|\s*relative_url\s*\}\}/g, '$1')
    .replace(/\{:[^}]+\}/g, '')
}

function extractDateFromFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return match ? match[1] : '1970-01-01'
}

function main() {
  if (!fs.existsSync(SOURCE_POSTS_DIR)) {
    console.error('Source posts directory not found:', SOURCE_POSTS_DIR)
    process.exit(1)
  }

  fs.mkdirSync(TARGET_POSTS_DIR, { recursive: true })

  const categories = fs.readdirSync(SOURCE_POSTS_DIR)
  let totalMigrated = 0

  for (const category of categories) {
    const sourceCategoryPath = path.join(SOURCE_POSTS_DIR, category)
    if (!fs.statSync(sourceCategoryPath).isDirectory()) continue

    const targetCategory = slugifyCategory(category)
    const targetCategoryPath = path.join(TARGET_POSTS_DIR, targetCategory)
    fs.mkdirSync(targetCategoryPath, { recursive: true })

    const files = fs.readdirSync(sourceCategoryPath)
      .filter(f => f.endsWith('.markdown') || f.endsWith('.md'))

    for (const file of files) {
      const sourcePath = path.join(sourceCategoryPath, file)
      const content = fs.readFileSync(sourcePath, 'utf-8')
      const { data, content: body } = matter(content)

      const date = extractDateFromFilename(file)
      const transformedBody = transformContent(body)

      const newFrontMatter = {
        title: data.title,
        date,
        categories: [data.categories]
      }

      const output = matter.stringify(transformedBody, newFrontMatter)
      const targetFile = file.replace('.markdown', '.md')
      const targetPath = path.join(targetCategoryPath, targetFile)

      fs.writeFileSync(targetPath, output)
      totalMigrated++
      console.log(`Migrated: ${category}/${file} → ${targetCategory}/${targetFile}`)
    }
  }

  console.log(`\nMigration complete. ${totalMigrated} posts migrated.`)
}

main()