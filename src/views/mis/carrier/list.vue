<template>
  <div class="carrier">
    <search
      @submit="select"
      :searchForm="searchForm"
    ></search>

    <div class="operationitem">
      <router-link :to="`/carrier/add?time=${moment().valueOf()}`">
        <el-button
          type="primary"
          size="mini"
        >创建承运商</el-button>
      </router-link>
    </div>

    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum"
      :loading="loading"
      :total="total"
      :config="carrierListConfig"
      :tableData="tableData"
    />
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
      :page-size="pageSize"
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
import search from './components/search'
import BaseTable from '@/components/Table'
import { consoilInfoList, consoilInfoDel } from '@/api/carrier'
import { projectInfo, carrierProjectContact, carrierProjectInfo } from '@/api/mis'
import { carrierListConfig } from './components/config'
import _ from 'lodash';
import moment from 'moment';
export default {
  components: { search, BaseTable },
  data() {
    return {

      //搜索项
      searchForm: {
        consoildatorCode: '',
        consoildatorName: '',
        consoildatorState: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,

      //table配置
      loading: false,
      carrierListConfig,
      tableData: [],
      projectVisible:false,
      projectData:[],
      projectpageNum: 1,
      projectpageSize: 10,
      projecttotal: 0,
      projectcurrentPage: 1,
      linkData:[],
      submitInfo:null,
      contactedData:[],
      pageSize:10
    }
  },

  mounted() {
    this.fetch()
    this.projectInfo()
  },

  created() {
    this.carrierListConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div class="tableLinkBox">
              {
                <router-link to={`/carrier/detail?consoildatorCode=${row.consoildatorCode}`} class="tableLink">查看</router-link>
              }

              {
                <router-link to={`/carrier/add?consoildatorCode=${row.consoildatorCode}&type=modify`} class="tableLink">修改</router-link>
              }

              {
                <span class="tableLink" onClick={this.delete.bind(this, row)}>删除</span>
              }
              {
                <span class="tableLink" onClick={this.showProject.bind(this,row)}>关联项目部</span>
              }
            </div>
          )
        }
      }
    })
  },

  methods: {
    showProject(row){
      this.projectVisible=true
      this.submitInfo=row
      this.getCarrierProjectInfo(row.consoildatorCode)
    },
    getCarrierProjectInfo(val){
      this.contactedData=[]
      carrierProjectInfo({consoildatorCode:val}).then(res=>{
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
    projectInfo() {
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
        carrierProjectContact({consoildatorCode:this.submitInfo.consoildatorCode,consoildatorName:this.submitInfo.consoildatorName,projectList:submitData}).then(res=>{
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
      let submit = () => consoilInfoDel({
        carrierNo: row.consoildatorCode
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
      let json = _.cloneDeep(this.searchForm);
      for (let i in json) {
        if (json[i] === '') {
          delete json[i]
        }
      }
      this.loading = true;
      consoilInfoList(json).then(res => {
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
