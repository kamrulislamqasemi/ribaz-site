import { absoluteUrl, formatPrice, getVariantPrice } from './content.js'

export function cleanPhone(phone = '') {
  return String(phone).replace(/[^0-9]/g, '')
}

export function makeWhatsAppUrl(number, message) {
  return `https://wa.me/${cleanPhone(number)}?text=${encodeURIComponent(message)}`
}

export function getProductLink(product) {
  if (!product?.slug) return absoluteUrl('/')
  return absoluteUrl(`/product/${product.slug}`)
}

export function getPackageLink(pkg) {
  if (!pkg?.slug) return absoluteUrl('/packages')
  return absoluteUrl(`/package/${pkg.slug}`)
}

export function makeProductMessage(product, variant, quantity = 1) {
  const url = getProductLink(product)
  const price = getVariantPrice(variant)

  return `আসসালামু আলাইকুম,
আমি RIBAZ-এর ${product.name} অর্ডার করতে চাই।

পণ্য: ${product.name}
প্যাক সাইজ: ${variant?.weight || 'N/A'}
দাম: ${formatPrice(price)}
পরিমাণ: ${quantity}টি
Product Link: ${url}

নাম:
মোবাইল:
ঠিকানা:`
}

export function makePackageMessage(pkg, quantity = 1) {
  const url = getPackageLink(pkg)
  const itemLines = (pkg.items || []).map((x, i) => `${i + 1}. ${x.text}`).join('\n')

  return `আসসালামু আলাইকুম,
আমি RIBAZ-এর ${pkg.name} অর্ডার করতে চাই।

প্যাকেজ: ${pkg.name}
পরিমাণ: ${quantity}টি
অফার মূল্য: ${formatPrice(pkg.offer_price || pkg.total_price)}

প্যাকেজ আইটেম:
${itemLines}

Package Link: ${url}

নাম:
মোবাইল:
ঠিকানা:`
}

export function makeCartMessage(items, deliveryCharge = 0, customer = {}) {
  const lines = items.map((item, i) => {
    const price = Number(item.price || 0)
    const itemLink = item.slug
      ? absoluteUrl(item.type === 'package' ? `/package/${item.slug}` : `/product/${item.slug}`)
      : ''

    return `${i + 1}. ${item.name} - ${item.weight || 'প্যাক'} - ${item.quantity}টি - ${formatPrice(price * item.quantity)}${itemLink ? `\n   Link: ${itemLink}` : ''}`
  }).join('\n')

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  )

  const total = subtotal + Number(deliveryCharge || 0)

  return `আসসালামু আলাইকুম,
আমি RIBAZ থেকে নিচের পণ্যগুলো অর্ডার করতে চাই:

${lines || 'কোনো পণ্য নেই'}

সাবটোটাল: ${formatPrice(subtotal)}
ডেলিভারি চার্জ: ${formatPrice(deliveryCharge)}
সর্বমোট: ${formatPrice(total)}

নাম: ${customer.name || ''}
মোবাইল: ${customer.phone || ''}
ঠিকানা: ${customer.address || ''}
জেলা: ${customer.district || ''}
এরিয়া: ${customer.area || ''}
পেমেন্ট: ${customer.payment || ''}
নোট: ${customer.note || ''}`
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
