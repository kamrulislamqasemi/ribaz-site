import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductImage from './ProductImage.jsx'
import { formatPrice, getPrimaryVariant, getVariantPrice } from '../lib/content.js'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
  const v = getPrimaryVariant(product)
  const price = getVariantPrice(v)
  const { addItem } = useCart()
  return (
    <motion.div whileHover={{ y: -7 }} className="card overflow-hidden group">
      <Link to={`/product/${product.slug}`} className="block h-56 overflow-hidden">
        <ProductImage src={product.images?.[0]} alt={product.name} className="transition duration-500 group-hover:scale-110" />
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.slug}`} className="text-xl font-extrabold text-stone-900 hover:text-brand-700">{product.name}</Link>
          <span className="badge">{v.weight}</span>
        </div>
        <p className="mt-2 text-stone-600 line-clamp-2">{product.short_description}</p>
        <div className="mt-4 flex items-center gap-3">
          {v.regular_price && Number(v.regular_price) > price && <span className="text-stone-400 line-through">{formatPrice(v.regular_price)}</span>}
          <span className="text-2xl font-extrabold text-brand-700">{formatPrice(price)}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/product/${product.slug}`} className="btn-secondary py-2 px-4">Details</Link>
          <button onClick={() => addItem({ type: 'product', slug: product.slug, name: product.name, weight: v.weight, price, image: product.images?.[0] })} className="btn-primary py-2 px-4"><ShoppingCart size={16}/> Add</button>
        </div>
      </div>
    </motion.div>
  )
}
