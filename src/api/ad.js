import request from '@/utils/request'
import { stringify } from 'qs'

export function getAdList(params) {
  return request({
    url: '/ad/list',
    method: 'get',
    params
  })
}

export function saveAd(params) {
  return request({
    url: '/ad/save',
    method: 'post',
    data: stringify(params)
  })
}

export function changeAdStatus(params) {
  return request({
    url: '/ad/changeStatus',
    method: 'post',
    data: stringify(params)
  })
}

export function deleteAd(params) {
  return request({
    url: '/ad/delete',
    method: 'post',
    data: stringify(params)
  })
}
