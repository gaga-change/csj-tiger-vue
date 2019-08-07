<template>
  <div>
    <search-form2
      :config="serviceChargePickSearchConfig"
      @search="search"
    />
    <div class="text-right">
      <el-button
        type="primary"
        @click="serviceChargePickFormVisible = true"
      >新建</el-button>
    </div>
    <div class="mt15">
      <base-table2
        :config="serviceChargePickTableConfig"
        :showControl="true"
        :data="[]"
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
    <service-charge-pick-form :visible.sync="serviceChargePickFormVisible" />
  </div>
</template>

<script>
import serviceChargePickForm from './components/serviceChargePickForm'
import { serviceChargePickSearchConfig, serviceChargePickTableConfig } from './config'
export default {
  components: { serviceChargePickForm },
  data() {
    return {
      serviceChargePickSearchConfig,
      serviceChargePickTableConfig,
      serviceChargePickFormVisible: false,
    }
  },
  methods: {
    search(searchParams, cb) {
      console.log(searchParams)
      cb()
    },
    /** 删除 */
    handleDelete(row) {
      this.$delConfirm('此操作将永久删除改收派服务费配置, 是否继续?', Promise.resolve())
    },
    /** 修改 */
    handleModify() {

    }
  },
}
</script>
