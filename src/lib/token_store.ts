
export class TokenStore {
  getAccessToken (): string {
    // return ctx.app.$storage.getUniversal('t')
    // return localStorage.getItem('t')
    return ""
  }

  saveAccessToken (token: string) {
    // return ctx.app.$storage.setUniversal('t', token)
    // return localStorage.setItem('t', token)
  }
}
