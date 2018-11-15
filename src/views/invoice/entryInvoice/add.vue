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
      title="选择发票商品明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">

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
import { saveFinaPurchaseInvoice ,queryInWarehouseBillDetailList,commitFinaPurchaseInvoice,queryListByFinaPurchaseInvoiceReq } from '@/api/void/list'
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
      addAlertTableConfig,
      
    }
  },

    computed: {
      ...mapGetters({
        visitedViews: 'visitedViews',
      }),
    },

  methods:{
  
    busiBillNoChange(busiBillNo,contractNo){
    
      queryInWarehouseBillDetailList({
        busiBillNo,contractNo
      }).then(res=>{
        if(res.success){
          this.alertTableData=res.data.map(v=>{
            let json=v;
            json.taxRate=v.taxRate/100;
            json.billDetailId=v.busiBillNo;
            json.invoiceQty=isNaN(v.invoicedQty)?v.realInQty:v.realInQty-v.invoicedQty
            return json;
          });;
        }
      }).catch(err=>{

      });

      queryListByFinaPurchaseInvoiceReq({
         busiBillNo:busiBillNo
      }).then(res=>{
        if(res.success){
           console.log(res)
        }
      }).catch(err=>{

      })
    },

    handleSelectionChange(value){
      let idArr=this.alertTableDataSelect.map(v=>v.busiBillNo);
      this.alertTableDataSelect=[...this.alertTableDataSelect,...value.filter(v=>!idArr.includes(v.busiBillNo))];
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
      json.finaPurchaseInvoiceDetailBOList=this.editTableData;
      
      //以下为测试数据
      json.providerCode='EP201810250001'
       //以上为测试数据

      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if(type==='save'){
        saveFinaPurchaseInvoice(json).then(res=>{
          this.$confirm('操作成功！', '提示', {
            confirmButtonText: '详情',
            cancelButtonText: '关闭',
            type: 'success'
          }).then(
            _ => {
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:'/invoice/entryInvoice/registrationDetail',
                    query:{ finaPurchaseInvoiceId:res.data}
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
         saveFinaPurchaseInvoice(json).then(res=>{
           if(res.success){
              commitFinaPurchaseInvoice({
                finaPurchaseInvoiceId:res.data
              }).then(result=>{
                  this.$confirm('操作成功！', '提示', {
                    confirmButtonText: '详情',
                    cancelButtonText: '关闭',
                    type: 'success'
                 }).then( _ => {
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path:'/invoice/entryInvoice/registrationDetail',
                          query:{ finaPurchaseInvoiceId:res.data}
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

