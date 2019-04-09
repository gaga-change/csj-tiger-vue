<template>
  <div class="outgoing-quirydetail-container">
     <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button   size="small" v-if="[0,2].includes(infoData.billStatus)" @click="operation('close')">关闭</el-button>
         <el-button   size="small" v-if="[0,2].includes(infoData.billStatus)" @click="operation('delete')">删除</el-button>
         <router-link  v-if="[0,2].includes(infoData.billStatus)"  :to="`/warehousing/businessorderadd?id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>
         <el-button  type="success" size="small" v-if="[0,2].includes(infoData.billStatus)" @click="operation('examine')" >审核</el-button>
         <el-button  type="success" size="small" @click="printing" v-if="[1].includes(infoData.billStatus)">打印</el-button>
         <router-link  :to="`/warehousing/warehousingAddPlanOrder?id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small" v-if="[1].includes(infoData.billStatus)" >创建计划单</el-button>
         </router-link>
      </template>
    </sticky>
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>

      <el-dialog
         title="入库业务单打印"
         top="40px"
        :visible.sync="printingVisible"
         width="841px"
        :before-close="handleClose">
        <invoice id="invoice"  :baseData="baseData" :config="printingTable_config"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="surePrinting">打印</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>

 import { tableConfig,infoConfig,printingTable_config} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import {inbilldetail,inbillPrint,inBillUpdateStatus} from '@/api/warehousing'
 import Sticky from '@/components/Sticky'
 import Invoice from './conpoments/invoice'
 import { mapGetters } from 'vuex'
 import moment from 'moment';
 import { MakePrint } from '@/utils'

 export default {
    components: { webPaginationTable,Sticky,Invoice},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        tableConfig,
        
        //打印项
        printingVisible:false,
        baseData:{},
        printingTable_config
      }
    },

    mounted(){
      this.inbilldetailApi()
    },

    computed: {
      ...mapGetters({
         visitedViews: 'visitedViews'
      })
    },
    methods:{
       moment,
       inbilldetailApi(){
          inbilldetail(this.$route.query.id).then(res=>{
            if(res.success){
              this.infoData=res.data;
              this.tableData=res.data.items;
            }
          }).catch(err=>{
            console.log(err)
          })
       },
       operation(type,row){
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        let tip='';
        let statusFlag=null;
        if(type==='examine'){
          tip='确定要审核通过吗?'
          statusFlag=1
        } else if(type==='close'){
          tip='确定要关闭吗?';
          statusFlag=4
        } else if(type==='delete'){
          tip='确定要删除吗?';
          statusFlag=9
        }

        //请求配置
        let submit=()=>inBillUpdateStatus({
           inWarehouseBillId:this.$route.query.id,
           statusFlag,
        }).then(res=>{
          if(res.success){
            if(type==='delete'){
              this.$message({
                  type:'success', 
                  message:'操作成功,即将跳转到列表页！' ,
                  duration:1500,
                  onClose:()=>{
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push({
                        path:`/warehousing/businessorder`,
                      })
                    }).catch(err=>{
                      console.log(err)
                    })  
                  }
              })
            } else{
              this.inbilldetailApi()
            }
          }
        }).catch(err=>{
          console.log(err)
        })

        //对话配置
        this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          submit()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

       //关闭弹框
       printing(){
        this.printingVisible=true;
        inbillPrint(this.$route.query.id).then(res=>{
          if(res.success){
            this.baseData=res.data;
          }
        }).catch(err=>{
          console.log(err)
        })
       },
       handleClose(){
        this.printingVisible=false;
       },
       surePrinting(){
          let printContainer = document.getElementById('invoice').innerHTML;
          MakePrint(printContainer);
          this.printingVisible=false;
       }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body{
    padding-top: 12px;
  }
</style>

