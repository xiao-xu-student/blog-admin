import {request} from "./request";

export function site_get() {
    return request({
        url:'/get/site',
        method:'get'
    })
}

export function site_update(site) {
    return request({
        url:'/update/site',
        method:'post',
        data:{
            name:site.name,
            domain:site.domain,
            copyright:site.copyright,
            technology:site.technology,
            detail:site.detail,
            record:site.record
        }
    })
}