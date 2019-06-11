import request from '@/utils/request'
import { stringify } from 'qs'

export function getPushList(params) {
  return request({
    url: '/push/list',
    method: 'get',
    params
  })
}

export function savePush(params) {
  return request({
    url: '/push/save',
    method: 'post',
    data: stringify(params)
  })
}

export function deletePush(params) {
  return request({
    url: '/push/delete',
    method: 'post',
    data: stringify(params)
  })
}
