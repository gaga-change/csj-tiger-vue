<template>
  <div class="app-container">
    <search
      :config="searchConfig"
      @submitForm="submitSearchForm"
      @resetForm="resetSearchForm"
      :labelWidth="100"
    ></search>
    <el-row
      type="flex"
      justify="end"
    >
      <el-button
        type="primary"
        style="margin:10px"
        size="mini"
        @click="newCustomer(null)"
      >新增</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      size="small"
      style="margin-bottom:12px"
    >
      <el-table-column
        type="index"
        label="序号"
        width="55"
      ></el-table-column>
      <el-table-column
        v-for="(column, index) in tableConfig"
        :key="index"
        :prop="column.prop"
        :label="column.label"
      >
        <template slot-scope="scope">
          <span v-if="column.apiEnum">{{scope.row[column.prop]|apiEnum(mapConfig, column.apiEnum) }}</span>
          <span v-else-if="column.localEnum">{{ scope.row[column.prop]|localEnum(column.localEnum) }}</span>
           <span v-else-if="column.type === 'time' && scope.row[column.prop]">{{
            scope.row[column.prop] | parseTime
            }}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        fixed="right"
      >
        <template slot-scope="scope">
          <div>
            <a
              :style="linkstyle"
              @click="newCustomer(scope.row)"
            >修改</a>
            <a
              :style="linkstyle"
              @click="changeRow(scope.row)"
              v-if="scope.row.projectStatus===1"
            >禁用</a>
             <a
              :style="linkstyle"
              @click="changeRow(scope.row)"
              v-if="scope.row.projectStatus===2"
            >启用</a>
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
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :visible.sync="customerEditorVisible"
      width="80%"
      title="项目部"
    >
      <search
        :labelWidth="110"
        :config="editConfig"
        :border="false"
        confirmText="保存"
        :loading="editloading"
        :formData="editData"
        @submitForm="submitEditForm"
        @resetForm="resetEditForm"
        ref="saveRef"
      ></search>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { projectInfo, projectCreate, projectUpdate, projectStatusChange } from '@/api/mis'
import { mapGetters } from 'vuex'
const searchConfig = [
  {
    label: '项目部状态',
    prop: 'projectStatus',
    placeholder: '请选择项目部状态',
    apiEnum: 'getStatus',
    type: 'select',
    selectOptions: []
  },
  { label: '项目部名称', prop: 'projectName', placeholder: '请输入项目部名称' },
  {
    label: '创建时间',
    prop: 'searchdate',
    type: 'daterange'
  },
]
const editConfig = [
  { label: '项目部编码', prop: 'projectCode', disabled:true},
  { label: '项目部名称', prop: 'projectName', placeholder: '请输入项目部名称', rules: [{ required: true, message: '必填项' }, { type: 'string', max: 20, message: '长度最多20位' }] },
  {
    label: '联系人',
    prop: 'linkUser',
    placeholder: '请输入联系人',
    rules: [{ required: true, message: '必填项' }]
  },
  {
    label: '手机号',
    prop: 'linkTel',
    placeholder: '请输入手机号',
    rules: [{ required: true, message: '必填项' },{message:'请输入正确格式的手机号',pattern:/^1[34578]\d{9}$/ }]
  },
  { label: '备注', prop: 'remarkInfo', placeholder: '请输入', type:'textarea'},
]
export default {
  components: { search },
  data() {
    return {
      tableConfig: [
        {label: '项目部编码',prop: 'projectCode'},
        {label: '项目部名称',prop: 'projectName'},
        {label: '联系人',prop: 'linkUser'},
        {label: '联系方式',prop: 'linkTel'},
        {label: '状态',prop: 'projectStatus',apiEnum:'getStatus'}, 
        {label: '创建日期',prop: 'gmtCreate',type:'time' },
        {label: '创建人',prop: 'createrName'}
      ],
      tableData:[],
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
      addressData: {
      },
      alertTitle: '新增地址',
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
    searchConfig() {
      const configs = searchConfig
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
    changeRow(row) {
      let msg=row.projectStatus==1?'禁用':'启用'
      this.$confirm('确定'+msg+'吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({ text: '正在操作..' })
        let submitData=JSON.parse(JSON.stringify(row))
        submitData.projectStatus=submitData.projectStatus==1?2:1
        projectStatusChange(submitData).then(res => {
          loading.close()
          if (res.success) {
            this.$message.success('操作成功')
            this.fetchData()
          } else {
            this.$message.error('操作失败')
          }
        }).catch(err => {
          loading.close()
        })
      })
    },
    fetchData() {
      this.loading = true
      if(this.searchData.searchdate&& this.searchData.searchdate.length>0){
        this.searchData.createBeginDate=this.searchData.searchdate[0].getTime()
        this.searchData.createEndDate=this.searchData.searchdate[1].getTime()
      }else{
        this.searchData.createBeginDate=null
        this.searchData.createEndDate=null
      }
      projectInfo({ pageNum: this.pageNum, pageSize: this.pageSize, ...this.searchData })
        .then(res => {
          const result = res.data
          this.tableData = result && result.list
          this.total = result.total
          this.currentPage = result.pageNum
          this.loading = false
        }).catch(err => {
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
    newCustomer(val) {
      this.customerEditorVisible = true
      setTimeout(() => {
        this.editData = val ? JSON.parse(JSON.stringify(val)) : Object.create({});
        this.$refs['saveRef'].loadData()
      }, 100)

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
      let api = projectCreate;
      if (val.id) {
        api = projectUpdate;
      }
      this.editloading = true
      api(val).then(res => {
        this.editloading = false
        this.customerEditorVisible = false
        if (res.success) {
          this.$message.success('操作成功')
          this.fetchData()
        } else {
          this.$message.error('操作失败')
        }
      }).catch(err => {
        this.$message.error('操作失败')
        this.editloading = false
      })
    }
  }
}
</script>

<style lang="css"></style>
