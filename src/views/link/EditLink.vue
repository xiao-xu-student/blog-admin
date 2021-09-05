<template>
    <div>
        <el-dialog
                title="修改标签信息"
                :visible.sync="dialogVisible"
                width="50%"
                @close="editDialogClose"
        >
            <!--主体区域-->
            <el-form :model="editForm" :rules="editFormRules"
                     ref="editFormRef" label-width="70px" >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <el-input v-model="editForm.avatar"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="网址" prop="website">
                    <el-input v-model="editForm.website"></el-input>
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
    import {friend_edit} from "../../network/link";

    export default {
        name: "EditLink",
        data(){
            return{
                id:'',
                dialogVisible: false,
                editForm: {
                    name:'',
                    avatar:'',
                    description:'',
                    website:''
                },
                editFormRules:{
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
            getData(id,name,avatar,description,website){
                this.id=id;
                this.editForm.name=name
                this.editForm.avatar=avatar
                this.editForm.description=description
                this.editForm.website=website
            },
            submitEdit(){
                this.$refs.editFormRef.validate((valid)=>{
                    if (!valid) return
                    friend_edit(this.id,this.editForm.name,this.editForm.avatar,
                    this.editForm.description,this.editForm.website).then(res=>{
                        if (res.msg==='success'){
                            this.$message.success("修改成功！")
                            this.$parent.getFriend()
                        }else {
                            this.$message.error("修改失败！")
                            this.$parent.getFriend()
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