import {request} from "./request";

export function project_get() {
    return request({
        url:'/projects',
        method:'get'
    })
}

export function project_delete(id) {
    return request({
        url:'/project/delete/'+id,
        method:'get'
    })
}

export function project_add(addForm) {
    return request({
        url:'/project/add',
        method:'post',
        params:{
            name:addForm.name,
            url:addForm.url,
            icon:addForm.icon
        }

    })
}

export function project_getById(id) {
    return request({
        url:'/project/get/'+id,
        method:'get'
    })
}

export function project_edit(id,name,url,icon) {
    return request({
        url:'/project/edit',
        method:'post',
        params:{
            id:id,
            name:name,
            url:url,
            icon:icon
        }
    })
}