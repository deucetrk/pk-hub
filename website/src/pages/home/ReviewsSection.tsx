import Section from '@/components/Section'
import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageContext'

const REVIEW_IMAGES = [
  {
    src: '/reviews/store-team.jpg',
    alt: 'ทีมงานและหน้าร้าน PK HUB',
    title: 'หน้าร้านและทีมงานดูแล',
    description: 'ฐานการขายและการดูแลลูกค้าอยู่หน้างานจริง ไม่ใช่หน้าเว็บอย่างเดียว',
    enTitle: 'Storefront and support team',
    enDescription: 'Our sales and customer support operation is based at a real storefront.',
  },
  {
    src: '/reviews/bubble-pack.jpg',
    alt: 'การแพ็กสินค้าแบบกันกระแทกก่อนจัดส่ง',
    title: 'แพ็กกันกระแทกก่อนส่ง',
    description: 'ลดความเสี่ยงระหว่างขนส่งและช่วยให้ร้านค้ารับงานต่อได้มั่นใจขึ้น',
    enTitle: 'Protective packing before dispatch',
    enDescription: 'Careful packing reduces transit risk and helps retailers receive stock confidently.',
  },
  {
    src: '/reviews/outbound-boxes.jpg',
    alt: 'กล่องสินค้าที่เตรียมจัดส่ง',
    title: 'ออเดอร์เตรียมออก',
    description: 'มีรอบแพ็กและจัดส่งจริง ไม่ใช่เพียงแค่เปิดรับคำถามเรื่องราคา',
    enTitle: 'Orders ready to leave',
    enDescription: 'A real daily packing and dispatch workflow, not simply a price enquiry page.',
  },
  {
    src: '/reviews/oppo-batch.jpg',
    alt: 'สินค้าล็อต OPPO ที่เตรียมส่ง',
    title: 'มีหลากหลายแบรนด์',
    description: 'รองรับทั้งรุ่นตลาดหลักและรุ่นที่ร้านค้าต้องการเช็กราคาเป็นรอบๆ',
    enTitle: 'Multi-brand supply',
    enDescription: 'Supporting popular models and additional stock requested by retail partners.',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
}

export default function ReviewsSection() {
  const { isThai } = useLanguage()

  return (
    <Section
      id="reviews"
      title={isThai ? 'ภาพจากการดำเนินงานจริง' : 'Inside our real operation'}
      subtitle={
        isThai
          ? 'สต็อกสินค้า ทีมงาน การแพ็ก และออเดอร์ที่เตรียมส่งให้ร้านค้าพาร์ทเนอร์'
          : 'Real stock, our team, careful packing, and orders prepared for retail partners.'
      }
    >
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="group relative overflow-hidden rounded-[2rem] bg-zinc-100 shadow-sm md:col-span-2 lg:col-span-2">
          <img
            src="/reviews/iphone-lot.jpg"
            alt="ล็อตสินค้า iPhone จากงานจริงของ PK HUB"
            className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[420px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <div className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isThai ? 'หลากหลายรุ่น พร้อมปล่อย' : 'Multiple models ready for partners'}
            </div>
            <div className="max-w-lg text-sm leading-[1.6] text-zinc-200 sm:text-base">
              {isThai
                ? 'ภาพจากงานจริงของ PK HUB ยืนยันว่ามีสินค้าเข้า มีการหมุนเวียน และส่งต่อให้ร้านค้าอย่างต่อเนื่อง'
                : 'Real PK HUB stock showing active inventory flow and regular supply to our retail partners.'}
            </div>
          </div>
        </motion.div>

        {REVIEW_IMAGES.map((image) => (
          <motion.div variants={itemVariants} key={image.title} className="group relative overflow-hidden rounded-[2rem] bg-zinc-100 shadow-sm">
            <img
              src={image.src}
              alt={image.alt}
              className="h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[320px] lg:h-[100%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="mb-2 text-lg font-bold tracking-tight text-white">{isThai ? image.title : image.enTitle}</div>
              <div className="text-sm leading-[1.6] text-zinc-300">
                {isThai ? image.description : image.enDescription}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
