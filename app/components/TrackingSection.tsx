'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Clock, CheckCircle, Circle, Truck, Package, Navigation } from 'lucide-react'

type TrackingStep = {
  id: number
  label: string
  location: string
  time: string
  done: boolean
  active?: boolean
}

type TrackingInfo = {
  status: string
  origin: string
  destination: string
  eta: string
  vehicle: string
  steps: TrackingStep[]
}

const TRACKING_DB: Record<string, TrackingInfo> = {
  'MEX-2026': {
    status: 'En Tránsito',
    origin: 'Ciudad de México, CDMX',
    destination: 'Querétaro, Qro.',
    eta: 'Hoy, 14:30 hrs',
    vehicle: 'Unidad #247 · Kenworth T680',
    steps: [
      {
        id: 1,
        label: 'Paquete Recibido',
        location: 'CDMX — Centro de Distribución Sur',
        time: 'Hoy 06:15',
        done: true,
      },
      {
        id: 2,
        label: 'En Procesamiento',
        location: 'CDMX — Centro de Distribución Sur',
        time: 'Hoy 07:45',
        done: true,
      },
      {
        id: 3,
        label: 'En Tránsito — Ruta CDMX-Querétaro',
        location: 'Autopista México-Querétaro · Km 142',
        time: 'Hoy 10:20',
        done: true,
        active: true,
      },
      {
        id: 4,
        label: 'Llegada a Destino',
        location: 'Querétaro — Terminal de Recepción Norte',
        time: 'Est. Hoy 14:30',
        done: false,
      },
    ],
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const stepVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
}

export default function TrackingSection() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle')

  const handleTrack = async () => {
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 900))
    setStatus(trimmed in TRACKING_DB ? 'found' : 'not_found')
  }

  const data = TRACKING_DB[code.trim().toUpperCase()]

  return (
    <section id="rastreo" className="py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-5">
            <Navigation className="text-cyan-400 w-4 h-4" />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
              Rastreo en Tiempo Real
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Rastrea tu Envío
          </h2>
          <p className="text-slate-400 text-sm">
            Ingresa tu número de guía para ver el estado en tiempo real
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder="Ej. MEX-2026"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/25 transition-all"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={status === 'loading'}
            className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 min-w-[128px] justify-center"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                Rastrear
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === 'not_found' && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-red-950/30 border border-red-500/20 rounded-2xl p-8 text-center"
            >
              <Package className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-300 font-semibold text-lg mb-1">Guía no encontrada</p>
              <p className="text-slate-500 text-sm">
                Verifica el número de guía e intenta nuevamente
              </p>
            </motion.div>
          )}

          {status === 'found' && data && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              <div
                className="border-b border-slate-700/50 p-6"
                style={{ background: 'linear-gradient(to right, rgba(6,182,212,0.07), rgba(59,130,246,0.04))' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-cyan-400 font-mono font-bold text-xl tracking-wider">
                        {code.trim().toUpperCase()}
                      </span>
                      <span className="bg-cyan-400/15 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full border border-cyan-400/20 font-medium">
                        {data.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{data.origin}</span>
                      <span className="text-slate-600 mx-1">→</span>
                      <span>{data.destination}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:items-end">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium">ETA: {data.eta}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{data.vehicle}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-700/60" />

                  <div className="space-y-7">
                    {data.steps.map((step) => (
                      <motion.div
                        key={step.id}
                        variants={stepVariants}
                        className="relative flex gap-5 pl-10"
                      >
                        <div
                          className={`absolute left-0 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                            step.active
                              ? 'border-cyan-400 bg-cyan-400/10'
                              : step.done
                              ? 'border-slate-600 bg-slate-800'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {step.done ? (
                            <CheckCircle
                              className={`w-4 h-4 ${step.active ? 'text-cyan-400' : 'text-slate-500'}`}
                            />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                          {step.active && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-cyan-400"
                              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-0.5">
                            <span
                              className={`font-semibold text-sm ${
                                step.active
                                  ? 'text-cyan-400'
                                  : step.done
                                  ? 'text-white'
                                  : 'text-slate-600'
                              }`}
                            >
                              {step.label}
                              {step.active && (
                                <span className="ml-2 text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-1.5 py-0.5 rounded font-normal">
                                  Actual
                                </span>
                              )}
                            </span>
                            <span className="text-slate-600 text-xs whitespace-nowrap">{step.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
                            <span className="text-slate-500 text-xs">{step.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
