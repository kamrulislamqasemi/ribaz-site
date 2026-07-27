import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { products } from '../lib/content.js'

export default function Products() {
  return (
    <section className="container-pad py-12">
      <Reveal className="text-center max-w-3xl mx-auto">
        <span className="badge">Products</span>
        <h1 className="mt-3 text-4xl font-extrabold text-brand-900">RIBAZ-এর সকল পণ্য</h1>
        <p className="mt-3 text-stone-600">খাঁটি গুঁড়া মসলা, প্যাকেজ এবং রান্নার প্রয়োজনীয় পণ্য।</p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  )
}
