<template>
    <div>
        <el-dialog
                title="添加朋友"
                :visible.sync="dialogVisible"
                width="50%"
                @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules"
                     ref="addFormRef" label-width="70px" >
                <el-form-item label="名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                <el-input v-model="addForm.avatar"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="网址" prop="website">
                <el-input v-model="addForm.website"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addLink">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {friend_add} from "../../network/link";

    export default {
        name: "AddLink",
        data(){
            return{
                dialogVisible: false,
                addForm:{
                    name:'',
                    avatar:'',
                    description:'',
                    website:''
                },
                addFormRules:{
                    name:[{required: true,message:'请输入名称',trigger:'blur'}],
                    avatar:[{required: true,message:'请输入头像地址',trigger:'blur'}],
                    description:[{required: true,message:'请输入描述',trigger:'blur'}],
                    website:[{required: true,message:'请输入网址',trigger:'blur'}]
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
            addLink(){
                this.$refs.addFormRef.validate((valid)=> {
                    if (!valid) return
                    friend_add(this.addForm.name,this.addForm.avatar,this.addForm.description,
                    this.addForm.website).then(res=>{
                        if (res.msg==="success"){
                            this.$message.success("添加用户成功！")
                            this.$parent.getFriend()
                        }else {
                            this.$message.error("添加失败！")
                            this.$parent.getFriend()
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