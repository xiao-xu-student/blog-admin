import {request} from "./request";

export function AllViews_get() {
    return request({
        url:'/blog/allViews',
        method:'get'
    })
}

export function PublishNum_get() {
    return request({
        url:'/blog/publishNum',
        method:'get'
    })
}

export function DraftNum_get() {
    return request({
        url:'/blog/draft',
        method:'get'
    })
}

export function UserNum_get() {
    return request({
        url:'/user/count',
        method:'get'
    })
}