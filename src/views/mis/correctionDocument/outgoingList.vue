<template>
  <div class="carrier">
    <search @submit="select" :searchForm="searchForm"></search>

    <div class="operationitem">
      <router-link :to="`/correctionDocument/outgoingAdd?time=${moment().valueOf()}`">
        <el-button type="primary" size="small">创建订正单</el-button>
      </router-link>
    </div>

    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum"
      :loading="loading"
      :total="total"
      :config="outgoing_carrierListConfig"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import search from './components/search'
import BaseTable from '@/components/Table'
import { outgoing_carrierListConfig } from './components/config'
import { outwarehouseList } from '@/api/correction'
import _ from 'lodash';
import moment from 'moment';
export default {
  components: { search, BaseTable },
  data() {
    return {

      //搜索项
      searchForm: {
        busiBillNo: '',
        revisalType: '',
        time: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,

      //table配置
      loading: false,
      outgoing_carrierListConfig,
      tableData: [{ id: 1 }, { id: 12 }]
    }
  },

  mounted() {
    this.fetch()
  },

  created() {
    this.outgoing_carrierListConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div class="tableLinkBox">
              {
                <router-link to={`/correctionDocument/outgoingAdd?time=${moment().valueOf()}`} class="tableLink">修改</router-link>
              }

              {
                <span class="tableLink">删除</span>
              }

              {
                <span class="tableLink">审核</span>
              }

            </div>
          )
        }
      }
    })
  },

  methods: {
    moment,
    handleSizeChange(val) {
      this.searchForm = { ...this.searchForm, pageSize: val, pageNum: 1 };
      this.fetch()
    },

    handleCurrentChange(val) {
      this.searchForm = { ...this.searchForm, pageNum: val };
      this.fetch()
    },

    select(value) {
      this.searchForm = _.cloneDeep(value);
      this.fetch()
    },

    fetch() {
      let json = _.cloneDeep(this.searchForm);
      for (let i in json) {
        if (json[i] === '') {
          delete json[i]
        }
      }
      console.log(json)
      outwarehouseList(json).then(res => {
        this.tableData = res.data.list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.carrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .tableLinkBox {
    display: flex;
    .tableLink {
      cursor: pointer;
      color: #3399ea;
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>


