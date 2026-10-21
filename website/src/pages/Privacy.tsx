import type { ReactNode } from 'react'

import PageShell from '@/components/v1/PageShell'
import { CONTACT, HQ, route, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { PRIVACY_META, usePageMeta } from '@/lib/seo'

/**
 * Privacy notice for the partner enquiry form. Its structure follows the ten items in section 4.1
 * of the PDPC guideline on notifying purposes and details of collection (PDPA B.E. 2562, s. 23).
 * Facts come from the form, ADR-0037 and the hosting records; anything the repository does not
 * record is a visible placeholder until the owner confirms it.
 */
export const PRIVACY_UPDATED = { th: '21 ตุลาคม 2569', en: '21 October 2026' } as const

function Pending({ children }: { children: ReactNode }) {
  return <mark className="v1-pending">{children}</mark>
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="v1-legal-section">
      <h2 id={id} className="v1-h4">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function Privacy() {
  const { language } = useLanguage()
  usePageMeta(PRIVACY_META[language])
  const hq = HQ[language]
  const pending = (th: string, en: string) => <Pending>{t(language, `[รอเจ้าของยืนยัน: ${th}]`, `[Owner to confirm: ${en}]`)}</Pending>

  const summary = [
    [t(language, 'ใครเก็บ', 'Who'), 'PK HUB · บริษัท พี เค มีเดีย บิสซิเนส จำกัด'],
    [t(language, 'เก็บอะไร', 'What'), t(language, 'ข้อมูลร้านและผู้ติดต่อที่คุณกรอกในฟอร์มสมัครคู่ค้า', 'The store and contact details you enter in the partner form')],
    [t(language, 'เพื่ออะไร', 'Why'), t(language, 'ติดต่อกลับเรื่องการเป็นคู่ค้าเท่านั้น', 'Only to contact you about becoming a partner')],
    [t(language, 'สิทธิของคุณ', 'Your rights'), t(language, 'ขอดู แก้ไข ลบ หรือถอนความยินยอมได้ทุกเมื่อ', 'Access, correct, delete or withdraw consent at any time')],
  ]

  const required = [
    t(language, 'ชื่อร้าน', 'Store name'),
    t(language, 'จังหวัด', 'Province'),
    t(language, 'ชื่อผู้ติดต่อ', 'Contact name'),
    t(language, 'เบอร์โทรศัพท์', 'Phone number'),
  ]
  const optional = [
    t(language, 'ที่อยู่ร้าน', 'Store address'),
    'LINE ID',
    t(language, 'อีเมล', 'Email'),
    t(language, 'Facebook หรือ TikTok ของร้าน', 'Store Facebook or TikTok'),
    t(language, 'แบรนด์ที่สนใจ', 'Brands you are interested in'),
    t(language, 'ข้อความถึงทีม', 'Your note to the team'),
    t(language, 'รหัสแนะนำ', 'Referral code'),
  ]
  const automatic = [
    t(language, 'ภาษาและหน้าเว็บที่ใช้ส่งฟอร์ม', 'The language and page you submitted from'),
    t(language, 'ที่มาของการเข้าชม เช่น หน้าแรกที่เข้า หน้าสินค้าล่าสุด และพารามิเตอร์แคมเปญ (UTM)', 'How you arrived, such as your first page, the last product page and campaign (UTM) parameters'),
    t(language, 'รหัสคำขอ (request ID) เพื่อกันการส่งซ้ำ', 'A request ID that prevents duplicate submissions'),
    t(
      language,
      'ค่าที่แปลงทางเดียวจากที่อยู่เครือข่าย (IP) เพื่อกันสแปมและการส่งถี่เกินไป เราไม่เก็บ IP จริง',
      'A one-way value derived from your network (IP) address to limit spam and repeated submissions; the IP itself is not stored',
    ),
  ]
  const rights = [
    [t(language, 'ถอนความยินยอมเมื่อใดก็ได้', 'Withdraw your consent at any time'), t(language, 'มาตรา 19 วรรคห้า', 's. 19 para. 5')],
    [t(language, 'ขอเข้าถึงและขอรับสำเนาข้อมูล', 'Access and obtain a copy of your data'), t(language, 'มาตรา 30', 's. 30')],
    [t(language, 'ขอรับหรือขอให้โอนข้อมูลในรูปแบบที่อ่านด้วยเครื่องได้', 'Receive your data, or have it transferred, in a machine-readable format'), t(language, 'มาตรา 31', 's. 31')],
    [t(language, 'คัดค้านการเก็บ ใช้ หรือเปิดเผยข้อมูล', 'Object to collection, use or disclosure'), t(language, 'มาตรา 32', 's. 32')],
    [t(language, 'ขอให้ลบ ทำลาย หรือทำให้ไม่สามารถระบุตัวตนได้', 'Have your data deleted, destroyed or anonymised'), t(language, 'มาตรา 33', 's. 33')],
    [t(language, 'ขอให้ระงับการใช้ข้อมูล', 'Restrict use of your data'), t(language, 'มาตรา 34', 's. 34')],
    [t(language, 'ขอให้แก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน', 'Have your data corrected and kept up to date'), t(language, 'มาตรา 36', 's. 36')],
    [t(language, 'ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)', 'Complain to the Office of the Personal Data Protection Committee (PDPC)'), t(language, 'มาตรา 73', 's. 73')],
  ]

  return (
    <PageShell cta={false}>
      <section className="v1-white" aria-labelledby="v1-page-title">
        <div className="v1-wrap pb-[clamp(64px,7.8vw,112px)] pt-[clamp(48px,6.6vw,96px)]">
          <div className="v1-legal">
            <div className="grid gap-4">
              <p className="v1-eyebrow">{t(language, 'ความเป็นส่วนตัว', 'Privacy')}</p>
              <h1 id="v1-page-title" className="v1-h2">
                {t(language, 'ประกาศความเป็นส่วนตัว', 'Privacy notice')}
              </h1>
              <p className="v1-lede">
                {t(
                  language,
                  'สำหรับข้อมูลที่คุณกรอกในฟอร์มสมัครเป็นคู่ค้า PK HUB บนเว็บไซต์ pkhub.co ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
                  'For the details you enter in the PK HUB partner form on pkhub.co, under Thailand’s Personal Data Protection Act B.E. 2562 (2019).',
                )}
              </p>
              <p className="v1-small">{t(language, `ปรับปรุงล่าสุด ${PRIVACY_UPDATED.th}`, `Last updated ${PRIVACY_UPDATED.en}`)}</p>
            </div>

            <dl className="v1-legal-summary" aria-label={t(language, 'สรุปสั้น', 'At a glance')}>
              {summary.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>

            <Section id="privacy-controller" title={t(language, '1. ผู้ควบคุมข้อมูลส่วนบุคคล', '1. Who is responsible for your data')}>
              <p>
                {t(language, 'บริษัท พี เค มีเดีย บิสซิเนส จำกัด ในชื่อ PK HUB', 'บริษัท พี เค มีเดีย บิสซิเนส จำกัด, trading as PK HUB')} {pending('ชื่อนิติบุคคลตามหนังสือรับรอง', 'registered legal name, and its English form')}
              </p>
              <p>
                {hq.name}
                <br />
                {hq.address}
              </p>
            </Section>

            <Section id="privacy-data" title={t(language, '2. ข้อมูลที่เราเก็บ', '2. What we collect')}>
              <p>{t(language, 'เราเก็บข้อมูลจากคุณโดยตรงผ่านฟอร์มสมัครคู่ค้าเท่านั้น', 'We collect data directly from you through the partner form only.')}</p>
              <h3 className="v1-legal-sub">{t(language, 'ข้อมูลที่ต้องกรอก', 'Required')}</h3>
              <ul>{required.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3 className="v1-legal-sub">{t(language, 'ข้อมูลที่กรอกหรือไม่ก็ได้', 'Optional')}</h3>
              <ul>{optional.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3 className="v1-legal-sub">{t(language, 'ข้อมูลที่ส่งไปพร้อมฟอร์มโดยอัตโนมัติ', 'Sent automatically with the form')}</h3>
              <ul>{automatic.map((item) => <li key={item}>{item}</li>)}</ul>
              <p>
                {t(
                  language,
                  'เบราว์เซอร์ของคุณจำรหัสแนะนำและที่มาของการเข้าชมไว้ในเครื่อง (local/session storage) เพื่อแนบไปกับฟอร์มเมื่อคุณส่งเท่านั้น เว็บไซต์นี้ไม่มีคุกกี้โฆษณาหรือเครื่องมือติดตามของบุคคลอื่น',
                  'Your browser keeps the referral code and visit source on your device (local/session storage) only to attach them when you submit. This site uses no advertising cookies or third-party trackers.',
                )}
              </p>
            </Section>

            <Section id="privacy-purpose" title={t(language, '3. วัตถุประสงค์และฐานทางกฎหมาย', '3. Why we use it and on what basis')}>
              <ul>
                <li>{t(language, 'ติดต่อกลับเพื่อคุยเรื่องการเป็นคู่ค้า สินค้า และบริการของ PK HUB', 'To call you back about becoming a partner and about PK HUB products and services')}</li>
                <li>{t(language, 'ตรวจคำขอและมอบหมายให้ทีมงานที่ดูแลพื้นที่หรือผู้แนะนำของคุณติดต่อ', 'To review the request and assign the team member or referrer who will contact you')}</li>
                <li>{t(language, 'รู้ว่าคำขอมาจากช่องทางหรือผู้แนะนำใด', 'To know which channel or referrer the request came from')}</li>
                <li>{t(language, 'กันสแปมและการส่งซ้ำ', 'To prevent spam and duplicate requests')}</li>
              </ul>
              <p>
                {t(
                  language,
                  'ฐานทางกฎหมาย: ความยินยอมที่คุณให้โดยติ๊กช่องยินยอมก่อนส่งฟอร์ม เราจะไม่ใช้ข้อมูลนี้เพื่อวัตถุประสงค์อื่นโดยไม่แจ้งและขอความยินยอมจากคุณก่อน',
                  'Legal basis: the consent you give by ticking the consent box before you submit. We will not use this data for any other purpose without telling you and asking for your consent first.',
                )}
              </p>
            </Section>

            <Section id="privacy-required" title={t(language, '4. หากไม่ให้ข้อมูล', '4. If you do not provide the data')}>
              <p>
                {t(
                  language,
                  'หากไม่กรอกข้อมูลที่ต้องกรอกหรือไม่ให้ความยินยอม ระบบจะส่งฟอร์มไม่ได้และทีมจะติดต่อกลับไม่ได้ คุณยังโทรหรือทัก LINE หาเราได้โดยตรง',
                  'Without the required details or your consent, the form cannot be sent and the team cannot call you back. You can still phone us or message us on LINE.',
                )}
              </p>
            </Section>

            <Section id="privacy-retention" title={t(language, '5. ระยะเวลาเก็บข้อมูล', '5. How long we keep it')}>
              <p>
                {pending('ระยะเวลาเก็บข้อมูลของผู้สมัครที่ไม่ได้เป็นคู่ค้า และของผู้ที่เป็นคู่ค้าแล้ว', 'retention period for enquiries that do not become partners, and for those that do')}
              </p>
              <p>
                {t(
                  language,
                  'เมื่อพ้นระยะเวลาดังกล่าว หรือเมื่อคุณถอนความยินยอมหรือขอให้ลบ เราจะลบหรือทำลายข้อมูล หรือทำให้ไม่สามารถระบุตัวคุณได้',
                  'When that period ends, or when you withdraw consent or ask us to delete it, we delete or destroy the data or make it anonymous.',
                )}
              </p>
            </Section>

            <Section id="privacy-recipients" title={t(language, '6. ผู้ที่อาจได้รับข้อมูล', '6. Who may receive it')}>
              <ul>
                <li>{t(language, 'พนักงาน PK HUB ที่ได้รับสิทธิ์ และทีมงานหรือผู้แนะนำที่ได้รับมอบหมายให้ดูแลคุณ', 'Authorised PK HUB staff, and the team member or referrer assigned to you')}</li>
                <li>{t(language, 'ผู้ให้บริการระบบที่ประมวลผลแทนเรา: Supabase (ฐานข้อมูล) และ Vercel (โฮสต์เว็บไซต์)', 'Service providers processing on our behalf: Supabase (database) and Vercel (website hosting)')}</li>
                <li>{t(language, 'Google Fonts ซึ่งให้บริการฟอนต์ของเว็บไซต์ และได้รับที่อยู่ IP ของคุณเมื่อเบราว์เซอร์โหลดฟอนต์', 'Google Fonts, which serves the site’s fonts and receives your IP address when your browser loads them')}</li>
                <li>{t(language, 'หน่วยงานรัฐเมื่อกฎหมายกำหนด', 'Government authorities where the law requires it')}</li>
              </ul>
            </Section>

            <Section id="privacy-transfer" title={t(language, '7. การส่งข้อมูลไปต่างประเทศ', '7. Transfers outside Thailand')}>
              <p>
                {t(
                  language,
                  'ฐานข้อมูลที่เก็บข้อมูลจากฟอร์มตั้งอยู่บนเซิร์ฟเวอร์ของ Supabase ในโตเกียว ประเทศญี่ปุ่น',
                  'The database that stores form submissions runs on Supabase servers in Tokyo, Japan.',
                )}{' '}
                {pending('มาตรการคุ้มครองที่ใช้กับการส่งข้อมูลไปต่างประเทศ (มาตรา 28–29)', 'the safeguard relied on for this transfer (ss. 28–29)')}
              </p>
            </Section>

            <Section id="privacy-security" title={t(language, '8. การรักษาความปลอดภัย', '8. How we protect it')}>
              <p>
                {t(
                  language,
                  'ข้อมูลจากฟอร์มเก็บในส่วนของฐานข้อมูลที่ปิดจากการเข้าถึงสาธารณะ เข้าถึงได้เฉพาะผ่านระบบหลังบ้านและผู้ที่ได้รับสิทธิ์ การส่งข้อมูลเข้ารหัสด้วย HTTPS',
                  'Form data is kept in a private part of the database that the public cannot reach; only back-office systems and authorised people can access it. Data is sent encrypted over HTTPS.',
                )}
              </p>
            </Section>

            <Section id="privacy-rights" title={t(language, '9. สิทธิของคุณ', '9. Your rights')}>
              <ul className="v1-legal-rights">
                {rights.map(([right, section]) => (
                  <li key={right}>
                    <span>{right}</span>
                    <span className="v1-small">{section}</span>
                  </li>
                ))}
              </ul>
              <p>
                {t(
                  language,
                  'การถอนความยินยอมไม่กระทบการใช้ข้อมูลที่ทำไปก่อนหน้านั้นโดยชอบ ติดต่อเราตามช่องทางด้านล่างเพื่อใช้สิทธิ์',
                  'Withdrawing consent does not affect use made lawfully before you withdrew it. Contact us below to use any of these rights.',
                )}
              </p>
            </Section>

            <Section id="privacy-contact" title={t(language, '10. ติดต่อเรื่องข้อมูลส่วนบุคคล', '10. Contact us about your data')}>
              <ul>
                <li>
                  {t(language, 'โทร', 'Phone')} <a className="v1-legal-link" href={CONTACT.PHONE_TEL}>{CONTACT.PHONE_DISPLAY}</a>
                </li>
                <li>
                  LINE{' '}
                  <a className="v1-legal-link" href={CONTACT.LINE_URL} target="_blank" rel="noreferrer">
                    {CONTACT.LINE_ID}
                  </a>
                </li>
                <li>
                  {t(language, 'จดหมายถึง', 'Post to')} {hq.address}
                </li>
                <li>
                  {t(language, 'อีเมล', 'Email')} {pending('อีเมลสำหรับคำขอเรื่องข้อมูลส่วนบุคคล', 'email address for privacy requests')}
                </li>
                <li>
                  {t(language, 'เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)', 'Data protection officer (DPO)')} {pending('ชื่อและช่องทางติดต่อ DPO หรือระบุว่าไม่มี', 'DPO name and contact, or state that none is appointed')}
                </li>
              </ul>
              <p>
                {t(language, 'ร้องเรียนต่อ สคส. ได้ที่', 'You can complain to the PDPC at')}{' '}
                <a className="v1-legal-link" href="https://www.pdpc.or.th" target="_blank" rel="noreferrer">
                  pdpc.or.th
                </a>
              </p>
            </Section>

            <Section id="privacy-changes" title={t(language, '11. การเปลี่ยนแปลงประกาศนี้', '11. Changes to this notice')}>
              <p>
                {t(
                  language,
                  'เราจะแสดงประกาศฉบับล่าสุดและวันที่ปรับปรุงไว้ที่หน้านี้ หากเปลี่ยนวัตถุประสงค์การใช้ข้อมูล เราจะแจ้งและขอความยินยอมจากคุณก่อน',
                  'The latest notice and its date are always on this page. If the purpose changes, we will tell you and ask for your consent first.',
                )}
              </p>
              <p>
                <a className="v1-legal-link" href={route(language, '/join')}>
                  {t(language, 'กลับไปที่ฟอร์มสมัครคู่ค้า', 'Back to the partner form')}
                </a>
              </p>
            </Section>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
