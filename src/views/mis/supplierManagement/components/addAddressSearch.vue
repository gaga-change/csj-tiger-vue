<template lang="html">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm" class="AddAddressSearch">
      <el-row>
          <el-col :span="12">
            <el-form-item label="地址性质" prop="addrNature" :rules="[{ required: true, message: '该项为必填'}]">
              <el-select  v-model="searchForm.addrNature" clearable  placeholder="请选择地址性质" size="mini" class="formitem">
                 <el-option v-for="item in mapConfig['getAddrNature']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="所在地区" prop="area" :rules="[{ required: true, message: '该项为必填'}]" >
                <el-cascader :options="options" v-model="searchForm.area" size="mini"  ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="详细地址" prop="providerAddress" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.providerAddress" placeholder="请输入详细地址" size="mini" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系人:" prop="receiverName" :rules="[{ required: true, message: '该项为必填'}]">
              <el-input v-model="searchForm.receiverName" placeholder="请输入联系人" size="mini" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话:" prop="receiverTel" :rules="[{ required: true, message: '请输入正确的联系方式',pattern:/^[1][3,4,5,7,8][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/}]">
              <el-input v-model="searchForm.receiverTel" placeholder="请输入联系电话" size="mini" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮政编码:">
              <el-input v-model="searchForm.postalCode" placeholder="请输入邮政编码" size="mini" class="formitem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地址编码:">
              <el-input v-model="searchForm.addrCode" placeholder="请输入地址编码" size="mini" class="formitem"></el-input>
            </el-form-item>
          </el-col>
    </el-row>

      <div class="btn_box">
        <el-button @click="submit" type="primary">保存</el-button>
        <el-button @click="$emit('handleClose')" >取消</el-button>
      </div>

    </el-form>
</template>

<script>
import { Area } from '@/utils/area.js'
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      options: Area
    }
  },

  props: {
    searchForm: {
      type: Object,
      default: () => { }
    },
  },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },

  methods: {

    submit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', 'addAddress', this.searchForm)
        }
      })
    },
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.AddAddressSearch {
  .btn_box {
    display: flex;
    justify-content: flex-end;
  }
  .el-form-item {
    height: 40px;
  }
}
</style>
