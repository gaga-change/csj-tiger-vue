<template>
  <div>
    <search-from :searchForm="searchForm" @submit="submit"></search-from>
    <div>
      <el-button
        type="primary"
        size="small"
        style="float:right;margin-bottom:8px;"
        @click="goAddRouter"
        >新增租户</el-button
      >
      <div style="clear:both"></div>
    </div>
    <div class="msginfo" v-if="selection.length">
      <i class="el-icon-info color-108ee9"></i>
      <span style="margin-left:6px;"
        >已选择<span class="color-108ee9">{{ selection.length }}</span
        >项数据</span
      >
    </div>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionPartentChange="selectionPartentChange"
      :loading="loading"
      :config="listIndexConfig"
      :total="total"
      :maxTotal="10"
      :pageSize="pageSize"
      :showMul="true"
      :currentPage="pageNum"
      :tableData="tableData"
    />
    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="所属仓库：" >
          <el-select v-model="addForm.warehouses" multiple filterable placeholder="请选择需要关联的仓库" style="width:400px">
            <el-option
              v-for="item in mapConfig['getWarehouse']"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              <span style="float: left">{{ item.key }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px; margin-right: 30px">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="confirmStore" type="primary" :loading="storeLoading" :disabled="storeLoading">确定</el-button>
        <el-button @click="cancelStore">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="configVisible" title="推送配置">
      <div style="font-size:12px;margin-bottom:10px;">注:如需推送INFO请先维护货主INFO!</div>
      <el-form :model="configForm" label-width="80px" ref="configForm">
        <template v-for="item in configForm.configList">
            <el-form-item :label="item.name" >
              <el-checkbox-group v-model="item.warehouseSysCodeList" :key="item.basicInfoType">
                <template v-if="item.name=='商品'">
                  <el-checkbox label="INFO" :disabled="true"></el-checkbox>
                  <el-checkbox label="SHARK"></el-checkbox>
                </template>
                <template v-else>
                  <el-checkbox label="INFO" :disabled="true"></el-checkbox>
                </template>
              </el-checkbox-group>
            </el-form-item>
        </template>
      </el-form>
      <span slot="footer">
        <el-button @click="confirmConfig" type="primary" :loading="configLoading" :disabled="configbtn">确定</el-button>
        <el-button @click="configVisible=false;" :disabled="configbtn">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchFrom from './components/search'
import { listIndexConfig } from './components/config'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
import { tenantList, delTenant, effectTenant, saveOwnerWarehouse, ownerWarehouseList, configPush, configInfo } from '@/api/tenant'
import moment from 'moment'
export default {
  components: { SearchFrom, BaseTable },
  data() {
    return {
      searchForm: {},
      listIndexConfig,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      loading: false,
      selection: [],
      effectloading: false,
      linkstyle: {
        color: '#3399ea',
        whiteSpace: 'nowrap',
        margin: '0 10px 0 0'
      },
      dialogVisible: false,
      addForm: {
        warehouses: [],
      },
      storeLoading: false,
      configVisible:false,
      configForm:{
        isSync:null,
        ownerCode:null,
        configList:[{name:'商品',basicInfoType:1,warehouseSysCodeList:[]},{name:'供应商',basicInfoType:3,warehouseSysCodeList:[]},{name:'客户',basicInfoType:4,warehouseSysCodeList:[]}]
      },
      configbtn:false,
      configLoading:false
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])

  },

  mounted() {
    this.getCurrentTableData()
  },

  created() {
    this.listIndexConfig.forEach(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <router-link
                to={{
                  path: '/tenant/detail',
                  query: { id: row.id, ownerCode: row.ownerCode }
                }}
                style={this.linkstyle}
              >
                查看
              </router-link>
              <router-link
                to={{
                  path: '/tenant/add',
                  query: { id: row.id, ownerCode: row.ownerCode }
                }}
                style={this.linkstyle}
              >
                修改
              </router-link>
              <a
                onClick={() => {
                  this.showStore({ id: row.id, ownerCode: row.ownerCode })
                }}
                style={this.linkstyle}
              >
                查看仓库
              </a>
              {
                row.ownerState === 2 &&
                <a onClick={() => {this.delete({ ownerCode: row.ownerCode })}} style={this.linkstyle}>删除</a>
              }
              {
                row.ownerState === 1 && (
                <a
                  onClick={() => {
                    this.setState({ ownerCode: row.ownerCode, ownerState: 2 })
                  }}
                  style={this.linkstyle}
                >
                  禁用
                </a>
              )}
              {row.ownerState === 2 && (
                <a
                  onClick={() => {
                    this.setState({ ownerCode: row.ownerCode, ownerState: 1 })
                  }}
                  style={this.linkstyle}
                >
                  启用
                </a>
              )}
              <a
                onClick={() => {
                  this.showConfig(row)
                }}
                style={this.linkstyle}
              >
                推送配置
              </a>
            </div>
          )
        }
      }
    })
  },

  methods: {
    showConfig(row){
      let rowdata=row
      this.configForm.isSync=row.isSync
      this.configForm.ownerCode=row.ownerCode
      this.configForm.configList.map(item=>{
        item.warehouseSysCodeList=[]
      })
      configInfo({ownerCode:row.ownerCode}).then(res=>{
        if(res.success){
          if(res.data && (res.data.baseConfigReqList && res.data.baseConfigReqList.length>0)){
            let data=res.data.baseConfigReqList
            this.configForm.configList.map(item=>{
              data.map(subitem=>{
                if(subitem.basicInfoType===item.basicInfoType){
                  item.warehouseSysCodeList.push(subitem.warehouseSysCode)
                }
              })
            })
          }
          // else{
          //   if(rowdata.isSync===1){
          //     this.configForm.configList.map(item=>{
          //       item.warehouseSysCodeList.push('INFO')
          //     })
          //   }
          // }
          this.configVisible = true
        }
      })
    },
    // checkboxchange(val){
    //   if(val.length>0){
    //     for(let i=0;i<val.length;i++){
    //       if(val[i]=='INFO'){
    //         if(this.configForm.isSync!=1){
    //           this.$message.error('请先维护货主INFO')
    //           val.splice(i,1)
    //         }
    //       }
    //     }
    //   }
    // },
    confirmConfig(){
      let warehouseData=[]
      let submitData={}
      this.configForm.configList.map(item=>{
        if(item.warehouseSysCodeList.length>0){
          for(let i=0;i<item.warehouseSysCodeList.length;i++){
            warehouseData.push({
              basicInfoType:item.basicInfoType,
              warehouseSysCode:item.warehouseSysCodeList[i]
            })
          }
        }
      })
      if(warehouseData.length<=0){
        this.$message.error('推送配置不能为空')
        return
      }
      this.configbtn=true
      this.configLoading=true
      submitData.ownerCode=this.configForm.ownerCode
      submitData.baseConfigReqList=warehouseData
      configPush(submitData).then(res=>{
        this.configbtn=false
        this.configLoading=false
        if(res.success){
          this.$message.success('推送配置成功')
          this.getCurrentTableData()
          this.configVisible = false
        }
      }).catch(err=>{
        this.configbtn=false
        this.configLoading=false
      })
    },
    confirmStore() {
      this.storeLoading = true
      saveOwnerWarehouse({
        ...this.addForm
      }).then(res => {
        this.storeLoading = false
        this.dialogVisible = false
      }).catch(err => {
        this.storeLoading = false
        this.dialogVisible = false
      })
    },
    cancelStore() {
      this.dialogVisible = false
    },
    setState(arg) {
      const loading = this.$loading({
        lock: true,
        text: '执行中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      effectTenant(arg)
        .then(res => {
          loading.close()
          this.getCurrentTableData()
        })
        .catch(err => {
          loading.close()
          console.error(err)
        })
    },
    showStore(row) {
      this.dialogVisible = true
      this.storeLoading = true
      ownerWarehouseList({ ownerCode: row.ownerCode }).then(res => {
        let result = res.data.map(v=>v.warehouseCode);
        let arr=[];
        result.forEach(v=>{
          if(!arr.includes(v)){
            arr.push(v)
          }
        })
        this.addForm.warehouses = arr
        this.addForm.ownerCode = row.ownerCode
        this.storeLoading = false
      }).catch(err => {
        console.error(err)
      })
    },
    delete(arg) {
      this.$confirm('此操作将永久删除租户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '正在删除...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        delTenant(arg)
          .then(res => {
            loading.close()
            this.$message(res.data)
            this.getCurrentTableData()
          })
          .catch(err => {
            loading.close()
            console.error(err)
          })
      })
    },
    goAddRouter() {
      this.$router.push({
        name: 'tenantAdd'
      })
    },
    selectionPartentChange(val) {
      this.selection = val
    },

    submit(value) {
      this.searchForm = value
      this.getCurrentTableData()
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.getCurrentTableData()
    },

    handleCurrentChange(val) {
      this.pageNum = val
      this.getCurrentTableData()
    },

    getCurrentTableData() {
      this.loading = true
      let json = {}
      for (let i in this.searchForm) {
        if (this.searchForm[i] !== '') {
          json[i] = this.searchForm[i]
        }
      }
      tenantList({
        ...json,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
        .then(res => {
          this.loading = false
          if (res.success) {
            this.tableData = (res.data && res.data.list) || []
            this.total = res.data && res.data.total
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.msginfo {
  height: 30px;
  line-height: 30px;
  background: #e6f3fc;
  border: #d4f0fc 1px solid;
  border-radius: 5px;
  font-size: 12px;
  text-indent: 8px;
  margin-bottom: 10px;
}
.color-108ee9 {
  color: #108ee9;
}
</style>
