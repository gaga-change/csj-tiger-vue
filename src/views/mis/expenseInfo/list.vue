<template>
  <div class="app-container">
    <search
      :config="customerConfig"
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
        label="费用编码"
        prop="costCode"
        width="80"
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
              v-if="scope.row.costStatus===1"
            >禁用</a>
             <a
              :style="linkstyle"
              @click="changeRow(scope.row)"
              v-if="scope.row.costStatus===2"
            >启用</a>
            <a
              :style="linkstyle"
              @click="showProject(scope.row)"
            >关联项目部</a>
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
      :visible.sync="costEditorVisible"
      width="80%"
      title="费用"
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
    <el-dialog
      :visible.sync="projectVisible"
      width="600px"
      title="关联项目部"
    >
      <el-table
      :data="projectData"
      border
      size="small"
      style="margin-bottom:12px"
      @selection-change="handleSelectionChange"
      ref="linkTable"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="项目部编码"
        prop="projectCode"
      ></el-table-column>
      <el-table-column
        label="项目部名称"
        prop="projectName"
      ></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleProjectCurrentPageChange"
      :current-page="projectpageNum"
      :page-sizes="[10]"
      :page-size="projectpageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="projecttotal"
    >
    </el-pagination>
    <div style="text-align:center;">
      <el-button style="margin:10px" size="mini" @click="linkSubmit(false)">关闭</el-button>
      <el-button type="primary" style="margin:10px" size="mini" @click="linkSubmit(true)">提交</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { projectInfo, costInfo, costInfoCreate, costInfoUpdate, costStatusChange, costProjectContact, costProjectInfo } from '@/api/mis'
import { mapGetters } from 'vuex'
const customerConfig = [
  { label: '费用名称', prop: 'costName', placeholder: '请输入费用名称' },
  { label: '收入成本标识', prop: 'costFlag', placeholder: '请选择收入成本标识', type: 'select', apiEnum: 'getCost',selectOptions: [] },
  {
    label: '状态',
    prop: 'costStatus',
    placeholder: '请选择状态',
    apiEnum: 'getStatus',
    type: 'select',
    selectOptions: []
  }, 
]
const editConfig = [
  { label: '费用编码', prop: 'costCode', disabled:true},
  { label: '费用名称', prop: 'costName', placeholder: '请输入费用名称', rules: [{ required: true, message: '必填项' }, { type: 'string', max: 20, message: '长度最多20位' }] },
  {
    label: '收入成本标识',
    prop: 'costFlag',
    placeholder: '请选择标识',
    rules: [{ required: true, message: '必填项' }],
    type: 'select',
    apiEnum: 'getCost',
    selectOptions: []
  },
  {
    label: '状态',
    prop: 'costStatus',
    placeholder: '请选择状态',
    rules: [{ required: true, message: '必填项' }],
    type: 'select',
    apiEnum: 'getStatus',
    selectOptions: []
  },
  { label: '备注', prop: 'remarkInfo', placeholder: '请输入备注', type:'textarea'},
]
export default {
  components: { search },
  data() {
    return {
      tableConfig: customerConfig.concat(
        {label: '创建人',
        prop: 'createrName'
      },{label: '创建日期',
        prop: 'gmtCreate',
        type:'time'
      },{
        label: '备注',
        prop: 'remarkInfo'
      }),
      tableData: [],
      searchData: {},
      costEditorVisible: false,
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
      searchForm:{},
      projectVisible:false,
      projectData:[],
      projectpageNum: 1,
      projectpageSize: 10,
      projecttotal: 0,
      projectcurrentPage: 1,
      linkData:[],
      submitId:null,
      currentPageContact:[],
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
    this.firstprojectInfo()
  },
  methods: {
    showProject(row){
      this.projectVisible=true
      this.submitId=row
      this.getCostProjectInfo(row.costCode)
    },
    getCostProjectInfo(val){
      this.contactedData=[]
      costProjectInfo({costCode:val}).then(res=>{
        if (res.success) {
          this.contactedData=res.data&&res.data.length>0?res.data:[]
          this.checkedTable()
        }else{
          this.contactedData=[]
        } 
      }).catch(err=>{
        this.contactedData=[]
      })
    },
    checkedTable(){
      this.currentPageContact=[]
      if(this.contactedData && this.contactedData.length>0){
        this.$refs.linkTable.clearSelection()
        this.contactedData.map(item=>{
          this.projectData.map(val=>{
            if(val.projectCode==item.projectCode){
              this.$refs.linkTable.toggleRowSelection(val,true)
              this.currentPageContact.push(item)
            }
          })
        })
      }
    },
    firstprojectInfo() {
      projectInfo({ pageNum: this.projectpageNum, pageSize: this.projectpageSize }).then(res => {
        const result = res.data
        this.projectData = result && result.list
        this.projecttotal = result.total
        this.$nextTick(function () {
          this.checkedTable()
        })
      }).catch(err => {
      })
    },
    projectInfo() {
      projectInfo({ pageNum: this.projectpageNum, pageSize: this.projectpageSize }).then(res => {
        const result = res.data
        this.projectData = result && result.list
        this.projecttotal = result.total
        this.$nextTick(function () {
          // this.currentContact()
          this.checkedTable()
        })
      }).catch(err => {
      })
    },
    // handleProjectSizeChange(val) {
    //   this.projectpageSize = val
    //   this.projectInfo()
    // },
    currentContact(){
      let deleteData=[]
      let contactedProjectCode=[]
      if(this.currentPageContact.length>0){
        if(this.linkData.length>0){
          this.linkData.map(item=>{
            contactedProjectCode.push(item.projectCode)
          })
          this.currentPageContact.map(val=>{
            if(!(contactedProjectCode.indexOf(val)>-1)){
              this.contactedData.splice(this.contactedData.findIndex(indexItem => indexItem.projectCode === val.projectCode),1)
            }
          })
          this.linkData.map(item=>{
            if(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode)<0){
              this.contactedData.push({
                projectCode:item.projectCode,
                projectName:item.projectName
              })
            }
          })
        }else{
          this.currentPageContact.map(item=>{
            this.contactedData.splice(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode), 1)
          })
        }
      }else{
        if(this.linkData.length>0){
          this.linkData.map(item=>{
            if(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode)<0){
              this.contactedData.push({
                projectCode:item.projectCode,
                projectName:item.projectName
              })
            }
          })
        }
      }
    },
    handleProjectCurrentPageChange(val) {
      this.projectpageNum = val
      this.currentContact()
      this.projectInfo()
    },
    handleSelectionChange(val){
      this.linkData=val
    },
    linkSubmit(val){
      let isSubmit=val
      if(isSubmit){
        this.currentContact()
        if(this.contactedData.length<=0){
          this.$message.error('请勾选选项')
          return
        }
        let submitData=[]
        this.contactedData.map(item=>{
          submitData.push({
            projectCode:item.projectCode,
            projectName:item.projectName
          })
        })
        costProjectContact({costCode:this.submitId.costCode,costName:this.submitId.costName,projectList:submitData}).then(res=>{
          if (res.success) {
            this.$message.success('关联成功')
            this.fetchData()
            this.projectVisible=false
            this.$refs['linkTable'].clearSelection()
            this.linkData=[]
          } else {
            this.$message.error('操作失败')
          }
        }).catch(err => {
          this.$message.error('操作失败')
        })
      }else{
        this.$refs['linkTable'].clearSelection()
        this.linkData=[]
        this.projectVisible=false
      }
    },
    changeRow(row) {
      let msg=row.costStatus==1?'禁用':'启用'
      this.$confirm('确定'+msg+'吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({ text: '正在操作..' })
        let submitData=JSON.parse(JSON.stringify(row))
        submitData.costStatus=submitData.costStatus==1?2:1
        costStatusChange(submitData).then(res => {
          loading.close()
          if (res.success) {
            this.$message.success('操作成功')
            this.fetchData()
          } else {
            this.$message.error('操作失败')
          }
        }).catch(err => {
          this.$message.error('操作失败')
          loading.close()
        })
      })
    },
    fetchData() {
      this.loading = true
      costInfo({ pageNum: this.pageNum, pageSize: this.pageSize, ...this.searchData }).then(res => {
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
      this.costEditorVisible = true
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
      let api = costInfoCreate;
      if (val.id) {
        api = costInfoUpdate;
      }
      this.editloading = true
      api(val).then(res => {
        this.editloading = false
        this.costEditorVisible = false
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
