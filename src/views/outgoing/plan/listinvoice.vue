<template>
  <div class="outgoing-quirydetail-container">
    <h3 style="text-align: center;">发货清单</h3>
    <div>
      <span class="f12 mr20 mt10 nowrap"><span class="fw600 mr5">客户编码 :</span><span>{{data.arrivalCode}}</span></span>
      <span class="f12 mr20 mt10 nowrap"><span class="fw600 mr5">客户名称 :</span><span>{{data.arrivalName}}</span></span>
      <span class="f12 mr20 mt10 nowrap"><span class="fw600 mr5">联系电话 :</span><span>{{data.arrivalLinkTel}}</span></span>
      <span class="f12 mr20 mt10 nowrap"><span class="fw600 mr5">通知单号 :</span><span>{{data.busiBillNo}}</span></span>
      <span class="f12 mr20 mt10 nowrap"><span class="fw600 mr5">客户地址 :</span><span>{{data.arrivalAddress}}</span></span>
    </div>
    <div
      class="mt15"
      style="min-height:100px;margin-bottom:12px;padding-right:20px;"
    >
      <web-pagination-table
        class="compact-table-area"
        :loading="false"
        :config="config"
        :allTableData="data.itemList||[]"
      />
    </div>
    <div style="margin-bottom: 12px;display: flex;justify-content: space-between;padding-right: 150px;">
      <div><span style="font-size: 12px;font-weight: 600;">制单人 : </span>
        <div style="font-size: 12px; width: 100px;height: 30px; border-bottom: 1px solid #000;display: inline-block"></div>
      </div>
      <div><span style="font-size: 12px;font-weight: 600;">收货签收 : </span>
        <div style="font-size: 12px; width: 100px;height: 30px; border-bottom: 1px solid #000;display: inline-block"></div>
      </div>
      <div><span style="font-size: 12px;font-weight: 600;">日期 : </span>
        <div style="font-size: 12px;padding-top:20px; display: inline-block">{{moment().format('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import webPaginationTable from '@/components/Table/webPaginationTable';

export default {
  components: { webPaginationTable },
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    moment
  }
}

</script>
