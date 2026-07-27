import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const links = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/packages', 'Packages'],
  ['/categories', 'Categories'],
  ['/about', 'About RIBAZ'],
  ['/contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const itemClass = ({ isActive }) => `px-3 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-brand-100 text-brand-800' : 'text-stone-700 hover:bg-brand-50 hover:text-brand-800'}`
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/86 backdrop-blur-xl">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-brand-700 text-white grid place-items-center font-extrabold text-xl shadow-soft">R</div>
          <div>
            <div className="text-2xl font-extrabold text-brand-800 leading-none">RIBAZ</div>
            <div className="text-xs text-leaf-700 font-semibold">রান্নায় শুদ্ধতা</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(([href, label]) => <NavLink key={href} to={href} className={itemClass}>{label}</NavLink>)}
          <a href="/admin/" className="px-3 py-2 rounded-full text-sm font-semibold text-stone-700 hover:bg-brand-50">Admin Login</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative btn-secondary py-2.5 px-4">
            <ShoppingCart size={18} /> Cart
            {count > 0 && <span className="absolute -right-1 -top-1 h-6 min-w-6 rounded-full bg-brand-700 px-1.5 text-xs text-white grid place-items-center">{count}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden rounded-full border border-brand-100 p-3 bg-white">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden container-pad pb-4">
          <div className="card p-3 grid gap-1">
            {links.map(([href, label]) => <NavLink onClick={() => setOpen(false)} key={href} to={href} className={itemClass}>{label}</NavLink>)}
            <a href="/admin/" className="px-3 py-2 rounded-full text-sm font-semibold text-stone-700 hover:bg-brand-50">Admin Login</a>
          </div>
        </div>
      )}
    </header>
  )
}
