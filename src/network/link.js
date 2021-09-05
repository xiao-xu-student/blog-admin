import {request} from "./request";

export function friend_get(query,pageNum,pageSize) {
    return request({
        url:'/friend/allList',
        method:'get',
        params:{
            query,
            pageNum,
            pageSize
        }
    })
}

export function friend_add(name,avatar,description,website) {
    return request({
        url:'/addFriend',
        method:'post',
        params:{
            name,
            avatar,
            description,
            website
        }
    })

}

export function friend_delete(id) {
    return request({
        url:'/friend/delete/'+id,
        method:'get'
    })
}

export function friend_edit(id,name,avatar,description,website) {
    return request({
        url:'/editFriend/'+id,
        method:'put',
        params:{
            name,
            avatar,
            description,
            website
        }
    })
}

export function friend_editStatus(id) {
    return request(
        {
            url:'/editFriendStatus/'+id,
            method:'get'
        }
    )
}