<template>
  <div class="addCarrier">
    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          @click="submit('save')"
          type="primary"
          size="mini"
          :loading="saveLoading"
          :disabled="savedisabled"
        >保存
        </el-button>
        <!-- <el-button
          type="primary"
          size="mini"
          @click="submit('update')"
          :loading="updateLoading"
          :disabled="savedisabled"
        >提交</el-button> -->
      </template>
    </sticky>
    <el-card shadow="hover">
      <el-form
        class="BaseForm"
        ref="searchForm"
        labelWidth="90px"
        :inline="true"
        :model="searchForm"
      >
        <el-form-item
          label="调拨单号"
          prop="transferNo"
        >
          <el-input
            v-model="searchForm.transferNo"
            size="mini"
            class="formitem"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="外部订单号"
          prop="busiBillNo"
        >
          <el-input
            v-model="searchForm.busiBillNo"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="货主"
          prop="ownerCode"
          :rules="[{ required: true, message: '该项为必填'}]"
        >
          <el-select
            v-model="searchForm.ownerCode"
            filterable
            size="mini"
            @focus="confirmchange('owner')"
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
        <el-form-item
          label="供应商"
          prop="providerCode"
          key="providerCode"
          :rules="[{ required: true, message: '该项为必填'}]"
          v-if="searchForm.ownerCode"
        >
          <ApiSelect
            api="customerInfo"
            :config="['customerCode', 'customerName']"
            :params="{ownerCode: searchForm.ownerCode, busiBillType: 23}"
            v-model="searchForm.providerCode"
            :name.sync="searchForm.providerName"
          />
        </el-form-item>
        <el-form-item
          label="单据组织"
          prop="inOrganize"
          key="inOrganize"
          :rules="[{ required: true, message: '该项为必填'}]"
        >
          <ApiSelect
            api="asiaOrganizeList"
            :config="['organizationCode', 'organizationName']"
            :name.sync="billOrganizeName"
            v-model="searchForm.inOrganize"
          />
        </el-form-item>
        <el-form-item label="调入组织">
          <el-input
            v-model="billOrganizeName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="调入仓库"
          prop="inWarehouseCode"
          key="inWarehouseCode"
          :rules="[{ required: true, message: '该项为必填'}]"
          v-if="searchForm.inOrganize"
        >

          <ApiSelect
            api="asiaWareHouseList"
            :config="['outWarehouseCode', 'outWarehouseName']"
            :params="{organizationCode: searchForm.inOrganize}"
            v-model="searchForm.inWarehouseCode"
            :name.sync="searchForm.inWarehouseName"
            @change="checkInWarehouse"
          />
        </el-form-item>
        <el-form-item
          label="调入日期"
          prop="inDate"
          :rules="[{ required: true, message: '该项为必填'}]"
        >
          <el-date-picker
            v-model="searchForm.inDate"
            size="mini"
            type="date"
            placeholder="选择日期"
            @change="checkTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="单据类型"
          prop="outBusiBillType"
          key="outBusiBillType"
          :rules="[{ required: true, message: '该项为必填'}]"
          v-if="searchForm.inOrganize"
        >

          <ApiSelect
            api="asiaBillTypeList"
            :config="['billTypeCode', 'billTypeName']"
            :params="{organizationCode: searchForm.inOrganize, busiTypeCode: 40}"
            v-model="searchForm.outBusiBillType"
          />
        </el-form-item>
        <el-form-item
          label="调出组织"
          prop="outOrganize"
          key="outOrganize"
          :rules="[{ required: true, message: '该项为必填'}]"
        >
          <ApiSelect
            api="asiaOrganizeList"
            :config="['organizationCode', 'organizationName']"
            v-model="searchForm.outOrganize"
          />
        </el-form-item>
        <el-form-item
          label="调出仓库"
          prop="outWarehouseCode"
          key="outWarehouseCode"
          v-if="searchForm.outOrganize"
          :rules="[{ required: true, message: '该项为必填'}]"
        >

          <ApiSelect
            api="asiaWareHouseList"
            :config="['outWarehouseCode', 'outWarehouseName']"
            :params="{organizationCode: searchForm.outOrganize}"
            v-model="searchForm.outWarehouseCode"
            :name.sync="searchForm.outWarehouseName"
            @change="checkoutWarehouse"
          />
        </el-form-item>
        <el-form-item
          label="调出日期"
          prop="outDate"
          :rules="[{ required: true, message: '该项为必填'}]"
        >
          <el-date-picker
            v-model="searchForm.outDate"
            @change="checkTime"
            size="mini"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="接收人"
          prop="warehouseLinkName"
        >
          <el-input
            v-model="searchForm.warehouseLinkName"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所在地区"
          prop="area"
        >
          <el-cascader
            :options="Area"
            v-model="searchForm.area"
            placeholder="请选择出发地"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="warehouseAddress"
        >
          <el-input
            v-model="searchForm.warehouseAddress"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="linkTel"
        >
          <el-input
            v-model="searchForm.linkTel"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="searchForm.remarkInfo"
            placeholder="请输入备注"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <div class="tableTitle">
          <item-title text="商品明细"/>
          <div class="tableBtn">
            <el-button
              size="mini"
              class="addCommodity"
              @click="showDialog('add')"
              type="primary"
            >添加商品
            </el-button>
          </div>
        </div>
        <edit-table
          :useEdit="true"
          :config="addtable_config"
          @goeditrow="goeditrow"
          @handleDelete="handleDelete"
          :allTableData="searchForm.transferBillDetailDOList"
        />
      </div>
      <el-dialog
        title="选择调拨商品"
        :visible.sync="addVisible"
        width="80%"
        height="60%"
        :before-close="handleClose"
      >
        <select-sku
          :selectform="skuForm"
          @handleClose="handleClose"
          @submit="submit"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {Area, codesTurnName} from '@/utils/area2'
import {addtable_config} from './config';
import editTable from '@/components/Table/editTable';
import selectSku from './conpoments/selectSku'
import {ownerWarehouseList} from '@/api/tenant'
import {requisitiondetail, requisitionmodify, requisitionSave} from '@/api/requisition'
import Sticky from '@/components/Sticky'
import _ from 'lodash';
import {mapGetters} from 'vuex'
import moment from 'moment';

export default {
  name: "businessorderadd",
  components: {editTable, selectSku, Sticky},
  data() {
    return {
      Area,
      skuInfoListLoading: false,
      customerInfoLoading: false,
      warehouseCodeLoading: false,
      saveLoading: false,
      //表单项
      billOrganizeName: '',
      searchForm: {
        transferBillDetailDOList: [],
        inOrganize: undefined,
        outBusiBillType: undefined,
        outOrganize: undefined,
        inWarehouseName: undefined,
        inWarehouseCode: undefined,
        outWarehouseName: undefined,
        outWarehouseCode: undefined,
        area: undefined,
        warehouseAddress: undefined,
        warehouseLinkName: undefined,
        linkTel: undefined,
        providerCode: undefined,
        providerName: undefined
      },
      //表单table配置项
      addtable_config,

      //新增项
      addVisible: false,
      skuList: [],
      warehouseList: [],
      skuForm: {},
      totalskucode: [],
      id: null,
      updateLoading: false,
      savedisabled: false
    };
  },

  mounted() {
    if (this.$route.query.id) {
      let api = requisitiondetail;
      api({id: Number(this.$route.query.id)}).then(res => {
        if (res.success) {
          let searchForm;
          searchForm = res.data;
          searchForm.ownerCode && this.showStore({ownerCode: searchForm.ownerCode})
          searchForm.area = searchForm.warehouseProvince ? (searchForm.warehouseProvince + searchForm.warehouseCity + searchForm.warehouseArea) : null
          this.searchForm = searchForm;
        }
      }).catch(() => {
      })
    }
  },

  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    })
  },

  methods: {
    checkTime() {
      if (this.searchForm.inDate && this.searchForm.outDate) {
        if (this.searchForm.inDate < this.searchForm.outDate) {
          this.$message.error('调入日期应大于等于调出日期')
          this.searchForm.inDate = null
          this.searchForm.outDate = null
        }
      }
    },
    //添加商品时选择商品编码的回调
    skuCodeChange(value) {
      let skuList = _.cloneDeep(this.skuList);
      this.addCommodityForm = skuList.find(v => v.skuCode === value)
    },
    confirmchange(type) {
      let searchForm = _.cloneDeep(this.searchForm);
      if (searchForm.transferBillDetailDOList.length > 0) {
        if (type === 'owner') {
          this.$message.error('更改货主会重置已选择商品')
        } else if (type === 'warehouse') {
          this.$message.error('更改调出仓库会重置已选择商品')
        }
      }
    },
    //选择货主
    ownerCodeChange(value) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.outDate = null
      searchForm.inDate = null
      searchForm.transferBillDetailDOList = [];
      this.searchForm = searchForm;
      this.warehouseList.length = 0
      this.showStore({ownerCode: value})
    },

    showStore(row) {
      this.warehouseList = []
      this.warehouseCodeLoading = true
      ownerWarehouseList({ownerCode: row.ownerCode}).then(res => {
        this.warehouseList = res.data
      }).catch(() => {
      }).then(() => {
        this.warehouseCodeLoading = false
      })
    },
    warehouseCodeFocus(type) {
      if (!this.searchForm.ownerCode) {
        this.$message.error('请先选择货主');
      }
      this.confirmchange(type)
    },
    checkoutWarehouse() {
      this.searchForm.transferBillDetailDOList = []
      if (this.searchForm.inWarehouseCode && this.searchForm.outWarehouseCode === this.searchForm.inWarehouseCode) {
        this.$message.error('调出仓库不应和调入仓库一致')
        this.searchForm.outWarehouseCode = ''
      }
    },
    checkInWarehouse() {
      if (this.searchForm.outWarehouseCode && this.searchForm.outWarehouseCode === this.searchForm.inWarehouseCode) {
        this.$message.error('调出仓库不应和调入仓库一致')
        this.searchForm.inWarehouseCode = ''
        return false
      }
      // warehouseDetail({ warehouseNo: this.searchForm.inWarehouseCode }).then(res => {
      //   if (res.success) {
      //     let data = res.data;
      //     if (data && (((data.warehouseLinkName && data.warehouseAddress) && data.linkTel) && data.warehouseProvince)) {
      //       this.searchForm.area = data.warehouseProvince + data.warehouseCity + data.warehouseArea
      //       this.searchForm.warehouseProvince = data.warehouseProvince
      //       this.searchForm.warehouseCity = data.warehouseCity
      //       this.searchForm.warehouseArea = data.warehouseArea
      //       this.searchForm.warehouseLinkName = data.warehouseLinkName
      //       this.searchForm.warehouseAddress = data.warehouseAddress
      //       this.searchForm.linkTel = data.linkTel
      //     } else {
      //       this.$message.error('请先去维护调入仓库接收人、所在地区、详细地址和联系方式')
      //       this.searchForm.inWarehouseCode = ''
      //     }
      //   }
      // }).catch(err => {

      // })
    },
    goeditrow(index) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.transferBillDetailDOList[index].edit = !searchForm.transferBillDetailDOList[index].edit
      this.searchForm = searchForm;
    },

    handleDelete(index) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.transferBillDetailDOList.splice(index, 1)
      this.searchForm = searchForm;
    },

    handleClose() {
      this.addVisible = false;
    },

    showDialog(type) {
      if (type === 'add') {
        let ownerCode = this.searchForm.ownerCode
        let warehouseCode = this.searchForm.outWarehouseCode
        let outOrganize = this.searchForm.outOrganize
        if (ownerCode && warehouseCode) {
          this.addVisible = true;
          this.skuForm = {ownerCode: ownerCode, warehouseCode: warehouseCode, skuCode: null, skuName: null}
        } else if (!outOrganize) {
          this.$message.error('请选择调出组织！')
        } else {
          this.$message.error('请选择货主和调出仓库！');
        }
      }
    },
    submit(type, value) {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      if (type === 'addCommodity') {
        let pushData = value
        let searchForm = _.cloneDeep(this.searchForm)
        this.totalskucode = []
        if (searchForm.transferBillDetailDOList && searchForm.transferBillDetailDOList.length > 0) {
          searchForm.transferBillDetailDOList.map(item => {
            this.totalskucode.push(item.skuCode)
          })
          pushData.map(item => {
            if (!(this.totalskucode.indexOf(item.skuCode) > -1)) {
              searchForm.transferBillDetailDOList.push({
                skuCode: item.skuCode,
                skuName: item.skuName,
                skuFormat: item.skuFormat,
                skuModel: item.skuModel,
                transferQty: item.transferQty,
                remarkInfo: item.remarkInfo
              })
            }
          })
        } else {
          pushData.map(item => {
            searchForm.transferBillDetailDOList.push({
              skuCode: item.skuCode,
              skuName: item.skuName,
              skuFormat: item.skuFormat,
              skuModel: item.skuModel,
              transferQty: item.transferQty,
              remarkInfo: item.remarkInfo
            })
          })
        }
        this.searchForm = searchForm;
        this.addVisible = false;
      } else {
        this.$refs["searchForm"].validate(valid => {
          if (valid) {
            let json = _.cloneDeep(this.searchForm);
            ['outDate', 'inDate'].forEach(v => {
              if (json[v]) {
                json[v] = moment(json[v]).valueOf()
              }
            })
            json.ownerName = this.mapConfig['billOwnerInfoMap'].find(v => v.key === json.ownerCode).value;
            const areaNames = codesTurnName(this.searchForm.area || [])
            json.warehouseProvince = areaNames[0]
            json.warehouseCity = areaNames[1]
            json.warehouseArea = areaNames[2]
            if (json.transferBillDetailDOList.length <= 0) {
              this.$message.error('商品明细不能为空！')
            } else {
              let api = requisitionSave;
              if (type === 'save') {
                json.isCommit = false
                this.saveLoading = true
                this.savedisabled = true
                this.updateLoading = false
              } else {
                json.isCommit = true
                this.saveLoading = false
                this.savedisabled = true
                this.updateLoading = true
              }
              if (this.$route.query.id) {
                if (this.$route.query.type === 'modify') {
                  api = requisitionmodify;
                }
                json.id = this.$route.query.id;
              }
              json.billOrganize = json.inOrganize
              api({...json, fromSysCode: 'QLL'}).then(res => {
                if (res.success) {
                  if (res.data === 'success') res.data = ''
                  this.$message({
                    type: 'success',
                    message: `${res.data || ''}操作成功,即将跳转到列表页！`,
                    duration: 1500,
                    onClose: () => {
                      this.saveLoading = false
                      this.savedisabled = false
                      this.updateLoading = false
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path: '/otherOrder/requisitionplanList',
                          query: {t: Date.now()}
                        })
                      }).catch(() => {
                      })
                    }
                  })
                } else {
                  this.saveLoading = false
                  this.savedisabled = false
                  this.updateLoading = false
                }
              }).catch(() => {
                this.saveLoading = false
                this.savedisabled = false
                this.updateLoading = false
              })
            }
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
</style>
