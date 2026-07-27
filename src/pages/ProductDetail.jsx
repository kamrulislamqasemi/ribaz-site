import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductImage from '../components/ProductImage.jsx'
import OrderButtons from '../components/OrderButtons.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { formatPrice, getProduct, getVariantPrice, products } from '../lib/content.js'
import { makeProductMessage } from '../lib/orders.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [variantIndex, setVariantIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [image, setImage] = useState(0)
  const { addItem } = useCart()

  if (!product) return <Missing />
  const variant = product.variants?.[variantIndex] || product.variants?.[0] || {}
  const price = getVariantPrice(variant)
  const message = makeProductMessage(product, variant, qty)
  const related = useMemo(() => products.filter((p) => p.slug !== product.slug && (product.related_products || []).includes(p.slug)).slice(0, 3), [product])

  return (
    <section className="container-pad py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="card overflow-hidden h-[420px]">
            <ProductImage src={product.images?.[image]} alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {(product.images?.length ? product.images : [null, null, null, null]).slice(0, 4).map((src, i) => (
              <button key={i} onClick={() => setImage(i)} className={`h-24 rounded-2xl overflow-hidden border ${image === i ? 'border-brand-700' : 'border-brand-100'}`}>
                <ProductImage src={src} alt={product.name} />
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="card p-6 md:p-8">
          <span className="badge">{product.category}</span>
          <h1 className="mt-4 text-4xl font-extrabold text-brand-900">{product.name}</h1>
          <p className="mt-3 text-stone-600 leading-8">{product.short_description}</p>
          <div className="mt-5 flex items-center gap-3">
            {variant.regular_price && Number(variant.regular_price) > price && <span className="text-xl text-stone-400 line-through">{formatPrice(variant.regular_price)}</span>}
            <span className="text-4xl font-extrabold text-brand-700">{formatPrice(price)}</span>
          </div>
          <div className="mt-6">
            <div className="font-bold mb-2">প্যাক সাইজ</div>
            <div className="flex flex-wrap gap-2">
              {(product.variants || []).map((v, i) => (
                <button key={v.weight} onClick={() => setVariantIndex(i)} className={`rounded-full border px-4 py-2 font-semibold ${variantIndex === i ? 'bg-brand-700 text-white border-brand-700' : 'bg-white border-brand-100'}`}>{v.weight}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="font-bold">পরিমাণ</span>
            <button className="btn-secondary px-4 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span className="text-xl font-extrabold w-10 text-center">{qty}</span>
            <button className="btn-secondary px-4 py-2" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => addItem({ type: 'product', slug: product.slug, name: product.name, weight: variant.weight, price, quantity: qty, image: product.images?.[0] })}>Add to Cart</button>
          </div>
          <OrderButtons message={message} className="mt-4" />
        </motion.div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Info title="পণ্যের বিবরণ" text={product.full_description} />
        <Info title="উপাদান" text={product.ingredients} />
        <Info title="উপকারিতা" text={product.benefits} />
        <Info title="ব্যবহার ও সংরক্ষণ" text={`${product.usage_instructions || ''}\n\n${product.storage_instructions || ''}`} />
      </div>

      {related.length > 0 && <div className="mt-14"><h2 className="text-3xl font-extrabold text-brand-900 mb-6">Related Products</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div></div>}
    </section>
  )
}

function Info({ title, text }) {
  return <div className="card p-6"><h3 className="text-2xl font-extrabold text-brand-900">{title}</h3><p className="mt-3 whitespace-pre-line leading-8 text-stone-700">{text}</p></div>
}
function Missing(){ return <section className="container-pad py-20"><h1 className="text-3xl font-bold">Product not found</h1><Link className="btn-primary mt-5" to="/products">Back to products</Link></section> }
