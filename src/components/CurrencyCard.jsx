import { IndianRupee, Euro, PoundSterling, TrendingUp, RefreshCw } from 'lucide-react'

export default function CurrencyCard({ data, loading, onRefresh }) {
  if (!data && !loading) return null

  const rates = [
    { label: 'INR', value: data?.INR?.toFixed(2), icon: IndianRupee, color: 'text-emerald-500' },
    { label: 'EUR', value: data?.EUR?.toFixed(2), icon: Euro, color: 'text-blue-500' },
    { label: 'GBP', value: data?.GBP?.toFixed(2), icon: PoundSterling, color: 'text-amber-500' }
  ]

  return (
    <div className="glass-card flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
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
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Currency Rates (Base USD)</h3>
        
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 bg-dark-700 rounded-xl w-full"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {rates.map((rate, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${rate.color.split('-')[1]}-500/10`}>
                    <rate.icon className={`w-4 h-4 ${rate.color}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{rate.label}</span>
                </div>
                <span className="text-lg font-bold">1 USD = {rate.value} {rate.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
        <TrendingUp className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}
