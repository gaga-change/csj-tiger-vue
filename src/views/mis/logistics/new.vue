<template lang="html">
<div class="app-container">
  <el-form :model="addForm" ref="addForm" label-width="120px">

    <item-title text="出库单信息" class="mt10" />
    <el-card shadow="hover">
      <el-row>
        <el-button type="primary" @click="unionOutStore" :disabled="Boolean($route.query.id)" size="mini">关联出库单</el-button>
      </el-row>
      <el-table
        :data="outTableData"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
        <el-table-column label="操作" v-if="!$route.query.id">
          <template slot-scope="scope">
              <a @click="delOutStore(scope.row)"  :style="linkstyle">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <item-title text="承运商信息" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商" prop="carrier" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.carrier" value-key="consoildatorCode"
              clearable  @change="consoildatorChange" placeholder="请选择" size="small" class="formitem">
              <el-option v-for="item in carrier" :label="item.consoildatorName" :key="item.consoildatorCode"  :value="item">
                <span style="float: left">{{ item.consoildatorName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.consoildatorCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送类型" prop="dispatchType" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.dispatchType" disabled  @change="handleDispatchTypeChange" clearable  placeholder="请选择配送类型" size="small" class="formitem">
              <el-option v-for="item in localEnum['dispatchType']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :md="8" :lg="8" :xl="6" v-show="addForm.carrier&&addForm.carrier.consoildatorCode">
          <el-form-item label="承运商编码" >
            <el-input :value="addForm.carrier&&addForm.carrier.consoildatorCode" class="formitem" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="结算方式" prop="settlementType" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.settlementType" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in  mapConfig['getSettlementType']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物流单号" prop="logisticsOrderCode" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input v-model="addForm.logisticsOrderCode" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="计费方式" prop="chargeType" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.chargeType" clearable  placeholder="请选择计费方式" size="small" class="formitem">
              <el-option v-for="item in  mapConfig['getChargeType']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="指定承运金额" prop="consoildatorAmt" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]" v-if="addForm.chargeType==1">
            <el-input type="number" step="0.01" v-model="addForm.consoildatorAmt" class="formitem" size="small" placeholder="请输入指定承运金额" @blur="addFormToFixed('consoildatorAmt')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="客户信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="客户名称" >
            <el-input v-model="addForm.customerName" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="地址" >
            <el-select  v-model="addForm.dispatchAddr" clearable @change="dispatchAddrChange"  :disabled="Boolean($route.query.id)" placeholder="请选择地址" size="small" class="formitem">
              <el-option v-for="item in addressData" :label="item.value" :key="item.key"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系人" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input v-model="addForm.customerContact" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系电话" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input v-model="addForm.customerTel" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="明细信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="费用计算区分" labelWidth="100px" prop="costCalcWay" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.costCalcWay" value-key="id" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in localEnum['costCalcWay']" :label="item.name" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="箱数" prop="boxQty"  :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model="addForm.boxQty" class="formitem" size="small" placeholder="请输入箱数" @blur="addFormToFixed('boxQty', 0)" >
              <span slot="suffix">箱</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积"  prop="skuVolume" :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" step="0.001" v-model="addForm.skuVolume" class="formitem" size="small" placeholder="请输入体积" @blur="addFormToFixed('skuVolume', 3)">
              <span slot="suffix">m³</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="单价"  prop="skuPrice" :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" step="0.01" v-model="addForm.skuPrice" class="formitem" size="small" placeholder="请输入单价" @blur="addFormToFixed('skuPrice')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量" prop="skuWeight" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" step="0.001"  v-model="addForm.skuWeight" class="formitem" size="small" placeholder="请输入重量" @blur="addFormToFixed('skuWeight', 3)">
              <span slot="suffix">kg</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="首重价格" prop="firstPrice" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" step="0.01" v-model="addForm.firstPrice" class="formitem" size="small" placeholder="请输入首重价格" @blur="addFormToFixed('firstPrice')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="续重单价" prop="continuePrice" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" step="0.01" v-model="addForm.continuePrice" class="formitem" size="small" placeholder="请输入续重单价" @blur="addFormToFixed('continuePrice')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="运费" prop="logisticsFare" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number"  step="0.01"  v-model="addForm.logisticsFare" class="formitem" size="small" placeholder="请输入运费" @blur="addFormToFixed('logisticsFare')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送费"  prop="dispatchCost" >
            <el-input type="number" step="0.01" v-model="addForm.dispatchCost" class="formitem" size="small" placeholder="请输入配送费" @blur="addFormToFixed('dispatchCost')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保价"   prop="insuredCost">
            <el-input type="number" step="0.01" v-model="addForm.insuredCost" class="formitem" size="small" placeholder="请输入保价" @blur="addFormToFixed('insuredCost')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保费" prop="logisticsPremium">
            <el-input type="number" step="0.01" v-model="addForm.logisticsPremium" class="formitem" size="small" placeholder="请输入保费" @blur="addFormToFixed('logisticsPremium')">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="车牌号" prop="licensePlateNo">
            <el-input type="text" v-model="addForm.licensePlateNo" class="formitem" size="small" placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出发公里数" prop="startKilometrage">
            <el-input type="number" step="0.001" v-model="addForm.startKilometrage" class="formitem" size="small" placeholder="请输入出发公里数" @blur="addFormToFixed('startKilometrage', 3)">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="返回公里数" prop="returnKilometrage">
            <el-input type="number" step="0.001" v-model="addForm.returnKilometrage" class="formitem" size="small" placeholder="请输入返回公里数" @blur="addFormToFixed('returnKilometrage',3)">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="过路费" prop="toll">
            <el-input type="number" step="0.01" v-model="addForm.toll" class="formitem" size="small" placeholder="请输入返回公里数" @blur="addFormToFixed('toll')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="油费" prop="oilCost">
            <el-input type="number" step="0.01" v-model="addForm.oilCost" class="formitem" size="small" placeholder="请输入返回公里数" @blur="addFormToFixed('oilCost')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="里程" prop="mileage">
            <el-input type="number" step="0.001" v-model="addForm.mileage" class="formitem" size="small" placeholder="请输入返回公里数" @blur="addFormToFixed('mileage', 3)">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="24" :lg="16" :xl="12">
          <el-form-item label="备注" prop="remarkInfo">
            <el-input  type="textarea" v-model="addForm.remarkInfo" style="maxWidth:400px"  :rows="1" placeholder="请输入备注">
            </el-input>
          </el-form-item>
        </el-col>

         <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="接货费"  prop="receptCost">
            <el-input type="number" step="0.01" v-model="addForm.receptCost" class="formitem" size="small" placeholder="请输入接货费" @blur="addFormToFixed('receptCost')">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="其他费用" prop="otherCost">
            <el-input type="number" step="0.01" v-model="addForm.otherCost" class="formitem" size="small" placeholder="请输入其他费用" @blur="addFormToFixed('otherCost')" >
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>

         <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="总运费" prop="totalCost">
            <div style="font-size: 14px;">
                {{totalCost}}元
            </div>
            <!-- <el-input type="text" v-model="totalCost" readonly="readonly" class="formitem" size="small" placeholder="请输入总运费 ">
              <span slot="suffix">元</span>
            </el-input> -->
          </el-form-item>
        </el-col>

      </el-row>
    </el-card>

    <el-row class="mt20 mb30">
      <el-button
        type="primary"
        @click="onSubmit"
        v-loading="submitloading"
        :disabled="submitloading"
        >提交</el-button
      >
      <el-button @click="onCancel">取消</el-button>
    </el-row>
  </el-form>

  <el-dialog :visible.sync="outStoreVisible" width="80%">
    <outstore ref="outStore" @selectionChange="outStoreSelectionChange"></outstore>
    <span slot="footer" class="dialog-footer">
      <el-button @click="outStoreVisible = false">取 消</el-button>
      <el-button type="primary" @click="outStoreSure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import * as localEnum from '@/utils/enum'
import {
  consoilInfoList
} from '@/api/carrier'
import {
  getCustomerList,
  customerAddressList,
  createNewLogistics,
  queryLogisticsDetail,
  updateLogisticsInfo,
  updateLogisticsDetailInfo
} from '@/api/mis'
import outstore from './components/outstore'
export default {
  components: {
    outstore
  },
  data() {
    return {
      addForm: {
        costCalcWay: 1
      },
      carrier: [],
      submitloading: false,
      columns: [{
        label: '业务单号',
        prop: 'bussinessNo'
      },
      {
        label: '外部订单号',
        prop: 'outBusiBillNo'
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
      outTableData: [],
      multipleData: [],
      linkstyle: {
        color: '#3399ea',
        whiteSpace: 'nowrap',
        margin: '0 10px 0 0'
      },
      outStoreVisible: false,
      localEnum,
      addressData: []
    }
  },


  computed: {
    isEdit() {
      return Boolean(this.$route.query.id)
    },

    totalCost: {
      get: function () {
        let data = 0;
        ['dispatchCost', 'logisticsPremium', 'insuredCost','toll', 'oilCost', 'receptCost', 'otherCost'].forEach(v => {
          data += Number(this.addForm[v]) || 0
        })
        data += Number(this.addForm.logisticsFare) || 0
        return Number(data).toFixed(2);
      },
      set: function (val) {
        this.$set(this.addForm, 'totalCost', val)
      }
    },
    logisticsFare() {
      let data = 0;
      let { skuWeight, continuePrice, firstPrice, skuPrice } = this.addForm
      skuWeight = Number(skuWeight) || 0
      continuePrice = Number(continuePrice) || 0
      firstPrice = Number(firstPrice) || 0
      skuPrice = Number(skuPrice) || 0

      if (this.addForm.costCalcWay === 1) {//按照体积计算
        data = this.addForm.skuVolume * this.addForm.skuPrice || 0   //体积*单价
      } else if (this.addForm.costCalcWay === 2) {//按照重量计算
        if (this.addForm.dispatchType === 1) {//快递
          if (skuWeight >= 20 && !(this.addForm.carrier.consoildatorName.indexOf('百世') !== -1 || this.addForm.carrier.consoildatorName.indexOf('顺丰') !== -1)) {
            data = skuWeight * continuePrice || 0  //重量*续重价格
          } else {
            data = (skuWeight - 1) * continuePrice + firstPrice || 0 //（重量-1）*续重+首重
          }
        } else if (this.addForm.dispatchType === 2) {//物流
          data = skuWeight * skuPrice || 0  //重量*单价
        }
      }
      return Number(data).toFixed(2);
    },
    arrivalAddress: {
      get: function () {
        return this.outTableData[0] && this.outTableData[0].arrivalAddress
      },
      set: function (val) {
        this.addForm.arrivalAddress = val
      }
    },
    ...mapGetters(['mapConfig', 'visitedViews'])
  },

  watch: {
    logisticsFare(newVal, oldVal) {
      this.$set(this.addForm, 'logisticsFare', newVal)
    }
  },

  created() {
    this.getConsoilInfoList()
    if (this.isEdit) {
      this.getDetail()
    }
  },

  methods: {
    addFormToFixed(key, num) {
      if (!this.addForm[key]) return
      if (num === undefined) num = 2
      this.$set(this.addForm, key, Number(this.addForm[key]).toFixed(num))
    },
    getDetail() {
      queryLogisticsDetail(this.$route.query.id).then(res => {
        const { relationList, consoildatorName, consoildatorCode, ...rest } = res.data
        this.addForm = { carrier: { consoildatorName, consoildatorCode }, ...rest }
        this.outTableData = relationList;
      }).catch(err => {
      })
    },

    dispatchAddrChange(value) {
      let index = this.addressData.findIndex(v => v.value === value);
      this.$set(this.addForm, 'customerTel', this.addressData[index]['receiverTel']);
      this.$set(this.addForm, 'customerContact', this.addressData[index]['receiverName']);
    },

    consoildatorChange(val) {
      this.addForm.dispatchType = val.dispatchType;
      if (val.dispatchType === 1) {
        this.addForm.costCalcWay = 2;
      } else if (val.dispatchType === 2) {
        this.addForm.costCalcWay = 1;
      }
    },

    //未知功能的函数
    handleDispatchTypeChange(val) {
      if (val === 1) {
        this.$set(this.addForm, 'costCalcWay', 2)
      }
      if (val === 2) {
        this.$set(this.addForm, 'costCalcWay', 1)
      }
    },


    getConsoilInfoList() {
      consoilInfoList({
        consoildatorState: '31,30',
        pageSize: 9999,
        pageNum: 1
      }).then(res => {
        this.carrier = res.data && res.data.list
      }).catch(err => {
      })
    },

    outStoreSelectionChange(val) {
      this.multipleData = val
    },

    outStoreSure() {
      this.outTableData = this.multipleData.map(item => {
        const newitem = {
          outWarehouseId: item.id,
          bussinessNo: item.billNo,
          outBussinessNo: item.busiBillNo,
          outWarehouseNo: item.warehouseExeCode,
          customerName: item.arrivalName,
          customerCode: item.arrivalCode,
          cargoOwner: item.ownerName,
          arrivalAddress: item.arrivalAddress,
          customerContact: item.customerContact,
          customerTel: item.customerTel
        }
        return newitem
      })
      this.addressData = []
      this.$set(this.addForm, 'customerName', this.outTableData[0].customerName)
      this.$set(this.addForm, 'customerCode', this.outTableData[0].customerCode)
      this.$set(this.addForm, 'dispatchAddr', this.outTableData[0].arrivalAddress)

      this.getCustomerAddressList({
        basicCustomerInfoCode: this.outTableData[0].customerCode
      })

      this.outStoreVisible = false
    },

    getCustomerAddressList(params) {
      customerAddressList(params)
        .then(res => {
          const result = res.data
          result.forEach((item, index) => {
            item.area = item.customerProvince + item.customerCity + item.customerArea
            const address = {
              key: index,
              value: item.area + item.customerAddress,
              receiverName: item.receiverName,
              receiverTel: item.receiverTel
            }
            this.$set(this.addressData, index, address)
            this.$set(this.addForm, 'customerTel', address.receiverTel)
            this.$set(this.addForm, 'customerContact', address.receiverName)
          })
        }).catch(err => {
        })
    },

    delOutStore(row) {
      this.outTableData = this.outTableData.filter(item => item !== row)
      if (this.outTableData.length === 0) {
        this.addressData.length = 0
        this.$set(this.addForm, 'customerName', null)
        this.$set(this.addForm, 'customerCode', null)
        this.$set(this.addForm, 'dispatchAddr', null)
        this.$set(this.addForm, 'customerTel', null)
        this.$set(this.addForm, 'customerContact', null)
      }
    },

    onSubmit() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.submitloading = true
          const {
            carrier,
            ...rest
          } = this.addForm
          const postData = {
            consoildatorCode: carrier.consoildatorCode,
            consoildatorName: carrier.consoildatorName,
            // logisticsFare: this.logisticsFare,
            totalCost: this.totalCost,
            ...rest
          }
          postData.relationList = this.outTableData
          let FUNCTION = createNewLogistics
          if (postData.id) {
            if (postData.invoiceState === 2) {
              // 部分修改
              FUNCTION = updateLogisticsDetailInfo
            } else if (postData.invoiceState === 1 || postData.invoiceState === 3) {
              FUNCTION = updateLogisticsInfo
            }
          }
          FUNCTION(postData).then(res => {
            this.submitloading = false
            if (res.success) {
              const view = this.visitedViews.filter(v => v.path === this.$route.path)
              this.$alert('操作成功').then(() => {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({ name: 'logisticsList' })
                })
              })
            }
          }).catch(err => {
            this.submitloading = false
          })
        }
      })
    },
    onCancel() {

    },
    unionOutStore() {
      this.outStoreVisible = true
      this.$nextTick(() => {
        this.$refs.outStore.fetchData()
      })
    }
  }
}
</script>

<style lang="css">
</style>
