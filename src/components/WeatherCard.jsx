import { CloudRain, Wind, Thermometer, RefreshCw, Gauge, Eye } from 'lucide-react'

export default function WeatherCard({ data, loading, onRefresh }) {

  const getWeatherDescription = (code) => {
    if (!code) return 'Unknown'
    if (code === 0) return 'Clear Sky'
    if (code <= 3) return 'Partly Cloudy'
    if (code <= 48) return 'Foggy'
    if (code <= 67) return 'Rainy'
    if (code <= 77) return 'Snowy'
    if (code <= 99) return 'Thunderstorm'
    return 'Unknown'
  }

  const getFeelsLike = (temp, windspeed) => {
    if (!temp) return null
    return (temp - (windspeed * 0.1)).toFixed(1)
  }

  return (
    <div className="glass-card flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <CloudRain className="w-6 h-6 text-blue-500" />
        </div>
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className={`refresh-btn ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Current Weather</h3>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-dark-700 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-dark-700 rounded w-3/4"></div>
              <div className="h-4 bg-dark-700 rounded w-full"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{data?.temperature}°C</span>
              <Thermometer className="w-5 h-5 text-red-400" />
            </div>

            <div className="px-3 py-1.5 bg-blue-500/10 rounded-lg w-fit">
              <span className="text-xs font-medium text-blue-400">{getWeatherDescription(data?.weathercode)}</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Wind className="w-5 h-5 text-slate-400" />
                <span className="text-sm">Wind Speed: <b className="text-white">{data?.windspeed} km/h</b></span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Thermometer className="w-5 h-5 text-slate-400" />
                <span className="text-sm">Feels Like: <b className="text-white">{getFeelsLike(data?.temperature, data?.windspeed)}°C</b></span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Gauge className="w-5 h-5 text-slate-400" />
                <span className="text-sm">Weather Code: <b className="text-white">{data?.weathercode}</b></span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Eye className="w-5 h-5 text-slate-400" />
                <span className="text-sm">Wind Direction: <b className="text-white">{data?.winddirection}°</b></span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
        <CloudRain className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}