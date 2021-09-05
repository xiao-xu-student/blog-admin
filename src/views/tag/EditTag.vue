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
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
         </span>
        </el-dialog>
    </div>
</template>

<script>
    import {tag_edit} from "../../network/tag";

    export default {
        name: "EditTag",
        data(){
            return{
                id:'',
                dialogVisible: false,
                editForm: {
                    name:''
                },
                editFormRules:{
                    name:[{required: true,message:'请输入标签名',trigger:'blur'}]
                }
            }
        },
        methods:{
            visible(){
                this.dialogVisible=true
            },
            getData(id,name){
                this.id=id;
                this.editForm.name=name
            },
            submitEdit(){
                this.$refs.editFormRef.validate((valid)=>{
                    if (!valid) return
                    tag_edit(this.id,this.editForm.name).then(res=>{
                        if (res.msg==='success'){
                            this.$message.success("修改成功！")
                            this.$parent.getTagList()
                        }else {
                            this.$message.error("修改失败！")
                            this.$parent.getTagList()
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