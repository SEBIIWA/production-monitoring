type UserLoginType = {
  username: string
  password: string
}

type UserType = UserLoginType & {
  id: number
  first_name: string
  last_name: string
  cin: string
  telephone: string
  role: 'EMPLOYEE' | 'ADMIN' | 'MODERATOR'
  profile_picture: string
  is_active: boolean
  created_at: string
}
