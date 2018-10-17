<template>
  <div>
     <sticky :className="'sub-navbar published'">
    <template v-if="fetchSuccess">
      <template v-if="planform.receiptOrder.status == 2">
        <!-- <el-button  style="margin-left: 10px;" type="warning" @click="Prompt('delete')" >删除</el-button> -->
        <el-button  style="margin-left: 10px;" type="primary" @click="Edit" >修改</el-button>
      </template>
      <template v-else-if="planform.receiptOrder.status == 0">
        <el-button  style="margin-left: 10px;" type="primary"   @click="Prompt('examine')" >审核</el-button>
        <el-button  style="margin-left: 10px;" type="error"  @click="Prompt('reject')"  >驳回</el-button>
      </template>
      <template v-else>
        <el-tag v-show="false">详情</el-tag>
      </template>
    </template>
  </sticky>
  <div class="transfermanagement-container">
    <el-form :model="planform" ref="ruleForm" :rules="rules" label-width="120px">
      <el-row >
         <el-col :span="8" v-if="planform.receiptOrder.signNo">
            <el-form-item label="回单号:" prop="receiptOrder.signNo">
              {{planform.receiptOrder.signNo}}
            </el-form-item>
          </el-col>
        <el-col :span="8">
           <el-form-item label="出库计划单号:" prop="receiptOrder.outPlanCode">
            {{formatter(planform.receiptOrder.outPlanCode)}}
           </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货企业:" prop="receiptOrder.ownerName">
            {{formatter(planform.receiptOrder.ownerName)}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发货仓库:" prop="receiptOrder.planWarehouseCode">
            {{formatter(planform.receiptOrder.planWarehouseName)}}
          </el-form-item>
        </el-col>

      <el-col :span="8">
        <el-form-item label="签收人:" prop="receiptOrder.signName">
          {{formatter(planform.receiptOrder.signName)}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="签收人电话:" prop="receiptOrder.signTel">
          {{formatter(planform.receiptOrder.signTel)}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="签收日期:" prop="receiptOrder.signCreateTime">
          {{formatter(planform.receiptOrder.signCreateTime,'time')}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="审核人:" prop="receiptOrder.approveName">
          {{planform.receiptOrder.approveName}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="审核日期:" prop="receiptOrder.approveCreateTime">
          {{formatter(planform.receiptOrder.approveCreateTime,'time')}}
        </el-form-item>
      </el-col>
      </el-row>
    </el-form>

    <web-pagination-table 
     :config="tableConfig" 
     :allTableData="tableData"/>
     
  </div>
  </div>
</template>

<script>
 import Sticky from '@/components/Sticky' 
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {Prompt} from '@/utils/prompt'
 import { signDetail} from '@/api/reply'
 import { getWarehouseType } from '@/api/map'
 import moment from 'moment'
 export default {
  components: { 
    Sticky,
    webPaginationTable 
  },
   data(){
     return {
       fetchSuccess:true,
       planform:{
         receiptOrder:{status:1},
       },
        tableConfig:[],
        tableData:[],
        rules:{

        },
        warehouseTypeConfig:[],
     }
   },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',width:"50",fixed:true,type:'index'},
          { label:'商品编码',prop:'skuCode',width:"150",fixed:false,},
          { label:'商品名称',prop:'skuName',width:"150",fixed:false,},
          { label:'品牌',prop:'skuBrandName',width:"150",fixed:false,},
          { label:'规格',prop:'skuFormat',width:"150",fixed:false,},
          { label:'单位',prop:'skuUnitName',width:"150",fixed:false,},
          { label:'单价',prop:'skuPrice',width:"100",fixed:false},
          { label:'转换率',prop:'skuUnitConvert',width:"100",fixed:false},
          { label:'签收数量',prop:'signQty',width:"150",fixed:false},
          { label:'拒收数量',prop:'rejectQty',width:"150",fixed:false},
      ];
      this.tableData=[
        {skuName:'商品编码',skuFormat:'商品名称',productFactory:'品牌',skuCategoryno:'规格',skuBrandName:'单位',skuUnitName:'单价',skuUnitConvert:'税率',inPrice:'签收数量',inStoreQty:'签收金额'}
      ]
     },

   mounted(){
      let { id,approveStatus}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      let data=_.cloneDeep(this.planform);
      data.receiptOrder.status=approveStatus;
      this.signId=id;
      this.planform=data;
       getWarehouseType().then(res=>{
        if(res.success){
          this.warehouseTypeConfig=res.data;
        } else{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
       }
       }).catch(err=>{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
       })
    
      signDetail({signId:id}).then(res=>{
        if(res.data){
          data.receiptOrder={...data.receiptOrder,...res.data};
          this.planform=data;
          this.tableData=res.data.itemList
        }
        
      }).catch(err=>{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
       })
   },

   methods:{
     Prompt,
     Edit(){
      this.$router.push({
        path: '/reply/newreceiptorder',
        query:{data:JSON.stringify({modify:true,id:this.signId})}
      })
     },

     formatter(value,type='default'){
       if(!value){
         return '暂无数据'
       }
       switch(type){
         case 'time': return moment(value).format('YYYY-MM-DD hh:mm:ss');
         case 'warehouseType': return this.warehouseTypeConfig.find(v=>v.key===value)&&this.warehouseTypeConfig.find(v=>v.key===value).value||'暂无数据';
         default : return value;
       }
     }
   }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .transfermanagement-container{
    padding: 24px;
  }
</style>
