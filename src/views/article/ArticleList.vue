<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入标题" v-model="queryInfo.query" clearable @clear="getBlogList">
                    <el-button slot="append" icon="el-icon-search" @click="getBlogList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addBlog">添加文章</el-button>
            </el-col>
        </el-row>

        <el-table :data="blogList" border stripe>
            <el-table-column label="序号" type="index" :width="50"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" :width="200"></el-table-column>
            <el-table-column label="文章状态" prop="published" :width="100">
                <template v-slot="scope">
                    <el-tag :type="scope.row.published ?'success':'warning'">{{scope.row.published ?'发布':'草稿'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="editBlog(scope.row.id)">编辑</el-button>
                    <el-button :type="scope.row.published? 'warning':'success'" @click="editBlogStatue(scope.row.id)">{{scope.row.published ?'草稿':'发布'}}</el-button>
                    <el-button type="danger" @click="deleteBlog(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


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
</template>

<script>
    import {blog_delete, blog_getList, blog_status} from "../../network/editor";

    export default {
        name: "ArticleList",
        data(){
            return {
                queryInfo:{
                    query:'',
                    pageNum: 1,
                    pageSize: 3
                },
                blogList:[],
                total:0
            }
        },
        created() {
            this.getBlogList()
        },
        methods:{
            getBlogList(){
                blog_getList(this.queryInfo.query,this.queryInfo.pageNum,this.queryInfo.pageSize)
                .then(res=>{
                    this.total=res.data.total
                    this.blogList=res.data.records.map(item=>{
                        return{
                            id:item.id,
                            title:item.title,
                            published:item.published,
                            createTime: item.gmt_create
                        }
                    })
                })
            },
            addBlog(){
                let item={path:'/edit', name:'Editor', label:'编辑文章', icon:'el-icon-edit'}
                this.$store.commit('selectMenu',item)
                this.$router.push("/edit")
            },
            editBlog(id){
                let item={path:'/edit', name:'Editor', label:'编辑文章', icon:'el-icon-edit'}
                this.$store.commit('selectMenu',item)
                this.$router.push({name:"Editor",params:{ bid: id}})
            },
            editBlogStatue(id){
                blog_status(id).then(res=>{
                    if (res.msg==='success'){
                        this.$message.success("状态修改成功")
                        this.getBlogList()
                    }else{
                        this.$message.error("状态修改失败")
                    }
                })
            },
            deleteBlog(id){
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                blog_delete(id).then(res=>{
                    if (res.msg==='success'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getBlogList()
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
            handleSizeChange(newSize){
                this.queryInfo.pageSize=newSize
                this.getBlogList()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pageNum=newPage
                this.getBlogList()
            },
        }
    }
</script>

<style scoped>

</style>