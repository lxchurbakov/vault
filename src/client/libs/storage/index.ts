export const parseJson = <T>(data: string) => new Promise<T>((resolve, reject) => {
  try {
    resolve(JSON.parse(data))
  } catch (e) {
    reject(e)
  }
})

export default {
  get: <T>(key: string) => parseJson<T>(localStorage.getItem(key) || 'null'),
  set: <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value)),
}