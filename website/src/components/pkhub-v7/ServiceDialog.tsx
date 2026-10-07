import { useEffect, useRef } from 'react'
import { ArrowUpRight, MessageCircle, X } from 'lucide-react'
import { CAPABILITY_PRODUCT, productPath } from '@/content/productServices'
import { CONTACT } from '@/pages/home/constants'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'

export interface ServiceDetail {
  id: string
  title: string
  description: string
}

interface ServiceDialogProps {
  service: ServiceDetail | null
  triggerEl?: HTMLElement | null
  onClose: () => void
}

export default function ServiceDialog({ service, triggerEl, onClose }: ServiceDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerElRef = useRef<HTMLElement | null>(null)
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()

  useEffect(() => {
    if (triggerEl) {
      triggerElRef.current = triggerEl
    }
  }, [triggerEl])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (service) {
      if (triggerEl) {
        triggerElRef.current = triggerEl
      } else if (!triggerElRef.current) {
        triggerElRef.current = (document.activeElement as HTMLElement) || null
      }
      if (!dialog.open) {
        dialog.showModal()
      }
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [service, triggerEl])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      dialog.close()
    }

    const handleClose = () => {
      onClose()
      requestAnimationFrame(() => {
        triggerElRef.current?.focus({ preventScroll: true })
      })
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('close', handleClose)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('close', handleClose)
    }
  }, [onClose])

  const handleCloseClick = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="v6-service-dialog"
      aria-labelledby="v6-service-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current?.close()
        }
      }}
    >
      <button
        ref={closeBtnRef}
        className="v6-dialog-close cursor-interaction"
        aria-label={isThai ? 'ปิดรายละเอียด' : 'Close details'}
        type="button"
        onClick={handleCloseClick}
      >
        <X size={18} aria-hidden="true" />
      </button>

      <p className="v4-eyebrow">PK HUB · PARTNER SERVICES</p>
      <h2 id="v6-service-title">{service?.title || ''}</h2>
      <p className="v6-service-copy">{service?.description || ''}</p>

      {service && CAPABILITY_PRODUCT[service.id] ? <a className="v4-text-action cursor-interaction" href={withReferral(productPath(language, CAPABILITY_PRODUCT[service.id]), referralCode)}>{isThai ? 'ดูรายละเอียดบริการ' : 'Explore service details'}<ArrowUpRight size={15} aria-hidden="true" /></a> : null}

      <a
        href={CONTACT.LINE_URL}
        target="_blank"
        rel="noreferrer"
        className="v4-primary cursor-interaction inline-flex items-center justify-center no-underline"
      >
        {isThai ? 'คุยกับทีม PK ทาง LINE' : 'Talk with PK Team on LINE'}{' '}
        <MessageCircle size={16} aria-hidden="true" />
      </a>
    </dialog>
  )
}
