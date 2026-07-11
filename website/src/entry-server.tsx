import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'

import AppRoutes from '@/AppRoutes'

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </LazyMotion>
    </StrictMode>,
  )
}
