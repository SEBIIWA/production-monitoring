import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type LoginFormType = z.infer<typeof loginFormSchema>

export const loginFormDefaultValues: LoginFormType = {
  email: '',
  password: '',
}
