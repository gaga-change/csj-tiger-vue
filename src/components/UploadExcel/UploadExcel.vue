<template>
  <div class="upload-box" :style="{display: 'inline-block'}">
    <div class="upload-showbox">
      <el-button
        size="mini"
        :type="type"
        @click="filesDialogVisible=true"
      >
        {{importText}}
      </el-button>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="filesDialogVisible"
      center
      :modal="false"
      width="50%"
    >
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
        :name="name"
        :on-success="handleEnclosureUploadSuccess"
        :auto-upload="false"
      >
        <el-button
          slot="trigger"
          size="mini"
          type="primary"
        >选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="mini"
          type="success"
          @click="submitEnclosureUpload"
          v-if="fileList.length"
          :loading="loading"
        >上传到服务器</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >只能上传xls和xlsx文件,文件最大不能超过5M。<a
            :href="modelUrl"
            v-if="modelUrl"
            style="color: #409EFF;"
          >下载模板</a></div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import { Notification } from 'element-ui'
export default {

  data() {
    return {
      localFileList: null,
      filesDialogVisible: false,
      fileList: [],
      loading: false,
    }
  },

  props: {
    importText: {
      type: String,
      default: '导入'
    },

    //导入地址
    filesuploadUrl: {
      type: String,
      default: ''
    },

    //模板地址
    modelUrl: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: 'myFile'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },



  methods: {

    //上传请求
    handleEnclosureUploadSuccess(res, file, fileList) {
      this.loading = false
      if (res.success) {
        this.$emit('uploadRes', res) //上传成功的回调
        this.$message({
          type: 'success',
          message: '导入成功',
          duration: 1000,
          onClose: () => {
            this.filesDialogVisible = false;
            this.fileList = []
            this.$refs.filesupload.clearFiles();
          }        })
      } else {
        Notification({
          title: '错误信息',
          message: res.errorMsg || '导入失败',
          type: 'error',
          duration: 5 * 1000,
          onClose: () => Promise.reject()
        })
        this.$refs.filesupload.clearFiles()
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
      this.fileList = fileList;
    },


    handelUploadChange(file, fileList) {
      this.fileList = fileList;
    },

    // 上传到服务器
    submitEnclosureUpload() {
      // if (this.fileList.length === this.$refs.filesupload.uploadFiles.length) {
      //   return this.$message('请重新选取文件！')
      // }
      this.loading = true
      this.$refs.filesupload.submit()
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-box {
  .upload-showbox {
    span {
      font-size: 12px;
    }
    display: inline-block;
  }
}
</style>
