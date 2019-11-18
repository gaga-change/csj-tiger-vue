<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="导入承运商外部对账单"
      :visible="visible"
      width="600px"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        <el-form
          :inline="false"
          :model="formData"
          :rules="rules"
          label-width="100px"
          ref="form"
        >
          <!-- 下拉框 -->
          <el-form-item
            label="承运商"
            prop="consoildatorCode"
          >
            <el-select
              v-model="formData.consoildatorCode"
              placeholder="请选择承运商"
              clearable
            >
              <el-option
                v-for="item in (mapConfig._consoildatorNameApi || [])"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <input type="file"> -->
            <el-upload
              ref="upload"
              class=""
              action="/webApi/consoil/statement/statementImport"
              :data="params"
              :show-file-list="true"
              :file-list="fileList"
              :limit="1"
              :auto-upload="false"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              :on-change="handleChange"
            >
              <el-button
                slot="trigger"
                type="primary"
              >选取文件</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传xls和xlsx文件,文件最大不能超过5M。<a
                  href="/static/templet/accountChecking.xlsx"
                  style="color: #409EFF;"
                >下载模板</a></div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <!-- <el-alert
        class="mt15"
        title="温馨提示："
        type="info"
        :closable="false"
      >
        <p>举例，商品最小单位默认为1,4个最小单位为一个内包装【一个内包装数量为4】，
          2个内包装为1箱【一箱数量8】，10箱为一个容器【一容器数量为80】</p>
      </el-alert> -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="confirm()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// import { saveApi } from '@/api'
import { httpMiddler } from '@/api/http'
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },
  data() {
    return {
      loading: false,
      fileList: [],
      params: {},
      formData: {
        //  ... 表单字段
      },
      rules: {
        //  ... 表单校验
        consoildatorCode: [
          { required: true, message: '必填项', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
  },
  methods: {
    beforeUpload(file) {
      if (file.size > 5000 * 1000) {
        this.$message.error('上传附件不能大于5M')
        return false
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleSuccess(res, file) {
      this.loading = false
      res = httpMiddler({ data: res })
      if (!res) {
        this.$refs.upload.clearFiles();
        return
      }
      this.$message.success('操作成功！')
      this.$emit('submited')
      this.close()
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`当前限制选择上传 1 个文件`)
    },
    /** 确定 */
    confirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const { consoildatorCode } = this.formData
          const consoildatorName = this.mapConfig._consoildatorNameApi.find(v => v.key === consoildatorCode).value
          this.params = {
            consoildatorCode,
            consoildatorName
          }
          if (this.fileList.length === 0) {
            return this.$message.warning('请导入文件！')
          }
          this.loading = true
          this.$nextTick(() => {
            this.$refs.upload.submit();
          })
        }
      })
    },
    /** 关闭弹窗 */
    close() {
      this.$refs['form'] && this.$refs['form'].resetFields()
      this.visible && this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>