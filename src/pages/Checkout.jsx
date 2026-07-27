import { useState } from 'react'
import OrderButtons from '../components/OrderButtons.jsx'
import { useCart } from '../context/CartContext.jsx'
import { settings } from '../lib/content.js'
import { makeCartMessage } from '../lib/orders.js'

export default function Checkout() {
  const { items } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '', district: '', area: '', payment: 'Cash on Delivery', note: '' })
  const delivery = Number(settings.contact.delivery_charge || 0)
  const message = makeCartMessage(items, delivery, form)
  function set(key, value) { setForm((prev) => ({ ...prev, [key]: value })) }
  return (
    <section className="container-pad py-12">
      <h1 className="text-4xl font-extrabold text-brand-900">Checkout</h1>
      <p className="mt-3 text-stone-600">এখানে কোনো পেমেন্ট নেওয়া হবে না। তথ্য পূরণ করে WhatsApp/Messenger-এ অর্ডার পাঠান।</p>
      <div className="grid gap-8 lg:grid-cols-2 mt-8">
        <div className="card p-6 grid gap-4">
          <input className="input" placeholder="নাম" value={form.name} onChange={(e)=>set('name', e.target.value)} />
          <input className="input" placeholder="মোবাইল নম্বর" value={form.phone} onChange={(e)=>set('phone', e.target.value)} />
          <textarea className="input" placeholder="পূর্ণ ঠিকানা" rows="3" value={form.address} onChange={(e)=>set('address', e.target.value)} />
          <input className="input" placeholder="জেলা" value={form.district} onChange={(e)=>set('district', e.target.value)} />
          <input className="input" placeholder="ডেলিভারি এরিয়া" value={form.area} onChange={(e)=>set('area', e.target.value)} />
          <select className="input" value={form.payment} onChange={(e)=>set('payment', e.target.value)}><option>Cash on Delivery</option><option>Manual bKash</option><option>Manual Nagad</option></select>
          <textarea className="input" placeholder="অর্ডার নোট" rows="3" value={form.note} onChange={(e)=>set('note', e.target.value)} />
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-extrabold text-brand-900">Generated Order Message</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-brand-50 border border-brand-100 p-4 text-sm leading-7 max-h-[420px] overflow-auto">{message}</pre>
          <OrderButtons message={message} className="mt-5" />
        </div>
      </div>
    </section>
  )
}
