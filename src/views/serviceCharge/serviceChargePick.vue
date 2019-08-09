<template>
  <div>
    <search-form2
      :config="serviceChargePickSearchConfig"
      @search="search"
    />
    <div class="text-right">
      <el-button
        type="primary"
        @click="handleCreate()"
      >新建</el-button>
    </div>
    <div class="mt15">
      <base-table2
        ref="baseTable"
        :config="serviceChargePickTableConfig"
        :showControl="true"
        :data.sync="tableData"
        :api="serviceChargeBillQueryPageList"
      >
        <template slot-scope="scope">
          <div>
            <el-link
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link
              icon="el-icon-edit"
              @click="handleModify(scope.row)"
            >编辑</el-link>
          </div>
        </template>
      </base-table2>
    </div>
    <service-charge-pick-form
      :visible.sync="serviceChargePickFormVisible"
      @confirm="confirm"
      :row="nowRow"
    />
  </div>
</template>

<script>
import serviceChargePickForm from './components/serviceChargePickForm'
import { serviceChargePickSearchConfig, serviceChargePickTableConfig } from './config'
import { serviceChargeBillQueryPageList, serviceChargeBillDelete } from '@/api'
export default {
  components: { serviceChargePickForm },
  data() {
    return {
      serviceChargePickSearchConfig,
      serviceChargePickTableConfig,
      serviceChargeBillQueryPageList,
      serviceChargePickFormVisible: false,
      tableData: [],
      nowRow: null
    }
  },
  methods: {
    search(searchParams, cb) {
      this.$refs['baseTable'].fetchData(searchParams).then(cb)
    },
    /** 删除 */
    handleDelete(row) {
      this.$delConfirm('此操作将永久删除改收派服务费配置, 是否继续?', () => serviceChargeBillDelete(row.id).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.$refs['baseTable'].fetchData()
      }))
    },
    /** 修改 */
    handleModify(row) {
      this.nowRow = row
      this.$nextTick(() => {
        this.serviceChargePickFormVisible = true
      })
    },
    /** 添加 */
    handleCreate() {
      this.nowRow = null
      this.$nextTick(() => {
        this.serviceChargePickFormVisible = true
      })
    },
    /** 添加后刷新列表 */
    confirm() {
      this.$refs['baseTable'].fetchData()
    }
  },
}
</script>
