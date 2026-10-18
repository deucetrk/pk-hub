import PartnerForm from '@/components/PartnerForm'
import PageShell from '@/components/v1/PageShell'
import { CONTACT, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { JOIN_META, usePageMeta } from '@/lib/seo'

export default function Join() {
  const { language } = useLanguage()
  usePageMeta(JOIN_META[language])
  const steps = [
    [t(language, 'ฝากข้อมูลร้าน', 'Leave your store details'), t(language, 'ชื่อร้าน จังหวัด และเบอร์ติดต่อ', 'Store name, province and phone')],
    [t(language, 'ทีม PK HUB ติดต่อกลับ', 'PK HUB calls you back'), t(language, 'คุยสินค้า บริการ และเงื่อนไขที่เหมาะกับร้าน', 'Products, services and terms that fit your store')],
    [t(language, 'เริ่มสั่งสินค้าและใช้บริการ', 'Start ordering and using services'), t(language, 'เมื่อตกลงรายละเอียดกันแล้ว', 'Once the details are agreed')],
  ]
  return (
    <PageShell cta={false} className="bg-[#f4f4f4]">
      <div className="v1-mist">
        <div className="v1-wrap v1-join-grid pb-[clamp(56px,6.6vw,96px)] pt-[clamp(32px,4.4vw,64px)]">
          <aside className="v1-join-aside grid content-start gap-8 rounded-3xl text-white" style={{ background: 'var(--v1-dusk)' }} aria-labelledby="v1-page-title">
            <div className="grid gap-4">
              <p className="v1-eyebrow v1-eyebrow-sky">{t(language, 'สมัครเป็นคู่ค้า PK HUB', 'Become a PK HUB partner')}</p>
              <h1 id="v1-page-title" className="v1-h1" style={{ fontSize: 'clamp(36px, 3.4vw, 48px)', lineHeight: 1.25 }}>
                {t(language, 'ฝากข้อมูลร้าน', 'Leave your details,')}
                <br />
                {t(language, 'ทีมเราติดต่อกลับ', 'we will call you')}
              </h1>
              <p className="text-lg leading-[30px] text-[#dbdfe8]">{t(language, 'ใช้เวลาไม่กี่นาที ข้อมูลใช้เพื่อติดต่อกลับเท่านั้น', 'Takes a few minutes. Used only to contact you.')}</p>
            </div>
            <ol className="border-t border-white/15">
              {steps.map(([title, body], index) => (
                <li key={title} className="flex gap-4 border-b border-white/15 py-5">
                  <span className="v1-num w-8 shrink-0 text-xl leading-7 text-[#a9bef7]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="grid gap-0.5">
                    <span className="text-[17px] font-medium leading-7">{title}</span>
                    <span className="text-[15px] leading-6 text-[#c9cdd6]">{body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="grid gap-3">
              <p className="text-[15px] text-[#c9cdd6]">{t(language, 'อยากคุยก่อนกรอก', 'Prefer to talk first?')}</p>
              <div className="flex flex-wrap gap-3">
                <a href={CONTACT.PHONE_TEL} className="v1-btn v1-btn-ghost-light v1-btn-md">
                  {t(language, `โทร ${CONTACT.PHONE_DISPLAY}`, `Call ${CONTACT.PHONE_DISPLAY}`)}
                </a>
                <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="v1-btn v1-btn-ghost-light v1-btn-md">
                  LINE {CONTACT.LINE_ID} ↗
                </a>
              </div>
            </div>
          </aside>
          <section id="partner-application-form" className="v1-panel scroll-mt-24 bg-white" aria-label={t(language, 'ใบสมัคร', 'Application')}>
            <PartnerForm isApplication />
          </section>
        </div>
      </div>
    </PageShell>
  )
}
