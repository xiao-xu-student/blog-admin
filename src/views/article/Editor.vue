<template>
<div>

        <el-row>
            <el-input v-model="blogInfo.title" placeholder="标题"></el-input>
        </el-row>

        <el-row>
            <mavon-editor ref="md" class="markdown_editor" v-model="blogInfo.content" @imgAdd="$imgAdd"/>
        </el-row>

        <el-row>
            <el-col :offset="1" :span="7">
                <el-upload
                        action="http://localhost:8888/admin/blog/file/upload"
                        name="image"
                        :headers="header"
                        :on-remove="handleRemove"
                        :on-success="handle_success"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <div class="input-suffix">
                        首图上传:
                    </div>
                    <el-button class="upload_button" size="medium" type="primary">点击上传</el-button>
                </el-upload>
            </el-col>
            <el-col :offset="1" :span="7">
                <div class="input-suffix">
                    文章类型:
                </div>
                <el-select v-model="blogInfo.type_id" placeholder="请选择">
                    <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :offset="2" :span="6">
                <div class="input-suffix">
                    文章标签:
                </div>
                <el-select v-model="blogInfo.tags" multiple collapse-tags placeholder="请选择">
                    <el-option
                            v-for="item in tags"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-input type="textarea" v-model="blogInfo.description" placeholder="请输入文章摘要"
                      rows="5"  maxlength="200" show-word-limit>
            </el-input>
        </el-row>

        <el-row>
            <el-col :span="5" :offset="19">
                <el-button type="info" @click="cancel">取消</el-button>
                <el-button type="success" @click="submitArticle(0)">保存</el-button>
                <el-button type="primary" @click="submitArticle(1)">发布</el-button>
            </el-col>
        </el-row>

</div>


</template>

<script>
    import {blog_getById, blog_submit, blog_update, file_delete, upload_picture} from "../../network/editor";
    import {type_all} from "../../network/type";
    import {tag_all} from "../../network/tag";
    import {getCookie} from "../../utils/cookie";

    export default {
        name: "editor",
        data(){
            return{
                blog_id:null,
                types:[],
                tags:[],
                fileList:[],
                header:{Authorization:getCookie('token')},
                blogInfo:{}
            }
        },
        created() {
            this.getTypeList()
            this.getTagList()
            this.getParams()
        },
        mounted() {
           if (this.blog_id!=null){
               blog_getById(this.blog_id).then(res=>{
                   if (res.msg==='success'){
                       this.blogInfo=res.data
                       this.fileList.push({name:'picture',url:res.data.first_picture})
                   }
               })
           }
        },
        methods:{
            getParams(){
                let routerParams=this.$route.params.bid
                this.blog_id=routerParams
            },
            $imgAdd(pos,$file){
                let formData= new FormData();
                formData.append('image',$file)
                upload_picture(formData).then(res=>{
                    this.$refs.md.$img2Url(pos, res.url);
                })
            },
            getTypeList(){
                type_all().then(res=>{
                    this.types=res.data.map(item=>{
                        return{
                            value:item.id,
                            label:item.name
                        }
                    })
                })
            },
            getTagList(){
                tag_all().then(res=>{
                    this.tags=res.data.map(item=>{
                        return{
                            value:item.id,
                            label:item.name
                        }
                    })
                })
            },
            handleRemove(file, fileList) {
                file_delete(this.blogInfo.first_picture).then(res=>{
                    console.log(res);
                })
                this.blogInfo.first_picture=null
                console.log(file, fileList);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handle_success(res){
                this.blogInfo.first_picture=res.url
                this.$message.success("上传成功！");
            },
            submitArticle(published){
                this.blogInfo.published=published
                if (this.blog_id==null){
                    blog_submit(this.blogInfo).then(res=>{
                        console.log(this.blogInfo);
                        if (res.msg==='success'){
                            this.$message.success("上传成功！")
                            this.$router.push('/list')
                        }else{
                            this.$message.error("上传数据不完整，上传失败！")
                        }
                    })
                }else {
                    this.blogInfo.id=this.blog_id
                    blog_update(this.blogInfo).then(res=>{
                        if (res.msg==='success'){
                            this.$message.success("修改成功")
                            this.$router.push('/list')
                        }else{
                            this.$message.error("上传数据不完整，修改失败！")
                        }
                    })
                }
            },
            cancel(){
                this.blogInfo={}
                this.fileList=[]
            }
        }
    }
</script>

<style scoped>
    .markdown_editor{
        height: 635px;
    }
    .el-row{
        margin-bottom: 20px;
    }
    .input-suffix{
        display: inline-block;
        margin-right: 10px;
    }
    .upload_button{
        width: 110px;
        height: 40px;
    }
</style>