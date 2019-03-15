<template>
   <div class="upload-box">
     <div class="upload-showbox">
        <el-button
          size="mini"
          type="primary"
           @click="filesDialogVisible=true" >
            导入
        </el-button>
     </div>

    <el-dialog
    title="提示"
    :visible.sync="filesDialogVisible"
    center
    width="50%">
     <el-upload
        class="upload-demo"
        ref="filesupload"
        :action="filesuploadUrl"
         multiple
        :before-upload="beforeUpload"
        :limit="1"
        :on-exceed="handleFileExceed"
        :on-remove="handleRemove"
        :on-change="handelUploadChange"
        name="myFile"
        :on-success="handleEnclosureUploadSuccess"
        :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitEnclosureUpload"  v-if="fileList.length" >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls和xlsx文件,文件最大不能超过5M。<a :href="modelUrl" v-if="modelUrl" style="color: #409EFF;">下载模板</a></div>
      </el-upload>
   </el-dialog>

   </div>
</template>

<script>
export default {

    data(){
      return {
        localFileList:null,
        filesDialogVisible:false,
        fileList: []
      }
    },

    props: {

      //导入地址
      filesuploadUrl:{
        type:String,
        default:'/webApi/fileupload/common/filetoserver'
      },

      //模板地址
      modelUrl:{
        type:String,
        default:''
      }
    },



    methods:{

    //上传请求
    handleEnclosureUploadSuccess(res, file, fileList) {
        if (res.success) {
          this.$emit('uploadRes',res) //上传成功的回调
          this.$message({
            type:'success',
            message:'导入成功',
            duration:1000,
            onClose:()=>{
                this.filesDialogVisible=false;
                this.fileList=[]   
                this.$refs.filesupload.clearFiles();
            }})
        } else {
          this.$message({
            message:'导入失败',
            type: 'error'
          })
        }
    },

    beforeUpload(file) {
        if (file.size > 5000 * 1000) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
    },

    handleFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择上传 1 个文件`)
    },

    handleRemove(file, fileList) {
      this.fileList=fileList;
    },

    
    handelUploadChange(file, fileList) {
      this.fileList=fileList;
    },

     //上传到服务器
     submitEnclosureUpload() {
       this.$refs.filesupload.submit()
     },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-box{
    .upload-showbox{
      span{
        font-size: 12px;
      }
    }
  }
</style>
