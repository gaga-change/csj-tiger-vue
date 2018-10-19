<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:15px;">
      <template>
        <el-button style="margin-left: 10px;" type="primary"  @click="Export" :loading="downloadLoading" :disabled="downloadLoading">导出列表</el-button>
      </template>
    </sticky>

    <el-form :model="paymentform" ref="ruleForm" label-width="80px" style="text-align:left">
    <el-card class="simpleCard">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款单号" prop="payment.ticketno">
            <el-input type="text" size="small" v-model="paymentform.payment.ticketno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="来源单号" prop="payment.purchorder">
            <el-input type="text" size="small" v-model="paymentform.payment.purchorder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="payment.status">
            <el-select v-model="paymentform.payment.status" filterable size="small" clearable placeholder="请搜索或选择" prefix-icon="el-icon-search">
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
          <el-form-item label="收款方" prop="payment.receivables">
            <el-select v-model="paymentform.payment.receivables" filterable size="small" clearable placeholder="请选择供应商" prefix-icon="el-icon-search">
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
          <el-form-item label="款项性质" prop="payment.fundnature">
            <el-select v-model="paymentform.payment.fundnature" size="small"  filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
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
          <el-form-item label="结算方式" prop="payment.settlementmethod">
            <el-select v-model="paymentform.payment.settlementmethod" size="small" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search">
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
          <el-form-item label="付款日期" prop="payment.paydate">
            <el-date-picker
              v-model="paymentform.payment.postpaydate"
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
          <el-form-item label="合同编号" prop="payment.contractno">
            <el-input type="text" size="small" v-model="paymentform.payment.contractno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务板块">
            <el-select v-model="paymentform.payment.businesstype" size="small" filterable clearable placeholder="请选择" style="width:220px" prefix-icon="el-icon-search" >
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
          <el-form-item label-width="0" class="simpleCardLastLine" style="margin-bottom:0">
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
            <el-button @click="onCancel" size="small">重置</el-button>
            </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <div class="itemscont">
        <el-table
          :data="list"
          style="width: 100%"
          show-summary
          size="small"
          :summary-method="getSummaries"
          border>
          <el-table-column
            label="单号"
            width="220"
            >
            <template slot-scope="scope">
              <el-button type="text" @click="viewRow(scope.row)">{{scope.row.ticketno}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="来源采购订单"
            prop="purchorder"
            width="200">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="viewpurchorderRow(scope.row)">{{scope.row.purchorder}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column
            label="合同编号"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.contractno }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="付款方">
            <template slot-scope="scope">
              <span>{{ scope.row.enterprisename }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收款方"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.receivablesname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="付款日期">
            <template slot-scope="scope">
              <span>{{ scope.row.paydate |parseTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="款项性质">
            <template slot-scope="scope">
              <span>{{ scope.row.fundnature|fundnatureFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="款项类型">
            <template slot-scope="scope">
              <span>{{ scope.row.fundtype|fundtypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结算方式"
            width="120">
            <template slot-scope="scope">
              <span >{{ scope.row.settlementmethod|settlementmethodFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本次实付金额"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.payamount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="现金折扣"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.interestrate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结算金额"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.settlementamount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            :formatter="(a,b,c,d)=>{return this.$options.filters.statusFilter(c)}"
            width="200">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.status|statusFilter}}</span>
            </template> -->
          </el-table-column>
          <el-table-column
            label="业务板块"
            width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.businesstype|businesstypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核结果"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.checkadvice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="制单人"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createuser }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="制单日期"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdate}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          size="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
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
  export default {
    name: 'paymentlist',
    components: { Sticky },
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

        paymentform: {
          payment: {
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
            postpaydate: []
          }
        },
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
        totaldata: {},
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
        currentPostData: {},
        downloadLoading: false
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
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
      this.getListData()
      console.log(this,'this');
      
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
      handleSizeChange(val) {
        this.pagesize = val
        this.getListData()
      },
      handleCurrentPageChange(val) {
        this.pageindex = val
        this.getListData()
      },
      getListData() {
        const postData = this.paymentform.payment
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
        getPaymentDetail({ pagesize: this.pagesize, pageindex: this.pageindex, ...pData }).then(res => {
          this.list = res.data.data
          this.total = res.data.total
          const { amount, interestrate, payamount } = res.data
          this.totaldata = { amount, interestrate, payamount }
          this.currentPage = res.data.currentPage
          console.log(res)
        }).catch(err => {
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
        this.pageindex = 1
        this.getListData()
      },
      viewRow(row) {
        this.$router.push({
          name: 'paymentdetailDelivery',
          params: {
            ticketno: row.ticketno
          }
        })
      },
      viewpurchorderRow(row) {
        //采购单链接
        this.$router.push({
          name: 'purchaseorderdetailDelivery',
          params: {
            ticketno: row.purchorder
          }
        })
      },
      onCancel() {
        this.paymentform = {
          payment: {}
        }
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
