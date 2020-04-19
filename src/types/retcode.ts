export enum retcode {
  FAILED = -255,
  TIMEOUT = -254,
  UNKNOWN = -253,
  TOO_FREQUENT = -252,
  DEPRECATED = -251,
  NOT_FOUND = -249,
  ALREADY_EXISTS = -248,
  PERMISSION_DENIED = -239,
  INVALID_ROLE = -238,
  CHECK_FAILURE = -229,
  PARAM_REQUIRED = -228,
  POSTDATA_REQUIRED = -227,
  INVALID_PARAMS = -219,
  INVALID_POSTDATA = -218,
  INVALID_HEADERS = -217,
  SUCCESS = 0,
  WS_DONE = 1
}

export let retinfo_cn = {
  [retcode.SUCCESS]: '成功',
  [retcode.FAILED]: '失败',
  [retcode.TIMEOUT]: '超时',
  [retcode.UNKNOWN]: '未知错误',
  [retcode.TOO_FREQUENT]: '请求过于频繁',
  [retcode.DEPRECATED]: '此接口已被弃用',

  [retcode.NOT_FOUND]: '未找到',
  [retcode.ALREADY_EXISTS]: '已存在',

  [retcode.PERMISSION_DENIED]: '无权访问',
  [retcode.INVALID_ROLE]: '无效的权限角色',

  [retcode.CHECK_FAILURE]: '校验失败',
  [retcode.PARAM_REQUIRED]: '缺少参数',
  [retcode.POSTDATA_REQUIRED]: '缺少提交内容',

  [retcode.INVALID_PARAMS]: '非法参数',
  [retcode.INVALID_POSTDATA]: '非法提交内容',
  [retcode.INVALID_HEADERS]: '非法请求头'
}

export let retinfo_en = {
  [retcode.SUCCESS]: 'success',
  [retcode.FAILED]: 'failed',
  [retcode.TIMEOUT]: 'timeout',
  [retcode.UNKNOWN]: 'unknown',
  [retcode.TOO_FREQUENT]: 'request too frequent',
  [retcode.DEPRECATED]: 'interface deprecated',

  [retcode.NOT_FOUND]: 'not found',
  [retcode.ALREADY_EXISTS]: 'already exists',

  [retcode.PERMISSION_DENIED]: 'permission denied',
  [retcode.INVALID_ROLE]: 'acquire role failed',

  [retcode.CHECK_FAILURE]: 'check failure',
  [retcode.PARAM_REQUIRED]: 'parameter(s) required',
  [retcode.POSTDATA_REQUIRED]: 'post data item(s) required',

  [retcode.INVALID_PARAMS]: 'invalid parameters',
  [retcode.INVALID_POSTDATA]: 'invalid post',
  [retcode.INVALID_HEADERS]: 'invalid headers'
}
