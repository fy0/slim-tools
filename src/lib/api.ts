import { AxiosInstance } from "axios"
import { TokenStore } from ".."
import { SlimResponse, SlimResponseGet, SlimResponseList, SlimResponseSet, SlimResponseNew, SlimResponseBulkInsert, SlimResponseDelete } from "../types/response"

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

  request (url, method, { params = undefined, data = undefined, role = sentinel, bulk = undefined, returning = undefined, headers = undefined } = {}): Promise<SlimResponse> {
    let token = this.tokenStore.getAccessToken()
    let reqHeaders = {}
    let reqParams: any = {}

    if (params) {
      // 将 in 和 notin 做转换，右值需要stringify
      for (let [k, v] of Object.entries(params)) {
        reqParams[k] = v
        if (k.endsWith('.in') || k.endsWith('.notin') || k.endsWith('.contains') || k.endsWith('.contains_any')) {
          if (typeof v !== 'string') {
            reqParams[k] = JSON.stringify(v)
          }
        }
      }
    }

    if (headers) {
      for (let [k, v] of Object.entries(headers)) {
        reqHeaders[k] = v
      }
    }

    if (token) reqHeaders['AccessToken'] = token
    if (bulk) reqHeaders['bulk'] = bulk
    if (returning) reqHeaders['returning'] = true

    let requestRole = this.getRequestRole(role)
    if (requestRole) reqHeaders['Role'] = requestRole

    return this.client.request({ url: `${this.urlPrefix}${url}`, method, params: reqParams, data, headers: reqHeaders })
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
  async get (params: any = {}, { role = sentinel } = {}): Promise<SlimResponseGet> {
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
  async list (params: any = {}, page = 1, { size = null, role = sentinel } = {}): Promise<SlimResponseList> {
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
  async set (params, data, { bulk = undefined, role = sentinel, returning = undefined } = {}): Promise<SlimResponseSet> {
    return this.request('/set', 'POST', { params, data, bulk, role, returning })
  }

  /**
   * 新建数据
   * @param data 赋值参数，规则参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param param1 附加可选信息，returning为true返回新建的数据记录
   */
  async new (data, { role = sentinel, returning = undefined } = {}): Promise<SlimResponseNew> {
    return this.request('/new', 'POST', { data, role, returning })
  }

  /**
   * 批量新建
   * @param items 复数的数据记录
   * @param param1 附加可选信息，returning为true返回新建的数据记录列表
   */
  async bulkInsert (items, { role = sentinel, returning = undefined } = {}): Promise<SlimResponseBulkInsert> {
    return this.request('/bulk_insert', 'POST', { data: {items}, role, returning })
  }

  /**
   * 删除数据
   * @param params 查询参数，规则可参考 https://fy0.github.io/slim/#/quickstart/query_and_modify
   * @param param1 附加可选信息，其中 bulk 是一个批量标记，当存在时，此次调用会影响多个结果。
   */
  async delete (params, { bulk = false, role = sentinel } = {}): Promise<SlimResponseDelete> {
    return this.request('/delete', 'POST', { params, bulk, role })
  }
}
