<template>
  <div class="outgoing-quirydetail-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template>
          <el-button type="primary" size="small" @click="submit" :loading="submitLoading">生成计划单</el-button>
      </template>
   </sticky>

     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading" :cardData="infoData"  />
     

    <div class="itemBox">
      <item-title text="相关明细" boxStyle="width:100px"/>
      <div class="itemBox_date">
        <span>计划出库日期:</span>
        <el-date-picker size="small" v-model="infoData.planOutTime" type="date" placeholder="选择日期"/>
      </div>
    </div>
    
     <div class="detail">
        <web-pagination-table
          :loading="loading"
          :config="addPlanOrder_config" 
          :allTableData="tableData"/>
     </div>
    
      <el-dialog
        title="编辑计划出库数量并选择仓库"
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

 import { addPlanOrder_config,infoConfig,alertTable_config} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import editTable from '@/components/Table/editTable';
 import Sticky from '@/components/Sticky'
 import {skuInfoGetRecommendStock,outPlanAdd,outPlanInitAdd} from '@/api/outgoing'
 import moment from 'moment';
 import _  from 'lodash';
 import { mapGetters } from 'vuex'

 export default {
    name: 'businessorderAddPlanOrder',
    components: { webPaginationTable,editTable,Sticky},
    data() {
      return {
        //基本信息项
        loading:false,
        infoData:{
          planOutTime:this.moment().valueOf()
        },
        infoConfig,

        //table项
        tableData:[], //需要id
        addPlanOrder_config,

        //弹框项
        addVisible:false,
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
        if(item.label==='操作'){
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
      outPlanInitAdd(this.$route.query.id).then(res=>{
        if(res.success){
          let data= _.cloneDeep(res.data);
          let dom=[...document.querySelectorAll('.detail .Price .cell')]
          dom.forEach(item=>{
            if(data&&data.busiBillType===21){
               item.innerHTML='客户销价'
            } else {
               item.innerHTML='进货价'
            }
          })
          this.infoData=res.data;
          if(!this.infoData.planOutTime){
            this.infoData.planOutTime=moment().valueOf()
          }
          this.tableData=(data&&Array.isArray(data.busiBillDetails)&&data.busiBillDetails||[]).map(v=>{
            v.id=v.skuCode
            return v;
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    methods:{
      moment,
      submit(){
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        if(this.tableData.some(v=>isNaN(v.planOutQty)||v.planOutQty===null)){
          this.$message.error('其请输入正确的计划出库数量');
          return 
        }
        this.submitLoading = true
        outPlanAdd({
          itemList:_.cloneDeep(this.tableData).map((v,i)=>{
            v.busiIndex=i+1;
            v.outPrice=v.outStorePrice;
            delete v.id
            return v
          }),
          planOutTime:moment(this.infoData.planOutTime).valueOf(),
          operateToken:moment().valueOf(),
          outWarehouseBillId:this.$route.query.id
        }).then(res=>{
          if(res.success){
            this.$message({
              type:'success', 
              message:'操作成功,即将跳转到计划单列表页！' ,
              duration:1500,
              onClose:()=>{
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:`/outgoing/plan`,
                  })
                }).catch(err=>{
                  console.log(err)
                })  
              }
            })
          } else{
            this.submitLoading = false
          }
        }).catch(err=>{
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
             v.planOutQty=_.cloneDeep(this.editRow).planOutQty
          } else{
            v.edit=false;
            v.planOutQty=null;
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
           if(row.skuCode!==this.editRow.skuCode){
             skuInfoGetRecommendStock(this.infoData.ownerCode,row.skuCode).then(res=>{
               if(res.success){
                 this.editRow=_.cloneDeep(row);
                 this.currentRow={};
                 this.alertTableData=_.cloneDeep(res.data)
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

   .itemBox{
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      .itemBox_date{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        >span{
          padding: 0 12px;
        }
      }
    }
</style>
