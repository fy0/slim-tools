
export class TokenStore {
  getAccessToken (): string {
    return localStorage.getItem('t')
  }

  saveAccessToken (token: string) {
    return localStorage.setItem('t', token)
  }
}

export class TokenStoreNuxt extends TokenStore {
  ctx: any

  constructor (ctx: any) {
    super()
    this.ctx = ctx
  }

  getAccessToken (): string {
    return this.ctx.app.$storage.getUniversal('t')
  }

  saveAccessToken (token: string) {
    return this.ctx.app.$storage.setUniversal('t', token)
  }
}
