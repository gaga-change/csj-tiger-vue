<template>
  <div class="outgoing-quirydetail-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template>
           <el-button type="primary" size="small" @click="submit" :loading="submitLoading">生成计划单</el-button>
      </template>
    </sticky>
     <item-title text="基本信息"/>
     <item-card :config="addPlanInfoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <web-pagination-table 
      :loading="loading"
      :config="addPlanOrder_config" 
      :allTableData="tableData"/>

      <el-dialog
        title="编辑计划入库数量并选择仓库"
        :visible.sync="addVisible"
         width="800px"
        :before-close="handleClose">
        <div class="revisalEditTable">
           <edit-Table
            @currentRedioChange="handleCurrentRedioChange"
            :highlightCurrentRow="true"
            :config="alertTable_config" 
            :allTableData="alertTableData"/> 
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="sureWarehouse">确 定</el-button>
        </span>  
      </el-dialog>
  </div>
</template>

<script>

 import { addPlanOrder_config,addPlanInfoConfig,alertTable_config} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import {inPlanInitAdd,inPlanAdd,ownerWarehouseList} from '@/api/warehousing'
 import editTable from '@/components/Table/editTable';
 import { mapGetters } from 'vuex'
 import Sticky from '@/components/Sticky'
 import moment from 'moment';
 import _  from 'lodash';

 export default {
    name: 'warehousingAddPlanOrder',
    components: { webPaginationTable,editTable,Sticky},
    data() {
      return {
        //基本信息项
        loading:false,
        infoData:{},
        addPlanInfoConfig,

        //table项
        tableData:[], //需要id
        addPlanOrder_config,

        //弹框项
        addVisible:false,
        originalTableData:[],//原始数据  需要id
        alertTableData:[], //需要id
        alertTable_config,
        submitLoading: false,
        editRow:{}//当前正在编辑的行 并非弹框


      }
    },

    computed: {
      ...mapGetters({
        visitedViews: 'visitedViews'
      })
   },

    created(){
      this.addPlanOrder_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink"  onClick={this.operation.bind(this,'delete',row)}>删除</span>
                     }

                     {
                       <span class="tableLink"  onClick={this.operation.bind(this,'edit',row)}>编辑</span>
                     }
                    
                </div> 
              )
            }
        }
      })
    },

    mounted(){
      inPlanInitAdd(this.$route.query.id).then(res=>{
         if(res.success){
          this.infoData=res.data;
          this.tableData=res.data&&Array.isArray(res.data.items)&&res.data.items.map(v=>{
            v.warehouseName=v.planWarehouseName;
            v.warehouseCode=v.planWarehouseCode;
            return v;
          })
         }
      }).catch(err=>{
        console.log(err)
      })
    },

    methods:{
      moment,
      submit(){
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        let json={}
        json.inWarehouseBillId=this.$route.query.id;
        json.planItemList=_.cloneDeep(this.tableData).map(v=>{
           v.planInWarehouseCode=v.warehouseCode;
           v.planInWarehouseName=v.warehouseName;
           delete v.warehouseCode;
           delete v.warehouseName;
           v.billDetailId=v.id;
           return v
        })
        this.submitLoading = true
        inPlanAdd(json).then(res=>{
          if(res.success){
            this.$message({
              type:'success', 
              message:'操作成功,即将跳转到计划单列表页！' ,
              duration:1500,
              onClose:()=>{
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:`/warehousing/plan`,
                  })
                }).catch(err=>{
                  console.log(err)
                })  
              }
            })
          }
        }).catch(err=>{
          console.log(err)
        }).then(() => {
          this.submitLoading = false
        })
      },
      //关闭弹框
      handleClose(){
        this.addVisible=false;
      },

      //点击某一行的回调
      handleCurrentRedioChange(currentRow, oldCurrentRow){
        if(!currentRow){
          return false
        }
        let alertTableData=_.cloneDeep(this.alertTableData);
        alertTableData=alertTableData.map(v=>{
          if(v.warehouseCode===_.cloneDeep(currentRow).warehouseCode){
             v.edit=true;
             v.planInQty=this.editRow.planInQty
             v.planInQty=_.cloneDeep(this.editRow).planInQty
          } else{
            v.edit=false;
            v.planInQty=null;
          }
          return v
        })
        this.alertTableData=alertTableData;

      //高亮效果  此处有异步问题
       setTimeout(()=>{
         let revisalEditTable=[...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr')];
         revisalEditTable.forEach(item=>{
            let td=[...item.querySelectorAll('td')]
              td.forEach(v=>{
                 if(item.innerHTML.includes('el-input-number')){
                    v.style.cssText="color:#fff;background:green !important"
                 } else{
                    v.style.cssText=""
                 }
              })
          })
       },20)
      },

      //展示弹框
      operation(type,row){
        if(type==='delete'){
          let tableData=_.cloneDeep(this.tableData);
          let index=tableData.findIndex(v=>v.id===row.id);
          tableData.splice(index,1);
          this.tableData=tableData;
        } else if(type==='edit'){
           if(row.id!==this.editRow.id){
             ownerWarehouseList({
                 ownerCode:this.infoData.ownerCode
             }).then(res=>{
                if(res.success){
                  this.editRow=row;
                  this.currentRow={};
                  this.originalTableData=_.cloneDeep(res.data).map(v=>{
                    delete v.id;
                    return v;
                  })
                  this.alertTableData=_.cloneDeep(this.originalTableData)
                  
                  let revisalEditTable=[...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr')];
                  revisalEditTable.forEach(item=>{
                    let td=[...item.querySelectorAll('td')]
                    td.forEach(v=>{
                        v.style.cssText=""
                    })
                  })

                }
             }).catch(err=>{
               console.log(err)
             })
           
           }
           this.addVisible=true;
        }
      },

      //点击确定
      sureWarehouse(){
        if(this.alertTableData.every(v=>!v.edit)){
          this.$message.error('请选择数据');
          return 
        }
        let tableData=_.cloneDeep(this.tableData);
        let index=tableData.findIndex(v=>v.id===this.editRow.id);
        if(index!==-1){
          tableData[index]={...tableData[index],...this.alertTableData.filter(v=>v.edit)[0]}
        }
         this.tableData=tableData;
         this.addVisible=false;
      }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss">
    .tableLink{
      cursor: pointer;
      color:#3399ea;
      margin-right:12px;
      &:last-child{
        margin-right: 0;
      }
    }

    .el-table__body tr.current-row>td{
      background: green !important;
      color: #fff;
    }
    .el-table__row{
      cursor: pointer;
    }
    .submitBtn{
      display: flex;
      margin: 12px 0;
    }
</style>
