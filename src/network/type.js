import {request} from "./request";

export  function type_request(query,pageNum,pageSize) {
    return request({
        url:'/types',
        method:'get',
        params:{
            query,
            pageNum,
            pageSize
        }
    })
}

export function type_delete(id) {
    return request({
        url:'/type/delete/'+id,
        method:'get',
    })
}

export function type_add(name) {
    return request({
        url:'/addType',
        method:'post',
        params:{
            name
        }
    })
}

export function type_edit(id,name) {
    return request({
        url:'/editType/'+id,
        method:'put',
        params:{
            name
        }
    })
}

export function type_all() {
    return request({
        url:'/all/types',
        method:'get'
    })
}

export function type_searchById(id) {
    return request({
        url:'/searchById/'+id,
        method:'get'
    })

}