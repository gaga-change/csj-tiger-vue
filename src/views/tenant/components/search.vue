<template lang="html">
   <div class="entryInvoice-form">

    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="租户编码" label-width="80px" style="width:300px" >
              <el-input type="text" size="small"   placeholder="租户编码"    v-model.trim="searchForm.ownerCode" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="租户名称" label-width="80px" style="width:300px" >
              <el-input type="text" size="small"   placeholder="请输入租户名称"    v-model.trim="searchForm.ownerName" ></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="24">
            <el-form-item label-width="0">
              <el-button type="primary"  size="small"  @click="submit">查询</el-button>
              <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
    </el-form>
   </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])  },

  props: {
    searchForm: {
      type: Object,
      default: () => { }
    },
  },

  methods: {

    submit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.searchForm)
        } else {
          return false;
        }
      })
    },

    resetForm() {
      let data = _.cloneDeep(this.searchForm);
      let json = {};
      for (let i in data) {
        if (Array.isArray(data[i])) {
          json[i] = []
        } else {
          json[i] = ''
        }
      }
      this.$emit('submit', json)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.entryInvoice-form {
  .el-form-item {
    height: 30px;
    margin-bottom: 36px;
  }
}
.providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
</style>
