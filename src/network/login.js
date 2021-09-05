import {request} from "./request";

export function login_request(username,password) {
  return  request({
        url:'/login',
        method: "post",
        params:{
            username,
            password
        }
    })
}

