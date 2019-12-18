<template lang="html">
  <div class="addCarrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
       <template >
          <el-button @click="submit('save')" type="primary">保存</el-button>
       </template>
    </sticky>
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row :gutter="10">
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主名称:"  prop="ownerCode"  :rules="[{ required: true, message: '该项为必填'}]" >
              <el-select  v-model="searchForm.ownerCode"   @change="getownerName" placeholder="请搜索选择" size="small" class="formitem" clearable filterable>
                <el-option
                  v-for="item in ownerData"
                  :label="item.ownerName"
                  :key="item.ownerCode"
                  :value="item.ownerCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="费用模板:"  prop="nameList"  :rules="[{ required: true, message: '该项为必填'}]" >
              <el-input v-model="searchForm.nameList" size="mini" class="formitem" :disabled="true"></el-input>
              <span style="color:#20b6f9;cursor:pointer;" @click="showTem">选择模板</span>
            </el-form-item>
          </el-col>      
    </el-row>
    <div style="width:1000px;margin:20px 0;">
      <el-table
        :data="tableData"
        border
        size="small"
        ref="temTable"
      >
        <el-table-column
          v-for="(column, index) in quationTemConfig"
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
              <span v-else-if="column.type === 'index'">{{
              scope.$index+1
              }}</span>
              <template v-else-if="(column.prop === 'heavyRulesList' || column.prop === 'lightRulesList') || column.prop === 'endPlaseList'">
                <template v-if="scope.row[column.prop] && scope.row[column.prop].length>0" v-for="item in scope.row[column.prop]">
                  <span>{{item+';'}}</span>
                </template>
              </template>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row>
      <el-col :sm="12" :md="8" :lg="8" :xl="6">
        <el-form-item label="总费用折扣%"  label-width="100px">
          <el-input-number v-model="searchForm.discount" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <el-dialog
      :visible.sync="temVisible"
      width="800px"
      title="费用模板"
      >
      <el-form ref="temForm" labelWidth="60px" :model="temForm">
        <el-row :gutter="5">
          <el-col :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="承运商" >
               <el-select  v-model="temForm.consoildatorCode"   placeholder="请选择" size="small" class="formitem" clearable>
                  <el-option
                    v-for="item in consoil"
                    :label="item.consoildatorName"
                    :key="item.consoildatorCode"
                    :value="item.consoildatorCode"
                  ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
           <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="运输种类">
              <el-select  v-model="temForm.templateType"   placeholder="请选择" size="small" class="formitem" clearable>
                <el-option v-for="item in mapConfig['getTemplateTransport']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="模板名称">
              <el-input v-model="temForm.templateName"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="mini" type="primary" @click="getTemInfo">查询</el-button>
        </el-row>
      </el-form>
      <div style="margin-bottom:10px;">
        <el-tag
          style="margin:2px;"
          v-for="tag in tagsData"
          :key="tag.templateCode"
          closable
          @close="deletetag(tag)"
        >
          {{tag.templateName}}
        </el-tag>
      </div>
      <el-table
      :data="temData"
      border
      size="small"
      style="margin-bottom:12px;cursor:pointer;"
      ref="linkTable"
      @current-change="handleCurrentChange"
    >
      <el-table-column
        label="模板名称"
        prop="templateName"
      ></el-table-column>
      <el-table-column
        label="承运商"
        prop="carrierName"
      ></el-table-column>
      <el-table-column
        label="出发地"
        prop="startPlace"
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
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
import { temSelect, temQuotionSave, quotionDetail, quotionModify } from '@/api/freight'
import { consoilInfoList } from '@/api/carrier'
import { tenantList } from '@/api/tenant'
import { quationTemConfig } from '../components/config'
import BaseTable from '@/components/Table'
import * as localEnum from '@/utils/enum'
export default {
  name: 'newQuation',
  components: { Sticky },
  data() {
    return {
      searchForm: {
        ownerName:null,
        nameList:'',
        templateList:[],
        discount:null
      },
      expressConfig: [],
      localEnum,
      quationTemConfig,
      tableData:[],
      temVisible:false,
      temData:[],
      temForm:{
        templateName:null,
        templateType:null,
        consoildatorCode:null
      },
      projectpageNum:1,
      projectpageSize:10,
      projecttotal:0,
      consoil:[],
      tags:[],
      pageNum:1,
      pageSize:10,
      ownerData:[],
      tagsData:[],
      spanArr:[],
      position:0,
    }
  },

  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    })
  },
  watch: {
    '$route': 'getTemInfo'
  },

  mounted() {
    this.getTemInfo()
    this.getConsoilInfoList()
    this.getOwnerData()
  },

  methods: {
    getownerName(){
      if(this.searchForm.ownerCode){
        this.searchForm.ownerName=this.ownerData.filter(v=>v.ownerCode===this.searchForm.ownerCode)[0].ownerName
      }
    },
    linkSubmit(type){
      let submittype=type
      let namelist=[]
      if(submittype){
        this.tableData=[]
        this.searchForm.templateList=[]
        this.tagsData.map(item=>{
          namelist.push(item.templateName)
          if(this.tableData.findIndex(indexItem => indexItem.templateCode === item.templateCode)<0){
            if(item.costRulesList.length>0){
              item.costRulesList.map(subitem=>{
                this.tableData.push({
                  templateCode:item.templateCode,
                  templateName:item.templateName,
                  carrierCode:item.carrierCode,
                  carrierName:item.carrierName,
                  type:item.type,
                  startPlace:item.startPlace,
                  endPlaseList:subitem.endPlaseList,
                  heavyRulesList:subitem.heavyRulesList,
                  lightRulesList:subitem.lightRulesList
                })
              })
            }else{
              if(this.tableData.findIndex(indexItem => indexItem.templateCode === item.templateCode)<0){
                this.tableData.push(item)
              }
            }
            this.searchForm.templateList.push({
              templateCode:item.templateCode,
              templateName:item.templateName
            })
          }
        })
        this.searchForm.nameList=namelist.join(',')
      }else{
        this.tagsData=[]
      }
      this.temVisible=false
    },
    rowspan() {
      this.spanArr = [];//在data里面定义
      this.position = 0; //在data里面定义
      this.tableData.forEach((item,index) => {
        if(index === 0){
          this.spanArr.push(1);
          this.position = 0;
        }else{
          if(this.tableData[index].templateCode === this.tableData[index-1].templateCode ){
            this.spanArr[this.position] += 1;//连续有几行项目名名称相同
            this.spanArr.push(0); // 名称相同后往数组里面加一项0
            // console.log(this.spanArr)
            //当主类型名称相同时
          }else{
            this.spanArr.push(1);
            this.position = index;
            //当项目名称不同时
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
      if(columnIndex === 1){  //主类型编码也进行合并(第一列)
        //this.spanArr这个数组里面存的是table里面连续的有几条数据相同
        //例如:[1,1,2,0,2,0]
        //1  代表的没有连续的相同的
        //2  代表连续的两个相同
        //0  代表是和上一条内容相同
        const _row = this.spanArr[rowIndex]
        const _col = _row>0 ? 1 : 0;
        // console.log("ppp")
        // console.log(_row)
        // console.log(_col)
        return {
          rowspan: _row, //行
          colspan: _col  //列
        }
      }
      if(columnIndex === 2){ //主类型名称也进行合并(第二列)
        const _row = this.spanArr[rowIndex]
        const _col = _row>0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showTem(){
      this.temVisible=true
      if(this.searchForm.templateList && this.searchForm.templateList.length>0){
        this.searchForm.templateList.map(item=>{
          this.tagsData.push(this.temData.filter(v=>v.templateCode===item.templateCode))
        })
        this.tagsData=JSON.parse(JSON.stringify(this.searchForm.templateList))
      }
    },
    handleProjectCurrentPageChange(val){
      this.projectpageNum=val
      this.getTemInfo()
    },
    getTemInfo() {
      temSelect({ pageNum: this.projectpageNum, pageSize: this.projectpageSize, ...this.temForm }).then(res => {
        const result = res.data
        this.temData = result && result.list
        this.projecttotal = result.total
        this.$nextTick(()=>{
          this.getDetail()
        })
      }).catch(err => {
      })
    },
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.error(err)
        })
    },
    getOwnerData() {
      tenantList({
        pageSize: 1000000,
        pageNum: 1,
        ownerState:1
      }).then(res => {
        this.loading = false
        if (res.success) {
          this.ownerData = (res.data && res.data.list) || []
        }
      })
    },
    getDetail() {
      let namelist=[]
      let tableData=[]
      if (this.$route.query.type === 'modify') {
        quotionDetail({
          id: this.$route.query.id
        }).then(res => {
          if (res.success) {
            this.searchForm = {...res.data}
            this.searchForm.templateList=JSON.parse(JSON.stringify(this.searchForm.itemList))
            this.searchForm.itemList.map(item=>{
              namelist.push(item.templateName)
              tableData.push(this.temData.filter(v=>v.templateCode===item.templateCode)[0])
            })
            this.searchForm.nameList=namelist.join(',')
            this.searchForm.discount=this.searchForm.quoteDiscount*100
            tableData.map(item=>{
              if(item.costRulesList && item.costRulesList.length>0){
                item.costRulesList.map(subitem=>{
                  this.tableData.push({
                    templateCode:item.templateCode,
                    templateName:item.templateName,
                    carrierCode:item.carrierCode,
                    carrierName:item.carrierName,
                    type:item.type,
                    startPlace:item.startPlace,
                    endPlaseList:subitem.endPlaseList,
                    heavyRulesList:subitem.heavyRulesList,
                    lightRulesList:subitem.lightRulesList
                  })
                })
              }else{
                this.tableData.push(item)
              }
            })
          }
        }).catch(err => {
        })
      }
    },
    submit(type) {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let api = temQuotionSave;
          if (this.$route.query.type === 'modify') {
            api = quotionModify
          } else {
            delete this.searchForm.id
          }
          api(this.searchForm).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功,即将跳转到列表页！',
                duration: 1500,
                onClose: () => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      path: `/freight/quationList/list`,
                    })
                  }).catch(err => {
                  })
                }
              })
            } else {
              this.$message.error('操作失败')
            }
          }).catch(err => {
            this.$message.error('操作失败')
          })
        }
      })
    },
    handleCurrentChange(val){
      // if(this.searchForm.templateList && this.searchForm.templateList.length>0){
      //   if(this.searchForm.templateList.findIndex(indexItem => indexItem.templateCode === val.templateCode)<0){
      //     this.searchForm.templateList.push({
      //       templateCode:val.templateCode,
      //       templateName:val.templateName
      //     })
      //     this.tagsData.push(val)
      //   }
      // }else{
      //   this.searchForm.templateList.push({
      //     templateCode:val.templateCode,
      //     templateName:val.templateName
      //   })
      //   this.tagsData.push(val)
      // }
      if(this.tagsData && this.tagsData.length>0){
        if(this.tagsData.findIndex(indexItem => indexItem.templateCode === val.templateCode)<0){
          this.tagsData.push(val)
        }
      }else{
        this.tagsData.push(val)
      }
    },
    deletetag(val){
      // this.searchForm.templateList.splice(this.searchForm.templateList.findIndex(indexItem => indexItem.templateCode === val.templateCode), 1)
      this.tagsData.splice(this.tagsData.findIndex(indexItem => indexItem.templateCode === val.templateCode), 1)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
}

.providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
</style>
