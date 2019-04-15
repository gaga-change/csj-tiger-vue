<template lang="html">
<div class="app-container">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
          <el-button type="primary" @click="onSubmit" v-loading="submitloading" :disabled="submitloading">保存</el-button>
      </template>
    </sticky>
  <el-form :model="productForm" ref="productForm" labelWidth="100px">
    <item-title text="商品明细" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="货主：" prop="owner" :rules="[{required: true, message:'必填项'}]">
            <el-select  v-model="productForm.owner" clearable @change="ownerChange"  placeholder="请选择货主" size="small" class="formitem">
              <el-option v-for="item in mapConfig['ownerInfoMap']" :label="item.value" :key="item.key"  :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="货主商品编码："labelWidth="110px"  prop="ownerSkuCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.ownerSkuCode" placeholder="请输入货主商品编码" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品分类：" prop="categoryCode"  :rules="[{required: true,trigger: 'blur', message:'必填(菜单必须选择到三级)'}]">
            <choice-category @categorySubmit="categorySubmit"  ref="categoryChoice" :disabled="editable"></choice-category>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="editable">
          <el-form-item label="商品编码：" prop="skuCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuCode" placeholder="请输入商品编码" size="small" class="formitem" :disabled="editable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品名称：" prop="skuName" :rules="[{required: true, message:'必填项'},{max:30, message:'最长30位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuName" placeholder="请输入商品名称" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品简称：" prop="skuShortName" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuShortName" placeholder="请输入商品简称" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品描述：" prop="skuDesc" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuDesc" placeholder="请输入商品描述" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="包装单位：" prop="packUnitName" :rules="[{required: true, message:'必填项'}]">
            <el-input v-model="productForm.packUnitName" placeholder="请输入商品包装单位" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="采用开始日：" prop="useDate" :rules="[{required: true, message:'必填项', trigger: 'change'}]">
            <el-date-picker
              v-model="productForm.useDate"
              size="small"
              class="formitem"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="品牌：" prop="brandName" :rules="[{required: true, message:'必填项', trigger: 'change'},{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.brandName" placeholder="请输入品牌" size="small" class="formitem" :disabled="editable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="规格：" prop="skuFormat" :rules="[{required: true, message:'必填项', trigger: 'change'},{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuFormat" placeholder="请输入规格" size="small" class="formitem" :disabled="editable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="型号：" prop="skuModel" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.skuModel" placeholder="请输入型号" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品状态：" prop="materialState">
            <el-select  v-model="productForm.materialState" clearable  placeholder="请选择商品状态" size="small" class="formitem">
              <el-option v-for="item in productEnum['materialState']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeTab" type="card" class="mt20">
      <el-tab-pane label="基本信息" name="first">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="订货区分：" prop="orderType">
              <el-select  v-model="productForm.orderType" clearable  placeholder="请选择订货区分" size="small" class="formitem">
                <el-option v-for="item in productEnum['orderType']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品管理区分：" prop="mangerType">
              <el-select  v-model="productForm.mangerType" clearable  placeholder="请选择商品管理" size="small" class="formitem">
                <el-option v-for="item in productEnum['mangerType']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="基准结算价："  prop="baseSettlementPrice" :rules="[{required: true, message:'必填项', trigger: 'change'}]">
              <el-input type="number" v-model.number="productForm.baseSettlementPrice" class="formitem" size="small" placeholder="请输入基准结算价">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="销售区分：" prop="saleType">
              <el-select  v-model="productForm.saleType" clearable  placeholder="请选择销售区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getSaleType']||[]" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="进项税率：" >
              <el-input type="number" v-model.number="productForm.incomeTaxRate" class="formitem" size="small" placeholder="请输入进项税率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="销项税率：" >
              <el-input type="number" v-model.number="productForm.outputTaxRate" class="formitem" size="small" placeholder="请输入销项税率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品标签区分：" prop="skuTag">
              <el-input type="text" v-model="productForm.skuTag" class="formitem" size="small" placeholder="请输入商品标签">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="期望毛利率：" >
              <el-input type="number" v-model.number="productForm.expectGrossProfit" class="formitem" size="small" placeholder="请输入期望毛利率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="尺寸单位区分：" prop="sizeUnitName">
              <el-select  v-model="productForm.sizeUnitName" clearable  placeholder="请选择尺寸单位" size="small" class="formitem">
                <el-option v-for="item in productEnum['sizeUnitName']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="重量：" >
              <el-input type="number" v-model.number="productForm.skuWeight" class="formitem" size="small" placeholder="请输入重量">
                <span slot="suffix">kg</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="保质期区分：" prop="shelfLifeUnitName">
              <el-select  v-model="productForm.shelfLifeUnitName" clearable  placeholder="请选择保质期区分" size="small" class="formitem">
                <el-option v-for="item in productEnum['shelfLifeUnitName']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="安全库存系数：" >
              <el-input type="number" v-model.number="productForm.safeStockFactor" class="formitem" size="small" placeholder="请输入安全库存系数">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="长：" >
              <el-input type="number" v-model.number="productForm.skuLength" class="formitem" size="small" placeholder="请输入长度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="体积：" >
              <el-input type="number" v-model.number="productForm.skuVolume" class="formitem" size="small" placeholder="请输入体积">
                <span slot="suffix">m³</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="保质期：" >
              <el-input type="number" v-model.number="productForm.shelfLife" class="formitem" size="small" placeholder="请输入保质期">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="目标周转日数：" >
              <el-input type="number" v-model.number="productForm.tagerTurnoverDays" class="formitem" size="small" placeholder="请输入周转日数">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="宽：" >
              <el-input type="number" v-model.number="productForm.skuBreadth" class="formitem" size="small" placeholder="请输入宽度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="等级：" >
              <el-input type="text" v-model="productForm.skuLevel" class="formitem" size="small" placeholder="请输入等级">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="退货区分：" prop="skuReturnType">
              <el-select  v-model="productForm.skuReturnType" clearable  placeholder="请选择退货区分" size="small" class="formitem">
                <el-option v-for="item in productEnum['skuReturnType']"  :label="item.name" :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="最大在库数量：" >
              <el-input type="number" v-model.number="productForm.maxStockQty" class="formitem" size="small" placeholder="请输入最大在库数量">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="高：" >
              <el-input type="number" v-model.number="productForm.skuHeight" class="formitem" size="small" placeholder="请输入高度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="产地：" >
              <el-input type="text" v-model="productForm.productFactory" class="formitem" size="small" placeholder="请输入产地">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="在库区分：" prop="skuStockType">
              <el-input type="text" v-model="productForm.skuStockType" class="formitem" size="small" placeholder="请输入在库区分">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="备注：" prop="remarkInfo">
              <el-input type="text" v-model="productForm.remarkInfo" class="formitem" size="small" placeholder="请输入产地">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="客户信息" name="second">
        <search
          :config="customerConfig"
          :justify="'end'"
          :confirmText="confirmText"
          :labelWidth="100"
          :formData="customerEditData"
          :showResetButton="false"
          ref="customerForm"
          @submitForm="submitCustomerForm"></search>
        <el-table
           size="small"
           style="margin-top:16px"
          :data="customerTableData"
          border>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column v-for="(column, index) in customerConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
            <template slot-scope="scope">
              <span v-if="column.type === 'date' &&　scope.row[column.prop]">{{scope.row[column.prop] | parseTime}}</span>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <span>
                <a :style="linkstyle" @click="delRow(scope.row)">删除</a>
                <a :style="linkstyle" @click="editRow(scope.row)">修改</a>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="供应商信息" name="third">
        <search
          :config="servicerConfig"
          :justify="'end'"
          :confirmText="servicerConfirmText"
          :labelWidth="100"
          :formData="servicerEditData"
          :showResetButton="false"
          ref="servicerForm"
          @submitForm="submitServicerForm"></search>
        <el-table
           size="small"
           style="margin-top:16px"
          :data="servicerTableData"
          border>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column v-for="(column, index) in servicerConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
            <template slot-scope="scope">
              <span v-if="column.type === 'date' &&　scope.row[column.prop]">{{scope.row[column.prop] | parseTime}}</span>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <a :style="linkstyle" @click="delServicerRow(scope.row)">删除</a>
              <a :style="linkstyle" @click="editServicerRow(scope.row)">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from '@/components/Search'
import choiceCategory from './components/choiceCategory'
import * as productEnum from './components/productEnum'
import { customerConfig, servicerConfig } from './components/config'
import Sticky from '@/components/Sticky'
import { addProduct, updateProduct, productDetail } from '@/api/productcenter'
import { getOwnerCustList, getOwnerProviderList } from '@/api/mis'
import { findValue } from '@/utils'
import _  from 'lodash';
export default {
  components: { search, choiceCategory,Sticky },
  data() {
    return {
      productForm: {},
      activeTab: 'first',
      customerConfig,
      servicerConfig,
      customerEditData: {},
      customerTableData: [],
      servicerEditData: {},
      servicerTableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      confirmText: '添加',
      servicerConfirmText: '添加',
      submitloading: false,
      productEnum,
      customerList: []
    }
  },
  computed: {
    editable() {
      return Boolean(this.$route.query.skuCode)
    },
    ...mapGetters(['mapConfig', 'userInfo', 'visitedViews'])
  },
  created() {
    if (this.$route.query.skuCode) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      const loading = this.$loading({text: '请稍后..'})
      productDetail({ skuCode: this.$route.query.skuCode }).then(res => {
        const result = res.data || {}
        const { skuCustomerInfoRespList, skuProviderInfoRespList, ownerCode, ownerName, ...rest } = result
        this.customerTableData = skuCustomerInfoRespList
        this.servicerTableData = skuProviderInfoRespList
        this.productForm = { owner: { key: ownerCode, value: ownerName }, ...rest}
        this.$refs.categoryChoice.fetchCategory({ text: result.categoryName, currentCode: result.categoryCode })
        this.ownerChange({ key: ownerCode, value: ownerName })
        loading.close()
      }).catch(err => {
        console.log(err)
        loading.close()
      })
    },
    ownerChange(val) {
      const ownerobj = val || {}
      getOwnerCustList({ownerCode: ownerobj.key}).then(res => {
        let customerEditData=_.cloneDeep(this.customerEditData);
        customerEditData.customerCode='';
        this.customerEditData=customerEditData;
        const result = res.data || []
        const options = []
        result.forEach(item => options.push({ value: item.customerName, key: item.customerCode}))
        this.customerConfig.forEach(v=>{
          if(['customerCode','customerName'].includes(v.prop)){
            v.selectOptions=options
          }
        })
        this.$refs['customerForm'].loadData()
      })
      getOwnerProviderList({ownerCode: ownerobj.key}).then(res => {
        let servicerEditData=_.cloneDeep(this.servicerEditData);
        servicerEditData.providerCode='';
        this.servicerEditData=servicerEditData;

        const result = res.data || []
        const options = []
        result.forEach(item => options.push({ value: item.providerName, key: item.providerCode}))
        this.servicerConfig.find(customer => customer.prop === 'providerCode').selectOptions = options
        this.$refs['servicerForm'].loadData()
      })
    },
    categorySubmit(item) {
      this.productForm.categoryCode = item.currentCode
      this.productForm.categoryName = item.text
      this.$refs['productForm'].clearValidate(['categoryCode'])
    },
    onSubmit() {

       this.$refs['customerForm'].$refs['tcfForm'].clearValidate(['customerCode'])
       this.$refs['servicerForm'].$refs['tcfForm'].clearValidate(['providerCode'])

       this.$refs['productForm'].validate((valid) => {
        if (valid) {
          this.submitloading = true
          const { skuCode, owner, ...rest } = this.productForm
          const postForm = {
            ownerCode: owner.key,
            ownerName: owner.value,
            operator: this.userInfo.id,
            operatorName: this.userInfo.truename,
            skuCustomerReqList: this.customerTableData,
            skuProviderInfoReqList: this.servicerTableData,
            ...rest
          }
          const editMethod = skuCode ? updateProduct : addProduct
          if (skuCode) {
            postForm.skuCode = skuCode
          }
          editMethod(postForm).then(res => {
            console.log(res)
            this.submitloading = false
            if (res.success) {
              const view = this.visitedViews.filter(v => v.path === this.$route.path)
              this.$alert('操作成功').then(()=> {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({name: 'productsList'})
                })
              })
            }
          }).catch(err => {
            console.log(err)
            this.submitloading = false
          })
        }
      })
    },
    submitCustomerForm(val) {
      val=JSON.parse(JSON.stringify(val));
      const customers = this.customerConfig.find(customer => customer.prop === 'customerCode').selectOptions
      val.customerName = customers.find(customer => customer.key === val.customerCode).value
      if (val.edit) {
        let position = -1
        this.customerTableData.forEach((item, index) => {
          if(item.edit) position = index
        })
        console.log(position);
        this.customerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.$refs.customerForm.resetForm()
        this.confirmText = '添加'
      } else {
        this.customerTableData.push(JSON.parse(JSON.stringify(val)))
      }
      this.customerEditData={};
      this.$refs['customerForm'].$refs['tcfForm'].resetFields()
    },

    submitServicerForm(val) {
      console.log(val)
      const providers = this.servicerConfig.find(provider => provider.prop === 'providerCode').selectOptions
      val.providerName = providers.find(provider => provider.key === val.providerCode).value
      if (val.edit) {
        let position = -1
        this.servicerTableData.forEach((item, index) => {
          if(item.edit) position = index
        })
        console.log(position);
        this.servicerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.$refs.servicerForm.resetForm()
        this.servicerConfirmText = '添加'
      } else {
        this.servicerTableData.push(JSON.parse(JSON.stringify(val)))
      }
      this.$refs['servicerForm'].$refs['tcfForm'].resetFields()
    },

    delRow(row) {
      console.log(row);
      this.customerTableData = this.customerTableData.filter(item => item !== row)
    },
    editRow(row) {
      row.edit = true
      this.confirmText = '确定修改'
      this.customerEditData = row
      this.$refs.customerForm.loadData()
    },
    delServicerRow(row) {
      console.log(row);
      this.servicerTableData = this.servicerTableData.filter(item => item !== row)
    },
    editServicerRow(row) {
      row.edit = true
      this.servicerConfirmText = '确定修改'
      this.servicerEditData = row
      this.$refs.servicerForm.loadData()
    }
  }
}
</script>

<style lang="css">
</style>
