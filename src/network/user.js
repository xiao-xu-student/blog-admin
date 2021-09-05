import {request} from "./request";

export function user_request(query,pageNum,pageSize) {
    return request({
        url:'/users',
        method:'get',
        params:{
            query,
            pageNum,
            pageSize
        }
    })
}

export function user_delete(id){
    return request({
        url:'/user/delete/'+id,
        method:'get'
    })
}

export function user_checkUser(username) {
    return request({
        url:'/checkUser/'+username
    })
}

export function user_add(addForm) {
    return request({
        url:'/addUser',
        params:{
            username: addForm.username,
            password: addForm.password,
            email: addForm.email
        },
        method:'post'
    })
}

export function user_getById(id) {
    return request({
        url:'/getUserById/'+id,
        method:'get'
    })
}

export function user_edit(id,username,email) {
    return request({
        url:'/editUser/'+id,
        method:'put',
        params:{
            username,
            email
        }
    })
}

export function user_editPass(id,newPassword) {
    return request({
        url:'/editPass/'+id,
        method:'put',
        params:{
            newPassword
        }
    })

}