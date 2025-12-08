export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

export interface Package {
  date: string
  name: string
  event: string
  description?: string
  recording?: string
  article?: string
  location?: Location
}
