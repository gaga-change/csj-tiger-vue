<template lang="html">
<div class="app-container">
  <!-- <sticky :className="'sub-navbar published'" >
    <template v-if="fetchSuccess">
      <template v-if="planform.saleOrder.status == 1">
        <el-button  style="margin-left: 10px;" type="success"
          :disabled = "planform.saleOrder.closed == 1 || !$haspermission('newoutnotice')"
          @click="nextpage('newoutnotice')">登记发货通知单</el-button>
        <el-button  style="margin-left: 10px;" type="danger"
          :disabled = "planform.saleOrder.closed == 1 || !$haspermission('saleCancelCheck')"
          @click="Modify(5, 'saleOrder', true)">撤销审核</el-button>
      </template>
      <template v-else-if="planform.saleOrder.status == -1 || planform.saleOrder.status == -2">
        <el-button  style="margin-left: 10px;" type="warning"  @click="Modify(3, 'saleOrder')" :disabled="!$haspermission('saleDelete')">删除</el-button>
        <el-button  style="margin-left: 10px;" type="primary"  @click="Edit" :disabled="!$haspermission('saleEdit')">修改</el-button>
      </template>
      <template v-else-if="planform.saleOrder.status == 0">
        <el-button  style="margin-left: 10px;" type="primary"  @click="Modify(0, 'saleOrder')" :disabled="!$haspermission('saleCheck')">审核</el-button>
        <el-button  style="margin-left: 10px;" type="error"  @click="Modify(1, 'saleOrder')" :disabled="!$haspermission('saleReject')">驳回</el-button>
      </template>
      <template v-else>
        <el-tag >暂无操作</el-tag>
      </template>
    </template>
    <template v-else>
      <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
    </template>
  </sticky> -->
  <el-form :model="planform" ref="ruleForm" label-width="120px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="销售单号" prop="saleOrder.ticketno">
          <span>{{planform.saleOrder.ticketno}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="saleOrder.status">
          <el-tag>{{planform.saleOrder.status|statusFilter}}</el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="计划单号">
          <span>{{planform.saleOrder.enquiryorder}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="交货日期" prop="saleOrder.planarrivedate">
          {{planform.saleOrder.planarrivedate}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="制单人" prop="saleOrder.createuser">
          {{planform.saleOrder.createuser}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户" prop="saleOrder.customer">
          {{getName(planform.saleOrder.customer)}}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="收款方式" prop="saleOrder.recmethod">
          {{planform.saleOrder.recmethod|recmethodFilter}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="交货方式" prop="saleOrder.deliverway">
          {{planform.saleOrder.deliverway|deliverwayFilter}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同编号" prop="saleOrder.contractno">
          {{planform.saleOrder.contractno}}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="发出仓库">
          {{planform.saleOrder.storename}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="订单日期">
          {{planform.saleOrder.orderdate}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售负责人">
          {{planform.saleOrder.leader}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="质保期限">
          {{planform.saleOrder.warrantydate}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同付款约定">
          {{planform.saleOrder.pagreement}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同开票约定">
          {{planform.saleOrder.invoiceagreement}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="质保期起算标准">
          {{planform.saleOrder.warrantystandard}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="质保金比例(%)">
          {{planform.saleOrder.warrantyrate}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算方式">
          {{planform.saleOrder.settlementmethod | settlementmethodFilter}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="金额合计">
          {{planform.saleOrder.sumorderamount }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同金额">
          {{planform.saleOrder.contractamount }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="业务板块" >
          {{planform.saleOrder.businesstype|businesstypeFilter}}
        </el-form-item>
      </el-col>
    </el-row>
    <div class="itemscont">
      <h3>
        销售单物品明细
      </h3>
      <el-form-item label-width="0" prop="saleOrderItems">
        <el-table
          :data="planform.saleOrderItems"
          style="width: 100%"
          border
          max-height="600">
          <el-table-column
            label="序号"
            width="55">
            <template slot-scope="scope">
              <span >{{ scope.row.itemno }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品编码"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.custommaterialno }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.materialname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            width="200">
            <template slot-scope="scope">
              <span >{{ scope.row.materialrule }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="品牌"
            width="120">
            <template slot-scope="scope">
              <span >{{ scope.row.materialtag }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售数量"
            width="80">
            <template slot-scope="scope">
              <span >{{ scope.row.ordernum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            width="80">
            <template slot-scope="scope">
              <span >{{ scope.row.orderunit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售单价"
            width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.saleprice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售金额"
            width="100">
            <template slot-scope="scope">
              <span>{{ (scope.row.saleprice*scope.row.ordernum).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="税率"
            width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.taxrate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.memos }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </div>
  </el-form>
</div>
</template>

<script>
import { SaleDetailInfo } from '@/api/planorder'
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime } from '@/utils'
import Modify from '@/utils/modify'
export default {
  components: { Sticky },
  data() {
    return {
      planform: {
        saleOrder: {},
        saleOrderItems: []
      },
      fetchSuccess: true
    }
  },
  computed: {
    sumordernum() {
      let total = 0
      this.planform.saleOrderItems.forEach(item => {
        total += item.ordernum
      })
      return total
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
  watch: {
    '$route': 'getDetail'
  },
  created() {
    this.getDetail()
    if (!this.gridData.length) {
      this.$store.dispatch('GetGysList')
    }
  },
  methods: {
    needfresh() {
      this.getDetail()
    },
    getName(id) {
      let tname = ''
      if (this.gridData.length) {
        this.gridData.map(d => {
          if (d.requestid === id) {
            tname = d.name
          }
        })
      }
      return tname
    },
    getDetail() {
      SaleDetailInfo({ ticketno: this.$route.params.ticketno }).then(
        res => {
          console.log(res)
          this.planform = res.data
          this.fetchSuccess = true
        }
      ).catch(err => {
        console.log(err)
        this.fetchSuccess = false
      })
    },
    nextpage(name) {
      this.$router.push({
        name: name,
        params: {
          ticketno: this.$route.params.ticketno
        }
      })
    },
    Modify,
    Edit() {
      this.$router.push({
        name: 'newsaleorder',
        params: {
          enquiryorder: this.planform.saleOrder.enquiryorder
        },
        query: {
          id: this.$route.params.ticketno
        }
      })
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
