'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Flota', href: '#flota' },
  { label: 'Rastrear', href: '#rastreo' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-1.5">
              <Truck className="text-cyan-400 w-5 h-5" />
            </div>
            <span className="text-white font-bold text-base tracking-widest">
              VORTEX <span className="text-cyan-400">LOGISTICS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cotizar"
              className="bg-cyan-400 text-slate-950 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-300 transition-colors duration-200"
            >
              Cotizar
            </a>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-md border-b border-slate-800"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-400 hover:text-cyan-400 text-sm font-medium py-2.5 border-b border-slate-800/50"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cotizar"
                className="block bg-cyan-400 text-slate-950 px-4 py-3 rounded-lg text-sm font-semibold text-center mt-3"
              >
                Cotizar Envío
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
