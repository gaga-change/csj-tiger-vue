<template>
  <div class="outgoing-quirydetail-container">
    <!-- 调拨出库 23 -->
    <sticky
      v-if="infoData.busiBillType != 23"
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          size="mini"
          v-if="$route.query.busiBillNo"
          @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillClose','确定要关闭吗?')"
        >关闭</el-button>
        <el-button
          v-if="[0,2,4].includes(infoData.billStatus)"
          size="mini"
          @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillDelete','确定要删除吗?')"
        >删除</el-button>
        <router-link
          v-if="[0,2].includes(infoData.billStatus)"
          :to="`/outgoing/businessorderadd?type=modify&id=${$route.query.id}&time=${moment().valueOf()}`"
          class="tableLink"
        >
          <el-button
            type="success"
            size="mini"
          >修改</el-button>
        </router-link>
        <router-link
          v-if="[1].includes(infoData.billStatus) && infoData.billState !== 8"
          :to="`/outgoing/businessorderadd?type=revision&id=${$route.query.id}&time=${moment().valueOf()}`"
          class="tableLink"
        >
          <el-button
            type="success"
            size="mini"
          >调整</el-button>
        </router-link>
        <el-button
          v-if="[0,2].includes(infoData.billStatus)"
          type="success"
          size="mini"
          @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillCheck','请输入审核意见 !')"
        >审核</el-button>
        <router-link
          v-if="[1].includes(infoData.billStatus) && infoData.billState !== 8 && !infoData.billNo.includes('DB')"
          :to="`/outgoing/businessorderAddPlanOrder?id=${$route.query.id}&time=${moment().valueOf()}`"
          class="tableLink"
        >
          <el-button
            type="success"
            size="mini"
          >创建计划单</el-button>
        </router-link>
      </template>
    </sticky>

    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="infoData"
    />

    <item-title text="相关明细" />
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        label="业务单"
        name="business"
      >
        <edit-Table
          :loading="loading"
          :config="detailTableConfig"
          :allTableData="tableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="计划单"
        name="plan"
      >
        <edit-Table
          :loading="loading"
          :config="detail_planTableConfig"
          :allTableData="detail_planTableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="出库单"
        name="outgonging"
      >
        <edit-Table
          :loading="loading"
          :config="detail_outGoingTableConfig"
          :allTableData="detail_outGoingTableData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { tableConfig, infoConfig, detail_planTableConfig, detail_outGoingTableConfig } from './config';
import editTable from '@/components/Table/editTable';
import Sticky from '@/components/Sticky'
import moment from 'moment';
import { mapGetters } from 'vuex'
import { queryWarehouseCode, outPlanSelect } from '@/api'
import { outBillDetail } from '@/api/outgoing'
import { operation } from './conpoments/lib';
import _ from 'lodash';

export default {
  components: { editTable, Sticky },
  data() {
    return {
      loading: false,
      infoData: {},
      infoConfig,

      tableData: [],
      detailTableConfig: tableConfig,
      activeName: 'business',

      detail_planTableConfig,
      detail_planTableData: [],

      detail_outGoingTableConfig,
      detail_outGoingTableData: [],

    }
  },

  created() {
    this.getCurrentTableData()
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews'
    })
  },

  methods: {
    moment,
    operation,
    getCurrentTableData() {
      let detailTableConfig = _.cloneDeep(this.detailTableConfig);
      let index = detailTableConfig.findIndex(v => ['客户销价', '进货价'].includes(v.label));
      outBillDetail(this.$route.query.id).then(res => {
        if (res.success) {
          let data = _.cloneDeep(res.data);
          if (data && data.busiBillType === 21) {
            detailTableConfig[index] = { label: '客户销价', prop: 'outStorePrice' }
          } else {
            detailTableConfig[index] = { label: '进货价', prop: 'outStorePrice' }
          }
          this.detailTableConfig = detailTableConfig;
          this.infoData = res.data
          this.tableData = data && Array.isArray(data.busiBillDetails) && data.busiBillDetails || [];
          //查询相关计划单
          outPlanSelect({
            pageNum: 1,
            pageSize: 1000,
            billNo: data.billNo,
            ownerCode: data.ownerCode
          }).then(result => {
            if (result) {
              this.detail_planTableData = result.data && Array.isArray(result.data.list) && result.data.list || [];
            }
          })

          //查询相关出库单
          queryWarehouseCode({
            pageNum: 1,
            pageSize: 1000,
            billNo: data.billNo,
            ownerCode: data.ownerCode
          }).then(result => {
            if (result) {
              this.detail_outGoingTableData = result.data && Array.isArray(result.data.list) && result.data.list || [];
            }
          })
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog__body {
  padding-top: 12px;
}
</style>
