import { User, MapPin, Mail, RefreshCw, Phone, Calendar, Ruler, Weight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CitizenCard({ data, loading, onRefresh }) {
  if (!data && !loading) return null

  const [height, setHeight] = useState(Math.floor(Math.random() * 40) + 155)
  const [weight, setWeight] = useState(Math.floor(Math.random() * 40) + 55)

  useEffect(() => {
    setHeight(Math.floor(Math.random() * 40) + 155)
    setWeight(Math.floor(Math.random() * 40) + 55)
  }, [data])

  return (
    <div className="glass-card flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <User className="w-6 h-6 text-purple-500" />
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
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Citizen Profile</h3>
        
        {loading ? (
          <div className="animate-pulse space-y-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-dark-700 rounded-full"></div>
            <div className="h-6 bg-dark-700 rounded w-1/2"></div>
            <div className="h-4 bg-dark-700 rounded w-3/4"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img 
                src={data?.picture?.large} 
                alt="Citizen" 
                className="w-20 h-20 rounded-full border-2 border-primary-500/30 p-1 shadow-lg shadow-primary-500/10"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-dark-800 rounded-full"></div>
            </div>
            
            <h4 className="text-xl font-bold">{data?.name?.first} {data?.name?.last}</h4>

            <div className="mt-4 space-y-2 w-full">
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs truncate">{data?.location?.city}, {data?.location?.country}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs truncate">{data?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs truncate">{data?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs">Age: <b className="text-white">{data?.dob?.age} years</b></span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs">Gender: <b className="text-white capitalize">{data?.gender}</b></span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                  <Ruler className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs"><b className="text-white">{height} cm</b></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
                  <Weight className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs"><b className="text-white">{weight} kg</b></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
        <User className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}