import { Component, Suspense, useEffect, useRef, type ComponentType, type ReactNode } from 'react'

import LegacyNavbar from '@/components/LegacyNavbar'
import Container from '@/components/Container'

export default function RouteFeedback({
  failed = false,
  english = false,
  reloadHref = '/',
}: {
  failed?: boolean
  english?: boolean
  reloadHref?: string
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (failed) heading.current?.focus({ preventScroll: true })
  }, [failed])

  return (
    <div className="min-h-dvh bg-[var(--pk-white)] text-[var(--pk-black)]">
      <a href="#route-feedback" className="pk-skip-link">
        {english ? 'Skip to content' : 'ข้ามไปเนื้อหา'}
      </a>
      <LegacyNavbar />
      <main id="route-feedback" tabIndex={-1} className="pk-route-feedback" aria-busy={!failed}>
        <Container>
          <div className="pk-route-feedback-copy">
            <p className="pk-route-feedback-label">PK HUB</p>
            <h1 ref={heading} tabIndex={-1} className="focus:outline-none">
              {failed
                ? english
                  ? 'This page could not open'
                  : 'ยังเปิดหน้านี้ไม่ได้'
                : english
                  ? 'Opening your page'
                  : 'กำลังเปิดหน้า'}
            </h1>
            <p role={failed ? 'alert' : 'status'}>
              {failed
                ? english
                  ? 'Check your connection, then reload this page.'
                  : 'ตรวจสอบการเชื่อมต่อ แล้วลองโหลดหน้านี้อีกครั้ง'
                : english
                  ? 'Please wait while the page loads.'
                  : 'รอสักครู่ระหว่างโหลดเนื้อหา'}
            </p>
            {!failed && (
              <div className="pk-route-progress" aria-hidden="true">
                <span />
              </div>
            )}
            <div className="pk-route-feedback-actions">
              {failed && (
                <a
                  className="pk-action pk-action-primary"
                  href={reloadHref}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                    event.preventDefault()
                    window.location.reload()
                  }}
                >
                  {english ? 'Reload this page' : 'โหลดหน้านี้อีกครั้ง'}
                </a>
              )}
              <a className="pk-action pk-action-secondary" href={english ? '/en' : '/th'}>
                {english ? 'Back to home' : 'กลับหน้าหลัก'}
              </a>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}

type BoundaryProps = {
  children: ReactNode
  english: boolean
  reloadHref: string
  Page: ComponentType
}
type BoundaryState = { failed: boolean; Page: ComponentType; version: number }

export class RouteErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state = { failed: false, Page: this.props.Page, version: 0 }
  static getDerivedStateFromProps(props: BoundaryProps, state: BoundaryState) {
    // Query, hash and locale changes must preserve an existing form/request.
    // Only a different page component clears a failed route.
    return props.Page === state.Page
      ? null
      : { failed: false, Page: props.Page, version: state.version + 1 }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <RouteFeedback failed english={this.props.english} reloadHref={this.props.reloadHref} />
    ) : (
      <Suspense key={this.state.version} fallback={<RouteFeedback english={this.props.english} />}>
        {this.props.children}
      </Suspense>
    )
  }
}
