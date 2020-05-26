<template>
  <div class="warehousing-quirydetail-container">

    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          v-if="this.$route.query.history"
          type="success"
          size="mini"
          @click="sureQty"
          :loading="sureQtyLoding"
        >确认并生成入库单</el-button>
        <el-button
          v-if="config.planState === 1 || config.planState === 0"
          type="success"
          size="mini"
          @click="planCheck(1)"
          :loading="auditLoading"
          :disabled="rejectLoading"
        >审核</el-button>
        <el-button
          v-if="config.planState === 0"
          type="warning"
          size="mini"
          @click="planCheck(0)"
          :disabled="auditLoading"
          :loading="rejectLoading"
        >驳回</el-button>
      </template>
    </sticky>

    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="config"
    />

    <item-title text="相关明细" />
    <el-tabs
      v-model="tabActive"
      type="card"
      @tab-click="activeChange"
    >
      <el-tab-pane
        label="相关计划单"
        name="plan"
      >
        <edit-table
          :loading="loading"
          :useRowColorKey="this.$route.query.history?'handInQty':null"
          :config="tableConfig"
          :allTableData="tableData"
        />
      </el-tab-pane>

      <el-tab-pane
        label="相关入库单"
        name="warehousing"
      >
        <web-pagination-table
          :loading="warehousingLoding"
          :config="warehousingTableConfig"
          :allTableData="warehousingTableData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { inPlanDetail, orderSave, inPlanCheck } from '@/api/warehousing'
import { queryInWarehouseCode } from '@/api'
import webPaginationTable from '@/components/Table/webPaginationTable'
import editTable from '@/components/Table/editTable'
import Sticky from '@/components/Sticky'
import Check from '@/components/Check'
import _ from 'lodash';
import { mapGetters } from 'vuex'
import { tableConfig, infoConfig, warehousingTableConfig } from './config';
export default {
  components: { editTable, webPaginationTable, Sticky },
  data() {
    return {
      auditLoading: false, // 审核加载状态
      rejectLoading: false, // 驳回加载状态

      config: {},
      infoConfig,

      tableData: [],
      tableConfig,
      loading: false,

      warehousingLoding: false,
      warehousingTableConfig,
      warehousingTableData: [],

      planCode: '',
      tabActive: 'plan',
      sureQtyLoding: false

    }
  },

  computed: {
    ...mapGetters([,
      'userInfo'
    ])
  },

  mounted() {
    this.getCurrentTableData()
  },

  methods: {
    planCheck(isAgree) {
      Check({
        global: this,
        api: inPlanCheck,
        agree: isAgree,
        planCode: this.config.planCode,
        loading: this.sureQtyLoding,
        apiStart: () => {
          if (isAgree === 0) {
            this.rejectLoading = true
          } else {
            this.auditLoading = true
          }
        }
      }).then(res => {
        this.getCurrentTableData()
      }).catch(err => {
      }).then(() => {
        this.auditLoading = false
        this.rejectLoading = false
      })
    },
    getCurrentTableData() {
      let { planCode } = this.$route.query || {};
      this.planCode = planCode;
      this.loading = true
      inPlanDetail({
        planCode,
        pageSize: 500
      }).then(res => {
        this.loading = false
        if (res.success) {
          let data = res.data;
          this.config = data;
          if (this.config.busiBillNo && this.config.busiBillNo.slice(0, 2) == 'SO') {
            this.infoConfig.find(v => v.prop === 'busiBillNo').linkTo = '/outgoing/businessorder-detail'
          }
          let list = data.skuDetails && data.skuDetails.list || []

          this.tableData = list.map(v => {
            if (this.$route.query.history) {
              if (v.planInQty - v.realInQty > 0) {
                //  v.handInQty=(v.planInQty-v.realInQty)||0;
                v.handInQty = v.handInQty || 0;
              } else {
                v.handInQty = 0
              }
              v.edit = true;
            }
            return v
          })
        }
      }).catch(err => {
        this.loading = false
      })
    },

    sureQty() {
      let json = {};
      json.remarkInfo = '手动入库';
      json.fromSystemCode = 'CSJSCM';
      json.operator = this.userInfo.id;
      json.operatorName = this.userInfo.truename;
      json.ownerCode = this.config.ownerCode;
      json.planCode = this.config.planCode;
      json.items = _.cloneDeep(this.tableData).map(v => {
        v.realInQty = v.handInQty;
        return v
      })
      this.sureQtyLoding = true
      orderSave(json).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '操作成功,1.5s后跳往详情页',
            duration: 1500,
            onClose: () => {
              this.$router.replace({
                path: `/warehousing/plan-detail?planCode=${this.$route.query.planCode}`,
              })
              this.getCurrentTableData()
            }
          })
        } else {
          this.sureQtyLoding = false
        }
      }).catch(err => {
        this.sureQtyLoding = false
      })
    },
    activeChange(tab) {
      if (tab.name == 'warehousing') {
        if (!this.warehousingTableData.length) {
          this.warehousingLoding = true;
          queryInWarehouseCode({
            planCode: this.planCode,
            pageSize: 500,
            pageNum: 1,
            ownerCode: this.config.ownerCode
          }).then(res => {
            this.warehousingLoding = false;
            if (res) {
              this.warehousingTableData = res.data && res.data.list || []
            }
          })
        }
      }
    }
  }
}

</script>
