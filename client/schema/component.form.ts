import { z } from 'zod'

export const componentFormSchema = z.object({
  name: z.string().min(1, { message: 'Component name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  model_number: z.string().min(1, { message: 'Model number is required' }),
  ref: z.string().regex(/^C.*/, { message: "Reference must start with 'C'" }).length(6),
  manufacturer: z.string().min(1, { message: 'Manufacturer is required' }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: 'File size must be less than 4MB',
    })
    .nullable(),
  price: z.number().min(1, { message: 'Price must be greater than 0' }),
})

export type ComponentFormType = z.infer<typeof componentFormSchema>

export const componentFormDefaultValues: ComponentFormType = {
  name: '',
  category: '',
  description: '',
  model_number: '',
  ref: '',
  manufacturer: '',
  image: null,
  price: 1,
}
