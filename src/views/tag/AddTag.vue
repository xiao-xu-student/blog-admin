<template>
    <div>
        <el-dialog
        title="添加标签"
        :visible.sync="dialogVisible"
        width="50%"
        @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules"
                     ref="addFormRef" label-width="70px" >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTag">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {tag_add} from "../../network/tag";

    export default {
        name: "AddTag",
        data(){
            return{
                dialogVisible: false,
                addForm:{
                    name:''
                },
                addFormRules:{
                    name:[{required: true,message:'请输入标签名',trigger:'blur'}]
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
            addTag(){
                this.$refs.addFormRef.validate((valid)=> {
                    if (!valid) return
                    tag_add(this.addForm.name).then(res=>{
                        if (res.msg==="success"){
                            this.$message.success("添加用户成功！")
                            this.$parent.getTagList()
                        }else{
                            this.$message.error("添加失败！")
                            this.$parent.getTagList()
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