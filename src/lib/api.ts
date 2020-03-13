import { AxiosInstance } from "axios"
import { TokenStore } from ".."

const sentinel = {}

export class SlimBaseAPI {
  public client: AxiosInstance
  public tokenStore: TokenStore
  public urlPrefix: string
  public defaultRole: any

  constructor (client: AxiosInstance, tokenStore: TokenStore, urlPrefix: string, defaultRole = null) {
    this.client = client
    this.tokenStore = tokenStore
    this.urlPrefix = urlPrefix
    this.defaultRole = defaultRole
  }

  request (url, method, { params = undefined, data = undefined, role = sentinel, bulk = null }) {
    let headers = {}
    let token = this.tokenStore.getAccessToken()

    if (token) headers['AccessToken'] = token
    if (bulk) headers['bulk'] = bulk
    let realRole = (role === sentinel) ? this.defaultRole : role
    if (realRole) headers['Role'] = realRole

    this.client.request({ url: `${this.urlPrefix}${url}`, method, params, data, headers })
  }

  saveAccessToken (token) {
    this.tokenStore.saveAccessToken(token)
  }
}

export class SlimSQLAPI extends SlimBaseAPI {
  async get (params: any, role = sentinel) {
    if (params && params.loadfk) {
      params.loadfk = JSON.stringify(params.loadfk)
    }
    return this.request('/get', 'GET', { params, role })
  }

  async list (params, page = 1, { size = null, role = sentinel }) {
    if (params && params.loadfk) {
      params.loadfk = JSON.stringify(params.loadfk)
    }
    let url = `/list/${page}`
    if (size) url += `/${size}`
    return this.request(url, 'GET', { params, role })
  }

  async set (params, data, { bulk = false, role = sentinel }) {
    return this.request('/update', 'POST', { params, data, bulk, role })
  }

  async new (data, { role = sentinel }) {
    return this.request('/new', 'POST', { data, role })
  }

  async bulkInsert (dataList, { role = sentinel }) {
    return this.request('/bulk_insert', 'POST', { data: dataList, role })
  }

  async delete (params, { bulk = false, role = sentinel }) {
    return this.request('/delete', 'POST', { params, bulk, role })
  }
}
