<template lang="html">
  <div class="app-container">
    <search
      :config="customerConfig"
      @submitForm="submitSearchForm"
      @resetForm="resetSearchForm"
    ></search>
    <el-row type="flex" justify="end">
      <el-button
        type="primary"
        size="small"
        style="margin:10px"
        @click="newCustomer"
        >创建客户</el-button
      >
    </el-row>
    <el-table :data="tableData" border :loading="loading" size="small" style="margin-bottom:12px">
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column
        v-for="(column, index) in tableConfig"
        :key="index"
        :prop="column.prop"
        :label="column.label"
      >
        <template slot-scope="scope">
          <span v-if="column.apiEnum">{{scope.row[column.prop]|apiEnum(mapConfig, column.apiEnum) }}</span>
          <span v-else-if="column.localEnum">{{ scope.row[column.prop]|localEnum(column.localEnum) }}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <div>
            <a :style="linkstyle" @click="delRow(scope.row)">删除</a>
            <a :style="linkstyle" @click="unionOwner(scope.row)">关联货主</a>
            <a :style="linkstyle" @click="viewAddress(scope.row)">维护地址</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      :visible.sync="customerEditorVisible"
      width="80%"
      title="编辑客户"
    >
      <search
        :config="editConfig"
        :border="false"
        confirmText="保存"
        :loading="editloading"
        @submitForm="submitEditForm"
        @resetForm="resetEditForm"
      ></search>
    </el-dialog>
    <el-dialog :visible.sync="unionDialogVisible">
      <el-form :model="unionForm" ref="unionForm">
        <el-form-item label="关联货主" prop="owners">
          <el-select v-model="unionForm.owners" multiple placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in mapConfig['ownerInfoMap']"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
              <span style="float: left">{{ item.key }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px; margin-right: 30px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="unionFormSubmit">确定</el-button>
        <el-button @click="unionDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="addressVisible"
      width="80%"
      title="配送地址"
    >
    <el-row type="flex" justify="end">
      <el-button
        type="primary"
        size="small"
        style="margin:10px"
        @click="newAddress"
        >新增地址</el-button
      >
    </el-row>
    <el-table :data="addressTableData" :loading="addressLoading" border size="small">
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column
        v-for="(column, index) in addressTableConfig"
        :key="index"
        :prop="column.prop"
        :label="column.label"
      >
        <template slot-scope="scope">
          <span v-if="column.apiEnum">{{scope.row[column.prop]|apiEnum(mapConfig, column.apiEnum) }}</span>
          <span v-else-if="column.localEnum">{{ scope.row[column.prop]|localEnum(column.localEnum) }}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <a :style="linkstyle" @click="delAddressRow(scope.row)">删除</a>
          <a :style="linkstyle" @click="updateAddressRow(scope.row)">编辑</a>
        </template>
      </el-table-column>
    </el-table>
      <el-dialog
        :visible.sync="addressEditVisible"
        width="70%"
        title="编辑地址"
        append-to-body
      >
        <search
          :config="addressTableConfig"
          :border="false"
          :formData="addressData"
          confirmText="保存"
          ref="addressForm"
          @submitForm="submitAddressEditForm"
          @resetForm="resetAddressEditForm"
        ></search>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { getCustomerList, saveCustomer, updateOwnerCust, ownerCustList, delCustomer, customerAddressList, saveCustomerAddress, delCustomerAddress, updateCustomerAddress } from '@/api/mis'
import { Area } from '@/utils/area'
import { mapGetters } from 'vuex'
const customerConfig = [
  {
    label: '客户状态',
    prop: 'customerState',
    placeholder: '请选择客户状态',
    apiEnum: 'getEnterpriseState',
    type: 'select',
    selectOptions: []
  },
  { label: '客户编码', prop: 'customerCode', placeholder: '请输入客户编码' },
  { label: '客户名称', prop: 'customerName', placeholder: '请输入客户名称' }
]
const editConfig = [
  { label: '客户名称', prop: 'customerName', placeholder: '请输入客户名称' },
  {
    label: '客户等级',
    prop: 'customerLevel',
    placeholder: '请选择客户等级',
    type: 'select',
    apiEnum: 'getEnterpriseLevel',
    selectOptions: []
  },
  {
    label: '客户状态',
    prop: 'customerState',
    placeholder: '请选择客户状态',
    type: 'select',
    apiEnum: 'getEnterpriseState',
    selectOptions: []
  },
  { label: '联系电话', prop: 'customerLinkuserTel', placeholder: '请输入联系电话' },
  { label: 'FAX', prop: 'customerLinkFax', placeholder: '请输入fax' },
  { label: '联系人', prop: 'customerLinkUser', placeholder: '请输入联系人' }
]
const addressTableConfig = [
  {
    label: '地址性质',
    prop: 'addrNature',
    type: 'select',
    placeholder: '请选择地址性质',
    apiEnum: 'getAddrNature',
    selectOptions: []
  },
  {
    label:'所在地区',
    prop: 'area',
    type: 'cascader',
    options: Area
  },
  {
    label:'详细地址',
    prop: 'customerAddress'
  },
  {
    label:'邮编',
    prop: 'postalCode'
  },
  {
    label:'联系电话',
    prop: 'receiverTel'
  },
  {
    label:'联系人',
    prop: 'receiverName'
  }
]
export default {
  components: { search },
  data() {
    return {
      tableConfig: customerConfig.concat({
        label: '客户等级',
        prop: 'customerLevel',
        apiEnum: 'getEnterpriseLevel',
        placeholder: '请输入客户等级'
      }),
      tableData: [],
      searchData: {},
      customerEditorVisible: false,
      linkstyle: {
        color: '#3399ea',
        whiteSpace: 'nowrap',
        margin: '0 10px 0 0'
      },
      editData: {},
      unionDialogVisible: false,
      unionForm: {
        owners: []
      },
      addressTableData: [],
      addressVisible: false,
      addressEditVisible: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      loading: false,
      editloading: false,
      addressLoading: false,
      addressData: {}
    }
  },
  computed: {
    customerConfig() {
      const configs = customerConfig
      configs.forEach(config => {
        if (config.type === 'select' && config.apiEnum) {
          config.selectOptions = this.mapConfig[config.apiEnum]
        }
      })
      return configs
    },
    addressTableConfig() {
      const configs = addressTableConfig
      configs.forEach(config => {
        if (config.type === 'select' && config.apiEnum) {
          config.selectOptions = this.mapConfig[config.apiEnum]
        }
      })
      return configs
    },
    editConfig() {
      const configs = editConfig
      configs.forEach(config => {
        if (config.type === 'select' && config.apiEnum) {
          config.selectOptions = this.mapConfig[config.apiEnum]
        }
      })
      return configs
    },
    ...mapGetters(['mapConfig'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    updateAddressRow(row) {
      this.addressEditVisible = true
      row.area = [row.customerProvince, row.customerCity, row.customerArea]
      this.addressData = row
      this.$nextTick(() => {
        this.$refs.addressForm.loadData()
      })
    },
    delAddressRow(row) {
      this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({text: '正在删除..'})
          delCustomerAddress({id: row.id}).then(res => {
            loading.close()
            this.$message(res.data)
            this.viewAddress(this.rowData)
          }).catch(err => {
            console.log(err)
            loading.close()
          })
        })
    },
    delRow(row) {
      this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({text: '正在删除..'})
          delCustomer({customerCode: row.customerCode}).then(res => {
            loading.close()
            this.$message(res.data)
            this.fetchData()
          }).catch(err => {
            console.log(err)
            loading.close()
          })
        })
    },
    fetchData() {
      this.loading = true
      getCustomerList({ pageNum: this.pageNum, pageSize: this.pageSize, ...this.searchData })
        .then(res => {
          const result = res.data
          this.tableData = result && result.list
          this.total = result.total
          this.currentPage = result.pageNum
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })

    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentPageChange(val) {
      this.pageNum = val
      this.fetchData()
    },
    newAddress() {
      this.addressEditVisible = true
    },
    viewAddress(row) {
      this.addressVisible = true
      this.rowData = row
      this.addressLoading = true
      customerAddressList({basicCustomerInfoId: row.id}).then(res => {
        console.log(res)
        const result = res.data
        result.forEach(item => {
          item.area = item.customerProvince + '/' + item.customerCity + '/' + item.customerArea
        })
        this.addressTableData = result
        this.addressLoading = false
      }).catch(err => {
        console.log(err)
        this.addressLoading = false
      })
    },
    unionOwner(row) {
      this.unionDialogVisible = true
      this.rowData = row
      ownerCustList({customerCode: row.customerCode}).then(res => {
        console.log(res)
        this.$set(this.unionForm, 'owners', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    unionFormSubmit() {
      updateOwnerCust({customerCode: this.rowData.customerCode, ownerList: this.unionForm.owners}).then(res => {
        console.log(res)
        this.$message.success('操作成功~')
      }).catch(err => {
        console.log(err)
      })
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
      this.editloading = true
      saveCustomer(val).then(res => {
        console.log(res)
        this.editloading = false
      }).catch(err => {
        this.editloading = false
      })
    },
    submitAddressEditForm(val) {
      const { id, area, ...rest } = val
      const customerProvince = area[0]
      const customerCity = area[1]
      const customerArea = area[2]
      const saveFun = id ? updateCustomerAddress : saveCustomerAddress
      const postData = { basicCustomerInfoId: this.rowData.id, basicCustomerInfoCode: this.rowData.customerCode,
        customerProvince, customerCity, customerArea,
        ...rest}
      if (id) {
        postData.id = id
      }
      saveFun(postData).then(res => {
        console.log(res)
        this.$message(res.data)
        this.addressEditVisible = false
        this.viewAddress(this.rowData)
      }).catch(err => {
        console.log(err)
      })
    },
    resetAddressEditForm() {

    }
  }
}
</script>

<style lang="css"></style>
