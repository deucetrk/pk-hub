export const HOME_FAQS = {
  th: [
    { q: 'PK HUB ขายส่งมือถือแบรนด์อะไรบ้าง?', a: 'สอบถามมือถือจาก Apple, Samsung, OPPO, vivo, realme, Xiaomi, HONOR และ Infinix ได้กับทีม PK รุ่น สี ความจุ ราคา และสต็อกต้องตรวจสอบก่อนยืนยันแต่ละออเดอร์' },
    { q: 'ต้องสั่งขั้นต่ำเท่าไหร่?', a: 'เริ่มสอบถามได้โดยไม่มีขั้นต่ำในการคุย แจ้งรุ่นและจำนวนที่สนใจ เพื่อให้ทีมยืนยันเงื่อนไขการสั่งซื้อของรายการนั้นก่อนตัดสินใจ' },
    { q: 'ร้านอยู่ที่ไหน และดูแลพื้นที่ใดบ้าง?', a: 'หน้าร้านอยู่ที่ 72/29-30 ถนนศุขประยูร ฉะเชิงเทรา ดูแลร้านค้าในฉะเชิงเทราและภาคตะวันออก สำหรับพื้นที่อื่นให้สอบถามรอบและวิธีจัดส่งกับทีมโดยตรง' },
    { q: 'เช็กราคาและรอบจัดส่งได้อย่างไร?', a: 'ทัก LINE @pkhub พร้อมรุ่น สี ความจุ และจำนวน ทีมจะตรวจสอบราคา สต็อก และรอบจัดส่งให้ยืนยันก่อนสั่งซื้อ' },
    { q: 'มีใบกำกับภาษีและข้อมูลประกันหรือไม่?', a: 'PK HUB ออกใบกำกับภาษีได้ แจ้งข้อมูลเอกสารที่ร้านต้องการ และตรวจสอบรายละเอียดประกันของรุ่นที่สนใจกับทีมก่อนยืนยันออเดอร์' },
    { q: 'สมัครแล้วเข้าระบบค้าส่งได้ทันทีหรือไม่?', a: 'การสมัครเป็นการส่งข้อมูลให้ทีม PK ตรวจสอบและติดต่อกลับ สิทธิ์เข้าระบบค้าส่งเปิดหลังได้รับการอนุมัติเท่านั้น' },
  ],
  en: [
    { q: 'Which smartphone brands can I ask PK HUB about?', a: 'Ask PK about Apple, Samsung, OPPO, vivo, realme, Xiaomi, HONOR, and Infinix. Models, colours, capacities, prices, and availability are checked before each order is confirmed.' },
    { q: 'Is there a minimum order?', a: 'There is no minimum to start a conversation. Share the models and quantities you need so the team can confirm the applicable ordering terms before you decide.' },
    { q: 'Where is PK HUB and which areas do you serve?', a: 'Our storefront is at 72/29-30 Sukprayoon Road, Chachoengsao. We work with retailers in Chachoengsao and eastern Thailand. Ask the team about delivery arrangements for other areas.' },
    { q: 'How do I check prices and delivery timing?', a: 'Message @pkhub on LINE with the model, colour, capacity, and quantity. The team checks prices, availability, and dispatch timing before you confirm an order.' },
    { q: 'Can I get a tax invoice and warranty information?', a: 'PK HUB can issue tax invoices. Tell the team which documents your store needs and confirm the warranty details for your selected models before ordering.' },
    { q: 'Does applying give me immediate wholesale access?', a: 'An application sends your details to PK for review and follow-up. Wholesale access is activated only after approval.' },
  ],
}

export function getHomeFaqSchema(language: 'th' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: language,
    mainEntity: HOME_FAQS[language].map(({ q, a }) => ({
      '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
