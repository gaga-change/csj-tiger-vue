<template>
  <div>
    <el-form
      :model="addForm"
      ref="addForm"
      label-width="120px"
    >
      <item-title text="基本信息" />
      <el-form-item
        v-if="!!$route.query.ownerCode"
        label="租户编码："
      >
        <el-input
          type="text"
          v-model="addForm.ownerCode"
          style="width:400px;"
          placeholder="请输入租户编码"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="租户名称："
        prop="ownerName"
        :rules="[
      { required: true, message: '请输入租户名称', trigger: ['bulr','change'] },
      { validator: validateOwnerName, trigger: 'blur' },
      ]"
      >
        <el-input
          type="text"
          v-model="addForm.ownerName"
          style="width:400px;"
          placeholder="请输入租户名称"
          :disabled="Boolean($route.query.ownerCode)"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="推送配置："
        prop="storeSysCodeArr"
      >
        <el-checkbox-group v-model="addForm.storeSysCodeArr">
          <el-checkbox
            label="INFO"
            @change="val => showWarning(val, 'INFO')"
          >INFO</el-checkbox>
          <el-checkbox
            label="SHARK"
            @change="val => showWarning(val, 'SHARK')"
          >SHARK</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业执照：">
        <upload-mode
          @fileListChange="fileListChange"
          :defailFileList="fileList || []"
          :isOnlyone="true"
          :showNum="false"
          :accept="'.jpg,.jpeg,.png,.pdf'"
        >
        </upload-mode>
        <div
          v-for="(file, index) in fileList"
          class="photoview"
          :key="index"
        >
          <img
            :src="file.path"
            height="150"
          />
          <i
            class="el-icon-close close"
            style="pointer:cursor"
            @click="removeFile(file)"
          ></i>
        </div>
      </el-form-item>

      <item-title text="企业联系人" />
      <el-form-item
        label="联系人："
        prop="ownerLinkUser"
        :rules="[{ required: true, message: '必填'}]"
      >
        <el-input
          type="text"
          v-model="addForm.ownerLinkUser"
          style="width:400px;"
          placeholder="请输入联系人"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="电话："
        :rules="[{ required: true,validator: validateTel, trigger: 'blur' }]"
        prop="ownerLinkuserTel"
      >
        <el-input
          type="tel"
          v-model="addForm.ownerLinkuserTel"
          style="width:400px;"
          placeholder="请输入电话"
        ></el-input>
      </el-form-item>

      <item-title text="开票信息" />
      <el-form-item
        label="组织机构代码："
        :rules="[{ required: false, message: '请输入组织机构代码：', trigger: ['bulr','change'] }]"
        prop="ownerDcno"
      >
        <el-input
          type="text"
          v-model="addForm.ownerDcno"
          style="width:400px;"
          placeholder="请输入组织机构代码,格式：12345678-1"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业地址：">
        <el-input
          type="text"
          v-model="addForm.ownerAddress"
          style="width:400px;"
          placeholder="请输入企业地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业电话：">
        <el-input
          type="tel"
          v-model="addForm.ownerTel"
          style="width:400px;"
          placeholder="请输入企业电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户行支行：">
        <el-input
          type="text"
          v-model="addForm.openBank"
          style="width:400px;"
          placeholder="请输入开户行支行"
        ></el-input>
      </el-form-item>
      <el-form-item label="银行账户名称：">
        <el-input
          type="text"
          v-model="addForm.openBankName"
          style="width:400px;"
          placeholder="请输入银行账户"
        ></el-input>
      </el-form-item>
      <el-form-item label="银行账户：">
        <el-input
          type="text"
          v-model="addForm.openBankAccount"
          style="width:400px;"
          placeholder="请输入银行账户"
        ></el-input>
      </el-form-item>

      <item-title text="其他" />
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          :rows="4"
          v-model="addForm.remarkInfo"
          style="width:400px;"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="submitloading"
          :disabled="submitloading"
        >提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveTenant, tenantDetail, tenantUpdate } from '@/api/tenant'
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
        storeSysCodeArr: []
      },
      fileList: [],
      submitloading: false,
      validateOwnerName,
      validateTel,
      validateDcno,
      storeSysCode: '',
    }
  },
  computed: {
    ...mapGetters(['mapConfig', 'visitedViews'])
  },
  created() {
    if (this.$route.query.ownerCode) {
      this.getDetal()
    }
  },
  methods: {
    getDetal() {
      const loading = this.$loading('请稍后...')
      tenantDetail({ ownerCode: this.$route.query.ownerCode }).then(res => {
        loading.close()
        const result = res.data
        result.storeSysCodeArr = result.storeSysCode.split('-').filter(v => {
          return v && ['INFO', 'SHARK'].find(i => i === v)
        })
        this.storeSysCode = result.storeSysCode
        this.addForm = result
        this.fileList = result.files
      }).catch((err) => {
        loading.close()
      })
    },
    showWarning(val, key) {
      if (this.$route.query.ownerCode && this.storeSysCode.indexOf(key) === -1 && val) {
        this.$message({
          message: '如需推送该货主下配置推送前的商品、客户、供应商时，可通过“修改商品”或者“绑定货主”操作推送',
          type: 'warning',
          duration: 3000
        })
      }
    },
    removeFile(enc) {
      this.fileList = this.fileList.filter(file => {
        if (file.response) {
          return file.response.data !== enc.path
        } else if (file.name && file.path) {
          return file.path !== enc.path
        }
      })
    },
    fileListChange(val) {
      this.fileList = val
    },
    onSubmit() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.files = this.fileList
          const Api = this.addForm.ownerCode ? tenantUpdate : saveTenant
          let params = this.$copy(this.addForm)
          params.storeSysCode = params.storeSysCodeArr.join('-')
          this.submitloading = true
          Api(params).then(res => {
            this.submitloading = false
            this.$message.success('操作成功~')
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                name: 'tenantList'
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
    onCancel() { }
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
