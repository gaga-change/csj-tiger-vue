<template>
  <div  class="refund">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small" v-if="$haspermission('addRefund')"  @click="addRefund"  >创建退款单</el-button>
      </template>
    </sticky>
     <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm"   @submit="submit"  :select="true" ref="listSearchFormDom" ></search-invoice>
        <el-col :span="24" style="margin-bottom:12px;">
            <el-button type="primary"  size="small"  @click="select">查询</el-button>
            <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
        </el-col>
     </el-card>
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="refundConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
      <alert-detail 
      :alertDisplay="alertDisplay"
      :busiBillNo="busiBillNo"
      @close="close"/>
  </div> 
</template>

<script>
import SearchInvoice from '../components/refundSearch'
import AlertDetail from './alertDetail'
import { refundConfig } from '../components/config';
import { refundList } from '@/api/refund.js'
import BaseTable from '@/components/Table'
import Sticky from '@/components/Sticky'
import _  from 'lodash';
import moment from 'moment'; 
export default {
  components: { SearchInvoice,BaseTable,Sticky ,AlertDetail},
   data() {
    return {
      searchForm:{
        customerCode:'',
        busiPlate:'',
        sourceOrderNo:'',
        contractNo:'',
        ownerCode:'',
        refundStatus:'',
        refundNo:''
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      refundConfig,
      tableData:[],

      alertDisplay:false,
      busiBillNo:''
    }
  },

  mounted(){
    this.getCurrentTableData()
  },


  created(){
    this.refundConfig.forEach(item=>{
       if(item.useLink){
          item.dom=(row, column, cellValue, index)=>{
              const path=`/receipt/refundDetail?refundNo=${row.refundNo}&id=${row.id}`
              const registRefundPath=`/receipt/refundDetail?refundNo=${row.refundNo}&id=${row.id}&refund=true`
              const modifyPath=`/receipt/refundAdd?refundNo=${row.refundNo}&id=${row.id}&modify=true&time=${moment().valueOf()}`
              if(item.prop&&item.prop==='busiBillNo'){
                 return <span class="routerLink" onClick={this.display.bind(this,row.busiBillNo)}>{row.busiBillNo}</span> 
              } else if(item.prop&&item.prop==='sourceOrderNo'){
                let orderPath=`/outgoing/businessorder-detail?busiBillNo=${row.sourceOrderNo}`;
                if(row.sourceOrderNo.includes('PO')){
                   orderPath=`/warehousing/businessorder-detail?busiBillNo=${row.sourceOrderNo}`;
                }
                return <router-link  to={orderPath} class="routerLink" >{row.sourceOrderNo}</router-link>
              } else{
                  return <div style={{display:'flex',flexWrap: 'nowrap'}}>
                    <router-link  to={path} class="routerLink" >查看</router-link>
                    {
                      [0].includes(row.refundStatus)&&this.$haspermission('submitRefund')&&
                      <router-link  to={path} class="routerLink">提交</router-link>
                    }
                    {
                      [0,2].includes(row.refundStatus)&&this.$haspermission('editRefund')&&
                      <router-link  to={modifyPath} class="routerLink">修改</router-link>
                    }
                    {
                      [0,2].includes(row.refundStatus)&&this.$haspermission('deleteRefund')&&
                      <router-link  to={path} class="routerLink">删除</router-link>
                    }
                    {
                      [1].includes(row.refundStatus)&&this.$haspermission('toExamineRefund')&&
                      <router-link  to={path} class="routerLink">审核</router-link>
                    }
                    {
                      [1].includes(row.refundStatus)&&this.$haspermission('rejectRefund')&&
                      <router-link  to={path} class="routerLink">驳回</router-link>
                    }
                    {
                      [3].includes(row.refundStatus)&&this.$haspermission('registerRefund')&&
                      <router-link  to={registRefundPath} class="routerLink">登记退款</router-link>
                    }
                </div>
              }
            }
       }
    })
  },

  methods:{

    display(busiBillNo){
       this.alertDisplay=true;
       this.busiBillNo=busiBillNo;
    },
    
    close(){
      this.alertDisplay=false;
    },

    addRefund(){
      this.$router.push({
        path:`/receipt/refundAdd?time=${moment().valueOf()}`,
      })
    },

    select(){
       this.$refs['listSearchFormDom'].submit()
    },

    resetForm(){
      this.$refs['listSearchFormDom'].resetForm() 
    },

    submit(value){
      this.searchForm=value;
      this.getCurrentTableData()
    },

    handleSizeChange(val) {
      this.pageSize=val;
      this.pageNum=1;
      this.getCurrentTableData();
    },

    handleCurrentChange(val) {
     this.pageNum=val;
     this.getCurrentTableData();
    },

    getCurrentTableData(){
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      refundList({
        ...json,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res=>{
        this.loading=false;
        if(res.success){
          this.tableData=res.data&&res.data.list||[];
          this.total=res.data&&res.data.total
        }
      }).catch(err=>{
        this.loading=false;
        console.err(err)
      })
    
    
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .refund{
    .routerLink{
      color:#3399ea;
      white-space:nowrap;
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>

