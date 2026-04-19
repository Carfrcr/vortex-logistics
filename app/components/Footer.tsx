import { Truck, Mail, Phone, MapPin } from 'lucide-react'

const serviceLinks = ['Fletes Nacionales', 'Carga Consolidada', 'Última Milla', 'Almacenaje', 'Logística Inversa']
const companyLinks = ['Nosotros', 'Flota', 'Tecnología', 'Certificaciones', 'Trabaja con Nosotros']

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-1.5">
                <Truck className="text-cyan-400 w-5 h-5" />
              </div>
              <span className="text-white font-bold text-base tracking-widest">
                VORTEX <span className="text-cyan-400">LOGISTICS</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-7">
              Empresa líder en soluciones de transporte y logística para la industria
              mexicana. Tecnología, confiabilidad y cobertura nacional.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>800 VORTEX1 (800 867 8391)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>contacto@vortexlogistics.mx</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>CDMX, México · Cobertura Nacional</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-5 tracking-widest uppercase">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-5 tracking-widest uppercase">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © 2026 Vortex Logistics S.A. de C.V. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {['Privacidad', 'Términos', 'Aviso Legal'].map((item) => (
              <a key={item} href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
