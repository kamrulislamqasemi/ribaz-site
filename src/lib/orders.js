import { absoluteUrl, formatPrice, getVariantPrice } from './content.js'

export function cleanPhone(phone = '') {
  return String(phone).replace(/[^0-9]/g, '')
}

export function makeWhatsAppUrl(number, message) {
  return `https://wa.me/${cleanPhone(number)}?text=${encodeURIComponent(message)}`
}

export function makeProductMessage(product, variant, quantity = 1) {
  const url = absoluteUrl(`/product/${product.slug}`)
  const price = getVariantPrice(variant)
  return `আসসালামু আলাইকুম,\nআমি RIBAZ-এর ${product.name} অর্ডার করতে চাই।\n\nপণ্য: ${product.name}\nপ্যাক সাইজ: ${variant?.weight || 'N/A'}\nদাম: ${formatPrice(price)}\nপরিমাণ: ${quantity}টি\nProduct Link: ${url}\n\nনাম:\nমোবাইল:\nঠিকানা:`
}

export function makePackageMessage(pkg, quantity = 1) {
  const url = absoluteUrl(`/package/${pkg.slug}`)
  const itemLines = (pkg.items || []).map((x, i) => `${i + 1}. ${x.text}`).join('\n')
  return `আসসালামু আলাইকুম,\nআমি RIBAZ-এর ${pkg.name} অর্ডার করতে চাই।\n\nপ্যাকেজ: ${pkg.name}\nপরিমাণ: ${quantity}টি\nঅফার মূল্য: ${formatPrice(pkg.offer_price || pkg.total_price)}\n\nপ্যাকেজ আইটেম:\n${itemLines}\n\nProduct Link: ${url}\n\nনাম:\nমোবাইল:\nঠিকানা:`
}

export function makeCartMessage(items, deliveryCharge = 0, customer = {}) {
  const lines = items.map((item, i) => {
    const price = Number(item.price || 0)
    return `${i + 1}. ${item.name} - ${item.weight || 'প্যাক'} - ${item.quantity}টি - ${formatPrice(price * item.quantity)}`
  }).join('\n')
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0)
  const total = subtotal + Number(deliveryCharge || 0)
  return `আসসালামু আলাইকুম,\nআমি RIBAZ থেকে নিচের পণ্যগুলো অর্ডার করতে চাই:\n\n${lines || 'কোনো পণ্য নেই'}\n\nসাবটোটাল: ${formatPrice(subtotal)}\nডেলিভারি চার্জ: ${formatPrice(deliveryCharge)}\nসর্বমোট: ${formatPrice(total)}\n\nনাম: ${customer.name || ''}\nমোবাইল: ${customer.phone || ''}\nঠিকানা: ${customer.address || ''}\nজেলা: ${customer.district || ''}\nএরিয়া: ${customer.area || ''}\nপেমেন্ট: ${customer.payment || ''}\nনোট: ${customer.note || ''}`
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    return true
  }
}
