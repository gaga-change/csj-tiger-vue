<template lang="html">
  <div>
    <el-form  :model="addForm"  ref="addForm" label-width="120px">
      <item-title text="基本信息"/>
      <el-form-item label="客户类型：">
        <el-checkbox-group v-model="addForm.type">
          <el-checkbox label="仓储客户" name="type"></el-checkbox>
          <el-checkbox label="采购商" name="type"></el-checkbox>
          <el-checkbox label="供应商" name="type"></el-checkbox>
          <el-checkbox label="服务商" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="角色类别：" prop="warehouseCode">
       <el-select  v-model="addForm.warehouseCode"  placeholder="请选择企业角色">
         <el-option  v-for="item in role" :label="item.value"  :key="item.key"  :value="item.key"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="租户名称：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入租户名称"></el-input>
     </el-form-item>
     <el-form-item label="营业执照：" >
       <upload-mode
         @fileListChange="fileListChange"
         :defailFileList="addForm.files||[]" >
       </upload-mode>
     </el-form-item>

     <item-title text="仓库信息"/>
     <el-form-item label="所属仓库：" >
       <el-select v-model="addForm.store" placeholder="请选择" multiple style="width:400px;">
         <el-option-group
           v-for="group in storeoptions"
           :key="group.label"
           :label="group.label">
           <el-option  v-for="item in group.options" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
         </el-option-group>
       </el-select>
     </el-form-item>

     <item-title text="企业联系人"/>
     <el-form-item label="联系人：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入联系人"></el-input>
     </el-form-item>
     <el-form-item label="电话：" >
       <el-input type="tel" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入电话"></el-input>
     </el-form-item>


     <item-title text="开票信息"/>
     <el-form-item label="组织机构代码：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入组织机构代码"></el-input>
     </el-form-item>
     <el-form-item label="企业地址：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入企业地址"></el-input>
     </el-form-item>
     <el-form-item label="企业电话：" >
       <el-input type="tel" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入企业电话"></el-input>
     </el-form-item>
     <el-form-item label="开户行支行：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入开户行支行"></el-input>
     </el-form-item>
     <el-form-item label="银行账户：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入银行账户"></el-input>
     </el-form-item>


     <item-title text="其他"/>
     <el-form-item label="备注：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入备注"></el-input>
     </el-form-item>

     <el-form-item>
      <el-button type="primary" @click="onSubmit" v-loading="submitloading" :disabled="submitloading">提交</el-button>
      <el-button @click="onCancel">取消</el-button>
     </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      addForm: {
        type: [],
        store: []
      },
      role: [
        { value:'租户', key: 1 },
        { value:'平台管理员', key: 2 }
      ],
      fileList: [],
      submitloading: false
    }
  },
  computed: {
    storeoptions() {
      const stores = this.mapConfig['getWarehouse']
      const checked = stores ? stores.filter(store => this.addForm.store.includes(store.key)) : []
      const unchecked = stores ? stores.filter(store => !this.addForm.store.includes(store.key)) : []
      return  [
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
    ...mapGetters([
      'mapConfig',
    ])
  },
  methods: {
    fileListChange(val) {
      this.fileList = val
    },
    onSubmit() {

    },
    onCancel() {

    }
  }
}
</script>

<style lang="css">
</style>
