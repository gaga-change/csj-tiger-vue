<template>
  <div class="carrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
        <el-button type="primary" size="small" @click="submit('addWarehouse')">确定</el-button>
      </template>
    </sticky>
      <search @submit="submit" :searchForm="searchForm"></search>
      <div class="operationitem">
           <router-link :to="`/shipper/add?time=${moment().valueOf()}`">
                <el-button type="primary" size="small">增加货主</el-button>
            </router-link>
      </div>

      <base-table 
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total" 
        :config="shipperList_config"  
        :tableData="tableData"/>

        <el-dialog
        title="已关联仓库"
        :visible.sync="warehouseVisible"
         width="600px"
        :before-close="()=>this.handleClose('warehouse')">
        <div class="btnBox" style="margin-bottom:12px">
          <el-button type="primary" size="small"  @click="showAddDialog('addWarehouse')">重新关联</el-button>
        </div> 
        <web-pagination-table 
          :loading="false"
          :config="warehouseList_config" 
          :allTableData="warehouseList_data"/>  

          <el-dialog
            title="选择关联仓库"
            :modal="false"
            :visible.sync="selectWarehouseVisible"
            width="600px"
            :before-close="()=>this.handleClose('addWarehouse')">
            <web-pagination-table 
             :loading="false"
             @SelectionChange="SelectionChange"
             :config="selectionShipper_config" 
             :allTableData="selectionShipper_data"/>
          </el-dialog>
      </el-dialog>
  </div>
</template>

<script>
  import search from './components/search'
  import BaseTable from '@/components/Table'
  import { carrierListConfig ,shipperList_config,warehouseList_config,selectionShipper_config} from './components/config'
  import _  from 'lodash';
  import moment from 'moment';
  import Sticky from '@/components/Sticky'
  import webPaginationTable from '@/components/Table/webPaginationTable';
  export default {
    components: { search,BaseTable,webPaginationTable,Sticky},
    data() {
      return {

        //搜索项
        searchForm:{
          货主编码:'',
          货主名称:'',
          pageSize:10,
          pageNum:1
        },
        total:0,
        
        //table配置
        loading:false,
        shipperList_config,
        tableData:[{}],

        //已关联的仓库弹框配置 
        warehouseVisible:false,
        warehouseList_config,
        warehouseList_data:[],

        //选择关联仓库弹框配置
        selectWarehouseVisible:false,

        //多选项
        selectionData:[],//已经选中的
        selectionShipper_config,
        selectionShipper_data:[{},{}]

      }
    },

    mounted(){
     
    },

    created(){
      this.shipperList_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                        <router-link  to={`/shipper/add?time=${moment().valueOf()}`} class="tableLink">修改</router-link>
                     }

                     {
                       <span class="tableLink" onClick={this.showAddDialog.bind(this,'warehouse')}>查看仓库</span>
                     }

                     {
                       <span class="tableLink">删除</span>
                     }

                     {
                       <span class="tableLink">禁用</span>
                     }
                    
                </div> 
              )
            }
        }
      })
    },

    methods: {
      moment,

      SelectionChange(value){
        this.selectionData=value
      },

      //关闭弹框
      handleClose(type){
        if(type==='warehouse'){
           this.warehouseVisible=false;
        } else if(type==='addWarehouse'){
           this.selectWarehouseVisible=false
        } 
      },

      //展示弹框
      showAddDialog(type){
        if(type==='warehouse'){
          this.warehouseVisible=true;
        } else if(type==='addWarehouse'){
          this.selectWarehouseVisible=true
        }
      },

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
        } else if(type==='addWarehouse'){
           this.selectWarehouseVisible=false;
        }
      
      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .carrier{
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
    .btnBox{
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
</style>


