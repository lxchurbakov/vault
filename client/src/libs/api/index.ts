import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8500'
})

export default {
  createVault: (name: string, password: string) => instance.post<{ token: string }>('/vaults', { name, password })
}