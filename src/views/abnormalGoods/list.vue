<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button type="success"  size="small"  @click="add"  :disabled="!$haspermission('abnormalGoodsCreate')">创建异常签收商品登记单</el-button>
      </template>
    </sticky>
     <search-invoice  :searchForm="searchForm"   @submit="this.submit"  ></search-invoice>
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="listIndexConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
  </div> 
</template>

<script>
import SearchInvoice from './components/search'
import { listIndexConfig } from './components/config';
import BaseTable from '@/components/Table'
import Sticky from '@/components/Sticky'
import _  from 'lodash';
import moment from 'moment';
import { getPurcRejectApplyList } from '@/api/abnormalGoods';  
export default {
  components: { SearchInvoice,BaseTable,Sticky },
   data() {
    return {
      searchForm:{
        clientSName:'',
        contractNo:'',
        orderNumber:'',
        documentStatus:'',
        registerCode:'',
        time:[]
      },
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      listIndexConfig,
      tableData:[]
    }
  },

  mounted(){
    this.getCurrentTableData()
  },

  created(){
    this.listIndexConfig.forEach(item=>{
       if(item.useLink){
          item.dom=this.formatter();
       }
    })
  },

  methods:{

    add(){
      this.$router.push({
        path:`/abnormalGoods/add?time=${moment().valueOf()}`,
      })
    },

   formatter(){
     return  (row, column, cellValue, index)=>{
            let id = row.id
            let status = Number(row.billStatus)
            switch(status){
              case 0 : return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea',marginRight:'12px'}}>提交</router-link><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea'}}>删除</router-link></div> 
              // case 1 : return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea',marginRight:'12px'}}>同意</router-link><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea'}}>驳回</router-link></div> 
               case 3 : return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea',marginRight:'12px'}}>查看</router-link><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea'}}>提交</router-link></div>  
              default: return <div><router-link  to={{path:`/abnormalGoods/detail`,query:{id}}} style={{color:'#3399ea'}}>查看</router-link></div>
            }
          };
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

      if(json.time.length===2){
       json['startDate']=moment(json.time[0]).valueOf();
       json['endDate']=moment(json.time[0]).valueOf();
      }
      
      getPurcRejectApplyList({
          ...json,
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }).then(res=>{
          if(res.success){
           this.tableData=res.data&&res.data.list;
           this.total=res.data&&res.data.total
          }
          this.loading=false;
        }).catch(err=>{
          console.err(err)
          this.loading=false;
        })
        
     
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    
  }
</style>

