import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import CurrencyCard from './components/CurrencyCard'
import CitizenCard from './components/CitizenCard'
import FactCard from './components/FactCard'
import Chatbot from './components/Chatbot'
import { Layout } from 'lucide-react'

function App() {
  const [weather, setWeather] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [citizen, setCitizen] = useState(null)
  const [fact, setFact] = useState(null)

  const [loading, setLoading] = useState({
    weather: false,
    currency: false,
    citizen: false,
    fact: false
  })

  const fetchWeather = async () => {
    setLoading(prev => ({ ...prev, weather: true }))
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current_weather=true')
      const data = await res.json()
      setWeather(data.current_weather)
    } catch (error) {
      console.error("Weather fetch failed", error)
    } finally {
      setLoading(prev => ({ ...prev, weather: false }))
    }
  }

  const fetchCurrency = async () => {
    setLoading(prev => ({ ...prev, currency: true }))
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD')
      const data = await res.json()
      setCurrency(data.rates)
    } catch (error) {
      console.error("Currency fetch failed", error)
    } finally {
      setLoading(prev => ({ ...prev, currency: false }))
    }
  }

  const fetchCitizen = async () => {
    setLoading(prev => ({ ...prev, citizen: true }))
    try {
      const res = await fetch(`https://randomuser.me/api/?seed=${Date.now()}`)
      const data = await res.json()
      setCitizen(data.results[0])
    } catch (error) {
      console.error("Citizen fetch failed", error)
    } finally {
      setLoading(prev => ({ ...prev, citizen: false }))
    }
  }

  const fetchFact = async () => {
    setLoading(prev => ({ ...prev, fact: true }))
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
      const data = await res.json()
      setFact(data)
    } catch (error) {
      console.error("Fact fetch failed", error)
    } finally {
      setLoading(prev => ({ ...prev, fact: false }))
    }
  }

  useEffect(() => {
    fetchWeather()
    fetchCurrency()
    fetchCitizen()
    fetchFact()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 min-h-screen flex flex-col">
      <header className="mb-12 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary-500 rounded-2xl shadow-xl shadow-primary-500/20">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">Smart<span className="text-primary-500">City</span></h1>
            <p className="text-slate-400 font-medium">Digital Citizen Hub & AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-xl backdrop-blur-sm">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">System Live</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <WeatherCard data={weather} loading={loading.weather} onRefresh={fetchWeather} />
        <CurrencyCard data={currency} loading={loading.currency} onRefresh={fetchCurrency} />
        <CitizenCard data={citizen} loading={loading.citizen} onRefresh={fetchCitizen} />
        <FactCard data={fact} loading={loading.fact} onRefresh={fetchFact} />
      </main>

      <Chatbot context={{ weather, currency, citizen, fact }} />
      
      <footer className="mt-auto py-8 border-t border-dark-800 text-center">
        <p className="text-slate-500 text-sm">© 2026 SmartCity Dashboard • Built with React & AI</p>
      </footer>
    </div>
  )
}

export default App