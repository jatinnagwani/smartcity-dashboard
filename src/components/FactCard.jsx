import { BookOpen, RefreshCw, Quote, Share2, ThumbsUp, Lightbulb } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FactCard({ data, loading, onRefresh }) {
  if (!data && !loading) return null

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10)
  const [copied, setCopied] = useState(false)
  const [didYouKnow, setDidYouKnow] = useState(null)

const fetchDidYouKnow = () => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
      .then(res => res.json())
      .then(data => setDidYouKnow(data.text))
      .catch(() => setDidYouKnow("The average person walks about 100,000 miles in their lifetime."))
  }

  useEffect(() => {
    fetchDidYouKnow()
  }, [data])

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(data?.text || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-amber-500/10 rounded-lg">
          <BookOpen className="w-6 h-6 text-amber-500" />
        </div>
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className={`refresh-btn ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">City Fact of the Hour</h3>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-dark-700 rounded w-3/4"></div>
            <div className="h-4 bg-dark-700 rounded w-full"></div>
            <div className="h-4 bg-dark-700 rounded w-2/3"></div>
          </div>
        ) : (
          <>
            <div className="relative p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
              <Quote className="absolute top-2 left-2 w-8 h-8 text-white/5 rotate-180" />
              <p className="text-sm font-medium leading-relaxed italic text-slate-200 text-center">
                {data?.text || "Searching for facts..."}
              </p>
              <Quote className="absolute bottom-2 right-2 w-8 h-8 text-white/5" />
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
              <div className="p-1.5 bg-amber-500/10 rounded-lg shrink-0">
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Did You Know?</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {didYouKnow || "Loading..."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  liked 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-amber-400'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/5 text-slate-400 hover:text-primary-400 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
        <BookOpen className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}