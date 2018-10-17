<template lang="html">
  <div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template v-if="fetchSuccess">

        <template v-if="planform.receivable.status == -1 || planform.receivable.status == -2">
          <el-button
            style="margin-left: 10px;" type="warning"
            :disabled="!$haspermission('receivableDelete')"
            @click="Modify(3, 'receivable')">删除</el-button>
          <el-button
            style="margin-left: 10px;" type="primary"
            :disabled="!$haspermission('receivableEdit')"
            @click="Edit">修改</el-button>
        </template>
        <template v-else-if="planform.receivable.status == 0">
          <el-button  style="margin-left: 10px;" type="primary"  @click="Modify(0, 'receivable', true)" :disabled="!$haspermission('receivableCheck')">审核</el-button>
          <el-button  style="margin-left: 10px;" type="error"  @click="Modify(1, 'receivable', true)" :disabled="!$haspermission('receivableReject')">驳回</el-button>
        </template>
        <template v-else>
          <el-tag >暂无操作</el-tag>
        </template>

      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>

    </sticky>
    <el-form :model="planform" ref="ruleForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="收款单号" prop="receivable.ticketno">
            <el-input type="text" v-model="planform.receivable.ticketno" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方" prop="receivable.payername">
            <el-input type="text" v-model="planform.receivable.payername" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款方" prop="receivable.receivablesname">
            <el-input type="text" :value="planform.receivable.receivablesname" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="款项性质" prop="receivable.fundnature">
            <el-input type="text" :value="planform.receivable.fundnature|fundnatureFilter" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="planform.receivable.fundtype">
          <el-form-item label="款项类型">
            <el-input type="text" :value="planform.receivable.fundtype|fundtypeFilter" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次实收金额" prop="receivable.recamount">
            <el-input type="text" v-model="planform.receivable.recamount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现金折扣" >
            <el-input type="text" v-model="planform.receivable.interestrate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算金额" >
            <el-input type="text" v-model="planform.receivable.settlementamount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算方式" prop="receivable.settlementmethod">
            <el-input type="text" :value="planform.receivable.settlementmethod|settlementmethodFilter"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="制单人" prop="receivable.createuser">
            <el-input type="text" v-model="planform.receivable.createuser" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制单日期" prop="receivable.createdate">
            <el-input type="text" :value="planform.receivable.createdate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源销售单" prop="receivable.saleorder">
            <el-input type="text" :value="planform.receivable.saleorder" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="审核人" prop="receivable.checkuser">
            <el-input type="text" v-model="planform.receivable.checkuser" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核日期" prop="receivable.checkdate">
            <el-input type="text" :value="planform.receivable.checkdate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核结果" prop="receivable.status">
            <el-input type="text" :value="planform.receivable.status|statusFilter" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="业务板块" prop="receivable.status">
            <el-input type="text" :value="planform.receivable.businesstype|businesstypeFilter" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="receivable.memos">
            <el-input type="text" v-model="planform.receivable.memos" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款日期" prop="receivable.recdate">
            <el-input type="text"  :value="planform.receivable.recdate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="附件" >
            <template v-for="(enclosure, index) in enclosures" v-if="enclosures.length">
              <a :href="`/webApi/download/file?pathUrl=${enclosure.url}&pathName=${enclosure.name}`" target="_blank" style="padding-right:4px;color:#128fe7;">{{enclosure.name}}</a><br/>
            </template>
            <span v-else>暂无附件</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { getReceivableDetail } from '@/api/receivable'
  import { mapGetters } from 'vuex'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { parseTime, ReciveFundnature, SettlementMethod, downloadFile } from '@/utils'
  import Modify from '@/utils/modify'

  export default {
    components: {
      Sticky
    },
    data() {
      return {
        planform: {
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
            isdelete: 0,
            memos: '',
            payer: '',
            payername: '',
            recamount: 0,
            recdate: '',
            receivables: '',
            receivablesname: '',
            saleorder: '',
            settlementmethod: '',
            status: '',
            ticketno: ''
          }
        },
        list: [],
        pagesize: 10,
        pageindex: 1,
        total: 0,
        currentPage: 1,
        fundnature: ReciveFundnature,
        settlementmethod: SettlementMethod,
        fetchSuccess: true
      }
    },
    computed: {
      enclosures() {
        if (this.planform.receivable.enclosure) {
          if (this.planform.receivable.enclosure.includes('[')) {
            return JSON.parse(this.planform.receivable.enclosure)
          } else {
            const se = this.planform.receivable.enclosure.split(',')
            const enclosures = []
            se.forEach((enc, index) => {
              enclosures.push({
                name: '附件' + (index + 1),
                url: downloadFile(enc)
              })
            })
            return enclosures
          }
        }
      },
      getEntName() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.planform.receivable.enterprise) {
              tname = d.name
            }
          })
        }
        return tname
      },
      getCusname() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.planform.receivable.receivables) {
              tname = d.name
            }
          })
        }
        return tname
      },
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
      this.getDetail()
    },
    methods: {
      Modify,
      downloadFile,
      Edit() {
        this.$router.push({
          name: 'newreceivableDelivery',
          query: {
            id: this.$route.params.ticketno
          }
        })
      },
      needfresh() {
        this.getDetail()
      },
      getDetail() {
        getReceivableDetail({
          ticketno: this.$route.params.ticketno
        }).then(res => {
          this.planform.receivable = res.data.data[0]
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.fetchSuccess = false
        })
      }
    }
  }
</script>

<style scoped>
  .line {
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
