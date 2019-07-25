<template lang="html">
<div class="app-container">
  <el-form :model="addForm" ref="addForm" label-width="80px" class="formb0">
    <item-title text="承运商信息" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送类型" prop="dispatchType">
            <span>{{addForm.dispatchType|localEnum('dispatchType')}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商名称" >
            <span>{{addForm.consoildatorName}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商编码" >
            <span>{{addForm.consoildatorCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="结算方式" prop="settlementType" >
            <span>{{addForm.settlementType|localEnum('settlementType')}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物流单号" prop="logisticsOrderCode" >
            <span>{{addForm.logisticsOrderCode}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="出库单信息" class="mt10" />
    <el-card shadow="hover">
      <el-table
        :data="addForm.relationList"
        max-height="500"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
      </el-table>
    </el-card>

    <item-title text="客户信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="客户名称" >
            <span>{{addForm.customerName}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="地址" >
            <span>{{addForm.dispatchAddr}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系人">
            <span>{{addForm.customerContact}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系电话" >
            <span>{{addForm.customerTel}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="明细信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="费用计算区分" labelWidth="100px" >
            <span>{{addForm.costCalcWay|localEnum('costCalcWay')}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="箱数" >
            <span>{{addForm.boxQty}}箱</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积">
            <span>{{addForm.skuVolume}}m³</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="单价">
            <span>{{addForm.skuPrice}}元</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量" >
            <span>{{addForm.skuWeight}}kg</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="首重价格">
            <span>{{addForm.firstPrice}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="续重单价">
            <span>{{addForm.continuePrice}}元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="运费">
            <span>{{addForm.logisticsFare}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送费" >
            <span>{{addForm.dispatchCost}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保价" >
            <span>{{addForm.insuredCost}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保费" >
            <span>{{addForm.logisticsPremium}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="车牌号" >
            <span>{{addForm.licensePlateNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出发公里数" >
            <span>{{addForm.startKilometrage}}km</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="返回公里数" >
            <span>{{addForm.returnKilometrage}}km</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="过路费" >
            <span>{{addForm.toll}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="油费" >
            <span>{{addForm.oilCost}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="里程" >
            <span>{{addForm.mileage}}km</span>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="24" :lg="16" :xl="12">
          <el-form-item label="备注" >
            <span>{{addForm.remarkInfo}}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="接货费" >
            <span>{{addForm.receptCost}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="其他费用" >
            <span>{{addForm.otherCost}}元</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="总运费" >
            <span>{{addForm.totalCost}}元</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import {
  queryLogisticsDetail
} from '@/api/mis'
export default {
  data() {
    return {
      addForm: {},
      columns: [{
          label: '业务单号',
          prop: 'bussinessNo'
        },
        {
          label: '出库单号',
          prop: 'outWarehouseNo'
        },
        {
          label: '货主',
          prop: 'cargoOwner'
        },
        {
          label: '客户名称',
          prop: 'customerName'
        }
      ],
      outTableData: []
    }
  },
  computed: {
    ...mapGetters(['mapConfig', 'visitedViews'])
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      queryLogisticsDetail(this.$route.query.id).then(res => {
        this.addForm = res.data
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
