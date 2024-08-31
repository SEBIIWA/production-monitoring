import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  isForProduct: z.boolean(),
  isForComponent: z.boolean(),
})

export type CategoryFormType = z.infer<typeof categoryFormSchema>

export const categoryFormDefaultValues: CategoryFormType = {
  name: '',
  icon: '',
  isForProduct: true,
  isForComponent: true,
}
