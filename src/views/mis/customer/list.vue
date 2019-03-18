<template lang="html">
  <div class="app-container">
    <search :config="customerConfig" @submitForm="submitSearchForm" @resetForm="resetSearchForm"></search>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newCustomer">创建客户</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column v-for="(column, index) in tableConfig" :key="index" :prop="column.prop" :label="column.label">
        <template slot-scope="scope">
          <span>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <a :style="linkstyle" @click="delRow(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="customerEditorVisible" width="80%" title="编辑客户">
      <search
        :config="editConfig"
        :border="false"
        confirmText="保存"
        @submitForm="submitEditForm"
        @resetForm="resetEditForm"></search>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
const customerConfig = [
  { label: '客户状态', prop: 'customerStatus', placeholder: '请选择客户状态', type: 'select', selectOptions: [{ value: '状态1', key: 1 }] },
  { label: '客户编码', prop: 'itemCode', placeholder: '请输入物料编码' },
  { label: '客户名称', prop: 'itemName', placeholder: '请输入客户物料名称' }
]
const editConfig = [
  { label: '客户名称', prop: 'itemName', placeholder: '请输入客户物料名称' },
  { label: '客户等级', prop: 'customerLevel', placeholder: '请选择客户等级', type: 'select', selectOptions: [{ value: '普通会员', key: 1 }] },
  { label: '客户状态', prop: 'customerStatus', placeholder: '请选择客户状态', type: 'select', selectOptions: [{ value: '状态1', key: 1 }] },
  { label: '联系电话', prop: 'phone', placeholder: '请输入联系电话' },
  { label: 'FAX', prop: 'fax', placeholder: '请输入fax' },
  { label: '联系人', prop: 'linkUser', placeholder: '请输入联系人' }
]
export default {
  components: { search },
  data() {
    return {
      customerConfig,
      tableConfig: customerConfig.concat({ label: '客户等级', prop: 'customerLevel', placeholder: '请输入客户等级' }),
      tableData: [{ itemCode: '001' }],
      searchData: {},
      editConfig,
      customerEditorVisible: false,
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      editData: {}
    }
  },
  methods: {
    fetchData() {

    },
    newCustomer() {
      this.customerEditorVisible = true
    },
    submitSearchForm(val) {
      this.searchData = val
      this.fetchData()
    },
    resetSearchForm() {
      this.searchData = {}
      this.fetchData()
    },
    submitEditForm(val) {
      this.editData = val
      this.submitEdit(val)
    },
    resetEditForm() {
      this.editData = {}
    },
    submitEdit(val) {

    }
  }
}
</script>

<style lang="css">
</style>
