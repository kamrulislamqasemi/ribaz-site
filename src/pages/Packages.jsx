import PackageCard from '../components/PackageCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { packages } from '../lib/content.js'

export default function Packages() {
  return (
    <section className="container-pad py-12">
      <Reveal className="text-center max-w-3xl mx-auto">
        <span className="badge">Packages</span>
        <h1 className="mt-3 text-4xl font-extrabold text-brand-900">ফ্যামিলি মসলা প্যাকেজ</h1>
        <p className="mt-3 text-stone-600">একসাথে প্রয়োজনীয় মসলা, সাশ্রয়ী অফার মূল্য।</p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
      </div>
    </section>
  )
}
