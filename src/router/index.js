import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from "../components/Login";
import Main from "../views/Main";
import Home from "../views/home/Home";
import Editor from "../views/article/Editor";
import User from "../views/user/User";
import Tag from "../views/tag/Tag";
import Type from "../views/type/Type";
import Link from "../views/link/Link";
import ArticleList from "../views/article/ArticleList";
import Site from "../views/site/Site";
import Statue from "../views/user/Statue";
import Dispose from "../views/site/Dispose";
import {getCookie} from "../utils/cookie";

Vue.use(VueRouter)

const routes=[
    {
        path: '/',
        redirect:'/main'
    },
    {
        path:'/login',
        component: Login
    },
    {
        path: '/main',
        component: Main,
        redirect: '/home',
        children:[
            { path:'/home',name:'Home',component: Home},
            { path: '/edit',name:'Editor', component: Editor},
            { path: '/user',name:'User', component: User},
            { path: '/tags',name:'Tag',component: Tag},
            { path: '/types',name:'Type',component: Type},
            { path: '/link',name:'Link',component: Link},
            {path:'/list', name:'ArticleList',component: ArticleList},
            {path: '/site',name: 'Site',component: Site},
            {path:'/statue',name: 'Statue',component: Statue},
            {path: '/dispose',name: 'Dispose',component: Dispose}
        ]
    }
]

const router=new VueRouter({
    routes,
    mode: 'history'
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    if (to.path === '/login') return next()
    const tokenStr =getCookie('token')
    if (!tokenStr) return next('/login')
    next()
})

//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router