<template>
  <div class="outgoing-quirydetail-container">

    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          v-if="$route.query.history"
          type="success"
          size="small"
          @click="sureQty"
          :loading="sureQtyLoding"
        >确认并生成出库单</el-button>
        <el-button
          v-if="config.planState === 5 || config.planState === 6"
          size="small"
          @click="printing"
        >打印</el-button>
        <el-button
          v-if="config.planState === 1 || config.planState === 0"
          type="success"
          size="small"
          @click="planCheck(1)"
          :loading="auditLoading"
          :disabled="rejectLoading"
        >审核</el-button>
        <el-button
          v-if="config.planState === 0"
          type="warning"
          size="small"
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
          :useRowColorKey="this.$route.query.history?'qty':null"
          :config="tableConfig"
          :allTableData="tableData"
          :tableType="typeDes"
        />
      </el-tab-pane>
      <el-tab-pane
        label="相关出库单"
        name="outgoing"
      >
        <web-pagination-table
          :loading="outgoingLoding"
          :config="outgoingTableConfig"
          :allTableData="outgoingTableData"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="打印发货清单"
      :visible.sync="printingVisible"
      width="841px"
      :before-close="handleClose"
    >
      <invoice
        id="invoice"
        :data="printingTable_data"
        :config="printingTable_config"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="surePrinting"
        >打印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { outPlanDetail, outOrderSelect, orderSave, outPlanPrint, outPlanCheck } from '@/api/outgoing';
import webPaginationTable from '@/components/Table/webPaginationTable'
import editTable from '@/components/Table/editTable'
import { tableConfig, infoConfig, outgoingTableConfig, printingTable_config } from './config';
import Sticky from '@/components/Sticky'
import Check from '@/components/Check'
import Invoice from './invoice'
import moment from 'moment';
import { MakePrint } from '@/utils'
import _ from 'lodash';
import { mapGetters } from 'vuex'
export default {
  components: { webPaginationTable, editTable, Sticky, Invoice },
  data() {
    return {
      auditLoading: false, // 审核加载状态
      rejectLoading: false, // 驳回加载状态
      config: {},
      infoConfig,
      busiBillNo: '',

      tableConfig,
      tableData: [],

      outgoingLoding: false,
      outgoingTableConfig,
      outgoingTableData: [],

      loading: false,
      tabActive: 'plan',
      sureQtyLoding: false,

      //打印项
      printingVisible: false,
      printingTable_data: {},
      printingTable_config,
      typeDes:null
    }
  },

  mounted() {
    this.getCurrentTableData()
  },
  computed: {
    ...mapGetters([,
      'userInfo'
    ])
  },

  methods: {
    planCheck(isAgree) {
      Check({
        global: this,
        api: outPlanCheck,
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

    printing() {
      this.printingVisible = true;
      outPlanPrint(this.$route.query.planCode).then(res => {
        if (res.success) {
          this.printingTable_data = res.data;
        }
      }).catch(err => {

      })
    },
    //关闭弹框
    handleClose() {
      this.printingVisible = false;
    },

    surePrinting() {
      let printContainer = document.getElementById('invoice').innerHTML;
      MakePrint(printContainer);
      this.printingVisible = false;
    },

    getCurrentTableData() {
      this.loading = true;
      outPlanDetail({ planCode: this.$route.query.planCode }).then(res => {
        if (res.success) {
          let data = res.data;
          this.config = data;
          this.planCode = data.planCode;
          this.typeDes=data.issuedState!=1?'productNum':null
          let tableData = Array.isArray(data.itemList) ? data.itemList : [];
          if (this.$route.query.history) {
            this.tableData = _.cloneDeep(tableData).map(v => {
              if(v.canUseSkuQty - v.planOutQty <0){
                v.pointtitle='(商品不足)'
              }else{
                v.pointtitle=''
              }
              let json = v;
              if (v.planOutQty - v.realOutQty > 0) {
                //  json.qty=(v.planOutQty-v.realOutQty)||0
                json.qty = json.handOutQty ? json.handOutQty : 0;
              } else {
                json.qty = 0
              }
              json.edit = true;
              return json;
            })
          } else {
            this.tableData = tableData.map(v => {
              if(v.canUseSkuQty - v.planOutQty <0){
                v.pointtitle='(商品不足)'
              }else{
                v.pointtitle=''
              }
              let json = v;
              json.qty = v.handOutQty;
              return json;
            })
          }

        }
        this.loading = false;

      }).catch(err => {
        this.loading = false;
        console.error(err)
      })
    },

    sureQty() {
      let json = {};
      json.planCode = this.$route.query.planCode;
      json.outDate = moment().valueOf();
      json.madeTime = moment().valueOf();
      json.remarkInfo = '手动出库';
      json.fromSystemCode = 'CSJSCM';
      json.operator = this.userInfo.id;
      json.operatorName = this.userInfo.truename;
      if (this.tableData.some(v => v.qty !== 0 && !v.qty)) {
        this.$message.error('手工出库必填');
        return ''
      }
      json.items = this.tableData;
      this.sureQtyLoding = true;
      orderSave(json).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '操作成功,1.5s后跳往详情页',
            duration: 1500,
            onClose: () => {
              this.$router.replace({
                path: `/outgoing/plan-detail?planCode=${this.$route.query.planCode}`,
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
      if (tab.name == 'outgoing') {
        if (!this.outgoingTableData.length) {
          this.outgoingLoding = true;
          outOrderSelect({
            planCode: this.planCode,
            pageSize: 500,
            pageNum: 1,
            ownerCode: this.config.ownerCode
          }).then(res => {
            if (res.success) {
              this.outgoingTableData = res.data && res.data.list || []
            }
            this.outgoingLoding = false;
          }).catch(err => {
            console.error(err)
          })
        }
      }
    },

    goeditrow(index) {
      let tableData = _.cloneDeep(this.tableData)
      tableData[index]['edit'] = !tableData[index]['edit'];
      this.tableData = tableData;
    },

    handleDelete(index, row) {
      let tableData = _.cloneDeep(this.tableData)
      tableData.splice(index, 1)
      this.tableData = tableData;
    },

  },
}

</script>
