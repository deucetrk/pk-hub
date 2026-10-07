export type AcquisitionTouch = { page: string; utm: Record<string,string> }
export type AcquisitionContext = { firstTouch: AcquisitionTouch; latestCampaign: AcquisitionTouch | null; lastProductPage: string | null }
const KEY='pkhub.acquisition-context.v1'
const KEYS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
export function captureAcquisitionContext(href:string,storage?:Pick<Storage,'getItem'|'setItem'>):AcquisitionContext {
  const url=new URL(href)
  const utm:Record<string,string>={}
  for(const k of KEYS){const v=url.searchParams.get(k);if(v)utm[k]=v.slice(0,200)}
  const touch={page:url.origin+url.pathname,utm}
  let previous:AcquisitionContext | null=null
  try{const raw=storage?.getItem(KEY);if(raw){const value=JSON.parse(raw);if(value?.firstTouch?.page && typeof value.firstTouch.page==='string')previous=value}}catch{/* Attribution must not block the form. */}
  const context:AcquisitionContext={firstTouch:previous?.firstTouch??touch,latestCampaign:Object.keys(utm).length?touch:previous?.latestCampaign??null,lastProductPage:/^\/(th|en)\/products\/[^/]+\/?$/.test(url.pathname)?touch.page:previous?.lastProductPage??null}
  try{storage?.setItem(KEY,JSON.stringify(context))}catch{/* Storage may be unavailable. */}
  return context
}
