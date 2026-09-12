import { useEffect, useMemo, useState } from 'react'

import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'

import Container from '@/components/Container'
import FloatingContact from '@/components/FloatingContact'
import Navbar from '@/components/Navbar'
import PartnerForm from '@/components/PartnerForm'
import { getPublishedArticle } from '@/content/blog/articles'
import { SITE_URL, usePageMeta } from '@/lib/seo'
import Footer from '@/pages/home/Footer'

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function formatThaiDate(date: string) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(`${date}T00:00:00+07:00`))
}

function formatThaiBaht(value: number) {
  return `${new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(value)} บาท`
}

const EDITORIAL_ACCENTS = ['#7c5cff', '#3978e8', '#0aa77b']

function sectionAnchor(index: number) {
  return `section-${index + 1}`
}

function sectionTitle(heading: string) {
  return heading.replace(/^\d+\.\s*/, '')
}

function renderInlineBold(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`} className="font-bold text-[#24211e]">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function BlogArticle() {
  const { slug = '' } = useParams()
  const article = getPublishedArticle(slug)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight
      const next = remaining > 0 ? (window.scrollY / remaining) * 100 : 0
      setReadingProgress(Math.min(100, Math.max(0, next)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const meta = useMemo(
    () =>
      article
        ? {
        title: article.seoTitle,
        description: article.metaDescription,
        canonical: `${SITE_URL}/th/blog/${article.slug}`,
        ogType: 'article' as const,
        image: `${SITE_URL}${article.recommendedImage}`,
        imageAlt: article.imageAlt,
        locale: 'th_TH' as const,
        publishedTime: `${article.publishedAt}T00:00:00+07:00`,
        modifiedTime: `${article.modifiedAt}T00:00:00+07:00`,
          }
        : {
            title: 'ไม่พบบทความ | PK HUB',
            description: 'ไม่พบบทความที่ต้องการ',
            canonical: `${SITE_URL}/th/blog`,
            ogType: 'website' as const,
            locale: 'th_TH' as const,
          },
    [article],
  )

  usePageMeta(meta)

  if (!article) return <Navigate to="/th" replace />

  const articleUrl = `${SITE_URL}/th/blog/${article.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: [`${SITE_URL}${article.recommendedImage}`],
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    inLanguage: 'th-TH',
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Organization',
      name: 'ทีมบรรณาธิการ PK HUB',
      url: `${SITE_URL}/th`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PK HUB',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PK HUB', item: `${SITE_URL}/th` },
      { '@type': 'ListItem', position: 2, name: 'บทความ', item: `${SITE_URL}/th/blog` },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  }

  return (
    <div id="top" className="min-h-dvh bg-white text-[#1d1d1b]">
      <Navbar />
      <div
        role="progressbar"
        aria-label="ความคืบหน้าในการอ่าน"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readingProgress)}
        className="fixed left-0 top-[72px] z-40 h-1 bg-[#7c5cff] transition-[width] duration-150 motion-reduce:transition-none"
        style={{ width: `${readingProgress}%` }}
      />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />

        <header className="border-b border-[#e7ded2] bg-white">
          <Container className="py-10 sm:py-14 lg:py-16">
            <a href="/th/blog" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6f685f] transition-colors hover:text-[#171717]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> บทความทั้งหมด
            </a>

            <div className="mx-auto mt-8 grid max-w-5xl justify-items-center gap-6 text-center sm:mt-10">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#ded3c5] bg-white/60 px-3 py-2 text-xs font-bold text-[#514c45]">
                <span className="h-2 w-2 bg-[#06c755]" aria-hidden="true" />
                {article.category} · อ่านประมาณ {article.estimatedReadMinutes} นาที
              </div>
              <h1 className="font-display text-[2.55rem] font-extrabold leading-[1.12] tracking-[-0.05em] sm:text-6xl lg:text-[4.25rem]">
                {article.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5d5750] sm:text-xl sm:leading-9">{article.summary}</p>
              <div className="text-sm text-[#777067]">
                เขียนและตรวจทานโดยทีมบรรณาธิการ PK HUB · อัปเดต {formatThaiDate(article.modifiedAt)}
              </div>
            </div>

            <figure className="mx-auto mt-10 max-w-5xl sm:mt-12">
              <div className="editorial-accent-rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img
                src={article.recommendedImage}
                alt={article.imageAlt}
                width={article.imageWidth}
                height={article.imageHeight}
                decoding="async"
                className="aspect-[3/2] w-full object-cover sm:aspect-[16/7]"
              />
              <figcaption className="border-x border-b border-[#e2d8cc] bg-white px-4 py-3 text-sm leading-6 text-[#777067]">
                {article.imageCaption ?? 'สินค้าจริงที่จัดเตรียมสำหรับร้านค้า — ภาพจากทีม PK HUB'}
              </figcaption>
            </figure>
          </Container>
        </header>

        <Container className="py-12 sm:py-16 lg:py-20">
          <article className="mx-auto grid w-full min-w-0 max-w-[48rem] grid-cols-[minmax(0,1fr)] gap-12 text-[1.0625rem] leading-8 text-[#49443e] sm:gap-16 sm:text-lg sm:leading-9">
            <div className="grid gap-5 text-lg leading-8 text-[#49443e] sm:text-xl sm:leading-9">
              {article.introduction.map((paragraph) => <p key={paragraph}>{renderInlineBold(paragraph)}</p>)}
            </div>

            {article.disclaimer ? (
              <aside className="border-l-4 border-[#7c5cff] bg-[#f1ede7] px-5 py-5 text-base leading-7 text-[#49443e]">
                {article.disclaimer}
              </aside>
            ) : null}

            {article.pullQuote ? (
              <blockquote className="border-l-4 border-[#7c5cff] bg-[#f1ede7] px-6 py-6 font-display text-xl font-bold leading-8 text-[#24211e] sm:text-2xl sm:leading-9">
                {article.pullQuote}
              </blockquote>
            ) : null}

            <nav id="article-toc" aria-labelledby="article-toc-heading" className="scroll-mt-28 border-y border-[#ded4c8] py-8 sm:py-10">
              <h2 id="article-toc-heading" className="font-display text-3xl font-extrabold tracking-[-0.035em] text-[#1d1d1b] sm:text-4xl">
                สารบัญ
              </h2>
              <div className="mt-5 grid sm:grid-cols-2 sm:gap-x-10">
                {article.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#${sectionAnchor(index)}`}
                    className="group grid grid-cols-[2rem_1fr] gap-3 border-b border-[#e9e1d7] py-3 text-base font-semibold leading-6 text-[#4d4842] transition-colors hover:text-[#171717]"
                  >
                    <span className="font-display text-lg font-extrabold" style={{ color: EDITORIAL_ACCENTS[index % EDITORIAL_ACCENTS.length] }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                      {sectionTitle(section.heading)}
                    </span>
                  </a>
                ))}
              </div>
            </nav>

            {article.quickReference ? (
              <section className="grid gap-5">
                <div className="grid gap-2">
                  <h2 className="font-display text-3xl font-extrabold tracking-[-0.035em] text-[#1d1d1b] sm:text-4xl">
                    {article.quickReference.heading}
                  </h2>
                  {article.quickReference.description ? <p>{article.quickReference.description}</p> : null}
                </div>
                <div className="overflow-hidden border border-[#d9d0c4] bg-white">
                  <table className="w-full table-fixed border-collapse text-left text-[0.95rem] leading-6 sm:text-base">
                    <thead className="bg-[#24211e] text-white">
                      <tr>
                        <th scope="col" className="w-[32%] px-4 py-3 font-bold sm:w-[28%] sm:px-5">
                          {article.quickReference.labelHeading ?? 'หัวข้อ'}
                        </th>
                        <th scope="col" className="px-4 py-3 font-bold sm:px-5">
                          {article.quickReference.detailHeading ?? 'คำตอบที่ควรได้ก่อนสั่ง'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {article.quickReference.rows.map((row, index) => (
                        <tr key={row.label} className="border-t border-[#e4dcd2] align-top">
                          <th scope="row" className="bg-[#f1ede7] px-4 py-4 font-bold text-[#24211e] sm:px-5" style={{ borderLeft: `4px solid ${EDITORIAL_ACCENTS[index % EDITORIAL_ACCENTS.length]}` }}>
                            {row.label}
                          </th>
                          <td className="px-4 py-4 text-[#514c45] sm:px-5">{row.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <div className="grid gap-14 sm:gap-20">
              {article.sections.map((section, index) => {
                const accent = EDITORIAL_ACCENTS[index % EDITORIAL_ACCENTS.length]
                return (
                  <section id={sectionAnchor(index)} key={section.heading} className="min-w-0 scroll-mt-28 border-t border-[#ded4c8] pt-10 sm:pt-12">
                    <div className="mb-6 grid grid-cols-[2.75rem_1fr] items-start gap-4 sm:grid-cols-[3.25rem_1fr] sm:gap-5">
                      <div
                        className="flex h-11 w-11 items-center justify-center font-display text-lg font-extrabold text-white sm:h-12 sm:w-12 sm:text-xl"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </div>
                      <h2 className="font-display text-[1.8rem] font-extrabold leading-[1.25] tracking-[-0.035em] text-[#1d1d1b] sm:text-[2.45rem]">
                        {sectionTitle(section.heading)}
                      </h2>
                    </div>
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{renderInlineBold(paragraph)}</p>)}
                      {section.visual ? (
                        <figure className="my-3">
                          <img
                            src={section.visual.src}
                            alt={section.visual.alt}
                            width={section.visual.width}
                            height={section.visual.height}
                            loading="lazy"
                            decoding="async"
                            className="aspect-video w-full border border-[#ded4c8] object-cover"
                          />
                          <figcaption className="border-x border-b border-[#ded4c8] px-4 py-3 text-sm leading-6 text-[#777067]">
                            {section.visual.caption}
                          </figcaption>
                        </figure>
                      ) : null}
                      {section.pricingExamples ? (
                        <div className="my-3 border-y border-[#cfc5b8] py-7 sm:py-8">
                          <div className="grid gap-2">
                            <h3 className="font-display text-2xl font-extrabold leading-tight text-[#24211e] sm:text-3xl">
                              {section.pricingExamples.heading}
                            </h3>
                            <p className="text-sm leading-6 text-[#6f685f]">{section.pricingExamples.asOf}</p>
                          </div>
                          <div className="mt-7 grid gap-9 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-[#ded4c8]">
                            {section.pricingExamples.examples.map((example) => (
                              <div key={example.name} className="sm:first:pr-6 sm:last:pl-6">
                                <h4 className="font-display text-xl font-extrabold text-[#24211e]">{example.name}</h4>
                                <p className="mt-1 text-sm leading-6 text-[#6f685f]">{example.purpose}</p>
                                <table className="mt-4 w-full border-collapse text-sm leading-6">
                                  <thead>
                                    <tr className="border-b-2 border-[#24211e] text-left text-[#24211e]">
                                      <th scope="col" className="py-2 pr-3 font-bold">รุ่น</th>
                                      <th scope="col" className="py-2 pr-3 font-bold">บทบาท</th>
                                      <th scope="col" className="py-2 text-right font-bold">ราคาส่ง</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {example.rows.map((row) => (
                                      <tr key={`${example.name}-${row.model}`} className="border-b border-[#e5ddd3] align-top">
                                        <th scope="row" className="py-3 pr-3 text-left font-semibold text-[#34302c]">{row.model}</th>
                                        <td className="py-3 pr-3 text-[#6a635b]">{row.role}</td>
                                        <td className="whitespace-nowrap py-3 text-right font-semibold text-[#34302c]">{formatThaiBaht(row.wholesalePrice)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th scope="row" colSpan={2} className="pt-3 text-left font-extrabold text-[#24211e]">เงินค่าสินค้ารวม</th>
                                      <td className="whitespace-nowrap pt-3 text-right font-extrabold text-[#24211e]">{formatThaiBaht(example.total)}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            ))}
                          </div>
                          {section.pricingExamples.retailComparison ? (
                            <div className="mt-9 border-t border-[#ded4c8] pt-8">
                              <div className="max-w-2xl">
                                <h4 className="font-display text-2xl font-extrabold text-[#24211e]">
                                  {section.pricingExamples.retailComparison.heading}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-[#6f685f]">
                                  {section.pricingExamples.retailComparison.description}
                                </p>
                              </div>
                              <div className="mt-5 overflow-x-auto">
                                <table className="w-full min-w-[640px] border-collapse text-sm leading-6">
                                  <thead>
                                    <tr className="border-b-2 border-[#24211e] text-left text-[#24211e]">
                                      <th scope="col" className="py-3 pr-4 font-bold">รุ่น</th>
                                      <th scope="col" className="py-3 pr-4 text-right font-bold">ราคาส่ง PK HUB</th>
                                      <th scope="col" className="py-3 pr-4 text-right font-bold">ราคาปลีกอ้างอิง</th>
                                      <th scope="col" className="py-3 text-right font-bold">ส่วนต่างราคา</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {section.pricingExamples.retailComparison.rows.map((row) => {
                                      const spread = row.referenceRetailPrice - row.wholesalePrice
                                      return (
                                        <tr key={`retail-${row.model}`} className="border-b border-[#e5ddd3] align-top">
                                          <th scope="row" className="py-4 pr-4 text-left font-semibold text-[#34302c]">{row.model}</th>
                                          <td className="whitespace-nowrap py-4 pr-4 text-right text-[#514c45]">{formatThaiBaht(row.wholesalePrice)}</td>
                                          <td className="whitespace-nowrap py-4 pr-4 text-right text-[#514c45]">
                                            <a href={row.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-[#b9b3e3] underline-offset-4">
                                              {formatThaiBaht(row.referenceRetailPrice)}
                                            </a>
                                          </td>
                                          <td className="whitespace-nowrap py-4 text-right font-extrabold text-[#087a43]">+{formatThaiBaht(spread)}</td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr className="text-[#24211e]">
                                      <th scope="row" className="pt-4 pr-4 text-left font-extrabold">รวม 3 เครื่อง</th>
                                      <td className="whitespace-nowrap pt-4 pr-4 text-right font-bold">
                                        {formatThaiBaht(section.pricingExamples.retailComparison.rows.reduce((sum, row) => sum + row.wholesalePrice, 0))}
                                      </td>
                                      <td className="whitespace-nowrap pt-4 pr-4 text-right font-bold">
                                        {formatThaiBaht(section.pricingExamples.retailComparison.rows.reduce((sum, row) => sum + row.referenceRetailPrice, 0))}
                                      </td>
                                      <td className="whitespace-nowrap pt-4 text-right font-extrabold text-[#087a43]">
                                        +{formatThaiBaht(section.pricingExamples.retailComparison.rows.reduce((sum, row) => sum + row.referenceRetailPrice - row.wholesalePrice, 0))}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                              <p className="mt-5 text-sm leading-6 text-[#625c55]">
                                {renderInlineBold(section.pricingExamples.retailComparison.note)}
                              </p>
                            </div>
                          ) : null}
                          <p className="mt-7 border-l-2 border-[#7c5cff] pl-4 text-sm leading-6 text-[#625c55]">
                            {section.pricingExamples.note}
                          </p>
                        </div>
                      ) : null}
                      {section.bullets?.length ? (
                        <ul className="grid gap-3 border-l-2 bg-[#f5f1eb] px-5 py-5 pl-9 marker:text-[#7c5cff]" style={{ borderLeftColor: accent }}>
                          {section.bullets.map((bullet) => <li key={bullet} className="pl-1">{renderInlineBold(bullet)}</li>)}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                )
              })}
            </div>

            <section className="grid gap-4 border-l-4 border-[#06c755] bg-[#eaf8ef] p-6 sm:p-8">
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.035em] text-[#173222]">
                {article.conclusionHeading ?? 'สรุปก่อนตัดสินใจ'}
              </h2>
              {article.conclusion.map((paragraph) => <p key={paragraph}>{renderInlineBold(paragraph)}</p>)}
            </section>

            <nav aria-label="อ่านต่อในเว็บไซต์" className="grid border-y border-[#ded4c8] sm:grid-cols-2 sm:divide-x sm:divide-[#ded4c8]">
              {article.internalLinks.map((link, index) => (
                <a key={link.href} href={link.href} className="group flex items-center justify-between gap-4 py-5 font-semibold text-[#34302c] transition-colors hover:text-[#171717] sm:px-5 sm:first:pl-0 sm:last:pr-0">
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-colors" style={{ color: EDITORIAL_ACCENTS[index % EDITORIAL_ACCENTS.length] }} aria-hidden="true" />
                </a>
              ))}
            </nav>

            <section className="grid gap-4 border-t border-[#ded4c8] pt-8">
              <h2 className="font-display text-2xl font-extrabold text-[#1d1d1b]">แหล่งข้อมูล</h2>
              <ul className="grid gap-3 text-base leading-7 text-[#514c45]">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 font-semibold text-[#4f46b8] underline decoration-[#b9b3e3] underline-offset-4 transition-colors hover:text-[#342b87]">
                      {source.title} — {source.publisher}
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="partner-form" className="scroll-mt-24 border border-[#dcd6ff] bg-[#f4f2ff] text-[#24211e]">
              <div className="editorial-accent-rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="grid gap-6 p-6 sm:p-8">
                <div className="grid gap-3">
                  <h2 className="font-display text-3xl font-extrabold tracking-[-0.035em]">
                    {article.ctaHeading ?? 'ให้ทีม PK HUB ช่วยเช็กราคาและสต็อก'}
                  </h2>
                  <p className="max-w-2xl leading-7 text-[#5d586e]">
                    {article.ctaDescription ??
                      'ฝากชื่อร้าน จังหวัด เบอร์โทร และรุ่นหรืองบประมาณที่สนใจ ทีม PK HUB จะติดต่อกลับเพื่อช่วยตรวจตัวเลือก ราคา และสต็อกล่าสุด'}
                  </p>
                  <a
                    href={article.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 font-semibold text-[#087a43] underline decoration-[#65c58f] underline-offset-4 transition-colors hover:text-[#171717]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" /> ต้องการคำตอบเร็ว? {article.ctaLabel}
                  </a>
                </div>
                <PartnerForm />
              </div>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
