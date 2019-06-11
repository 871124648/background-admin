import request from '@/utils/request'
import { stringify } from 'qs'

export function getRecommendListList(params) {
    return request({
        url: '/operate/recommendList',
        method: 'get',
        params
    })
}
export function getRecommendDataList(params) {
    return request({
        url: '/operate/recommendDataList',
        method: 'get',
        params
    })
}

export function addRecommendBook(data) {
    return request({
        url: '/operate/addRecommendBook',
        method: 'post',
        data: stringify(data)
    })
}

export function delRecommendBook(data) {
    return request({
        url: '/operate/delRecommendBook',
        method: 'post',
        data: stringify(data)
    })
}

export function getAuthorListListList(params) {
    return request({
        url: '/operate/authorList',
        method: 'get',
        params
    })
}

export function editAuthorData(data) {
    return request({
        url: '/operate/authorListSave',
        method: 'post',
        data: stringify(data)
    })
}

export function getBannerListList(params) {
    return request({
        url: '/operate/bannerList',
        method: 'get',
        params
    })
}

export function changeBannerStatus(data) {
    return request({
        url: '/operate/changeBannerStatus',
        method: 'post',
        data: stringify(data)
    })
}

export function saveBanner(data) {
    return request({
        url: '/operate/saveBanner',
        method: 'post',
        data: stringify(data)
    })
}

export function deleteBanner(data) {
    return request({
        url: '/operate/deleteBanner',
        method: 'post',
        data: stringify(data)
    })
}