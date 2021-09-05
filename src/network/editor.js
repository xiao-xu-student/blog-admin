import {request} from "./request";

export function upload_picture(formData) {
    return request({
        url:'/blog/file/upload',
        method:'post',
        data: formData,
        headers:{'Content-Type': 'multipart/form-data'}
    })
}

export function blog_submit(blogInfo) {

    return request({
        url:'/blog/submit',
        method:'post',
        data:{
            title:blogInfo.title,
            content:blogInfo.content,
            description:blogInfo.description,
            first_picture:blogInfo.first_picture,
            published:blogInfo.published,
            type_id:blogInfo.type_id,
            tags:blogInfo.tags.toString()
        }
    })
}

export function blog_getList(query,pageNum,pageSize) {
    return request({
        url:'/blog/allList',
        method:'get',
        params:{
            query,
            pageNum,
            pageSize
        }
    })
}

export function blog_delete(id) {
    return request({
        url:'/blog/delete/'+id,
        method:'get'
    })
}

export function blog_status(id) {
    return request({
        url:'/blog/status',
        method:'put',
        params:{
            id
        }
    })
}

export function blog_getById(id) {
    return request({
        url:'/blog/get/'+id,
        method:'get'
    })
}

export function blog_update(blogInfo) {
    console.log(blogInfo);
    return request({
        url:'/blog/update',
        method:'post',
        params:{
            id: blogInfo.id,
        },
        data:{
            title:blogInfo.title,
            content:blogInfo.content,
            description:blogInfo.description,
            first_picture:blogInfo.first_picture,
            published:blogInfo.published,
            type_id:blogInfo.type_id,
            tags:blogInfo.tags.toString()
        }
    })
}

export function file_delete(fileName) {
    return request({
        url:'blog/file/delete',
        method:'post',
        params:{
            fileName
        }
    })

}