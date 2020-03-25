import { retcode } from "./retcode";

export interface SlimResponse {
  code: retcode | number;
  data: any;
  msg: string;
}

export interface SlimResponseGet extends SlimResponse {
  data: object | null
}

export interface SlimPaginationInfo {
  cur_page: number, // 当前页数
  prev_page: number | null, // 上一页（若无为null）
  next_page: number | null, // 下一页（若无为null）
  first_page: number, // 第一页
  last_page: number, // 最后一页
  page_numbers: number, // 页数
  items: Array<any>, // 当页具体数据

  info : {
    page_size: number, // 分页大小
    page_count: number, // 页数
    items_count: number // 总项个数
  }
}

export interface SlimResponseList extends SlimResponse {
  data: SlimPaginationInfo | null
}

export interface SlimResponseSet extends SlimResponse {
  data: Array<object> | number | null
}

export interface SlimResponseNew extends SlimResponse {
  data: object | number | null
}

export interface SlimResponseBulkInsert extends SlimResponse {
  data: Array<object> | number | null
}

export interface SlimResponseDelete extends SlimResponse {
  data: number | null
}
