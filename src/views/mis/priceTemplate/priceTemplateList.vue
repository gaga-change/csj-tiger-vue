<template>
  <div>
    <el-card shadow="never">
      <el-select
        v-model="consoildatorCode"
        clearable
        placeholder="请选择承运商"
        class="formitem"
      >
        <el-option
          v-for="item in consoil"
          :label="item.consoildatorName"
          :key="item.consoildatorCode"
          :value="item.consoildatorCode"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="mini"
        @click="search()"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="mini"
        @click="reset()"
      >重置</el-button>
    </el-card>
    <el-row type="flex" justify="end">      
      <el-button
        style="margin:10px"
        type="primary"
        size="mini"
        @click="newTemp()"
      >新建模板</el-button>
    </el-row>
    <base-table2
      ref="baseTable"
      :config="tableConfig"
      :showControl="true"
      :controlWidth="200"
      :showIndex="true"
      :data.sync="tableData"
      :api="api"
    >
      <template slot-scope="scope">
        <div>
          <el-button
            type="text"
            icon="el-icon-delete"
            :disabled="scope.row.loading"
            v-loading="scope.row.loading"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            type="text"
            @click="handleView(scope.row)"
          >查看</el-button>
        </div>
      </template>
    </base-table2>
  </div>
</template>
<script>
import { queryFreightTemplate, deleteFreightTemplate } from '@/api/mis'
import { tableConfig } from './config'
import { consoilInfoList } from '@/api/carrier'
export default {
  data() {
    return {
      tableConfig: tableConfig,
      tableData: [],
      api: queryFreightTemplate,
      consoil: [],
      consoildatorCode: null
    }
  },
  created() {
    this.getConsoilInfoList()
  },
  methods: {
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.error(err)
        })
    },
    search() {
      const postData = { pageNum: 1 }
      if (this.consoildatorCode) {
        postData.consoildatorCode = this.consoildatorCode
      }
      this.$refs['baseTable'].fetchData(postData)
    },
    reset() {
      this.consoildatorCode = null
      this.search()
    },
    handleView(row) {
      this.$router.push({
        name: 'priceTemplateDetail',
        query: {
          templateCode: row.templateCode
        }
      })
    },
    newTemp() {
      this.$router.push({
        name: 'priceTemplateCreate'
      })
    },
    handleDelete(row) {
      this.$confirm(`确定删除${row.templateName}的相关信息吗?`, {
        type: 'warning'
      }).then(() => {
        row.loading = true
        deleteFreightTemplate(row.templateCode).then(res => {
          row.loading = false
          if (res.success) {
            this.$message.success('删除成功')
            this.search()
          }
        }).catch(err => {
          console.log(err)
          row.loading = false
        })
      })
    }
  }
}
</script>