<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:15px;">
      <template>
        <el-button style="margin-left: 10px;" type="primary" size="small"  @click="Export" :loading="downloadLoading" :disabled="downloadLoading">导出列表</el-button>
      </template>
    </sticky>
    <el-form :model="receivableform" ref="ruleForm" label-width="68px" label-position="left">
    <el-card class="simpleCard" body-style="padding:12px" shadow="never"> 

      <el-row >
        <el-col :span="6">
          <el-form-item label="收款单号" prop="receivable.ticketno">
            <el-input type="text" size="small" style="max-width:199px;" v-model="receivableform.receivable.ticketno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售单号" prop="receivable.saleorder">
            <el-input type="text" size="small" style="max-width:199px;" v-model="receivableform.receivable.saleorder" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="receivable.status">
            <el-select v-model="receivableform.receivable.status" size="small" filterable clearable placeholder="请搜索或选择" prefix-icon="el-icon-search" >
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
          <el-form-item label="付款方" prop="receivable.payer">
            <el-select v-model="receivableform.receivable.payer" size="small" filterable clearable placeholder="请选择客户" prefix-icon="el-icon-search" >
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
          <el-form-item label="款项性质" prop="receivable.fundnature">
            <el-select v-model="receivableform.receivable.fundnature" filterable clearable placeholder="请选择款项性质" size="small" prefix-icon="el-icon-search" >
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
          <el-form-item label="结算方式" prop="receivable.settlementmethod">
            <el-select v-model="receivableform.receivable.settlementmethod" filterable clearable placeholder="请选择结算方式" size="small" prefix-icon="el-icon-search">
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
          <el-form-item label="合同编号" prop="receivable.contractno">
            <el-input type="text" size="small" style="max-width:199px;" v-model="receivableform.receivable.contractno" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务板块">
            <el-select v-model="receivableform.receivable.businesstype" size="small" filterable clearable placeholder="请选择"  prefix-icon="el-icon-search" >
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
          <el-form-item label="收款日期" prop="receivable.recdate">
            <el-date-picker
              v-model="receivableform.receivable.postrecdate"
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
        <el-table
          :data="list"
          v-loading="loading"
          show-summary
          size="small"
          :summary-method="getSummaries"
          style="width: 100%"
          border>
          <el-table-column
            label="单号"
            width="220">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewRow(scope.row)">{{scope.row.ticketno}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="来源销售订单"
            prop="saleorder"
            width="200">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="viewsalorderRow(scope.row)">{{scope.row.saleorder}}</el-button>
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
              <span>{{ scope.row.payername }}</span>
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
            label="收款日期">
            <template slot-scope="scope">
              <span>{{ scope.row.recdate }}</span>
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
            label="本次实收金额"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.recamount }}</span>
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
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.status|statusFilter}}</span>
            </template>
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
          size="small"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
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
  export default {
    name: 'receivablelist',
    components: { Sticky },
    data() {
      return {
        receivableform: {
          receivable: {
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
        },
        list: [],
        pagesize: 10,
        pageindex: 1,
        total: 0,
        currentPage: 1,
        totaldata:{},
        statusList: Status,
        fundnature: ReciveFundnature,
        settlementmethod: SettlementMethod,
        businesstypeData: BusinessTypeData,
        loading: false,
        downloadLoading: false,
        currentPostData: {}
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
    },
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
        const postData = this.receivableform.receivable
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
        getReceivableDetail({ pagesize: this.pagesize, pageindex: this.pageindex, ...pData }).then(res => {
          this.list = res.data.data
          this.total = res.data.total
          const { amount, interestrate, payamount } = res.data
          this.totaldata = { amount, interestrate, payamount }
          this.currentPage = res.data.currentPage
          this.loading = false
          console.log(res)
        }).catch(err => {
          console.log(err)
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
        this.pageindex = 1
        this.getListData()
      },
      viewRow(row) {
        this.$router.push({
          name: 'receivabledetailDelivery',
          params: {
            ticketno: row.ticketno
          }
        })
      },
      viewsalorderRow(row) {
        this.$router.push({
          name: 'saleorderdetailDelivery',
          params: {
            ticketno: row.saleorder
          }
        })
      },
      onCancel() {
        this.receivableform = {
          receivable: {}
        }
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
