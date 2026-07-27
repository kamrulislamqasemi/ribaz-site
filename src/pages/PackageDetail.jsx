import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import OrderButtons from '../components/OrderButtons.jsx'
import { formatPrice, getPackage } from '../lib/content.js'
import { makePackageMessage } from '../lib/orders.js'
import { useCart } from '../context/CartContext.jsx'

export default function PackageDetail() {
  const { slug } = useParams()
  const pkg = getPackage(slug)
  const { addItem } = useCart()
  if (!pkg) return <section className="container-pad py-20"><h1 className="text-3xl font-bold">Package not found</h1><Link className="btn-primary mt-5" to="/packages">Back to packages</Link></section>
  const price = Number(pkg.offer_price || pkg.total_price || 0)
  const message = makePackageMessage(pkg, 1)
  return (
    <section className="container-pad py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="card overflow-hidden h-[420px]"><ProductImage src={pkg.image} alt={pkg.name} /></div>
        <div className="card p-6 md:p-8">
          <span className="badge">Family Package</span>
          <h1 className="mt-4 text-4xl font-extrabold text-brand-900">{pkg.name}</h1>
          <p className="mt-3 text-stone-600">{pkg.short_description}</p>
          <div className="mt-5 flex items-center gap-3">
            {pkg.total_price && Number(pkg.total_price) > price && <span className="text-xl text-stone-400 line-through">{formatPrice(pkg.total_price)}</span>}
            <span className="text-4xl font-extrabold text-brand-700">{formatPrice(price)}</span>
          </div>
          <ul className="mt-6 space-y-2">
            {(pkg.items || []).map((x, i) => <li key={i} className="rounded-2xl bg-brand-50 border border-brand-100 p-3 font-semibold">{x.text}</li>)}
          </ul>
          <p className="mt-5 text-leaf-700 font-bold">{pkg.delivery_note}</p>
          <p className="mt-2 text-stone-700">{pkg.advance_payment_note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => addItem({ type: 'package', slug: pkg.slug, name: pkg.name, weight: 'Package', price, quantity: 1, image: pkg.image })}>Add to Cart</button>
          </div>
          <OrderButtons message={message} className="mt-4" />
        </div>
      </div>
      <div className="card p-6 mt-10"><h2 className="text-2xl font-extrabold text-brand-900">প্যাকেজ বিবরণ</h2><p className="mt-3 whitespace-pre-line leading-8 text-stone-700">{pkg.full_description || pkg.short_description}</p></div>
    </section>
  )
}
