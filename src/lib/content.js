import homepage from '../content/settings/homepage.json'
import contact from '../content/settings/contact.json'
import reviews from '../content/settings/reviews.json'

const productModules = import.meta.glob('../content/products/*.json', { eager: true })
const packageModules = import.meta.glob('../content/packages/*.json', { eager: true })

export const products = Object.values(productModules)
  .map((m) => m.default)
  .filter((item) => item.active !== false)
  .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'bn'))

export const packages = Object.values(packageModules)
  .map((m) => m.default)
  .filter((item) => item.active !== false)

export const settings = { homepage, contact, reviews }

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}

export function getPackage(slug) {
  return packages.find((p) => p.slug === slug)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured).slice(0, 6)
}

export function getFeaturedPackages() {
  return packages.filter((p) => p.featured).slice(0, 4)
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category).filter(Boolean))]
}

export function formatPrice(value) {
  const n = Number(value || 0)
  return n ? `${n.toLocaleString('bn-BD')} টাকা` : 'দাম দেখুন'
}

export function getPrimaryVariant(product) {
  return product?.variants?.[0] || { weight: product?.weight || '', regular_price: product?.regular_price || 0, sale_price: product?.sale_price || 0, stock: product?.stock || 0 }
}

export function getVariantPrice(variant) {
  return Number(variant?.sale_price || variant?.regular_price || 0)
}

export function absoluteUrl(path) {
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}
