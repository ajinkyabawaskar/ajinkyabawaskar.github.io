import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Posts</h1>
      {categories.map(category => (
        <section key={category} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.3rem', marginBottom: '1rem' }}>
            {category}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {postsByCategory[category]?.map(post => (
              <li key={post.slug} style={{ marginBottom: '0.5rem' }}>
                <Link href={`/${category.toLowerCase()}/${post.slug}/`} style={{ textDecoration: 'underline' }}>
                  {post.title}
                </Link>
                <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.9rem' }}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}