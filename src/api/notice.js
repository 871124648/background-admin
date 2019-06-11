import request from '@/utils/request'
import { stringify } from 'qs'

export function getNoticeList(params) {
  return request({
    url: '/notice/list',
    method: 'get',
    params
  })
}

export function saveNotice(params) {
  return request({
    url: '/notice/save',
    method: 'post',
    data: stringify(params)
  })
}

export function deleteNotice(params) {
  return request({
    url: '/notice/delete',
    method: 'post',
    data: stringify(params)
  })
}
