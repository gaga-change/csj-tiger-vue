<template>
   <div class="upload-box">
     <div class="upload-showbox">
        <el-button
          size="mini"
          type="primary"
           @click="filesDialogVisible=true" >
          {{localFileList.length ? '继续上传' : '上传附件'}}
        </el-button>
        <span v-show="localFileList.length">{{localFileList.length}}个文件</span>
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
        :file-list="defailFileList"
        multiple
        :before-upload="beforeUpload"
        :limit="10"
        :on-exceed="handleFileExceed"
        :on-remove="handleRemove"
        :on-change="handelUploadChange"
        name="myFile"
        :on-success="handleEnclosureUploadSuccess"
        :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitEnclosureUpload"  v-if="displayBtn" >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">文件最大不能超过5M。 </div>
      </el-upload>
   </el-dialog>

   </div>
</template>

<script>
export default {

    data(){
      return {
        localFileList:[],
        displayBtn:false,
        filesDialogVisible:false,
      }
    },

    props: {
      defailFileList:{
        type:Array,
        default:()=>[]
      },

      filesuploadUrl:{
        type:String,
        default:'/webApi/fileupload/common/filetoserver'
      }
    },

    mounted(){
      if(this.defailFileList.length){
        this.localFileList=this.defailFileList;
      }
    },

    methods:{

    beforeUpload(file) {
        if (file.size > 5000 * 1000) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
    },

    handleFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择上传 10 个文件`)
    },

    handleRemove(file, fileList) {
      this.formatterLocalFileList(fileList)
    },

    handelUploadChange(file, fileList) {
      if(fileList.some(v=>v.status&&v.status!=='success')){
        this.displayBtn=true;
      } else{
        this.displayBtn=false;
      }
    },

    formatterLocalFileList(fileList){
      let arr=[];
      if(Array.isArray(fileList)){
            fileList.forEach(item=>{
              if(item.response&&item.response.code&&item.response.code==='200'){
                if(item.response.data&&item.response.data.desc&&item.response.data.desc.includes('成功')){
                  let json={};
                  json.name=item.name;
                  json.url=item.response.data.filePath;
                  arr.push(json)
                }
              } else{
                if(item.status==='success'&&item.url&&item.name){
                  let oldJson={};
                  oldJson.name=item.name;
                  oldJson.url=item.url;
                  arr.push(oldJson)
                }
              }
            })
          }
      this.localFileList=arr;
      this.$emit('fileListChange',this.localFileList)
    },


    handleEnclosureUploadSuccess(res, file, fileList) {
        if (res.code === '200') {
          this.formatterLocalFileList(fileList)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
    },

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

