import request from '@/utils/request'
import { stringify } from 'qs'

export function getFeedBackList(params) {
    return request({
        url: '/feedBack/list',
        method: 'get',
        params
    })
}

export function saveFeedBack(params) {
    return request({
        url: '/feedBack/save',
        method: 'post',
        data: stringify(params)
    })
}

export function getRecommendFeedBackList(params) {
    return request({
        url: '/feedBack/recommendList',
        method: 'get',
        params
    })
}

export function changeIsRecommend(params) {
    return request({
        url: '/feedBack/changeIsRecommend',
        method: 'post',
        data: stringify(params)
    })
}

export function getoriginList(params) {
    return request({
        url: '/changeSourceFeedback/list',
        method: 'get',
        params
    })
}

// 换源记录
export function sourceTab(params) {
    return request({
        url: 'changeSourceFeedback/info',
        method: 'get',
        params
    })
}

// 来源选择
export function sourceSelectList() {
    return request({
        url: 'changeSourceFeedback/site ',
        method: 'get'
    })
}

// 书籍来源
export function getBookSource(params) {
    return request({
        url: 'changeSourceFeedback/source',
        method: 'get',
        params
    })
}