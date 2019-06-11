import request from '@/utils/request'
import { stringify } from 'qs'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: stringify({
      userName: username,
      password
    })
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
