'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Truck, MapPin, Package, Zap, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Stat = {
  icon: LucideIcon
  label: string
  value: number
  suffix: string
  color: string
  bg: string
}

const stats: Stat[] = [
  { icon: Truck,   label: 'Unidades Activas', value: 247,   suffix: '',  color: '#22d3ee', bg: 'rgba(6,182,212,0.1)'  },
  { icon: Package, label: 'Entregas Hoy',     value: 1840,  suffix: '',  color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
  { icon: MapPin,  label: 'Km Recorridos',    value: 48300, suffix: '',  color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  { icon: Clock,   label: 'Puntualidad',      value: 98,    suffix: '%', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
]

const fleetUnits = [
  { id: 'VX-247', route: 'CDMX → Querétaro',   progress: 62, status: 'En Tránsito' },
  { id: 'VX-198', route: 'MTY → Guadalajara',   progress: 34, status: 'En Ruta'     },
  { id: 'VX-312', route: 'Puebla → Veracruz',   progress: 88, status: 'Llegando'    },
  { id: 'VX-056', route: 'GDL → Tijuana',       progress: 15, status: 'Salida'      },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const fps = 60
    const total = Math.floor(duration / (1000 / fps))
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (frame >= total) {
        setCount(target)
        clearInterval(timer)
      }
    }, 1000 / fps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString('es-MX')}
      {suffix}
    </span>
  )
}

export default function FleetPanel() {
  return (
    <section id="flota" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-5">
            <Zap className="text-cyan-400 w-4 h-4" />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
              Panel de Flota
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Control en{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #60a5fa)' }}
            >
              Tiempo Real
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Monitorea nuestra flota activa en todo momento. Cada unidad reporta su
            posición cada 30 segundos vía GPS satelital.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3"
                  style={{ background: stat.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-semibold text-sm">Unidades en Operación</span>
            </div>
            <span className="text-slate-600 text-xs font-mono">Actualizado hace 28 seg</span>
          </div>

          <div className="divide-y divide-slate-700/30">
            {fleetUnits.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 px-6 py-4"
              >
                <div className="flex items-center gap-3 sm:w-1/4">
                  <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-1.5 flex-shrink-0">
                    <Truck className="text-cyan-400 w-4 h-4" />
                  </div>
                  <span className="text-cyan-400 font-mono font-semibold text-sm">{unit.id}</span>
                </div>

                <div className="flex items-center gap-2 sm:w-1/3">
                  <MapPin className="text-slate-600 w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{unit.route}</span>
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${unit.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.12, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(to right, #22d3ee, #60a5fa)' }}
                    />
                  </div>
                  <span className="text-slate-500 text-xs font-mono w-8 text-right">{unit.progress}%</span>
                </div>

                <div className="sm:w-28 sm:text-right">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full border font-medium"
                    style={
                      unit.progress > 80
                        ? { color: '#4ade80', background: 'rgba(74,222,128,0.08)', borderColor: 'rgba(74,222,128,0.2)' }
                        : { color: '#22d3ee', background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.2)' }
                    }
                  >
                    {unit.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
