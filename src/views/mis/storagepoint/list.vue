<template>
  <div class="storagepoint">
      <search @submit="submit" :searchForm="searchForm"></search>
    
      <div class="operationitem">
          <el-button type="primary" size="small"  @click="showDialog('add')">新增仓配点</el-button>
      </div>

      <base-table 
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total" 
        :config="storagepointListConfig"  
        :tableData="tableData"/>

      <el-dialog
        :title="addFormTitle"
        :visible.sync="addVisible"
         width="30%"
        :before-close="handleClose">
          <add-form @submit="submit" :searchForm="addForm" @handleClose="handleClose" ></add-form>
      </el-dialog>

       <el-dialog
         title="详情"
        :visible.sync="detailVisible"
         width="600px"
        :before-close="()=>detailVisible=false">
          <item-title text="基本信息"/>
          <item-card :config="storagepointDetailConfig" :loading="false"  :cardData="baseinfoData"  />
      </el-dialog>
  </div>
</template>

<script>
  import search from './components/search'
  import addForm from './components/addForm'
  import BaseTable from '@/components/Table'
  import { storagepointListConfig,storagepointDetailConfig} from './components/config'
  import _  from 'lodash';
  import moment from 'moment';
  export default {
    components: { search,BaseTable,addForm},
    data() {
      return {

        //详情项
        detailVisible:false,
        storagepointDetailConfig,
        baseinfoData:{},


        //新增项
        addFormTitle:'新增仓配点',
        addVisible:false,
        addForm:{
          区域中心:'',
          仓配点名称:''
        },

        //搜索项
        searchForm:{
          仓配点名称:'',
          仓配点编码:'',
          区域中心:'',
          pageSize:10,
          pageNum:1
        },
        total:0,
        
        //table配置
        loading:false,
        storagepointListConfig,
        tableData:[{}]
      }
    },

    mounted(){
     
    },

    created(){
      this.storagepointListConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink" onClick={this.showDialog.bind(this,'detail',row)}>查看</span>
                     }

                     {
                       <span class="tableLink"  onClick={this.showDialog.bind(this,'update',row)}>修改</span>
                     }

                     {
                       <span class="tableLink">删除</span>
                     }

                     {
                       <span class="tableLink">提交</span>
                     }

                     {
                       <span class="tableLink">启用</span> 
                     }
                    
                </div> 
              )
            }
        }
      })
    },

    methods: {
      moment,
      handleSizeChange(val) {
        this.searchForm={...this.searchForm,pageSize:val,pageNum:1};
        this.fetch()
      },

      handleCurrentChange(val) {
        this.searchForm={...this.searchForm,pageNum:val};
        this.fetch()
      },

      submit(type,value){
        if(type==='select'){
           this.searchForm=_.cloneDeep(value);
           this.fetch()
        } else if(type==='add'){
          console.log(type,value)
        } 
       
      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
        console.log(json)
      },

      handleClose(){
        this.addVisible=false;
      },
      

      showDialog(type,row){
         console.log(type,row)

         if(type==="add"){
           this.addVisible=true;
           this.addFormTitle="新增仓储点"

         } else if(type==='update'){
           this.addVisible=true;
           this.addFormTitle="修改仓储点"

         } else if(type==='detail'){
           this.detailVisible=true;
           
         }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body{
    padding-top: 12px;;
  }
  .storagepoint{
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
    .tableLinkBox{
       display: flex;
      .tableLink{
        cursor: pointer;
        color:#3399ea;
        margin-right:12px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>


