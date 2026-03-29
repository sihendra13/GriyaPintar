import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Property, PropertyImage, NearbyFacility } from '../lib/types'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Custom pin icon yang sesuai desain UI — lingkaran ungu dengan ikon lokasi
const mapPin = L.divIcon({
  className: '',
  html: `
    <div style="display:flex;align-items:center;justify-content:center;width:48px;height:48px;position:relative;">
      <div style="position:absolute;inset:0;background:rgba(67,56,202,0.2);border-radius:50%;animation:pulse 2s infinite;"></div>
      <span class="material-symbols-outlined" style="font-size:28px;color:#4338CA;font-variation-settings:'FILL' 1;position:relative;z-index:1;">location_on</span>
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 44],
  popupAnchor: [0, -40],
})
export default function Step7() {
  const { id } = useParams<{ id: string }>()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [property, setProperty] = useState<Property | null>(null)
  const [images, setImages] = useState<PropertyImage[]>([])
  const [facilities, setFacilities] = useState<NearbyFacility[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return
      // Ambil data properti
      const { data: propData } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()
      if (propData) setProperty(propData)
      // Ambil gambar properti
      const { data: imgData } = await supabase
        .from('property_images')
        .select('*')
        .eq('property_id', id)
        .order('sort_order', { ascending: true })
      if (imgData) setImages(imgData)
      // Ambil fasilitas terdekat
      const { data: facData } = await supabase
        .from('nearby_facilities')
        .select('*')
        .eq('property_id', id)
      if (facData) setFacilities(facData)
      setLoading(false)
    }
    fetchProperty()
  }, [id])
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const scrollPosition = scrollContainerRef.current.scrollLeft
    const width = scrollContainerRef.current.clientWidth
    const newIndex = Math.round(scrollPosition / width)
    setActiveIndex(newIndex)
  }
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `Rp ${(price / 1000).toString().replace('.', ',')}M`
    }
    return `Rp ${price} JT`
  }
  if (loading) {
    return (
      <div className="max-w-[480px] mx-auto min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <span className="text-on-surface-variant text-sm">Memuat detail properti...</span>
        </div>
      </div>
    )
  }
  if (!property) {
    return (
      <div className="max-w-[480px] mx-auto min-h-screen flex items-center justify-center bg-surface">
        <p className="text-on-surface-variant">Properti tidak ditemukan.</p>
      </div>
    )
  }
  return (
    <div className="max-w-[480px] mx-auto min-h-screen flex flex-col relative bg-surface">
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 py-4 max-w-[480px] mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="text-primary active:scale-95 duration-200 p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="font-headline font-bold text-base tracking-tight text-on-surface">GriyaPintar</div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pb-32">
        {/* Image Carousel — Dynamic from Supabase */}
        <section className="relative px-4 mt-2">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-4"
          >
            {images.map((img) => (
              <div key={img.id} className="snap-center shrink-0 w-[85%] aspect-[4/5] overflow-hidden relative shadow-lg rounded-2xl">
                <img className="w-full h-full object-cover" alt={img.alt_text} src={img.image_url}/>
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-surface-container-lowest/60 backdrop-blur-md rounded-full">
              {images.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'bg-primary' : 'bg-on-surface-variant/30'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </section>
        {/* Main Info Section — Dynamic */}
        <section className="px-6 mt-6">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-primary font-label text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
              Curated Selection
            </div>
            <div className="flex justify-between items-start gap-2">
              <h1 className="font-headline text-xl font-bold text-on-surface leading-tight">{property.name}</h1>
              <span className="font-headline font-bold text-[#4338CA] text-xl whitespace-nowrap">{formatPrice(property.price)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span className="font-medium">{property.location_label}</span>
            </div>
          </div>
        </section>
        {/* AI Recommendation Badge — Dynamic */}
        {property.ai_insight && (
          <section className="px-6 mt-8">
            <div className="bg-gradient-to-br from-primary to-tertiary p-[1px] rounded-2xl shadow-sm">
              <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-5 rounded-[calc(1rem-1px)] flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>auto_awesome</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline font-bold text-on-surface text-sm">GriyaPintar Insight</span>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed">{property.ai_insight}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Specs Grid — Dynamic */}
        <section className="px-6 mt-8 grid grid-cols-3 gap-3">
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">bed</span>
            <span className="text-[11px] font-bold text-on-surface-variant text-center leading-tight">{property.bedrooms} Kamar Tidur</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">shower</span>
            <span className="text-[11px] font-bold text-on-surface-variant text-center leading-tight">{property.bathrooms} Kamar Mandi</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">square_foot</span>
            <span className="text-[11px] font-bold text-on-surface-variant text-center leading-tight">{property.land_area}m² Luas Tanah</span>
          </div>
        </section>
        {/* Description — Dynamic */}
        {property.description && (
          <section className="px-6 mt-10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-3">Tentang Properti</h3>
            <p className="text-on-surface-variant leading-[1.6] text-[14px]">{property.description}</p>
          </section>
        )}
        {/* Facilities Nearby — Dynamic from Supabase */}
        {facilities.length > 0 && (
          <section className="px-6 mt-10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-5">Fasilitas Terdekat</h3>
            <div className="flex flex-col gap-3">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">{facility.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{facility.name}</div>
                      <div className="text-[11px] text-on-surface-variant">{facility.distance_text}</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Interactive Map — Powered by Leaflet + OpenStreetMap */}
        {property.latitude && property.longitude && (
          <section className="px-6 mt-10">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Lokasi Peta</h3>
            <div className="w-full h-56 rounded-2xl overflow-hidden shadow-inner relative z-10">
              <MapContainer
                center={[property.latitude, property.longitude]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[property.latitude, property.longitude]} icon={mapPin}>
                  <Popup>
                    <strong>{property.name}</strong><br />
                    {property.location_label}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>
        )}
      </main>
      {/* Fixed Bottom CTA */}
      <footer className="fixed bottom-0 w-full max-w-[480px] left-1/2 -translate-x-1/2 bg-white backdrop-blur-xl z-[60] px-6 py-5 pb-8 border-t border-outline-variant/10">
        <div className="flex gap-4 items-center">
          <button className="w-14 h-14 shrink-0 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface active:scale-90 transition-transform">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <a className="flex-grow h-14 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/30 active:scale-[0.97] transition-all" href="https://wa.me/628123456789">
            <span className="material-symbols-outlined">chat</span>
            Hubungi via WhatsApp
          </a>
        </div>
      </footer>
    </div>
  )
}
