<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click="addProject">添加项目</el-button>
                </el-col>
            </el-row>
            <el-table :data="projects" border stripe>
                <el-table-column label="序号" type="index" :width="50"></el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="地址" prop="url"></el-table-column>
                <el-table-column label="图标" prop="icon"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="primary" @click="editProject(scope.row.id)">编辑</el-button>
                        <el-button type="danger" @click="deleteProject(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <add-project ref="dialog"></add-project>
        <edit-project ref="editDialog"></edit-project>
    </div>

</template>

<script>
    import {project_delete, project_get} from "../../network/project";
    import AddProject from "./AddProject";
    import EditProject from "./EditProject";

    export default {
        name: "Dispose",
        components: {EditProject, AddProject},
        data(){
            return{
                projects:[]
            }
        },
        created() {
            this.getProjects()
        },
        methods:{
            getProjects(){
                project_get().then(res=>{
                    this.projects=res.data
                })
            },
            editProject(id){
                this.$refs.editDialog.getData(id)
                this.$refs.editDialog.visible()
            },
            deleteProject(id){
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    project_delete(id).then(res=>{
                        if (res.code==200){
                            this.$message.success("删除成功！")
                            this.getProjects()
                        }else {
                            this.$message.error("删除失败！")
                        }
                    })
                }).catch(() => {
                    this.$message.info("已取消删除")
                })
            },
            addProject(){
                this.$refs.dialog.visible()
            }

        }
    }
</script>

<style scoped>

</style>