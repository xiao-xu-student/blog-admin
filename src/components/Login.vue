<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域-->
            <div class="avatar_box">
                <img src="../assets/images/icon_touxiang.jpg" alt="">
            </div>
            <!--登入表单区域-->
            <el-form ref="loginFormRef"  class="login_form" :model="loginForm" :rules="loginFormRules">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!--按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginFrom">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import {login_request} from "../network/login";
    import {setCookie} from "../utils/cookie";

    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'',
                    password:''
                },
                loginFormRules:{
                    username:[
                        {required: true, message:'请输入用户名',trigger:'blur'}
                    ],
                    password:[
                        {required: true, message:'请输入密码',trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            resetLoginFrom(){
                this.$refs.loginFormRef.resetFields();
            },
            login(){
                let username=this.loginForm.username;
                let password=this.loginForm.password;
                this.$refs.loginFormRef.validate(valid=>{
                    if (!valid) return;
                    login_request(username,password).then(res=>{
                      if (res.msg==='success'){
                          console.log("登录成功");
                          setCookie("token",res.data.token,15)
                          this.$router.push('/main')
                          this.$message.success("登陆成功")
                      }else {
                          console.log(res);
                          console.log("登录失败");
                          this.$message.error("用户名或密码错误")
                      }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .login_container{
    background: #2b4b6b;
    height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
    }
    .avatar_box{
        height: 130px;
        width: 130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding: 8px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #ffffff;
    }
    .avatar_box img{
        height: 130px;
        width: 130px;
        border-radius: 50%;
        background: #eee;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>