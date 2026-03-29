import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Step4() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const area = searchParams.get('area') || ''
  const [budget, setBudget] = useState(1200) // Default 1.2M

  const formatBudget = (value: number) => {
    if (value < 1000) {
      return { textValue: value.toString(), unit: "Juta" }
    } else {
      const billionVal = value / 1000
      return { textValue: billionVal.toString().replace('.', ','), unit: "Miliar" }
    }
  }

  const { textValue, unit } = formatBudget(budget)

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[480px] bg-surface min-h-screen flex flex-col relative">
        {/* TopAppBar */}
        <header className="bg-[#f5f7f9] dark:bg-[#1a1c1e] docked full-width top-0 sticky z-50 no-border transition-colors duration-200">
          <div className="flex justify-between items-center w-full px-4 py-4 max-w-[480px] mx-auto">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#e5e9eb] dark:hover:bg-[#44474e] transition-colors active:scale-90 duration-200">
                <span className="material-symbols-outlined text-[#4e44d4] dark:text-[#9895ff]">arrow_back</span>
              </button>
              <span className="font-headline font-bold text-base tracking-tight text-black">GriyaPintar</span>
            </div>
            <div className="text-[#595c5e] dark:text-[#c4c6cf] font-medium text-xs">
              Step 3/3
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow px-8 pt-8 pb-32 flex flex-col">
          {/* Headline Section */}
          <div className="mb-10">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">
              Berapa Budget Kamu?
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed">Tenang, kami bantu temukan pilihan terbaik sesuai kemampuan finansialmu termasuk opsi KPR subsidi.</p>
          </div>

          {/* Budget Visualizer (Editorial Bento Card) */}
          <div className="bg-surface-container-lowest p-8 mb-8 relative overflow-hidden flex flex-col items-center shadow-sm rounded-2xl">
            {/* Abstract Magic Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-2 font-semibold">Estimasi Investasi</span>
            
            <div className="font-headline text-4xl font-black text-primary mb-10 flex items-baseline">
              <span className="text-2xl mr-2">Rp</span>
              <span>{textValue}</span>
              <span className="ml-2">{unit}</span>
            </div>

            {/* Custom Slider Container */}
            <div className="w-full relative mb-4">
              <input 
                className="cursor-pointer" 
                max="10000" 
                min="350" 
                step="50" 
                type="range" 
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
              />
              {/* Tick Marks */}
              <div className="flex justify-between mt-2 px-1">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-3 bg-outline-variant rounded-full mb-1"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">350 JT</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-outline-variant/30 rounded-full mb-1"></div>
                  <span className="text-[10px] font-medium text-outline-variant/50">2 M</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-1 h-3 bg-outline-variant rounded-full mb-1"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">5 M</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-outline-variant/30 rounded-full mb-1"></div>
                  <span className="text-[10px] font-medium text-outline-variant/50">7.5 M</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-1 h-3 bg-outline-variant rounded-full mb-1"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">10 M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-auto">
            <button onClick={() => navigate(`/step5?area=${encodeURIComponent(area)}&price=${budget}`)} className="w-full text-white h-16 font-headline font-bold text-lg flex items-center justify-center shadow-xl shadow-primary/25 active:scale-95 transition-transform duration-150 rounded-2xl" style={{ backgroundColor: 'rgb(67, 56, 202)' }}>
              Cari Rumah Terbaik <span className="material-symbols-outlined ml-2 text-2xl">search</span>
            </button>
            <p className="text-center mt-6 text-on-surface-variant text-sm font-medium">
              Kami akan mencocokkan data Anda dengan <span className="text-primary font-bold">1,240+</span> properti aktif.
            </p>
          </div>
        </main>

        {/* Visual Enhancements */}
        <div className="fixed -bottom-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  )
}
