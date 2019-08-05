<template lang="html">
  <div class="app-container">
    <el-form :model="productForm" labelWidth="100px" class="formb0">
      <el-card shadow="hover">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主：" >
              <span>{{productForm.ownerName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主商品编码：" prop="ownerSkuCode">
              <span>{{productForm.ownerSkuCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品分类：" prop="categoryCode">
              <span>{{productForm.categoryName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="商品编码：" prop="skuCode">
              <span>{{productForm.skuCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="skuName">
              <span>{{productForm.skuName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品简称：" prop="skuShortName">
              <span>{{productForm.skuShortName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品描述：" prop="skuDesc">
              <span>{{productForm.skuDesc}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="包装单位：" prop="packUnitName">
              <span>{{productForm.packUnitName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="采用开始日：" prop="useDate" >
              <span>{{ productForm.useDate?this.moment(productForm.useDate).format('YYYY-MM-DD HH:mm:ss'):null }}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="品牌：" prop="brandName" >
              <span>{{productForm.brandName}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="规格：" prop="skuFormat">
              <span>{{productForm.skuFormat}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="型号：" prop="skuModel">
              <span>{{productForm.skuModel}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="物料状态：" prop="materialState">
              <span>{{productForm.materialState}}</span>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="基准结算价："  prop="baseSettlementPrice">
              <span>{{productForm.baseSettlementPrice}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <item-title class="mt20" text="基本信息"></item-title>
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="订货区分：" prop="orderType">
            <span>{{productForm.orderType}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品管理区分：" prop="mangerType">
            <span>{{productForm.mangerType}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="销售区分：" prop="saleType">
            <span>{{productForm.saleType|apiEnum(mapConfig, 'getSaleType')}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="进项税率：" >
            <span>{{productForm.incomeTaxRate}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="销项税率：" >
            <span>{{productForm.outputTaxRate}}%</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品标签区分：" prop="skuTag">
            <span>{{productForm.skuTag}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="期望毛利率：" >
            <span>{{productForm.expectGrossProfit}}%</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="尺寸单位区分：" prop="sizeUnitName">
            <span>{{productForm.sizeUnitName}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量：" >
            <span>{{productForm.skuWeight}}kg</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保质期区分：" prop="shelfLifeUnitName">
            <span>{{productForm.shelfLifeUnitName}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="安全库存系数：" >
            <span>{{productForm.safeStockFactor}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="长：" >
            <span>{{productForm.skuLength}}m</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积：" >
            <span>{{productForm.skuVolume}}m³</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保质期：" >
            <span>{{productForm.shelfLife}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="目标周转日数：" >
            <span>{{productForm.tagerTurnoverDays}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="宽：" >
            <span>{{productForm.skuBreadth}}m</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="等级：" >
            <span>{{productForm.skuLevel}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="退货区分：" prop="skuReturnType">
            <span>{{productForm.skuReturnType}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="最大在库数量：" >
            <span>{{productForm.maxStockQty}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="高：" >
            <span>{{productForm.skuHeight}}m</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="产地：" >
            <span>{{productForm.productFactory}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="在库区分：" prop="skuStockType">
            <span>{{productForm.skuStockType}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="备注：" prop="remarkInfo">
            <span>{{productForm.remarkInfo}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <item-title class="mt20" text="客户信息"></item-title>
      <el-table
        :data="productForm.skuCustomerInfoRespList"
        :loading="loading"
        border>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column v-for="(column, index) in customerConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
          <template slot-scope="scope">
            <span v-if="column.type === 'date'">{{scope.row[column.prop] | parseTime}}</span>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>

      <item-title class="mt20" text="供应商信息"></item-title>
      <el-table
        :data="productForm.skuProviderInfoRespList"
        :loading="loading"
        border>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column v-for="(column, index) in servicerConfig" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
          <template slot-scope="scope">
            <span v-if="column.type === 'date'">{{scope.row[column.prop] | parseTime}}</span>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-form>
  </div>
</template>

<script>
import { customerConfig, servicerConfig } from './components/config'
import { productDetail } from '@/api/productcenter'
import moment from 'moment';
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  data() {
    return {
      customerConfig: _.cloneDeep(customerConfig),
      servicerConfig: _.cloneDeep(servicerConfig),
      loading: false,
      productForm: {}
    }
  },
  computed: {
    ...mapGetters({
       mapConfig: 'mapConfig'
    })
  },
  created() {
    this.customerConfig.find(v=>v.label==='客户').prop='customerName'
    this.servicerConfig.find(v=>v.label==='供应商').prop='providerName'
    this.getDetail()
  },
  methods: {
    moment,
    getDetail() {
      this.loading = true
      productDetail({ skuCode: this.$route.query.skuCode, ownerCode: this.$route.query.ownerCode }).then(res => {
        this.productForm = res.data
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="css">
</style>
