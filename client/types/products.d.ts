type ProductType = {
  id: number
  name: string
  category: string
  description: string
  warranty_duration: number
  ref: string
  image: string
  tva: number
  created_at?: string
  updated_at?: string
  inventory: InventoryType[]
}
