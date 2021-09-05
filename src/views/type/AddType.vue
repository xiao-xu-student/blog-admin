<template>
    <div>
        <el-dialog
                title="添加分类"
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
            <el-button type="primary" @click="addType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {type_add} from "../../network/type";

    export default {
        name: "AddType",
        data(){
            return{
                dialogVisible: false,
                addForm:{
                    name:''
                },
                addFormRules:{
                    name:[{required: true,message:'请输入分类名',trigger:'blur'}]
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
            addType(){
                this.$refs.addFormRef.validate((valid)=> {
                    if (!valid) return
                    type_add(this.addForm.name).then(res=>{
                        if (res.msg==="success"){
                            this.$message.success("添加用户成功！")
                            this.$parent.getTypeList()
                        }else {
                            this.$message.error("添加失败！")
                            this.$parent.getTypeList()
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