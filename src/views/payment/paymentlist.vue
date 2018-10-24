<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:15px;">
      <template>
        <el-button style="margin-left: 10px;" type="primary"  @click="Export" :loading="downloadLoading" :disabled="downloadLoading">导出列表</el-button>
      </template>
    </sticky>

    <el-form :model="ruleForm" ref="ruleForm" label-width="80px" label-position="left" style="text-align:left">
    <el-card class="simpleCard" body-style="padding:12px" shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款单号" prop="ticketno">
            <el-input type="text" size="small" v-model="ruleForm.ticketno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="来源单号" prop="purchorder">
            <el-input type="text" size="small" v-model="ruleForm.purchorder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" filterable size="small" clearable placeholder="请搜索或选择" prefix-icon="el-icon-search">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款方" prop="receivables">
            <el-select v-model="ruleForm.receivables" filterable size="small" clearable placeholder="请选择供应商" prefix-icon="el-icon-search">
              <el-option
                v-for="item in gridData"
                :key="item.id"
                :label="item.name"
                :value="item.requestid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="款项性质" prop="fundnature">
            <el-select v-model="ruleForm.fundnature" size="small"  filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
              <el-option
                v-for="item in fundnature"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算方式" prop="settlementmethod">
            <el-select v-model="ruleForm.settlementmethod" size="small" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search">
              <el-option
                v-for="item in settlementmethod"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="付款日期" prop="paydate">
            <el-date-picker
              v-model="ruleForm.postpaydate"
              type="datetimerange"
              :editable="false"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="6">
          <el-form-item label="合同编号" prop="contractno">
            <el-input type="text" size="small" style="max-width:200px" v-model="ruleForm.contractno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务板块">
            <el-select v-model="ruleForm.businesstype" size="small" filterable clearable placeholder="请选择" style="width:220px" prefix-icon="el-icon-search" >
              <el-option
                v-for="item in businesstypeData"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label-width="0" class="simpleCardLastLine" >
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
            <el-button @click="onCancel" size="small">重置</el-button>
            </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <div class="itemscont">
         <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="tableConfig"  
      :total="total" 
      :maxTotal="10"
      :summaryMethod="getSummaries"
      :totaldata="totaldata"
      :showSummary="showSummary"
      :pageSize="ruleForm.pagesize"
      :currentPage="ruleForm.pageindex"
      :tableData="tableData"/>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { getPaymentDetail } from '@/api/payment'
  import { mapGetters } from 'vuex'
  import { exportExcel } from '@/utils/exportexcel'
  import { parseTime, SettlementMethod, PayFundnature, BusinessTypeData } from '@/utils'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import BaseTable from '@/components/Table' // table组件

  const ruleForm= {
          createuser: '', // 创建人
          enclosure: '', // 金额
          enterprise: '', // 企业
          enterprisename: '', // 企业名称
          fundnature: '', // 款项性质 1货款 2服务费
          contractno: '', // 合同编号
          memos: '', // 备注
          payamount: '', // 付款金额
          paydate: '', // 付款日期
          payer: '', // 付款企业
          payername: '', // 付款人姓名
          purchorder: '', // 采购单
          receivables: '', // 收款方
          receivablesname: '', // 收款方名称
          settlementmethod: '', // 结算方式 1现金 2银行转账 3银行承兑 4商业承兑
          status: '', // 状态
          postpaydate: [],
          pagesize:10,
          pageindex:1
        }

  export default {
    name: 'paymentlist',
    components: { Sticky, BaseTable },
    data() {
      return {
        excelHeaderKeyValue:{
                'ticketno': '单号',
                'purchorder': '来源采购订单', 
                'contractno': '合同编号',
                'payername': '付款方', 
                'receivablesname': '收款方',
                'paydate': '付款日期', 
                'fundnature': '款项性质', 
                'fundtype': '款项类型', 
                'settlementmethod': '结算方式',
                'payamount': '本次实付金额',
                'interestrate': '现金折扣', 
                'settlementamount':'结算金额', 
                'status': '状态', 
                'businesstype': '业务板块', 
                'checkadvice': '审核结果',
                'createuser': '制单人', 
                'createdate': '制单日期'                     
        },
        showSummary:true,
        ruleForm: ruleForm,
        paymentStatus: [
          {
            name: '货款',
            value: '0'
          },
          {
            name: '服务费',
            value: '1'
          }
        ],
        fundnature: PayFundnature,
        settlementmethod: SettlementMethod,
        businesstypeData: BusinessTypeData,
        list: [],
        pagesize: 10,
        pageindex: 1,
        total: 0,
        currentPage: 1,
        statusList: [
          {
            name: '待审核', value: '0'
          },
          {
            name: '确认通过', value: '1'
          },
          {
            name: '驳回', value: '-2'
          }
        ],
        loading:false,
        currentPostData: {},
        downloadLoading: false,
        tableData:[],
        totaldata:{ amount:0, interestrate:0, payamount:0 },
      }
    },
    computed: {
      ...mapGetters({
        company: 'company',
        companyId: 'companyId',
        userInfo: 'userInfo',
        visitedViews: 'visitedViews',
        revstoreList: 'storeList',
        gridData: 'gysList'
      })
    },
    filters: {
      parseTime
    },
    created() {
       if(this.$route.query.data){
          this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
       this.tableConfig=[
      { label:'单号',prop:'ticketno',dom:this.formatter('linkToPaymentdetail')},
      { label:'来源采购订单',prop:'purchorder',dom:this.formatter('linkToPurchaseorderdetail')},
      { label:'合同编号',prop:'contractno'},
      { label:'付款方',prop:'enterprisename'},
      { label:'收款方',prop:'receivablesname'},
      { label:'付款日期',prop:'paydate',type:'time'},
      { label:'款项性质',prop:'fundnature',dom:this.formatter('fundnatureFilter')},
      { label:'款项类型',prop:'fundtype', dom:this.formatter('fundtypeFilter'),},
      { label:'结算方式',prop:'settlementmethod',dom:this.formatter('settlementmethodFilter')},
      { label:'本次实付金额',prop:'payamount'},
      { label:'现金折扣',prop:'interestrate'},
      { label:'结算金额',prop:'settlementamount'},
      { label:'状态',prop:'status',dom:this.formatter('statusFilter')},
      { label:'业务板块',prop:'businesstype',dom:this.formatter('businesstypeFilter')},
      { label:'审核结果',prop:'checkadvice'},
      { label:'制单人',prop:'createuser'},
      { label:'制单日期',prop:'createdate'}
     ]
      this.getListData()
    },
    activated(){
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
      this.getListData()
    },
    methods: {
      // linnTo(){
      //     return <router-link  to={ name: 'paymentdetailDelivery',
      //     params: {
      //       ticketno: row.ticketno
      //     }} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
      // },
      Export() {
        this.downloadLoading = true
        getPaymentDetail(this.currentPostData).then(res => {
          const exportlist = res.data.data
          exportlist.forEach(item => {
            item.fundnature = this.$options.filters['fundnatureFilter'](item.fundnature)
            item.fundtype = this.$options.filters['fundtypeFilter'](item.fundtype)
            item.settlementmethod = this.$options.filters['settlementmethodFilter'](item.settlementmethod)
            item.businesstype = this.$options.filters['businesstypeFilter'](item.businesstype)
            item.status = this.$options.filters['statusFilter'](item.status)
          })
          let tHeaderKey = Object.keys(this.excelHeaderKeyValue)
          let tHeaderValue = Object.values(this.excelHeaderKeyValue)
          /* 参数{list,tHeader, filterVal} */
          exportExcel({
            list: exportlist,
            tHeader: tHeaderValue,
            filterVal: tHeaderKey
          })
          this.downloadLoading = false
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.downloadLoading = false
        })
      },
        formatter(type,value){
            switch(type){
              case 'fundnatureFilter':return (row, column, cellValue, index)=>{
               return this.$options.filters['fundnatureFilter'](cellValue) 
              };
              case 'fundtypeFilter':return (row, column, cellValue, index)=>{
               return this.$options.filters['fundtypeFilter'](cellValue) 
              };
               case 'settlementmethodFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['settlementmethodFilter'](cellValue) 
              };
               case 'statusFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['statusFilter'](cellValue) 
              };
              case 'businesstypeFilter':return (row, column, cellValue, index)=>{
                return this.$options.filters['businesstypeFilter'](cellValue) 
              };
              case 'linkToPaymentdetail' :return  (row, column, cellValue, index)=>{
              
                let linkTo={
                  path:`/payment/paymentdetail/${row.ticketno}`,
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };
              //  case 'linkToPurchaseorderdetail' :return  (row, column, cellValue, index)=>{
              
              //   let linkTo={
              //     path:`/purchaseorder/purchaseorderdetail/${row.ticketno}`,
              //   }
              //   return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              // };
              default:return value
            }
         
       },
       handleSizeChange(val) {
        this.ruleForm={...this.ruleForm,pagesize:val,pageindex:1}
        this.getListData()
      },

      handleCurrentChange(val) {
        this.ruleForm={...this.ruleForm,pageindex:val}
        this.getListData()
      },
      getListData() {
        const postData = this.ruleForm
        if (postData.postpaydate && postData.postpaydate.length) {
          postData.paystartdate = parseTime(postData.postpaydate[0])
          postData.payenddate = parseTime(postData.postpaydate[1])
          postData.paydate = ''
        }
        const pData = {}
        for (const item of Object.keys(postData)) {
          if (postData[item] !== '') {
            pData[item] = postData[item]
          }
        }
        this.currentPostData = pData
        this.loading = true
         this.$router.replace({
          path:'/payment/paymentlist',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        getPaymentDetail({ ...pData }).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
          const { amount, interestrate, payamount } = res.data
          this.totaldata = { amount, interestrate, payamount }
          this.currentPage = res.data.currentPage
          this.loading = false
          console.log(res)
        }).catch(err => {
          this.loading = false
          console.log(err)
        })

      },
      getSummaries(param) {
        const { columns } = param
        const sums = []
        sums[0] = '合计'
        columns.forEach((column, index) => {
          if (column.label === '结算金额') {
            sums[index] = this.totaldata.amount
          } else if (column.label === '本次实付金额') {
            sums[index] = this.totaldata.payamount
          } else if (column.label === '现金折扣') {
            sums[index] = this.totaldata.interestrate
          }
        })
        return sums
      },
      onSubmit() {
        this.ruleForm.pageindex = 1
        this.getListData()
      },
     
      onCancel() {
        this.ruleForm = ruleForm
        this.getListData()
      }
    }
  }
</script>

<style scoped lang="scss">
  // .el-card__body{
  //   padding-bottom: 0 !important;
  // }
  // .simpleCard{
  //   padding-bottom: 0;
  //   margin-bottom: 20px;
  //   .simpleCardLastLine{
  //     margin-bottom: 0;
  //   }
  // }
  .line{
    text-align: center;
  }
  .dlink {
    color: #409EFF;
  }
  h3 {
    font-size: 14px;
    font-weight: normal;
  }
</style>
