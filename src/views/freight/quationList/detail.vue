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
    <div style="margin:20px 0;">
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
          :width="column.width"
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
              <template v-else-if="column.prop === 'heavyRulesList' || column.prop === 'lightRulesList'">
                <template v-if="scope.row[column.prop] && scope.row[column.prop].length>0" v-for="item in scope.row[column.prop]">
                  <template v-if="item.startWeight>=0 && item.endWeight">
                    <div>
                      <span>{{item.startWeight+'~'+item.endWeight+(column.prop === 'heavyRulesList'?'公斤':'m³')}}</span>
                      <span>{{item.unitPrice?(item.unitPrice+'元/'+(column.prop === 'heavyRulesList'?'公斤；':'m³；')):'一口价'+item.price+'元；'}}</span>
                    </div>
                  </template>
                  <template v-else-if="item.startWeight>=0 && !item.endWeight">
                    <div>
                      <span>{{item.startWeight+(column.prop === 'heavyRulesList'?'公斤':'m³')+'以上'}}</span>
                      <span>{{item.unitPrice?(item.unitPrice+'元/'+(column.prop === 'heavyRulesList'?'公斤；':'m³；')):'一口价'+item.price+'元；'}}</span>
                    </div>
                  </template>
                  <template v-else-if="!item.startWeight && item.endWeight">
                    <div>
                        <span>{{item.endWeight+(column.prop === 'heavyRulesList'?'公斤':'m³')+'以内'}}</span>
                        <span>{{item.unitPrice?(item.unitPrice+'元/'+(column.prop === 'heavyRulesList'?'公斤；':'m³；')):'一口价'+item.price+'元；'}}</span>
                    </div>
                  </template>
                </template>
                 <template v-if="column.prop === 'heavyRulesList'">
                  <div>
                    <span>{{(scope.row.heavyLowPrice && scope.row.heavyLowPrice>=0)?('最低一票'+scope.row.heavyLowPrice+'元'):''}}</span>
                  </div>
                </template>
                <template v-else>
                   <div>
                    <span>{{(scope.row.lightLowPrice && scope.row.lightLowPrice>=0)?('最低一票'+scope.row.lightLowPrice+'元'):''}}</span>
                  </div>
                </template>
              </template>
              <template v-else-if="column.prop === 'endPlaseList'">
                <template v-if="scope.row[column.prop] && scope.row[column.prop].length>0" v-for="item in scope.row[column.prop]">
                  <div>{{item+';'}}</div>
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
          <span>{{searchForm.quoteDiscount}}</span>
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
import { Area } from '@/utils/area2'
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
  created(){
    this.areaMap = new Map()
      const _ = arr => {
        arr.forEach(item => {
          if (item.children) {
            _(item.children)
          }
          this.areaMap.set(item.value, item.label)
        })
      }
    _(Area)
  },
  mounted() {
    this.getTemInfo()
  },
  methods: {
    getTemInfo() {
      let that=this
      temSelect({ pageNum: this.projectpageNum, pageSize: this.projectpageSize, ...this.temForm }).then(res => {
        const result = res.data
        this.temData = result && result.list
        this.temData.forEach(v => {
        if (v.templateType == 1 && v.startPlace) {
          let temp = v.startPlace.split('_')
          if (temp.length === 2) {
            v.startPlaceName = [this.areaMap.get(temp[0]), this.areaMap.get(temp[1])].join('_')
          }
          if(v.costRulesList && v.costRulesList.length>0){
            v.costRulesList.forEach(rule=>{
              if(rule.endPlaseList && rule.endPlaseList.length>0){
                let endPlaceData=[]
                rule.endPlaseList.forEach(item=>{
                  item=item.split('_')
                  item=[that.areaMap.get(item[0]),that.areaMap.get(item[1])].join('_')
                  endPlaceData.push(item)
                })
                rule.endPlaseList=endPlaceData
              }
            })
          }
        } else if (v.startPlace) {
          let place = this.areaMap.get(v.startPlace)
          v.startPlaceName = place
          if(v.costRulesList && v.costRulesList.length>0){
            v.costRulesList.forEach(rule=>{
              if(rule.endPlaseList && rule.endPlaseList.length>0){
                let endPlaceData=[]
                rule.endPlaseList.forEach(item=>{
                  item=that.areaMap.get(item)
                  endPlaceData.push(item)
                })
                rule.endPlaseList=endPlaceData
              }
            })
          }
        }
      })
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
          this.searchForm.quoteDiscount=this.searchForm.quoteDiscount
          tableData.map(item=>{
            if(item.costRulesList && item.costRulesList.length>0){
              item.costRulesList.map(subitem=>{
                this.tableData.push({
                  templateCode:item.templateCode,
                  templateName:item.templateName,
                  consoildatorCode:item.consoildatorCode,
                  consoildatorName:item.consoildatorName,
                  templateType:item.templateType,
                  startPlace:item.startPlaceName,
                  endPlaseList:subitem.endPlaseList,
                  heavyRulesList:subitem.heavyRulesList,
                  lightRulesList:subitem.lightRulesList,
                  heavyLowPrice:subitem.heavyLowPrice,
                  lightLowPrice:subitem.lightLowPrice
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
