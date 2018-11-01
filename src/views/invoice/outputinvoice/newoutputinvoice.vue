<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'" style="margin-bottom: 8px">
    <template v-if="fetchSuccess">
      <el-button v-loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitForm('searchForm')" >提交
      </el-button>
    </template>
    <template v-else>
      <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
    </template>
  </sticky>
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户名称">
            <el-select v-model="searchForm.cusCode"
              :filter-method="cusCodeFilter" 
              filterable placeholder="请选择客户名称" @change="customerChange"  >
              <el-option 
                value=""
               :disabled="true"
               v-if="nowCustomerConfig.length>0" >
                <span  class="codeNoStyle">企业编号</span>
                <span  class="codeNoStyle" style="width:260px">企业名称</span>
              </el-option>

              <el-option
                v-for="item in nowCustomerConfig"
                :key="item.entNumber"
                :label="item.entName"
                :value="item.entNumber">
                <span class="codeNoStyle" >{{ item.entNumber }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.entName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
            <el-form-item label-width="70px" label="发票种类:" class="postInfo-container-item" >
              <el-select v-model="searchForm.invoicetype"  :clearable="true" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票种类" prefix-icon="el-icon-search">
                <el-option v-for="item in invoicetype" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="90px" label="最迟开票日期:"  class="postInfo-container-item"   >
            <el-date-picker size="small" v-model="searchForm.lastinvoicedate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="70px" label="申请日期:" class="postInfo-container-item" >
            <el-date-picker size="small" v-model="searchForm.aplaydate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
         </el-row>
         <el-row>
        <el-col :span="6">
          <el-form-item label="订单编号" >
             <el-select v-model="searchForm.orderNo" 
             :filter-method="orderNoFilter" filterable placeholder="请选择订单编号"   @change="saleorderChange" >
              <el-option 
                value=""
                :disabled="true" 
                v-if="nowOrderNoConfig.length>0" >
                <span  class="codeNoStyle">销售订单号</span>
                <span  class="codeNoStyle">销售合同号</span>
              </el-option>
              <el-option
                v-for="item in nowOrderNoConfig"
                :key="item.saleorder"
                :label="item.busiBillNo"
                :value="item.busiBillNo">
                <span class="codeNoStyle">{{ item.busiBillNo }}</span>
                <span class="codeNoStyle">{{ item.contractNo }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="合同编号" >
            <el-input type="text" size="small" :disabled="true"  v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="含税发票金额" label-width="90px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.ticketNo" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="不含税发票金额" label-width="100px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.noticketNo" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="税额" label-width="70px" >
            <el-input type="text" size="small"  :disabled="true" v-model="searchForm.ticket" ></el-input>
          </el-form-item>
        </el-col>

          <el-col :span="6">
            <el-form-item label-width="70px" label="发票性质:" class="postInfo-container-item" prop="invoicetype">
              <el-select v-model="searchForm.invoicetype" 
              size="small" style='min-width:220px;' filterable clearable placeholder="请选择发票种类" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in NatureInvoice"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
         </el-col>

         <el-col :span="6">
           <el-form-item label-width="0px">
            <el-button type="primary" size="small"  @click="shouDetails = true" >选择签收单下商品明细</el-button> </el-form-item>
         </el-col>
        </el-row>
      </el-card>

       <el-row >
          <item-title text="签收单下商品明细"/>
          <el-table
            :show-header="false"
            :data="searchForm.details"
            :default-expand-all="true"
             style="width: 100%">
            <el-table-column type="expand" >
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">

                   <el-form-item label="商品编码">
                    <span>{{ props.row.skuCode }}</span>
                  </el-form-item>

                   <el-form-item label="商品名称">
                    <el-input
                      v-if="props.row.edit"
                      size="mini"
                      v-model="props.row.skuName" >
                    </el-input>
                    <span v-else>{{ props.row.skuName }}</span>
                  </el-form-item>

                  <el-form-item label="税务编码">
                    <el-input
                      v-if="props.row.edit"
                      size="mini"
                      v-model="props.row.code" >
                    </el-input>
                    <span v-else>{{ props.row.code }}</span>
                  </el-form-item>

                  <el-form-item label="规格型号">
                    <el-input
                      v-if="props.row.edit"
                      size="mini"
                      v-model="props.row.skuFormat" >
                    </el-input>
                    <span v-else>{{ props.row.skuFormat }}</span>
                  </el-form-item>

                   <el-form-item label="单位">
                    <el-input
                      v-if="props.row.edit"
                      size="mini"
                      v-model="props.row.skuUnitName" >
                    </el-input>
                    <span v-else>{{ props.row.skuUnitName }}</span>
                  </el-form-item>

                  <el-form-item label="签收数量">
                    <span>{{ props.row.signQty }}</span>
                  </el-form-item>

                   <el-form-item label="单价">
                    <span>{{ props.row.skuPrice }}</span>
                  </el-form-item>

                  <el-form-item label="税率">
                    <span>{{ props.row.shuilv }}</span>
                  </el-form-item>

                  <el-form-item label="含税金额">
                    <span>{{ props.row.hshuie }}</span>
                  </el-form-item>

                  <el-form-item label="税额">
                    <el-input
                      v-if="props.row.edit"
                      size="mini"
                      v-model="props.row.shuie" >
                    </el-input>
                    <span v-else>{{ props.row.shuie }}</span>
                  </el-form-item>

                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="序号"
              type="index">
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
                <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-form-item>
        </el-row>   
      </el-form>

       <el-dialog
          title="签收明细选择"
          :visible.sync="shouDetails"
          width="60%"
          :before-close="handleClose">
            <el-row>
               <el-col :span="6" style="min-width:300px;margin-bottom:12px">
                  <span>签收单号 :</span>
                  <el-select v-model="id" :clearable="true"  filterable placeholder="请选择签收单号"  @change="signNoChange" >
                    <el-option
                      v-for="item in signNoConfig"
                      :key="item.id"
                      :label="item.signNo"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-col>
            </el-row>
           <web-pagination-table 
            :loading="alertLoding"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
          <span slot="footer" class="dialog-footer">
          <el-button @click="shouDetails = false">取 消</el-button>
          <el-button type="primary" @click="handleSuccess">确 定</el-button>
          </span>
       </el-dialog>

    </div>
</template>
<script src="./newoutputinvoice.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .codeNoStyle{
    float: left; 
    color: #8492a6; 
    font-size: 12px;
    width:150px;
    &:last-child{
      float: right;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>
