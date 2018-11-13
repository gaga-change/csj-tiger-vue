<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm"  @busiBillNoChange="busiBillNoChange"   @submit="this.submit"   :isDisplaySubmit="false"  ></search-invoice>
     <div class="add-buttom" >
        <item-title text="商品发票明细" />
        <el-button type="primary" size="mini"  :disabled="searchForm.invoiceNature===2" @click="dialogVisible=true"  >选择签收单下商品明细</el-button>
     </div>

     <edit-table 
     :tableData="editTableData"
     :labelMak="searchForm.invoiceNature===2"
     @goeditrow="goeditrow"
     @handleDelete="handleDelete"/>

     <el-dialog
      title="选择签收明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">
      <el-row>
        <el-col :span="6" style="min-width:300px;margin-bottom:12px">
          <span style="font-size:12px;color:#606266">签收单号 :</span>
          <el-select v-model="signNo" :clearable="true"  filterable placeholder="请选择签收单号"  @change="signNoChange" >
            <el-option
              v-for="item in signNoConfig"
              :key="item.id"
              :label="item.signNo"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
       <web-pagination-table 
        @SelectionChange="handleSelectionChange"
        :loading="false"
        :config="addAlertTableConfig" 
        :allTableData="alertTableData"/>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="handleSuccess">确 定</el-button>
        </span>
     </el-dialog>
     

  </div> 
</template>

<script>
import SearchInvoice from './components/search'
import EditTable from './components/table'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { getSigningInformation,billingTypeDetails,getSigningDetail} from '@/api/invoicetigger/newoutputinvoice'
import { addAlertTableConfig } from './components/config';
import _  from 'lodash';
import moment from 'moment';

export default {
  components: { SearchInvoice,webPaginationTable,EditTable},
   data() {
    return {
      searchForm:{
        providerCode:'',
        busiBillNo:'',
        invoiceType:'',
        invoiceNature:'',
        invoiceNo:'',
        invoiceAmt:'',
        invoiceTaxAmt:'',
        makeDate:'',
        arriveDate:'',
        oldInvoiceId:''
      },
      dialogVisible:false,
      alertTableData:[],
      alertTableDataSelect:[],
      editTableData:[],
      signNoConfig:[],
      addAlertTableConfig,
      
      signNo:''//回单id
    }
  },

  methods:{

    signNoChange(id){
      this.signNo=id;
      getSigningDetail({id}).then(res=>{
        if(res.success){
          let data=res.data||[];
          if(this.searchForm.invoiceNature===2){
            data=data.filter(v=>v.whetherToInvoice)
          } else{
            data=data.filter(v=>!v.whetherToInvoice)
          }
          this.alertTableData=data.map(v=>{
            return {
               skuCode:v.skuCode,
               skuName:v.skuName,
               skuFormat:v.skuFormat,
               skuUnitName:v.skuUnitName,
               taxPrice:v.skuPrice,
               realInQty:v.invoicedQty,
               invoicedQty:v.invoicedQuantity,
               taxCode:v.taxRate/100,
               invoiceQty:v.invoicedQty-v.invoicedQuantity,
            }
          }); 
        }
      }).catch(err=>{
         console.log(err)
      })
    },

    busiBillNoChange(busiBillNo,contractNo){
      
      getSigningInformation({
        signatureNumber:busiBillNo
      }).then(res=>{
        if(res.success){
           this.signNoConfig=res.data;
        }
      }).catch(err=>{
        console.log(err)
      });

      billingTypeDetails({
        outBusiBillNo:busiBillNo
      }).then(res=>{
        if(res.success){
           console.log(res)
        }
      }).catch(err=>{
        console.log(err)
      })

    },

    handleSelectionChange(value){
      let idArr=this.alertTableDataSelect.map(v=>v.id);
      this.alertTableDataSelect=[...this.alertTableDataSelect,...value.filter(v=>!idArr.includes(v.id))];
    },

    handleSuccess(){
      this.dialogVisible=false;
      this.editTableData=this.alertTableDataSelect;
    },

    submit(type,value){
      let data={...this.searchForm,...value };
      let json={};
      for(let i in data){
        if(data[i]!==''){
          json[i]=data[i]
        }
      }

      json.arriveDate=moment(json.arriveDate).valueOf()
      json.makeDate=moment(json.makeDate).valueOf()
      json.FinaPurchaseInvoiceDetailBO=this.editTableData;
      console.log(type,json)
    },

    goeditrow(index){
      let data= _.cloneDeep(this.editTableData);
      data[index].edit=!data[index].edit;
      this.editTableData=data;
      console.log(this.editTableData)
    },
    handleDelete(index,row){
     let data= _.cloneDeep(this.editTableData);
     data.splice(index,1);
     this.editTableData=data;
     console.log(this.editTableData)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .entryInvoice-list{
    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  .shouDetailsDialog{
     .el-dialog__body{
      padding: 0 20px;
    }
  }

</style>

