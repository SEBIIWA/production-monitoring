type ProductType = {
  id: number
  name: string
  tva: number
  description: string
  category: string
  height: number
  width: number
  length: number
  weight: number
  warranty_duration: number
  warranty_description: boolean
  soft_delete?: boolean
  created_at?: string
  updated_at?: string
}

type ProductInventoryType = {}
