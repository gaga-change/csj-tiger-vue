<template>
<div>
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.paymentStatus == 4">
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="saveOrder">保存
        </el-button>
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="saveOrder">提交
        </el-button>
      </template> 
      <template v-else-if="true||$route.query.from=='needWork'">
         <template v-if="/(5)/.test(cardData.paymentStatus)">
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
            @click="Modify('payCheck')">审核
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
              @click="Modify('payReject')">驳回
          </el-button>  
        </template>
      </template>
      <el-tag v-else>
        暂无操作
      </el-tag>
  </sticky>

   <invoice-detail :cardData="cardData"  
    :tableData="[]"  :name="name">
    <item-title text="实付信息"/>
    <template v-if="cardData.paymentStatus == 4&&$route.query.from=='needWork'">
      <el-row :gutter="10">
        <el-card class="simpleCard" shadow="never" body-style="padding:12px">
          <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="60px" label-postion="left">
             <el-col :span="8">
              <el-form-item label="付款日期" prop="applyPaymentDate">
                <el-date-picker
                  v-model="ruleForm.applyPaymentDate"
                  type="date"
                  size="small"
                  placeholder="付款日期"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
               <el-col :span="6">
              <el-form-item label="结算方式" prop="paymentMode">
                <el-select v-model="ruleForm.paymentMode" size="small" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search">
                  <el-option
                    v-for="item in PaymentModeEnumFilter"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="货款金额" >
                <el-input type="text" v-model="ruleForm.applyPaymentAmt" disabled size="small" placeholder="货款金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贴息">
                <el-input v-model="ruleForm.realInterestAmt" size="small" ></el-input>
              </el-form-item>
            </el-col>
         
            <el-col :span="6">
              <el-form-item label="实付金额" >
                <el-input type="text" size="small" disabled v-model="ruleForm.realPaymentAmt" ></el-input>
              </el-form-item>
            </el-col>
           
            <el-col :span="6" >
              <el-form-item label="备注">
                <el-input type="textarea" size="small" v-model="ruleForm.remarkInfo"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6" >
              <el-form-item label="交易流水号">
                <el-input type="text" size="small" v-model="ruleForm.paymentRecordNo" ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
      </el-row>
    </template>
    <tempalte >
      <item-card :config="cardConfig" :loading="loading"   :cardData="cardData"  />
    </tempalte>
 
    </invoice-detail>
    </div>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum } from '@/utils/enum'
    const name = "apply"
   
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
          rules: {
             applyPaymentDate: [
            { required: true, message: '请选择付款日期', trigger: 'change' }
            ],
            paymentMode: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
            ],
          },
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardConfig:[],
          cardData:{},
          ruleForm:{
            applyPaymentDate:'',//付款日期
            paymentMode:'',//结算方式,
            applyPaymentAmt:'',//货款金额
            realPaymentAmt:'',//实付金额
            realInterestAmt:'',//贴息
            remarkInfo:'',//备注
            paymentRecordNo:'',//交易流水号
          },
          editable:false,//区分提交和编辑
          name,
          searchForm,
          realPayInfoConfig,
        }
      },

     created(){
       let cardConfig =[];
      realPayInfoConfig.map(item=>{
        if(item.prop=='realPay'){
          item.dom = this.formatter('realPay')
        }
        cardConfig.push(item)
      })
      this.cardConfig = cardConfig
      this.getCurrentTableData();  
      
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      Modify,
      editReal(){
        this.editable = true
      },
      formatter(type,value){
            switch(type){
              case 'realPay': return  (row, column, cellValue, index)=>{
                
                return ((row.realPaymentAmt||0)-(row.realInterestAmt||0)).toFixed(2)
              };
              default:return value
            }
         
      },
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
      saveOrder(){

      },
      getCurrentTableData(){
        this.loading=true;
        getPaymentListAndDetail({id:this.$route.query.id}).then(res=>{
          if(res.success){
           
              this.cardData = res.list[0]
              let fileInfos = res.list[0].fileInfos || {}
              fileInfos.map(item=>{
                if(item.url){
                  item.path = item.url//itemCard组件，文件下载的参数为path
                }
                
              })
              this.cardData.fileInfos = fileInfos
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


