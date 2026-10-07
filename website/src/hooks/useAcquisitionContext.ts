import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {captureAcquisitionContext} from '@/utils/acquisitionContext'
export function useAcquisitionContext(){
  const location=useLocation()
  useEffect(()=>{try{captureAcquisitionContext(window.location.href,window.sessionStorage)}catch{/* Do not interfere with navigation. */}},[location.pathname,location.search])
}
