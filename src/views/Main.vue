<template>
    <el-container class="home-container">

        <!--左侧侧边栏-->
        <aside-menu :isCollapse="isCollapse"></aside-menu>

        <el-container>
            <!--头部区域-->
            <el-header>
                <div class="toggle_button">
                    <div>
                        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleCollapse"></i>
                    </div>
                    <div class="breadcrumb">
                        <!--面包屑-->
                        <el-breadcrumb separator-class="el-icon-arrow-right" >

                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>

                            <el-breadcrumb-item :to="current.path" v-if="current" >{{current.label}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>

                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <common-tab></common-tab>
            <!--右侧主体内容-->
            <el-main>
                    <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import AsideMenu from "../components/AsideMenu";
    import CommonTab from "../components/CommonTab";
    import {mapState} from "vuex";
    import {delCookie} from "../utils/cookie";
    export default {
        name: "Main",
        components: {CommonTab, AsideMenu},
        computed:{
            ...mapState({
                current: state => state.tab.currentMenu
            })

        },
        data(){
            return {
                isCollapse: false,
                exclude:"Home"
            }
        },
        methods:{
            logout(){
                delCookie('token')
                this.$router.push('/login')
            },
            //点击按钮，切换菜单折叠和展开
            toggleCollapse(){
                this.isCollapse= !this.isCollapse
            }
        }
    }
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: 20px;
    }
    .toggle_button{
        width: 80%;
        font-size: 20px;
        line-height: 40px;
        color:#595959;
        text-align: left;
        display: flex;
        align-items: center;
        float:left;
        padding-left: 20px;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #EAEDF1;
    }
    i{
        cursor: pointer;
    }

    .breadcrumb{
        margin-left: 20px;
        margin-top: 12px;
    }

</style>