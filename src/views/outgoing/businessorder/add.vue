<template lang="html">
  <div class="addCarrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template>
          <div style="display: inline-block;" v-if="!$route.query.id">
              <upload-excel  @uploadRes="uploadRes" filesuploadUrl="/webApi/in/bill/importTemplate" name="file"/>
          </div>
          <el-button @click="submit('save')" type="primary">保存</el-button>
      </template>
   </sticky>

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
              <el-form-item label="业务单类型" prop="busiBillType" :rules="[{ required: true, message: '该项为必填'}]">
                <el-select  v-model="searchForm.busiBillType" clearable placeholder="请选择业务单类型" size="small" class="formitem">
                   <el-option v-for="item in outgoingOrderTypeEnum" :label="item.name" :key="item.value"  :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.id">
              <el-form-item label="业务单号:"  prop="业务单号"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.业务单号" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="外部订单号:"  prop="busiBillNo"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.busiBillNo" placeholder="请输入外部订单号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="货主"   prop="ownerCode" :rules="[{ required: true, message: '该项为必填'}]">
                <el-select v-model="searchForm.ownerCode" filterable  size="small" @change="ownerCodeChange"  placeholder="请选择货主"  >
                  <el-option 
                    value="" v-if="mapConfig['ownerInfoMap']&&mapConfig['ownerInfoMap'].length" :disabled="true">
                    <div class="providerList"> 
                      <span>货主编号</span> 
                      <span>货主名称</span> 
                    </div>
                  </el-option>
                  <el-option
                    v-for="item in mapConfig['ownerInfoMap']" :key="item.key" :label="item.value" :value="item.key">
                      <div class="providerList">
                        <span >{{ item.key }}</span>
                        <span >{{ item.value }}</span>
                      </div>
                  </el-option>
                </el-select>           
              </el-form-item>
            </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6" >
                <el-form-item  :label="searchForm.busiBillType===21?'客户':'供应商'"  label-width="90px" prop="arrivalName" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select v-model="searchForm.arrivalName" filterable  size="small"  @focus="providerFocus" @change="providerChange" :placeholder="searchForm.busiBillType===21?'请选择客户':'请选择供应商'"  >
                    <el-option  value="" v-if="providerConfig.length" :disabled="true">
                      <div class="providerList">
                        <span>{{searchForm.busiBillType===21?'客户编号':'供应商编号'}}</span>
                        <span>{{searchForm.busiBillType===21?'客户名称':'供应商名称'}}</span>
                      </div>
                    </el-option>
                    <el-option v-for="item in providerConfig" :key="item.customerCode" :label="item.customerName" :value="item.customerCode">
                      <div class="providerList">
                        <span >{{ item.customerCode }}</span>
                        <span >{{ item.customerName }}</span>
                      </div>
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item  :label="searchForm.busiBillType===21?'客户地址':'供应商地址'"  prop="arrivalAddress"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.arrivalAddress" :placeholder="searchForm.busiBillType===21?'请输入客户地址':'请输入供应商地址'" size="small" class="formitem"></el-input>
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

          <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="[21].includes(searchForm.busiBillType)">
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
  </div>
</template>

<script>
import { addtable_config } from './config';
import editTable from '@/components/Table/editTable';
import addForm from './conpoments/addForm'
import  { outgoingOrderTypeEnum } from "@/utils/enum.js";
import {customerInfo} from '@/api/warehousing'
import { providerAddrList } from '@/api/outgoing'
import Sticky from '@/components/Sticky'
import _  from 'lodash';
import { mapGetters } from 'vuex'
export default {
   name: "businessorderadd",
   components: { editTable,addForm,Sticky},
    data() {
      return {
        //表单项
        searchForm:{
          busiBillType:21,
          items:[{},{}]
        },
        //表单table配置项
        addtable_config,

        //新增项
        addVisible:false,
        addCommodityForm:{

        },
        
        //枚举项
        outgoingOrderTypeEnum,//出库类型、

        //供应商下拉配置
        providerConfig:[],


      };
    },

    mounted(){

    },

   computed: {
      ...mapGetters({
        'mapConfig':'mapConfig',
         visitedViews: 'visitedViews'
      })
   },


    methods: {

      //选择货主
      ownerCodeChange(value){
        if(this.searchForm.providerCode){
          let searchForm= _.cloneDeep(this.searchForm);
          searchForm.providerCode='';
          searchForm.detailItemList=[];
          this.searchForm=searchForm;
        }
        this.providerConfig=[];
        this.getCustomerInfo(value);
      },

      //根据货主查供应商或者客户列表
      getCustomerInfo(value){
        customerInfo(value,this.searchForm.busiBillType).then(res=>{
          if(res.success){
            this.providerConfig=res.data;
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      //供应商获取焦点
      providerFocus(){
        if(!this.searchForm.ownerCode){
          this.$message.error('请先选择货主');
        }
      },


      providerChange(value){
        console.log(value)
        providerAddrList({
          providerId:value
        }).then(res=>{
          if(res.success){

          }
        }).catch(err=>{
          console.log(err)
        })
      },
   

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
  .providerList{
    display: flex;
    justify-content: space-between;
    >span{
      &:first-child{
        min-width: 150px;
      }
      &:nth-child(2){
        min-width: 100px;
      }
    }
  }
</style>
