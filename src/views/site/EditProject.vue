<template>
    <div>
        <el-dialog
                title="修改项目信息"
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
                <el-form-item label="地址" prop="url">
                    <el-input v-model="editForm.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="editForm.icon"></el-input>
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
    import {project_edit, project_getById} from "../../network/project";

    export default {
        name: "EditProject",
        data(){
            return{
                id:'',
                dialogVisible: false,
                editForm: {
                },
                editFormRules:{
                    name:[{required: true,message:'请输入名称',trigger:'blur'}],
                    url:[{required: true,message:'请输入地址',trigger:'blur'}],
                    icon:[{required: true,message:'请输入图标',trigger:'blur'}]
                }
            }
        },
        methods:{
            visible(){
                this.dialogVisible=true
            },
            getData(id){
                this.id=id
                project_getById(id).then(res=>{
                    this.editForm=res.data
                })
            },
            editDialogClose(){
                this.$refs.editFormRef.resetFields()
            },
            submitEdit(){
                this.$refs.editFormRef.validate((valid)=>{
                    if (!valid) return
                    project_edit(this.id,this.editForm.name,this.editForm.url,this.editForm.icon).then(res=>{
                        if (res.code==200){
                            this.$message.success("修改成功！")
                            this.$parent. getProjects()
                        }else {
                            this.$message.error("修改失败！")
                            this.$parent. getProjects()
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