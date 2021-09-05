<template>
    <div>
        <el-row>
            <el-col  :span="5">
                <el-card>
                    <div class="container">
                        <div class="image_container">
                            <img src="../../assets/images/view.png">
                        </div>
                        <div class="font_container">
                            <div class="font">阅读量</div>
                            <div class="number">{{allViews}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="5">
                <el-card>
                    <div class="container">
                        <div class="image_container">
                            <img src="../../assets/images/publish.png">
                        </div>
                        <div class="font_container">
                            <div class="font">发布文章</div>
                            <div class="number">{{publishNum}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="5">
                <el-card>
                    <div class="container">
                        <div class="image_container">
                            <img src="../../assets/images/draft.png">
                        </div>
                        <div class="font_container">
                            <div class="font">草稿箱</div>
                            <div class="number">{{draftNum}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="5">
                <el-card>
                    <div class="container">
                        <div class="image_container">
                            <img src="../../assets/images/user.png">
                        </div>
                        <div class="font_container">
                            <div class="font" >用户数</div>
                            <div class="number">{{userNum}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {AllViews_get, DraftNum_get, PublishNum_get, UserNum_get} from "../../network/home";

    export default {
        name: "TopInformation",data(){
            return{
                allViews:0,
                publishNum:0,
                draftNum:0,
                userNum:0
            }
        },
        created() {
            this.getAllViews()
            this.getPublishNum()
            this.getDraftNum()
            this.getUserNum()
        },
        methods:{
            getAllViews(){
                AllViews_get().then(res=>{
                    this.allViews=res.data;
                })
            },
            getPublishNum(){
                PublishNum_get().then(res=>{
                    this.publishNum=res.data
                })
            },
            getDraftNum(){
                DraftNum_get().then(res=>{
                    this.draftNum=res.data
                })
            },
            getUserNum(){
                UserNum_get().then(res=>{
                    this.userNum=res.data
                })
            }
        }
    }
</script>

<style scoped>
    .el-card{
        height: 100px;
    }
    .container{
        display: flex;
        flex-direction: row;
        width: 100%;
        box-shadow: 1px #cccccc;
    }
    .image_container{
        width: 50%;
    }
    .font_container{
        display: block;
        width: 50%;
    }
    .font{
        font-size: 16px;
        color: #cccccc;
    }
    .number{
        margin-top: 5px;
    }
</style>