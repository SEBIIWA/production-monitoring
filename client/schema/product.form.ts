import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  soft_delete: z.boolean().optional().default(false),
})

export type ProductFormType = z.infer<typeof productFormSchema>

export const productFormDefaultValues: ProductFormType = {
  name: '',
  price: 0,
  description: '',
  soft_delete: false,
}
