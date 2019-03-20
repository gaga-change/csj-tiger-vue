<template lang="html">
  <div class="addCarrier">
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="业务单号:"  prop="业务单号"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.业务单号" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="外部订单号:"  prop="外部订单号"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.外部订单号" placeholder="请输入外部订单号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="货主编号:"  prop="货主编号"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.货主编号" placeholder="请输入货主编号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="货主名称:"  prop="货主名称"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.货主名称" placeholder="请输入货主名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="合同号:"  prop="合同号"  :rules="[{ required: false, message: '该项为必填'}]" >
                <el-input v-model="searchForm.合同号" placeholder="请输入合同号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="订货日:"  prop="订货日"  :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-date-picker v-model="searchForm.订货日" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="到货预定日"  label-width="100px">
                  <el-date-picker v-model="searchForm.到货预定日" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>


            <el-col :sm="12" :md="8" :lg="8" :xl="6" >
              <el-form-item label="供应商编码:"  prop="供应商编码" :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.供应商编码" placeholder="请输入供应商编码" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" >
              <el-form-item label="供应商名称:"  prop="供应商名称"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.供应商名称" placeholder="请输入供应商名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="订单来源"  label-width="100px">
                 <el-input v-model="searchForm.订单来源" placeholder="请输入订单来源" size="small" class="formitem"></el-input>
               </el-form-item>
            </el-col>
        
              <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="创建人:"  >
                <el-input v-model="searchForm.创建人" placeholder="请输入创建人" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="创建日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.创建日期" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>
      </el-row>

      <div class="tableBox">
        <div class="tableTitle">
            <item-title text="商品明细"/>
            <div class="tableBtn">
               <upload-excel  @uploadRes="uploadRes"/>
               <el-button  size="mini" class="addCommodity" @click="showDialog('add')" type="primary">添加商品</el-button>
            </div>
        </div>
          <edit-Table
            :useEdit="true"
            :config="addtable_config" 
            @goeditrow="goeditrow"
            @handleDelete="handleDelete"
            :allTableData="searchForm.items"/> 
          </edit-Table >
      </div>

      <el-dialog
        title="新增商品"
        :visible.sync="addVisible"
         width="30%"
        :before-close="handleClose">
          <add-form @submit="submit" :searchForm="addCommodityForm" @handleClose="handleClose" ></add-form>
      </el-dialog>
    </el-form>
  </el-card>
    <div class="operationitem">
       <el-button @click="submit('save')" type="primary">保存</el-button>
       <el-button @click="submit('submit')" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import { addtable_config } from './config';
import editTable from '@/components/Table/editTable';
import addForm from './conpoments/addForm'
import  { outgoingOrderTypeEnum } from "@/utils/enum.js";
import _  from 'lodash';
export default {
   name: 'warehousingBusinessorderAdd',
   components: { editTable,addForm},
    data() {
      return {
        //表单项
        searchForm:{
          业务单类型:21,
          items:[{},{}]
        },
        //表单table配置项
        addtable_config,

        //新增项
        addVisible:false,
        addCommodityForm:{

        },
        
        //枚举项
        outgoingOrderTypeEnum,//出库类型


      };
    },

    mounted(){

    },

    methods: {

      uploadRes(res){
        console.log(res)
      },

      goeditrow(index,type) {
         let searchForm= _.cloneDeep(this.searchForm);
         searchForm.items[index].edit=!searchForm.items[index].edit
         this.searchForm=searchForm;
      },

      handleDelete(index, row) {
         let searchForm= _.cloneDeep(this.searchForm);
         searchForm.items.splice(index,1)
         this.searchForm=searchForm;
      },

      handleClose(){
        this.addVisible=false;
      },

      showDialog(type){
        this.addVisible=true;
      },

      submit(type,value) {
        if(type==='addCommodity'){
           console.log(type,value)
        } else {
          this.$refs["searchForm"].validate(valid => {
            if (valid) {
               console.log(type, this.searchForm);
            }
          });
        }
      }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .el-form-item {
    height: 40px;
  }
  .tableBox{
    .tableTitle{
      display:flex;
      justify-content: space-between;
      margin: 16px 0;
    }
    .tableBtn{
      display: flex;
    }    
    .addCommodity{
      height:28px;
      line-height:26px;
      padding:0 12px;
      margin-left: 12px;
    }
  }
}
</style>
