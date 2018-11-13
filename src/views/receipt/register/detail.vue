<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.approveStatus == 0">
         <el-button  style="margin-left: 10px;" size="small"   type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')"
         v-loading="buttonDisabled"
            @click="linkToCreate('rebulid')">编辑
        </el-button>
         <el-button  style="margin-left: 10px;" size="small" type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="submitReceipt()">提交
        </el-button>  
      </template> 
      <template v-else-if="cardData.approveStatus == 1">
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission ('receiptFinaCheck')" v-loading="buttonDisabled"
            @click="Modify('FinaCheck')">审核
          </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  type="warning" :disabled="buttonDisabled||!$haspermission('receiptFinaCheck')" v-loading="buttonDisabled"
              @click="Modify('FinaReject')">驳回
          </el-button>  
        </template>
       <el-button  style="margin-left: 10px;" v-else-if="cardData.approveStatus == 2 && cardData.relationStatus==0" size="small" type="primary"  :disabled="buttonDisabled||!$haspermission('receiptSalesman')" v-loading="buttonDisabled"
            @click="salesman()">提交 
        </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  v-else-if="cardData.approveStatus==3" type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="linkToCreate('rebulid')">编辑
        </el-button>  
        <el-tag v-else>
          暂无操作
        </el-tag>
  </sticky>
    <invoice-detail :cardData="cardData"  
    :detailtableConfig="detailtableConfigDetail"
    :tableData="relateOrderData"  :name="name"/>
      <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.approveStatus==2&&cardData.relationStatus==0">
      <el-form :model="searchForm" :rule="rules" label-width="100px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="分配业务员" prop="username">
            <el-input type="text" size="small" v-model="searchForm.username" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
     </el-card>
      <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.approveStatus==3">
      <el-form  label-width="140px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="上次审核/驳回建议：" >
            <span>{{cardData.approveInfo}}</span>
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
    import { relateSalesMan, getReceiptDetail,receiptFinaSubmit } from '@/api/receipt'
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
          // rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          relateOrderData:[],
          cardData:{},
          finaSaleInvoiceDetailDOList:[],
          detailtableConfigDetail,
          name,
          searchForm:{
            name:''
          },
          rules:{
             username: [
            { required: true, message: '请输入业务员', trigger: 'blur' }
          ],
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
      submitReceipt(){
        this.buttonDisabled = true
        receiptFinaSubmit({id:this.$route.query.id}).then(res=>{
          if(res.success){
            this.$message({type:'success',message:'提交成功',duration:2000})
            
          }
          this.needfresh()
        }).catch(_=>{
          this.needfresh()
        })
      },
      salesman(){
        if(this.searchForm.username){
          this.buttonDisabled = true
          relateSalesMan({id:this.cardData.id,username:this.searchForm.username}).then((res)=>{
              if(res.success){
                this.$message({type:'success',message:'关联业务员成功',duration:2000})
                
              }
              this.needfresh();
          }).catch(err=>{
            this.$message({type:'error',message:'关联业务员失败',duration:2000})
            this.needfresh();
          })
        }else{
          this.$message({type:'info',message:'请输入业务员姓名',duration:2000})
        }
        
      },
      needfresh() {
        this.getCurrentTableData()
      },
      linkToCreate(type){
        this.$confirm('去新建收款页修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
        this.$router.push({
              path:`/receipt/newreceipt?id=${this.$route.query.id}&from=rebuild`,
            })
        })
         
      },
      getCurrentTableData(){
        this.loading=true;
        getReceiptDetail(this.$route.query.id).then(res=>{
          if(res.success){
              let data=res.data;
              this.tableData=data.list||[];
              this.relateOrderData = res.data && res.data.relationVos || []
              this.cardData = res.data.finaReceiveDO
              this.cardData.fileInfos = res.data.fileInfos
          }
          this.loading=false;
          this.buttonDisabled = false
        }).catch(err=>{
            this.loading=false;
            this.buttonDisabled = false
        })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

