import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from '@/i18n/LanguageContext'
import Home from '@/pages/Home'

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/th" replace />} />
          <Route path="/th" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="*" element={<Navigate to="/th" replace />} />
        </Routes>
      </LanguageProvider>
    </Router>
  )
}
