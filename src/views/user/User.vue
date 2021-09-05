<template>
    <div>
        <!--卡片视图-->
        <el-card>
            <!--搜索和添加-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>
            <!--用户列表区域-->
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
                        <el-button type="warning" icon="el-icon-setting" @click="editPass(scope.row.id)"></el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--分页区-->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>

        </el-card>

        <!--添加用户-->
        <add-user ref="dialog"></add-user>
        <!--修改用户-->
        <edit-user ref="editDialog"></edit-user>
        <!--修改密码-->
        <edit-password ref="editPassDialog"></edit-password>
    </div>
</template>

<script>
    import {user_delete, user_request} from "../../network/user";
    import AddUser from "./AddUser";
    import EditUser from "./EditUser";
    import EditPassword from "./EditPassword";

    export default {
        name: "User",
        components: {EditPassword, EditUser, AddUser},
        data(){
            return{
                queryInfo:{
                    query:'',
                    pageNum: 1,
                    pageSize: 3
                },
                userList:[],
                total: 0
            }
        },
        created() {
            this.getUserList()
        },
        methods:{
            getUserList(){
                user_request(this.queryInfo.query,this.queryInfo.pageNum,this.queryInfo.pageSize)
                    .then(res=>{
                        this.total=res.users.total
                        this.userList=res.users.records
                })
            },
            handleSizeChange(newSize){
                this.queryInfo.pageSize=newSize
                this.getUserList()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pageNum=newPage
                this.getUserList()
            },
            addUser(){
                this.$refs.dialog.visible()
            },
            showEditDialog(id){
                this.$refs.editDialog.getData(id)
                this.$refs.editDialog.visible()
            },
            removeUserById(id){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    user_delete(id).then(res=>{
                        if (res.msg==='success'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getUserList()
                        }else {
                            this.$message.error("删除失败！")
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            editPass(id){
                this.$refs.editPassDialog.getId(id)
                this.$refs.editPassDialog.visible()
            }
        }
    }
</script>

<style scoped>

</style>