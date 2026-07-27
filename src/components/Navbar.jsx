import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingCart, X, Shield } from 'lucide-react'
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

  const itemClass = ({ isActive }) =>
    `px-3 py-2 rounded-full text-sm font-semibold transition ${
      isActive
        ? 'bg-brand-100 text-brand-800'
        : 'text-stone-700 hover:bg-brand-50 hover:text-brand-800'
    }`

  const adminClass =
    'inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-brand-800'

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/86 backdrop-blur-xl">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-xl font-extrabold text-white shadow-soft">
            R
          </div>

          <div>
            <div className="text-2xl font-extrabold leading-none text-brand-800">
              RIBAZ
            </div>
            <div className="text-xs font-semibold text-leaf-700">
              রান্নায় শুদ্ধতা
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => (
            <NavLink key={href} to={href} className={itemClass}>
              {label}
            </NavLink>
          ))}

          <a href="/admin/" className={adminClass}>
            <Shield size={15} /> Admin Portal
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="btn-secondary relative px-4 py-2.5">
            <ShoppingCart size={18} /> Cart
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-brand-700 px-1.5 text-xs text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-full border border-brand-100 bg-white p-3 lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container-pad pb-4 lg:hidden">
          <div className="card grid gap-1 p-3">
            {links.map(([href, label]) => (
              <NavLink
                onClick={() => setOpen(false)}
                key={href}
                to={href}
                className={itemClass}
              >
                {label}
              </NavLink>
            ))}

            <a
              href="/admin/"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800"
            >
              <Shield size={15} /> Admin Portal
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
