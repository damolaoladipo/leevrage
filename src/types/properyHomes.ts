export type PropertyHomes = {
  name: string
  slug: string
  location: string
  rate: string
  beds: number
  baths: number
  area: number
  type: 'luxury-villa' | 'residential-home' | 'appartment' | 'office-space'
  images: PropertyImage[]
}

interface PropertyImage {
  src: string;
}
