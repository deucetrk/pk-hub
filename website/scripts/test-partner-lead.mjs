import test from 'node:test'
import assert from 'node:assert/strict'

import {
  generateRequestId,
  hasErrors,
  isValidThaiPhone,
  normalizePhone,
  validatePartnerLead,
} from '../src/utils/partnerLead.ts'
import {
  buildDealerPortalUrl,
  normalizeReferralCode,
  readReferralCode,
  withReferral,
} from '../src/utils/referralAttribution.ts'
import { submitPartnerLead } from '../src/services/partnerLeadSubmission.ts'

const VALID_SAMPLE_LEAD = {
  shopName: 'ร้านโมบายฉะเชิงเทรา',
  province: 'ฉะเชิงเทรา',
  contactName: 'สมชาย ค้าดี',
  phone: '089-248-0888',
  lineId: '@somchai_mobile',
  email: 'somchai@example.com',
  socialContact: 'fb.com/somchaimobile',
  address: 'อ.เมือง ฉะเชิงเทรา',
  taxId: '0245540000020',
  interestedBrands: ['Apple', 'Samsung'],
  note: 'สนใจสั่งซื้อขั้นต้น 50,000 บาท',
  consent: true,
}

test('Validation: valid Thai lead produces no errors', () => {
  const errors = validatePartnerLead(VALID_SAMPLE_LEAD, 'th')
  assert.equal(hasErrors(errors), false)
  assert.deepEqual(errors, {})
})

test('Validation: valid English lead produces no errors', () => {
  const errors = validatePartnerLead(
    {
      ...VALID_SAMPLE_LEAD,
      shopName: 'Chachoengsao Mobile',
      contactName: 'Somchai',
    },
    'en',
  )
  assert.equal(hasErrors(errors), false)
  assert.deepEqual(errors, {})
})

test('Validation: missing required fields flagged in Thai and English', () => {
  const emptyLead = {
    shopName: '',
    province: '',
    contactName: '',
    phone: '',
    lineId: '',
    email: '',
    socialContact: '',
    address: '',
    taxId: '',
    interestedBrands: [],
    note: '',
    consent: false,
  }

  const thErrors = validatePartnerLead(emptyLead, 'th')
  assert.equal(thErrors.shopName, 'กรุณากรอกชื่อร้านค้า')
  assert.equal(thErrors.province, 'กรุณากรอกจังหวัด')
  assert.equal(thErrors.contactName, 'กรุณากรอกชื่อผู้ติดต่อ')
  assert.equal(thErrors.phone, 'กรุณากรอกเบอร์โทร')
  assert.equal(thErrors.interestedBrands, 'กรุณาเลือกอย่างน้อย 1 แบรนด์')
  assert.equal(thErrors.consent, 'กรุณายืนยันความยินยอมก่อนส่งข้อมูล')

  const enErrors = validatePartnerLead(emptyLead, 'en')
  assert.equal(enErrors.shopName, 'Please enter your store name')
  assert.equal(enErrors.province, 'Please enter your province')
  assert.equal(enErrors.contactName, 'Please enter a contact name')
  assert.equal(enErrors.phone, 'Please enter a phone number')
  assert.equal(enErrors.interestedBrands, 'Please select at least one brand')
  assert.equal(enErrors.consent, 'Please confirm consent before submitting')
})

test('Phone normalization: handles standard, spaced, hyphenated, and +66 formats', () => {
  assert.equal(normalizePhone('0892480888'), '0892480888')
  assert.equal(normalizePhone('089-248-0888'), '0892480888')
  assert.equal(normalizePhone('089 248 0888'), '0892480888')
  assert.equal(normalizePhone('+66892480888'), '0892480888')
  assert.equal(normalizePhone('+66 89 248 0888'), '0892480888')
  assert.equal(normalizePhone('+66-89-248-0888'), '0892480888')
  assert.equal(normalizePhone('02-123-4567'), '021234567')

  assert.equal(isValidThaiPhone('0892480888'), true)
  assert.equal(isValidThaiPhone('089-248-0888'), true)
  assert.equal(isValidThaiPhone('+66 89 248 0888'), true)
  assert.equal(isValidThaiPhone('021234567'), true) // 9 digits Bangkok landline
  assert.equal(isValidThaiPhone('038123456'), true) // 9 digits Eastern landline

  // Invalid phones
  assert.equal(isValidThaiPhone(''), false)
  assert.equal(isValidThaiPhone('123456789'), false) // Doesn't start with 0
  assert.equal(isValidThaiPhone('08123'), false) // Too short
  assert.equal(isValidThaiPhone('081234567890'), false) // Too long
  assert.equal(isValidThaiPhone('08x-xxx-xxxx'), false) // Placeholders
})

test('Email validation: optional field permits empty but validates when provided', () => {
  const withoutEmail = { ...VALID_SAMPLE_LEAD, email: '' }
  assert.equal(validatePartnerLead(withoutEmail, 'th').email, undefined)

  const invalidEmail = { ...VALID_SAMPLE_LEAD, email: 'not-an-email' }
  assert.equal(
    validatePartnerLead(invalidEmail, 'th').email,
    'รูปแบบอีเมลไม่ถูกต้อง',
  )
  assert.equal(
    validatePartnerLead(invalidEmail, 'en').email,
    'Please enter a valid email address',
  )
})

test('Frontend validation: current brand-selection requirement is preserved', () => {
  // Existing form UX still requests one brand; server intake supports service-only leads.
  // A later service-interest form can change that UX without restoring the Sheet contract.
  const noBrands = { ...VALID_SAMPLE_LEAD, interestedBrands: [] }
  const errors = validatePartnerLead(noBrands, 'th')
  assert.ok(errors.interestedBrands)
})

test('Request ID generation: generates valid RFC4122 v4 UUID format', () => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const id1 = generateRequestId()
  const id2 = generateRequestId()

  assert.match(id1, uuidRegex)
  assert.match(id2, uuidRegex)
  assert.notEqual(id1, id2)
})

test('Referral Attribution: normalizes codes and enforces validation regex', () => {
  assert.equal(normalizeReferralCode('DEALER01'), 'DEALER01')
  assert.equal(normalizeReferralCode('pk-partner-123'), 'pk-partner-123')
  assert.equal(normalizeReferralCode('  code_valid  '), 'code_valid')

  // Disallowed characters / invalid lengths
  assert.equal(normalizeReferralCode(''), null)
  assert.equal(normalizeReferralCode('ab'), null) // < 3 chars
  assert.equal(normalizeReferralCode('-invalid'), null) // starts with hyphen
  assert.equal(normalizeReferralCode('bad!code'), null) // invalid symbol
})

test('Referral Attribution: preserves code across URL, sessionStorage, and localStorage', () => {
  const mockStorage = () => {
    const store = new Map()
    return {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    }
  }

  const session = mockStorage()
  const local = mockStorage()

  // 1. URL parameter takes precedence and writes back to session & local storage
  const codeFromUrl = readReferralCode('?ref=CAMP_PROMO', session, local)
  assert.equal(codeFromUrl, 'CAMP_PROMO')
  assert.equal(session.getItem('pkhub.referral-code'), 'CAMP_PROMO')
  assert.equal(local.getItem('pkhub.referral-code'), 'CAMP_PROMO')

  // 2. Subsequent navigation without search param reads from session storage
  const codeFromSession = readReferralCode('', session, local)
  assert.equal(codeFromSession, 'CAMP_PROMO')

  // 3. New session reads from persistent local storage
  const newSession = mockStorage()
  const codeFromLocal = readReferralCode('', newSession, local)
  assert.equal(codeFromLocal, 'CAMP_PROMO')
})

test('Referral URL formatting: withReferral and buildDealerPortalUrl', () => {
  assert.equal(
    withReferral('/th/join', 'DEALER101'),
    '/th/join?ref=DEALER101',
  )
  assert.equal(
    withReferral('/th/join?step=1', 'DEALER101'),
    '/th/join?step=1&ref=DEALER101',
  )
  assert.equal(
    withReferral('/th/join#form', 'DEALER101'),
    '/th/join?ref=DEALER101#form',
  )
  // External URLs are not appended
  assert.equal(
    withReferral('https://lin.ee/VEgW6qG', 'DEALER101'),
    'https://lin.ee/VEgW6qG',
  )

  // buildDealerPortalUrl
  assert.equal(
    buildDealerPortalUrl('https://dealer.pkhub.co', 'DEALER101'),
    'https://dealer.pkhub.co/login?ref=DEALER101',
  )
  assert.equal(
    buildDealerPortalUrl('https://dealer.pkhub.co/', null),
    'https://dealer.pkhub.co/login',
  )
  assert.equal(
    buildDealerPortalUrl(
      'https://dealer.pkhub.co',
      'DEALER101',
      '/onboarding?mode=retail',
    ),
    'https://dealer.pkhub.co/onboarding?mode=retail&ref=DEALER101',
  )
})

const transportPayload = () => ({...VALID_SAMPLE_LEAD,language:'th',sourcePage:'https://pkhub.co/th/join',requestId:generateRequestId(),website:'',referralCode:'REF_TEST_99',acquisitionSource:'BD_REFERRAL'})
const receiptFor = payload => ({status:'received',requestId:payload.requestId,receivedAt:'2026-10-07T04:00:00.000Z',duplicate:false})
const options = {endpoint:'https://example.supabase.co/functions/v1/partner-lead-intake',publicKey:'test-public-key'}

test('Transport rejects empty, placeholder and legacy Sheet configuration',async()=>{
 for(const endpoint of ['', 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec','https://script.google.com/macros/s/AKfycbz_test_receiver_pkhub_qa/exec'])await assert.rejects(()=>submitPartnerLead(transportPayload(),{...options,endpoint}),/INTAKE_NOT_CONFIGURED/)
 await assert.rejects(()=>submitPartnerLead(transportPayload(),{...options,publicKey:''}),/INTAKE_NOT_CONFIGURED/)
})
test('Transport serializes attribution and normalized phone and requires persisted receipt',async()=>{
 const payload={...transportPayload(),phone:'+66 89 248 0888'};let body,initSeen
 const receipt=await submitPartnerLead(payload,{...options,fetchFn:async(_url,init)=>{body=JSON.parse(init.body);initSeen=init;return Response.json(receiptFor(payload),{status:201})}})
 assert.equal(body.phone,'0892480888');assert.equal(body.referralCode,payload.referralCode);assert.equal(body.acquisitionSource,'BD_REFERRAL');assert.equal(initSeen.mode,'cors');assert.equal(receipt.requestId,payload.requestId)
})
test('Transport rejects opaque, HTML and malformed success responses',async()=>{
 const payload=transportPayload()
 for(const response of [new Response('<html>not a receipt</html>'),Response.json({ok:true}),Response.json({...receiptFor(payload),requestId:generateRequestId()}),Response.json({...receiptFor(payload),receivedAt:'invalid'})])await assert.rejects(()=>submitPartnerLead(payload,{...options,fetchFn:async()=>response}),/RECEIPT_UNVERIFIED/)
})
test('Transport handles rejection, conflict and rate limiting as failures',async()=>{
 for(const [status,code] of [[409,'REQUEST_ID_CONFLICT'],[429,'RATE_LIMITED'],[503,'INTAKE_UNAVAILABLE']])await assert.rejects(()=>submitPartnerLead(transportPayload(),{...options,fetchFn:async()=>Response.json({code},{status})}),new RegExp(code==='INTAKE_UNAVAILABLE'?'INTAKE_REJECTED':code))
})
test('Transport times out and preserves retry request identity',async()=>{
 const payload=transportPayload();const attempts=[]
 const hanging=async(_url,init)=>{attempts.push(JSON.parse(init.body));return new Promise((_resolve,reject)=>init.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))))}
 await assert.rejects(()=>submitPartnerLead(payload,{...options,timeoutMs:20,fetchFn:hanging}),/Aborted/)
 const r=await submitPartnerLead(payload,{...options,fetchFn:async(_url,init)=>{attempts.push(JSON.parse(init.body));return Response.json({...receiptFor(payload),duplicate:true})}})
 assert.equal(r.duplicate,true);assert.deepEqual(attempts[0],attempts[1])
})

import {captureAcquisitionContext} from '../src/utils/acquisitionContext.ts'
test('Acquisition context survives native page navigation and strips arbitrary query data',()=>{
 const entries=new Map();const storage={getItem:k=>entries.get(k)??null,setItem:(k,v)=>entries.set(k,v)}
 captureAcquisitionContext('https://pkhub.co/th?utm_source=campaign&utm_campaign=dealers&token=private',storage)
 captureAcquisitionContext('https://pkhub.co/th/products/stock-on-demand',storage)
 const context=captureAcquisitionContext('https://pkhub.co/th/join',storage)
 assert.equal(context.firstTouch.utm.utm_source,'campaign')
 assert.equal(context.latestCampaign.utm.utm_campaign,'dealers')
 assert.equal(context.lastProductPage,'https://pkhub.co/th/products/stock-on-demand')
 assert.ok(!JSON.stringify(context).includes('private'))
 assert.deepEqual(context,captureAcquisitionContext('https://pkhub.co/th/join',storage))
})
