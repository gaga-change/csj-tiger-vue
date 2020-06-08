<template>
  <div class="outgoing-quirydetail-container">

    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="config"
    />

    <item-title text="相关明细" />
    <web-pagination-table
      :loading="loading"
      :config="tableConfig"
      :allTableData="tableData"
    />

  </div>
</template>

<script>
import moment from 'moment';
import { stockRecord } from '@/api/inventory';
import webPaginationTable from '@/components/Table/webPaginationTable'
import { tableConfig, infoConfig } from './config';
export default {
  components: { webPaginationTable },
  data() {
    return {
      config: {},
      infoConfig,

      loading: false,
      tableData: [],
      tableConfig,
    }
  },
  mounted() {
    let { warehouseCode, skuCode } = this.$route.query || {};
    this.loading = true;
    stockRecord({ warehouseCode, skuCode }).then(res => {
      this.loading = false;
      if (res.success) {
        this.config = res.data || {};
        this.tableData = (res.data && res.data.items && Array.isArray(res.data.items)) ? res.data.items : []
      }
    }).catch(err => {
      this.loading = false;
    })
  },
}

</script>
