import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes, { type RoutePages } from '@/AppRoutes'

export default function App(pages: RoutePages) {
  return (
    <Router>
      <AppRoutes {...pages} />
    </Router>
  )
}
