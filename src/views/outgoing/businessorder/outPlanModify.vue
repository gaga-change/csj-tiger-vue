<template>
  <div class="outgoing-quirydetail-container">
    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          type="primary"
          size="small"
          @click="outPlanClose"
          :disabled="outPlanCloseLoading"
        >关闭</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submit"
          :disabled="submitLoading"
        >提交</el-button>
      </template>
    </sticky>
    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="infoData"
    />

    <item-title text="相关明细" />
    <web-pagination-table
      :loading="loading"
      :config="addPlanOrder_config"
      :allTableData="tableData"
    />

    <el-dialog
      title="编辑计划出库数量并选择仓库"
      :visible.sync="addVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div class="revisalEditTable">
        <edit-Table
          @currentRedioChange="handleCurrentRedioChange"
          :highlightCurrentRow="true"
          :config="alertTable_config"
          :allTableData="alertTableData"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="sureWarehouse"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { infoConfig } from '@/views/outgoing/plan/config';
import { addPlanOrder_config, alertTable_config } from './config';
import webPaginationTable from '@/components/Table/webPaginationTable';
import { skuInfoGetRecommendStock, outPlanClose, outPlanUpdate } from '@/api/outgoing'
import { outPlanDetail } from '@/api/outgoing'
import editTable from '@/components/Table/editTable';
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky'
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'out-plan-modify',
  components: { webPaginationTable, editTable, Sticky },
  data() {
    return {
      //基本信息项
      loading: false,
      infoData: {},
      infoConfig,

      //table项
      tableData: [], //需要id
      addPlanOrder_config,

      //弹框项
      addVisible: false,
      originalTableData: [],//原始数据  需要id
      alertTableData: [], //需要id
      alertTable_config,
      submitLoading: false,
      editRow: {},//当前正在编辑的行 并非弹框
      outPlanCloseLoading: false,
    }
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews'
    })
  },

  created() {
    this.addPlanOrder_config.forEach(item => {
      if (item.label === '操作') {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div class="tableLinkBox">
              {
                <span class="tableLink" onClick={this.operation.bind(this, 'delete', row)}>删除</span>
              }

              {
                <span class="tableLink" onClick={this.operation.bind(this, 'edit', row)}>编辑</span>
              }

            </div>
          )
        }
      }
    })
  },

  mounted() {
    this.getCurrentTableData()
  },

  methods: {
    moment,
    // 关闭计划单
    outPlanClose() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      let { planCode } = this.$route.query || {}
      this.outPlanCloseLoading = true
      outPlanClose(planCode).then(res => {
        if (res.success) {
          this.submitLoading = true
          this.$message({
            type: 'success',
            message: '操作成功,即将跳转到计划单列表页！',
            duration: 1500,
            onClose: () => {
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                this.$router.push({
                  path: `/outgoing/plan?t=${Date.now()}`,
                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        } else {
          this.outPlanCloseLoading = false
        }
      }).catch(err => {
        this.outPlanCloseLoading = false
      })
    },
    getCurrentTableData() {
      let { planCode } = this.$route.query || {};
      this.planCode = planCode;
      this.loading = true
      outPlanDetail({
        planCode,
        pageSize: 500
      }).then(res => {
        this.loading = false
        if (res.success) {
          let data = res.data;
          this.infoData = data;
          if (this.infoData.busiBillNo && this.infoData.busiBillNo.slice(0, 2) == 'SO') {
            this.infoConfig.find(v => v.prop === 'busiBillNo').linkTo = '/outgoing/businessorder-detail'
          }
          let list = data.itemList || []
          this.tableData = list.map(v => {
            v.warehouseName = data.planWarehouseName
            v.warehouseCode = data.planWarehouseCode
            if (this.$route.query.history) {
              if (v.planOutQty - v.realInQty > 0) {
                v.handOutQty = v.handOutQty || 0;
              } else {
                v.handOutQty = 0
              }
              v.edit = true;
            }
            return v
          })
        }
      }).catch(err => {
        this.loading = false
      })
    },
    submit() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      let { planCode } = this.$route.query || {};
      let json = { planCode }
      // json.inWarehouseBillId = this.$route.query.id;
      json.updatePlanDetailReqList = this.tableData.map(v => {
        return {
          skuCode: v.skuCode,
          planOutQty: v.planOutQty,
          planWarehouseCode: v.warehouseCode,
          planWarehouseName: v.warehouseName,
          outWarehousePlanDetailId: v.id
        }
      })
      this.submitLoading = true
      outPlanUpdate(json).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '操作成功,即将跳转到计划单列表页！',
            duration: 1500,
            onClose: () => {
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                this.$router.push({
                  path: `/outgoing/plan`,
                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        }
      }).catch(err => {
        console.log(err)
      }).then(() => {
        this.submitLoading = false
      })
    },
    //关闭弹框
    handleClose() {
      this.addVisible = false;
    },

    //点击某一行的回调
    handleCurrentRedioChange(currentRow, oldCurrentRow) {
      if (!currentRow) {
        return false
      }
      let alertTableData = _.cloneDeep(this.alertTableData);
      alertTableData = alertTableData.map(v => {
        if (v.warehouseCode === _.cloneDeep(currentRow).warehouseCode) {
          v.edit = true;
          v.planOutQty = this.editRow.planOutQty
          v.planOutQty = _.cloneDeep(this.editRow).planOutQty
        } else {
          v.edit = false;
          v.planOutQty = null;
        }
        return v
      })
      this.alertTableData = alertTableData;

      //高亮效果  此处有异步问题
      setTimeout(() => {
        let revisalEditTable = [...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr')];
        revisalEditTable.forEach(item => {
          let td = [...item.querySelectorAll('td')]
          td.forEach(v => {
            if (item.innerHTML.includes('el-input-number')) {
              v.style.cssText = "color:#fff;background:green !important"
            } else {
              v.style.cssText = ""
            }
          })
        })
      }, 20)
    },

    //展示弹框
    operation(type, row) {
      if (type === 'delete') {
        let tableData = _.cloneDeep(this.tableData);
        let index = tableData.findIndex(v => v.id === row.id);
        tableData.splice(index, 1);
        this.tableData = tableData;
      } else if (type === 'edit') {

        if (row.skuCode !== this.editRow.skuCode) {
          skuInfoGetRecommendStock(this.infoData.ownerCode, row.skuCode).then(res => {
            if (res.success) {
              this.editRow = _.cloneDeep(row);
              this.currentRow = {};
              this.alertTableData = _.cloneDeep(res.data)
            }
          }).catch(err => {
            console.log(err)
          })

        }
        this.addVisible = true;
      }
    },

    //点击确定
    sureWarehouse() {
      if (this.alertTableData.every(v => !v.edit)) {
        this.$message.error('请选择数据');
        return
      }
      let tableData = _.cloneDeep(this.tableData);
      let index = tableData.findIndex(v => v.id === this.editRow.id);
      if (index !== -1) {
        tableData[index] = { ...tableData[index], ...this.alertTableData.filter(v => v.edit)[0] }
      }
      this.tableData = tableData;
      this.addVisible = false;
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.tableLink {
  cursor: pointer;
  color: #3399ea;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
}

.el-table__body tr.current-row > td {
  background: green !important;
  color: #fff;
}
.el-table__row {
  cursor: pointer;
}
.submitBtn {
  display: flex;
  margin: 12px 0;
}
</style>
