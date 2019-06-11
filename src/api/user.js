import request from '@/utils/request'
import { stringify } from 'qs'

export function getInfo(userId) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { userId }
  })
}
export function getDetail(userId) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { userId }
  })
}

export function setDetailAvatar(userId) {
  return request({
    url: '/user/setDetailAvatar',
    method: 'post',
    params: { userId }
  })
}
export function saveUser(params) {
  return request({
    url: '/user/save',
    method: 'post',
    data: stringify(params)
  })
}

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
export function getUserGroupList(params) {
  return request({
    url: '/userGroup/list',
    method: 'get',
    params
  })
}

export function getSetList() {
  return request({
    url: '/user/getSetList',
    method: 'get'
  })
}

export function getUserExpList(params) {
  return request({
    url: '/user/expList',
    method: 'get',
    params
  })
}

export function getUserPointList(params) {
  return request({
    url: '/user/pointList',
    method: 'get',
    params
  })
}
