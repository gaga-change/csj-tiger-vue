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
              <el-form-item label="出库单号">
                <span style="display: block;">
                  {{!!searchForm.warehouseExeCode ? searchForm.warehouseExeCode : ''}} <a
                    href="JavaScript:void(0)"
                    style="color:#409EFF;white-space: nowrap;"
                    @click="showDialogTable"
                    v-if="!isModify"
                  >选择出库单</a>
                </span>
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
                <el-form-item label="客户:">
                  <el-input v-model="searchForm.arrivalName" placeholder="请输入客户" size="small" class="formitem"
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
              :config="outgoing_carrierDetailConfig" :allTableData="carrierDetail_data" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="订正记录" name="records" v-if="isModify">
          <web-pagination-table :loading="loading" :config="outgoing_carrierrecordsConfig" :allTableData="carrierrecords_data" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      title="选择出库单号"
      :visible.sync="addVisible"
      width="70%"
      height="60%"
      :before-close="handleClose"
    >
     <selectTable
      :selectOwnercode="this.searchForm.ownerCode"
      :datatype="'outgoing'"
      @handleClose="handleClose"
      @select="selectChange"
    />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { revisalTypeEnum } from "@/utils/enum.js";
import { outgoing_carrierrecordsConfig, outgoing_carrierDetailConfig } from './components/config'
import webPaginationTable from '@/components/Table/webPaginationTable';
import editTable from '@/components/Table/editTable';
import Sticky from '@/components/Sticky'
import { queryOwners, outOrderCode, outwarehouseBillInfo, outwarehouseOrderDetail, createOutwarehouseRevisal, queryOutwarehouseRevisal, updateOutwarehouseRevisal, outQueryApprovedItems } from '@/api/correction'
import _ from 'lodash';
import selectTable from './components/selectTable'
export default {
  name: 'outgoingAdd',
  components: { webPaginationTable, editTable , Sticky, selectTable},
  data() {
    return {
      searchForm: {
        revisalType: 1,
        ownerCode: '',
        warehouseExeCode: '',
        busiBillNo: '',
         arrivalCode: '',
        arrivalName: '',
        ownerName: ''
      },
      //标签项
      activeName: 'Inventory',
      //订正枚举
      revisalTypeEnum,
      //商品明细
      outgoing_carrierDetailConfig: [...outgoing_carrierDetailConfig],
      // carrierDetail_data: [{ id: 1, revisalQty: '/', revisalAmt: '/' }, { id: 3, revisalQty: '/', revisalAmt: '/' }],//需要id
      carrierDetail_data: [],//需要id
      //订正记录
      loading: false,
      outgoing_carrierrecordsConfig,
      carrierrecords_data: [],
      owners: [], // 货主列表
      orderCodes: [], // 单号
      submitloading: false,
      query: this.$route.query,
      addVisible:false,
      // selectForm:{}
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
    showDialogTable(){
      this.addVisible = true
    },
    handleClose(){
      this.addVisible = false
    },
    selectChange(val){
      this.searchForm.warehouseExeCode=val
      this.handleClose()
    },
    initTable() {
      let value = this.searchForm.revisalType
      if (value === 1) {
        this.outgoing_carrierDetailConfig.push({ label: '调整金额 ', prop: 'revisalAmt', useEdit: true, width: 150,min:-Infinity})
      } else if (value === 2) {
        this.outgoing_carrierDetailConfig.push({ label: '调整数量 ', prop: 'revisalQty', useEdit: true, width: 150 ,min:-Infinity})
      }
      this.outgoing_carrierDetailConfig.push({ label: '备注 ', prop: 'remarkInfo', useEdit: true, editType:'input', width: 150})
    },
    initDetail() {
      outQueryApprovedItems(this.query.id).then(res => {
        this.carrierrecords_data = res.data || []
      })
      return queryOutwarehouseRevisal(this.query.id).then(res => {
        let detail = { ...res.data }
        let revisalItems = detail.revisalItems
        delete detail.revisalItems
        this.searchForm = detail
        this.initTable()
        this.carrierDetail_data = revisalItems.map((item, index) => ({
          id: index,
          ...item,
          edit: (item.revisalQty !== null || item.revisalAmt !== null) && !this.query.readOnly,
          ...{ revisalQty: item.revisalQty !== null ? item.revisalQty : null, revisalAmt: item.revisalAmt !== null ? item.revisalAmt : null }
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
    },
    /** 初始化 业务单号及供应商信息 */
    initBillInfo(code) {
      this.searchForm.busiBillNo = ''
      this.searchForm.arrivalName = ''
      this.searchForm. arrivalCode = ''
      if (code) {
        outwarehouseBillInfo({ outWarehouseOrderCode: code }).then(res => {
          const { arrivalName, busiBillNo, arrivalCode } = res.data
          this.searchForm.arrivalName = arrivalName
          this.searchForm.busiBillNo = busiBillNo
          this.searchForm. arrivalCode =  arrivalCode
        })
      }
    },
    /** 初始化商品列表 */
    initOrderDetail(code) {
      this.carrierDetail_data = []
      if (code) {
        outwarehouseOrderDetail(code).then(res => {
          const temp = res.data || []
          this.carrierDetail_data = res.data.map((item, index) => ({
            id: index,
            ...item,
            ...{ revisalQty:item.isApproved==1?'/':null, revisalAmt:item.isApproved==1?'/':null, edit:false }
          }))
        })
      }
    },
    revisalTypeChange(value) {
      let config = _.cloneDeep(this.outgoing_carrierDetailConfig)
      let data = _.cloneDeep(this.carrierDetail_data)
      if (value === 1) {
        config[config.length - 2] = { label: '调整金额', prop: 'revisalAmt', useEdit: true, width: 150,min:-Infinity }
      } else if (value === 2) {
        config[config.length - 2] = { label: '调整数量', prop: 'revisalQty', useEdit: true, width: 150 ,min:-Infinity}
      }
      this.outgoing_carrierDetailConfig = config;
      this.carrierDetail_data = data.map(v => {
        v.revisalQty = item.isApproved==1?'/':null
        v.revisalAmt = item.isApproved==1?'/':null
        v.edit = false
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
          path: '/correctionDocument/outgoingList'
        })
      })
    },
    submit(type) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let json = _.cloneDeep(this.searchForm);
          let itemArr = []
          if (this.isModify){
            itemArr = this.carrierDetail_data.filter(v => v.edit);
          }else{
            itemArr = this.carrierDetail_data.filter(v => v.isSubmit);
          }
          if (!itemArr.length) {
            return this.$message({message: '请调整金额或数量!',type: 'warning'});
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
            updateOutwarehouseRevisal({
              id: this.query.id,
              ...json,
              revisalItems
            }).then(res => {
              if (res.code === '200') {
                this.$message({
                  type: 'success', message: '出库订正单修改成功，1.5s后跳转至订正单列表页', duration: 1500, onClose: this.goBackList
                })
              } else {
                this.$message({
                  type: 'error', message: '出库订正单修改失败', duration: 1000
                })
              }
            }).catch(err => {
            }).then(() => {
              this.submitloading = false
            })
          }
          else {
            createOutwarehouseRevisal({
              ...json,
              revisalItems
            }).then(res => {
              if (res.code === '200') {
                this.$message({
                  type: 'success', message: '出库订正单创建成功，1.5s后跳转至订正单列表页', duration: 1500, onClose: this.goBackList
                })
              } else {
                this.$message({
                  type: 'error', message: '出库订正单创建失败', duration: 1000
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

      if (!currentRow) {
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
          return { ...v, edit: true, revisalQty: currentRow.revisalQty, revisalAmt: currentRow.revisalAmt }
        } else {
          return { ...v }
        }
      })
      this.carrierDetail_data = data;
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