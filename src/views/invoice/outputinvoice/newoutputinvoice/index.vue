<template lang="html">
<div class="app-container OutputinvoiceNewoutputinvoiceIndex">
  <sticky :className="'sub-navbar published'" style="margin-bottom: 8px">
    <template v-if="fetchSuccess">
       <el-button v-loading="loading"  :disabled="disabled"   style="margin-left: 10px;"  size="mini"  @click="submitForm('searchForm','save')">保存
      </el-button>
      <el-button v-loading="loading" :disabled="disabled"  style="margin-left: 10px;"   size="mini"  type="success"  @click="submitForm('searchForm','submit')">保存并提交
      </el-button>
    </template>

    <template v-else>
  <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
</template>
  </sticky>

  <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="70px" label-position="left">
      <el-card class="simpleCard" shadow="never" body-style="padding:12px">
      <el-row>
        <el-col :span="6" style="margin-bottom:16px;">
          <el-form-item label="客户名称"  prop="cusName">
            <el-select v-model="searchForm.cusCode"
              :filter-method="cusCodeFilter"
              @clear="cusCodeFilter" 
              clearable
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

      
        <el-col :span="6" style="margin-bottom:16px;">
          <el-form-item label="订单编号"  prop="orderNo" >
             <el-select v-model="searchForm.orderNo" 
              clearable
              :filter-method="orderNoFilter" 
               @clear="orderNoFilter" 
              filterable placeholder="请选择订单编号" 
              @focus="isHasCusName"
              @change="saleorderChange" >
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

        <el-col :span="6" style="margin-bottom:16px;">
          <el-form-item label="合同编号"  prop="contractNo" >
            <el-input type="text" size="mini" :disabled="true"  v-model="searchForm.contractNo" ></el-input>
          </el-form-item>
        </el-col>

         <el-col :span="6" style="margin-bottom:16px;">
            <el-form-item label-width="80px" label="发票种类:"  prop="invoiceType"  class="postInfo-container-item" >
              <el-select v-model="searchForm.invoiceType"    :clearable="true" 
              size="mini" style='min-width:220px;' placeholder="请选择发票种类" prefix-icon="el-icon-search">
                <el-option v-for="item in InvoiceType" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="6" style="margin-bottom:16px;">
            <el-form-item 
            prop="invoiceNature"
             label-width="80px" 
             label="发票性质:"
             class="postInfo-container-item"  >
              <el-select 
              v-model="searchForm.invoiceNature" 
              size="mini" 
              style='min-width:220px;' 
              placeholder="请选择发票种类"
               @change="invoiceChange" 
               prefix-icon="el-icon-search">
                <el-option
                  v-for="item in NatureInvoiceEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
         </el-col>

            <el-col :span="6" style="margin-bottom:16px;margin-left:20px;minWidth:300px"  v-if="searchForm.invoiceNature=='CREDIT_NOTE'">
            <el-form-item label="原蓝字发票票号"  label-width="100px" >
                  <el-select 
                  v-model="searchForm.oldInvoiceCode" 
                  :clearable="true" 
                   @change="oldInvoiceCodeChange"
                  size="mini" style='min-width:220px;' placeholder="请选择蓝票" prefix-icon="el-icon-search">
                    <el-option
                     v-for="item in outBusiBillNoConfig" 
                     :key="item.id" 
                     :label="item.invoiceCode" 
                     :value="item.invoiceCode">
                    </el-option>
                  </el-select>
            </el-form-item>
          </el-col>  
          
          <el-col :span="6" style="margin-bottom:16px;margin-left:20px;minWidth:360px">
          <el-form-item label-width="80px" label="申请日期:" prop="applyTime"   class="postInfo-container-item" >
            <el-date-picker size="mini" v-model="searchForm.applyTime"  placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

           <el-col :span="6" style="margin-bottom:16px;minWidth:300px">
          <el-form-item label-width="100px" label="最迟开票日期:"  prop="applyLastAllowTime"   class="postInfo-container-item"   >
            <el-date-picker size="mini" v-model="searchForm.applyLastAllowTime"  placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>



        <el-col :span="6" style="margin-bottom:16px">
          <el-form-item label="含税发票金额"    label-width="90px" >
            <el-input type="text" size="mini"  :disabled="true" v-model="Number(allTaxAmount).toFixed(2)" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7" style="margin-bottom:16px;margin-left:20px">
          <el-form-item label="不含税发票金额"   label-width="100px" >
            <el-input type="text" size="mini"  :disabled="true" 
            v-model="Number(allNotTaxAmount).toFixed(2)"></el-input>
          </el-form-item>
        </el-col>
        
        <el-col :span="6" style="margin-bottom:16px;">
          <el-form-item label="税额" label-width="40px" >
            <el-input type="text" size="mini"  :disabled="true" v-model="Number(allActualTicketTax).toFixed(2)" ></el-input>
          </el-form-item>
        </el-col>

      
    
           </el-row>
      </el-card>

       <el-row >
          <div style="display:flex;align-items:center;">
             <item-title text="签收单下商品明细"/>
             <el-form-item label-width="0px" >
               <el-button type="primary" size="mini"  @click="isShouDetails" :disabled="searchForm.invoiceNature==='CREDIT_NOTE'"    >选择签收单下商品明细</el-button>
              </el-form-item>
           </div> 
          <el-table
             size="mini"
             :border="true"
             :row-key="rowKey"
             :expand-row-keys="expandRowKeysArr"
             :data="searchForm.productBreakdown"
             style="width: 100%">
            <el-table-column type="expand" >
              <template slot-scope="props">
  <el-form
    label-position="left"
    inline
    class="demo-table-expand"
  >

    <el-form-item label="商品编码">
      <span>{{ props.row.skuCode }}</span>
    </el-form-item>

    <el-form-item label="商品名称">
      <el-input
        v-if="props.row.edit"
        size="mini"
        v-model="props.row.skuName"
      >
      </el-input>
      <span v-else>{{ props.row.skuName }}</span>
    </el-form-item>

    <el-form-item label="税务编码">
      <el-input
        v-if="props.row.edit"
        size="mini"
        @focus="selectTaxNoByWares(props.row.id)"
        v-model="props.row.taxCode"
      >
      </el-input>
      <span v-else>{{ props.row.taxCode }}</span>
    </el-form-item>

    <el-form-item label="规格型号">
      <el-input
        v-if="props.row.edit"
        size="mini"
        v-model="props.row.skuFormat"
      >
      </el-input>
      <span v-else>{{ props.row.skuFormat }}</span>
    </el-form-item>

    <el-form-item label="单位">
      <el-input
        v-if="props.row.edit"
        size="mini"
        v-model="props.row.skuUnitName"
      >
      </el-input>
      <span v-else>{{ props.row.skuUnitName }}</span>
    </el-form-item>

    <el-form-item label="本次开票数量">
      <el-input-number
        v-if="props.row.edit&&searchForm.invoiceNature==='CREDIT_NOTE'"
        size="mini"
        :max="props.row.invoicedQty"
        :min="0"
        @change="invoicedQtyChange(props.row)"
        v-model="props.row.invoicedQuantity"
      >
      </el-input-number>
      <span v-else>{{ props.row.invoicedQuantity }}</span>
    </el-form-item>

    <el-form-item label="可开票数量">
      <span>{{ props.row.invoicedQty }}</span>
    </el-form-item>

    <el-form-item label="单价">
      <span> {{ Number(props.row.skuPrice).toFixed(2) }} </span>
    </el-form-item>

    <el-form-item label="税率">
      <span>{{ Number(props.row.taxRate).toFixed(2) }}</span>
    </el-form-item>

    <el-form-item label="含税金额">
      <span>{{ Number(props.row.skuPrice*props.row.invoicedQuantity).toFixed(2) }}</span>
    </el-form-item>

    <el-form-item label="税额">
      <el-input
        v-if="props.row.edit"
        size="mini"
        v-model.Number="props.row.actualTicketTax"
      >
      </el-input>
      <span v-else> {{ Number(props.row.actualTicketTax).toFixed(2) }} </span>
    </el-form-item>

  </el-form>
</template>
            </el-table-column>
            <el-table-column
              label="序号"
              type="index">
            </el-table-column>

             <el-table-column
              label="商品编码"
              prop="skuCode">
            </el-table-column>

            <el-table-column
              label="商品名称"
              prop="skuName">
            </el-table-column>

            <el-table-column
              label="税务编码"
              prop="taxCode">
            </el-table-column>

            <el-table-column
              label="规格型号"
              prop="skuFormat">
            </el-table-column>

              <el-table-column
              label="可开票数量"
              prop="invoicedQty">
            </el-table-column>

            <el-table-column
              label="单价"
              prop="skuPrice">
            </el-table-column>

             <el-table-column
              label="单位"
              prop="skuUnitName">
            </el-table-column>



            <el-table-column
              label="操作">
              <template slot-scope="scope">
  <el-button
    v-if="scope.row.edit"
    type="success"
    @click="goeditrow(scope.$index,scope.row)"
    size="mini"
  >确定</el-button>
  <el-button
    v-else
    @click="goeditrow(scope.$index,scope.row)"
    size="mini"
  >编辑</el-button>
  <el-button
    size="mini"
    type="danger"
    @click="handleDelete(scope.$index, scope.row)"
  >删除</el-button>
</template>
            </el-table-column>
          </el-table>
          </el-form-item>
        </el-row>   
      </el-form>

       <el-dialog
          title="签收明细选择"
          :visible.sync="shouDetails"
          top="6vh"
          custom-class="shouDetailsDialog"
          width="70%"
          :before-close="handleClose">
            <el-row>
               <el-col :span="6" style="min-width:300px;margin-bottom:12px">
                  <span style="font-size:12px;color:#606266">签收单号 :</span>
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
           @SelectionChange="handleSelectionChange"
            :loading="alertLoding"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
          <span slot="footer" class="dialog-footer">
          <el-button  size="mini"  @click="shouDetails = false">取 消</el-button>
          <el-button  size="mini"   type="primary" @click="handleSuccess">确 定</el-button>
          </span>
       </el-dialog>


       <el-dialog
          title="税务编码选择"
          :visible.sync="shouTaxNoByWares"
          top="6vh"
          width="60%"
          custom-class="TaxNoByWaresDialog"
          :before-close="handleClose">
            <el-row>
              <el-form 
               :inline="true" 
               :model="taxNoByWaresIdSeach"  
               size="mini"
               label-width="60px" 
               label-position="left"  
               ref="taxNoByWaresIdSeach" >
              <el-col :span="6"  style="min-width:260px">
                <el-form-item label="税务编码">
                  <el-input v-model.lazy.trim="taxNoByWaresIdSeach.taxCode"  @keyup.enter.native="taxNoByWaresIdSeachSubmitForm()"  placeholder="请输入税务编码"></el-input>
                </el-form-item>
              </el-col>

               <el-col :span="6"  style="min-width:260px">
                <el-form-item label="税务分类">
                  <el-input v-model.lazy.trim="taxNoByWaresIdSeach.taxCategoryName"   @keyup.enter.native="taxNoByWaresIdSeachSubmitForm()"  placeholder="请输入税务分类"></el-input>
                </el-form-item>
              </el-col>

               <el-col :span="6"  style="min-width:260px">
                  <el-form-item>
                  <el-button type="primary" size="mini"  @click="taxNoByWaresIdSeachSubmitForm()">查询</el-button>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="mini" @click="taxNoByWaresIdSeachCancel()">重置</el-button>
                </el-form-item>
              </el-col>

              </el-form>
            </el-row>

            <base-table 
              @sizeChange="handleSizeChange"
              @currentChange="handleCurrentChange"
              :loading="taxNoByWaresLoading"
              :config="alertConfig"  
              :highlightCurrentRow="true"
              @currentRedioChange="currentRedioChange"
              :total="taxNoByWaresTotal" 
              :pageSize="taxNoByWaresIdSeach.pageSize"
              :currentPage="taxNoByWaresIdSeach.pageNum"
              :tableData="alertData"/>

          <span slot="footer" class="dialog-footer">
          <el-button size="mini"   @click="handleClose">取 消</el-button>
          <el-button size="mini" type="primary" @click="shouTaxNoByWaresSuccess">确 定</el-button>
          </span>
       </el-dialog>


    </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss">
.OutputinvoiceNewoutputinvoiceIndex {
  .codeNoStyle {
    float: left;
    color: #8492a6;
    font-size: 12px;
    width: 150px;
    &:last-child {
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

  .TaxNoByWaresDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
  .shouDetailsDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }

  .el-form-item {
    height: 30px;
    margin-bottom: 20px;
  }
}
</style>
