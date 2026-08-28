import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { Metadata } from 'next'

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M56,216a16,16,0,0,0,22.63,22.63l54.87-54.87H216a16,16,0,0,0,0-32H133.5l54.87-54.86A16,16,0,0,0,56,40l80,80A16,16,0,0,0,56,216Z"/>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216ZM128,104a8,8,0,0,1,8,8v48a8,8,0,0,1-16,0V120a8,8,0,0,1,8-8Zm0,80a16,16,0,1,1-16-16A16,16,0,0,1,128,184Z"/>
  </svg>
)

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all posts by category.',
}

export default function CategoriesPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  const totalPosts = posts.length

  return (
    <div className="section-xl">
      <div className="ambient-glow" aria-hidden="true" />

      <header className="content-width mb-16">
        <h1 className="fade-in-up stagger-1">Categories</h1>
        <p className="lead mt-4 fade-in-up stagger-2 max-w-[50ch]">
          Index of all transmissions grouped by classification.
        </p>
        <div className="mt-8 flex items-center gap-4 flex-wrap fade-in-up stagger-3">
          <span className="tag tag-blue">
            <FolderIcon />
            {categories.length} Categories
          </span>
          <span className="tag tag-green">
            <BookOpenIcon />
            {totalPosts} Total Posts
          </span>
        </div>
      </header>

      <hr className="thick mb-16 content-width" aria-hidden="true" />

      {categories.length > 0 ? (
        <div className="content-width">
          <div className="bento-grid bento-grid-auto gap-6" role="list" aria-label="Category index">
            {categories.map((category, index) => {
              const catPosts = postsByCategory[category] || []
              const latestPost = catPosts[0]

              return (
                <article
                  key={category}
                  className="card fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 80 + 160, 800)}ms` }}
                  role="listitem"
                >
                  <Link href={`/${category.toLowerCase()}/`} className="block">
                    <header className="flex items-baseline justify-between gap-4 mb-6 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="tag tag-blue">
                          <FolderIcon />
                          {category}
                        </span>
                      </div>
                      <span className="meta flex items-center gap-1">
                        <BookOpenIcon />
                        {catPosts.length} {catPosts.length === 1 ? 'entry' : 'entries'}
                      </span>
                    </header>

                    <ul className="post-list mb-6" role="list">
                      {catPosts.slice(0, 4).map((post, postIndex) => (
                        <li key={post.slug} className="post-item" style={{ padding: postIndex === 0 ? '0 0 1rem' : '1rem 0 1rem' }}>
                          <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} className="post-link">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="post-title" style={{ fontSize: '1.0625rem' }}>
                                  {post.title}
                                </h3>
                                <time dateTime={post.date} className="meta flex items-center gap-1">
                                  <ClockIcon />
                                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                              </div>
                              <span className="flex items-center gap-1 text-[var(--color-muted-light)] transition-colors group-hover:text-[var(--color-fg)]" aria-hidden="true">
                                <ArrowRightIcon />
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {catPosts.length > 4 && (
                        <li className="post-item" style={{ border: 'none', paddingTop: '0.5rem', textAlign: 'right' }}>
                          <Link href={`/${category.toLowerCase()}/`} className="meta" style={{ color: 'var(--color-accent-blue-fg)' }}>
                            + {catPosts.length - 4} more entries
                            <ArrowRightIcon />
                          </Link>
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <span className="meta">
                        Latest: {latestPost ? new Date(latestPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </span>
                      <Link href={`/${category.toLowerCase()}/`} className="btn btn-ghost" style={{ padding: '0.5rem 0.75rem' }}>
                        View All
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="content-width text-center py-16 fade-in-up">
          <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <p className="meta mb-4">No categories found</p>
            <p>Transmissions will appear here once published.</p>
          </div>
        </div>
      )}
    </div>
  )
}