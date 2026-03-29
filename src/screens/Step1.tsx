import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { supabase } from '../lib/supabaseClient'
import type { Property } from '../lib/types'
export default function Step1() {
  const [featured, setFeatured] = useState<Property | null>(null)
  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .limit(1)
        .single()
      if (data) setFeatured(data)
    }
    fetchFeatured()
  }, [])
  return (
    <div className="bg-mesh-gradient text-on-surface font-body min-h-screen flex flex-col items-center overflow-x-hidden">
      <main className="w-full max-w-[480px] flex-1 px-6 pt-8 pb-32">
        {/* Hero Section */}
        <section className="relative mb-12">
          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center px-4 py-2 bg-[#e0e0ff] text-primary font-label text-[11px] font-bold tracking-widest uppercase rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-2" style={{ fontVariationSettings: '"FILL" 1' }}>location_on</span>
              YOGYAKARTA
            </div>
            <h1 className="font-headline text-[40px] font-extrabold leading-[1.1] tracking-tight text-[#2c2f31]">
              Temukan Hunian <span className="text-primary italic underline underline-offset-4 decoration-primary/30">Impianmu</span> di Yogyakarta
            </h1>
            <p className="text-on-surface-variant font-body text-[15px] leading-relaxed max-w-[90%]">
              AI assistant kami akan membantumu menemukan rumah terbaik dengan cepat dan akurat.
            </p>
            {/* Main CTA Button */}
            <Link to="/step2" className="w-full h-14 bg-primary text-white font-headline font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 duration-200 shadow-lg shadow-primary/25 rounded-2xl">
              Mulai Cari Hunian
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </section>
        {/* Property Showcase Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-2xl font-extrabold text-[#2c2f31]">Kawasan Pilihan</h2>
            <a className="text-primary font-label font-bold text-sm" href="#">Lihat Semua</a>
          </div>
          {/* Featured Property Card — Dynamically loaded from Supabase */}
          {featured && (
            <Link to={`/step7/${featured.id}`} className="block bg-white rounded-[24px] overflow-hidden shadow-sm border border-outline/5 relative">
              <div className="relative aspect-[4/3] m-3 overflow-hidden rounded-[16px]">
                <img alt={featured.name} className="w-full h-full object-cover" src={featured.image_url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000'}/>
                <div className="absolute top-3 left-3 floating-ai-element px-3 py-1.5 rounded-full text-[9px] font-bold text-primary flex items-center gap-1.5 border border-primary/10 shadow-sm">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                  AI RECOMMENDED
                </div>
              </div>
              <div className="px-5 pb-5 pt-1">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="font-headline text-lg font-bold text-on-surface">{featured.name}</h3>
                  <span className="font-headline font-bold text-primary text-lg">
                    Rp {featured.price >= 1000 ? `${(featured.price / 1000).toString().replace('.', ',')}M` : `${featured.price} JT`}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant text-[13px] font-medium">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bed</span> {featured.bedrooms} KT</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bathtub</span> {featured.bathrooms} KM</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">square_foot</span> {featured.land_area}m²</span>
                </div>
              </div>
            </Link>
          )}
          {/* AI Chat Assistant Card */}
          <div className="bg-[#f2f2ff] p-5 rounded-[24px] flex items-start gap-4 border border-primary/5">
            <div className="w-12 h-12 bg-[#e0e0ff] rounded-full flex-shrink-0 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>chat_bubble</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-body text-[14px] leading-snug font-medium text-on-surface">"Hai! Ingin hunian dekat UGM atau daerah Malioboro?"</p>
              <button className="text-primary font-label font-bold text-[13px] flex items-center gap-1">
                Tanya GriyaPintar Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  )
}
