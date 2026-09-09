import { Navigate, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from '@/i18n/LanguageContext'
import Home from '@/pages/Home'
import Join from '@/pages/Join'
import DealerLogin from '@/pages/DealerLogin'
import BlogArticle from '@/pages/blog/BlogArticle'
import BlogIndex from '@/pages/blog/BlogIndex'

export default function AppRoutes() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/th" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/th/join" element={<Join />} />
        <Route path="/en/join" element={<Join />} />
        <Route path="/th/dealer/login" element={<DealerLogin />} />
        <Route path="/en/dealer/login" element={<DealerLogin />} />
        <Route path="/th/blog" element={<BlogIndex />} />
        <Route path="/th/blog/page/:page" element={<BlogIndex />} />
        <Route path="/th/blog/:slug" element={<BlogArticle />} />
        <Route path="*" element={<Navigate to="/th" replace />} />
      </Routes>
    </LanguageProvider>
  )
}
