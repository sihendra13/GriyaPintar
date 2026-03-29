import { Link } from 'react-router-dom'

export default function Step2() {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col items-center overflow-x-hidden" style={{ background: 'radial-gradient(circle at top right, #fdfbff 0%, #f5f7f9 100%)' }}>
      {/* TopAppBar Section */}
      <header className="bg-[#f5f7f9] dark:bg-[#1a1c1e] top-0 sticky z-50 flex justify-between items-center w-full px-4 py-4 max-w-[480px] mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-[#4e44d4] dark:text-[#9895ff] hover:bg-[#e5e9eb] dark:hover:bg-[#44474e] transition-colors p-2 rounded-full active:scale-95 duration-200">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="font-headline font-bold text-base tracking-tight text-[#4e44d4]">GriyaPintar</span>
        </div>
        <span className="text-[#595c5e] dark:text-[#c4c6cf] font-medium text-xs">Step 1/3</span>
      </header>
      
      {/* Main Canvas - Centered Content */}
      <main className="w-full max-w-[480px] px-6 flex flex-col flex-grow justify-center py-10 relative">
        <div className="space-y-8">
          {/* Hero Editorial Header */}
          <div className="text-left">
            <h1 className="font-headline text-3xl leading-tight font-extrabold tracking-tight text-on-surface mb-3">
              Mau Beli atau Sewa?
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed opacity-80">
              Mulailah perjalanan Kamu di Yogyakarta. kami siapkan pilihan paling pas buat kamu.
            </p>
          </div>
          
          {/* Selection Cards */}
          <div className="grid grid-cols-1 gap-5">
            {/* Option 1: Beli Rumah */}
            <Link to="/step3" className="group relative flex flex-col items-start p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 transition-all duration-300 active:scale-[0.98] text-left w-full overflow-hidden block">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="mb-5 flex items-center justify-center w-14 h-14 bg-primary-container/30 text-primary rounded-2xl">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>home</span>
              </div>
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Beli Rumah</h2>
              <p className="text-on-surface-variant text-sm leading-snug mb-6">Investasi jangka panjang untuk masa depan Anda di kota budaya.</p>
              <div className="mt-auto flex items-center text-primary font-bold text-[10px] tracking-widest uppercase">
                PILIH OPSI INI
                <span className="material-symbols-outlined ml-1.5 text-sm">arrow_forward</span>
              </div>
            </Link>
            
            {/* Option 2: Sewa */}
            <Link to="/step3" className="group relative flex flex-col items-start p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 transition-all duration-300 active:scale-[0.98] text-left w-full overflow-hidden block">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="mb-5 flex items-center justify-center w-14 h-14 bg-secondary-container/30 text-secondary rounded-2xl">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>vpn_key</span>
              </div>
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Sewa</h2>
              <p className="text-on-surface-variant text-sm leading-snug mb-6">Fleksibilitas maksimal untuk eksplorasi Yogyakarta yang dinamis.</p>
              <div className="mt-auto flex items-center text-secondary font-bold text-[10px] tracking-widest uppercase">
                PILIH OPSI INI
                <span className="material-symbols-outlined ml-1.5 text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
          
          {/* Aesthetic Progress Indicator */}
          <div className="flex justify-center space-x-2 pt-4">
            <div className="w-10 h-1.5 rounded-full magic-gradient"></div>
            <div className="w-6 h-1.5 rounded-full bg-surface-container-highest"></div>
            <div className="w-6 h-1.5 rounded-full bg-surface-container-highest"></div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="fixed top-1/2 -right-20 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </main>
    </div>
  )
}
