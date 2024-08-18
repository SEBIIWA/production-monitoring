import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string(),
  tva: z.number().optional().default(19),
  description: z.string(),
  category: z.string(),
  height: z.number(),
  width: z.number(),
  length: z.number(),
  weight: z.number(),
  warranty_duration: z.number().optional().default(1),
  warranty_description: z.string(),
  soft_delete: z.boolean().optional().default(false),
})

export type ProductFormType = z.infer<typeof productFormSchema>

export const productFormDefaultValues: ProductFormType = {
  name: '',
  tva: 19,
  description: '',
  category: '',
  height: 1,
  width: 1,
  length: 1,
  weight: 1,
  warranty_duration: 1,
  warranty_description: '',
  soft_delete: false,
}
