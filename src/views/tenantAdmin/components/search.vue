<template lang="html">
   <div class="entryInvoice-form">

    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" class="formb0">

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="用户名" style="width:300px" prop="userName">
              <el-input type="text" size="small"   placeholder="请输入用户名" v-model.trim="searchForm.userName" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" style="min-width:300px">
            <el-form-item label="手机" style="width:300px" prop="linkTel">
              <el-input type="text" size="small"   placeholder="请输入手机号"    v-model.trim="searchForm.linkTel" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="租户名称"   style="width:300px" prop="ownerName">
              <el-input type="text" size="small"  placeholder="请输入租户名称"    v-model.trim="searchForm.ownerName" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
             <el-form-item label="状态"   style="width:300px"  prop="userStatus">
              <el-select v-model="searchForm.userStatus"
              size="small"  placeholder="请选择状态" prefix-icon="el-icon-search">
                <el-option
                  label="启用"
                  :value="0">
                </el-option>
                <el-option
                  label="禁用"
                  :value="1">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label-width="0" style="margin-bottom:15px !important;">
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

  mounted() {
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
      this.$refs['searchForm'].resetFields()
      this.$emit('submit', this.searchForm)
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
