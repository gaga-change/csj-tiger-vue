<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm" :disabled="disabled"      @propsChange="propsChange"  @oldInvoiceIdChange="oldInvoiceIdChange"  @busiBillNoChange="busiBillNoChange" 
     @asInvoiceAmtChange="asInvoiceAmtChange" 
     @asInvoiceTaxAmtChange="asInvoiceTaxAmtChange" 
     @submit="this.submit"   :isDisplaySubmit="false"  ></search-invoice>
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
       <div style="display:flex;align-items: center;margin-bottom:12px">
           <span style="font-size:14px;padding-right:10px">商品名称 :</span>
           <el-input type="text" size="small" style="width:200px;margin-right:12px" v-model.trim="alertSkuName"  @keyup.enter.native="alertSeach"  ></el-input> 
           <el-button type="primary" size="small" @click="alertSeach"> 查询</el-button>
           <el-button type="primary" size="small" style="margin-right:12px" @click="()=>{this.alertSkuName='';this.alertSeach()}"> 重置</el-button>
       </div>
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
import { saveFinaPurchaseInvoice ,queryInWarehouseBillDetailList,commitFinaPurchaseInvoice ,findFinaPurchaseInvoice,updateFinaPurchaseInvoice} from '@/api/void'
import { addAlertTableConfig } from './components/config';
import _  from 'lodash';
import moment from 'moment';
import { mapGetters } from 'vuex'

export default {
  name:'registrationAdd',
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

        asInvoiceAmt:'',
        asInvoiceTaxAmt:'',

        makeDate:'',
        arriveDate:'',
        oldInvoiceId:'',
        contractNo:''
      },
      dialogVisible:false,
      alertlocalTableData:[],
      alertTableData:[],
      alertTableDataSelect:[],
      editTableData:[],
      localTableData:[],
      addAlertTableConfig,
      loading:false,
      useWatch:false,

      busiBillNo:'',
      disabled:false,
      alertSkuName:''
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
              return a+b.invoiceQty*b.incomingUnitPrice
            },0);
            
            this.searchForm.invoiceAmt=invoiceAmt;
            this.searchForm.asInvoiceAmt=Number(invoiceAmt).toFixed(2);
          

            let invoiceTaxAmt=val.reduce(function(a,b){
               return a+(b.invoiceQty*b.incomingUnitPrice)/(1+b.taxRate)*b.taxRate
            },0);

            this.searchForm.invoiceTaxAmt=invoiceTaxAmt;
            this.searchForm.asInvoiceTaxAmt=Number(invoiceTaxAmt).toFixed(2);

          }
        },
        deep: true
      } ,
    },

    mounted(){
      this.onLoad()
    },

    // activated(){
    //   this.onLoad()
    // },

  methods:{

    onLoad(){
      let { finaPurchaseInvoiceId }=this.$route.query||{};
       if(finaPurchaseInvoiceId){
         findFinaPurchaseInvoice({
            finaPurchaseInvoiceId
         }).then(res=>{
          if(res.success){
            for(let i in this.searchForm){
              this.searchForm[i]=res.data&&res.data[i]
            };
            this.searchForm['asInvoiceAmt']=Number(this.searchForm['invoiceAmt']).toFixed(2);
            this.searchForm['asInvoiceTaxAmt']=Number(this.searchForm['invoiceTaxAmt']).toFixed(2);
            

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

    
    alertSeach(value){
      this.alertTableData= this.alertlocalTableData.filter(v=>v.skuName.includes(this.alertSkuName))
    },

    asInvoiceAmtChange(){
      this.searchForm.invoiceAmt=this.searchForm.asInvoiceAmt;
    },

    asInvoiceTaxAmtChange(){
      this.searchForm.invoiceTaxAmt=this.searchForm.asInvoiceTaxAmt;
    },

    propsChange(type){
      let searchForm= _.cloneDeep(this.searchForm);
      if(type==='providerCode'){
         
         searchForm.busiBillNo='';
          searchForm.oldInvoiceId='';
      } else if(type==='busiBillNo'){

          searchForm.oldInvoiceId='';
      } else if(type==='NatureInvoice'){

          searchForm.oldInvoiceId='';
      }

       this.alertlocalTableData=[];
       this.alertTableData=[];
       this.editTableData=[];
       this.alertTableDataSelect=[];
       this.alertSkuName=''

      this.searchForm=searchForm;
    },

    oldInvoiceIdChange(value){
      this.useWatch=true;
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
      if(!busiBillNo){
         this.$message.error('请先选择订单');
         return ''
      }
       this.dialogVisible=true;
       if(busiBillNo===this.busiBillNo){
          return ''
       }
      queryInWarehouseBillDetailList({
        busiBillNo,contractNo
      }).then(res=>{ 
        if(res.success){
          this.busiBillNo=busiBillNo;
          let data=res.data||[];
          this.alertlocalTableData=data.filter(v=>v.realInQty&&v.realInQty>v.invoicedQty).map(v=>{
            let json=v;
            json.taxRate=v.taxRate/100;
            json.billDetailId=v.busiBillNo;
            json.maxNum=v.invoiceQty||0;
            json.incomingUnitPrice=v.inPrice;
            json.invoiceQty=isNaN(v.invoicedQty)?v.realInQty:v.realInQty-v.invoicedQty
            return json;
          });;
          this.alertSkuName=''
          this.alertTableData=  _.cloneDeep(this.alertlocalTableData)
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
      let data= _.cloneDeep(this.editTableData);
      let busiBillNoArr=data.map(v=>v.busiBillNo);
      this.alertTableDataSelect.forEach(v=>{
         if(!busiBillNoArr.includes(v.busiBillNo)){
           data.push(v)
         }
      })
      this.editTableData=data;  
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
      json.makeDate=moment(json.makeDate).valueOf();

      this.editTableData=this.editTableData.map(v=>{
        let json=v;
        json.invoiceQty=Number(json.invoiceQty);
        return json;
      })

       if(this.editTableData.length===0){
        this.$message.error('请先选择明细');
        return ''
      }

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
          if(res.success){
              this.disabled=true;
              this.$message({
                type:'success',
                message:'操作成功,1.5s后跳往详情页',
                duration:1500,
                onClose:()=>{
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      path:'/invoice/entryInvoice/registrationDetail',
                      query:{ finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data}
                    })
                  }).catch(err=>{ 
                    console.log(err)
                  })
                }
              })
      
          } else{
             this.$message.error('操作失败');
          }

        })
      } else if(type==='submit') {
         saveApi(json).then(res=>{
           if(res.success){
              commitFinaPurchaseInvoice({
                finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data
              }).then(result=>{
                if(res.success){
                  this.disabled=true;
                  this.$message({
                    type:'success',
                    message:'操作成功,1.5s后跳往详情页',
                    duration:1500,
                    onClose:()=>{
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path:'/invoice/entryInvoice/registrationDetail',
                          query:{ finaPurchaseInvoiceId:finaPurchaseInvoiceId?finaPurchaseInvoiceId:res.data}
                        })
                      }).catch(err=>{
                        console.log(err)
                      })  
                    }
                  })
                } else{
                   this.$message.error('操作失败');
                }
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

