export type Creator = {
  id: number
  created_at?: string
  name: string
  url: string
  description: string
  imageURL: string | null
}

export type CreatorInput = {
  name: string
  url: string
  description: string
  imageURL: string
}
