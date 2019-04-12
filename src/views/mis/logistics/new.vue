<template lang="html">
<div class="app-container">
  <el-form :model="addForm" ref="addForm" label-width="80px">
    <item-title text="承运商信息" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送类型" prop="dispatchType" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.dispatchType" @change="handleDispatchTypeChange" clearable  placeholder="请选择配送类型" size="small" class="formitem">
              <el-option v-for="item in localEnum['dispatchType']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商" prop="carrier" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.carrier" value-key="consoildatorCode" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in carrier" :label="item.consoildatorName" :key="item.consoildatorCode"  :value="item">
                <span style="float: left">{{ item.consoildatorName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.consoildatorCode }}</span>
              </el-option>
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
              <el-option v-for="item in localEnum['settlementType']" :label="item.name" :key="item.value"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物流单号" prop="logisticsOrderCode" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input v-model="addForm.logisticsOrderCode" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="出库单信息" class="mt10" />
    <el-card shadow="hover">
      <el-row>
        <el-button type="primary" @click="unionOutStore" size="mini">关联出库单</el-button>
      </el-row>
      <el-table
        :data="outTableData"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              @click="delOutStore(scope.row)"
              :style="linkstyle"
            >
              删除
            </a>
          </template>
        </el-table-column>
      </el-table>
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
            <el-select  v-model="addForm.dispatchAddr" clearable  placeholder="请选择地址" size="small" class="formitem">
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
          <el-form-item label="费用计算区分" labelWidth="100px" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-select  v-model="addForm.costCalcWay" value-key="id" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in localEnum['costCalcWay']" :label="item.name" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="箱数" :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.boxQty" class="formitem" size="small" placeholder="请输入箱数">
              <span slot="suffix">箱</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积"  :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.skuVolume" class="formitem" size="small" placeholder="请输入体积">
              <span slot="suffix">m³</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="单价"  :rules="[{ required: addForm.costCalcWay === 1, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.skuPrice" class="formitem" size="small" placeholder="请输入体积">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.skuWeight" class="formitem" size="small" placeholder="请输入重量">
              <span slot="suffix">kg</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="首重价格" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.firstPrice" class="formitem" size="small" placeholder="请输入首重价格">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="续重单价" :rules="[{ required: addForm.costCalcWay === 2, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="addForm.continuePrice" class="formitem" size="small" placeholder="请输入续重单价">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="运费" :rules="[{ required: true, message: '必填项', trigger: ['blur', 'change'] }]">
            <el-input type="number" v-model.number="logisticsFare" class="formitem" size="small" placeholder="请输入运费">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送费" >
            <el-input type="number" v-model.number="addForm.dispatchCost" class="formitem" size="small" placeholder="请输入配送费">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保价" >
            <el-input type="number" v-model.number="addForm.insuredCost" class="formitem" size="small" placeholder="请输入保价">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保费" >
            <el-input type="number" v-model.number="addForm.logisticsPremium" class="formitem" size="small" placeholder="请输入保费">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="车牌号" >
            <el-input type="text" v-model="addForm.licensePlateNo" class="formitem" size="small" placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出发公里数" >
            <el-input type="number" v-model.number="addForm.startKilometrage" class="formitem" size="small" placeholder="请输入出发公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="返回公里数" >
            <el-input type="number" v-model.number="addForm.returnKilometrage" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="过路费" >
            <el-input type="number" v-model.number="addForm.toll" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="油费" >
            <el-input type="number" v-model.number="addForm.oilCost" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="里程" >
            <el-input type="number" v-model.number="addForm.mileage" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="24" :lg="16" :xl="12">
          <el-form-item label="备注" >
            <el-input  type="textarea" v-model="addForm.remarkInfo" :rows="1" placeholder="请输入备注">
            </el-input>
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
    logisticsFare: {
      get: function() {
        // 如果按公式计算
        if (this.addForm.logisticsFare) {
          return this.addForm.logisticsFare
        } else {
          // 快递运费计算规则：重量大于等于20KG：重量*续重；重量小于20KG：（重量-1）*续重+首重
          // 物流运费计算规则：体积或者重量*单价
          if (this.addForm.costCalcWay === 1) {
            return this.addForm.skuVolume * this.addForm.skuPrice || 0
          } else if (this.addForm.costCalcWay === 2) {
            if (this.addForm.dispatchType === 1) {
              if (this.addForm.skuWeight > 20) {
                return this.addForm.skuWeight * this.addForm.continuePrice || 0
              } else {
                return (this.addForm.skuWeight -1) * this.addForm.continuePrice + this.addForm.firstPrice || 0
              }
            } else if (this.addForm.dispatchType === 2) {
              return this.addForm.skuWeight * this.addForm.skuPrice || 0
            }
          }
        }
      },
      set: function(val) {
        this.$set(this.addForm, 'logisticsFare', val)
      }
    },
    arrivalAddress: {
      get: function() {
        return this.outTableData[0] && this.outTableData[0].arrivalAddress
      },
      set: function(val) {
        this.addForm.arrivalAddress = val
      }
    },
    ...mapGetters(['mapConfig', 'visitedViews'])
  },
  created() {
    this.getConsoilInfoList()
    if (this.isEdit) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      queryLogisticsDetail(this.$route.query.id).then(res => {
        const { relationList, consoildatorName, consoildatorCode, ...rest } = res.data
        this.addForm = { carrier: { consoildatorName, consoildatorCode }, ...rest}
        this.outTableData = relationList
      }).catch(err => {
        console.log(err)
      })
    },
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
        consoildatorState: 31
      }).then(res => {
        this.carrier = res.data && res.data.list
      }).catch(err => {
        console.log(err)
      })
    },
    outStoreSelectionChange(val) {
      this.multipleData = val
    },
    outStoreSure() {
      this.outTableData = this.multipleData.map(item => {
        const newitem = {
          outWarehouseId: item.id,
          bussinessNo: item.busiBillNo,
          outWarehouseNo: item.warehouseExeCode,
          customerName: item.arrivalName,
          customerCode: item.arrivalCode,
          cargoOwner: item.ownerName,
          arrivalAddress: item.arrivalAddress
        }
        return newitem
      })
      this.addressData = []
      this.$set(this.addForm, 'customerName', this.outTableData[0].customerName)
      this.$set(this.addForm, 'customerCode', this.outTableData[0].customerCode)
      this.$set(this.addForm, 'dispatchAddr', this.outTableData[0].arrivalAddress)
      this.getCustomerDetail({
        customerCode: this.outTableData[0].arrivalCode
      })
      this.getCustomerAddressList({
        basicCustomerInfoCode: this.outTableData[0].arrivalCode
      })
      this.outStoreVisible = false
    },
    getCustomerDetail(params) {
      getCustomerList(params)
        .then(res => {
          const result = res.data
          const resultDetail = result && result.list && result.list[0]
          this.$set(this.addForm, 'customerTel', resultDetail.customerLinkuserTel)
          this.$set(this.addForm, 'customerContact', resultDetail.customerLinkUser)
        }).catch(err => {
          console.log(err)
        })
    },
    getCustomerAddressList(params) {
      customerAddressList(params)
        .then(res => {
          const result = res.data
          result.forEach((item, index) => {
            item.area = item.customerProvince + item.customerCity + item.customerArea
            const address = {
              key: index,
              value: item.area + item.customerAddress
            }
            this.$set(this.addressData, index, address)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    delOutStore(row) {
      this.outTableData = this.outTableData.filter(item => item !== row)
    },
    onSubmit() {
      console.log(this.addForm);
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
            logisticsFare: this.logisticsFare,
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
            console.log(res)
            this.submitloading = false
            if (res.success) {
              const view = this.visitedViews.filter(v => v.path === this.$route.path)
              this.$alert('操作成功').then(()=> {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({name: 'logisticsList'})
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
