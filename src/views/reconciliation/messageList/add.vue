<template>
  <div>
    <el-form
      :model="addForm"
      ref="addForm"
      label-width="120px"
    >
      <item-title text="基本信息" />
      <el-form-item
        label="标题："
        prop="messageTitle"
        :rules="[{ required: true, message: '必填'}]"
      >
        <el-input
          type="text"
          v-model="addForm.messageTitle"
          style="width:400px;"
          placeholder="请输入标题"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="货主名称:"
        prop="ownerCode"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <el-select
          v-model="addForm.ownerCode"
          @change="getownerName"
          placeholder="请搜索选择"
          size="small"
          class="formitem"
          clearable
          filterable
        >
          <el-option
            v-for="item in ownerData"
            :label="item.ownerName"
            :key="item.ownerCode"
            :value="item.ownerCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          :rows="2"
          v-model="addForm.remarkInfo"
          style="width:400px;"
          placeholder="请输入"
          maxlength="40"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="附件："
        prop="file"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <el-upload
          class="musicupload"
          ref="pictureupload"
          :action="pictureuploadUrl"
          multiple
          :limit="1"
          :file-list="musicList"
          :before-upload="beforeMusicUpload"
          name="myFile"
          :on-success="handleMusicUploadSuccess"
          v-if="fileList.length<3"
        >
          <i>选择上传文件</i>
        </el-upload>
        <div>支持文档或图片，最多不超过3个；单个附件大小不超过5M；</div>
        <div
          v-for="(file, index) in fileList"
          class="photoview"
          :key="index"
        >
          <a
            :href="file.filePath"
            height="150"
            target="_blank"
          >{{file.fileName}}</a>
          <i
            class="el-icon-close close"
            style="pointer:cursor"
            @click="removeFile(file)"
          ></i>
        </div>
        <el-input
          type="text"
          v-model="addForm.file"
          style="width:400px;"
          placeholder="请输入标题"
          maxlength="20"
          show-word-limit
          v-show="false"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :disabled="submitloading"
        >提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tenantList } from '@/api/tenant'
import { messageSave } from '@/api/operation'
export default {
  name: '',
  data() {
    const validateOwnerName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('租户名称不能为空'));
      }
      setTimeout(() => {
        if (!/^[A-Za-z()（）\u4e00-\u9fa5]+$/.test(value)) {
          callback(new Error('名称只能包含汉字、字母和括号()'));
        }
        callback();
      }, 300);
    }
    const validateTel = (rule, value, callback) => {
      setTimeout(() => {
        if (!(/^1[34578]\d{9}$/.test(value) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
          callback(new Error('格式不正确'));
        }
        callback();
      }, 300);
    }
    const validateDcno = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('必填'));
      } else {
        setTimeout(() => {
          if (!/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/.test(value)) {
            callback(new Error('格式不正确,格式:xxxxxxxx-x'));
          }
          callback();
        }, 300);
      }
    }
    return {
      addForm: {
        ownerInfos: [],
        messageType: 1,
        messageTitle: null,
        remarkInfo: null,
        filePathList: [],
        file: null
      },
      fileList: [],
      submitloading: false,
      validateOwnerName,
      validateTel,
      validateDcno,
      storeSysCode: '',
      ownerData: [],
      totalData: [],
      pictureuploadUrl: '/webApi/fileupload/filetoserver',
      musicList: []
    }
  },
  computed: {
    ...mapGetters(['mapConfig', 'visitedViews'])
  },
  created() {
    this.getOwnerData()
  },
  methods: {
    getownerName() {
      this.addForm.ownerInfos = []
      if (this.addForm.ownerCode) {
        this.addForm.ownerInfos.push({
          ownerCode: this.addForm.ownerCode,
          ownerName: this.ownerData.filter(v => v.ownerCode === this.addForm.ownerCode)[0].ownerName
        })
      }
    },
    getOwnerData() {
      tenantList({
        pageSize: 1000000,
        pageNum: 1,
        ownerState: 1
      }).then(res => {
        this.loading = false
        if (res.success) {
          this.ownerData = (res.data && res.data.list) || []
          this.ownerData.map(item => {
            this.totalData.push({
              ownerCode: item.ownerCode,
              ownerName: item.ownerName
            })
          })
        }
      })
    },
    beforeMusicUpload(file) {
      // 如果上传文件大于5M
      const isLt5KB = file.size / 1024 / 1024 < 5;
      if (!isLt5KB) {
        this.$message.error('上传文件大小不能超过 5MB!');
      }
      return isLt5KB;
    },
    handleMusicUploadSuccess(res, file, pictureList) {
      this.musicloading = true
      if (file.response.code == '200') {
        this.fileList.push({
          fileName: file.name,
          filePath: file.response.data.filePath
        })
        this.$message.success('上传成功')
        this.musicloading = false
      } else {
        this.$message.error(file.response.errorMsg)
        this.musicloading = false
      }
      this.$refs['pictureupload'].clearFiles()
    },
    removeFile(enc) {
      this.fileList.map((item, index) => {
        if (item.filePath == enc.filePath) {
          this.fileList.splice(index, 1)
        }
      })
    },
    fileListChange(val) {
      this.fileList = val
    },
    onSubmit() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if (this.fileList.length > 0) {
        this.addForm.file = 1
      } else {
        this.addForm.file = null
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.filePathList = this.fileList
          let params = this.$copy(this.addForm)
          this.submitloading = true
          messageSave(params).then(res => {
            this.submitloading = false
            this.$message.success('操作成功~')
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                name: 'reconciliationMessage'
              })
            })
          }).catch(err => {
            this.submitloading = false
            console.error(err)
          })
        }
      }
      )
    },
    onCancel() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          name: 'reconciliationMessage'
        })
      })
    }
  }
}
</script>

<style lang="css" scoped>
.photoview {
  display: block;
  position: relative;
}
.photoview .close {
  position: absolute;
  top: 0;
}
</style>