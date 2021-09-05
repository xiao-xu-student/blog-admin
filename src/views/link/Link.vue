<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入名称" v-model="queryInfo.query" clearable @clear="getFriend">
                        <el-button slot="append" icon="el-icon-search" @click="getFriend"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addFriend">添加朋友</el-button>
                </el-col>
            </el-row>

            <el-table :data="friendList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="名称" prop="name" width="200"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="网址" prop="website"></el-table-column>
                <el-table-column label="状态" prop="status" width="100">
                    <template v-slot="scope">
                    <el-tag :type="scope.row.status==1 ?'success':(scope.row.status==2?'warning':'danger')">
                        {{scope.row.status==1 ?'已开启':(scope.row.status==2?'待审核':'未开启')}}
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template v-slot="scope">
                        <el-button  type="primary" @click="editFriend(scope.row.id,scope.row.name,
                        scope.row.avatar,scope.row.description,scope.row.website)">编辑</el-button>
                        <el-button type="warning" @click="editFriendStatus(scope.row.id)">
                            {{scope.row.status==1 ?'关闭':'开启'}}</el-button>
                        <el-button  type="danger" @click="deleteFriend(scope.row.id)">删除</el-button>
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

        <add-link ref="dialog"></add-link>
        <edit-link ref="editDialog"></edit-link>
    </div>
</template>

<script>
    import {friend_delete, friend_editStatus, friend_get} from "../../network/link";
    import AddLink from "./AddLink";
    import EditLink from "./EditLink";

    export default {
        name: "Link",
        components: {EditLink, AddLink},
        data(){
            return{
                queryInfo:{
                    query:'',
                    pageNum: 1,
                    pageSize: 3
                },
                friendList:[],
                total:0
            }
        },
        created() {
            this.getFriend()
        },
        methods:{
            getFriend(){
                friend_get(this.queryInfo.query,this.queryInfo.pageNum,this.queryInfo.pageSize).then(res=>{
                    this.total=res.data.total
                    this.friendList=res.data.records
                })
            },
            handleSizeChange(newSize){
                this.queryInfo.pageSize=newSize
                this.getFriend()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pageNum=newPage
               this.getFriend()
            },
            addFriend(){
                this.$refs.dialog.visible()
            },
            editFriend(id,name,avatar,description,website){
                this.$refs.editDialog.getData(id,name,avatar,description,website)
                this.$refs.editDialog.visible()
            },
            deleteFriend(id){
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    friend_delete(id).then(res=>{
                       if (res.msg==="success"){
                           this.$message.success("删除成功！")
                           this.getFriend()
                       }else{
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
            editFriendStatus(id){
               friend_editStatus(id).then(res=>{
                   if (res.code==200){
                       this.$message.success("修改成功！")
                   }else {
                       this.$message.error("修改失败！")
                   }
                   this.getFriend()
               })
            }
        }
    }
</script>

<style scoped>

</style>