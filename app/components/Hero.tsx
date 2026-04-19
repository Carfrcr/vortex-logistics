import { ArrowRight, Clock } from 'lucide-react'

const stats = [
  { label: 'Entregas', value: '+50K' },
  { label: 'Ciudades', value: '120+' },
  { label: 'Clientes', value: '800+' },
]

const shipments = [
  { code: 'MEX-2026', route: 'CDMX → Querétaro', eta: '14:30', status: 'En Tránsito', active: true },
  { code: 'MEX-2024', route: 'MTY → Guadalajara', eta: '16:45', status: 'En Ruta', active: true },
  { code: 'MEX-2023', route: 'Puebla → CDMX', eta: '11:20', status: 'Entregado', active: false },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 rounded-full blur-3xl pointer-events-none"
        style={{ width: 480, height: 480, background: 'rgba(6,182,212,0.04)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl pointer-events-none"
        style={{ width: 320, height: 320, background: 'rgba(59,130,246,0.04)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
                Tecnología Enterprise
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Logística{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #60a5fa)' }}
              >
                Inteligente
              </span>
              ,<br />
              Control{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #60a5fa)' }}
              >
                Total
              </span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              Conectamos industrias con soluciones de transporte de clase mundial. Rastreo
              GPS en tiempo real, flota certificada y cobertura nacional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                id="cotizar"
                href="#cotizar"
                className="group inline-flex items-center justify-center gap-2 bg-cyan-400 text-slate-950 px-8 py-3.5 rounded-xl font-semibold hover:bg-cyan-300 transition-all duration-200"
              >
                Cotizar Envío
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#rastreo"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 px-8 py-3.5 rounded-xl font-semibold hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200"
              >
                Rastrear Envío
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-cyan-400/30 pl-4">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-slate-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-slate-300 text-sm font-medium">Monitoreo en Vivo</span>
                </div>
                <span className="text-slate-500 text-xs font-mono">247 unidades activas</span>
              </div>

              <div
                className="relative rounded-xl h-52 mb-5 overflow-hidden"
                style={{ background: '#0d1f33' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 210" fill="none">
                  <path
                    d="M 40 170 C 100 170 120 90 180 100 C 240 110 280 60 360 40"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                    opacity="0.5"
                  />
                  <circle cx="40" cy="170" r="5" fill="#22d3ee" opacity="0.9" />
                  <circle cx="180" cy="100" r="4" fill="#06b6d4" opacity="0.7" />
                  <circle cx="360" cy="40" r="5" fill="#22d3ee" opacity="0.9" />
                  <circle cx="180" cy="100" r="14" fill="rgba(6,182,212,0.15)" />
                  <text x="175" y="105" fill="#e2e8f0" fontSize="11">🚛</text>
                </svg>
                <div className="absolute bottom-3 left-3 text-xs text-cyan-400 bg-slate-950/80 border border-cyan-400/20 px-2.5 py-1 rounded-md font-mono">
                  CDMX → Querétaro · Km 142
                </div>
              </div>

              <div className="space-y-2">
                {shipments.map((s) => (
                  <div
                    key={s.code}
                    className="flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-2.5"
                  >
                    <div>
                      <span className="text-cyan-400 text-xs font-mono font-semibold">{s.code}</span>
                      <div className="text-slate-500 text-xs mt-0.5">{s.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-400 text-xs mb-0.5">
                        <Clock className="w-3 h-3" />
                        {s.eta}
                      </div>
                      <span className={`text-xs font-medium ${s.active ? 'text-cyan-400' : 'text-green-400'}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
