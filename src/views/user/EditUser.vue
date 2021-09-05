<template>
    <div>
        <el-dialog
                title="修改用户信息"
                :visible.sync="dialogVisible"
                width="50%"
                @close="editDialogClose"
        >
            <!--主体区域-->
            <el-form :model="editForm" :rules="editFormRules"
                     ref="editFormRef" label-width="70px" >
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {user_edit, user_getById} from "../../network/user";

    export default {
        name: "EditUser",
        data(){
            return{
                id:'',
                dialogVisible: false,
                editForm: {
                },
                editFormRules:{
                    username:[{required: true,message:'请输入用户名',trigger:'blur'},
                        {min: 1, max: 10, message: '用户名的长度在6~15个字符之间',trigger: 'blur'}],
                    email:[{required: true,message:'请输入邮箱',trigger:'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
                }
            }
        },
        methods:{
            visible(){
                this.dialogVisible=true
            },
            getData(id){
                this.id=id
                user_getById(id).then(res=>{
                    console.log(res);
                    this.editForm=res.user
                })
            },
            submitEdit(){
                this.$refs.editFormRef.validate((valid)=>{
                    if (!valid) return
                    user_edit(this.id,this.editForm.username,this.editForm.email).then(res=>{
                        if (res.msg==='success'){
                            this.$message.success("修改成功！")
                            this.$parent.getUserList()
                        }else {
                            this.$message.error("修改失败！")
                            this.$parent.getUserList()
                        }
                    })
                    this.dialogVisible=false
                })
            },
            editDialogClose(){
                this.$refs.editFormRef.resetFields()
            }

        }
    }
</script>

<style scoped>

</style>