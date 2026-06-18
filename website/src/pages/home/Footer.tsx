import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'

export default function Footer() {
  const { isThai } = useLanguage()

  return (
    <footer className="border-t border-zinc-200 bg-white py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <LogoMark className="h-10 sm:h-12 w-auto shrink-0" />
              <div>
                <div className="mt-1 text-sm font-semibold text-zinc-500">
                  {isThai ? 'เช็กราคาส่งมือถือสำหรับร้านค้า' : 'Wholesale phone prices for retailers'}
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-zinc-500">
              {isThai ? '72/29-30 ถนนศุขประยูร ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000' : '72/29-30 Sukprayoon Road, Chachoengsao 24000, Thailand'}
            </div>
            <div className="text-sm font-bold text-zinc-500">© PK HUB — {isThai ? 'สงวนลิขสิทธิ์' : 'All rights reserved'}</div>
          </div>
          <div className="grid gap-2 text-sm font-semibold leading-[1.8] text-zinc-500">
            <div>{isThai ? 'มือถือเครื่องศูนย์ไทย • ราคาส่ง B2B • แพ็กส่งตามรอบจริง' : 'Official Thai-market devices • B2B wholesale • Real dispatch rounds'}</div>
            <div>{isThai ? 'เหมาะกับร้านมือถือหน้าร้าน ร้านออนไลน์ และคนเริ่มขายใหม่' : 'For physical phone shops, online sellers, and new retailers.'}</div>
            <div>{isThai ? 'Inbox LINE หรือโทร 089-248-0888 เพื่อเช็กราคาส่งล่าสุด' : 'Inbox LINE or call 089-248-0888 for current wholesale prices.'}</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
