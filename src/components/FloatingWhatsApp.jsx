import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { settings } from '../lib/content.js'
import { makeWhatsAppUrl } from '../lib/orders.js'

export default function FloatingWhatsApp() {
  const message = 'আসসালামু আলাইকুম, আমি RIBAZ-এর পণ্য সম্পর্কে জানতে চাই।'
  return (
    <motion.a
      href={makeWhatsAppUrl(settings.contact.whatsapp_number, message)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-green-600 text-white grid place-items-center shadow-soft"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 2.2 }}
      aria-label="WhatsApp"
    >
      <MessageCircle />
    </motion.a>
  )
}
