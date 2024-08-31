import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string(),
  icon: z.string(),
})

export type CategoryFormType = z.infer<typeof categoryFormSchema>

export const categoryFormDefaultValues: CategoryFormType = {
  name: '',
  icon: '',
}
