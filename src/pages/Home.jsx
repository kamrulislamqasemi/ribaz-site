import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import PackageCard from '../components/PackageCard.jsx'
import OrderButtons from '../components/OrderButtons.jsx'
import { getFeaturedProducts, getFeaturedPackages, settings } from '../lib/content.js'

export default function Home() {
  const h = settings.homepage
  const contactMessage = 'আসসালামু আলাইকুম, আমি RIBAZ-এর খাঁটি গুঁড়া মসলা অর্ডার করতে চাই।'
  return (
    <>
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#f8d69b,transparent_35%),radial-gradient(circle_at_bottom_right,#e4eed5,transparent_30%)]" />
        <div className="container-pad grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <span className="badge mb-4"><Sparkles size={14}/> RIBAZ Homemade Spices</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-brand-900">{h.hero_title}</h1>
            <p className="mt-5 text-lg md:text-xl text-stone-700 leading-9">{h.hero_subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">পণ্য দেখুন</Link>
              <Link to="/packages" className="btn-secondary">প্যাকেজ দেখুন</Link>
            </div>
            <OrderButtons message={contactMessage} className="mt-5" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1 }} className="relative">
            <div className="card p-4 md:p-6">
              <div className="placeholder-spice rounded-[2rem] h-[420px] grid place-items-center text-white overflow-hidden">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-center">
                  <div className="text-6xl font-extrabold">RIBAZ</div>
                  <div className="mt-3 text-2xl font-bold">রান্নায় শুদ্ধতা</div>
                  <div className="mt-2 text-lg">Premium Homemade Spices</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-pad py-12 grid gap-4 md:grid-cols-4">
        {[['A Grade কাঁচামাল', Award], ['ধুয়ে-রোদে শুকানো', Sparkles], ['ফুড-গ্রেড জার', PackageCheck], ['৭ দিনের গ্যারান্টি', ShieldCheck]].map(([t, Icon]) => (
          <Reveal key={t} className="card p-5 text-center">
            <Icon className="mx-auto text-brand-700" />
            <h3 className="mt-3 font-extrabold text-lg">{t}</h3>
          </Reveal>
        ))}
      </section>

      <section className="container-pad py-14">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="badge">Featured Products</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-900">জনপ্রিয় গুঁড়া মসলা</h2>
          <p className="mt-3 text-stone-600">প্রতিদিনের রান্নায় স্বাদ, ঘ্রাণ ও বিশুদ্ধতার জন্য RIBAZ।</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getFeaturedProducts().map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="container-pad py-14">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="badge">Family Packages</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-900">RIBAZ ফ্যামিলি মসলা প্যাকেজ</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getFeaturedPackages().map((p) => <PackageCard key={p.slug} pkg={p} />)}
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="card p-6 md:p-10 grid lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <span className="badge">Why RIBAZ?</span>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-900">কেন RIBAZ-এর ওপর আস্থা রাখবেন?</h2>
            <p className="mt-4 leading-8 text-stone-700">{h.about_intro}</p>
          </Reveal>
          <div className="grid gap-3">
            {(h.trust_points || []).map((point, i) => <Reveal delay={i * .03} key={point} className="rounded-2xl bg-brand-50 border border-brand-100 p-4 font-semibold">✔ {point}</Reveal>)}
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="badge">Coming Soon</span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900">খুব শিগগিরই আসছে</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {(h.coming_soon || []).map((x) => <span key={x} className="rounded-full bg-white border border-brand-100 px-4 py-2 font-semibold shadow-sm">{x}</span>)}
        </div>
      </section>
    </>
  )
}
