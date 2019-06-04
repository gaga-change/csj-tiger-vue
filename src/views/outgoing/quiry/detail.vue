<template>
  <div class="outgoing-quirydetail-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px" v-if="isDependWeight && !isCompelete">
      <template>
        <el-button @click="submit" type="primary" size="mini" :disabled="isCompelete">提交</el-button>
      </template>
   </sticky>
    <item-title text="基本信息"/>
    <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关出库单明细"/>
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column v-for="column in tableConfig"
          :key="column.prop" :prop="column.prop"
          :label="column.label" :type="column.type"
          :width="column.width"
          :formatter="column.dom"></el-table-column>
        <el-table-column label="重量" width="150" fixed="right">
          <template slot-scope="scope">
            <el-input type="number" :min="0.0001" v-model.trim="scope.row.outStoreWeight" v-if="isDependWeight && scope.row.settleUnit === 2 && !isCompelete"></el-input>
            <span v-else>{{scope.row.outStoreWeight}}</span>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
 import moment from 'moment';
 import {outOrderDetail} from '@/api/outgoing';
 import sticky from '@/components/Sticky'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {tableConfig,infoConfig } from './config';
 import { outDependWeight } from '@/api/outgoing'

 export default {
    components: { webPaginationTable, sticky },
    data() {
      return {
        config:{},
        infoConfig,
        tableData:[],
        tableConfig,
        loading:false,
        initData: []
      }
    },
    computed: {
      isDependWeight() {
        return this.$route.query.settleUnit
      },
      isCompelete() {
        return this.initData.filter(item => item.settleUnit === 2).every(item => item.outStoreWeight)
      }
    },

    mounted(){
      this.getDetail()
    },
    methods: {
      getDetail() {
        let { warehouseExeCode } = this.$route.query
        this.loading=true;
        outOrderDetail({warehouseExeCode}).then(res=>{
          if(res.success){
            let data=res.data;
            this.config=data;
            this.tableData=Array.isArray(data.owOrderDetailList)?data.owOrderDetailList:[];
            this.initData = JSON.parse(JSON.stringify(this.tableData))
          }
          this.loading=false;
        }).catch(err=>{
            this.loading=false;
        })
      },
      submit() {
        console.log(this.tableData)
        this.tableData = this.tableData.map(row => {
          let amount = row.skuOutPrice
          if (row.settleUnit === 2 ) {
            amount = amount * (row.outStoreWeight || 0)
          }
          row.outStoreAmt = amount
          return row
        })
        this.btnloading = true
        outDependWeight(this.tableData).then(res => {
          console.log(res)
          if (res.success) {
            this.$message('操作成功')
            this.getDetail()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
 }

</script>
