import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import {
  BLOG_PAGE_SIZE,
  blogTrackLabels,
  getPublishedBlogPageCount,
  publishedArticles,
  type PublishedBlogArticle,
} from '@/content/blog/articles'
import { getBlogIndexMeta, SITE_URL, usePageMeta } from '@/lib/seo'
import Footer from '@/pages/home/Footer'

const trackAccent = {
  retailer: 'bg-[#2457d6]',
  consumer: 'bg-[#52525b]',
} satisfies Record<PublishedBlogArticle['contentTrack'], string>

const blogCollectionSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/th/blog#collection`,
      name: 'บทความมือถือ ธุรกิจ และเทคโนโลยีจาก PK HUB',
      description: 'ข่าว อัปเดต บทวิเคราะห์ และบทความเรื่องมือถือ เทคโนโลยี ราคา สต็อก เอกสาร และธุรกิจร้านมือถือ',
      url: `${SITE_URL}/th/blog`,
      inLanguage: 'th-TH',
    },
    {
      '@type': 'ItemList',
      itemListElement: publishedArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: `${SITE_URL}/th/blog/${article.slug}`,
      })),
    },
  ],
}

function articleHref(article: PublishedBlogArticle) {
  return `/th/blog/${article.slug}`
}

function ArticleMeta({ article }: { article: PublishedBlogArticle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#71717a]">
      <span className="inline-flex items-center gap-2">
        <span className={`h-2 w-2 ${trackAccent[article.contentTrack]}`} aria-hidden="true" />
        {blogTrackLabels[article.contentTrack]}
      </span>
      <span aria-hidden="true">·</span>
      <span>อ่าน {article.estimatedReadMinutes} นาที</span>
    </div>
  )
}

function LeadStory({ article }: { article: PublishedBlogArticle }) {
  return (
    <article className="group grid overflow-hidden border border-[#d4d4d8] bg-white lg:grid-cols-[minmax(0,1.2fr)_minmax(23rem,0.8fr)]">
      <a href={articleHref(article)} className="relative aspect-[16/10] overflow-hidden border-b border-[#d4d4d8] lg:aspect-auto lg:min-h-[28rem] lg:border-b-0 lg:border-r" aria-label={`อ่าน ${article.title}`}>
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:brightness-[0.94] motion-safe:group-hover:scale-[1.015]"
        />
      </a>
      <div className="grid content-center gap-5 p-6 sm:p-9 lg:p-11">
        <ArticleMeta article={article} />
        <h2 className="font-display text-[2.15rem] font-extrabold leading-[1.14] tracking-[-0.045em] sm:text-5xl lg:text-[3rem]">
          <a href={articleHref(article)} className="transition-colors hover:text-[#1946b8]">
            {article.title}
          </a>
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[#52525b] sm:text-lg sm:leading-8">{article.summary}</p>
        <a href={articleHref(article)} className="inline-flex w-fit items-center gap-2 border-b-2 border-[#2457d6] pb-1 font-bold transition-colors hover:border-[#1946b8] hover:text-[#1946b8]">
          อ่านบทความ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

function PriorityStory({ article, number }: { article: PublishedBlogArticle; number: number }) {
  return (
    <article className="group grid overflow-hidden border border-[#d4d4d8] bg-white sm:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1.2fr)]">
      <a href={articleHref(article)} className="relative aspect-[16/10] overflow-hidden border-b border-[#d4d4d8] sm:aspect-auto sm:min-h-[18rem] sm:border-b-0 sm:border-r" aria-label={`อ่าน ${article.title}`}>
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        />
        <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center bg-[#2457d6] font-display text-lg font-extrabold text-white" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
      </a>
      <div className="grid content-center gap-4 p-6 sm:p-7 lg:p-8">
        <ArticleMeta article={article} />
        <h2 className="font-display text-[1.65rem] font-extrabold leading-[1.24] tracking-[-0.035em] sm:text-3xl">
          <a href={articleHref(article)} className="transition-colors hover:text-[#1946b8]">
            {article.title}
          </a>
        </h2>
        <p className="line-clamp-3 text-sm leading-6 text-[#52525b] sm:text-base sm:leading-7">{article.summary}</p>
      </div>
    </article>
  )
}

function LibraryCard({ article }: { article: PublishedBlogArticle }) {
  return (
    <article className="group grid content-start border-t border-[#d4d4d8] pt-5">
      <a href={articleHref(article)} className="relative aspect-[16/10] overflow-hidden bg-[#ededf0]" aria-label={`อ่าน ${article.title}`}>
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:brightness-[0.93] motion-safe:group-hover:scale-[1.02]"
        />
      </a>
      <div className="grid gap-3 pt-5">
        <ArticleMeta article={article} />
        <h3 className="font-display text-[1.55rem] font-extrabold leading-[1.25] tracking-[-0.035em]">
          <a href={articleHref(article)} className="transition-colors hover:text-[#1946b8]">
            {article.title}
          </a>
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-[#52525b]">{article.summary}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs font-semibold text-[#52525b]">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag}>#{tag.replace(/\s/g, '')}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function BlogIndex() {
  const navigate = useNavigate()
  const { page } = useParams()
  const [searchParams] = useSearchParams()
  const routePage = Math.max(1, Number(page ?? 1) || 1)
  const pageMeta = useMemo(() => getBlogIndexMeta(routePage), [routePage])
  usePageMeta(pageMeta)
  const query = searchParams.get('q')?.trim() ?? ''
  const selectedTrack = searchParams.get('track') as PublishedBlogArticle['contentTrack'] | null
  const selectedTag = searchParams.get('tag') ?? ''
  const hasFilters = Boolean(query || selectedTrack || selectedTag)

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    publishedArticles.forEach((article) => article.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)))
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'th'))
      .slice(0, 7)
      .map(([tag]) => tag)
  }, [])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase('th')
    return publishedArticles.filter((article) => {
      const matchesTrack = !selectedTrack || article.contentTrack === selectedTrack
      const matchesTag = !selectedTag || article.tags.includes(selectedTag)
      const searchable = [article.title, article.summary, article.category, article.primaryKeyword, ...article.tags]
        .join(' ')
        .toLocaleLowerCase('th')
      return matchesTrack && matchesTag && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [query, selectedTag, selectedTrack])

  if (publishedArticles.length === 0) return <Navigate to="/th" replace />

  const pageCount = hasFilters ? Math.max(1, Math.ceil(filteredArticles.length / BLOG_PAGE_SIZE)) : getPublishedBlogPageCount()
  if (!hasFilters && routePage > pageCount) return <Navigate to="/th/blog" replace />

  const showHighlights = !hasFilters && routePage === 1
  const libraryArticles = hasFilters
    ? filteredArticles.slice(0, BLOG_PAGE_SIZE)
    : routePage === 1
      ? publishedArticles.slice(3, BLOG_PAGE_SIZE)
      : publishedArticles.slice((routePage - 1) * BLOG_PAGE_SIZE, routePage * BLOG_PAGE_SIZE)

  function updateFilters(name: 'q' | 'track' | 'tag', value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(name, value)
    else next.delete(name)
    navigate(`/th/blog${next.size ? `?${next.toString()}` : ''}`)
  }

  function clearFilters() {
    navigate('/th/blog')
  }

  return (
    <div id="top" className="min-h-dvh bg-white text-[#18181b]">
      <script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <Navbar />
      <main>
        <header className="border-b border-[#d4d4d8] bg-white py-10 sm:py-14 lg:py-16">
          <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.42fr)] lg:items-end">
            <div>
              <a href="/th" className="inline-flex items-center gap-2 text-xs font-bold text-[#52525b] transition-colors hover:text-black">
                <span className="h-2 w-2 bg-[#2457d6]" aria-hidden="true" /> PK HUB
              </a>
              <h1 className="mt-5 max-w-4xl font-display text-[2.7rem] font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-[4.25rem]">
                บทความมือถือ ธุรกิจ และเทคโนโลยี
              </h1>
            </div>
            <p className="max-w-xl border-l-2 border-[#2457d6] pl-5 text-base leading-7 text-[#52525b] sm:text-lg sm:leading-8">
              ข่าว อัปเดต เปรียบเทียบราคา และบทวิเคราะห์จากข้อมูลจริง พร้อมมุมที่ทั้งร้านค้าและคนใช้มือถืออ่านต่อได้
            </p>
          </Container>
        </header>

        {showHighlights && (
          <section aria-labelledby="highlight-heading" className="border-b border-[#d4d4d8] py-8 sm:py-10 lg:py-12">
            <Container>
              <div className="mb-6">
                <h2 id="highlight-heading" className="font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
                  บทความแนะนำ
                </h2>
              </div>
              <div className="grid gap-5">
                <LeadStory article={publishedArticles[0]} />
                <div className="grid gap-5 lg:grid-cols-2">
                  {publishedArticles.slice(1, 3).map((article, index) => (
                    <PriorityStory key={article.slug} article={article} number={index + 2} />
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        <section className="py-10 sm:py-14 lg:py-16" aria-labelledby="library-heading">
          <Container>
            <div className="grid gap-8 border-b border-[#d4d4d8] pb-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(22rem,0.3fr)] lg:items-end">
              <div>
                <p className="text-sm font-bold text-[#52525b]">คลังความรู้ PK HUB</p>
                <h2 id="library-heading" className="mt-1 font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
                  {hasFilters ? `พบ ${filteredArticles.length} บทความ` : routePage > 1 ? `บทความทั้งหมด — หน้า ${routePage}` : 'บทความทั้งหมด'}
                </h2>
                <div className="mt-5 flex flex-wrap gap-2" aria-label="เลือกกลุ่มเนื้อหา">
                  <button
                    type="button"
                    onClick={() => updateFilters('track', '')}
                    className={`border px-3 py-2 text-sm font-bold transition-colors ${!selectedTrack ? 'border-[#18181b] bg-[#18181b] text-white' : 'border-[#d4d4d8] bg-white hover:border-[#71717a]'}`}
                  >
                    ทั้งหมด
                  </button>
                  {(Object.entries(blogTrackLabels) as Array<[PublishedBlogArticle['contentTrack'], string]>).map(([track, label]) => (
                    <button
                      key={track}
                      type="button"
                      onClick={() => updateFilters('track', selectedTrack === track ? '' : track)}
                      className={`border px-3 py-2 text-sm font-bold transition-colors ${selectedTrack === track ? 'border-[#18181b] bg-[#18181b] text-white' : 'border-[#d4d4d8] bg-white hover:border-[#71717a]'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="relative block">
                <span className="sr-only">ค้นหาบทความ</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#71717a]" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateFilters('q', event.target.value)}
                  placeholder="ค้นหา เช่น สต็อก, VAT, IMEI"
                  className="h-12 w-full border border-[#a1a1aa] bg-white py-3 pl-12 pr-4 text-base outline-none transition-colors placeholder:text-[#71717a] focus:border-[#2457d6]"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#e4e4e7] py-5 text-sm">
              <span className="font-bold text-[#3f3f46]">หัวข้อยอดนิยม</span>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => updateFilters('tag', selectedTag === tag ? '' : tag)}
                  className={`border-b pb-0.5 font-semibold transition-colors ${selectedTag === tag ? 'border-[#2457d6] text-[#1946b8]' : 'border-transparent text-[#71717a] hover:border-[#a1a1aa] hover:text-[#18181b]'}`}
                >
                  #{tag.replace(/\s/g, '')}
                </button>
              ))}
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="ml-auto inline-flex items-center gap-1.5 font-bold text-[#9a312a] hover:text-[#6f211d]">
                  <X className="h-4 w-4" aria-hidden="true" /> ล้างตัวกรอง
                </button>
              )}
            </div>

            {libraryArticles.length ? (
              <div className="grid gap-x-6 gap-y-12 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {libraryArticles.map((article) => (
                  <LibraryCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="border-b border-[#d4d4d8] py-16 text-center">
                <h3 className="font-display text-2xl font-extrabold">ยังไม่พบบทความที่ตรงกับคำนี้</h3>
                <p className="mt-2 text-[#71717a]">ลองใช้คำสั้นลง หรือเลือกหัวข้ออื่น</p>
                <button type="button" onClick={clearFilters} className="mt-5 border-b-2 border-[#2457d6] pb-1 font-bold">
                  ดูบทความทั้งหมด
                </button>
              </div>
            )}

            {!hasFilters && pageCount > 1 && (
              <nav className="mt-14 flex items-center justify-center gap-2 border-t border-[#d4d4d8] pt-8" aria-label="หน้าบทความ">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <a
                    key={pageNumber}
                    href={pageNumber === 1 ? '/th/blog' : `/th/blog/page/${pageNumber}`}
                    aria-current={routePage === pageNumber ? 'page' : undefined}
                    className={`grid h-11 w-11 place-items-center border text-sm font-bold transition-colors ${routePage === pageNumber ? 'border-[#18181b] bg-[#18181b] text-white' : 'border-[#d4d4d8] hover:border-[#2457d6]'}`}
                  >
                    {pageNumber}
                  </a>
                ))}
              </nav>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
