<template>
    <div>
        <el-card>
            <!--搜索和添加-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入标签" v-model="queryInfo.query" clearable @clear="getTagList">
                        <el-button slot="append" icon="el-icon-search" @click="getTagList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addTag">添加标签</el-button>
                </el-col>
            </el-row>

            <!--用户列表区域-->
            <el-table :data="tagList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="标签名称" prop="name"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template v-slot="scope" >
                        <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id,scope.row.name)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="removeTagById(scope.row.id)"></el-button>
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

        <!--添加标签-->
        <add-tag ref="dialog"></add-tag>
        <!--修改标签-->
        <edit-tag ref="editDialog"></edit-tag>
    </div>
</template>

<script>
    import {tag_delete, tag_request} from "../../network/tag";
    import AddTag from "./AddTag";
    import EditTag from "./EditTag";

    export default {
        name: "Tag",
        components: {EditTag, AddTag},
        data(){
            return{
                queryInfo:{
                    query:'',
                    pageNum: 1,
                    pageSize: 3
                },
                tagList:[],
                total: 0
            }
        },
        created() {
            this.getTagList()
        },
        methods:{
            getTagList(){
                tag_request(this.queryInfo.query,this.queryInfo.pageNum,this.queryInfo.pageSize)
                    .then(res=>{
                        this.total=res.tags.total
                        this.tagList=res.tags.records
                        console.log(res);
                    })
            },
            handleSizeChange(newSize){
                this.queryInfo.pageSize=newSize
                this.getTagList()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pageNum=newPage
                this.getTagList()
            },
            addTag(){
                this.$refs.dialog.visible()
            },
            showEditDialog(id,name){
                this.$refs.editDialog.getData(id,name)
                this.$refs.editDialog.visible()
            },
            removeTagById(id){
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    tag_delete(id).then(res=>{
                        if (res.msg==='success'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getTagList()
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
            }

        }
    }
</script>

<style scoped>

</style>