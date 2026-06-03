import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, X, Loader2, Bot, User } from 'lucide-react'

export default function Chatbot({ context }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your SmartCity Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const { weather, currency, citizen, fact } = context
    const contextString = `You are a SmartCity assistant. Answer only based on: WEATHER: ${weather?.temperature}°C, wind ${weather?.windspeed}km/h | CURRENCY: 1 USD = ${currency?.INR} INR, ${currency?.EUR} EUR, ${currency?.GBP} GBP | CITIZEN: ${citizen?.name?.first} ${citizen?.name?.last} from ${citizen?.location?.city}, ${citizen?.email} | FACT: ${fact?.text}. If question is unrelated, say you only know dashboard data.`

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: contextString }] },
              { role: "model", parts: [{ text: "Understood. I will only answer based on this dashboard data." }] },
              ...messages.slice(1).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
              })),
              { role: "user", parts: [{ text: input }] }
            ]
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP Error ${response.status}`)
      }

      const assistantMessage = {
        role: 'assistant',
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.'
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-500/20 transition-all hover:scale-110 z-50 group"
      >
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-dark-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700/50 w-full max-w-lg h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-800/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <Bot className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">City Assistant</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-700 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-dark-700 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-xl h-fit ${msg.role === 'user' ? 'bg-primary-500/10' : 'bg-dark-700/50'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-primary-500" /> : <Bot className="w-4 h-4 text-primary-500" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary-500 text-white rounded-tr-none shadow-lg shadow-primary-500/10' 
                        : 'bg-dark-700/50 border border-dark-600/30 rounded-tl-none text-slate-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="p-2 rounded-xl h-fit bg-dark-700/50">
                      <Bot className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-dark-700/50 border border-dark-600/30 flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-6 border-t border-dark-700 bg-dark-800/50">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about weather, currency, or citizens..."
                  className="flex-1 bg-dark-700 border border-dark-600/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500/50 transition-all text-white placeholder-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}