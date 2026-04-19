'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Package, Calculator, MessageCircle, ChevronDown, Truck, Navigation } from 'lucide-react'

// Reemplazar con el número de WhatsApp real (formato: código país + número, sin + ni espacios)
const WHATSAPP_NUMBER = '5215500000000'

const CITIES = [
  { name: 'Aguascalientes', lat: 21.8818, lon: -102.2916 },
  { name: 'Cancún', lat: 21.1743, lon: -86.8466 },
  { name: 'Chihuahua', lat: 28.6353, lon: -106.0889 },
  { name: 'Ciudad de México', lat: 19.4326, lon: -99.1332 },
  { name: 'Ciudad Juárez', lat: 31.6904, lon: -106.4245 },
  { name: 'Culiacán', lat: 24.7994, lon: -107.3893 },
  { name: 'Guadalajara', lat: 20.6597, lon: -103.3496 },
  { name: 'Hermosillo', lat: 29.0729, lon: -110.9559 },
  { name: 'León', lat: 21.1619, lon: -101.6832 },
  { name: 'Mazatlán', lat: 23.2494, lon: -106.4111 },
  { name: 'Mérida', lat: 20.9674, lon: -89.5926 },
  { name: 'Monterrey', lat: 25.6866, lon: -100.3161 },
  { name: 'Oaxaca', lat: 17.0732, lon: -96.7266 },
  { name: 'Puebla', lat: 19.0414, lon: -98.2063 },
  { name: 'Querétaro', lat: 20.5888, lon: -100.3899 },
  { name: 'San Luis Potosí', lat: 22.1565, lon: -100.9855 },
  { name: 'Tijuana', lat: 32.5149, lon: -117.0382 },
  { name: 'Torreón', lat: 25.5428, lon: -103.4068 },
  { name: 'Tuxtla Gutiérrez', lat: 16.7521, lon: -93.1152 },
  { name: 'Veracruz', lat: 19.1738, lon: -96.1342 },
]

const RATE_KM = 15
const RATE_KG = 2

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.35)
}

export default function QuoteSection() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [peso, setPeso] = useState('')

  const quote = useMemo(() => {
    const orig = CITIES.find((c) => c.name === origen)
    const dest = CITIES.find((c) => c.name === destino)
    const kg = parseFloat(peso)
    if (!orig || !dest || isNaN(kg) || kg <= 0 || origen === destino) return null
    const km = haversineKm(orig.lat, orig.lon, dest.lat, dest.lon)
    const distCost = km * RATE_KM
    const weightCost = Math.ceil(kg) * RATE_KG
    return { km, distCost, weightCost, total: distCost + weightCost }
  }, [origen, destino, peso])

  const handleWhatsApp = () => {
    if (!quote) return
    const text =
      `Hola Vortex Logistics, me gustaría finalizar la siguiente cotización:\n\n` +
      `📍 Origen: ${origen}\n` +
      `📍 Destino: ${destino}\n` +
      `📦 Peso: ${peso} kg\n` +
      `🛣️ Distancia estimada: ${quote.km.toLocaleString('es-MX')} km\n\n` +
      `💰 Desglose:\n` +
      `   • Por distancia: $${quote.distCost.toLocaleString('es-MX')} MXN\n` +
      `   • Por peso: $${quote.weightCost.toLocaleString('es-MX')} MXN\n` +
      `   Total estimado: $${quote.total.toLocaleString('es-MX')} MXN\n\n` +
      `Por favor, ¿podrían confirmar disponibilidad y fecha de envío?`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const baseSelect =
    'w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl ' +
    'pl-12 pr-10 py-4 text-sm focus:outline-none focus:border-cyan-400/60 ' +
    'focus:ring-1 focus:ring-cyan-400/25 transition-all cursor-pointer'

  return (
    <section id="cotizar" className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-5">
            <Calculator className="text-cyan-400 w-4 h-4" />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
              Cotización Instantánea
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Cotización <span className="text-cyan-400">Inteligente</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Selecciona origen, destino y peso para obtener un estimado inmediato de tu envío.
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden"
        >
          {/* Card header bar */}
          <div
            className="border-b border-slate-700/50 px-6 py-4"
            style={{ background: 'linear-gradient(to right, rgba(6,182,212,0.07), rgba(59,130,246,0.04))' }}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="text-cyan-400 w-5 h-5" />
              <span className="text-white font-semibold text-sm">Calculadora de Flete</span>
              <span className="ml-auto text-slate-500 text-xs font-mono">
                ${RATE_KM}/km · ${RATE_KG}/kg
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Form fields */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">

              {/* Origen */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-medium tracking-wide uppercase">
                  Origen
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                  <select
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    className={`${baseSelect} ${origen ? 'text-white' : 'text-slate-500'}`}
                  >
                    <option value="" className="bg-slate-800 text-slate-400">Ciudad origen…</option>
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name} className="bg-slate-800 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Destino */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-medium tracking-wide uppercase">
                  Destino
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/70 w-4 h-4 pointer-events-none" />
                  <select
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className={`${baseSelect} ${destino ? 'text-white' : 'text-slate-500'}`}
                  >
                    <option value="" className="bg-slate-800 text-slate-400">Ciudad destino…</option>
                    {CITIES.filter((c) => c.name !== origen).map((c) => (
                      <option key={c.name} value={c.name} className="bg-slate-800 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Peso */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-medium tracking-wide uppercase">
                  Peso (kg)
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ej. 250"
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/25 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Quote result */}
            <AnimatePresence>
              {quote && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Navigation className="text-cyan-400 w-4 h-4" />
                      <span className="text-slate-300 text-sm font-semibold">Desglose del Costo</span>
                      <span className="ml-auto text-slate-500 text-xs font-mono truncate max-w-[200px]">
                        {origen} → {destino}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-slate-800/60 rounded-lg p-4 text-center">
                        <p className="text-slate-500 text-xs mb-1">Distancia est.</p>
                        <p className="text-white font-bold text-xl font-mono">
                          {quote.km.toLocaleString('es-MX')}
                        </p>
                        <p className="text-slate-600 text-xs">km</p>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-4 text-center">
                        <p className="text-slate-500 text-xs mb-1">Por distancia</p>
                        <p className="text-cyan-400 font-bold text-xl font-mono">
                          ${quote.distCost.toLocaleString('es-MX')}
                        </p>
                        <p className="text-slate-600 text-xs">MXN</p>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-4 text-center">
                        <p className="text-slate-500 text-xs mb-1">Por peso</p>
                        <p className="text-cyan-400 font-bold text-xl font-mono">
                          ${quote.weightCost.toLocaleString('es-MX')}
                        </p>
                        <p className="text-slate-600 text-xs">MXN</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-700/50 pt-3 flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Total estimado</span>
                      <span
                        className="text-2xl font-bold font-mono"
                        style={{
                          background: 'linear-gradient(to right, #22d3ee, #60a5fa)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        ${quote.total.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <button
              onClick={handleWhatsApp}
              disabled={!quote}
              className="w-full flex items-center justify-center gap-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Finalizar Cotización
            </button>

            {!quote && (
              <p className="text-center text-slate-600 text-xs mt-3">
                Completa los tres campos para activar la cotización
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
