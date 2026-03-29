import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { supabase } from '../lib/supabaseClient'
import type { Property, PropertyHighlight } from '../lib/types'

interface PropertyWithHighlights extends Property {
  property_highlights: PropertyHighlight[]
}

export default function Step6() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const area = searchParams.get('area') || ''
  const price = searchParams.get('price') || ''
  const [properties, setProperties] = useState<PropertyWithHighlights[]>([])
  const [loading, setLoading] = useState(true)
  const [nearestPrice, setNearestPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      let query = supabase
        .from('properties')
        .select('*, property_highlights(*)')

      // Filter by area if specified
      if (area) {
        query = query.eq('location_city', area)
      }

      // Filter by budget if specified
      if (price) {
        const p = parseInt(price)
        if (!isNaN(p)) {
          query = query.lte('price', p)
        }
      }

      const { data } = await query.order('created_at', { ascending: true })
      if (data) setProperties(data)

      // If no results and price was specified, find the cheapest available property
      if ((!data || data.length === 0) && price) {
        let nearestQuery = supabase
          .from('properties')
          .select('price')
        if (area) {
          nearestQuery = nearestQuery.eq('location_city', area)
        }
        const { data: nearest } = await nearestQuery.order('price', { ascending: true }).limit(1)
        if (nearest && nearest.length > 0) {
          setNearestPrice(nearest[0].price)
        } else {
          // No properties in this area at all — try all areas
          const { data: anyNearest } = await supabase
            .from('properties')
            .select('price')
            .order('price', { ascending: true })
            .limit(1)
          if (anyNearest && anyNearest.length > 0) {
            setNearestPrice(anyNearest[0].price)
          }
        }
      } else {
        setNearestPrice(null)
      }

      setLoading(false)
    }
    fetchProperties()
  }, [area, price])

  // Gambar utama untuk setiap properti (fallback jika belum ada gambar di DB)
  const cardImages: Record<string, string> = {
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoJkg87fB-CvFYxA33Lr5aFsUEfkysOSbauc68FbGTK2-MihoXIWKi2YFcFjZjt580BipeyAJoWh_SbbgvQLCBA8ZFzY4QXyS9hJm5qPEasZlKt5tleRG_ZbKdAR-uWGl9b6sLM52OnSuGHw88oxf6NuMjTVXwsy9ot0J3p2kZHd2hHX7YehzvhFDwBOthtIQG-Z6QfvTByuQTDf51MFe7-jvlcv1w7dHjajbaL0mtuMwC38zNcpqd4NmU0e8pfM04rRh9HfPmL1iX',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBilT7uCweKxVIwYQDbsKM_RI2EZPmgdwfQN4NgHblDwAc9p54toVoc6-LMmLgSM5QVqnKN3THD8Yt3SDwdVt6u0NrKyLMWYF5eTOMWCRqk2sthZN05Hlfn2SBya6_tsrY9KvuGV7WrHeVupfNJi1oP3un7LaPmlxwwLuXIHU1XKq-lM1OIcN3ZF-ZVVncUuFWce_Oz01h8zDbWqTGpucDd_wX4zM9DcVnS0InovnzRxF5urQGLt_J0tqBOIFXrQ24FgzdxCJrGXnP0',
    'c3d4e5f6-a7b8-9012-cdef-123456789012': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMH11SQzG9OigCc4uDOp4-nNrDOgOUtDRw3pzy40dgxvtcJZCnBCg5woVOuzy-2HfgpgW2VCFM8XOf2Ll4D1T21rjqtjdLKrmMZKW-B5zNkDqSCOZtAwAmk5243YEei-foFxbuH8GrCMSvVvIsW5VUFXEnQjwdEizZKy7IhjTSDjCjkMf8iFgUqeB77X5NkiF1lFWpmprtKS_bRFpQMwjHODOWHo1WJNq9CO7Iwf9HTCTgtFqWBEPbzs3K1vEj5SbyfSqQ2s4IkJu',
  }

  // Helper: format budget for display
  const formatBudget = (val: number): string => {
    if (val >= 1000) {
      const m = val / 1000
      return `Rp ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace('.', ',')} Miliar`
    }
    return `Rp ${val} Juta`
  }

  const formatPrice = (p: number) => {
    if (p >= 1000) {
      return `Rp ${(p / 1000).toString().replace('.', ',')}M`
    }
    return `Rp ${p} JT`
  }

  // Action: increase budget to nearest available property price
  const handleIncreaseBudget = () => {
    if (nearestPrice) {
      navigate(`/step6?area=${encodeURIComponent(area)}&price=${nearestPrice}`, { replace: true })
    }
  }

  // Action: remove area filter
  const handleSearchAllAreas = () => {
    navigate(`/step6?${price ? `price=${price}` : ''}`, { replace: true })
  }

  // Action: go back to chat
  const handleBackToChat = () => {
    navigate('/chat')
  }

  return (
    <div className="bg-surface font-body text-on-surface">
      <div className="max-w-[480px] mx-auto min-h-screen flex flex-col relative bg-surface shadow-xl">
        {/* TopAppBar */}
        <header className="bg-surface sticky top-0 z-50 flex justify-between items-center w-full px-4 py-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-primary hover:bg-black/5 transition-colors p-1 rounded-full active:scale-95 duration-200">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <span className="font-headline font-bold text-lg tracking-tight text-on-surface">GriyaPintar</span>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 px-4 pt-2 pb-32">
          {loading ? (
            // Loading skeleton
            <div className="animate-pulse space-y-8 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-surface-container-high"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-surface-container-high rounded w-3/4"></div>
                    <div className="h-4 bg-surface-container-high rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            // ==========================================
            // EMPTY STATE: No properties match criteria
            // ==========================================
            <section className="flex flex-col items-center text-center px-2 pt-8">
              {/* Illustration Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-tertiary/15 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <span className="material-symbols-outlined text-5xl text-primary/60" style={{ fontVariationSettings: '"FILL" 1' }}>
                  search_off
                </span>
              </div>

              <h1 className="font-headline font-extrabold text-2xl leading-tight tracking-tight mb-3 text-on-surface">
                Belum Ada yang Cocok
              </h1>
              <p className="text-on-surface-variant font-body text-[15px] leading-relaxed max-w-[320px] mb-2">
                Hmm, belum ada properti yang sesuai dengan kriteriamu saat ini.
              </p>

              {/* Current Criteria Summary */}
              <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-5 w-full mt-4 mb-6">
                <p className="text-on-surface-variant text-sm font-medium mb-3">Kriteria pencarianmu:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {area && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 text-primary text-[13px] font-semibold rounded-full">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {area}
                    </span>
                  )}
                  {price && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tertiary/10 text-on-surface text-[13px] font-semibold rounded-full">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      ≤ {formatBudget(parseInt(price))}
                    </span>
                  )}
                  {!area && !price && (
                    <span className="text-on-surface-variant text-sm">Semua area, tanpa batas budget</span>
                  )}
                </div>
              </div>

              {/* Suggestion Text */}
              <p className="text-on-surface-variant text-sm mb-5 font-medium">
                Coba salah satu opsi berikut: 👇
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-3">
                {nearestPrice && (
                  <button
                    onClick={handleIncreaseBudget}
                    className="w-full py-4 bg-primary text-white font-bold text-sm rounded-2xl active:scale-[0.97] transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">trending_up</span>
                    Naikkan Budget ke {formatBudget(nearestPrice)}
                  </button>
                )}
                {area && (
                  <button
                    onClick={handleSearchAllAreas}
                    className="w-full py-4 bg-white border-2 border-primary/20 text-primary font-bold text-sm rounded-2xl active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">explore</span>
                    Cari di Semua Area Yogyakarta
                  </button>
                )}
                <button
                  onClick={handleBackToChat}
                  className="w-full py-4 bg-surface-container-lowest border border-outline-variant/20 text-on-surface font-semibold text-sm rounded-2xl active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Tanya Giri untuk Saran Lain
                </button>
              </div>
            </section>
          ) : (
            // ==========================================
            // SUCCESS STATE: Properties found
            // ==========================================
            <>
              {/* Hero Conclusion Section */}
              <section className="mb-8">
                <h1 className="font-headline font-extrabold text-[1.75rem] leading-tight tracking-tight mb-6 text-on-surface px-1">
                  Ketemu! Ini pilihan terbaik untukmu.
                </h1>
                <div className="bg-gradient-to-br from-primary/5 to-tertiary/10 p-6 rounded-3xl">
                  <p className="text-on-surface-variant font-body text-base leading-relaxed">
                    Oke, ketemu! Ini <span className="text-primary font-bold">{properties.length} rumah</span> yang paling masuk budget dan cocok untukmu.
                  </p>
                </div>
              </section>

              {/* Property Results */}
              <div className="space-y-8">
              {properties.map((property) => (
                <article key={property.id} className="bg-surface-container-lowest overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-[0.99] transition-transform duration-200 rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img className="w-full h-full object-cover" alt={property.name} src={cardImages[property.id] || 'https://placehold.co/600x400'} />
                    <div className="absolute top-4 right-4">
                      <button className="rounded-full shadow-sm w-10 h-10 flex items-center justify-center hover:brightness-110 transition-all bg-surface-container-high text-on-surface">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 0, "wght" 400' }}>favorite</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="font-headline font-bold text-xl text-on-surface leading-tight flex-1">{property.name}</h2>
                      <span className="font-headline font-bold text-primary text-xl whitespace-nowrap">{formatPrice(property.price)}</span>
                    </div>
                    <p className="text-on-surface-variant font-medium text-xs flex items-center gap-1 opacity-70">
                      <span className="material-symbols-outlined text-sm">location_on</span> {property.location_label}
                    </p>
                    {/* Specs */}
                    <div className="flex items-center gap-5 py-1">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">bed</span>
                        <span className="text-xs font-semibold text-on-surface">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">bathtub</span>
                        <span className="text-xs font-semibold text-on-surface">{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">square_foot</span>
                        <span className="text-xs font-semibold text-on-surface">{property.land_area}m²</span>
                      </div>
                    </div>
                    {/* Highlights from Supabase */}
                    {property.property_highlights && property.property_highlights.length > 0 && (
                      <div className="space-y-2 py-1">
                        {property.property_highlights
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((highlight) => (
                            <div key={highlight.id} className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                              <span className="text-on-surface-variant text-sm font-medium">{highlight.text}</span>
                            </div>
                          ))}
                      </div>
                    )}
                    <Link to={`/step7/${property.id}`} className="w-full py-4 font-bold text-sm mt-2 hover:brightness-105 active:scale-[0.98] transition-all bg-[#4338CA] text-white rounded-2xl shadow-md flex items-center justify-center gap-2">
                      Lihat detail <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
              </div>
              <div className="h-10"></div>
            </>
          )}
        </main>

        {/* BottomNavBar */}
        <BottomNav activeTab="explore" />
      </div>
    </div>
  )
}
