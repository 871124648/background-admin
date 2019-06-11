import request from '@/utils/request'
import { stringify } from 'qs'

export function getSignConfig() {
    return request({
        url: '/sign/signConfig',
        method: 'get'
    })
}

export function saveSignConfig(params) {
    return request({
        url: '/sign/saveSignConfig',
        method: 'post',
        data: stringify(params)
    })
}

export function delSignConfig(params) {
    return request({
        url: '/sign/delSignConfig',
        method: 'post',
        data: stringify(params)
    })
}

export function saveSignGift(params) {
    return request({
        url: '/sign/saveSignGift',
        method: 'post',
        data: stringify(params)
    })
}

export function delSignGift(params) {
    return request({
        url: '/sign/delSignGift',
        method: 'post',
        data: stringify(params)
    })
}

export function getLotteryConfig() {
    return request({
        url: '/sign/otherConfig',
        method: 'get'
    })
}

export function saveLevel(params) {
    return request({
        url: '/sign/saveLevel',
        method: 'post',
        data: stringify(params)
    })
}

export function delLevel(params) {
    return request({
        url: '/sign/delLevel',
        method: 'post',
        data: stringify(params)
    })
}

export function saveProp(params) {
    return request({
        url: '/sign/saveProp',
        method: 'post',
        data: stringify(params)
    })
}

export function delProp(params) {
    return request({
        url: '/sign/delLottery',
        method: 'post',
        data: stringify(params)
    })
}

export function saveLottery(params) {
    return request({
        url: '/sign/saveLottery',
        method: 'post',
        data: stringify(params)
    })
}

export function delLottery(params) {
    return request({
        url: '/sign/delProp',
        method: 'post',
        data: stringify(params)
    })
}