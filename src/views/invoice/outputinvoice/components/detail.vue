<template>
  <div class="outgoing-quirydetail-container">
  <item-title text="发票申请信息"/>
  <item-card :config="applyinfoConfig" :loading="loading"   :cardData="cardData"  />
  <template v-if="name!='billing'&&name!='apply'&&cardData.ticketStatus > 1">
    <item-title text="发票详情信息"/>
    <item-card :config="detailinfoConfig" :loading="loading"   :cardData="cardData"  />
  </template>
  <template v-else-if="name=='apply'&&cardData.ticketStatus==1">
    <item-title text="发票详情信息"/>
    <item-card :config="detailinfoConfig" :loading="loading"   :cardData="cardData"  />
  </template>
  <template v-else-if="name == 'billing'&&(cardData.ticketStatus == 2 || cardData.ticketStatus == 3)">
    <item-title text="财务开票"/>
     <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-form :model="searchForm" ref="searchForm" label-width="70px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="发票号" >
            <el-input type="text" size="small" v-model="searchForm.invoiceCode" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="120px" label="发票日期:"  class="postInfo-container-item">
            <el-date-picker size="small" v-model="searchForm.invoiceDate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="备注" >
            <el-input type="text" size="small"  v-model="searchForm.remark" ></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      </el-form>
     </el-card>
  </template>
  <item-title text="相关明细"/>
    <web-pagination-table 
      :loading="loading"
      :config="detailtableConfig" 
      :allTableData="finaSaleInvoiceDetailDOList"/>
      <!-- 操作记录暂无 -->
      <!-- <item-title text="操作记录"/>
      <web-pagination-table 
        :loading="loading"
        :config="recordConfig" 
        :allTableData="finaSaleInvoiceDetailDOList"/> -->
  </div>
</template>

<script>
  import _ from 'lodash'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { detailtableConfig, recordConfig} from './config';

 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        applyinfo:{},
        detailinfo:{},
        recordConfig,
        detailtableConfig,
        searchForm:{},
        recordData:[],
        tableData:[],
        loading:false,

        card:{},
        deConfig:{}

        
      }
    },
    props:{
      detailinfoConfig:{
        type:Array,
        default:()=>[]
      },
      name:{
        type:String,
        default:''
      },
      applyinfoConfig:{
        type:Array,
        required:false,
        default:()=>[]
      },
      cardData:{
        type: Object,
        required:false,
        default:()=>{}
      },

      finaSaleInvoiceDetailDOList:{
        type: Array,
        required:false,
        default:()=> [] 
      },
    },
    
    watch:{
      cardData(){
        let {invoiceCode} = this.cardData
        this.searchForm = {invoiceCode, invoiceDate:this.cardData.ticketTime, remark:this.cardData.ticketRemark}
      }
    },

    created(){
     
      this.getBillingData()
      // this.configInit()
    },
     // beforeUpdate(){       
     // this.configInit()  
     // this.getBillingData()
     // },
    methods:{
      getBillingData(){
        let {invoiceCode} = this.cardData
        this.searchForm = {invoiceCode, invoiceDate:this.cardData.ticketTime, remark:this.cardData.ticketRemark}
      }
    }
 }

</script>

