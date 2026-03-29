import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Step5() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const area = searchParams.get('area') || ''
  const price = searchParams.get('price') || ''
  
  useEffect(() => {
    // Simulate AI loading state for 3 seconds, then navigate to results
    const timer = setTimeout(() => {
      navigate(`/step6?area=${encodeURIComponent(area)}${price ? `&price=${price}` : ''}`)
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate, area, price])

  return (
    <div className="bg-[#f5f7f9] text-on-surface font-body flex justify-center items-start min-h-screen overflow-x-hidden">
      {/* Mobile Container */}
      <main className="w-full max-w-[480px] min-h-screen relative flex flex-col items-center px-6 pt-16 pb-10">
        {/* Background Ambient Glows */}
        <div className="absolute top-[-5%] left-[-10%] w-[250px] h-[250px] rounded-full bg-primary/10 animate-magic-glow pointer-events-none"></div>
        <div className="absolute bottom-[15%] right-[-10%] w-[200px] h-[200px] rounded-full bg-tertiary/10 animate-magic-glow pointer-events-none" style={{ animationDelay: '-2.5s' }}></div>
        
        {/* Central AI Avatar */}
        <div className="relative z-10 flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-[16px] bg-gradient-to-br from-primary to-tertiary flex items-center justify-center relative animate-float">
            <div className="absolute inset-0 rounded-[16px] bg-primary/30 blur-xl animate-pulse"></div>
            <span className="material-symbols-outlined text-3xl text-white relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
          </div>
        </div>

        {/* Sequential Text Section */}
        <div className="relative z-10 w-full text-center space-y-3 mb-12 px-4">
          <h1 className="font-headline font-extrabold text-xl tracking-tight leading-tight text-on-surface">
            Sabar ya, aku lagi carikan yang paling cocok buat kamu......
          </h1>
          <p className="font-body text-on-surface-variant text-sm opacity-80 max-w-[260px] mx-auto">
            Menghitung jarak ke fasilitas umum terdekat...
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Skeleton Results */}
        <div className="w-full space-y-4 relative z-10 px-2">
          {/* Skeleton Card 1 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-[16px] p-3 flex gap-4 shadow-sm overflow-hidden relative">
            <div className="w-20 h-20 rounded-xl skeleton-shimmer shrink-0 opacity-60"></div>
            <div className="flex-1 space-y-2.5 py-1">
              <div className="h-3.5 w-4/5 skeleton-shimmer rounded-full opacity-60"></div>
              <div className="h-2.5 w-2/5 skeleton-shimmer rounded-full opacity-40"></div>
              <div className="flex gap-2 pt-1.5">
                <div className="h-5 w-10 skeleton-shimmer rounded-full opacity-50"></div>
                <div className="h-5 w-10 skeleton-shimmer rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
          {/* Skeleton Card 2 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-[16px] p-3 flex gap-4 shadow-sm overflow-hidden relative">
            <div className="w-20 h-20 rounded-xl skeleton-shimmer shrink-0 opacity-60"></div>
            <div className="flex-1 space-y-2.5 py-1">
              <div className="h-3.5 w-3/4 skeleton-shimmer rounded-full opacity-60"></div>
              <div className="h-2.5 w-1/3 skeleton-shimmer rounded-full opacity-40"></div>
              <div className="flex gap-2 pt-1.5">
                <div className="h-5 w-12 skeleton-shimmer rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
          {/* Skeleton Card 3 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-[16px] p-3 flex gap-4 shadow-sm overflow-hidden relative">
            <div className="w-20 h-20 rounded-xl skeleton-shimmer shrink-0 opacity-60"></div>
            <div className="flex-1 space-y-2.5 py-1">
              <div className="h-3.5 w-5/6 skeleton-shimmer rounded-full opacity-60"></div>
              <div className="h-2.5 w-1/2 skeleton-shimmer rounded-full opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Bottom Status Label */}
        <div className="mt-auto pt-10 text-center w-full px-4">
          <span className="font-body text-on-surface-variant text-sm opacity-80 block leading-relaxed">Mencocokkan budgetmu dengan list rumah terbaik...</span>
        </div>
      </main>
    </div>
  )
}
