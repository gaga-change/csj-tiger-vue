<template>
    <div>
      <search-from :searchForm="searchForm" @submit="submit"></search-from>
      <div>
        <el-button type="primary" size="small" style="float:right;margin-bottom:8px;" @click="goAddRouter">新增租户</el-button>
        <div style="clear:both"></div>
      </div>
      <div class="msginfo" v-if="selection.length">
        <i class="el-icon-info color-108ee9"></i>
        <span style="margin-left:6px;">已选择<span class="color-108ee9">{{selection.length}}</span>项数据</span>
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
      selection: []
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
    goAddRouter() {
      this.$router.push({
        name: 'tenantAdd'
      })
    },
    selectionPartentChange(val) {
      this.selection = val
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

      console.log({...json,pageSize:this.pageSize,pageNum:this.pageNum})
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
        console.log(err)
        this.loading=false;
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .msginfo{
    height: 30px;
    line-height: 30px;
    background: #e6f3fc;
    border: #d4f0fc 1px solid;
    border-radius: 5px;
    font-size: 12px;
    text-indent: 8px;
    margin-bottom: 10px;
  }
  .color-108ee9{
    color: #108ee9;
  }
</style>
