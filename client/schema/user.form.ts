import { z } from 'zod'

export const userFormSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  cin: z.string().min(1, { message: 'CIN is required' }),
  telephone: z.string().min(1, { message: 'Telephone is required' }),
  username: z.string().min(4, { message: 'Username must be at least 4 characters' }).max(20, { message: 'Username must be at most 20 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string().optional().default('EMPLOYEE'),
  profile_picture: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: 'File size must be less than 4MB',
    })
    .nullable(),
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
  profile_picture: null,
  is_active: false,
}

export const loginFormDefaultValues: UserLoginType = {
  username: '',
  password: '',
}
