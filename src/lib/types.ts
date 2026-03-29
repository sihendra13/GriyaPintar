export interface Property {
  id: string
  name: string
  price: number // dalam Juta (misal: 2400 = Rp 2.4M)
  location_city: string
  location_label: string
  bedrooms: number
  bathrooms: number
  land_area: number // m²
  description: string
  ai_insight: string
  monthly_installment: string
  is_featured: boolean
  type: 'beli' | 'sewa'
  latitude: number | null
  longitude: number | null
  created_at: string
  // Relasi
  property_images?: PropertyImage[]
  property_highlights?: PropertyHighlight[]
  nearby_facilities?: NearbyFacility[]
}

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  alt_text: string
  sort_order: number
}

export interface PropertyHighlight {
  id: string
  property_id: string
  text: string
  sort_order: number
}

export interface NearbyFacility {
  id: string
  property_id: string
  name: string
  icon: string
  distance_text: string
}
