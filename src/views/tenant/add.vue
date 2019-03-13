<template lang="html">
  <div>
    <el-form :model="addForm" ref="addForm" label-width="120px">
      <item-title text="基本信息" />
      <el-form-item
        label="客户类型："
        :rules="[{ required: true, message: '请选择客户类型', trigger: 'change' }]"
        prop="ownerType"
      >
        <el-radio-group v-model="addForm.ownerType">
          <el-radio :label="1" name="type" >仓储客户</el-radio>
          <el-radio :label="2" name="type" >采购商</el-radio>
          <el-radio :label="3" name="type" >供应商</el-radio>
          <el-radio :label="4" name="type" >服务商</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="租户名称：" prop="ownerName" :rules="[
      { required: true, message: '请输入租户名称', trigger: ['bulr','change'] },
      { validator: validateOwnerName, trigger: 'blur' },
      ]">
        <el-input
          type="text"
          v-model="addForm.ownerName"
          style="width:400px;"
          placeholder="请输入租户名称"
        ></el-input>
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
        <div v-for="file in fileList" class="photoview">
          <img :src="file.path" height="150" />
          <i class="el-icon-close close" style="pointer:cursor" @click="removeFile(file)"></i>
        </div>
      </el-form-item>

      <item-title text="仓库信息" />
      <el-form-item label="所属仓库：">
        <el-select
          v-model="addForm.warehouses"
          placeholder="请选择"
          multiple
          style="width:400px;"
        >
          <el-option-group
            v-for="group in storeoptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <item-title text="企业联系人" />
      <el-form-item label="联系人：" prop="ownerLinkUser">
        <el-input
          type="text"
          v-model="addForm.ownerLinkUser"
          style="width:400px;"
          placeholder="请输入联系人"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话：" :rules="[{ validator: validateTel, trigger: 'blur' }]" prop="ownerLinkuserTel">
        <el-input
          type="tel"
          v-model="addForm.ownerLinkuserTel"
          style="width:400px;"
          placeholder="请输入电话"
        ></el-input>
      </el-form-item>

      <item-title text="开票信息" />
      <el-form-item label="组织机构代码：" :rules="[{ validator: validateDcno, trigger: 'blur' },{ required: true, message: '必填', trigger: ['bulr','change'] }]" prop="ownerDcno">
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
          v-loading="submitloading"
          :disabled="submitloading"
          >提交</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveTenant } from '@/api/tenant'
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
              return callback(new Error('必填'));
            }
            setTimeout(() => {
              if (!/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/.test(value)) {
                callback(new Error('格式不正确'));
              }
              callback();
            }, 300);
          }
    return {
      addForm: {
        warehouses: [],
        roleType: 1
      },
      fileList: [],
      submitloading: false,
      validateOwnerName,
      validateTel,
      validateDcno
    }
  },
  computed: {
    storeoptions() {
      const stores = this.mapConfig['getWarehouse']
      const checked = stores
        ? stores.filter(store => this.addForm.warehouses.includes(store.key))
        : []
      const unchecked = stores
        ? stores.filter(store => !this.addForm.warehouses.includes(store.key))
        : []
      return [
        {
          label: '已选择',
          options: checked
        },
        {
          label: '未选择',
          options: unchecked
        }
      ]
    },
    ...mapGetters(['mapConfig','visitedViews'])

  },
  methods: {
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
           saveTenant(this.addForm).then(res => {
             console.log(res)
             this.$message.success('添加成功~')
             this.$store.dispatch('delVisitedViews', view[0]).then(() => {
               this.$router.push({
                 name:'tenantList'
              })
             })
           }).catch(err => {
             console.log(err)
           })
         }
       }
     )
    },
    onCancel() {}
  }
}
</script>

<style lang="css" scoped>
.photoview {
  display: block;
  position: relative;
}
.photoview .close{
  position: absolute;
  top: 0;
}
</style>
