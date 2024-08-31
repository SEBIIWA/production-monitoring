import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string(),
  icon: z.string(),
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
