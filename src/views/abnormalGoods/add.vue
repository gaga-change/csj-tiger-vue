<template>
  <div  class="abnormalGoods">
      <add-search   @submit="this.submit" :disabled="disabled"   @propChange="this.propChange" ref="search" ></add-search >
      <div class="add-buttom" >
        <item-title text="商品明细" />
        <el-button type="primary" size="mini"  @click="displayAlert"  >增加商品明细</el-button>
     </div>
     <edit-table 
       :tableData="editTableData"
       @goeditrow="goeditrow"
       @handleDelete="handleDelete"/>
      
     <div class="tableTotal"  >
       <span>申请退回数量</span> : <span>{{Number(returnQty).toFixed(2)}}</span>
       <span>金额</span> : <span>{{Number(returnQtyCostPrice).toFixed(2)}}</span>
    </div>

     <el-dialog
      title="选择商品明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">
      
        <el-row>
          <el-col :span="6" style="min-width:300px;margin-bottom:12px">
            <span style="font-size:12px;color:#606266">采购合同编号 :</span>
            <el-select v-model="purcBillContractNo" 
             :clearable="true"  
             filterable
             @change="purcBillContractNoChange"
             placeholder="请选择采购合同编号">
              <el-option
                v-for="item in purcBillContractNoConfig"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </el-col>
      </el-row>

       <web-pagination-table 
        @SelectionChange="handleSelectionChange"
        :loading="alertLoading"
        :config="addAlertTableConfig" 
        :allTableData="alertTableData"/>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="handleSuccess">确 定</el-button>
        </span>
    </el-dialog>
  </div> 
</template>

<script>
import AddSearch from './components/addSearch'
import EditTable from './components/table'
import { addAlertTableConfig } from './components/config';
import webPaginationTable from '@/components/Table/webPaginationTable'
import { handleOpinionConfig } from '@/utils/enum'
import { queryListByCustCodeAndOutBillCode , savePurcRejectApplyDO ,getPurcRejectApply } from '@/api/abnormalGoods';  
import _  from 'lodash';
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
  name:'abnormalGoodsAdd',
  components: { AddSearch,EditTable,webPaginationTable },
   data() {
    return {
      editTableData:[],
      addAlertTableConfig,
      dialogVisible:false,
      alertLoading:false,
      localAlertTableData:[],
      alertTableData:[],
      alertTableDataSelect:[],
      purcBillContractNoConfig:[],
      outBillNo:'',

      purcBillContractNo:'',/**采购订单号对应的合同**/
      disabled:false,

    }
  },

  mounted(){
    this.onload()
  },

  // activated(){
  //   this.onload()
  // },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    }),

    returnQty:{
      get: function () { 
        return this.editTableData.reduce((a,b)=>{
          return a+b.returnQty
        },0)
      },
      set:function(){
        
      }
    },

    returnQtyCostPrice:{
      get: function () { 
        return this.editTableData.reduce((a,b)=>{
          return a+b.returnQty*b.costPrice
        },0)
      },
      set:function(){
        
      }
    },


  },

  methods:{
     onload(){
         if(this.$route.query.id){
         getPurcRejectApply({
           id:this.$route.query.id
         }).then(res=>{
            if(res.success){
              for(let i in this.$refs['search'].searchForm){
                 this.$refs['search'].searchForm[i]=res.data[i]
              }

              if(!this.$refs['search'].searchForm.handleOpinion){
                this.$refs['search'].searchForm.handleOpinion = handleOpinionConfig[0].value
              }
              this.editTableData=res.data.productBreakdown.map(v=>{
                let json=v;
                json.warehouseName=res.data.warehouseName;
                json.purcBillNo=res.data.purcBillNo;
                json.purcBillContractNo=res.data.purcBillContractNo;
                json.warehouseCode=res.data.warehouseCode;
                json.costPrice=v.taxPrice;
                return json;
              });
            }
         }).catch(err=>{
           if(!this.$refs['search'].searchForm.handleOpinion){
             this.$refs['search'].searchForm.handleOpinion = handleOpinionConfig[0].value
            }
            console.error(err)
         })
        }else{
           this.$refs['search'].searchForm.handleOpinion = handleOpinionConfig[0].value     
        }
    },
    
    purcBillContractNoChange(value){
     this.alertTableData=this.localAlertTableData.filter(v=>v.purcBatchContractNo===value);
    },

    propChange(){
      this.localAlertTableData=[];
      this.alertTableData=[];
      this.alertTableDataSelect=[];
      this.editTableData=[];
      this.outBillNo='';
      this.purcBillContractNo='';
    },

    displayAlert(){
      let data=this.$refs['search'].searchForm;
      if(data.customerCode&&data.outBillNo){
          this.dialogVisible=true;
          if(this.outBillNo!==data.outBillNo){
              this.outBillNo=data.outBillNo;
              this.alertLoading=true;
              queryListByCustCodeAndOutBillCode({
              custCode:data.customerCode,
              outBillCode:data.outBillNo
            }).then(res=>{
              if(res.success){
                this.localAlertTableData=res.data;
                let arr=res.data.map(v=>v.purcBatchContractNo);
                let purcBatchContractNoArr=[];
                arr.forEach(element => {
                  if(!purcBatchContractNoArr.includes(element)){
                    purcBatchContractNoArr.push(element)
                  }
                });
                this.purcBillContractNoConfig=purcBatchContractNoArr;
              }
              this.alertLoading=false;
             }).catch(err=>{
               console.error(err)
               this.alertLoading=false;
             })
          }
          
      } else{
         this.$message.error('请先选择销售订单');
      }
     
    },

    handleSuccess(){
      this.dialogVisible=false;
      this.editTableData=this.alertTableDataSelect.map(v=>{
         v.returnQty=v.refundQty-v.registeredQty||0;
         return v;
      });
    },

    handleSelectionChange(value){
      this.alertTableDataSelect=value;
    },

    submit(value,type){
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      let json={};
      if(this.$route.query.id){
        json.id=this.$route.query.id;
      }
      for(let i in value){
        if(value[i]||value[i]===0){
           json[i]=value[i]
        }
      }
      json.planReturnDate=moment(json.planReturnDate).valueOf()
      json.billStatus=type==='save'?0:1;
      json.productBreakdown=this.editTableData;
      json.purcBillContractNo=this.editTableData[0]&&this.editTableData[0].purcBatchContractNo;
      json.purcBillNo=this.editTableData[0]&&this.editTableData[0].purcBatchNo;
      json.warehouseName=this.editTableData[0]&&this.editTableData[0].warehouseName;
      json.warehouseCode=this.editTableData[0]&&this.editTableData[0].providerCode;
      
      savePurcRejectApplyDO(json).then(res=>{
        if(res.success){
            this.disabled=true;
            this.$message({
            type:'success',
            message:'操作成功,1.5s后跳往详情页',
            duration:1500,
            onClose:()=>{
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:'/abnormalGoods/detail',
                    query:{id:res.data.id }
                  })
              }).catch(err=>{ 
                console.error(err)
              })  
             }
            })
        }
      }).catch(err=>{
        console.error(err)
      })
  

    },

    goeditrow(index,type){
      let data= _.cloneDeep(this.editTableData);
      data[index].edit=!data[index].edit;
      this.editTableData=data;
    },

    handleDelete(index,row){
     let data= _.cloneDeep(this.editTableData);
     data.splice(index,1);
     this.editTableData=data;
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .tableTotal{
      margin-top: 12px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
  }
</style>

