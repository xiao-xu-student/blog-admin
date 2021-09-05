<template>
    <div>
        <el-dialog
                title="修改用户密码"
                :visible.sync="dialogVisible"
                width="50%"
                @close="editDialogClose"
        >
            <!--主体区域-->
            <el-form :model="ruleForm" :rules="rules"
                     ref="editFormRef" label-width="70px" >
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
    import {user_editPass} from "../../network/user";

    export default {
        name: "EditPassword",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.editFormRef.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                id:'',
                dialogVisible: false,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },

        methods:{
            visible(){
                this.dialogVisible=true
            },
            getId(id){
                this.id=id
            },
            submitEdit(){
                this.$refs.editFormRef.validate((valid)=>{
                        if (!valid) return
                    user_editPass(this.id,this.ruleForm.pass).then(res=>{
                        if (res.msg==='success'){
                            this.$message.success("修改成功！")
                        }else {
                            this.$message.error("修改失败！")
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