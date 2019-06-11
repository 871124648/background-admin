import request from '@/utils/request'

export function getErrorLogList(params) {
  return request({
    url: '/errorLog/list',
    method: 'get',
    params
  })
}
