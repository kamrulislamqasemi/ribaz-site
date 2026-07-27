import { Link } from 'react-router-dom'
import { Phone, Facebook } from 'lucide-react'
import { settings } from '../lib/content.js'

export default function Footer() {
  const c = settings.contact
  return (
    <footer className="mt-20 bg-brand-900 text-brand-50">
      <div className="container-pad py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-3xl font-extrabold">RIBAZ</div>
          <p className="mt-3 text-brand-100">রান্নায় শুদ্ধতা, জীবনে বিশুদ্ধতা। পরিবারের জন্য নিরাপদ ও অথেনটিক গুঁড়া মসলা।</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">মেন্যু</h3>
          <div className="grid gap-2 text-brand-100">
            <Link to="/products">Products</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/about">About RIBAZ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">যোগাযোগ</h3>
          <div className="grid gap-2 text-brand-100">
            {(c.phones || []).map((p) => <a key={p} href={`tel:${p}`} className="inline-flex items-center gap-2"><Phone size={16} /> {p}</a>)}
            <a href={c.facebook_page_url} target="_blank" className="inline-flex items-center gap-2"><Facebook size={16} /> Facebook Page</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-brand-100">© {new Date().getFullYear()} RIBAZ. All rights reserved.</div>
    </footer>
  )
}
