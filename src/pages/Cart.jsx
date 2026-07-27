import { Link } from 'react-router-dom'
import OrderButtons from '../components/OrderButtons.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice, settings } from '../lib/content.js'
import { makeCartMessage } from '../lib/orders.js'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const delivery = Number(settings.contact.delivery_charge || 0)
  const message = makeCartMessage(items, delivery)
  return (
    <section className="container-pad py-12">
      <h1 className="text-4xl font-extrabold text-brand-900">Cart</h1>
      {items.length === 0 ? <div className="card p-8 mt-8"><p className="text-xl font-bold">কার্ট খালি।</p><Link to="/products" className="btn-primary mt-5">পণ্য দেখুন</Link></div> : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] mt-8">
          <div className="space-y-4">
            {items.map((item) => <div key={item.id} className="card p-4 flex gap-4 items-center">
              <div className="h-24 w-24 rounded-2xl overflow-hidden shrink-0"><ProductImage src={item.image} alt={item.name}/></div>
              <div className="flex-1"><h3 className="font-extrabold text-lg">{item.name}</h3><p className="text-stone-600">{item.weight} • {formatPrice(item.price)}</p></div>
              <input className="input max-w-20" type="number" min="1" value={item.quantity} onChange={(e)=>updateQuantity(item.id, e.target.value)} />
              <button className="btn-secondary py-2 px-4" onClick={()=>removeItem(item.id)}>Remove</button>
            </div>)}
          </div>
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-extrabold text-brand-900">Order Summary</h2>
            <div className="mt-5 space-y-3 text-lg"><div className="flex justify-between"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div className="flex justify-between"><span>Delivery</span><b>{formatPrice(delivery)}</b></div><div className="flex justify-between border-t pt-3"><span>Total</span><b>{formatPrice(subtotal + delivery)}</b></div></div>
            <OrderButtons message={message} className="mt-6" />
            <Link to="/checkout" className="btn-primary w-full mt-5">Checkout</Link>
          </div>
        </div>
      )}
    </section>
  )
}
