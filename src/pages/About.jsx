import OrderButtons from '../components/OrderButtons.jsx'
import Reveal from '../components/Reveal.jsx'
import { settings } from '../lib/content.js'

export default function About() {
  return (
    <section className="container-pad py-12">
      <Reveal className="max-w-4xl">
        <span className="badge">About RIBAZ</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-brand-900">RIBAZ – রান্নায় শুদ্ধতা, জীবনে বিশুদ্ধতা</h1>
        <p className="mt-5 text-lg leading-9 text-stone-700">{settings.homepage.about_intro}</p>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6"><h2 className="text-2xl font-extrabold text-brand-900">আমাদের প্রস্তুত প্রক্রিয়া</h2><p className="mt-3 leading-8 text-stone-700">উৎকৃষ্ট মানের কাঁচামাল সংগ্রহের পর মসলা ধুয়ে পরিষ্কার করা হয়। এরপর কড়া রোদে সম্পূর্ণ শুকিয়ে পরিচ্ছন্ন পরিবেশে গুঁড়া করা হয় এবং ফুড-গ্রেড জারে প্যাকেজিং করা হয়।</p></div>
        <div className="card p-6"><h2 className="text-2xl font-extrabold text-brand-900">আস্থার প্রতিশ্রুতি</h2><p className="mt-3 leading-8 text-stone-700">কৃত্রিম রং, ভেজাল বা নিম্নমানের উপাদান ব্যবহার করা হয় না। পণ্য হাতে পাওয়ার পর ৭ দিনের রিপ্লেসমেন্ট কিংবা মানি-ব্যাক সুবিধা রয়েছে।</p></div>
      </div>
      <OrderButtons message="আসসালামু আলাইকুম, আমি RIBAZ সম্পর্কে বিস্তারিত জানতে চাই।" className="mt-8" />
    </section>
  )
}
