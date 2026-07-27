export default function ProductImage({ src, alt = 'RIBAZ product', className = '' }) {
  if (src) return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
  return (
    <div className={`placeholder-spice h-full w-full grid place-items-center text-white ${className}`}>
      <div className="text-center p-4">
        <div className="text-3xl font-extrabold">RIBAZ</div>
        <div className="text-sm font-semibold opacity-90">Product Image</div>
      </div>
    </div>
  )
}
