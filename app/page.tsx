import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import TrackingSection from './components/TrackingSection'
import FleetPanel from './components/FleetPanel'
import QuoteSection from './components/QuoteSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <TrackingSection />
      <FleetPanel />
      <QuoteSection />
      <Footer />
    </main>
  )
}
