import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductImage from './ProductImage.jsx'
import { formatPrice } from '../lib/content.js'
import { useCart } from '../context/CartContext.jsx'

export default function PackageCard({ pkg }) {
  const { addItem } = useCart()
  const price = Number(pkg.offer_price || pkg.total_price || 0)
  return (
    <motion.div whileHover={{ y: -7 }} className="card overflow-hidden group">
      <Link to={`/package/${pkg.slug}`} className="block h-52 overflow-hidden">
        <ProductImage src={pkg.image} alt={pkg.name} className="transition duration-500 group-hover:scale-110" />
      </Link>
      <div className="p-5">
        <Link to={`/package/${pkg.slug}`} className="text-xl font-extrabold hover:text-brand-700">{pkg.name}</Link>
        <ul className="mt-3 space-y-1 text-sm text-stone-600">
          {(pkg.items || []).slice(0, 4).map((x, i) => <li key={i}>• {x.text}</li>)}
        </ul>
        <div className="mt-4 flex items-center gap-3">
          {pkg.total_price && Number(pkg.total_price) > price && <span className="text-stone-400 line-through">{formatPrice(pkg.total_price)}</span>}
          <span className="text-2xl font-extrabold text-brand-700">{formatPrice(price)}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/package/${pkg.slug}`} className="btn-secondary py-2 px-4">Details</Link>
          <button onClick={() => addItem({ type: 'package', slug: pkg.slug, name: pkg.name, weight: 'Package', price, image: pkg.image })} className="btn-primary py-2 px-4">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  )
}
