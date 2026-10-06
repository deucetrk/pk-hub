// Owner-confirmed publication metrics approved on 2026-10-06.
// Keep provenance distinct from independently audited analytics; preserve the approved values.

export type MetricConfig = {
  from: number
  to: number
  unit: string
  label: string
  labelEn: string
  description?: string
  descriptionEn?: string
}

export const APPROVED_METRICS = {
  growth: {
    sku: {
      from: 40,
      to: 100,
      unit: 'SKU',
      label: 'ตัวเลือกขายที่เข้าถึงได้',
      labelEn: 'Accessible sale options',
      description: 'ขยายตัวเลือกที่เสนอให้ลูกค้า โดยไม่ต้องถือสินค้าทุกรุ่นไว้เอง',
      descriptionEn: 'Expand customer options without stocking every handset yourself',
    },
    profit: {
      from: 1,
      to: 10,
      unit: '×',
      label: 'โอกาสเติบโตของกำไร',
      labelEn: 'Profit growth opportunity',
      description: 'เปิดหลายโอกาสในหนึ่งความสัมพันธ์ ตั้งแต่สินค้า อุปกรณ์เสริม ไปจนถึงบริการ',
      descriptionEn: 'Multiple margin opportunities per relationship, from handsets to accessories and services',
    },
  },
  marketing: {
    views: {
      from: 0,
      to: 100000,
      unit: 'views',
      label: 'ยอดชม',
      labelEn: 'Views',
    },
    comments: {
      from: 0,
      to: 1000,
      unit: 'comments',
      label: 'ความคิดเห็น',
      labelEn: 'Comments',
    },
  },
  topup: {
    from: 0,
    to: 1000,
    unit: 'THB',
    label: 'ยอดเติมเงินต่อรายการ',
    labelEn: 'Top-up amount per transaction',
  },
  presentation: {
    counterDurationMs: 2000,
    marketingLayout: 'simultaneous two columns, no tabs',
    format: 'full numbers with commas and tabular digits',
    screenReader: 'final values only',
  },
} as const
