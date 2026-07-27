import { Phone, Facebook, MapPin } from 'lucide-react'
import OrderButtons from '../components/OrderButtons.jsx'
import { settings } from '../lib/content.js'

export default function Contact() {
  const c = settings.contact
  return (
    <section className="container-pad py-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="badge">Contact</span>
        <h1 className="mt-3 text-4xl font-extrabold text-brand-900">এখনই অর্ডার করুন</h1>
        <p className="mt-3 text-stone-600">WhatsApp, Messenger অথবা সরাসরি কল করে অর্ডার করতে পারেন।</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-extrabold text-brand-900">যোগাযোগ</h2>
          <div className="mt-5 space-y-3">
            {(c.phones || []).map((p) => <a key={p} href={`tel:${p}`} className="flex items-center gap-3 rounded-2xl bg-brand-50 border border-brand-100 p-4 font-bold"><Phone/> {p}</a>)}
            <a href={c.facebook_page_url} target="_blank" className="flex items-center gap-3 rounded-2xl bg-brand-50 border border-brand-100 p-4 font-bold"><Facebook/> Facebook Page</a>
            <div className="flex items-center gap-3 rounded-2xl bg-brand-50 border border-brand-100 p-4 font-bold"><MapPin/> {c.address || 'Bangladesh'}</div>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-extrabold text-brand-900">দ্রুত অর্ডার</h2>
          <p className="mt-3 leading-8 text-stone-700">নিচের বাটন থেকে সরাসরি RIBAZ টিমের সাথে যোগাযোগ করুন।</p>
          <OrderButtons message="আসসালামু আলাইকুম, আমি RIBAZ-এর খাঁটি গুঁড়া মসলা অর্ডার করতে চাই।" className="mt-6" />
        </div>
      </div>
    </section>
  )
}
