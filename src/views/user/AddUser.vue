<template>
    <div>
        <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                width="50%"
                @close="addDialogClosed"
                >
            <!--主体区域-->
            <el-form :model="addForm" :rules="addFormRules"
                ref="addFormRef" label-width="70px" >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {user_add, user_checkUser} from "../../network/user";

    export default {
        name: "AddUser",
        data(){
            let checkUser=(rule,value,callback)=>{
                if (!value){
                    return callback(new Error("请输入用户名"))
                }else{
                    setTimeout(()=>{
                        user_checkUser(this.addForm.username).then(res=>{
                           if (res.exist){
                             return callback(new Error("该用户名已存在"))
                           }else {
                             callback()
                           }
                        })
                    },500)
                }
            }
            return{
                dialogVisible: false,
                addForm: {
                    username: '',
                    password: '',
                    email: ''
                },
                addFormRules:{
                    username:[{required: true,validator:checkUser,trigger: 'blur'},
                        {min: 3, max: 10, message: '用户名的长度在3~10个字符之间',trigger: 'blur'}],
                    password:[{required: true,message:'请输入密码',trigger:'blur'},
                        {min: 6, max: 15, message: '密码的长度在6~15个字符之间',trigger: 'blur'}],
                    email:[{required: true,message:'请输入邮箱',trigger:'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
                }

            }
        },
        methods:{
            visible(){
                this.dialogVisible=true
            },
            addDialogClosed(){
                this.$refs.addFormRef.resetFields()
            },
            addUser(){
                this.$refs.addFormRef.validate((valid)=>{
                    if (!valid) return
                    user_add(this.addForm).then(res=>{
                        if (res.msg==="success"){
                            this.$message.success("添加用户成功！")
                            this.$parent.getUserList()
                        }else {
                            this.$message.error("添加失败！")
                            this.$parent.getUserList()
                        }
                    })
                    this.dialogVisible=false
                })
            }
        }
    }
</script>

<style scoped>

</style>