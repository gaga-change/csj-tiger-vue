<template>
  <div class="carrier">

      <search @submit="submit" :searchForm="searchForm"></search>
    
      <div class="operationitem">
          <el-button type="primary" size="small" @click="showAddDialog('add')">创建供应商</el-button>
      </div>

      <base-table 
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total" 
        :config="supplierTbale_config"  
        :tableData="tableData"/>
       
      <el-dialog
        :title="dialogTitle"
        :visible.sync="addVisible"
         width="800px"
        :before-close="()=>this.handleClose('addform')">
         <add-search @submit="submit" :searchForm="addForm"  @handleClose="()=>this.handleClose('addform')"></add-search>
      </el-dialog>

      <el-dialog
        title="已关联货主"
        :visible.sync="relationVisible"
         width="600px"
        :before-close="()=>this.handleClose('relation')">
        <div class="relationDialog">
          <div class="operationitem">
             <el-button type="primary" size="small" @click="showAddDialog('shipper')">增加</el-button>
          </div>
          <web-pagination-table 
            :loading="false"
            :config="relationShipper_config" 
            :allTableData="relationShipper_data"/>
            <el-dialog
              title="选择关联货主"
              :modal="false"
              :visible.sync="shipperVisible"
              width="600px"
              :before-close="()=>this.handleClose('shipper')">
                <web-pagination-table 
                :loading="false"
                @SelectionChange="SelectionChange"
                :config="selectionShipper_config" 
                :allTableData="selectionShipper_data"/>
                <div class="btnBox">
                   <el-button type="primary" size="small" @click="submit('addShipper')">确定</el-button>
                   <el-button size="small" @click="()=>this.handleClose('shipper')">取消</el-button>
                </div>
            </el-dialog> 
        </div>
      </el-dialog>

     
      <el-dialog
        title="地址列表"
        :visible.sync="addressVisible"
         width="800px"
        :before-close="()=>this.handleClose('address')">
          <div class="btnBox" style="margin-bottom:12px">
            <el-button type="primary" size="small"  @click="showAddDialog('addAddress')">新增地址</el-button>
          </div> 
          <web-pagination-table 
            :loading="false"
            :config="address_config" 
            :allTableData="address_data"/>  

          <el-dialog
            title="新增地址"
            :visible.sync="addAddressVisible"
            width="800px"
            :modal="false"
            :before-close="()=>this.handleClose('addAddress')">
             <add-address-search  :searchForm="addAddressSearchForm" @submit="submit" @handleClose="handleClose('addAddress')"/>
            </el-dialog>
      </el-dialog>

  </div>
</template>

<script>
  import search from './components/search'
  import addSearch from './components/addsearch'
  import addAddressSearch from './components/addAddressSearch'
  import BaseTable from '@/components/Table'
  import { supplierTbale_config ,relationShipper_config,selectionShipper_config,address_config} from './components/config'
  import webPaginationTable from '@/components/Table/webPaginationTable';
  import _  from 'lodash';
  import moment from 'moment';
  export default {
    components: { search,BaseTable,addSearch,webPaginationTable,addAddressSearch},
    data() {
      return {

        //搜索项
        searchForm:{
          供应商编码:'',
          供应商状态:'',
          供应商名称:'',
          pageSize:10,
          pageNum:1
        },
        total:0,
        
        // list列表 table配置
        loading:false,
        supplierTbale_config,
        tableData:[{id:1},{id:3}],
        
        //添加项
        dialogTitle:'新增供应商',
        addVisible:false,
        addForm:{

        },

        //关联货主项
        relationVisible:false,
        relationShipper_config,
        relationShipper_data:[],

        //选择关联货主项  子弹框
        shipperVisible:false,
        selectionShipper_config,
        selectionShipper_data:[],

        //多选项
        selectionData:[],

        //地址配置项
        addressVisible:false,
        address_config,
        address_data:[{}],
        
        //新增地址弹框  子弹框
        addAddressVisible:false,
        addAddressSearchForm:{

        }

        
      }
    },

    mounted(){
     
    },

    created(){
      this.supplierTbale_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink"  onClick={this.showAddDialog.bind(this,'update')} >修改</span>
                     }

                     {
                       <span class="tableLink">删除</span>
                     }

                     {
                       <span class="tableLink" onClick={this.showAddDialog.bind(this,'relation')}>关联货主</span>
                     }

                     {
                       <span class="tableLink" onClick={this.showAddDialog.bind(this,'address')}>退换货地址</span>
                     }
                    
                </div> 
              )
            }
        }
      }),
      this.address_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                
                     {
                       <span class="tableLink">删除</span>
                     }
                     {
                       <span class="tableLink">编辑</span>
                     }
                </div> 
              )
            }
        }
      })
    },

    methods: {
      moment,
      //展示弹框
      showAddDialog(type){
        console.log(type)
        if(type==='update'){
          this.addVisible=true;
          this.dialogTitle="修改供应商"
          this.addForm={} 
        } else if(type==='add'){
          this.addVisible=true;
          this.dialogTitle="新增供应商"
          this.addForm={}  
        } else if(type==='relation'){
          this.relationVisible=true;
        } else if(type==='shipper'){
          this.shipperVisible=true
        } else if(type==='address'){
          this.addressVisible=true;
        } else if(type==='addAddress'){
          this.addAddressVisible=true;
        }
      },

      //关闭弹框
      handleClose(type){
        if(type==='addform'){
           this.addVisible=false;
        } else if(type==='relation'){
          this.relationVisible=false;
          this.shipperVisible=false
        } else if(type==='shipper'){
          this.shipperVisible=false
        } else if(type==='address'){
          this.addressVisible=false;
          this.addAddressVisible=false
        } else if(type==='addAddress'){
          this.addAddressVisible=false
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
          console.log(type,value)
          this.searchForm=_.cloneDeep(value);
          this.fetch()
        } else if(type==='add'){
          console.log(type,value)
        } else if(type==='addShipper'){
          console.log('addShipper',this.selectionData);
          this.shipperVisible=false
        } else if(type==='addAddress'){
          console.log(type,value)
        }
      },

      SelectionChange(value){
        this.selectionData=value
        console.log(value)
      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
        console.log(json)
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
    .relationDialog{
      
    }
    .el-dialog__body{
      padding-top: 16px;
    }
    .btnBox{
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
</style>


