<template>
    <div>
        <el-card>
            <!--搜索和添加-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入标签" v-model="queryInfo.query" clearable @clear="getTypeList">
                        <el-button slot="append" icon="el-icon-search" @click="getTypeList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addType">添加标签</el-button>
                </el-col>
            </el-row>

            <!--用户列表区域-->
            <el-table :data="typeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="标签名称" prop="name"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template v-slot="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id,scope.row.name)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="removeTypeById(scope.row.id)"></el-button>
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
        <add-type ref="dialog"></add-type>
        <!--修改标签-->
        <edit-type ref="editDialog"></edit-type>
    </div>
</template>

<script>
    import EditType from "./EditType";
    import AddType from "./AddType";
    import {type_delete, type_request} from "../../network/type";
    export default {
        name: "Type",
        components: {AddType, EditType},
        data(){
            return{
                queryInfo:{
                    query:'',
                    pageNum: 1,
                    pageSize: 3
                },
                typeList:[],
                total: 0
            }
        },
        created() {
            this.getTypeList()
        },
        methods:{
            getTypeList(){
                type_request(this.queryInfo.query,this.queryInfo.pageNum,this.queryInfo.pageSize)
                    .then(res=>{
                        this.total=res.types.total
                        this.typeList=res.types.records
                        //console.log(res);
                    })
            },
            handleSizeChange(newSize){
                this.queryInfo.pageSize=newSize
                this.getTypeList()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pageNum=newPage
                this.getTypeList()
            },
            addType(){
                this.$refs.dialog.visible()
            },
            showEditDialog(id,name){
                this.$refs.editDialog.getData(id,name)
                this.$refs.editDialog.visible()
            },
            removeTypeById(id){
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    type_delete(id).then(res=>{
                        if (res.msg==='success'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getTypeList()
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