import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  warranty_duration: z.number().optional().default(1),
  ref: z.string().regex(/^P.*/, { message: "Reference must start with 'P'" }).length(6),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: 'File size must be less than 4MB',
    })
    .nullable(),
  tva: z.number().optional().default(19),
})

export type ProductFormType = z.infer<typeof productFormSchema>

export const productFormDefaultValues: ProductFormType = {
  name: '',
  category: '',
  description: '',
  warranty_duration: 1,
  ref: '',
  image: null,
  tva: 19,
}
