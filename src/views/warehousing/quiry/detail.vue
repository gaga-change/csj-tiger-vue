<template>
  <div class="outgoing-quirydetail-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px" v-if="isDependWeight && !isCompelete">
      <template>
        <el-button @click="submit" type="primary" size="mini" :disabled="isCompelete">提交</el-button>
      </template>
   </sticky>
    <item-title text="基本信息"/>
    <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

    <item-title text="相关入库单明细"/>
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column v-for="column in tableConfig"
          :key="column.prop" :prop="column.prop"
          :label="column.label" :type="column.type"
          :width="column.width"
          :formatter="column.dom"></el-table-column>
        <el-table-column label="重量" width="150" fixed="right">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.inStoreWeight" v-if="isDependWeight && !isCompelete && scope.row.settleUnit ===2"></el-input>
            <span v-else>{{scope.row.inStoreWeight}}</span>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
 import moment from 'moment';
 import {inOrderDetail} from '@/api/warehousing';
 import sticky from '@/components/Sticky'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { tableConfig,infoConfig } from './config';
 import { inDependWeight } from '@/api/warehousing'

 export default {
    components: { webPaginationTable, sticky },
    data() {
      return {
        config:{},
        infoConfig,

        loading:false,
        tableData:[],
        tableConfig,
        initData: []
      }
    },
    computed: {
      isDependWeight() {
        return this.$route.query.settleUnit
      },
      isCompelete() {
        return this.initData.filter(item => item.settleUnit === 2).every(item => item.inStoreWeight)
      }
    },
    mounted(){
      this.getDetail()
    },
    methods: {
      getDetail() {
        let { warehouseExeCode}=this.$route.query||{};
        this.loading=true;
        inOrderDetail({warehouseExeCode}).then(res=>{
          if(res.success){
            let data=res.data;
            this.config=data;
            const result = Array.isArray(data.iwOrderDetailList)?data.iwOrderDetailList:[]
            this.tableData = result
            this.initData = JSON.parse(JSON.stringify(result))
          }
          this.loading=false;
        }).catch(err=>{
           this.loading=false;
        })
      },
      submit() {
        this.tableData = this.tableData.map(row => {
          let amount = row.inPrice
          if (row.settleUnit === 2 ) {
            amount = amount * (row.inStoreWeight || 0)
          }
          row.inStoreAmt = amount
          return row
        })
        this.btnloading = true
        inDependWeight(this.tableData).then(res => {
          console.log(res)
          if (res.success) {
            this.$message.success('操作成功')
            this.getDetail()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
 }

</script>
