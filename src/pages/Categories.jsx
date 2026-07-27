import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { getCategories, products, settings } from '../lib/content.js'

export default function Categories() {
  const cats = getCategories()
  return (
    <section className="container-pad py-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="badge">Categories</span>
        <h1 className="mt-3 text-4xl font-extrabold text-brand-900">ক্যাটাগরি অনুযায়ী পণ্য</h1>
      </div>
      <div className="mt-10 space-y-12">
        {cats.map((cat) => <div key={cat}><h2 className="text-2xl font-extrabold text-brand-900 mb-5">{cat}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.filter((p)=>p.category===cat).map((p)=><ProductCard key={p.slug} product={p}/>)}</div></div>)}
      </div>
      <div className="mt-14 card p-6">
        <h2 className="text-2xl font-extrabold text-brand-900">Coming Soon</h2>
        <div className="mt-4 flex flex-wrap gap-3">{settings.homepage.coming_soon.map((x)=><span key={x} className="badge">{x}</span>)}</div>
        <Link to="/contact" className="btn-primary mt-6">জানতে যোগাযোগ করুন</Link>
      </div>
    </section>
  )
}
