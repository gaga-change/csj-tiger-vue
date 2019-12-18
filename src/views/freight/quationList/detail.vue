<template lang="html">
  <div class="addCarrier">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row :gutter="10">
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主名称:"  prop="ownerCode" >
              <span>{{searchForm.ownerName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="费用模板:"  prop="nameList">
              <span>{{searchForm.nameList}}</span>
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
          <span>{{searchForm.discount}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
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
  name: 'quationInfoDetail',
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
  },

  methods: {
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
    getDetail() {
      let namelist=[]
      let tableData=[]
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
