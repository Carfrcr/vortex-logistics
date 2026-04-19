'use client'

import { motion } from 'framer-motion'
import { Truck, Package, MapPin, ArrowRight, Shield, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  gradientFrom: string
  gradientTo: string
  borderColor: string
  iconColor: string
  iconBg: string
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Fletes Nacionales',
    description:
      'Transporte de carga completa (FTL) con cobertura en toda la República Mexicana. Unidades certificadas, rastreo GPS en tiempo real y seguro de carga incluido.',
    features: ['Cobertura nacional', 'GPS en tiempo real', 'Seguro de carga incluido'],
    gradientFrom: 'rgba(6,182,212,0.08)',
    gradientTo: 'rgba(59,130,246,0.04)',
    borderColor: 'rgba(6,182,212,0.2)',
    iconColor: '#22d3ee',
    iconBg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: Package,
    title: 'Carga Consolidada',
    description:
      'Optimiza costos con nuestro servicio LTL. Tu carga viaja junto con envíos compatibles, reduciendo hasta un 40% en tarifas sin comprometer tiempos de entrega.',
    features: ['Tarifas reducidas hasta 40%', 'Rutas optimizadas por IA', 'Manejo especializado'],
    gradientFrom: 'rgba(59,130,246,0.08)',
    gradientTo: 'rgba(99,102,241,0.04)',
    borderColor: 'rgba(96,165,250,0.2)',
    iconColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: MapPin,
    title: 'Última Milla',
    description:
      'Entrega directa al cliente final con tecnología de ruteo dinámico. Prueba de entrega digital, firma electrónica y notificaciones automáticas por SMS y correo.',
    features: ['Entrega al cliente final', 'POD digital con firma', 'Notificaciones automáticas'],
    gradientFrom: 'rgba(99,102,241,0.08)',
    gradientTo: 'rgba(139,92,246,0.04)',
    borderColor: 'rgba(129,140,248,0.2)',
    iconColor: '#818cf8',
    iconBg: 'rgba(99,102,241,0.1)',
  },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-5">
            <Globe className="text-cyan-400 w-4 h-4" />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
              Nuestros Servicios
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Soluciones para cada{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #60a5fa)' }}
            >
              necesidad
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Desde carga completa hasta entregas de última milla, tenemos la solución
            logística que tu empresa necesita.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.14 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group rounded-2xl p-6 cursor-pointer transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                  border: `1px solid ${service.borderColor}`,
                  backgroundColor: 'rgb(15,23,42)',
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: service.iconBg }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.iconColor }} />
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-slate-300 text-sm">
                      <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: service.iconColor }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:gap-3"
                  style={{ color: service.iconColor }}
                >
                  Ver más detalles
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
