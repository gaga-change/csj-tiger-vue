<template>
    <div class="provider-add">
        <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
            <template >
                <el-button  type="success" size="small" @click="submit('save')" >保存</el-button>
                <el-button  type="success" size="small" @click="submit('submit')">提交</el-button>
            </template>
        </sticky>

        <el-card class="simpleCard"  shadow="never"  body-style="padding:12px;padding-bottom:0">
          <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
            <el-row>
                <el-col :span="6" style="min-width:300px">
                    <el-form-item label="收货企业" label-width="80px" style="width:300px" >
                    <el-input type="text" size="small" :disabled="true"  @keyup.enter.native="submit"      v-model="searchForm.收货企业" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" style="min-width:300px">
                    <el-form-item label="销售订单号" label-width="90px" style="width:300px" >
                    <el-input type="text" size="small" :disabled="true"   @keyup.enter.native="submit"     v-model="searchForm.销售订单号" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" style="min-width:300px">
                    <el-form-item label="销售合同号"  label-width="80px" style="width:300px">
                    <el-input type="text" size="small" :disabled="true"  @keyup.enter.native="submit"      v-model="searchForm.销售合同号" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item 
                    label="收货日期"
                    label-width="100px"
                    style="width:300px" 
                    prop="收货日期"
                    :rules="[
                    { required: true, message: '该项为必填'},
                    ]">
                    <el-date-picker
                        v-model="searchForm.收货日期"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                  <el-col :span="6" style="min-width:300px">
                    <el-form-item label="收货人" 
                     label-width="80px" 
                     style="width:300px"
                     prop="收货人"
                     :rules="[
                      { required: true, message: '该项为必填'},
                     ]">
                    <el-input type="text" size="small"  @keyup.enter.native="submit"  placeholder="请输入收货人"    v-model="searchForm.收货人" ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" style="min-width:300px">
                    <el-form-item label="联系电话" 
                     label-width="80px" 
                     style="width:300px">
                    <el-input type="text" size="small"  @keyup.enter.native="submit"  placeholder="请输入联系电话"    v-model="searchForm.联系电话" ></el-input>
                    </el-form-item>
                </el-col>

              <el-col :span="12">
                <el-form-item label="收货地址" 
                 label-width="70px"
                 prop="收货地址"
                 :rules="[
                    { required: true, message: '该项为必填'},
                 ]">
                <el-input
                    type="textarea"
                    :rows="1"
                    resize="none"
                    placeholder="请输入收货地址"
                    v-model="searchForm.收货地址">
                </el-input>
                </el-form-item>
             </el-col>

              <el-col :span="6" style="min-width:300px">
                  <el-form-item label="上传附件" 
                    label-width="70px" 
                    style="width:300px" >
                    <upload-mode
                      @fileListChange="fileListChange" 
                      :defailFileList="[]" >
                    </upload-mode>
                  </el-form-item>
              </el-col>
              
            </el-row>  
         </el-form>
     </el-card>

     <item-title text="相关明细"/>
      <nesting-table 
        :loading="loading"
        :useEdit="true"
        :useDelet="false"
        :useEditExpand="true"
        :defaultExpandAll="true"
        editText="登记收货量"
        :config="addTableConfig" 
        :childConfig="addChildTableConfig"
        :allTableData="tableData"
        @goeditrow="goeditrow"/>
    </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import NestingTable from '@/components/Table/nestingTable'
import { addTableConfig,addChildTableConfig } from './components/config';
import _  from 'lodash';
export default {
  components: { Sticky,NestingTable},
   data() {
    return {
      searchForm:{
        收货企业:'',
        销售订单号:'',
        销售合同号:'',
        收货日期:'', 
        收货人:'',
        联系电话:'',
        收货地址:'',
      },
      successfulUploadFiles:[],
      addTableConfig,
      addChildTableConfig,
      tableData:[
        {
          ceshi:1
        }
      ],
      loading:false,
    }
  },

  mounted(){
    let dom=document.querySelectorAll('.sub-navbar >div');
    [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },

  updated(){
     let dom=document.querySelectorAll('.sub-navbar >div');
     [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },


  methods:{

      goeditrow(index) {
        let data= _.cloneDeep(this.tableData);
        data[index].edit=!data[index].edit;
        this.tableData=data;
      },

    fileListChange(successfulUploadFiles){
      this.successfulUploadFiles=successfulUploadFiles
      console.log(successfulUploadFiles)
    },

    submit(type){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             console.log(this.searchForm,type)
          } else{
            return false;
          }
       })
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .provider-add{
      .el-form-item{
        height:30px;
        margin-bottom: 36px
      }
    }
     

</style>