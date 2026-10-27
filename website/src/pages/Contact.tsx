import PageShell from '@/components/v1/PageShell'
import { CONTACT, HQ, SOCIAL, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT_META, usePageMeta } from '@/lib/seo'

export default function Contact() {
  const { language } = useLanguage()
  usePageMeta(CONTACT_META[language])
  const hq = HQ[language]
  const rows = [
    { label: t(language, 'โทร', 'Phone'), value: CONTACT.PHONE_DISPLAY, href: CONTACT.PHONE_TEL, primary: true },
    { label: 'LINE Official', value: CONTACT.LINE_ID, href: CONTACT.LINE_URL, external: true },
    { label: 'Facebook · Instagram', value: SOCIAL.handle, href: SOCIAL.facebook, external: true },
    { label: 'TikTok', value: SOCIAL.handle, href: SOCIAL.tiktok, external: true },
  ]
  return (
    <PageShell cta={false}>
      <section className="v1-white" aria-labelledby="v1-page-title">
        <div className="v1-wrap v1-contact-grid pb-[clamp(64px,7.8vw,112px)] pt-[clamp(48px,6.6vw,96px)]">
          <div className="grid content-start gap-10">
            <div className="grid gap-4">
              <p className="v1-eyebrow">{t(language, 'ติดต่อเรา', 'Contact us')}</p>
              <h1 id="v1-page-title" className="v1-h1">
                {t(language, 'คุยกับทีม', 'Talk to the')}
                <br />
                {t(language, 'PK HUB', 'PK HUB team')}
              </h1>
              <p className="v1-lede">{t(language, 'เรื่องสมัครคู่ค้า สินค้า หรือบริการ เลือกช่องทางที่สะดวก', 'Partnership, products or services: choose the channel that suits you.')}</p>
            </div>
            <div className="v1-contact-rows">
              {rows.map((row) => (
                <a key={row.label} href={row.href} {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  <span className="grid gap-1">
                    <span className="v1-small">{row.label}</span>
                    <span className="v1-num" style={{ fontSize: 'clamp(28px, 2.5vw, 36px)', lineHeight: 1.22 }}>
                      {row.value}
                    </span>
                  </span>
                  <span className={`v1-round ${row.primary ? 'border-[#2457d6] bg-[#2457d6] text-white' : ''}`} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-5">
            <img src="/v1/img/shop.webp" alt={t(language, 'หน้าร้าน PK HUB ฉะเชิงเทรา', 'PK HUB storefront, Chachoengsao')} width={900} height={903} loading="lazy" className="aspect-[672/440] w-full rounded-xl object-cover" style={{ objectPosition: '55% 55%' }} />
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f4f4f4] px-7 py-6">
              <address className="grid gap-1 not-italic">
                <span className="font-display text-2xl leading-[34px]">{hq.name}</span>
                <span className="v1-small">
                  {hq.address}
                  <br />
                  {hq.hours}
                </span>
              </address>
              <a href={CONTACT.MAPS_URL} target="_blank" rel="noreferrer" className="v1-btn v1-btn-ghost v1-btn-md">
                {t(language, 'เปิดแผนที่ ↗', 'Open map ↗')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
