<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:15px;">
      <template>
        <el-button style="margin-left: 10px;" type="primary" size="small"  @click="Export" :loading="downloadLoading" :disabled="downloadLoading">导出列表</el-button>
      </template>
    </sticky>
    <el-form :model="ruleForm" ref="ruleForm" label-width="68px" label-position="left">
      <el-card class="simpleCard" body-style="padding:12px" shadow="never"> 

        <el-row >
          <el-col :span="6">
            <el-form-item label="收款单号" prop="ticketno">
              <el-input type="text" size="small" style="max-width:199px;" v-model="ruleForm.ticketno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售单号" prop="saleorder">
              <el-input type="text" size="small" style="max-width:199px;" v-model="ruleForm.saleorder" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status" size="small" filterable clearable placeholder="请搜索或选择" prefix-icon="el-icon-search" >
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
            <el-form-item label="付款方" prop="payer">
              <el-select v-model="ruleForm.payer" size="small" filterable clearable placeholder="请选择客户" prefix-icon="el-icon-search" >
                <el-option
                  v-for="item in gridData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.requestid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="6">
            <el-form-item label="款项性质" prop="fundnature">
              <el-select v-model="ruleForm.fundnature" filterable clearable placeholder="请选择款项性质" size="small" prefix-icon="el-icon-search" >
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
              <el-select v-model="ruleForm.settlementmethod" filterable clearable placeholder="请选择结算方式" size="small" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in settlementmethod"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同编号" prop="contractno">
              <el-input type="text" size="small" style="max-width:199px;" v-model="ruleForm.contractno" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务板块">
              <el-select v-model="ruleForm.businesstype" size="small" filterable clearable placeholder="请选择"  prefix-icon="el-icon-search" >
                <el-option
                  v-for="item in businesstypeData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="6">
            <el-form-item label="收款日期" prop="recdate">
              <el-date-picker
                v-model="ruleForm.postrecdate"
                type="daterange"
                :editable="false"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="6">

        <el-form-item class="simpleCardLastLine" label-width="0">
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
  import { getReceivableDetail } from '@/api/receivable'
  import { mapGetters } from 'vuex'
  import { exportExcel } from '@/utils/exportexcel'
  import { parseTime, ReciveFundnature, SettlementMethod, Status, BusinessTypeData } from '@/utils'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import BaseTable from '@/components/Table' // table组件

  const ruleForm = {
            checkadvice: '',
            checkdate: '',
            checkuser: '',
            contractno: '',
            createdate: '',
            createuser: '',
            enclosure: '',
            enterprise: '',
            enterprisename: '',
            fundnature: '',
            interestrate: '',
            isdelete: null,
            memos: '',
            payer: '',
            payername: '',
            pagesize:10,
            pageindex:1,
            recamount: null,
            recdate: '',
            receivables: '',
            receivablesname: '',
            saleorder: '',
            settlementmethod: '',
            status: '',
            ticketno: '',
            postrecdate: null
        }

  export default {
    name: 'receivablelist',
    components: { Sticky, BaseTable },
    data() {
      return {
        ruleForm:ruleForm,
        statusList: Status,
        fundnature: ReciveFundnature,
        settlementmethod: SettlementMethod,
        businesstypeData: BusinessTypeData,
        loading: false,
        showSummary:true,
        total:10,
        downloadLoading: false,
        currentPostData: {},
        tableData:[],
        totaldata:{ amount:0, interestrate:0, payamount:0 },
        tableConfig:[],
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
      { label:'单号',prop:'ticketno',width:'150px',fixed:true,dom:this.formatter('linkToreceivabledetailDelivery')},
      { label:'来源销售订单',prop:'saleorder',width:'150px'},
      { label:'付款方',prop:'payername',width:'150px'},
      { label:'收款方',prop:'receivablesname',width:'150px'},
      { label:'收款日期',prop:'recdate',width:'150px'},
      { label:'款项性质',prop:'fundnature',width:'90px',dom:this.formatter('fundnatureFilter')},
      { label:'款项类型',prop:'fundtype',width:'90px', dom:this.formatter('fundtypeFilter'),},
      { label:'结算方式',prop:'settlementmethod',width:'90px',dom:this.formatter('settlementmethodFilter')},
      { label:'本次实收金额',prop:'recamount',width:'150px'},
      { label:'现金折扣',prop:'interestrate',width:'90px'},
      { label:'结算金额',prop:'settlementamount',width:'90px'},
      { label:'状态',prop:'status',width:'90px',dom:this.formatter('statusFilter')},
      { label:'业务板块',prop:'businesstype',width:'90px',dom:this.formatter('businesstypeFilter')},
      { label:'审核结果',prop:'checkadvice',width:'90px'},
      { label:'制单人',prop:'createuser',width:'90px'},
      { label:'制单日期',prop:'createdate',width:'150px'}
     ]
      this.getListData()
    },
    // beforeMount(){
 
    // },
    activated(){
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
      this.getListData()
    },
    methods: {
      Export() {
        this.downloadLoading = true
        getReceivableDetail(this.currentPostData).then(res => {
          const exportlist = res.data.data
          exportlist.forEach(item => {
            item.fundnature = this.$options.filters['fundnatureFilter'](item.fundnature)
            item.fundtype = this.$options.filters['fundtypeFilter'](item.fundtype)
            item.settlementmethod = this.$options.filters['settlementmethodFilter'](item.settlementmethod)
            item.businesstype = this.$options.filters['businesstypeFilter'](item.businesstype)
            item.status = this.$options.filters['statusFilter'](item.status)
          })
          /* 参数{list,tHeader, filterVal} */
          exportExcel({
            list: exportlist,
            tHeader: ['单号', '来源销售订单', '合同编号', '付款方', '收款方', '收款日期', '款项性质', '款项类型', '结算方式', '本次实收金额', '现金折扣', '结算金额', '状态', '业务板块', '审核结果', '制单人', '制单日期'],
            filterVal: ['ticketno', 'saleorder', 'contractno', 'payername', 'receivablesname', 'recdate', 'fundnature', 'fundtype', 'settlementmethod', 'recamount', 'interestrate', 'settlementamount', 'status', 'businesstype', 'checkadvice', 'createuser', 'createdate']
          })
          this.downloadLoading = false
        }).catch(err => {
          this.downloadLoading = false
        })
      },
      handleSizeChange(val) {
        this.ruleForm={...this.ruleForm,pagesize:val,pageindex:1}
        this.getListData()
      },

      handleCurrentChange(val) {
        this.ruleForm={...this.ruleForm,pageindex:val}
        this.getListData()
      },
      formatter(type,value){
            switch(type){
              case 'warehouseType': return this.warehouseTypeConfig.find(v=>v.key===value)&&this.warehouseTypeConfig.find(v=>v.key===value).value||'暂无数据';
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
              case 'linkToreceivabledetailDelivery' :return  (row, column, cellValue, index)=>{
              
                let linkTo={
                  path:`/receivable/receivabledetail/${row.ticketno}`,
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };
              default:return value
            }
         
       },
      getListData() {
        const postData = this.ruleForm
        if (postData.postpaydate && postData.postpaydate.length) {
          postData.recstartdate = parseTime(postData.postrecdate[0])
          postData.recenddate = parseTime(postData.postrecdate[1])
          postData.recdate = ''
        }
        const pData = {}
        for (const item of Object.keys(postData)) {
          if (postData[item] !== null && postData[item] !== '') {
            pData[item] = postData[item]
          }
        }
        this.currentPostData = pData
        this.loading = true
         this.$router.replace({
          path:'/receivable/receivablelist',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        
        getReceivableDetail({ ...pData }).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
          const { amount, interestrate, payamount } = res.data
          this.totaldata = { amount, interestrate, payamount }
          this.currentPage = res.data.currentPage
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
      getSummaries(param) {

        const { columns } = param
        const sums = []
        sums[0] = '合计'
        columns.forEach((column, index) => {
          if (column.label === '结算金额') {
            sums[index] = this.totaldata.amount
          } else if (column.label === '本次实收金额') {
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

<style scoped>
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
