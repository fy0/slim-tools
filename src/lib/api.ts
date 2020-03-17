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

  private getRequestRole (role): any {
    if (role === sentinel) {
      if (typeof this.defaultRole === 'function') {
        return this.defaultRole()
      }
      return this.defaultRole
    }
    return role
  }

  request (url, method, { params = undefined, data = undefined, role = sentinel, bulk = undefined, returning = undefined }) {
    let headers = {}
    let token = this.tokenStore.getAccessToken()

    if (params) {
      // 将 in 和 notin 做转换，右值需要stringify
      for (let k of params.keys()) {
        if (k.endsWith('.in') || k.endsWith('.notin')) {
          let v = params[k]
          if (typeof v !== 'string') {
            params[k] = JSON.stringify(v)
          }
        }
      }
    }

    if (token) headers['AccessToken'] = token
    if (bulk) headers['bulk'] = bulk
    if (returning) headers['returning'] = true

    let requestRole = this.getRequestRole(role)
    if (requestRole) headers['Role'] = requestRole

    return this.client.request({ url: `${this.urlPrefix}${url}`, method, params, data, headers })
  }

  saveAccessToken (token) {
    this.tokenStore.saveAccessToken(token)
  }
}

export class SlimSQLAPI extends SlimBaseAPI {
  /**
   * 获取单项
   * @param params 查询参数，规则可参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param param1 附加可选信息
   */
  async get (params: any, { role = sentinel } = {}) {
    if (params && params.loadfk) {
      params.loadfk = JSON.stringify(params.loadfk)
    }
    return this.request('/get', 'GET', { params, role })
  }

  /**
   * 获取列表，返回值中自带分页相关信息
   * @param params 查询参数，规则可参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param page 想要查询的页数
   * @param param2 附加可选信息，其中size为分页大小，但只有后端提供了 LIST_ACCEPT_SIZE_FROM_CLIENT 选项时才能生效。
   */
  async list (params, page = 1, { size = null, role = sentinel } = {}) {
    if (params && params.loadfk) {
      params.loadfk = JSON.stringify(params.loadfk)
    }
    let url = `/list/${page}`
    if (size) url += `/${size}`
    return this.request(url, 'GET', { params, role })
  }

  /**
   * 更新数据，当存在 returning 时，返回影响的数据列表，否则返回影响数据的个数
   * @param params 查询参数，规则可参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param data 赋值参数，规则参考同一页面
   * @param param2 附加可选信息，其中 bulk 是一个批量标记，当存在时，此次调用会影响多个结果。returning为true则返回受影响的数据列表
   */
  async set (params, data, { bulk = undefined, role = sentinel, returning = undefined } = {}) {
    return this.request('/update', 'POST', { params, data, bulk, role, returning })
  }

  /**
   * 新建数据
   * @param data 赋值参数，规则参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param param1 附加可选信息，returning为true返回新建的数据记录
   */
  async new (data, { role = sentinel, returning = undefined } = {}) {
    return this.request('/new', 'POST', { data, role, returning })
  }

  /**
   * 批量新建
   * @param items 复数的数据记录
   * @param param1 附加可选信息，returning为true返回新建的数据记录列表
   */
  async bulkInsert (items, { role = sentinel, returning = undefined } = {}) {
    return this.request('/bulk_insert', 'POST', { data: {items}, role, returning })
  }

  /**
   * 删除数据
   * @param params 查询参数，规则可参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param param1 附加可选信息，其中 bulk 是一个批量标记，当存在时，此次调用会影响多个结果。
   */
  async delete (params, { bulk = false, role = sentinel } = {}) {
    return this.request('/delete', 'POST', { params, bulk, role })
  }
}
