import { Link } from 'react-router-dom'

interface BottomNavProps {
  activeTab?: 'explore' | 'tanya' | 'favorit' | 'profil'
}

export default function BottomNav({ activeTab = 'explore' }: BottomNavProps) {
  return (
    <nav className="bg-white fixed bottom-0 w-full max-w-[480px] left-1/2 -translate-x-1/2 border-t border-outline-variant/10 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-[60]">
      <div className="flex justify-around items-center px-2 pt-4 pb-8 w-full">
        {/* Explore Active */}
        <Link to="/" className={`flex flex-col items-center justify-center group ${activeTab === 'explore' ? 'text-primary' : 'text-on-surface-variant font-medium opacity-70'}`}>
          <div className={`mb-1 flex items-center justify-center transition-transform duration-200 group-active:scale-90 ${activeTab === 'explore' ? 'bg-primary/10 w-14 h-8 rounded-full' : 'w-14 h-8'}`}>
            {activeTab === 'explore' ? (
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>explore</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '"FILL" 0' }}>explore</span>
            )}
          </div>
          <span className="font-body text-[11px] font-bold">Explore</span>
        </Link>
        
        {/* Tanya AI */}
        <Link to="/chat" className={`flex flex-col items-center justify-center group ${activeTab === 'tanya' ? 'text-primary' : 'text-on-surface-variant font-medium opacity-70'}`}>
          <div className={`mb-1 flex items-center justify-center transition-transform duration-200 group-active:scale-90 ${activeTab === 'tanya' ? 'bg-primary/10 w-14 h-8 rounded-full' : 'w-14 h-8'}`}>
            {activeTab === 'tanya' ? (
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            )}
          </div>
          <span className="font-body text-[11px] font-bold">Tanya AI</span>
        </Link>

        {/* Favorit */}
        <Link to="#" className={`flex flex-col items-center justify-center group ${activeTab === 'favorit' ? 'text-primary' : 'text-on-surface-variant font-medium opacity-70'}`}>
          <div className={`mb-1 flex items-center justify-center transition-transform duration-200 group-active:scale-90 ${activeTab === 'favorit' ? 'bg-primary/10 w-14 h-8 rounded-full' : 'w-14 h-8'}`}>
            {activeTab === 'favorit' ? (
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>favorite</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>favorite</span>
            )}
          </div>
          <span className="font-body text-[11px] font-bold">Favorit</span>
        </Link>

        {/* Profil */}
        <Link to="#" className={`flex flex-col items-center justify-center group ${activeTab === 'profil' ? 'text-primary' : 'text-on-surface-variant font-medium opacity-70'}`}>
          <div className={`mb-1 flex items-center justify-center transition-transform duration-200 group-active:scale-90 ${activeTab === 'profil' ? 'bg-primary/10 w-14 h-8 rounded-full' : 'w-14 h-8'}`}>
            {activeTab === 'profil' ? (
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>account_circle</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '"FILL" 0' }}>account_circle</span>
            )}
          </div>
          <span className="font-body text-[11px] font-bold">Profil</span>
        </Link>
      </div>
    </nav>
  )
}

