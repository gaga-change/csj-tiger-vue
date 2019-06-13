<template lang="html">
  <div class="addCarrier">
      <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
        <template>
            <div style="display: inline-block;" v-if="!$route.query.id">
               <upload-excel  @uploadRes="uploadRes" filesuploadUrl="/webApi/in/bill/importTemplate"  modelUrl="/static/templet/采购入库.xlsx" name="file"/>
            </div>
            <el-button @click="submit('save')" type="primary" size="mini">保存</el-button>
        </template>
      </sticky>
      <el-card shadow="hover">
        <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
          <el-row>
              <el-col :sm="12" :md="8" :lg="8" :xl="6" >
                <el-form-item label="业务类型"  prop="busiBillType" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select   v-model="searchForm.busiBillType" size="small"  placeholder="请选择业务类型">
                    <el-option v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('入库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.id">
                <el-form-item label="业务单号:"  prop="billNo"  :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-input v-model="searchForm.billNo" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="外部订单号:"  prop="busiBillNo"  :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-input v-model="searchForm.busiBillNo" placeholder="请输入外部订单号" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="货主"   prop="ownerCode" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select v-model="searchForm.ownerCode" filterable size="small"  @change="ownerCodeChange"  placeholder="请选择货主"  >
                    <el-option
                      value="" v-if="mapConfig['billOwnerInfoMap']&&mapConfig['billOwnerInfoMap'].length" :disabled="true">
                      <div class="providerList">
                        <span>货主编号</span>
                        <span>货主名称</span>
                      </div>
                    </el-option>
                    <el-option
                      v-for="item in mapConfig['billOwnerInfoMap']" :key="item.key" :label="item.value" :value="item.key">
                        <div class="providerList">
                          <span >{{ item.key }}</span>
                          <span >{{ item.value }}</span>
                        </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="合同号:"  prop="contractNo"  :rules="[{ required: false, message: '该项为必填'}]" >
                  <el-input v-model="searchForm.contractNo" placeholder="请输入合同号" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="预计到货日期:"  label-width="120px" prop="planInWarehouseTime"  :rules="[{ required: true, message: '该项为必填'}]" >
                    <el-date-picker v-model="searchForm.planInWarehouseTime" size="small" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6" >
                <el-form-item  label="供应商名称"  label-width="90px" prop="providerCode" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select v-model="searchForm.providerCode" filterable size="small"  @change="providerChange" @focus="providerFocus" placeholder="请选择供应商"  >
                    <el-option  value="" v-if="providerConfig.length" :disabled="true">
                      <div class="providerList">
                        <span>供应商编号</span>
                        <span>供应商名称</span>
                      </div>
                    </el-option>
                    <el-option v-for="item in providerConfig" :key="item.customerCode" :label="item.customerName" :value="item.customerCode">
                      <div class="providerList">
                        <span >{{ item.customerCode }}</span>
                        <span >{{ item.customerName }}</span>
                      </div>
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="订单有效期"  label-width="100px" :rules="[{ required: true, message: '该项为必填'}]">
                    <el-date-picker v-model="searchForm.orderTime" size="small" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.id">
                <el-form-item label="订单来源"  label-width="100px">
                  <el-input v-model="searchForm.fromSystemId" placeholder="请输入订单来源" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

                <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.id">
                <el-form-item label="创建人:"  >
                  <el-input v-model="searchForm.createrName" placeholder="请输入创建人" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="$route.query.id">
                <el-form-item label="创建日期"  label-width="100px">
                    <el-date-picker v-model="searchForm.gmtCreate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="仓库" prop="warehouseCode"  :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select  v-model="searchForm.warehouseCode" clearable  placeholder="请选择仓库" size="small" class="formitem"  @focus="providerFocus" :loading="warehouseCodeLoading">
                    <el-option v-for="item in warehouseList" :label="item.warehouseName" :key="item.warehouseCode"  :value="item.warehouseCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="备注:"  >
                 <el-input v-model="searchForm.remarkInfo" placeholder="请输入备注" size="small" class="formitem"></el-input>
               </el-form-item>
             </el-col>
        </el-row>

        <div class="tableBox">
          <div class="tableTitle">
              <item-title text="商品明细"/>
              <div class="tableBtn">
                <el-button  size="mini" class="addCommodity" @click="showDialog('add')" type="primary">添加商品</el-button>
              </div>
          </div>
            <edit-Table
              :useEdit="true"
              :config="addtable_config"
              @goeditrow="goeditrow"
              @handleDelete="handleDelete"
              :allTableData="searchForm.detailItemList"/>
            </edit-Table >
        </div>

        <el-dialog
          title="新增商品"
          :visible.sync="addVisible"
          width="30%"
          :before-close="handleClose">
            <add-form @submit="submit" :searchForm="addCommodityForm"   :commodityList="commodityList" @skuCodeChange="skuCodeChange"   @handleClose="handleClose" ></add-form>
        </el-dialog>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addtable_config } from './config';
import editTable from '@/components/Table/editTable';
import Sticky from '@/components/Sticky'
import addForm from './conpoments/addForm'
import {inBillAdd,customerInfo,inbilldetail,inBillUpdate} from '@/api/warehousing'
import { ownerWarehouseList } from '@/api/tenant'
import { skuInfoList } from '@/api/sku'
import { mapGetters } from 'vuex'
import _  from 'lodash';
import moment from 'moment';
export default {
   name: 'warehousingBusinessorderAdd',
   components: { editTable,addForm,Sticky},
    data() {
      return {

        warehouseCodeLoading: false,

        //表单项
        searchForm:{
          detailItemList:[]
        },
        //表单table配置项
        addtable_config,

        //新增项
        addVisible:false,
        addCommodityForm:{

        },

        //供应商下拉配置
        providerConfig:[],
        commodityList:[], //商品列表
        warehouseList: []
      };
    },

  computed: {
    ...mapGetters({
      'mapConfig':'mapConfig',
        visitedViews: 'visitedViews'
    })
  },

    mounted(){
      if(this.$route.query.id){
        inbilldetail(this.$route.query.id).then(res=>{
          if(res.data.ownerCode){
            this.getCustomerInfo(res.data.ownerCode);
          }
          let searchForm= _.cloneDeep(this.searchForm);
          searchForm=res.data;
          searchForm.detailItemList=res.data.items.map(v=>{
             v.purchasePrice=v.inPrice;
             v.planInQty=v.skuInQty;
             return v;
          });
          this.searchForm=searchForm;
        }).catch(err=>{
          console.log(err)
        })
      }
    },

    methods: {

    //选择货主
    ownerCodeChange(value){
      if(this.searchForm.providerCode){
        let searchForm= _.cloneDeep(this.searchForm);
        searchForm.providerCode='';
        searchForm.warehouseCode='';
        searchForm.detailItemList=[];
        this.searchForm=searchForm;
      }
      this.providerConfig=[];
      this.getCustomerInfo(value);
      this.warehouseList.length = 0
      this.showStore({ ownerCode: value })
    },

    showStore(row) {
      this.warehouseCodeLoading = true
      ownerWarehouseList({ ownerCode: row.ownerCode }).then(res => {
        let result = res.data
        this.warehouseList = result
      }).catch(err => {
        console.log(err)
      }).then(res => {
        this.warehouseCodeLoading = false
      })
    },

    //根据货主查供应商列表
    getCustomerInfo(value){
      customerInfo(value).then(res=>{
        if(res.success){
         this.providerConfig=res.data||[];
        }
      }).catch(err=>{
        console.log(err)
      })
    },


    //供应商获取焦点
    providerFocus(){
      if(!this.searchForm.ownerCode){
        this.$message.error('请先选择货主');
      }
    },

    //供应商改变触发
    providerChange(value){
      let searchForm= _.cloneDeep(this.searchForm);
      searchForm.detailItemList=[];
      this.searchForm=searchForm;
    },

    //添加商品时选择商品编码的回调
    skuCodeChange(value){
      let commodityList= _.cloneDeep(this.commodityList);
      this.addCommodityForm=commodityList.find(v=>v.skuCode===value)
    },

    //导入的回调
    uploadRes(res){
      if(res.success){
        let data= _.cloneDeep(res.data);
        let searchForm= _.cloneDeep(this.searchForm);
        if(data.ownerCode){
          this.getCustomerInfo(data.ownerCode);
        }
        ['busiBillNo','ownerCode','contractNo','orderTime','providerCode','planInWarehouseTime'].forEach(v=>{
          searchForm[v]=data[v]
        })
        searchForm.detailItemList=data.items.map((v,i)=>{
          v.purchasePrice=v.inPrice;
          v.planInQty=v.skuInQty;
          return v;
        });
        this.searchForm=searchForm;
      } else{
        this.$message.error('导入失败');
      }
    },


    //添加弹框
    showDialog(type){
      if(type==='add'){
        if(!this.searchForm.ownerCode||!this.searchForm.providerCode){
            this.$message.error('请先选择供应商和货主');
            return
        }
        skuInfoList(this.searchForm.ownerCode,this.searchForm.providerCode, 2).then(res=>{
          if(res.success){
            let data=res.data&&_.cloneDeep(res.data)||[];
            let arr=[];
            data.forEach(v=>{
              if(!arr.map(v=>v.skuCode).includes(v.skuCode)){
                 arr.push(v)
              }
            });

            this.commodityList=arr;
          }
        }).catch(err=>{
          console.log(err)
        })
        this.addVisible=true;
        this.addCommodityForm=Object.create({})
      }
    },


    submit(type,value) {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if(type==='addCommodity'){
          let searchForm= _.cloneDeep(this.searchForm);
          searchForm.detailItemList.push(value);
          searchForm.detailItemList=searchForm.detailItemList.map((v,i)=>{
            return v;
          });
          this.searchForm=searchForm;
          this.addVisible=false;
      } else {
        this.$refs["searchForm"].validate(valid => {
          if (valid) {
              let json=_.cloneDeep(this.searchForm);
              json.ownerName=this.mapConfig['billOwnerInfoMap'].find(v=>v.key===json.ownerCode).value;
              json.providerName=this.providerConfig.find(v=>v.customerCode===json.providerCode).customerName;
              ['orderTime','planInWarehouseTime'].forEach(v=>{
                json[v]=moment(json[v]).valueOf()
              })
              let Api=inBillAdd;
              if(this.$route.query.id){
                 Api=inBillUpdate
              }
              Api(json).then(res=>{
                if(res.success){
                  this.$message({
                    type:'success',
                    message:'操作成功,即将跳转到详情页！' ,
                    duration:1500,
                    onClose:()=>{
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path:`/warehousing/businessorder-detail?id=${this.$route.query.id||res.data&&res.data.id}`,
                        })
                      }).catch(err=>{
                        console.log(err)
                      })
                    }
                  })
                }
              }).catch(err=>{
                console.log(err)
              })
          }
        });
      }

    },

    goeditrow(index,type) {
      let searchForm= _.cloneDeep(this.searchForm);
      searchForm.detailItemList[index].edit=!searchForm.detailItemList[index].edit
      this.searchForm=searchForm;
    },

    handleDelete(index, row) {
      let searchForm= _.cloneDeep(this.searchForm);
      searchForm.detailItemList.splice(index,1)
      this.searchForm=searchForm;
    },

    handleClose(){
      this.addVisible=false;
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .providerList{
      display: flex;
      justify-content: space-between;
      >span{
        &:first-child{
          min-width: 150px;
        }
        &:nth-child(2){
          min-width: 100px;
        }
      }
    }
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .el-form-item {
    height: 40px;
  }
  .tableBox{
    .tableTitle{
      display:flex;
      justify-content: space-between;
      margin: 16px 0;
    }
    .tableBtn{
      display: flex;
    }
    .addCommodity{
      height:28px;
      line-height:26px;
      padding:0 12px;
      margin-left: 12px;
    }
  }
}
</style>
