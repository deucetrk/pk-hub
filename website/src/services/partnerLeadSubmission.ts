import { normalizePhone, type PartnerLeadSubmission } from '../utils/partnerLead.ts'

const ENDPOINT = (import.meta.env?.VITE_PARTNER_INTAKE_URL || import.meta.env?.VITE_PARTNER_LEAD_ENDPOINT)?.trim()
const PUBLIC_KEY = import.meta.env?.VITE_PARTNER_LEAD_PUBLIC_KEY?.trim()
const REQUEST_TIMEOUT_MS = 12_000
export type PartnerLeadReceipt = {status:'received';requestId:string;receivedAt:string;duplicate:boolean}
export type SubmitLeadOptions = {endpoint?:string;publicKey?:string;fetchFn?:typeof fetch;timeoutMs?:number}
export class PartnerLeadSubmissionError extends Error {
  code:string
  constructor(code:string){super(code);this.code=code}
}
export async function submitPartnerLead(payload:PartnerLeadSubmission,options?:SubmitLeadOptions):Promise<PartnerLeadReceipt>{
  const endpoint=(options?.endpoint??ENDPOINT)?.trim()
  const publicKey=(options?.publicKey??PUBLIC_KEY)?.trim()
  if(!endpoint||endpoint.includes('YOUR_DEPLOYMENT_ID')||endpoint.includes('script.google.com')||endpoint.includes('test_receiver_pkhub_qa'))throw new PartnerLeadSubmissionError('INTAKE_NOT_CONFIGURED')
  if(!publicKey)throw new PartnerLeadSubmissionError('INTAKE_NOT_CONFIGURED')
  const controller=new AbortController()
  const timer=setTimeout(()=>controller.abort(),options?.timeoutMs??REQUEST_TIMEOUT_MS)
  try{
    const result=await(options?.fetchFn??fetch)(endpoint,{method:'POST',mode:'cors',headers:{'Content-Type':'application/json',apikey:publicKey,Authorization:`Bearer ${publicKey}`},body:JSON.stringify({...payload,phone:normalizePhone(payload.phone)}),signal:controller.signal})
    let receipt:unknown
    try{receipt=await result.json()}catch{throw new PartnerLeadSubmissionError('RECEIPT_UNVERIFIED')}
    const value=receipt as Partial<PartnerLeadReceipt> & {code?:string}
    if(!result.ok)throw new PartnerLeadSubmissionError(value?.code==='REQUEST_ID_CONFLICT'?'REQUEST_ID_CONFLICT':value?.code==='RATE_LIMITED'?'RATE_LIMITED':'INTAKE_REJECTED')
    if(value?.status!=='received'||value.requestId!==payload.requestId||typeof value.receivedAt!=='string'||!Number.isFinite(Date.parse(value.receivedAt))||typeof value.duplicate!=='boolean')throw new PartnerLeadSubmissionError('RECEIPT_UNVERIFIED')
    return value as PartnerLeadReceipt
  }finally{clearTimeout(timer)}
}
