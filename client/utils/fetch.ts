import axios, { AxiosInstance } from 'axios'

import { SERVER_URL } from '@/constant'

const fetcher: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
})

export { fetcher }
