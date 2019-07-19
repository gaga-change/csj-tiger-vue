<template>
    <div>
      <search-from :searchForm="searchForm" @submit="submit"></search-from>
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
  import SearchFrom from './components/search'
  import { listIndexConfig } from './components/config';
  import BaseTable from '@/components/Table'
  import { registerList } from '@/api/provider'
  import moment from 'moment';
  export default {
  components: { SearchFrom,BaseTable },
   data() {
    return {
      searchForm:{
        receiveEnterprise:'',
        contractNo :'',
        planCode:'',
        receiveStatus :'',
        ReceivTime:[],//收货日期
        establishTime:[],//创建日期
      },
      listIndexConfig,
      pageSize:10,
      pageNum:1,
      total:0,
      tableData:[],
      loading:false,
    }
  },

  mounted(){
    this.getCurrentTableData()
  },

  created(){
    this.listIndexConfig.forEach(item=>{
      if(item.useLink){
          item.dom=(row, column, cellValue, index)=>{
            return <div style={{display:'flex',flexWrap:'nowrap'}}>
                <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>查看</router-link>
                { 
                  row.receiveStatus===0&&
                  <span>
                    <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>提交</router-link>
                    <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>修改</router-link>
                    <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>删除</router-link>
                  </span>
                }
    
                { 
                  row.receiveStatus===1&&
                  <span>
                    <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>审核</router-link>
                    <router-link  to={{path:'/provider/detail',query:{id:row.id,planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>驳回</router-link>
                  </span>
                }
 
            </div>
          }
      }
    })
  },

  methods:{

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
      
      //收货日期
      if(json.ReceivTime&&Array.isArray(json.ReceivTime)&&json.ReceivTime.length>0){
        json.receiveBeginDate=moment(json.ReceivTime[0]).valueOf()
        json.receiveEndDate=moment(json.ReceivTime[1]).valueOf()
      }

      //创建日期
      if(json.establishTime&&Array.isArray(json.establishTime)&&json.establishTime.length>0){
        json.createBeginDate=moment(json.establishTime[0]).valueOf()
        json.createEndDate=moment(json.establishTime[1]).valueOf()
      }
      registerList({
          ...json,
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }).then(res=>{
        this.loading=false;
        if(res.success){
          this.tableData=res.data&&res.data.list||[];
          this.total=res.data&&res.data.total;
        }
      }).catch(err=>{
        console.err(err)
        this.loading=false;
      })
  
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">


</style>