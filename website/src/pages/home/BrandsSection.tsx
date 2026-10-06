import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from './constants'

interface BrandItem {
  id: string
  name: string
  src: string
  width: number
  height: number
}

const BRANDS: BrandItem[] = [
  { id: 'oppo', name: 'OPPO', src: '/pkhub-v7/brands/oppo.png', width: 600, height: 144 },
  { id: 'vivo', name: 'vivo', src: '/pkhub-v7/brands/vivo.svg', width: 103, height: 28 },
  { id: 'apple', name: 'Apple', src: '/pkhub-v7/brands/apple.svg', width: 28, height: 36 },
  { id: 'xiaomi', name: 'Xiaomi', src: '/pkhub-v7/brands/xiaomi.png', width: 196, height: 196 },
  { id: 'realme', name: 'realme', src: '/pkhub-v7/brands/realme.png', width: 96, height: 96 },
  { id: 'honor', name: 'HONOR', src: '/pkhub-v7/brands/honor.svg', width: 161, height: 42 },
  { id: 'huawei', name: 'HUAWEI', src: '/pkhub-v7/brands/huawei.png', width: 266, height: 60 },
  { id: 'alldocube', name: 'Alldocube', src: '/pkhub-v7/brands/alldocube.svg', width: 191, height: 34 },
]

export default function BrandsSection() {
  const { isThai } = useLanguage()

  return (
    <section className="v4-brands" id="v4-brands" aria-label={isThai ? 'กลุ่มแบรนด์และสินค้า' : 'Device portfolio and brands'}>
      <div>
        <p className="v4-eyebrow">THE DEVICE PORTFOLIO</p>
        <h2>
          {isThai ? (
            <>
              แบรนด์ที่คุ้นเคย
              <br />
              <span>และอีกหลากหลายตัวเลือก</span>
            </>
          ) : (
            <>
              Familiar Brands
              <br />
              <span>and Diverse Selection</span>
            </>
          )}
        </h2>
      </div>

      <div className="v4-brand-wall" aria-label={isThai ? 'แบรนด์ตัวอย่างในกลุ่มสินค้า' : 'Brand portfolio'}>
        {BRANDS.map((brand) => (
          <div key={brand.id} className="v4-brand-slot">
            <img
              src={brand.src}
              alt={brand.name}
              data-brand={brand.id}
              width={brand.width}
              height={brand.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="v4-brand-foot">
        <span>
          {isThai
            ? 'สมาร์ตโฟนหลากรุ่น อุปกรณ์เสริม และบริการที่ต่อยอดไปกับร้านคุณ'
            : 'Multi-brand smartphones, accessories, and services that grow alongside your store.'}
        </span>
        <a
          className="v4-text-action cursor-interaction"
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
        >
          {isThai ? 'สอบถามรุ่นและสินค้าเพิ่มเติม' : 'Inquire about models & stock'}{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
