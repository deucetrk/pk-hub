import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { dealerLoginUrl } from '@/lib/dealerPortal'

import { FacebookIcon, InstagramIcon, TikTokIcon } from './icons'
import { CONTACT, SOCIAL, route, t } from './site'

export default function SiteFooter() {
  const { language, setLanguage } = useLanguage()
  const referralCode = useReferralAttribution()
  const explore = [
    { href: route(language, '/products'), label: t(language, 'สินค้าและบริการ', 'Products and services') },
    { href: route(language, '/join'), label: t(language, 'เริ่มเป็นร้านค้าคู่ค้า', 'Become a partner store') },
    ...(language === 'th' ? [{ href: '/th/blog', label: 'บทความ' }] : []),
    { href: route(language, '/contact'), label: t(language, 'ติดต่อเรา', 'Contact us') },
  ]

  return (
    <footer className="v1-footer">
      <div className="v1-wrap">
        <div className="v1-footer-grid">
          <div className="grid content-start justify-items-start gap-[18px]">
            <img src="/v1/brands/pkhub.webp" alt="PK HUB" width={144} height={48} loading="lazy" decoding="async" />
            <p className="text-[17px] leading-7 text-[#555]">
              {t(language, 'สินค้าค้าส่ง บริการต่อยอด', 'Wholesale devices, add-on services')}
              <br />
              {t(language, 'และทีมสำหรับร้านค้าคู่ค้า', 'and a team for partner stores')}
            </p>
            <div className="flex items-center gap-3 text-[#111114]">
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Facebook PK HUB">
                <FacebookIcon />
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Instagram PK HUB">
                <InstagramIcon />
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center" aria-label="TikTok PK HUB">
                <TikTokIcon size={23} />
              </a>
              <span className="text-[15px] text-[#555]">{SOCIAL.handle}</span>
            </div>
          </div>
          <nav aria-labelledby="v1-footer-explore">
            <h2 id="v1-footer-explore">{t(language, 'สำรวจ PK HUB', 'Explore PK HUB')}</h2>
            <div className="v1-footer-links">
              {explore.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <div>
            <h2>{t(language, 'คุยกับทีม PK HUB', 'Talk to the PK HUB team')}</h2>
            <a href={CONTACT.PHONE_TEL} className="v1-h4 flex min-h-11 items-center" style={{ fontWeight: 400 }}>
              {CONTACT.PHONE_DISPLAY}
            </a>
            <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="v1-link text-[#555]">
              LINE · {CONTACT.LINE_ID} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="v1-footer-bottom">
          <div role="group" aria-label={t(language, 'เลือกภาษา', 'Choose language')} className="flex items-center gap-2">
            <button type="button" aria-pressed={language === 'th'} onClick={() => setLanguage('th')} className={language === 'th' ? 'font-semibold text-[#111]' : ''}>
              ไทย
            </button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')} className={language === 'en' ? 'font-semibold text-[#111]' : ''}>
              EN
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-7">
            <a href={route(language, '/privacy')}>{t(language, 'ความเป็นส่วนตัว', 'Privacy')}</a>
            <a href={dealerLoginUrl(referralCode)}>
              {t(language, 'เข้าสู่ระบบคู่ค้า', 'Partner login')} <span aria-hidden="true">&nbsp;↗</span>
            </a>
            <a href="https://portal.pkhub.co/login">
              {t(language, 'เจ้าหน้าที่', 'Staff')} <span aria-hidden="true">&nbsp;↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
