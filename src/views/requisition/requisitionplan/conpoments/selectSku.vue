<template>
  <div class="selectSkuTemplate">
    <div style="margin-bottom:20px" :loading="skuInfoListLoading">
      <el-input
        v-model="searchSkuForm.skuCode"
        placeholder="请输入商品编码"
        style="width:200px;"
        maxlength="20"
      ></el-input>
      <el-input
        v-model="searchSkuForm.skuName"
        placeholder="请输入商品名称"
        style="width:200px;margin-left: 20px;"
        maxlength="20"
      ></el-input>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;dataInfo()"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        type="primary"
        size="small"
        @click="currentPage=1;searchSkuForm.skuCode='';searchSkuForm.skuName='';dataInfo()"
      >重置</el-button>

    </div>
    <el-table
      :data="data"
      size="small"
      ref="singleTable"
      highlight-current-row
    >
      <el-table-column
        property="warehouseName"
        label="仓库"
      />
      <el-table-column
        property="ownerName"
        label="货主"
      />
      <el-table-column
        property="skuCode"
        label="商品编码"
      />
      <el-table-column
        property="skuName"
        label="商品名称"
      />
      <el-table-column
        property="skuFormat"
        label="规格"
      />
      <el-table-column
        property="skuModel"
        label="型号"
      />
      <el-table-column
        property="availableQty"
        label="可用库存"
      />
       <el-table-column
        label="调拨数量">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.transferQty"
            :precision="0"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;"
      v-if="!!totalLen"
      size="small"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalLen"
    />
    <div class="btnBox" style="text-align:center;margin-top:20px;">
      <el-button @click="$emit('handleClose')">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </div>
  </div>
</template>

<script>
import { saleTypeEnum } from "@/utils/enum";
import { totalSkuList } from '@/api/requisition'
export default {
  props:['selectform'],
  data() {
    return {
      data: [],
      skuName: '',
      skuCode: '',
      currentPageSize: 10,
      currentPage: 1,
      totalLen: 0,
      handleList:[],
      handleIdList:[],
      searchSkuForm:{},
      skuInfoListLoading:false
    }
  },
  watch: {
    selectform(val) {
      this.updateData()
    }
  },
  created() {
    this.updateData()
  },
  methods: {
    handleCurrentChange(val) {
      this.data.map(item=>{
        if(item.transferQty && item.transferQty>0){
          if(!(this.handleIdList.indexOf(item.id)>-1)){
            this.handleList.push(item)
            this.handleIdList.push(item.id)
          }
        }
      })
      this.currentPage = val
      this.gettotallist()
    },
    updateData() {
      this.handleList=[]
      this.handleIdList=[]
      this.searchSkuForm=_.cloneDeep(this.selectform)
      this.gettotallist()
    },
    dataInfo(){
      this.handleList=[]
      this.handleIdList=[]
      this.gettotallist()
    },
    gettotallist(){
      this.skuInfoListLoading=true
      totalSkuList({pageNum:this.currentPage,pageSize:this.currentPageSize,...this.searchSkuForm}).then(res => {
        if (res.success) {
          this.data=Array.isArray(res.data.list) && res.data.list || []
          if(this.data.length>0){
            this.data.map(item=>{
              item.availableQty=(item.skuQty-item.lockQty)>0?(item.skuQty-item.lockQty):0
              if(this.handleIdList.indexOf(item.id)>-1){
                this.handleList.map(v=>{
                  if(v.id===item.id){
                    item.transferQty=v.transferQty
                  }
                })
              }
            })
          }
          this.skuInfoListLoading=false
          this.totalLen=res.data.total
        }
      }).catch(err => {
      }).then(res => {
        this.skuInfoListLoading = false
      })
    },
    chooseCustomer(val) {
      if (val) {
        this.$emit('select', val)
      }
    },
    submit() {
      this.data.map(item=>{
        if(item.transferQty && item.transferQty>0){
          if(!(this.handleIdList.indexOf(item.id)>-1)){
            this.handleList.push(item)
            this.handleIdList.push(item.id)
          }
        }
      })
      if(this.handleList && this.handleList.length>0){
        this.$emit('submit', 'addCommodity', this.handleList)
      }else{
        this.$message.error('调拨明细不能为空！')
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
</style>
