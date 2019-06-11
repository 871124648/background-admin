import request from '@/utils/request'
import { stringify } from 'qs'

export function getBookList(params) {
    return request({
        url: '/book/list',
        method: 'get',
        params
    })
}
export function getCollectBookList(params) {
    return request({
        url: '/book/collectList',
        method: 'get',
        params
    })
}
export function getBookSiteList(params) {
    return request({
        url: '/book/siteList',
        method: 'get',
        params
    })
}
export function updateBook(params) {
    return request({
        url: '/book/updateBook',
        method: 'post',
        data: stringify(params)
    })
}
export function changeStatus(params) {
    return request({
        url: '/book/changeStatus',
        method: 'post',
        data: stringify(params)
    })
}
export function addBookCollect(params) {
    return request({
        url: '/book/addBookCollect',
        method: 'post',
        data: stringify(params)
    })
}

export function getBookListList(params) {
    return request({
        url: '/bookList/list',
        method: 'get',
        params
    })
}

export function getBookListDataList(params) {
    return request({
        url: '/bookList/dataList',
        method: 'get',
        params
    })
}

export function updateBookList(params) {
    return request({
        url: '/bookList/update',
        method: 'post',
        data: stringify(params)
    })
}

export function deleteBookListData(params) {
    return request({
        url: '/bookList/deleteData',
        method: 'post',
        data: stringify(params)
    })
}

export function changeBookListStatus(params) {
    return request({
        url: '/bookList/changeStatus',
        method: 'post',
        data: stringify(params)
    })
}

export function getCategoryList() {
    return request({
        url: '/category/list',
        method: 'get'
    })
}

export function getSiteList(params) {
    return request({
        url: '/site/list',
        method: 'get',
        params
    })
}

// 详情的分类列表
export function getTagsList() {
    return request({
        url: '/category/tags',
        method: 'get'
    })
}