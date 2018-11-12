<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.relationStatus == 1">
         <el-button v-if="submitForm.moneyState===0" style="margin-left: 10px;" size="small" v-loading="buttonDisabled" type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')"
            @click="choosesalesman()">关联业务单
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
            @click="saveOrder(0,'submitForm')">业务单保存
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
            @click="saveOrder(1,'submitForm')">保存并提交
        </el-button>
      </template> 
      <template v-else-if="cardData.relationStatus == 2">
        <template v-if="!editable">
          <el-button  style="margin-left: 10px;" size="small"  type="primary"  :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
              @click="()=>{this.editable = true}">编辑
          </el-button>  
           <el-button  style="margin-left: 10px;" size="small"  type="primary"  :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
              @click="saveOrderSubmit">提交
          </el-button>  
        </template>
        <template v-else>
            <el-button v-if="submitForm.moneyState===0" style="margin-left: 10px;" size="small" v-loading="buttonDisabled" type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')"
            @click="choosesalesman()">关联业务单
          </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
              @click="saveOrder(0,'submitForm')">业务单保存
          </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
              @click="saveOrder(1,'submitForm')">保存并提交
          </el-button>
        </template>
      </template> 
     
      <template v-else-if="cardData.relationStatus == 3">
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('receiptRelateCheck')" v-loading="buttonDisabled"
            @click="Modify('RelateCheck')">审核
          </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('receiptRelateCheck')" v-loading="buttonDisabled"
              @click="Modify('RelateReject')">驳回
          </el-button>  
        </template>
         <template  v-else-if="cardData.relationStatus == 5">
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
            @click="choosesalesman()">关联业务单
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
            @click="saveOrder(0,'submitForm')">业务单保存
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('receiptRelateOrder')" v-loading="buttonDisabled"
            @click="saveOrder(1,'submitForm')">业务单提交
        </el-button>  
      </template>
       <el-button  style="margin-left: 10px;" v-else-if="cardData.relationStatus == 4" size="small"  :disabled="buttonDisabled||!$haspermission('receiptRelateCheck')" v-loading="buttonDisabled"
            @click="makeInvalid">作废 
        </el-button>  
        <el-tag v-else>
          暂无操作
        </el-tag>
  </sticky>
    <invoice-detail :cardData="cardData"  
    :detailtableConfig="detailtableConfigDetail"
    :tableData="relateOrderData"  :name="name"/>
     <el-form :model="submitForm" :rules="submitRules" ref="submitForm"  v-if="cardData.relationStatus==1||cardData.relationStatus==2||cardData.relationStatus==5" label-width="100px" label-position="left">
      <el-row :gutter="10">
         <el-col :span="6">
          <el-form-item label="款项性质" prop="moneyState">
            <el-select v-model="submitForm.moneyState" :disabled="!editable" size="small" filterable clearable placeholder="款项性质" prefix-icon="el-icon-search" >
              <el-option
                v-for="item in MoneyStateEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="款项类型" prop="moneyType">
            <el-select v-model="submitForm.moneyType" :disabled="!editable" size="small" filterable  clearable placeholder="款项类型" prefix-icon="el-icon-search">
              <el-option
                v-for="item in MoneyTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <template v-if="submitForm.moneyState===0">
           <el-col :span="6">
          <el-form-item label="货款合计">
           <span>{{totalLoan}}</span>
          </el-form-item>
        </el-col>
          <el-col :span="6">
          <el-form-item label="贴息合计">
           <span>{{totalDiscount}}</span>
          </el-form-item>
        </el-col>
        </template>	
      </el-row>
      </el-form>
       <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.relationStatus==5">
      <el-form  label-width="120px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="上次审核/驳回建议：" >
            <span>{{cardData.relationApproveInfo}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
     </el-card>
      <el-table
          :data="relateOrderData"
          v-if="submitForm.moneyState===0&&(cardData.relationStatus==1||cardData.relationStatus==2||cardData.relationStatus==5)"
          size="small"
          v-loading="loading"  
          max-height="600">
          <el-table-column
            label="订单ID"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="订单编号"
            width="120"
            prop="busiBillNo" >
          </el-table-column>
          <el-table-column
            label="订单金额"
             prop="orderAmt">
          </el-table-column>
          <el-table-column
            label="签收数量"
            prop="signQty">
          </el-table-column>
          <el-table-column
            label="签收金额"
            prop="signAmt">
          </el-table-column>
          <el-table-column
            label="已开票货款"
            prop="invoicedAmt">
          </el-table-column>
          <el-table-column
            label="本次收到货款"
            width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input-number 
                  size="mini"  
                  :min="0" 
                  style="width:100px"
                   v-model="scope.row.payableAmt" >
                </el-input-number>
              </template>
              <span v-else>
                {{scope.row.payableAmt}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="本次收到贴息"
            width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit&&editable">
                <el-input-number 
                  :min="0" 
                  size="mini"
                  style="width:100px"
                   v-model="scope.row.interestAmt" >
                </el-input-number>
              </template>
              <span v-else>
                {{scope.row.interestAmt}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope" v-if="editable">
              <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
              <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-dialog
          title="订单选择"
          :visible.sync="showDetails"
          width="60%"
          :before-close="handleClose">
          <el-form v-model="searchForm" label-width="60px">
            <el-row :gutter="20">
               <el-col :span="9">
                <el-form-item label="订单编号" >
                  <el-input type="text" size="small" v-model="searchForm.busiBillNo" ></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="9">
                <el-form-item label="合同编号" >
                  <el-input type="text" size="small" v-model="searchForm.contractNo" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button @click="searchOrder" size="small" :span="3" type="primary">查询</el-button>
              </el-col>
              <el-col :span="3">
                <el-button @click="searchReset" size="small" :span="3" type="primary">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
          :data="filterOrderTableData"
          size="small"
          v-loading="loading"  
          @selection-change="handleSelectionChange"
          max-height="300">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column
              label="订单ID"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              label="订单编号"
              width="120"
              prop="busiBillNo" >
            </el-table-column>
             <el-table-column
              label="合同编号"
              prop="contractNo" >
            </el-table-column>
            <el-table-column
              label="订单金额"
              prop="orderAmt">
            </el-table-column>
            <el-table-column
              label="签收数量"
              prop="signQty">
            </el-table-column>
            <el-table-column
              label="签收金额"
              prop="signAmt">
            </el-table-column>
            <el-table-column
              label="已开票货款"
              prop="invoicedAmt">
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDetails = false">关闭</el-button>
          </span>
       </el-dialog>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getReceiptDetail,getReceiptBusiOrder,receiptRelateOrderApi,receiptInvalidate,receiptRelateOrderSubmitApi } from '@/api/receipt'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum } from '@/utils/enum'
    const name = "associate"
    const detailtableConfigDetail = []
       
        detailtableConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            detailtableConfigDetail.push(item)
          }
        })
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
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
          editable:true,//区分提交和编辑
          detailtableConfigDetail,
          name,
          searchForm,
          relateOrderData:[],
          relateOrderArr:[],
          showDetails:false,
          submitForm:{
            moneyState:'',
            moneyType:''
          },
          submitRules:{
            moneyState: [
            { required: true, message: '请选择款项性质', trigger: 'change' }
            ],
            moneyType: [
            { required: true, message: '请选择款项类型', trigger: 'change' }
            ],
          },
          orderTableData:[],
          filterOrderTableData:[],
          MoneyStateEnum,
          MoneyTypeEnum,
          multipleSelection:[],//选择的订单
        }
      },

     created(){
      this.getCurrentTableData();  
      this.getAllBusiOrder()
    },

    computed: {
      totalLoan:{
       
        get () {
           let total=0;
            this.relateOrderData.map(item=>{
              total += Number(item.payableAmt)
            })
            return (total).toFixed(2)
        },
        set (value) {
          return value
        }
      },
       totalDiscount:{
       
         get () {
            let total=0;
        this.relateOrderData.map(item=>{
          total += Number(item.interestAmt)
        })
        return (total).toFixed(2)
        },
        set (value) {
          return value
        }
      },
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      Modify,
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(val,'val');
        
        let relateOrderArr = [],relateOrderData = []
        val.map(item=>{
          if(this.relateOrderArr.indexOf(item.id)==-1){
            this.relateOrderArr.push(item.id)
            this.relateOrderData.push(item)
          }
          // relateOrderArr.push(item.id)
        }) 
        // this.relateOrderArr = [...relateOrderArr]
        // this.relateOrderData = [...val]   跟随选择框删除
      },
      choosesalesman(){
        this.showDetails = true
      },
      makeInvalid(){
        this.$confirm('作废该单据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({val}) => {
            receiptInvalidate({id:this.$route.query.id}).then(res=>{
              if(res.success){
                this.$message({type:'success',message:'作废成功'})
                this.needfresh()
              }else{
                this.$message({type:'error',message:'作废失败'})
                this.buttonDisabled = false
              }
              
            }).catch(()=>{
              this.$message({type:'error',message:'作废失败'})
              
              this.buttonDisabled = false
            })
        })
      },
      handleClose(){
        this.showDetails = false
      },
      saveOrder(type,formName){//业务单保存提交
        
        this.$refs[formName].validate((valid) => {
            if (valid) {
              
              let params = {}
              
              if(type){
                params.isSubmit = true
              }else{
                params.isSubmit = false
              }
              if(this.submitForm.moneyState ===0){
                params.orderRelationVoList = [...this.relateOrderData]
                if(this.totalLoan-this.totalDiscount!==this.cardData.paymentAmt){
                  this.$message({type:'error',message:'贷款合计减去贴息合计必须等于金额'})
                  return false
                }
              }
              params.moneyState = this.submitForm.moneyState
              params.moneyType = this.submitForm.moneyType
              params.id = this.$route.query.id
              receiptRelateOrderApi(params).then(res=>{
                if(res.success){
                  this.$message({type:'success',message:'关联订单成功'})
                  this.needfresh()
                }else{
                  this.$message({type:'error',message:'关联订单失败'})
                   this.buttonDisabled = false
                }
               
              }).catch(err=>{
                
                  this.$message({type:'error',message:'关联订单失败'})
                
                 this.buttonDisabled = false
              });
            } else {
              return false;
            }
          });
      },
      saveOrderSubmit(){
        receiptRelateOrderSubmitApi({id:this.$route.query.id}).then(res=>{
              if(res.success){
                this.$message({type:'success',message:'提交成功'})
                this.needfresh()
              }else{
                this.$message({type:'error',message:'提交失败'})
                this.buttonDisabled = false
              }
              
              
        }).catch(()=>{
          this.$message({type:'error',message:'提交失败'})
          this.buttonDisabled = false
        })
      },
      goeditrow(index) {
        let data=[...this.relateOrderData];
        data[index].edit = !data[index].edit
        this.relateOrderData=data;
      },

      handleDelete(index, row) {
        let {modify}=this.$route.query||{};
        this.relateOrderData.splice(index, 1)
        this.relateOrderArr.splice(index, 1)
      },
      searchOrder(){
        this.filterOrderTableData = this.orderTableData.filter(company => {        
          if(company.contractNo&&company.busiBillNo){
            return company.busiBillNo.includes(this.searchForm.busiBillNo) &&  company.contractNo.includes(this.searchForm.contractNo)
          }else if(!company.contractNo){
            if(this.searchForm.contractNo){
              return false
            }
            return company.busiBillNo.includes(this.searchForm.busiBillNo)
          }else if(!company.busiBillNo){
            if(this.searchForm.busiBillNo){
              return false
            }
            return company.contractNo.includes(this.searchForm.contractNo)
          }
        })
      },
      searchReset(){
        this.searchForm = searchForm
        this.filterOrderTableData = [...this.orderTableData]
      },
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
     
      getAllBusiOrder(){
        getReceiptBusiOrder({}).then(res=>{
          this.orderTableData = res.data
          this.filterOrderTableData = res.data
        })
      },
      getCurrentTableData(){
        this.loading=true;
        getReceiptDetail(this.$route.query.id).then(res=>{
          if(res.success){
              let data=res.data;
              this.relateOrderData = res.data && res.data.relationVos || []
              this.relateOrderArr = [];
              this.relateOrderData.map(item=>{
                this.relateOrderArr.push(item.id)
              })
              this.cardData = res.data.finaReceiveDO
              let fileInfos = res.data.fileInfos || {}
              fileInfos.map(item=>{
                if(item.url){
                  item.path = item.url//itemCard组件，文件下载的参数为path
                }
                
              })
              this.cardData.fileInfos = fileInfos
              let { moneyState, moneyType } = {moneyState:0,moneyType:0};
              this.submitForm.moneyState = this.cardData.moneyState == 99 ? '': this.cardData.moneyState
              this.submitForm.moneyType = this.cardData.moneyType == 99 ? '': this.cardData.moneyType
              if(res.data.relationVos&&res.data.relationVos.length>0){
                this.relateOrderData = []
                let relationVos = [...res.data.relationVos]
                this.relateOrderArr =[]
                let totalLoan=0,totalDiscount=0;
                relationVos.map(item=>{
                  this.relateOrderArr.push(item.id)
                  item.payableAmt =Number(item.payableAmt)||0
                  item.interestAmt =Number(item.interestAmt)||0
                  totalLoan+=item.payableAmt
                  totalDiscount+=item.interestAmt
                  this.relateOrderData.push(item)
                })
                this.totalLoan = totalLoan
                this.totalDiscount = totalDiscount
              }
              if(this.cardData.relationStatus==2){this.editable = false}
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

