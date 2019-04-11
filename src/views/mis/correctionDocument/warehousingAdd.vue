<template>
  <div class="addCarrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
       <div v-if="!query.readOnly">
          <el-button @click="submit('submit')" type="primary" v-loading="submitloading">提交</el-button>
       </div>
      </template>
    </sticky>
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主">
              <el-select v-model="searchForm.ownerCode" clearable placeholder="请选择货主：" size="small" class="formitem"
                :disabled="isModify">
                <el-option v-for="item in owners" :label="item.ownerName" :key="item.ownerCode" :value="item.ownerCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="searchForm.ownerCode">
            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="入库单号">
                <el-select v-model="searchForm.warehouseExeCode" clearable placeholder="请选择入库单号：" size="small" class="formitem"
                  :disabled="isModify">
                  <el-option v-for="(item, index) in orderCodes" :label="item" :key="index" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <template v-if="searchForm.warehouseExeCode">
              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="业务单号:">
                  <el-input v-model="searchForm.busiBillNo" placeholder="请输入业务单号" size="small" class="formitem"
                    disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :md="8" :lg="8" :xl="6">
                <el-form-item label="供应商:">
                  <el-input v-model="searchForm.providerName" placeholder="请输入供应商" size="small" class="formitem"
                    disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </template>
            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="订正类型">
                <el-select @change="revisalTypeChange" v-model="searchForm.revisalType" clearable placeholder="请选择订正类型："
                  size="small" class="formitem" :disabled="isModify">
                  <el-option v-for="item in revisalTypeEnum" :label="item.name" :key="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>

      <el-tabs v-model="activeName">
        <el-tab-pane label="商品明细" name="Inventory">
          <div class="revisalEditTable">
            <edit-Table @currentRedioChange="handleCurrentRedioChange" :highlightCurrentRow="true" :loading="loading"
              :config="carrierDetail_Config" :allTableData="carrierDetail_data" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="订正记录" name="records" v-if="isModify">
          <web-pagination-table :loading="loading" :config="carrierrecords_Config" :allTableData="carrierrecords_data" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { revisalTypeEnum } from "@/utils/enum.js";
import { carrierrecords_Config, carrierDetail_Config } from './components/config'
import webPaginationTable from '@/components/Table/webPaginationTable';
import editTable from '@/components/Table/editTable';
import Sticky from '@/components/Sticky'
import { queryOwners, inOrderCode, inwarehouseBillInfo, inwarehouseOrderDetail, createInwarehouseRevisal, queryInwarehouseRevisal, updateInwarehouseRevisal, queryApprovedItems } from '@/api/correction'
import _ from 'lodash';
export default {
  name: 'warehousingAdd',
  components: { webPaginationTable, editTable,Sticky },
  data() {
    return {
      searchForm: {
        revisalType: 1,
        ownerCode: '',
        warehouseExeCode: '',
        busiBillNo: '',
        providerCode: '',
        providerName: '',
        ownerName: ''
      },
      //标签项
      activeName: 'Inventory',
      //订正枚举
      revisalTypeEnum,
      //商品明细
      carrierDetail_Config: [...carrierDetail_Config],
      // carrierDetail_data: [{ id: 1, revisalQty: '/', revisalAmt: '/' }, { id: 3, revisalQty: '/', revisalAmt: '/' }],//需要id
      carrierDetail_data: [],//需要id
      //订正记录
      loading: false,
      carrierrecords_Config,
      carrierrecords_data: [],
      owners: [], // 货主列表
      orderCodes: [], // 单号
      submitloading: false,
      query: this.$route.query,
    }
  },
  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews'
    }),
    isModify() {
      return !!this.query.id
    },
    checkOwner() {
      return this.searchForm.ownerCode
    },
    checkOrderCode() {
      return this.searchForm.warehouseExeCode
    }
  },
  watch: {
    // 货主更新
    checkOwner(newVal) {
      if (!this.isModify) {
        this.initOrder(newVal)
        this.updateOwnerName(newVal)
      }
    },
    // 单号更新
    checkOrderCode(newVal) {
      if (!this.isModify) {
        this.initBillInfo(newVal)
        this.initOrderDetail(newVal)
      }
    }
  },
  created() {
    this.isModify ? this.initDetail() : this.initOwner()
  },
  methods: {
    initTable() {
      let value = this.searchForm.revisalType
      if (value === 1) {
        this.carrierDetail_Config.push({ label: '调整金额 ', prop: 'revisalAmt', useEdit: true, width: 150 })
      } else if (value === 2) {
        this.carrierDetail_Config.push({ label: '调整数量 ', prop: 'revisalQty', useEdit: true, width: 150 })
      }
    },
    initDetail() {
      queryApprovedItems(this.query.id).then(res => {
        this.carrierrecords_data = res.data || []
      })
      return queryInwarehouseRevisal(this.query.id).then(res => {
        let detail = { ...res.data }
        let revisalItems = detail.revisalItems
        delete detail.revisalItems
        this.searchForm = detail
        this.initTable()
        this.carrierDetail_data = revisalItems.map((item, index) => ({
          id: index,
          ...item,
          edit: (item.revisalQty !== null || item.revisalAmt !== null) && !this.query.readOnly,
          ...{ revisalQty: item.revisalQty !== null ? item.revisalQty : '/', revisalAmt: item.revisalAmt !== null ? item.revisalAmt : '/' }
        }))
      })
    },
    /** 根据货主编号 更新货主名称 */
    updateOwnerName(code) {
      if (code) {
        const temp = this.owners.filter(item => item.ownerCode === code)[0]
        this.searchForm.ownerName = temp ? temp.ownerName : ''
      } else {
        this.searchForm.ownerName = ''
      }
    },
    /** 初始化 货主列表 */
    initOwner() {
      this.initTable()
      queryOwners().then(res => {
        this.owners = res.data || []
      })
    },
    /** 初始化 单号列表 */
    initOrder(code) {
      this.orderCodes = []
      this.searchForm.warehouseExeCode = ''
      if (code) {
        inOrderCode(code).then(res => {
          this.orderCodes = res.data
        })
      }
    },
    /** 初始化 业务单号及供应商信息 */
    initBillInfo(code) {
      this.searchForm.busiBillNo = ''
      this.searchForm.providerName = ''
      this.searchForm.providerCode = ''
      if (code) {
        inwarehouseBillInfo({ inWarehouseOrderCode: code }).then(res => {
          const { providerName, busiBillNo, providerCode } = res.data
          this.searchForm.providerName = providerName
          this.searchForm.busiBillNo = busiBillNo
          this.searchForm.providerCode = providerCode
        })
      }
    },
    /** 初始化商品列表 */
    initOrderDetail(code) {
      this.carrierDetail_data = []
      if (code) {
        inwarehouseOrderDetail(code).then(res => {
          const temp = res.data || []
          this.carrierDetail_data = res.data.map((item, index) => ({
            id: index,
            ...item,
            ...{ revisalQty: '/', revisalAmt: '/' }
          }))
        })
      }
    },
    revisalTypeChange(value) {
      let config = _.cloneDeep(this.carrierDetail_Config)
      let data = _.cloneDeep(this.carrierDetail_data)
      if (value === 1) {
        config[config.length - 1] = { label: '调整金额', prop: 'revisalAmt', useEdit: true, width: 150 }
      } else if (value === 2) {
        config[config.length - 1] = { label: '调整数量', prop: 'revisalQty', useEdit: true, width: 150 }
      }
      this.carrierDetail_Config = config;
      this.carrierDetail_data = data.map(v => {
        v.revisalQty = '/';
        v.revisalAmt = '/';
        v.edit = false;
        return v;
      })

      //操作dom样式
      let td = [...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr td')];
      td.forEach(v => {
        v.style.cssText = ""
      })
    },
    goBackList() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          path: '/correctionDocument/warehousingList'
        })
      })
    },
    submit(type) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let json = _.cloneDeep(this.searchForm);
          let itemArr = this.carrierDetail_data.filter(v => v.edit);
          if (!itemArr.length) {
            return this.$message({
              message: '请调整金额或数量!',
              type: 'warning'
            });
          }
          let revisalItems = itemArr.map(item => {
            let temp = { ...item }
            temp.revisalType = json.revisalType
            if (temp.revisalType == 1) {  // 金额订正
              temp.revisalAmt = Number(temp['revisalAmt']) || 0
              temp.revisalQty = null
            } else { // 数量订正
              temp.revisalQty = Number(temp['revisalQty']) || 0
              temp.revisalAmt = null
            }
            temp.isApproved = 0
            delete temp.id
            return temp
          })
          this.submitloading = true
          if (this.isModify) {
            updateInwarehouseRevisal({
              id: this.query.id,
              ...json,
              revisalItems
            }).then(res => {
              if (res.code === '200') {
                this.$message({
                  type: 'success', message: '入库订正单修改成功，1.5s后跳转至订正单列表页', duration: 1500, onClose: this.goBackList
                })
              } else {
                this.$message({
                  type: 'error', message: '入库订正单修改失败', duration: 1000
                })
              }
            }).catch(err => {
            }).then(() => {
              this.submitloading = false
            })
          }
          else {
            createInwarehouseRevisal({
              ...json,
              revisalItems
            }).then(res => {
              if (res.code === '200') {
                this.$message({
                  type: 'success', message: '入库订正单创建成功，1.5s后跳转至订正单列表页', duration: 1500, onClose: this.goBackList
                })
              } else {
                this.$message({
                  type: 'error', message: '入库订正单创建失败', duration: 1000
                })
              }
            }).catch(err => {
            }).then(() => {
              this.submitloading = false
            })
          }
        }
      })
    },

    //点击某一行的回调
    handleCurrentRedioChange(currentRow, oldCurrentRow) {

      if (this.isModify || !currentRow) {
        return false
      }

      if (currentRow.isApproved == 1) {
        this.$message({
          type: 'error', message: '该商品已订正审核，无法调整数量或金额！', duration: 3000
        })
        return false
      }

      let data = _.cloneDeep(this.carrierDetail_data);
      data = data.map(v => {
        if (v.id === _.cloneDeep(currentRow).id) {
          return { ...v, edit: !currentRow.edit, revisalQty: '/', revisalAmt: '/' }
        } else {
          return { ...v }
        }
      })

      this.carrierDetail_data = data;
      //高亮效果
      this.$nextTick(() => {
        let revisalEditTable = [...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr')];
        revisalEditTable.forEach(item => {
          let td = [...item.querySelectorAll('td')]
          if (item.innerHTML.includes('el-input-number')) {
            td.forEach(v => {
              v.style.cssText = "color:#fff;background:green !important"
            })
          } else {
            td.forEach(v => {
              v.style.cssText = ""
            })
          }
        })
      })
    },

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .el-table__row {
    cursor: pointer;
  }
}
</style>
