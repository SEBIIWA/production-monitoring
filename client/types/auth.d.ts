type CurrentUserType = {
  id: number
  email: string
  username: string
}

type LoginResponseType = {
  token: string
  created: boolean
}

type LoginErrorResponseType = {
  detail: string
}
