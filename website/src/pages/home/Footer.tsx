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
                  {isThai ? 'พันธมิตรค้าส่งมือถือสำหรับร้านค้า' : 'Thai smartphone wholesale partner'}
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-zinc-500">
              {isThai ? '72/29-30 ถนนศุขประยูร ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000' : '72/29-30 Sukprayoon Road, Chachoengsao 24000, Thailand'}
            </div>
            <div className="text-sm font-bold text-zinc-500">© PK HUB — {isThai ? 'สงวนลิขสิทธิ์' : 'All rights reserved'}</div>
          </div>
          <div className="grid gap-2 text-sm font-semibold leading-[1.8] text-zinc-500">
            <div>{isThai ? 'มือถือเครื่องศูนย์ไทย • ราคาส่ง B2B • ส่งของทุกวัน' : 'Official Thai-market devices • B2B wholesale • Daily dispatch'}</div>
            <div>{isThai ? 'ดูแลร้านมือถือออนไลน์และหน้าร้านทั่วประเทศ' : 'Supporting online and physical smartphone retailers nationwide.'}</div>
            <div>{isThai ? 'ทัก LINE หรือโทร 089-248-0888 เพื่อรับรายการราคาล่าสุด' : 'Message us on LINE or call 089-248-0888 for current prices.'}</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
