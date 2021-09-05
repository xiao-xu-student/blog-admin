<template>
    <el-aside :width="isCollapse ? '64px': '200px'">

        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 unique-opened router
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :default-active="$route.path">

            <h3 v-show="isCollapse">博客</h3>
            <h3 v-show="!isCollapse">博客后台管理系统</h3>

            <el-menu-item :index="item.path" v-for="item in noChildren"
                          :key="item.path" @click="clickMenu(item)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children"
                                  :key="subIndex" @click="clickMenu(subItem)">
                        <i :class="subItem.icon"></i>
                        <span slot="title">{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "AsideMenu",
        props:['isCollapse'],
        computed:{
          noChildren(){
              return this.menu.filter(item => !item.children)
          },
          hasChildren(){
              return this.menu.filter(item => item.children)
          }
        },
        data(){
            return{
                menu:[
                    {
                        path:'/home',
                        name: 'Home',
                        label:'首页',
                        icon:'el-icon-s-home'
                    },
                    {
                        label: '文章管理',
                        icon:'el-icon-document',
                        children:[
                            {
                                path:'/edit',
                                name:'Editor',
                                label:'编辑文章',
                                icon:'el-icon-edit'
                            },
                            {
                                path:'/list',
                                name:'ArticleList',
                                label:'文章列表',
                                icon:'el-icon-tickets'
                            }
                        ]
                    },
                    {
                        path:'/types',
                        name: 'Type',
                        label: '分类管理',
                        icon: 'el-icon-menu'
                    },
                    {
                        path:'/tags',
                        name: 'Tag',
                        label: '标签管理',
                        icon: 'el-icon-collection-tag'
                    },
                    {
                        path:'/link',
                        name: 'Link',
                        label: '友链管理',
                        icon: 'el-icon-share'
                    },
                    {
                        label: '用户列表',
                        icon:'el-icon-document',
                        children:[
                            {
                                path:'/user',
                                name:'User',
                                label:'用户信息',
                                icon:'el-icon-edit'
                            },
                            {
                                path:'/statue',
                                name:'Statue',
                                label:'用户状态',
                                icon:'el-icon-tickets'
                            }
                        ]
                    },
                    {
                        label: '系统配置',
                        icon:'el-icon-s-tools',
                        children:[
                            {
                                path:'/site',
                                name:'Site',
                                label:'站点管理',
                                icon:'el-icon-edit-outline'
                            },
                            {
                                path:'/dispose',
                                name:'Dispose',
                                label:'配置管理',
                                icon:'el-icon-s-order'
                            }
                        ]
                    }

                ]
            }
        },
        methods:{
            clickMenu(item){
                this.$store.commit('selectMenu', item)
                this.$router.push({name: item.name})
            }
        }
    }
</script>

<style scoped>
    .el-menu{
        border-right: none;
    }
    .toggle-button{
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    h3 {
        color: #ffffff;
        text-align: center;
        line-height: 25px;
    }
</style>