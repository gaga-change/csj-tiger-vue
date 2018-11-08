<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.ticketStatus == 0">
         <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">关联业务单
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">关联业务单保存
        </el-button>  
         <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">关联业务单提交
        </el-button>  
      </template> 
      <template v-else-if="cardData.ticketStatus == 1">
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">审核
          </el-button>  
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
              @click="salesman()">驳回
          </el-button>  
        </template>
       <el-button  style="margin-left: 10px;" v-else-if="cardData.ticketStatus == 2&&!cardData.isInvalid" size="small"  :disabled="buttonDisabled||!$haspermission('salseinvoicecreate')"
            @click="salesman()">作废 
        </el-button>  
        <e-tag v-else>
          暂无操作
        </e-tag>
  </sticky>
    <invoice-detail :cardData="cardData"  
    :detailtableConfig="detailtableConfigDetail"
    :tableData="finaSaleInvoiceDetailDOList"  :name="name"/>
      <el-dialog
          title="签收明细选择"
          :visible.sync="shouDetails"
          width="60%"
          :before-close="handleClose">
          <el-form v-model="searchForm">
            <el-row :gutter="20">
               <el-col :span="6">
                <el-form-item label="订单编号" >
                  <el-input type="text" size="small" :disabled="true"  v-model="searchForm.orderNo" ></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="合同编号" >
                  <el-input type="text" size="small" :disabled="true"  v-model="searchForm.contractNo" ></el-input>
                </el-form-item>
              </el-col>
              <el-button @click="searchOrder" :span="3" type="primary">查询</el-button>
              <el-button @click="searchReset" :span="3" type="primary">重置</el-button>
            </el-row>
          </el-form>
          <el-table
              :data="planform.details"
              size="small"
              v-loading="loading"
              
              max-height="600">
              <el-table-column
                label="序号"
                type="index">
              </el-table-column>
              <el-table-column
                label="商品编码"
                prop="skuCode" >
              </el-table-column>
            <el-table-column
              label="商品名称"
              prop="skuName">
            </el-table-column>
            <el-table-column
              label="品牌"
              prop="skuBrandName">
            </el-table-column>
            <el-table-column
              label="规格"
              prop="skuFormat">
            </el-table-column>
            <el-table-column
              label="单位"
              prop="skuUnitName">
            </el-table-column>
            <el-table-column
              label="出库数量"
              prop="realOutQty">
            </el-table-column>
            <el-table-column
              label="单价"
              prop="skuPrice">
            </el-table-column>
            <el-table-column
              label="转换率"
              prop="skuUnitConvert">
            </el-table-column>
            <el-table-column
              label="签收数量"
               width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number 
                    size="mini"
                    :max="scope.row.realOutQty-scope.row.rejectQty" 
                    :min="0" 
                     style="width:100px"
                     v-model="scope.row.signQty" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.signQty}}
                </span>
              </template>
            </el-table-column>

             <el-table-column
              label="拒收数量"
              width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number 
                  :max="scope.row.realOutQty-scope.row.signQty" 
                  :min="0" 
                  size="mini"
                  style="width:100px"
                   v-model="scope.row.rejectQty" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.rejectQty}}
                </span>
              </template>
            </el-table-column>
   
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
                <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
          <el-button @click="shouDetails = false">关闭</el-button>
          </span>
       </el-dialog>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { getSalesInvoiceDetails } from '@/api/invoicetigger/invoice'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig } from '../components/config';
    const name = "register"
    const detailtableConfigDetail = []
       
        detailtableConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            detailtableConfigDetail.push(item)
          }
        })
    let searchForm = {
      orderNo:'',
      contractNo:''
    }
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardData:{},
          finaSaleInvoiceDetailDOList:[],
          detailtableConfig:detailtableConfigDetail,
          name,
          searchForm,
          orderTableData:[],
          filterOrderTableData:[]
        }
      },

     created(){
      this.getCurrentTableData();  
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      Modify,
      searchOrder(){
        this.filterOrderTableData = this.orderTableData.filter(company => {
          return company.orderNo.includes(this.searchForm.orderNo) && company.contractNo.includes(this.searchForm.contractNo)
        })
      },
      searchReset(){
        this.searchForm = searchForm
        this.filterOrderTableData = [...this.orderTableData]
      },
      goToBilling(){
        this.$router.push({
          path:`/invoice/outputinvoice/invoiceapply/billing?id=${this.$route.query.id}`,
        })
      },
      needfresh() {
        console.log(63336);
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
      linkToInvoice(){
          this.$confirm('去新建发票页创建', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
       this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?id=${this.$route.query.id}&from=copy`,
          })
     }).catch(err => {
        this.$message({
          type: 'warn',
          message: '审核失败!'
        })
      })
         
      },
      getCurrentTableData(){
        this.loading=true;
       getSalesInvoiceDetails({id:this.$route.query.id}).then(res=>{
       if(res.success){
          let data=res.data;
          
          
          this.tableData=data.list||[];
          this.finaSaleInvoiceDetailDOList = res.data && res.data.finaSaleInvoiceDetailDOList || []
          this.cardData = res.data
          
          this.cardData.finaSaleInvoiceDetailDOList = []
        
       }
        this.loading=false;

     }).catch(err=>{
         this.loading=false;
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

