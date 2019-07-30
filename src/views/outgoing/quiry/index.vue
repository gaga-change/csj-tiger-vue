<template>
  <div class="outgoing-quiry-container">
    <div style="marginBottom:12px">
      <el-card
        class="box-card"
        shadow="never"
        body-style="padding:12px 12px 0"
      >
        <el-row :gutter="16">
          <el-form
            :inline="true"
            :model="ruleForm"
            size="small"
            :rules="rules"
            ref="ruleForm"
            class="demo-form-inline"
            label-width="70px"
          >
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="出库类型"
                prop="busiBillType"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.busiBillType"
                  placeholder="请选择出库类型"
                >
                  <el-option
                    v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('出库'))"
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
            >
              <el-form-item
                label="业务单号"
                prop="billNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.billNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入业务单号"
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
                label="计划单号"
                prop="planCode"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.planCode"
                  @keyup.enter.native="submitForm('ruleForm')"
                  style="width:210px"
                  placeholder="请输入计划单号"
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
                label="出库单号"
                prop="warehouseExeCode"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.warehouseExeCode"
                  @keyup.enter.native="submitForm('ruleForm')"
                  style="width:210px"
                  placeholder="请输入出库单号"
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
                label="合同编号"
                prop="contractNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.contractNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  style="width:210px"
                  placeholder="请输入合同编号"
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
                label="客户名称"
                prop="arrivalName"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.arrivalName"
                  @keyup.enter.native="submitForm('ruleForm')"
                  style="width:210px"
                  placeholder="请输入客户名称"
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
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  clearable
                  v-model="ruleForm.ownerCode"
                  placeholder="请选择货主"
                >
                  <el-option
                    v-for="item in mapConfig['billOwnerInfoMap']"
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
            >
              <el-form-item
                label="业务板块"
                prop="busiPlate"
              >
                <el-select
                  v-model="ruleForm.busiPlate"
                  @change="submitForm('ruleForm')"
                  placeholder="请选择业务板块"
                >
                  <el-option
                    v-for="item in busiPlateConfig"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
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
                label="是否打印"
                prop="isPrint"
              >
                <el-select
                  v-model="ruleForm.isPrint"
                  @change="submitForm('ruleForm')"
                  placeholder="请选择业务板块"
                >
                  <el-option
                    v-for="item in printState"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
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
                label="外部订单号"
                prop="busiBillNo"
                labelWidth="85px"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.busiBillNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入外部订单号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="出库日期"
                prop="time"
              >
                <el-date-picker
                  style="minWidth:340px"
                  v-model="ruleForm.time"
                  @change="timeChange"
                  :picker-options="$pickerOptions"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item>
                <el-button
                  type="primary"
                  size="small"
                  @click="submitForm('ruleForm')"
                >查询</el-button>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  size="small"
                  @click="resetForm('ruleForm')"
                >重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </div>

    <div style="display: flex;justify-content: flex-end;margin-bottom:12px">
      <a :href="`/webApi/out/order/export?${stringify(this.linkData)}`">
        <el-button
          type="primary"
          size="small"
        >导出Excel</el-button>
      </a>
      <el-button
        type="primary"
        size="small"
        @click="printing"
        class="ml10"
      >发货清单打印</el-button>
      <el-button
        type="primary"
        size="small"
        @click="printFn"
        class="ml10"
      >发货清单打印FN</el-button>
    </div>

    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionPartentChange="selectionPartentChange"
      :loading="loading"
      :config="tableConfig"
      :total="total"
      :showMul="true"
      :maxTotal="10"
      :pageSize="ruleForm.pageSize"
      :currentPage="ruleForm.pageNum"
      :tableData="tableData"
    />

    <el-dialog
      title="打印发货清单"
      :visible.sync="printingVisible"
      width="841px"
      :before-close="handleClose"
    >
      <div
        id="invoice"
        class="scrolldiv"
      >
        <invoice
          v-for="invoice in printingTable_data"
          :data="invoice"
          :key="invoice.id"
          :config="printingTable_config"
        />
      </div>
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
import moment from 'moment';
import { outOrderSelect, outOrderPrint } from '@/api/outgoing'
import BaseTable from '@/components/Table'
import { indexTableConfig, printingTable_config } from './config';
import { mapGetters } from 'vuex'
import Invoice from './invoice'
import { MakePrint } from '@/utils'
import { stringify } from 'qs';
import { busiPlateConfig, printState } from '@/utils/enum'

export default {
  name: 'outgoing-quiry-index',
  components: { BaseTable, Invoice },
  data() {
    return {
      ruleForm: {
        busiBillType: '',
        busiBillNo: '',
        arrivalName: '',
        ownerCode: '',
        planCode: '',
        warehouseExeCode: '',
        contractNo: '',
        busiPlate: '',
        time: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      rules: {

      },
      printState,
      busiPlateConfig,
      loading: false,
      tableData: [],
      linkData: '',
      //打印项
      printingVisible: false,
      printingTable_data: {},
      printingTable_config,
      selectData: [],
    }
  },

  computed: {
    tableConfig() {
      const config = [...indexTableConfig]
      const oprateColumn = config.find(item => item.prop === 'oprate') || {}
      oprateColumn.dom = (row, column, cellValue, index) => {
        let view = <router-link to={{ path: '/outgoing/quiry-detail', query: { warehouseExeCode: row.warehouseExeCode } }} style={{ color: '#3399ea' }}>查看</router-link>
        if (row.settleUnit === 2) {
          view = <span><router-link to={{ path: '/outgoing/quiry-detail', query: { warehouseExeCode: row.warehouseExeCode } }} style={{ color: '#3399ea' }}>查看</router-link>
            <router-link to={{ path: '/outgoing/quiry-detail', query: { warehouseExeCode: row.warehouseExeCode, settleUnit: 2 } }} style={{ color: '#3399ea', marginLeft: '10px' }}>维护重量</router-link></span>
        }
        return view
      }
      return config
    },
    printTicketnos() {
      return this.selectData.map(item => item.warehouseExeCode).toString()
    },
    ...mapGetters([
      'mapConfig',
    ])
  },

  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.$set(this.ruleForm, 'time', [start, end])
    this.getCurrentTableData();
  },

  methods: {
    stringify,
    printFn() {
      if (this.printTicketnos) {
        window.open('http://bi.csjmro.com/WebReport/ReportServer?reportlet=csj/csjreport/mis/mis_delivery_BatchPrint.cpt&ticketno=' + this.printTicketnos, '_blank')
      } else {
        this.$message('请先选择要打印的单据~')
        return false
      }
    },
    selectionPartentChange(val) {
      this.selectData = val
    },
    printing() {
      if (!this.selectData.length) {
        return this.$message.warning(`请勾选出库记录进行打印！`)
      }
      this.printingVisible = true;
      this.printingTable_data = [...this.selectData]
    },
    //关闭弹框
    handleClose() {
      this.printingVisible = false;
    },
    surePrinting() {
      let printContainer = document.getElementById('invoice').innerHTML;
      MakePrint(printContainer);
      this.printingVisible = false;
      this.$confirm('是否已成功打印?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'info'
      }).then(() => {
        outOrderPrint(this.selectData.map(v => v.id))
        this.getCurrentTableData()
      }).catch(() => {
      })
    },
    timeChange(value) {
      this.ruleForm = { ...this.ruleForm, time: value };
      this.getCurrentTableData()
    },
    submitForm(formName) {
      this.ruleForm = { ...this.ruleForm, pageSize: 10, pageNum: 1 }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getCurrentTableData();
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = { ...this.ruleForm, pageSize: 10, pageNum: 1 }
      this.getCurrentTableData()
    },

    handleSizeChange(val) {
      this.ruleForm = { ...this.ruleForm, pageSize: val, pageNum: 1 }
      this.getCurrentTableData()
    },

    handleCurrentChange(val) {
      this.ruleForm = { ...this.ruleForm, pageNum: val }
      this.getCurrentTableData()
    },

    getCurrentTableData() {
      this.loading = true;
      let json = {};
      for (let i in this.ruleForm) {
        if (this.ruleForm[i] !== undefined && this.ruleForm[i] !== '') {
          if (i === 'time') {
            const timeArr = this.ruleForm[i] || []
            let arr = timeArr.map(v => moment(v).format('YYYY-MM-DD'));
            if (arr.every(v => v) && arr.length > 1) {
              json['outStoreBeginDate'] = arr[0];
              json['outStoreEndDate'] = arr[1];
            }
          } else {
            json[i] = this.ruleForm[i]
          }

        }
      }
      let data = { ...json }
      this.linkData = data;
      outOrderSelect(data).then(res => {
        if (res.success) {
          let data = res.data;
          this.tableData = data.list || [];
          this.total = data.total;
        }
        this.loading = false;

      }).catch(err => {
        this.loading = false;
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.outgoing-quiry-container {
  .tableTotal {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    span {
      font-size: 12px;
      color: #606266;
      &:nth-child(2n-1) {
        font-weight: 600;
      }
      &:nth-child(2n) {
        padding-right: 20px;
      }
    }
  }
}
.scrolldiv {
  height: 500px;
  overflow: scroll;
}
</style>
