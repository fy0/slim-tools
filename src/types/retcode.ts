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
