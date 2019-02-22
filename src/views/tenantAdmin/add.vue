<template lang="html">
  <div>
    <el-form  :model="addForm"  ref="addForm" label-width="120px">
      <el-form-item label="租户名称：" prop="warehouseCode">
       <el-select  v-model="addForm.warehouseCode"  placeholder="请选择租户">
         <el-option  v-for="item in role" :label="item.value"  :key="item.key"  :value="item.key"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="用户角色：" >
       <el-select v-model="addForm.store" placeholder="请选择用户角色" style="width:400px;">
         <el-option  v-for="item in mapConfig['getReceiveStatus']" :label="item.value"  :key="item.key"  :value="item.key"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="用户名：" >
       <el-input type="text" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入联系人"></el-input>
     </el-form-item>
     <el-form-item label="手机号：" >
       <el-input type="tel" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入电话"></el-input>
     </el-form-item>
     <el-form-item label="密码：" >
       <el-input type="password" v-model="addForm.arrivalName" style="width:400px;"  placeholder="请输入电话"></el-input>
     </el-form-item>
     <el-form-item label="备注：" >
       <el-input type="textarea" v-model="addForm.backreason" :rows="5" style="width:400px;"></el-input>
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
