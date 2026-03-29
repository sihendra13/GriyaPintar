import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { supabase } from '../lib/supabaseClient'
import type { Property } from '../lib/types'

// Tipe pesan chat
interface ChatMessage {
  from: 'giri' | 'user'
  text: string
  chips?: { label: string; value: string }[]
  showSlider?: boolean
  showResults?: boolean
  isTyping?: boolean
}

// Format harga
function formatBudget(val: number): string {
  if (val >= 1000) {
    const m = val / 1000
    return `Rp ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace('.', ',')} Miliar`
  }
  return `Rp ${val} Juta`
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState<{ type: string; location: string; budget: number }>({
    type: '', location: '', budget: 2000,
  })
  const [results, setResults] = useState<Property[]>([])
  const [sliderValue, setSliderValue] = useState(2000)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Langkah pertama: Sapaan
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          from: 'giri',
          text: 'Halo, Sugeng Rawuh di GriyaPintar! 👋 Aku Giri, asisten propertimu. Kamu lagi cari rumah untuk beli atau sewa?',
          chips: [
            { label: '🏠 Beli Rumah', value: 'beli' },
            { label: '🔑 Sewa / Kontrak', value: 'sewa' },
          ],
        },
      ])
      setStep(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Fungsi untuk memproses pilihan user
  const handleChipClick = (label: string, value: string) => {
    const userMsg: ChatMessage = { from: 'user', text: label }

    if (step === 1) {
      setChoices(prev => ({ ...prev, type: value }))
      const typing: ChatMessage = { from: 'giri', text: '', isTyping: true }
      setMessages(prev => [...prev.map(m => ({ ...m, chips: undefined })), userMsg, typing])

      setTimeout(() => {
        setMessages(prev => [
          ...prev.filter(m => !m.isTyping),
          {
            from: 'giri',
            text: `Oke, kamu mau ${value === 'beli' ? 'beli' : 'sewa'} di daerah mana nih di Yogyakarta? 📍`,
            chips: [
              { label: '📍 Sleman', value: 'Sleman' },
              { label: '📍 Bantul', value: 'Bantul' },
              { label: '📍 Kota Yogyakarta', value: 'Yogyakarta' },
              { label: '🗺️ Semua Area', value: '' },
            ],
          },
        ])
        setStep(2)
      }, 1200)
    } else if (step === 2) {
      setChoices(prev => ({ ...prev, location: value }))
      const typing: ChatMessage = { from: 'giri', text: '', isTyping: true }
      setMessages(prev => [...prev.map(m => ({ ...m, chips: undefined })), userMsg, typing])

      setTimeout(() => {
        setMessages(prev => [
          ...prev.filter(m => !m.isTyping),
          {
            from: 'giri',
            text: 'Siap! Budget kamu kira-kira di kisaran berapa? Geser slider-nya ya! 💰',
            showSlider: true,
          },
        ])
        setStep(3)
      }, 1200)
    } else if (step === 4) {
      // Handle re-search from smart recommendation
      const typing: ChatMessage = { from: 'giri', text: '', isTyping: true }
      setMessages(prev => [...prev.map(m => ({ ...m, chips: undefined })), userMsg, typing])

      if (value.startsWith('budget:')) {
        // User accepted the recommended budget
        const newBudget = parseInt(value.replace('budget:', ''))
        setChoices(prev => ({ ...prev, budget: newBudget }))

        setTimeout(() => {
          setMessages(prev => [
            ...prev.filter(m => !m.isTyping),
            {
              from: 'giri',
              text: `Siap! Aku carikan properti dengan budget ${formatBudget(newBudget)} 🔍`,
              showResults: true,
            },
          ])
          // Navigate to results with the new budget
          setStep(5)
        }, 1200)

        // Update results for the link
        setTimeout(async () => {
          let q = supabase.from('properties').select('*, property_highlights(*)')
          if (choices.location) q = q.eq('location_city', choices.location)
          q = q.lte('price', newBudget)
          const { data } = await q.order('price', { ascending: true })
          setResults(data || [])
          setChoices(prev => ({ ...prev, budget: newBudget }))
        }, 500)

      } else if (value === 'area:all') {
        // User wants to search all areas
        setChoices(prev => ({ ...prev, location: '' }))

        setTimeout(async () => {
          let q = supabase.from('properties').select('*, property_highlights(*)')
          q = q.lte('price', choices.budget)
          const { data } = await q.order('price', { ascending: true })
          setResults(data || [])

          const count = data?.length || 0
          setMessages(prev => [
            ...prev.filter(m => !m.isTyping),
            {
              from: 'giri',
              text: count > 0
                ? `Oke! Aku cari di semua area Yogyakarta. Ketemu ${count} properti yang cocok! 🏡`
                : 'Hmm, belum ada properti yang cocok di semua area. Coba naikkan budget ya! 🔍',
              showResults: count > 0,
            },
          ])
          setChoices(prev => ({ ...prev, location: '' }))
          setStep(5)
        }, 1200)
      }
    }
  }

  // Fungsi untuk submit budget
  const handleBudgetSubmit = () => {
    setChoices(prev => ({ ...prev, budget: sliderValue }))
    const userMsg: ChatMessage = { from: 'user', text: formatBudget(sliderValue) }
    const typing: ChatMessage = { from: 'giri', text: '', isTyping: true }

    setMessages(prev => [
      ...prev.map(m => ({ ...m, showSlider: undefined })),
      userMsg,
      typing,
    ])

    // Mencari properti
    setTimeout(() => {
      const locationText = choices.location || 'Semua'
      setMessages(prev => [
        ...prev.filter(m => !m.isTyping),
        { from: 'giri', text: '', isTyping: true },
      ])

      // Query Supabase
      setTimeout(async () => {
        let query = supabase
          .from('properties')
          .select('*, property_highlights(*)')

        if (choices.location) {
          query = query.eq('location_city', choices.location)
        }

        query = query.lte('price', sliderValue)

        const { data } = await query.order('price', { ascending: true })
        setResults(data || [])

        const count = data?.length || 0

        if (count > 0) {
          setMessages(prev => [
            ...prev.filter(m => !m.isTyping),
            {
              from: 'giri',
              text: `Oke! Budget ${formatBudget(sliderValue)} di ${locationText} sudah saya catat. Berikut pilihan terbaik yang saya temukan untuk kamu 🏡`,
              showResults: true,
            },
          ])
          setStep(5)
        } else {
          // Find nearest available property price
          let nearestQuery = supabase
            .from('properties')
            .select('price, name')
          if (choices.location) {
            nearestQuery = nearestQuery.eq('location_city', choices.location)
          }
          const { data: nearestData } = await nearestQuery.order('price', { ascending: true }).limit(1)

          if (nearestData && nearestData.length > 0) {
            const nearest = nearestData[0]
            const newBudget = nearest.price
            setMessages(prev => [
              ...prev.filter(m => !m.isTyping),
              {
                from: 'giri',
                text: `Hmm, belum ada properti di ${locationText} dengan budget ${formatBudget(sliderValue)} 😔\n\nTapi tenang! Properti terdekat yang tersedia adalah "${nearest.name}" seharga ${formatBudget(newBudget)}. Mau saya carikan dengan budget ini?`,
                chips: [
                  { label: `✅ Ya, cari di ${formatBudget(newBudget)}`, value: `budget:${newBudget}` },
                  { label: '🗺️ Cari di Semua Area', value: 'area:all' },
                ],
              },
            ])
            setStep(4) // Special step for re-search
          } else {
            setMessages(prev => [
              ...prev.filter(m => !m.isTyping),
              {
                from: 'giri',
                text: `Hmm, belum ada properti di ${locationText} saat ini. Coba cari di semua area Yogyakarta ya! 🔍`,
                chips: [
                  { label: '🗺️ Cari di Semua Area', value: 'area:all' },
                ],
              },
            ])
            setStep(4)
          }
        }
      }, 2000)
    }, 1200)
  }

  return (
    <div className="bg-surface font-body text-on-surface">
      <div className="max-w-[480px] mx-auto min-h-screen flex flex-col relative bg-surface shadow-xl">
        {/* TopAppBar */}
        <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 flex items-center gap-3 w-full px-5 py-4 border-b border-outline-variant/10">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=giri" alt="Giri" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-headline font-bold text-base text-on-surface">Giri</span>
            <span className="text-[11px] text-on-surface-variant ml-2">AI Property Assistant</span>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 px-4 py-6 pb-32 overflow-y-auto">
          <div className="space-y-5">
            {messages.map((msg, i) => (
              <div key={i}>
                {/* Typing Indicator */}
                {msg.isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <img src="https://i.pravatar.cc/150?u=giri" alt="Giri" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white border border-outline-variant/20 px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Giri Message */}
                {msg.from === 'giri' && !msg.isTyping && (
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                        <img src="https://i.pravatar.cc/150?u=giri" alt="Giri" className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-[85%]">
                        <div className="bg-white border border-outline-variant/20 px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm">
                          <p className="text-[14px] leading-relaxed text-on-surface whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        {/* Chips */}
                        {msg.chips && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.chips.map((chip, j) => (
                              <button
                                key={j}
                                onClick={() => handleChipClick(chip.label, chip.value)}
                                className="px-4 py-2 bg-white border border-outline-variant/30 text-on-surface font-semibold text-[13px] rounded-full hover:bg-surface-variant/50 active:scale-95 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                              >
                                {chip.label}
                              </button>
                            ))}
                          </div>
                        )}
                        {/* Budget Slider */}
                        {msg.showSlider && (
                          <div className="mt-4 bg-white border-2 border-primary/10 p-5 rounded-2xl shadow-sm space-y-4">
                            <div className="text-center">
                              <span className="font-headline font-bold text-2xl text-primary">{formatBudget(sliderValue)}</span>
                            </div>
                            <input
                              type="range"
                              min={350}
                              max={10000}
                              step={50}
                              value={sliderValue}
                              onChange={(e) => setSliderValue(Number(e.target.value))}
                              className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
                              <span>350 Juta</span>
                              <span>10 Miliar</span>
                            </div>
                            <button
                              onClick={handleBudgetSubmit}
                              className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-2xl active:scale-[0.97] transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                            >
                              Cari Properti
                              <span className="material-symbols-outlined text-lg">search</span>
                            </button>
                          </div>
                        )}
                        {/* Lihat Hasil Button */}
                        {msg.showResults && results.length > 0 && (
                          <div className="mt-3">
                            <Link
                              to={`/step6?area=${encodeURIComponent(choices.location)}&price=${choices.budget}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-outline-variant/30 text-on-surface font-semibold text-[13px] rounded-full hover:bg-surface-variant/50 active:scale-95 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                            >
                              Lihat Hasil →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* User Message */}
                {msg.from === 'user' && (
                  <div className="flex flex-col gap-1 items-end">
                    <div className="flex items-start gap-3 justify-end w-full">
                      <div className="max-w-[75%] bg-[#2196F3] text-white px-5 py-3.5 rounded-3xl rounded-br-sm shadow-sm">
                        <p className="text-[14px] font-medium">{msg.text}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                        <img src="https://i.pravatar.cc/150?u=user1" alt="User" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div ref={chatEndRef}></div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="tanya" />
      </div>
    </div>
  )
}
