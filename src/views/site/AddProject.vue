<template>
    <div>
        <el-dialog
                title="添加项目"
                :visible.sync="dialogVisible"
                width="50%"
                @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules"  ref="addFormRef" label-width="70px" >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="url">
                    <el-input v-model="addForm.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="addForm.icon"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProject">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {project_add} from "../../network/project";

    export default {
        name: "AddProject",
        data(){
            return{
                dialogVisible: false,
                addForm: {
                    name: '',
                    url: '',
                    icon: ''
                },
                addFormRules:{
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
            addDialogClosed(){
                this.$refs.addFormRef.resetFields()
            },
            addProject(){
                this.$refs.addFormRef.validate((valid)=>{
                    if (!valid) return
                    project_add(this.addForm).then(res=>{
                        if (res.code==200){
                            this.$message.success("添加项目成功！")
                            this.$parent. getProjects()
                        }else {
                            this.$message.error("添加失败！")
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