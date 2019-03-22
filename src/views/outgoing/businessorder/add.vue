<template lang="html">
  <div class="addCarrier">
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.type==='revision'">
              <el-form-item label="调整原因" prop="调整原因" :rules="[{ required: true, message: '该项为必填'}]">
                <el-select  v-model="searchForm.调整原因" clearable placeholder="请选择调整原因" size="small" class="formitem">
                   <el-option v-for="item in []" :label="item.name" :key="item.value"  :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col> 

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="业务单类型" prop="业务单类型" :rules="[{ required: true, message: '该项为必填'}]">
                <el-select  v-model="searchForm.业务单类型" clearable placeholder="请选择业务单类型" size="small" class="formitem">
                   <el-option v-for="item in outgoingOrderTypeEnum" :label="item.name" :key="item.value"  :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

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

            <el-col :sm="12" :md="8" :lg="8" :xl="6"  v-if="[21].includes(searchForm.业务单类型)">
              <el-form-item label="客户编码:"  prop="客户编码" :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.客户编码" placeholder="请输入客户编码" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[21].includes(searchForm.业务单类型)">
              <el-form-item label="客户名称:"  prop="客户名称"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.客户名称" placeholder="请输入客户名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[21].includes(searchForm.业务单类型)">
              <el-form-item label="客户地址:"  prop="客户地址"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.客户地址" placeholder="请输入客户地址" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6"  v-if="[22].includes(searchForm.业务单类型)">
              <el-form-item label="供应商编码:"  prop="供应商编码" :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.供应商编码" placeholder="请输入供应商编码" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[22].includes(searchForm.业务单类型)">
              <el-form-item label="供应商名称:"  prop="供应商名称"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.供应商名称" placeholder="请输入供应商名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[22].includes(searchForm.业务单类型)">
              <el-form-item label="供应商地址:"  prop="供应商地址"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.供应商地址" placeholder="请输入供应商地址" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="联系电话:"  prop="联系电话" :rules="[{ required: true, message:'请输入正确格式的手机号',pattern:/^1[34578]\d{9}$/ }]" >
                <el-input v-model="searchForm.联系电话" placeholder="请输入联系电话" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="创建人:"  >
                <el-input v-model="searchForm.创建人" placeholder="请输入创建人" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="到货预定日"  label-width="100px">
                  <el-date-picker v-model="searchForm.到货预定日" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="到货有效日"  label-width="100px">
                  <el-date-picker v-model="searchForm.到货有效日" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

  
             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="创建日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.创建日期" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

           <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="合同号:"  >
                <el-input v-model="searchForm.合同号" placeholder="请输入合同号" size="small" class="formitem"></el-input>
              </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="发货要求" >
              <el-select  v-model="searchForm.发货要求" clearable  placeholder="请选择发货要求" size="small" class="formitem">
                <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[21].includes(searchForm.业务单类型)">
              <el-form-item label="询价单号:"  >
                <el-input v-model="searchForm.询价单号" placeholder="请输入询价单号" size="small" class="formitem"></el-input>
              </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="订单来源:"  >
                <el-input v-model="searchForm.订单来源" placeholder="请输入订单来源" size="small" class="formitem"></el-input>
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
   name: "businessorderadd",
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
