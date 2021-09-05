//获取cookie、
export function getCookie(name) {
    let v = window.document.cookie.match('(^|;) ?' + name+ '=([^;]*)(;|$)');
    return v ? v[2] : null
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expire_days) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expire_days);
    document.cookie = c_name + "=" + escape(value) + ((expire_days == null) ? "" : ";expires=" + exdate.toGMTString());
}

//删除cookie
export function delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cookie_val = getCookie(name);
    if (cookie_val != null)
        document.cookie = name + "=" + cookie_val + ";expires=" + exp.toGMTString();
}