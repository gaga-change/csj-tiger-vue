<template>
  <div class="carrier">
    <search
      @submit="select"
      :searchForm="searchForm"
    ></search>

<!--     <div class="operationitem">
      <router-link :to="`/carrier/add?time=${moment().valueOf()}`">
        <el-button
          type="primary"
          size="mini"
        >创建承运商</el-button>
      </router-link>
    </div> -->

    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum"
      :loading="loading"
      :total="total"
      :config="quationListConfig"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import search from '../components/quationSearch'
import BaseTable from '@/components/Table'
import { quotionInfo, quotionDelete } from '@/api/freight'
import { quationListConfig } from '../components/config'
import _ from 'lodash';
import moment from 'moment';
export default {
  components: { search, BaseTable },
  data() {
    return {

      //搜索项
      searchForm: {
        ownerCode: '',
        gmtCreateStart: '',
        gmtCreateEnd: '',
        createTime:[],
        pageSize: 10,
        pageNum: 1
      },
      total: 0,

      //table配置
      loading: false,
      quationListConfig,
      tableData: []
    }
  },

  mounted() {
    this.fetch()
  },

  created() {
    this.quationListConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div class="tableLinkBox">
              {
                <span class="tableLink" onClick={this.delete.bind(this, row)}>删除</span>
              }

              {
                <router-link to={`/freight/quationList/add?id=${row.id}&type=modify`} class="tableLink">修改</router-link>
              }

              {
                <router-link to={`/freight/quationList/detail?id=${row.id}`} class="tableLink">查看</router-link>
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

    delete(row) {
      //请求配置
      let submit = () => quotionDelete({
        id: row.id
      }).then(res => {
        if (res.success) {
          this.$message({ type: 'success', message: '操作成功' });
          this.fetch()
        }
      }).catch(err => {
        console.error(err)
      })
      //对话配置
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        submit()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    select(value) {
      this.searchForm = _.cloneDeep(value);
      this.fetch()
    },

    fetch() {
      if(this.searchForm.createTime && this.searchForm.createTime.length>0){
        this.searchForm.gmtCreateStart=this.searchForm.createTime[0]
        this.searchForm.gmtCreateEnd=this.searchForm.createTime[1]
      }else{
        this.searchForm.gmtCreateStart=null
        this.searchForm.gmtCreateEnd=null
      }
      let json = _.cloneDeep(this.searchForm);
      for (let i in json) {
        if (json[i] === '') {
          delete json[i]
        }
      }
      this.loading = true;
      quotionInfo(json).then(res => {
        if (res.success) {
          this.tableData = res.data && Array.isArray(res.data.list) && res.data.list || [];
          this.total = res.data && res.data.total
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
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
