import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const locations = [
  { id: 'Yogyakarta', label: 'Kota Yogyakarta', subtitle: 'Pusat Budaya', icon: 'location_city' },
  { id: 'Sleman', label: 'Sleman', subtitle: 'Utara', icon: 'terrain' },
  { id: 'Bantul', label: 'Bantul', subtitle: 'Selatan', icon: 'waves' },
  { id: '', label: 'Semua Area', subtitle: 'Eksplorasi', icon: 'map' },
]
export default function Step3() {
  const [selected, setSelected] = useState('Yogyakarta')
  const navigate = useNavigate()
  const handleContinue = () => {
    navigate(`/step4?area=${encodeURIComponent(selected)}`)
  }
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col items-center">
      {/* TopAppBar: Mobile Optimized */}
      <header className="bg-[#f5f7f9] dark:bg-[#1a1c1e] top-0 sticky z-50 flex justify-between items-center w-full px-4 py-4 max-w-[480px] mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/step2" className="text-[#4e44d4] dark:text-[#9895ff] hover:bg-[#e5e9eb] dark:hover:bg-[#44474e] transition-colors p-2 rounded-full active:scale-95 duration-200">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="font-headline font-bold text-base tracking-tight text-black">GriyaPintar</span>
        </div>
        <span className="text-[#595c5e] dark:text-[#c4c6cf] font-medium text-xs">Step 2/3</span>
      </header>
      {/* Main Content Canvas */}
      <main className="w-full max-w-[480px] px-5 pt-6 pb-36 flex-grow flex flex-col gap-8">
        {/* Instructional Header */}
        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold leading-tight tracking-tight text-on-surface">Di area mana kamu mau tinggal?</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed opacity-80">
            Lokasi menentukan segalanya, harga, akses dan gaya hidup kamu.
          </p>
        </section>
        {/* Visual Map Context (Mobile Friendly) */}
        <section className="relative w-full h-40 bg-surface-container rounded-2xl overflow-hidden shadow-sm">
          <img alt="Yogyakarta Landscape" className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClflFBWd9sDQS3UwQGYp1PM-dlpL6yCyzx4SwzLgVsT-TOPKalk9g6GsSEr_0bqbn9lOGFbzRUKNCbOAv-Ic1qBBimQQQE5ttiJPWo-BJzyWk3Si9mMetvak-FkgDWzlz5TeiALTUSsa-PAdqi0fz8i4xnQFUvf7LU4a0Xxv9EyYB2J2-Tksiyw3tSSIl7gfwlgHwpkUFM6yeACj8RVR7jOH1J_lUHddgDJHEanyUnsAl7PKp0EV_GCGZbAC_UwjEsJCP-UOUG62rQ" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>location_on</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">D.I. Yogyakarta</span>
          </div>
        </section>
        {/* Selection Grid */}
        <div className="grid grid-cols-2 gap-3">
          {locations.map((loc) => {
            const isSelected = selected === loc.id
            return (
              <button
                key={loc.id}
                onClick={() => setSelected(loc.id)}
                className={`p-5 rounded-2xl text-left flex flex-col justify-between mobile-grid-height active:scale-[0.97] transition-all duration-200 ${
                  isSelected
                    ? 'magic-gradient text-on-primary shadow-lg shadow-primary/10'
                    : 'bg-surface-container-lowest border border-outline-variant/10 hover:bg-surface-container-low'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-2xl ${isSelected ? '' : 'text-primary'}`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {loc.icon}
                </span>
                <div>
                  <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'opacity-70' : 'text-on-surface-variant'}`}>
                    {loc.subtitle}
                  </span>
                  <span className="font-headline font-bold text-base leading-tight">
                    {loc.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        {/* Progress Indicator */}
        <div className="flex gap-2 justify-center pt-2">
          <div className="h-1.5 w-6 rounded-full bg-primary-container/30"></div>
          <div className="h-1.5 w-10 rounded-full magic-gradient"></div>
          <div className="h-1.5 w-6 rounded-full bg-surface-container-highest"></div>
        </div>
      </main>
      {/* Navigation Action Area */}
      <footer className="fixed bottom-0 w-full max-w-[480px] px-5 py-6 glass-effect border-t border-outline-variant/10 z-50 shadow-2xl rounded-t-2xl">
        <button
          onClick={handleContinue}
          className="w-full h-14 magic-gradient text-on-primary rounded-2xl font-headline font-bold text-base shadow-xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Lanjutkan Pencarian
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </footer>
    </div>
  )
}
