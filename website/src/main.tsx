import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App'
import './index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
