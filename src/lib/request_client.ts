import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000
  }
})

export function newRequestClient (baseURL) {
  const client = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()
      for (const [k, v] of Object.entries(params)) {
        if (Array.isArray(v)) {
          v.forEach((it) => searchParams.append(k, it))
        } else {
          searchParams.append(k, v.toString())
        }
      }
      return searchParams.toString()
    }
  })

  client.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    return Promise.reject(error)
  })

  return client
}
