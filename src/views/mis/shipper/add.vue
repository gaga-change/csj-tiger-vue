<template lang="html">
  <div class="addCarrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button @click="submit" type="primary">保存</el-button>
      </template>
    </sticky>
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>
              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="货主名称:">
                  <el-input v-model="searchForm.货主名称" placeholder="请输入货主名称" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

               <el-col :sm="12" :md="8" :lg="8" :xl="6">
                  <el-form-item label="营业执照" 
                    label-width="70px" 
                    style="width:300px" >
                    <upload-mode
                      @fileListChange="fileListChange" 
                      :defailFileList="searchForm.files||[]" >
                    </upload-mode>
                  </el-form-item>
                </el-col>
              
                <el-col :sm="12" :md="8" :lg="8" :xl="6">
                  <el-form-item label="联系人:">
                    <el-input v-model="searchForm.联系人" placeholder="请输入联系人" size="small" class="formitem"></el-input>
                  </el-form-item>
                </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="电话:">
                  <el-input v-model="searchForm.电话" placeholder="请输入电话" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="组织机构代码:">
                  <el-input v-model="searchForm.组织机构代码" placeholder="9位字符，8位数字(或大写字母)和1位数字(或大写字母)" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="企业地址:">
                  <el-input v-model="searchForm.企业地址" placeholder="请输入企业地址" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="企业电话:">
                  <el-input v-model="searchForm.企业电话" placeholder="请输入企业电话" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="开户行支行:">
                  <el-input v-model="searchForm.开户行支行" placeholder="请输入开户行支行" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="银行账户:">
                  <el-input v-model="searchForm.银行账户" placeholder="请输入银行账户" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="备注:">
                  <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}"  placeholder="请输入备注" v-model="searchForm.备注"></el-input>
                </el-form-item>
              </el-col>
      </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
export default {
  components: { Sticky},
  name:'carrierAdd',
  data(){
    return {
      searchForm:{

      }
    }
  },

  methods: {

     submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
          }
       })
    },

    fileListChange(successfulUploadFiles){
      this.searchForm.files=successfulUploadFiles
    },

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .addCarrier{
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
  }

</style>
