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

export enum retinfo_cn {
  SUCCESS = '成功',
  FAILED = '失败',
  TIMEOUT = '超时',
  UNKNOWN = '未知错误',
  TOO_FREQUENT = '请求过于频繁',
  DEPRECATED = '此接口已被弃用',

  NOT_FOUND = '未找到',
  ALREADY_EXISTS = '已存在',

  PERMISSION_DENIED = '无权访问',
  INVALID_ROLE = '无效的权限角色',

  CHECK_FAILURE = '校验失败',
  PARAM_REQUIRED = '缺少参数',
  POSTDATA_REQUIRED = '缺少提交内容',

  INVALID_PARAMS = '非法参数',
  INVALID_POSTDATA = '非法提交内容',
  INVALID_HEADERS = '非法请求头',
}

export enum retinfo_en {
  SUCCESS = 'success',
  FAILED = 'failed',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown',
  TOO_FREQUENT = 'request too frequent',
  DEPRECATED = 'interface deprecated',

  NOT_FOUND = 'not found',
  ALREADY_EXISTS = 'already exists',

  PERMISSION_DENIED = 'permission denied',
  INVALID_ROLE = 'acquire role failed',

  CHECK_FAILURE = 'check failure',
  PARAM_REQUIRED = 'parameter(s) required',
  POSTDATA_REQUIRED = 'post data item(s) required',

  INVALID_PARAMS = 'invalid parameters',
  INVALID_POSTDATA = 'invalid post',
  INVALID_HEADERS = 'invalid headers',
}
