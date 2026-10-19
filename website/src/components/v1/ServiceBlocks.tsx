import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'

import { productRoute, route, t, type ServiceSlug } from './site'

type HeroProps = {
  crumb: string
  eyebrow: string
  title: ReactNode
  lede: string
  secondary?: { href: string; label: string }
  visual: ReactNode
  visualLabel: string
  stageClass?: string
}

export function ServiceHero({ crumb, eyebrow, title, lede, secondary, visual, visualLabel, stageClass }: HeroProps) {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  return (
    <section className="v1-hero" aria-labelledby="v1-page-title">
      <div className="v1-wrap v1-hero-grid">
        <div className="v1-hero-copy v1-copy-enter">
          <p className="v1-crumb">
            <a href={route(language, '/products')}>{t(language, 'บริการ', 'Services')}</a>
            <span aria-hidden="true">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            {crumb}
          </p>
          <p className="v1-eyebrow v1-eyebrow-sky">{eyebrow}</p>
          <h1 id="v1-page-title" className="v1-h1">
            {title}
          </h1>
          <p className="v1-lede">{lede}</p>
          <div className="v1-hero-actions">
            <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-primary">
              {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a href={secondary?.href ?? '#v1-steps'} className="v1-btn v1-btn-ghost-light">
              {secondary?.label ?? t(language, 'ดูขั้นตอน ↓', 'See the steps ↓')}
            </a>
          </div>
        </div>
        <figure className={`v1-stage ${stageClass ?? ''}`} aria-label={visualLabel}>
          {visual}
        </figure>
      </div>
      <div className="v1-glitter" aria-hidden="true" />
    </section>
  )
}

export function StatStrip({ items }: { items: Array<[ReactNode, string]> }) {
  return (
    <section className="v1-band v1-dark" aria-label="Key facts">
      <dl className="v1-wrap v1-stats">
        {items.map(([value, label]) => (
          <div key={label}>
            <dt className="v1-sr">{label}</dt>
            <dd className="grid gap-1.5">
              <strong>{value}</strong>
              <span>{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

type Step = { title: string; body: string }

export function Steps({ title, note, steps, band = false }: { title: string; note: string; steps: Step[]; band?: boolean }) {
  const { language } = useLanguage()
  return (
    <section id="v1-steps" className={`v1-white v1-pad scroll-mt-20 ${band ? 'v1-band' : ''}`} aria-labelledby="v1-steps-title">
      <div className="v1-wrap v1-reveal">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow">{t(language, 'ขั้นตอน', 'Steps')}</p>
            <h2 id="v1-steps-title" className="v1-h2">
              {title}
            </h2>
          </div>
          <p className="v1-lede" style={{ fontSize: 18 }}>
            {note}
          </p>
        </div>
        <ol className="v1-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="v1-step-n" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p className="v1-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

type Panel = { title: string; tag: string; rows: Array<[string, string]>; note: string }

export function ComparePanels({
  eyebrow,
  title,
  light,
  dark,
  dots,
}: {
  eyebrow: string
  title: string
  light: Panel
  dark: Panel
  dots: string[]
}) {
  return (
    <section className="v1-mist v1-pad" aria-labelledby="v1-compare-title">
      <div className="v1-wrap v1-reveal">
        <div className="mb-12 grid gap-3">
          <p className="v1-eyebrow">{eyebrow}</p>
          <h2 id="v1-compare-title" className="v1-h2">
            {title}
          </h2>
        </div>
        <div className="v1-grid-2">
          {[light, dark].map((panel, index) => (
            <article key={panel.title} className={`v1-panel grid content-start gap-7 ${index ? 'v1-dark v1-on-dark' : 'bg-white'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="v1-h4" style={{ fontWeight: 400, fontSize: 'clamp(26px, 2.2vw, 32px)' }}>
                  {panel.title}
                </h3>
                <span className={`v1-chip ${index ? 'v1-chip-dark' : 'v1-chip-soft'}`} style={{ minHeight: 32 }}>
                  {panel.tag}
                </span>
              </div>
              <dl className="v1-rows">
                {panel.rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="v1-body" style={{ fontSize: 16 }}>
                {panel.note}
              </p>
            </article>
          ))}
        </div>
        {dots.length ? (
          <ul className="v1-dots">
            {dots.map((dot) => (
              <li key={dot}>{dot}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export function Faq({ items }: { items: Array<[string, string]> }) {
  const { language } = useLanguage()
  return (
    <section className="v1-white v1-pad" aria-labelledby="v1-faq-title">
      <div className="v1-wrap v1-faq v1-reveal">
        <div className="grid content-start gap-3">
          <p className="v1-eyebrow">{t(language, 'คำถามที่พบบ่อย', 'FAQ')}</p>
          <h2 id="v1-faq-title" className="v1-h2">
            {t(language, 'ร้านมักถาม', 'Stores often ask')}
          </h2>
        </div>
        <div className="v1-faq-list">
          {items.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}</summary>
              <p className="v1-body">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export type RelatedItem = { slug: ServiceSlug; title: string; body: string }

export function Related({ items, title }: { items: RelatedItem[]; title?: string }) {
  const { language } = useLanguage()
  return (
    <section className="v1-white pb-[clamp(64px,7.8vw,112px)]" aria-labelledby="v1-related-title">
      <div className="v1-wrap v1-reveal">
        <h2 id="v1-related-title" className="v1-h4 mb-8" style={{ fontWeight: 400 }}>
          {title ?? t(language, 'บริการที่ใช้คู่กัน', 'Works well with')}
        </h2>
        <div className="v1-related">
          {items.map((item) => (
            <a key={item.slug} href={productRoute(language, item.slug)}>
              <span className="grid gap-1">
                <span className="font-display text-[22px] leading-8">{item.title}</span>
                <span className="v1-small">{item.body}</span>
              </span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
