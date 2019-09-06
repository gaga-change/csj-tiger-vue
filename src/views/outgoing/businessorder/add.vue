<template>
  <div class="addCarrier">
    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <div
          style="display: inline-block;"
          v-if="!$route.query.id"
        >
          <upload-excel
            @uploadRes="uploadRes"
            filesuploadUrl="/webApi/out/bill/import"
            modelUrl="/static/templet/销售出库.xlsx"
            name="file"
          />
        </div>
        <el-button
          @click="submit('save')"
          type="primary"
          size="mini"
          :loading="saveLoading"
        >保存</el-button>
      </template>
    </sticky>
    <el-card shadow="hover">
      <el-form
        ref="searchForm"
        labelWidth="90px"
        :model="searchForm"
      >
        <el-row>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="$route.query.type==='revision'"
          >
            <el-form-item
              label="调整原因"
              prop="improveReason"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-select
                v-model="searchForm.improveReason"
                clearable
                placeholder="请选择调整原因"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in mapConfig['getBusiBillChange']"
                  :label="item.value"
                  :key="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="业务单类型"
              prop="busiBillType"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-select
                v-model="searchForm.busiBillType"
                @change="busiBillTypeChange"
                clearable
                placeholder="请选择业务单类型"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('出库') && !v.value.includes('订正'))"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="$route.query.id"
          >
            <el-form-item
              label="业务单号:"
              prop="billNo"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-input
                v-model="searchForm.billNo"
                placeholder="请输入业务单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="外部订单号:"
              prop="busiBillNo"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-input
                v-model="searchForm.busiBillNo"
                placeholder="请输入外部订单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="货主"
              prop="ownerCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-select
                v-model="searchForm.ownerCode"
                filterable
                size="small"
                @change="ownerCodeChange"
                placeholder="请选择货主"
              >
                <el-option
                  value=""
                  v-if="mapConfig['billOwnerInfoMap']&&mapConfig['billOwnerInfoMap'].length"
                  :disabled="true"
                >
                  <div class="providerList">
                    <span>货主编号</span>
                    <span>货主名称</span>
                  </div>
                </el-option>
                <el-option
                  v-for="item in mapConfig['billOwnerInfoMap']"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                  <div class="providerList">
                    <span>{{ item.key }}</span>
                    <span>{{ item.value }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              :label="isCustomerKeyArr.includes(searchForm.busiBillType)?'客户':'供应商'"
              label-width="90px"
              prop="arrivalCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >

              <select-customer
                :label="isCustomerKeyArr.includes(searchForm.busiBillType)?'客户':'供应商'"
                v-model="searchForm.arrivalCode"
                :ownerCode="searchForm.ownerCode"
                :busiBillType="searchForm.busiBillType"
                @change="providerChange"
              >
              </select-customer>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              :label="isCustomerKeyArr.includes(searchForm.busiBillType)?'客户地址':'供应商地址'"
              prop="arrivalAddress"
              :rules="[{ required: true, message: '该项为必填', trigger: ['blur', 'change']}]"
            >
              <el-select
                size="small"
                @change="arrivalAddressChange"
                v-model="searchForm.arrivalAddress"
                placeholder="请选择地址"
              >
                <el-option
                  :value="null"
                  v-if="addrListConfig.length"
                  :disabled="true"
                >
                  <div class="providerList">
                    <span>地址</span>
                    <span>地址编码</span>
                  </div>
                </el-option>
                <el-option
                  v-for="item in addrListConfig"
                  :label="item.arrivalAddress"
                  :key="item.arrivalLinkTel+item.arrivalAddress"
                  :value="item.arrivalAddress"
                >
                  <div class="providerList">
                    <span>{{ item.arrivalAddress }}</span>
                    <span>{{ item.addrCode }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="联系人:"
              prop="arrivalLinkUser"
              :rules="[{ required: true, message:'请输入联系人' }]"
            >
              <el-input
                v-model="searchForm.arrivalLinkUser"
                placeholder="请输入联系人"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="联系电话:"
              prop="arrivalLinkTel"
              :rules="[{ required: true, message:'请输入联系电话' }]"
            >
              <el-input
                v-model="searchForm.arrivalLinkTel"
                placeholder="请输入联系电话"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="创建人:"
              v-if="$route.query.id"
            >
              <el-input
                v-model="searchForm.createrName"
                placeholder="请输入创建人"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="到货预定日"
              label-width="100px"
            >
              <el-date-picker
                v-model="searchForm.arrivalPreDate"
                size="small"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="到货有效日"
              label-width="100px"
            >
              <el-date-picker
                v-model="searchForm.arrivalEffectDate"
                size="small"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="$route.query.id"
          >
            <el-form-item
              label="创建日期"
              label-width="100px"
              v-if="$route.query.id"
            >
              <el-date-picker
                v-model="searchForm.gmtCreate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item label="合同号:">
              <el-input
                v-model="searchForm.contractNo"
                placeholder="请输入合同号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item label="发货要求">
              <el-select
                v-model="searchForm.sendOutRequire"
                clearable
                placeholder="请选择发货要求"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in sendOutRequireEnum"
                  :label="item.name"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="isCustomerKeyArr.includes(searchForm.busiBillType)"
          >
            <el-form-item label="询价单号:">
              <el-input
                v-model="searchForm.inquiryNo"
                placeholder="请输入询价单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="$route.query.id"
          >
            <el-form-item label="订单来源:">
              <el-input
                v-model="searchForm.fromSysCode"
                placeholder="请输入订单来源"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="仓库"
              prop="warehouseCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-select
                v-model="searchForm.warehouseCode"
                clearable
                placeholder="请选择仓库"
                size="small"
                class="formitem"
                @focus="warehouseCodeFocus"
                :loading="warehouseCodeLoading"
              >
                <el-option
                  v-for="item in warehouseList"
                  :label="item.warehouseName"
                  :key="item.warehouseCode"
                  :value="item.warehouseCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item label="备注:">
              <el-input
                v-model="searchForm.remarkInfo"
                placeholder="请输入备注"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tableBox">
          <div class="tableTitle">
            <item-title text="商品明细" />
            <div class="tableBtn">
              <el-button
                size="mini"
                class="addCommodity"
                @click="showDialog('add')"
                type="primary"
              >添加商品</el-button>
            </div>
          </div>
          <edit-Table
            :useEdit="true"
            :config="addtable_config"
            @goeditrow="goeditrow"
            @handleDelete="handleDelete"
            :allTableData="searchForm.outWarehouseBillDetailList"
          />
        </div>
        <el-dialog
          title="新增商品"
          :visible.sync="addVisible"
          width="30%"
          :before-close="handleClose"
        >
          <add-form
            v-loading="skuInfoListLoading"
            @submit="submit"
            :ownerCode="searchForm.ownerCode"
            @skuCodeChange="skuCodeChange"
            :searchForm="addCommodityForm"
            @handleClose="handleClose"
          ></add-form>
        </el-dialog>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addtable_config } from './config';
import editTable from '@/components/Table/editTable';
import addForm from './conpoments/addForm'
import { outgoingOrderTypeEnum, sendOutRequireEnum } from "@/utils/enum.js";
import { ownerWarehouseList } from '@/api/tenant'
import { getProductList } from '@/api/productcenter'
import { customerAddrInfo, skuInfoList, outBillAdd, outBillDetail, outBillUpdate, outBillImprove, customNameSearch } from '@/api/outgoing'
import Sticky from '@/components/Sticky'
import _ from 'lodash';
import { mapGetters } from 'vuex'
import moment from 'moment';
import selectCustomer from './conpoments/selectCustomer'

export default {
  name: "businessorderadd",
  components: { editTable, addForm, Sticky, selectCustomer },
  provide() {
    return {
      ownerCode: this.searchForm.ownerCode
    }
  },
  data() {
    return {
      skuInfoListLoading: false,
      customerInfoLoading: false,
      warehouseCodeLoading: false,
      saveLoading: false,
      //表单项
      searchForm: {
        saleType: 1,
        busiBillType: 21,
        ownerCode: '',
        outWarehouseBillDetailList: []
      },
      //表单table配置项
      addtable_config,

      //新增项
      addVisible: false,
      addCommodityForm: {

      },
      skuList: [],
      //枚举项
      outgoingOrderTypeEnum,//出库类型
      sendOutRequireEnum,//发货要求
      //地址下拉配置
      addrListConfig: [],
      warehouseList: [],
      selectProvider: null, // 选择的 供应商|客户
    }
  },

  mounted() {
    if (this.$route.query.id) {
      let addtable_config = _.cloneDeep(this.addtable_config);
      let index = addtable_config.findIndex(v => ['客户销价', '进货价'].includes(v.label));
      let api = outBillDetail;
      api(this.$route.query.id).then(res => {
        if (res.success) {
          let searchForm = _.cloneDeep(this.searchForm);
          searchForm = res.data;
          searchForm.ownerCode && this.showStore({ ownerCode: searchForm.ownerCode })
          searchForm.sendOutRequire = searchForm.sendOutRequire === null ? null : Number(searchForm.sendOutRequire);
          searchForm.outWarehouseBillDetailList = (res.data && Array.isArray(res.data.busiBillDetails) && res.data.busiBillDetails || []).map(v => {
            v.planOutQty = v.skuOutQty;
            ['purchasePrice', 'sellPrice'].forEach(itme => {
              v[itme] = v.outStorePrice;
            })
            return v;
          });
          if (this.isCustomerKeyArr.includes(searchForm.busiBillType)) {
            addtable_config[index] = { label: '客户销价', prop: 'sellPrice', }
          } else {
            addtable_config[index] = { label: '进货价', prop: 'purchasePrice', }
          }
          this.addtable_config = addtable_config;
          this.searchForm = searchForm;
        }
      }).catch(err => {
      })
    }
  },

  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    }),
    isCustomerKeyArr() {
      let temp = []
      let teypArr = this.mapConfig['getBillType'] || []
      teypArr.filter(v => v.value.includes('出库')).forEach(v => {
        if (v.remark === '客户') {
          temp.push(v.key)
        }
      })
      return temp
    }
  },

  methods: {
    //添加商品时选择商品编码的回调
    skuCodeChange(value) {
      this.addCommodityForm = value
    },
    getcustomerName(customerCode){
      customNameSearch({customerCode:customerCode}).then(res=>{
        if(res.success){
          // this.searchForm.arrivalName
        }
      })
    },
    //业务单类型变化回调
    busiBillTypeChange(value) {
      let searchForm = _.cloneDeep(this.searchForm);
      ['arrivalCode', 'arrivalAddress', 'arrivalLinkUser', 'arrivalLinkTel'].forEach(v => {
        searchForm[v] = ''
      })
      searchForm.outWarehouseBillDetailList = [];
      this.searchForm = searchForm;
      this.addrListConfig = []

      let addtable_config = _.cloneDeep(this.addtable_config);
      let index = addtable_config.findIndex(v => ['客户销价', '进货价'].includes(v.label));
      if (this.isCustomerKeyArr.includes(value)) {
        addtable_config[index] = { label: '客户销价', prop: 'sellPrice', }
      } else {
        addtable_config[index] = { label: '进货价', prop: 'purchasePrice', }
      }
      this.addtable_config = addtable_config;
    },

    //选择货主
    ownerCodeChange(value) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.arrivalCode = '';
      searchForm.arrivalAddress = '';
      searchForm.arrivalLinkUser = '';
      searchForm.arrivalLinkTel = '';
      searchForm.warehouseCode = '';
      searchForm.outWarehouseBillDetailList = [];
      this.searchForm = searchForm;
      this.addrListConfig = [];
      this.warehouseList.length = 0
      this.showStore({ ownerCode: value })
    },

    showStore(row) {
      this.warehouseList = []
      this.warehouseCodeLoading = true
      ownerWarehouseList({ ownerCode: row.ownerCode }).then(res => {
        let result = res.data
        this.warehouseList = result
      }).catch(err => {
      }).then(res => {
        this.warehouseCodeLoading = false
      })
    },

    //地址获取焦点
    arrivalAddressFocus() {
      if (!this.searchForm.arrivalCode) {
        this.$message.error('请先选择供应商');
      }
    },

    warehouseCodeFocus() {
      if (!this.searchForm.ownerCode) {
        this.$message.error('请先选择货主');
      }
    },

    //地址变化
    arrivalAddressChange(val) {
      let add = this.addrListConfig.find(v => v.arrivalAddress === val) || {}
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.arrivalLinkUser = add.arrivalLinkUser;
      searchForm.arrivalLinkTel = add.arrivalLinkTel;
      searchForm.arrivalCity = add.arrivalCity;
      searchForm.arrivalDistrict = add.arrivalDistrict;
      searchForm.arrivalProvince = add.arrivalProvince;
      this.searchForm = searchForm;
    },

    //地址列表配置
    providerChange(provider) {
      this.selectProvider = provider
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.arrivalAddress = '';
      searchForm.arrivalLinkUser = '';
      searchForm.arrivalLinkTel = '';
      this.searchForm = searchForm;
      this.addrListConfig = [];
      let id = provider.id
      customerAddrInfo(provider.customerCode, this.searchForm.busiBillType).then(res => {
        if (res.success) {
          this.addrListConfig = Array.isArray(res.data) && res.data || [];
          const defaultAddress = this.addrListConfig.find(item => item.isDefault === 1) || {}
          this.$nextTick(() => {
            this.searchForm.arrivalAddress = defaultAddress.arrivalAddress
            this.arrivalAddressChange(defaultAddress.arrivalAddress)
          })
        }
      }).catch(err => {
      })
    },


    async uploadRes(res) {
      if (res.success) {
        let addtable_config = _.cloneDeep(this.addtable_config);
        let index = addtable_config.findIndex(v => ['客户销价', '进货价'].includes(v.label));
        let searchForm = _.cloneDeep(this.searchForm);
        searchForm = res.data;
        searchForm.sendOutRequire = searchForm.sendOutRequire || 1
        searchForm.sendOutRequire = Number(searchForm.sendOutRequire);
        searchForm.outWarehouseBillDetailList = (res.data && Array.isArray(res.data.busiBillDetails) && res.data.busiBillDetails || []).map(v => {
          v.planOutQty = v.skuOutQty;
          ['purchasePrice', 'sellPrice'].forEach(itme => {
            v[itme] = v.outStorePrice;
          })
          return v;
        });
        if (this.isCustomerKeyArr.includes(searchForm.busiBillType)) {
          addtable_config[index] = { label: '客户销价', prop: 'sellPrice', }
        } else {
          addtable_config[index] = { label: '进货价', prop: 'purchasePrice', }
        }
        this.addtable_config = addtable_config;
        this.searchForm = searchForm;
        this.getcustomerName(this.searchForm.arrivalCode)
        this.showStore({ ownerCode: this.searchForm.ownerCode })
        customerAddrInfo(this.searchForm.arrivalCode, this.searchForm.busiBillType).then(res => {
          if (res.success) {
            this.addrListConfig = Array.isArray(res.data) && res.data || [];
            const defaultAddress = this.addrListConfig.find(item => item.isDefault === 1) || {}
            this.$nextTick(() => {
              this.searchForm.arrivalAddress = defaultAddress.arrivalAddress
              this.arrivalAddressChange(defaultAddress.arrivalAddress)
            })
          }
        }).catch(err => {
        })
        // this.searchForm.arrivalCode && await this.providerChange(this.searchForm.arrivalCode)

      } else {
        this.$message.error('导入失败');
      }
    },

    goeditrow(index, type) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.outWarehouseBillDetailList[index].edit = !searchForm.outWarehouseBillDetailList[index].edit
      this.searchForm = searchForm;
    },

    handleDelete(index, row) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.outWarehouseBillDetailList.splice(index, 1)
      this.searchForm = searchForm;
    },

    handleClose() {
      this.addVisible = false;
    },

    showDialog(type) {
      if (type === 'add') {
        let { ownerCode } = this.searchForm;
        if (!ownerCode) {
          this.$message.error('请选择货主！');
          return
        }
        this.addVisible = true;
        this.skuList = []
        this.addCommodityForm = {}
      }
    },

    submit(type, value) {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if (type === 'addCommodity') {
        let searchForm = _.cloneDeep(this.searchForm);
        let index = searchForm.outWarehouseBillDetailList.findIndex(v => v.skuCode === value.skuCode);
        if (index !== -1) {
          this.$alert('该商品已在列表中')
        } else {
          searchForm.outWarehouseBillDetailList.push(value);
          this.searchForm = searchForm;
          this.addCommodityForm = {};
          this.addVisible = false;
        }
      } else {
        this.$refs["searchForm"].validate(valid => {
          if (valid) {
            let json = _.cloneDeep(this.searchForm);
            ['arrivalPreDate', 'arrivalEffectDate'].forEach(v => {
              if (json[v]) {
                json[v] = moment(json[v]).valueOf()
              }
            })
            const provider = this.selectProvider
            json.ownerName = json.ownerName ? json.ownerName : this.mapConfig['billOwnerInfoMap'].find(v => v.key === json.ownerCode).value;
            json.arrivalName = json.arrivalName || provider.customerName
            let api = outBillAdd;
            if (this.$route.query.id) {
              if (this.$route.query.type === 'modify') {
                api = outBillUpdate;
              } else {
                api = outBillImprove;
              }
              json.outWarehouseBillId = this.$route.query.id;
            }
            this.saveLoading = true
            api(json).then(res => {
              if (res.success) {
                if (res.data === 'success') res.data = ''
                this.$message({
                  type: 'success',
                  message: `${res.data || ''}操作成功,即将跳转到列表页！`,
                  duration: 1500,
                  onClose: () => {
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push({
                        path: '/outgoing/businessorder',
                        query: { t: Date.now() }
                      })
                    }).catch(err => {
                    })
                  }
                })
              } else {
                this.saveLoading = false
              }
            }).catch(err => {
              this.saveLoading = false
            })
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .el-form-item {
    height: 40px;
  }
  .tableBox {
    .tableTitle {
      display: flex;
      justify-content: space-between;
      margin: 16px 0;
    }
    .tableBtn {
      display: flex;
    }
    .addCommodity {
      height: 28px;
      line-height: 26px;
      padding: 0 12px;
      margin-left: 12px;
    }
  }
}
.providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
.el-table__body tr.current-row > td {
  background: green !important;
  color: #fff;
}
</style>
