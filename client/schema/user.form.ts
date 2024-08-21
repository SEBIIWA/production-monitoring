import { z } from 'zod'

export const userFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  cin: z.string(),
  telephone: z.string(),
  username: z.string(),
  password: z.string().min(6),
  role: z.string().optional().default('EMPLOYEE'),
  profile_picture: z.string().optional().nullable(),
  is_active: z.boolean().optional().default(true),
})

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
})

export type UserFormType = z.infer<typeof userFormSchema>
export type UserLoginType = z.infer<typeof userLoginSchema>

export const userFormDefaultValues: UserFormType = {
  first_name: '',
  last_name: '',
  cin: '',
  telephone: '',
  username: '',
  password: '',
  role: 'EMPLOYEE',
  profile_picture: '',
  is_active: true,
}

export const loginFormDefaultValues: UserLoginType = {
  username: '',
  password: '',
}
