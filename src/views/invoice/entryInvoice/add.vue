<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm"  @propsChange="propsChange"  @oldInvoiceIdChange="oldInvoiceIdChange"  @busiBillNoChange="busiBillNoChange"   @submit="this.submit"   :isDisplaySubmit="false"  ></search-invoice>
     <div class="add-buttom" >
        <item-title text="商品发票明细" />
        <el-button type="primary" size="mini"  :disabled="searchForm.invoiceNature===2" @click="clickDialogVisible"  >选择商品发票明细</el-button>
     </div>

     <edit-table 
     :tableData="editTableData"
     :labelMak="searchForm.invoiceNature===2"
     @goeditrow="goeditrow"
     @handleDelete="handleDelete"/>

     <el-dialog
      title="选择发票商品明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">

       <web-pagination-table 
        @SelectionChange="handleSelectionChange"
        :loading="loading"
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
import { saveFinaPurchaseInvoice ,queryInWarehouseBillDetailList,commitFinaPurchaseInvoice ,findFinaPurchaseInvoice,updateFinaPurchaseInvoice} from '@/api/void/list'
import { addAlertTableConfig } from './components/config';
import _  from 'lodash';
import moment from 'moment';
import { mapGetters } from 'vuex'

export default {
  components: { SearchInvoice,webPaginationTable,EditTable},
   data() {
    return {
      searchForm:{
        providerCode:'',
        busiBillNo:'',
        invoiceType:'',
        invoiceNature:1,
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
      localTableData:[],
      addAlertTableConfig,
      loading:false,
      useWatch:false,

      invoiceAmt:0,
      invoiceTaxAmt:0
      
    }
  },

    computed: {
      ...mapGetters({
        visitedViews: 'visitedViews',
      }),
    },

    watch:{
      editTableData:{
        handler: function (val, oldVal) {
          if(JSON.stringify(val)!==JSON.stringify(oldVal)&&this.useWatch){
            val.forEach(item=>{
              if(this.searchForm.invoiceNature===1){
                if(item.invoiceQty<0){
                 item.invoiceQty=0;
                }
                if(item.invoiceQty>item.realInQty-(item.invoicedQty||0)){
                  item.invoiceQty=item.realInQty-(item.invoicedQty||0);
                }
              } else{
                if(item.invoiceQty<0){
                  item.invoiceQty=0;
                }
                if(item.invoiceQty>item.maxNum){
                  item.invoiceQty=item.maxNum;
                }
              }
            })

            let invoiceAmt=val.reduce(function(a,b){
              return a+b.invoiceQty*b.inPrice
            },0);

            this.searchForm.invoiceAmt=Number(invoiceAmt).toFixed(2);
          
            let invoiceTaxAmt=val.reduce(function(a,b){
               return a+(b.invoiceQty*b.inPrice)/(1+b.taxRate)*b.taxRate
            },0);

            this.searchForm.invoiceTaxAmt=Number(invoiceTaxAmt).toFixed(2);

          }
        },
        deep: true
      } ,
    },

    mounted(){
       let { finaPurchaseInvoiceId }=this.$route.query||{};
       if(finaPurchaseInvoiceId){
         findFinaPurchaseInvoice({
            finaPurchaseInvoiceId
         }).then(res=>{
          if(res.success){
            for(let i in this.searchForm){
              this.searchForm[i]=res.data&&res.data[i]
            };
            let arr=res.data&&res.data.finaPurchaseInvoiceDetailBOList||[];
            let data=arr.map(v=>{
              let json=v;
              json.inPrice=v.taxPrice;
              json.taxRate=v.taxRate/100;
              json.maxNum=v.invoiceQty||0;
              return json;
           });
            this.localTableData=data;
            this.editTableData=_.cloneDeep(data)
          }
         }).catch(err=>{

         })
       }
    },

  methods:{

    propsChange(type){
      let searchForm= _.cloneDeep(this.searchForm);
      if(type==='providerCode'){
          searchForm.busiBillNo='';
          searchForm.oldInvoiceId='';
          this.alertTableData=[];
          this.editTableData=[];
          this.alertTableDataSelect=[];
      } else if(type==='busiBillNo'){
          searchForm.oldInvoiceId='';
          this.alertTableData=[];
          this.editTableData=[];
          this.alertTableDataSelect=[];
      } else if(type==='NatureInvoice'){
          searchForm.oldInvoiceId='';
          this.alertTableData=[];
          this.editTableData=[];
          this.alertTableDataSelect=[];
      }

      this.searchForm=searchForm;
    },

    oldInvoiceIdChange(value){
      findFinaPurchaseInvoice({
        finaPurchaseInvoiceId:value
      }).then(res=>{
        if(res.success){
           let data=res.data&&res.data.finaPurchaseInvoiceDetailBOList||[]
           this.editTableData=data.map(v=>{
              let json=v;
              json.inPrice=v.taxPrice;
              json.taxRate=v.taxRate/100;
              json.maxNum=v.invoiceQty||0;
              return json;
           });
        }
      }).catch(err=>{

      })
    },

    clickDialogVisible(){
      let {contractNo,busiBillNo}=this.searchForm;
      if(!contractNo||!busiBillNo){
         this.$message.error('请先选择订单');
         return ''
      }
       this.dialogVisible=true;
      queryInWarehouseBillDetailList({
        busiBillNo,contractNo
      }).then(res=>{ 
        if(res.success){
          let data=res.data||[];
          this.alertTableData=data.filter(v=>v.realInQty).map(v=>{
            let json=v;
            json.taxRate=v.taxRate/100;
            json.billDetailId=v.busiBillNo;
            json.maxNum=v.invoiceQty||0;
            json.invoiceQty=isNaN(v.invoicedQty)?v.realInQty:v.realInQty-v.invoicedQty
            return json;
          });;
        }
        this.loading=false;
      }).catch(err=>{
        this.loading=false; 
      });

    },

    busiBillNoChange(busiBillNo,contractNo){
      this.loading=true;
      let searchForm= _.cloneDeep(this.searchForm);
      searchForm.contractNo=contractNo;
      this.searchForm=searchForm;
    },

    handleSelectionChange(value){
      this.alertTableDataSelect=value;
    },

    handleDelete(index,row){
     this.useWatch=true;
     let data= _.cloneDeep(this.editTableData);
     data.splice(index,1);
     this.editTableData=data;
    },


    handleSuccess(){
      this.useWatch=true;
      this.dialogVisible=false;
      this.editTableData=this.alertTableDataSelect;
    },

    submit(type,value){
      let saveApi=saveFinaPurchaseInvoice;
      let { finaPurchaseInvoiceId }=this.$route.query||{};
      let data={...this.searchForm,...value };
      let json={};
      for(let i in data){
        if(data[i]!==''){
          json[i]=data[i]
        }
      }
      json.invoiceTaxAmt=Number(this.searchForm.invoiceTaxAmt);
      json.invoiceAmt=Number(this.searchForm.invoiceAmt);
      json.arriveDate=moment(json.arriveDate).valueOf()
      json.makeDate=moment(json.makeDate).valueOf()
      if(finaPurchaseInvoiceId){
         let idArr=this.editTableData.map(v=>Number(v.billDetailId)); 
         let localIdArr= this.localTableData.map(v=>Number(v.billDetailId));
         let submitTable=[];
         this.editTableData.forEach(item=>{
           if(localIdArr.includes(item.billDetailId)){
             item.operateFlag=1;
           } else{
             item.operateFlag=0;
           }
            submitTable.push(item)
          })

         this.localTableData.forEach(item=>{
           if(!idArr.includes(item.billDetailId)){
              item.operateFlag=2;
              submitTable.push(item)
           }
         })
       json.id=finaPurchaseInvoiceId;
       json.finaPurchaseInvoiceDetailBOList=submitTable;
       saveApi=updateFinaPurchaseInvoice;
      } else{
         json.finaPurchaseInvoiceDetailBOList=this.editTableData;
      }
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if(type==='save'){
        saveApi(json).then(res=>{
          this.$confirm('操作成功！', '提示', {
            confirmButtonText: '详情',
            cancelButtonText: '关闭',
            type: 'success'
          }).then(
            _ => {
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:'/invoice/entryInvoice/registrationDetail',
                    query:{ finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data}
                  })
              }).catch(err=>{ 
                console.log(err)
              })
            }).catch(err=>{
              console.log(err)
            })
          }).catch(err=>{
             console.log(err) 
        })
      } else if(type==='submit') {
         saveApi(json).then(res=>{
           if(res.success){
              commitFinaPurchaseInvoice({
                finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data
              }).then(result=>{
                  this.$confirm('操作成功！', '提示', {
                    confirmButtonText: '详情',
                    cancelButtonText: '关闭',
                    type: 'success'
                 }).then( _ => {
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path:'/invoice/entryInvoice/registrationDetail',
                          query:{ finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data}
                        })
                      }).catch(err=>{
                         console.log(err)
                      })
                 }).catch(err=>{
                     console.log(err)
                 })
              }).catch(err=>{
                    console.log(err)
              })
           } else{
             this.$message.error('保存失败');
           }
         }).catch(err=>{
            console.log(err)
         }) 
      } 
  },

    goeditrow(index,type){
      if(type==='确定'){
        this.useWatch=true;
      }
      let data= _.cloneDeep(this.editTableData);
      data[index].edit=!data[index].edit;
      this.editTableData=data;
    },
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

