<template>
   <!-- 拉取对账单 -->
    <el-dialog
      title="拉取对账单"
      :visible.sync="dialogVisPay"
      center
      width="50%">
      <slot name="detailLastDate"></slot>
    
      <el-row>
        <el-col>
          <div style="margin-bottom:10px">本次对账时间段</div> 
          <el-date-picker
            v-model="payDurationStart"
            type="date" 
            size="small"
            :disabled="timeUsable.start"
            placeholder="开始">
          </el-date-picker> 至
          <el-date-picker
            v-model="durationEnd"
            type="date" 
            size="small"
            :disabled="timeUsable.end"
            placeholder="结束日期">
          </el-date-picker>
          <slot name="searchButton"></slot>
         

        </el-col>
     </el-row>
     <el-table :data="tableData">
        <el-table-column
          v-for="item in tableConfig"
          :formatter="item.formatter"
          :key="item.lable"
        
          :type="item.columnType"
          :fixed="item.fixed"
          :width="item.width"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>
     </el-table>
     <div style="padding:10px">服务费  {{serviceCharge}}元</div>
     <slot name="footer"></slot>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
</template>
<script>
import moment from 'moment'
import { NatureInvoice, InvoiceStatus } from '@/utils/enum'
export default {
  name:'PayBill',
  data(){
    return {
      dialogVisPay:false,
      // payDurationStart:'',
      // payDurationEnd:'',
      durationEnd:'',
      tableConfig:[
        {label:'日期', prop:'makeDate',formatter:(a,b,c,d)=>{
          return moment(c).format('YYYY-MM-DD')
        }},
        {label:'操作', prop:'invoiceStatus',formatter:(a,b,c,d)=>{
          // var name = ''
          var len = InvoiceStatus.length
          for(var i = 0; i < len; i++ ){
            
            if(InvoiceStatus[i].value == c){
              return InvoiceStatus[i].name
            }
          }
          // return name 
        }},
        {label:'发票性质', prop:'invoiceNature',formatter:(a,b,c,d)=>{
          // var name = ''NatureInvoice
          var len = NatureInvoice.length
          for(var i = 0; i < len; i++ ){
            if(NatureInvoice[i].value == c){
              
              return NatureInvoice[i].name
            }
          }
          // return name 
        }},
        {label:'发票号', prop:'invoiceNo'},
        {label:'发票金额', prop:'invoiceAmt'},

      ]
    }
  },
  watch:{
    dialogVisiblePay(){      
      this.dialogVisPay = this.dialogVisiblePay
    },
    payDurationEnd(){
      this.durationEnd = this.payDurationEnd
    }
  },
  props:{
    serviceCharge:{
      required: false
    },
    tableData:{
      default:()=>[]
    },
    timeUsable:{
      default:()=> {return {start:true,end:false}}
    },
    dialogVisiblePay:{
      default: false
    },
    // lastBillDate:{
    //   dafault:'',
    //   required:true,
    // },
    payDurationStart:{
      dafault:'',
      required:true,
    },
    payDurationEnd:{
      dafault:'',
    }
   
  },
 
}
</script>

