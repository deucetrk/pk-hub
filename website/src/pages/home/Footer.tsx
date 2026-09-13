import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { publishedArticles } from '@/content/blog/articles'
import { useLanguage } from '@/i18n/LanguageContext'

import { CONTACT } from './constants'

export default function Footer() {
  const { isThai } = useLanguage()

  return (
    <footer className="border-t border-zinc-800 bg-[#18181b] py-10 text-zinc-400">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <span className="inline-block">
                <LogoMark className="h-10 w-auto shrink-0 invert sm:h-12" />
              </span>
              <div>
                <div className="mt-1 text-sm font-semibold text-zinc-400">
                  {isThai ? 'เช็กราคาส่งมือถือสำหรับร้านค้า' : 'Wholesale phone prices for retailers'}
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-zinc-400">
              {isThai ? '72/29-30 ถนนศุขประยูร ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000' : '72/29-30 Sukprayoon Road, Chachoengsao 24000, Thailand'}
            </div>
            <div className="text-sm font-bold text-zinc-400">© PK HUB — {isThai ? 'สงวนลิขสิทธิ์' : 'All rights reserved'}</div>
          </div>
          <div className="grid gap-2 text-sm font-semibold leading-[1.8] text-zinc-400">
            {isThai && publishedArticles.length ? (
              <a href="/th/blog" className="w-fit text-zinc-300 transition-colors hover:text-white">
                บทความมือถือ ธุรกิจ และเทคโนโลยี
              </a>
            ) : null}
            <div>{isThai ? 'ทีมค้าส่งมือถือภายใต้ PK Media — AIS Authorized Distributor อย่างเป็นทางการ' : 'The smartphone wholesale team under PK Media — an official AIS Authorized Distributor.'}</div>
            <div>{isThai ? 'มือถือเครื่องศูนย์ไทย • ราคาส่ง B2B • แพ็กส่งตามรอบจริง' : 'Official Thai-market devices • B2B wholesale • Real dispatch rounds'}</div>
            <div>{isThai ? 'เหมาะกับร้านมือถือหน้าร้าน ร้านออนไลน์ และคนเริ่มขายใหม่' : 'For physical phone shops, online sellers, and new retailers.'}</div>
            <div>
              {isThai
                ? `Inbox LINE ${CONTACT.LINE_ID} หรือโทร ${CONTACT.PHONE_DISPLAY} เพื่อเช็กราคาส่งล่าสุด`
                : `Inbox LINE ${CONTACT.LINE_ID} or call ${CONTACT.PHONE_DISPLAY} for current wholesale prices.`}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
