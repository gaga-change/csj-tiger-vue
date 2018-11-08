<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">  
       <el-button  style="margin-left: 10px;" v-if="cardData.ticketStatus == 1" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">分配业务员提交 
        </el-button>  
        <!-- <template v-if="cardData.ticketStatus == 3">
          <el-button  style="margin-left: 10px;" type="success" size="small" :disabled="buttonDisabled||!$haspermission('salesinvoicebilling')"
              @click="goToBilling">修改财务开票
          </el-button>
          <el-button  style="margin-left: 10px;" size="small" type="success" :disabled="buttonDisabled||!$haspermission('salesinvoicecheckreview')"
              @click="()=>{this.buttonDisabled=true;Modify(4)}" >复核
          </el-button>
        </template> -->
  </sticky>
    <invoice-detail :cardData="cardData"  
    :detailtableConfig="detailtableConfigDetail"
    :tableData="finaSaleInvoiceDetailDOList"  :name="name"/>
      <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.ticketStatus == 1">
      <el-form :model="searchForm" label-width="100px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="分配业务员" >
            <el-input type="text" size="small" v-model="searchForm.username" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
     </el-card>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getsalesman } from '@/api/receipt'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig } from '../components/config';
    const name = "register"
    const detailtableConfigDetail = []
       
        detailtableConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            detailtableConfigDetail.push(item)
          }
        })

    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardData:{},
          finaSaleInvoiceDetailDOList:[],
          detailtableConfig:detailtableConfigDetail,
          name,
          searchForm:{
            name:''
          }
        }
      },

     created(){
      this.getCurrentTableData();  
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      Modify,
      salesman(){
        if(this.searchForm.name){
          this.buttonDisabled = true
          getsalesman({id:this.cardData.id,username:this.searchForm.name}).then((res)=>{
              if(res.success){
                this.$message({type:'success',message:'关联业务员成功',duration:2000})
                
              }
              this.needfresh();
          }).catch(err=>{
            this.$message({type:'error',message:'关联业务员失败',duration:2000})
            this.needfresh();
          })
        }else{
          this.$message({type:'info',message:'请输入业余员姓名',duration:2000})
        }
        
      },
      goToBilling(){
        this.$router.push({
          path:`/invoice/outputinvoice/invoiceapply/billing?id=${this.$route.query.id}`,
        })
      },
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
      linkToInvoice(){
          this.$confirm('去新建发票页创建', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
       this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?id=${this.$route.query.id}&from=copy`,
          })
     }).catch(err => {
        this.$message({
          type: 'warn',
          message: '审核失败!'
        })
      })
         
      },
      getCurrentTableData(){
        this.loading=true;
       getSalesInvoiceDetails({id:this.$route.query.id}).then(res=>{
       if(res.success){
          let data=res.data;
          
          
          this.tableData=data.list||[];
          this.finaSaleInvoiceDetailDOList = res.data && res.data.finaSaleInvoiceDetailDOList || []
          this.cardData = res.data
          
          this.cardData.finaSaleInvoiceDetailDOList = []
        
       }
        this.loading=false;

     }).catch(err=>{
         this.loading=false;
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

