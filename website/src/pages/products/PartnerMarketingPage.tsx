import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Grid3X3,
  Image as ImageIcon,
  Palette,
  X,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import AnimatedNumber from '@/components/pkhub-v7/AnimatedNumber'
import { APPROVED_METRICS } from '@/content/metrics'
import { useLanguage } from '@/i18n/LanguageContext'
import { PARTNER_MARKETING_META, usePageMeta } from '@/lib/seo'
import { CONTACT } from '@/pages/home/constants'
import Footer from '@/pages/home/Footer'
import PartnerStartSection from '@/pages/home/PartnerStartSection'

const POSTS = [
  { id: 0, title: 'ซื้อ 1 แถม 1', titleEn: 'Buy 1 Get 1 Free' },
  { id: 1, title: 'SIM Flash Sale', titleEn: 'SIM Flash Sale' },
  { id: 2, title: 'Black Friday', titleEn: 'Black Friday' },
  { id: 3, title: '10.10 ดีลคู่ร้าน', titleEn: '10.10 Merchant Deals' },
  { id: 4, title: 'เปิดเทอม พร้อมเรียน', titleEn: 'Back to School' },
  { id: 5, title: 'New Arrival รุ่นใหม่มาแล้ว', titleEn: 'New Arrival Just Landed' },
  { id: 6, title: 'Mid Month Deal', titleEn: 'Mid Month Deal' },
  { id: 7, title: 'Payday Sale', titleEn: 'Payday Sale' },
  { id: 8, title: 'Weekend Special', titleEn: 'Weekend Special' },
]

const HIGHLIGHTS = [
  { name: 'โปรวันนี้', nameEn: 'Today Deals', index: 0 },
  { name: 'ซิม', nameEn: 'SIMs', index: 1 },
  { name: 'รุ่นใหม่', nameEn: 'New Models', index: 5 },
  { name: 'ดีลพิเศษ', nameEn: 'Special Deals', index: 2 },
]

const pos = (i: number) => `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`

export default function PartnerMarketingPage() {
  const { isThai, language } = useLanguage()
  usePageMeta(PARTNER_MARKETING_META[language])
  const [following, setFollowing] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const postCloseButtonRef = useRef<HTMLButtonElement>(null)

  const openPost = (index: number, triggerEl?: HTMLElement) => {
    lastTriggerRef.current = triggerEl ?? (document.activeElement as HTMLElement) ?? null
    setSelectedPost(index)
  }

  const closePost = () => {
    setSelectedPost(null)
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus({ preventScroll: true })
    })
  }

  useEffect(() => {
    if (selectedPost === null) return

    requestAnimationFrame(() => {
      postCloseButtonRef.current?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closePost()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        postCloseButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPost])

  return (
    <div id="pk-home-v7" className="min-h-dvh bg-white text-[#252720] is-marketing">
      <a href="#main-content" className="pk-skip-link">
        Skip to content / ข้ามไปเนื้อหา
      </a>

      <div id="top" className="v4-page">
        <Navbar />

        {/* Backbar */}
        <div className="v6-backbar" style={{ display: 'flex' }}>
          <a
            href={`/${language}`}
            className="v4-text-action cursor-interaction flex items-center gap-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{isThai ? 'กลับหน้าแรก' : 'Back to Home'}</span>
          </a>
          <span className="v6-current-page">Partner Marketing</span>
        </div>

        <main id="main-content" tabIndex={-1}>
          <section
            className="v4-section v4-marketing"
            id="v4-marketing"
            aria-labelledby="v4-marketing-title"
          >
            <div className="v4-marketing-copy">
              <p className="v4-eyebrow">FREE PARTNER MARKETING</p>
              <h1 id="v4-marketing-title">
                {isThai ? (
                  <>
                    หน้าร้านโต
                    <br />
                    Social ก็โตต่อ
                  </>
                ) : (
                  <>
                    Storefront Grows
                    <br />
                    Social Follows
                  </>
                )}
              </h1>
              <p>
                {isThai ? (
                  <>
                    แคมเปญที่ทำให้ร้านมีเรื่องเล่า
                    <br />
                    ตั้งแต่โปรประจำวัน ถึงจังหวะเปิดตัวรุ่นใหม่
                  </>
                ) : (
                  <>
                    Promotional campaigns that give your store a voice—
                    <br />
                    from daily deals to flagship model releases.
                  </>
                )}
              </p>

              <p className="v6-free-copy">
                {isThai ? (
                  <>
                    สื่อกลาง <strong>ฟรี</strong> สำหรับพาร์ทเนอร์ PK Hub ทุกร้าน
                    <br />
                    ไม่มีขั้นต่ำยอดซื้อ
                  </>
                ) : (
                  <>
                    Marketing media <strong>Free</strong> for all PK Hub Partners
                    <br />
                    Zero minimum purchase requirement
                  </>
                )}
              </p>

              <div className="v4-marketing-points">
                <span>
                  <ImageIcon size={16} aria-hidden="true" />
                  {isThai
                    ? 'มีสื่อกลางให้เริ่ม ไม่ต้องเริ่มจากศูนย์'
                    : 'Ready-to-use creative assets—never start from scratch'}
                </span>
                <span>
                  <Palette size={16} aria-hidden="true" />
                  {isThai
                    ? 'ร้านปรับชื่อ ข้อความ และเงื่อนไขเองได้'
                    : 'Freely customize shop name, captions, and promotion terms'}
                </span>
                <span>
                  <CalendarDays size={16} aria-hidden="true" />
                  {isThai
                    ? 'เลือกแคมเปญให้ตรงเทศกาลและจังหวะรุ่นใหม่'
                    : 'Match seasonal holidays and new device launch schedules'}
                </span>
              </div>

              <a
                className="v4-text-action cursor-interaction"
                href={CONTACT.LINE_URL}
                target="_blank"
                rel="noreferrer"
              >
                {isThai ? 'ขอสื่อและแคมเปญสำหรับร้านคุณ' : 'Request promotional media for your shop'}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <div className="v6-social-metrics" aria-label={isThai ? 'ยอดชมและความคิดเห็น' : 'Views and comments'}>
                <div className="v6-metric v6-social-stat" data-number-block="marketingViews">
                  <AnimatedNumber
                    from={APPROVED_METRICS.marketing.views.from}
                    to={APPROVED_METRICS.marketing.views.to}
                    dataNumber="marketingViews"
                  />
                  <p>{isThai ? APPROVED_METRICS.marketing.views.label : APPROVED_METRICS.marketing.views.labelEn}</p>
                  <span
                    className="v6-sr"
                    data-number-status="marketingViews"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {isThai
                      ? `${APPROVED_METRICS.marketing.views.label} ${APPROVED_METRICS.marketing.views.to.toLocaleString('en-US')} ${APPROVED_METRICS.marketing.views.unit}`
                      : `${APPROVED_METRICS.marketing.views.labelEn} ${APPROVED_METRICS.marketing.views.to.toLocaleString('en-US')} ${APPROVED_METRICS.marketing.views.unit}`}
                  </span>
                </div>
                <div className="v6-metric v6-social-stat" data-number-block="marketingComments">
                  <AnimatedNumber
                    from={APPROVED_METRICS.marketing.comments.from}
                    to={APPROVED_METRICS.marketing.comments.to}
                    dataNumber="marketingComments"
                  />
                  <p>{isThai ? APPROVED_METRICS.marketing.comments.label : APPROVED_METRICS.marketing.comments.labelEn}</p>
                  <span
                    className="v6-sr"
                    data-number-status="marketingComments"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {isThai
                      ? `${APPROVED_METRICS.marketing.comments.label} ${APPROVED_METRICS.marketing.comments.to.toLocaleString('en-US')} ${APPROVED_METRICS.marketing.comments.unit}`
                      : `${APPROVED_METRICS.marketing.comments.labelEn} ${APPROVED_METRICS.marketing.comments.to.toLocaleString('en-US')} ${APPROVED_METRICS.marketing.comments.unit}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Instagram Demo */}
            <div className="v4-instagram" aria-label={isThai ? 'ตัวอย่างบัญชี Instagram ของร้าน' : 'Sample shop Instagram account'}>
              <div className="v4-ig-bar">
                <Camera size={16} aria-hidden="true" />
                <strong>abc.mobile</strong>
                <span>{isThai ? 'บัญชีตัวอย่าง' : 'Sample account'}</span>
              </div>

              <div className="v4-ig-profile">
                <div className="v4-ig-avatar" aria-label="ABC Mobile">
                  ABC<small>MOBILE</small>
                </div>
                <div className="v4-ig-stats">
                  <div>
                    <strong>9</strong>
                    <span>{isThai ? 'โพสต์' : 'posts'}</span>
                  </div>
                  <div>
                    <strong>{(1280 + (following ? 1 : 0)).toLocaleString('en-US')}</strong>
                    <span>{isThai ? 'ผู้ติดตาม' : 'followers'}</span>
                  </div>
                  <div>
                    <strong>324</strong>
                    <span>{isThai ? 'กำลังติดตาม' : 'following'}</span>
                  </div>
                </div>
              </div>

              <div className="v4-ig-bio">
                <strong>ABC Mobile</strong>
                <p>
                  {isThai ? (
                    <>
                      มือถือ · อุปกรณ์เสริม · โปรสำหรับจังหวะของคุณ
                      <br />
                      ทักร้านเพื่อเช็กรุ่น ราคา และเงื่อนไขก่อนสั่งซื้อ
                    </>
                  ) : (
                    <>
                      Smartphones · Accessories · Promotions for your pace
                      <br />
                      DM to check models, pricing, and terms before ordering
                    </>
                  )}
                </p>
              </div>

              <div className="v4-ig-actions">
                <button
                  type="button"
                  className="v4-ig-follow cursor-interaction"
                  aria-pressed={following}
                  onClick={() => setFollowing(!following)}
                >
                  {following ? (isThai ? 'กำลังติดตาม' : 'Following') : (isThai ? 'ติดตาม' : 'Follow')}
                </button>
                <a
                  className="v4-ig-message cursor-interaction inline-flex items-center justify-center text-center no-underline"
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {isThai ? 'ส่งข้อความ' : 'Message'}
                </a>
              </div>

              <div className="v4-ig-highlights" aria-label={isThai ? 'Stories highlights ตัวอย่าง' : 'Sample story highlights'}>
                {HIGHLIGHTS.map((h) => (
                  <button
                    key={h.name}
                    type="button"
                    className="v4-highlight cursor-interaction"
                    aria-label={`ดูแคมเปญตัวอย่าง: ${h.name}`}
                    onClick={(e) => openPost(h.index, e.currentTarget)}
                  >
                    <span
                      style={{
                        backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                        ['--pos' as string]: pos(h.index),
                      }}
                    />
                    <span>{isThai ? h.name : h.nameEn}</span>
                  </button>
                ))}
              </div>

              <div className="v4-ig-posts-label">
                <Grid3X3 size={15} aria-hidden="true" />
                <span>{isThai ? 'โพสต์' : 'Posts'}</span>
              </div>

              <div className="v4-ig-grid" aria-label={isThai ? 'แคมเปญโปรโมชั่นตัวอย่าง 9 โพสต์' : '9 sample promotion posts'}>
                {POSTS.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    className="v4-post cursor-interaction"
                    data-post={post.id}
                    aria-label={`ดูโพสต์ตัวอย่าง: ${post.title}`}
                    style={{
                      backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                      ['--pos' as string]: pos(post.id),
                    }}
                    onClick={(e) => openPost(post.id, e.currentTarget)}
                  >
                    <span className={`v4-post-stamp ${[2, 6].includes(post.id) ? 'is-white' : ''}`}>
                      <img
                        src="/pkhub-v7/brands/logo.png"
                        alt="PK HUB"
                        width={360}
                        height={119}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  </button>
                ))}
              </div>

              <p className="v4-ig-caption">
                {isThai
                  ? 'บัญชี ตัวเลข และโปรโมชั่นสมมติสำหรับตัวอย่างการนำสื่อไปใช้'
                  : 'Sample account, figures, and promotions for demonstration of media deployment'}
              </p>
            </div>

            {/* Post Detail Modal Dialog */}
            {selectedPost !== null ? (
              <div
                className="v4-post-detail"
                role="dialog"
                aria-modal="true"
                aria-label={isThai ? 'ตัวอย่างแคมเปญ' : 'Campaign preview'}
                onClick={(e) => {
                  if (e.target === e.currentTarget) closePost()
                }}
              >
                <div className="v4-post-dialog">
                  <button
                    ref={postCloseButtonRef}
                    className="v4-post-close cursor-interaction"
                    type="button"
                    aria-label={isThai ? 'ปิดตัวอย่างโพสต์' : 'Close preview'}
                    onClick={closePost}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                  <div
                    className="v4-post-large"
                    style={{
                      backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                      ['--pos' as string]: pos(selectedPost),
                    }}
                  >
                    <span
                      className={`v4-post-stamp ${[2, 6].includes(selectedPost) ? 'is-white' : ''}`}
                    >
                      <img
                        src="/pkhub-v7/brands/logo.png"
                        alt="PK HUB"
                        width={360}
                        height={119}
                      />
                    </span>
                  </div>
                  <p>
                    {isThai
                      ? 'ตัวอย่างกราฟิกแคมเปญ · ร้านปรับข้อความและเงื่อนไขก่อนนำไปใช้'
                      : 'Sample promotional graphic · Customize text and conditions before use'}
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <PartnerStartSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
