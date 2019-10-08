<template>
  <div class="outgoing-quirydetail-container">
    <!-- 调拨入库 14 -->
    <sticky
      v-if="infoData.busiBillType != 14"
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          size="small"
          v-if="[0,2].includes(infoData.billStatus)"
          @click="operation('close')"
        >关闭</el-button>
        <el-button
          size="small"
          v-if="[0,2].includes(infoData.billStatus)"
          @click="operation('delete')"
        >删除</el-button>
        <router-link
          v-if="[0,2].includes(infoData.billStatus)"
          :to="`/warehousing/businessorderadd?id=${$route.query.id}&time=${moment().valueOf()}`"
          class="tableLink"
        >
          <el-button
            type="success"
            size="small"
          >修改</el-button>
        </router-link>
        <el-button
          type="success"
          size="small"
          v-if="[0,2].includes(infoData.billStatus)"
          @click="operation('examine')"
        >审核</el-button>
        <el-button
          type="success"
          size="small"
          @click="printing"
          v-if="[1].includes(infoData.billStatus)"
        >打印</el-button>
        <router-link
          :to="`/warehousing/warehousingAddPlanOrder?id=${$route.query.id}&time=${moment().valueOf()}`"
          class="tableLink"
        >
          <el-button
            type="success"
            size="small"
            v-if="[1].includes(infoData.billStatus) && infoData.billState !== 8 && !infoData.billNo.includes('DB')"
          >创建计划单</el-button>
        </router-link>
      </template>
    </sticky>

    <item-title text="基本信息" />
    <item-card
      :config="infoConfig"
      :loading="loading"
      :cardData="infoData"
    />

    <item-title text="相关明细" />
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        label="业务单"
        name="business"
      >
        <web-pagination-table
          :loading="loading"
          :config="tableConfig"
          :allTableData="tableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="计划单"
        name="plan"
      >
        <web-pagination-table
          :loading="loading"
          :config="detail_planTableConfig"
          :allTableData="detail_planTableData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="入库单"
        name="warehousing"
      >
        <web-pagination-table
          :loading="loading"
          :config="detail_warehousingTableConfig"
          :allTableData="detail_warehousingTableData"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="入库业务单打印"
      top="40px"
      :visible.sync="printingVisible"
      width="841px"
      :before-close="handleClose"
    >
      <invoice
        id="invoice"
        :baseData="baseData"
        :config="printingTable_config"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="surePrinting"
        >打印</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { tableConfig, infoConfig, printingTable_config, detail_planTableConfig, detail_warehousingTableConfig } from './config';
import webPaginationTable from '@/components/Table/webPaginationTable';
import { inbilldetail, inbillPrint, inBillUpdateStatus, inPlanSelect, inOrderSelect } from '@/api/warehousing'
import Sticky from '@/components/Sticky'
import Invoice from './conpoments/invoice'
import { mapGetters } from 'vuex'
import moment from 'moment';
import { MakePrint } from '@/utils'

export default {
  components: { webPaginationTable, Sticky, Invoice },
  data() {
    return {
      loading: false,
      infoData: {},
      infoConfig,

      tableData: [],
      tableConfig,

      //打印项
      printingVisible: false,
      baseData: {},
      printingTable_config,

      detail_planTableConfig,
      detail_planTableData: [],

      detail_warehousingTableConfig,
      detail_warehousingTableData: [],

      activeName: 'business'
    }
  },

  mounted() {
    this.inbilldetailApi()
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews'
    })
  },
  methods: {
    moment,
    inbilldetailApi() {
      inbilldetail(this.$route.query.id).then(res => {
        if (res.success) {
          this.infoData = res.data;
          this.tableData = res.data.items;
          //相关计划单数据
          inPlanSelect({
            pageNum: 1,
            pageSize: 1000,
            billNo: res.data && res.data.billNo,
            ownerCode: res.data && res.data.ownerCode
          }).then(result => {
            if (result.success) {
              this.detail_planTableData = result.data && Array.isArray(result.data.list) && result.data.list || [];
            }
          }).catch(err => {
            console.error(err)
          })

          //相关入库单数据
          inOrderSelect({
            pageNum: 1,
            pageSize: 1000,
            billNo: res.data && res.data.billNo,
            ownerCode: res.data && res.data.ownerCode
          }).then(result => {
            if (result.success) {
              this.detail_warehousingTableData = result.data && Array.isArray(result.data.list) && result.data.list || [];
            }
          }).catch(err => {
            console.error(err)
          })

        }
      }).catch(err => {
        console.error(err)
      })
    },
    operation(type, row) {
      let component = this.$confirm;
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      let tip = '';
      let statusFlag = null;
      if (type === 'examine') {
        component = this.$prompt;
        tip = '请输入审核意见！'
        statusFlag = 1
      } else if (type === 'close') {
        tip = '确定要关闭吗?';
        statusFlag = 4
      } else if (type === 'delete') {
        tip = '确定要删除吗?';
        statusFlag = 9
      }

      //请求配置
      let submit = () => inBillUpdateStatus({
        inWarehouseBillId: this.$route.query.id,
        statusFlag,
      }).then(res => {
        if (res.success) {
          if (type === 'delete') {
            this.$message({
              type: 'success',
              message: '操作成功,即将跳转到列表页！',
              duration: 1500,
              onClose: () => {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path: `/warehousing/businessorder`,
                  })
                }).catch(err => {
                  console.error(err)
                })
              }
            })
          } else {
            this.$message({ type: 'success', message: '操作成功' });
            this.inbilldetailApi()
          }
        }
      }).catch(err => {
        console.error(err)
      })

      //对话配置
      component(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        submit()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    //关闭弹框
    printing() {
      this.printingVisible = true;
      inbillPrint(this.$route.query.id).then(res => {
        if (res.success) {
          this.baseData = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    handleClose() {
      this.printingVisible = false;
    },
    surePrinting() {
      let printContainer = document.getElementById('invoice').innerHTML;
      MakePrint(printContainer);
      this.printingVisible = false;
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog__body {
  padding-top: 12px;
}
</style>
