'use client'

import Link from 'next/link'

const HouseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,80H176V48a16,16,0,0,0-32,0V80H80a16,16,0,0,0-16,16v96a16,16,0,0,0,16,16h80v48a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V192h80a16,16,0,0,0,16-16V96A16,16,0,0,0,216,80ZM96,208H72V136h24Zm96,0H168V136h24Zm16-80H144V48a8,8,0,0,1,16,0V128Z"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M200,216a16,16,0,0,1-22.63-22.63l54.87-54.87H40a16,16,0,0,1,0-32h192.24l-54.87-54.86A16,16,0,1,1,200,40l80,80A16,16,0,0,1,200,216Z"/>
  </svg>
)

const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Z"/>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

export default function NotFound() {
  return (
    <div className="section-xl" style={{ minHeight: '70vh' }}>
      <div className="ambient-glow" aria-hidden="true" />

      <div className="content-width text-center">
        <div className="fade-in-up stagger-1">
          <span className="tag tag-red mb-6" style={{ fontSize: '11px' }}>
            <MagnifyingGlassIcon />
            404 Not Found
          </span>
        </div>

        <h1 className="fade-in-up stagger-2" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'var(--color-fg)',
          marginBottom: '1.5rem'
        }}>
          404
        </h1>

        <p className="fade-in-up stagger-3 lead mt-4 max-w-[40ch] mx-auto" style={{ color: 'var(--color-muted)' }}>
          The transmission you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="fade-in-up stagger-4 flex items-center justify-center gap-4 flex-wrap mt-10">
          <Link href="/" className="btn btn-primary">
            <HouseIcon />
            Return Home
          </Link>
          <Link href="/categories/" className="btn btn-secondary">
            <FolderIcon />
            Browse Archive
          </Link>
        </div>

        <div className="fade-in-up stagger-5 mt-12">
          <hr className="thick mb-8 mx-auto" style={{ maxWidth: '200px' }} aria-hidden="true" />
          <p className="meta">
            <kbd>←</kbd> Back
            <span className="mx-2" aria-hidden="true">·</span>
            <kbd>⌘</kbd>+<kbd>K</kbd> Search
          </p>
        </div>
      </div>
    </div>
  )
}