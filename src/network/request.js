import axios from 'axios'
import {Message} from "element-ui";
import {getCookie} from "../utils/cookie";

axios.defaults.withCredentials=true //允许携带cookie

export function request(config){

    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'https://www.xuhbin.cn/admin',
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(function (config) {
        //为请求头对象，添加Token验证的Authorization字段
        config.headers.Authorization = getCookie('token')
        return config
    }, err => {
        console.log(err);
    })


    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        if (res.data.code===403){
            window.location='/login'
            Message.error({
                message:'身份已过期，请重新登录！！！',
                duration: 3000
            })
            console.log(res.data.msg);
        }
        return res.data
    }, err => {
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}