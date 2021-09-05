import {request} from "./request";

export  function tag_request(query,pageNum,pageSize) {
        return request({
            url:'/tags',
            method:'get',
            params:{
                query,
                pageNum,
                pageSize
            }
        })
}

export function tag_delete(id) {
    return request({
        url:'/tag/delete/'+id,
        method:'get',
    })
}

export function tag_add(name) {
    return request({
        url:'/addTag',
        method:'post',
        params:{
            name
        }
    })
}

export function tag_edit(id,name) {
    return request({
        url:'/editTag/'+id,
        method:'put',
        params:{
            name
        }
    })
}

export function tag_all() {
    return request({
        url:'/all/tags',
        method:'get'
    })
}