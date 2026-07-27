import { Link } from 'react-router-dom'
export default function NotFound(){return <section className="container-pad py-24 text-center"><h1 className="text-5xl font-extrabold text-brand-900">404</h1><p className="mt-3 text-stone-600">এই পেজটি পাওয়া যায়নি।</p><Link to="/" className="btn-primary mt-6">Home</Link></section>}
