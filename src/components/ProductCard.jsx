import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, ShoppingCart, X } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import OrderButtons from './OrderButtons.jsx'
import { formatPrice, getPrimaryVariant, getVariantPrice } from '../lib/content.js'
import { makeProductMessage } from '../lib/orders.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const v = getPrimaryVariant(product)
  const price = getVariantPrice(v)
  const { addItem } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div whileHover={{ y: -7 }} className="card overflow-hidden group">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block h-56 w-full overflow-hidden text-left"
        >
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            className="transition duration-500 group-hover:scale-110"
          />
        </button>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-left text-xl font-extrabold text-stone-900 hover:text-brand-700"
            >
              {product.name}
            </button>
            <span className="badge">{v.weight}</span>
          </div>

          <p className="mt-2 text-stone-600 line-clamp-2">{product.short_description}</p>

          <div className="mt-4 flex items-center gap-3">
            {v.regular_price && Number(v.regular_price) > price && (
              <span className="text-stone-400 line-through">
                {formatPrice(v.regular_price)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-brand-700">
              {formatPrice(price)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-secondary py-2 px-4"
            >
              <Eye size={16} /> Details
            </button>

            <button
              type="button"
              onClick={() =>
                addItem({
                  type: 'product',
                  slug: product.slug,
                  name: product.name,
                  weight: v.weight,
                  price,
                  image: product.images?.[0],
                })
              }
              className="btn-primary py-2 px-4"
            >
              <ShoppingCart size={16} /> Add
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <ProductQuickView
            product={product}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function ProductQuickView({ product, onClose }) {
  const [variantIndex, setVariantIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [image, setImage] = useState(0)
  const { addItem } = useCart()

  const variant = product.variants?.[variantIndex] || product.variants?.[0] || {}
  const price = getVariantPrice(variant)
  const message = makeProductMessage(product, variant, qty)

  useEffect(() => {
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleEsc(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = oldOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-3 z-20 float-right mr-3 mt-3 rounded-full bg-white p-3 text-stone-800 shadow-lg hover:bg-stone-100"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-2">
          <div>
            <div className="h-[300px] overflow-hidden rounded-3xl bg-brand-50 md:h-[430px]">
              <ProductImage src={product.images?.[image]} alt={product.name} />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {(product.images?.length ? product.images : [null, null, null, null])
                .slice(0, 4)
                .map((src, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setImage(i)}
                    className={`h-20 overflow-hidden rounded-2xl border md:h-24 ${
                      image === i ? 'border-brand-700' : 'border-brand-100'
                    }`}
                  >
                    <ProductImage src={src} alt={product.name} />
                  </button>
                ))}
            </div>
          </div>

          <div>
            <span className="badge">{product.category}</span>

            <h2 className="mt-4 text-3xl font-extrabold text-brand-900 md:text-4xl">
              {product.name}
            </h2>

            <p className="mt-3 leading-8 text-stone-600">
              {product.short_description}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {variant.regular_price && Number(variant.regular_price) > price && (
                <span className="text-xl text-stone-400 line-through">
                  {formatPrice(variant.regular_price)}
                </span>
              )}

              <span className="text-4xl font-extrabold text-brand-700">
                {formatPrice(price)}
              </span>
            </div>

            <div className="mt-6">
              <div className="mb-2 font-bold">প্যাক সাইজ</div>
              <div className="flex flex-wrap gap-2">
                {(product.variants || []).map((v, i) => (
                  <button
                    type="button"
                    key={v.weight}
                    onClick={() => setVariantIndex(i)}
                    className={`rounded-full border px-4 py-2 font-semibold ${
                      variantIndex === i
                        ? 'border-brand-700 bg-brand-700 text-white'
                        : 'border-brand-100 bg-white'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-bold">পরিমাণ</span>

              <button
                type="button"
                className="btn-secondary px-4 py-2"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>

              <span className="w-10 text-center text-xl font-extrabold">
                {qty}
              </span>

              <button
                type="button"
                className="btn-secondary px-4 py-2"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  addItem({
                    type: 'product',
                    slug: product.slug,
                    name: product.name,
                    weight: variant.weight,
                    price,
                    quantity: qty,
                    image: product.images?.[0],
                  })
                }
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>

            <OrderButtons message={message} className="mt-4" />
          </div>
        </div>

        <div className="grid gap-5 border-t border-brand-100 p-5 md:p-8 lg:grid-cols-2">
          <Info title="পণ্যের বিবরণ" text={product.full_description} />
          <Info title="উপাদান" text={product.ingredients} />
          <Info title="উপকারিতা" text={product.benefits} />
          <Info
            title="ব্যবহার ও সংরক্ষণ"
            text={`${product.usage_instructions || ''}\n\n${product.storage_instructions || ''}`}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Info({ title, text }) {
  return (
    <div className="rounded-3xl bg-brand-50 p-5">
      <h3 className="text-xl font-extrabold text-brand-900">{title}</h3>
      <p className="mt-3 whitespace-pre-line leading-8 text-stone-700">
        {text}
      </p>
    </div>
  )
}
