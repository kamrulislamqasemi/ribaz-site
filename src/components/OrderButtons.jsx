import { MessageCircle, Copy, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { settings } from '../lib/content.js'
import { copyText, makeWhatsAppUrl } from '../lib/orders.js'

export default function OrderButtons({ message, className = '' }) {
  const [copied, setCopied] = useState(false)
  const [messengerCopied, setMessengerCopied] = useState(false)
  const c = settings.contact

  async function handleCopy() {
    await copyText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  async function handleMessenger() {
    await copyText(message)
    setMessengerCopied(true)

    setTimeout(() => {
      window.open(c.messenger_link, '_blank', 'noopener,noreferrer')
    }, 250)

    setTimeout(() => setMessengerCopied(false), 2500)
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        className="btn-whatsapp"
        href={makeWhatsAppUrl(c.whatsapp_number, message)}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>

      <button
        type="button"
        className="btn-secondary"
        onClick={handleMessenger}
        title="মেসেঞ্জার খুলবে এবং অর্ডার মেসেজ কপি হবে"
      >
        <Send size={18} /> {messengerCopied ? 'Message Copied' : 'Messenger'}
      </button>

      <button type="button" className="btn-secondary" onClick={handleCopy}>
        <Copy size={18} /> {copied ? 'Copied!' : 'Copy Message'}
      </button>

      <a className="btn-primary" href={`tel:${c.primary_phone}`}>
        <Phone size={18} /> Call
      </a>
    </div>
  )
}
