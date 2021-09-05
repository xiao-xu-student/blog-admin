<template>
    <div>
        <el-card>
            <el-form ref="siteForm" :model="siteForm"
                     :rules="siteFormRules" label-width="80px" :disabled="status">
                <el-form-item label="站点名称" prop="name">
                    <el-input type="text" v-model="siteForm.name"></el-input>
                </el-form-item>
                <el-form-item label="域名" prop="domain">
                    <el-input type="text" v-model="siteForm.domain"></el-input>
                </el-form-item>
                <el-form-item label="copyright" prop="copyright">
                    <el-input type="text" v-model="siteForm.copyright"></el-input>
                </el-form-item>
                <el-form-item label="备案号" prop="record">
                    <el-input type="text" v-model="siteForm.record"></el-input>
                </el-form-item>
                <el-form-item label="站点技术" prop="technology">
                    <el-input type="text" v-model="siteForm.technology"></el-input>
                </el-form-item>
                <el-form-item label="站点详情" prop="detail">
                    <el-input type="text" v-model="siteForm.detail"></el-input>
                </el-form-item>
            </el-form>
            <el-row :hidden="hiddenChange">
                <el-col :offset="10" :span="2">
                    <el-button type="primary" @click="changeStatus">修改</el-button>
                </el-col>
            </el-row>
            <el-row :hidden="hidden">
                <el-col :offset="9" :span="2">
                    <el-button type="primary" @click="updateSite">确认修改</el-button>
                </el-col>
                <el-col :offset="1" :span="2">
                    <el-button @click="cancel">取消</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {site_get, site_update} from "../../network/site";

    export default {
        name: "Site",
        data(){
            return{
                status: true,
                hiddenChange: false,
                hidden: true,
                siteForm:{
                },
                siteFormRules:{
                    name:[{required: true,message:'请输入站点名称',trigger:'blur'}],
                    domain:[{required: true,message:'请输入域名',trigger:'blur'}],
                    copyright:[{required: true,message:'请输入COPYRIGHT',trigger:'blur'}],
                    record:[{required: true,message:'请输入备案号',trigger:'blur'}],
                    technology:[{required: true,message:'请输入站点技术',trigger:'blur'}],
                    detail:[{required: true,message:'请输入站点详情',trigger:'blur'}]
                }
            }
        },
        created() {
            this.getSiteForm()
        },
        methods:{
            getSiteForm(){
                site_get().then(res=>{
                    this.siteForm=res.data
                    console.log(res);
                })
            },
            updateSite(){
                site_update(this.siteForm).then(res=>{
                    if (res.msg==='success'){
                        this.$message.success("修改成功！！")
                    }
                })
                let that=this
                setTimeout(function () {
                    that.getSiteForm()
                    that.status=true
                    that.hiddenChange=false
                    that.hidden=true
                },1000)


            },
            changeStatus(){
                this.status=false
                this.hiddenChange=true
                this.hidden=false
            },
            cancel(){
                this.status=true
                this.hiddenChange=false
                this.hidden=true
            }
        }
    }
</script>

<style scoped>

</style>