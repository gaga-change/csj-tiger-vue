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
            label-position="left"
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
                label="合同号"
                prop="contractNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.contractNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入合同号"
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
                label="计划仓库"
                prop="planWarehouseName"
              >

                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.planWarehouseName"
                  placeholder="请选择计划仓库"
                >
                  <el-option
                    v-for="(item,index) in mapConfig['getWarehouse']"
                    :label="item.value"
                    :key="index"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model.lazy.trim="ruleForm.planWarehouseName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请选择计划仓库"></el-input> -->
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
              <el-form-item label="单据状态">
                <el-select
                  v-model="ruleForm.planState"
                  placeholder="请选择单据状态"
                >
                  <el-option
                    v-for="item in warehousingPlanBillStatus"
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
            >
              <el-form-item
                label="挂起类型"
                prop="hangUpType"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.hangUpType"
                  placeholder="请选择挂起类型"
                >
                  <el-option
                    v-for="item in hangUpTypeEnum"
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
            >
              <el-form-item
                label="推送状态"
                prop="issuedState"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.issuedState"
                  placeholder="请选择推送状态"
                >
                  <el-option
                    v-for="item in pushState"
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
            >
              <el-form-item
                label="执行状态"
                prop="execStatus"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.execStatus"
                  placeholder="请选择执行状态"
                >
                  <el-option
                    v-for="item in mapConfig['getExecState']"
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
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="打印状态"
                prop="isPrint"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.isPrint"
                  placeholder="请选择打印状态"
                >
                  <el-option
                    v-for="item in printState"
                    :label="item.value"
                    :key="item.key"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="计划出库日期"
                prop="time"
                label-width="100px"
              >
                <el-date-picker
                  v-model="ruleForm.time"
                  @change="timeChange"
                  :picker-options="$pickerOptions"
                  type="daterange"
                  start-placeholder="开始"
                  end-placeholder="结束"
                  size="mini"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="创建日期"
                prop="time"
                label-width="60px"
              >
                <el-date-picker
                  v-model="ruleForm.createtime"
                  @change="createChange"
                  :picker-options="$pickerOptions"
                  type="daterange"
                  start-placeholder="开始"
                  end-placeholder="结束"
                  size="mini"
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
      <PopoverBtn
        @onOk="oprateBatch('plancheck')"
        text="确定批量审核吗？"
        :loading="batchLoading"
      >批量审核</PopoverBtn>
      <a :href="`/webApi/out/plan/export?${stringify(this.linkData)}`">
        <el-button
          type="primary"
          size="mini"
        >导出Excel</el-button>
      </a>
      <el-button
        type="primary"
        size="small"
        @click="printing"
        class="ml10"
      >打印出库计划单</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      ref="listTable"
      row-key="id"
      @selection-change="selectionChange"
      size="small"
      border
    >
      <el-table-column
        fixed="left"
        :reserve-selection="true"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        v-for="(column, index) in tableConfig"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span
            v-if="column.prop === 'hangUpType' && scope.row[column.prop]"
            class="c-red"
          >
            {{
            scope.row[column.prop] | localEnum(column.type)
            }}
          </span>
          <span v-else-if="column.type === 'index'">{{ scope.$index + 1 }}</span>
          <span v-else-if="column.type === 'time' && scope.row[column.prop]">{{
            scope.row[column.prop] | parseTime
            }}</span>
          <span v-else-if="column.useLocalEnum && column.type">{{
            scope.row[column.prop] | localEnum(column.type)
            }}</span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="260"
        fixed="right"
      >
        <template slot-scope="scope">
          <div class="tableLinkBox">
            <router-link
              :to="`/outgoing/plan-detail?planCode=${scope.row.planCode}`"
              class="tableLink"
            >查看</router-link>
            <router-link
              v-if="(scope.row.planState === 0 || scope.row.planState === 1) || scope.row.issuedState===7"
              :to="`/outgoing/out-plan-modify?id=${scope.row.id}&planCode=${scope.row.planCode}`"
              class="tableLink"
            >修改</router-link>
            <router-link
              v-if="scope.row.isCreate"
              :to="`/reply/newreceiptorder?planCode=${scope.row.planCode}&time=${Date.now()}`"
              class="tableLink"
            >创建回单</router-link>
            <router-link
              v-if="scope.row.isHandOut"
              :to="`/outgoing/plan-detail?planCode=${scope.row.planCode}&history=${true}`"
              class="tableLink"
            >手工出库</router-link>
            <span
              v-if="scope.row.isReceive"
              class="tableLink"
              @click="receivingRegistration(scope.row)"
            >收货登记</span>
            <span
              v-if="scope.row.issuedState===7"
              class="tableLink"
              @click="deleteItem(scope.row.planCode,scope.row.billNo)"
            >删除</span>
            <span
              v-if="scope.row.planState === 0 || scope.row.planState === 1"
              class="tableLink"
              @click="closePlan(scope.row)"
            >关闭</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="ruleForm.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="ruleForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
import { outPlanSelect, outPlanCheckBatch, outPlanClose, planOrderPrint, outPlandelete } from '@/api/outgoing'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
import { indexTableConfig, manual_config, printingTable_config } from './config';
import { warehousingPlanBillStatus, hangUpTypeEnum, pushState } from "@/utils/enum.js";
import editTable from '@/components/Table/editTable';
import { stringify } from 'qs';
import { MakePrint } from '@/utils'
import Invoice from './listinvoice'
export default {
  name: 'outgoing-plan-index',
  components: { BaseTable, editTable, Invoice },
  data() {
    return {
      ruleForm: {
        busiBillType: '',
        busiBillNo: '',
        planCode: '',
        arrivalName: '',
        ownerCode: '',
        contractNo: '',
        planWarehouseName: '',
        time: [],
        execStatus: '',
        pageNum: 1,
        pageSize: 10,
        hangUpType: '',
        issuedState: '',
        createtime: [],
        gmtCreateTo: null,
        gmtCreateFrom: null
      },
      total: 0,
      rules: {},
      loading: false,
      tableData: [],
      tableConfig: indexTableConfig,
      warehousingPlanBillStatus,
      hangUpTypeEnum,
      pushState,
      linkData: '',
      batchLoading: false,
      selectionList: [],
      printingVisible: false,
      printingTable_data: {},
      printingTable_config,
      printState: [{ key: 0, value: '否' }, { key: 1, value: '是' }]
    }
  },

  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.$set(this.ruleForm, 'time', [start, end])
    this.getCurrentTableData();

  },

  computed: {
  ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    })
  },

  methods: {
    stringify,
    /** 关闭计划单 */
    closePlan(row) {
      const { planCode } = row
      this.$confirm('此操作将关闭该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        outPlanClose(planCode).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '关闭成功!'
            })
          }
          this.getCurrentTableData()
        }).catch(err => {
          this.getCurrentTableData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭'
        })
      })
    },
    oprateBatch(type) {
      if (!this.selectionList.length) {
        this.$message.info('请勾选相关计划单！')
        return
      }
      const Methods = {
        plancheck: outPlanCheckBatch
      }
      const Filters = {
        plancheck: item => item.planState === 0 || item.planState === 1
      }
      const items = this.selectionList.filter(Filters[type])

      // 清除不符合条件的选项
      this.$refs.listTable.clearSelection()
      items.map(row => {
        this.$refs.listTable.toggleRowSelection(row)
      })

      const codes = items.map(item => item.planCode)
      if (!codes.length) {
        this.$message.warning('没有符合条件的项~')
        return
      }
      this.batchLoading = true
      Methods[type](codes).then(res => {
        this.batchLoading = false
        if (res.success) {
          this.$message.success('操作成功~')
          this.$refs.listTable.clearSelection()
          this.getCurrentTableData()
        }
      }).catch(err => {
        this.batchLoading = false
        console.error(err)
      })
    },
    selectionChange(val) {
      this.selectionList = val
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

    receivingRegistration(row) {
      this.$store.dispatch('setLocalmenu', '仓储运营')
      let receivePath = `/provider/add?id=${row.id}&planCode=${row.planCode}&time=${moment().valueOf()}`
      this.$router.push(receivePath)
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = { ...this.ruleForm, pageSize: 10, pageNum: 1 }
      this.ruleForm.createtime = []
      this.getCurrentTableData()
    },

    timeChange(value) {
      this.ruleForm = { ...this.ruleForm, time: value };
      this.getCurrentTableData()
    },
    createChange(value) {
      this.ruleForm = { ...this.ruleForm, createtime: value };
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
        if (this.ruleForm[i] !== undefined && this.ruleForm[i] !== '' && this.ruleForm[i] !== null) {
          if (i === 'time') {
            let arr = this.ruleForm[i].map(v => moment(v).valueOf());
            if (arr.every(v => v) && arr.length > 1) {
              json['planTimeFrom'] = arr[0];
              json['planTimeTo'] = arr[1];
            }
          } else if (i === 'createtime') {
            let arr = this.ruleForm[i].map(v => moment(v).valueOf());
            if (arr.every(v => v) && arr.length > 1) {
              json['gmtCreateFrom'] = arr[0];
              json['gmtCreateTo'] = arr[1];
            }
          } else {
            json[i] = this.ruleForm[i]
          }

        }
      }
      let data = { ...json }
      this.linkData = data;
      outPlanSelect(data).then(res => {
        if (res.success) {
          let data = res.data;
          this.tableData = data.list || [];
          this.total = data.total;
        }
        this.loading = false;

      }).catch(err => {
        this.loading = false;
      })
    },
    printing() {
      if (!this.selectionList.length) {
        return this.$message.warning(`请勾选出库计划单进行打印！`)
      }
      this.printingVisible = true;
      this.printingTable_data = [...this.selectionList]
    },
    handleClose() {
      this.printingVisible = false;
    },
    surePrinting() {
      let printContainer = document.getElementById('invoice').innerHTML;
      MakePrint(printContainer);
      this.printingVisible = false;
      this.afterPrint()
    },
    afterPrint() {
      this.$confirm('是否已成功打印?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'info'
      }).then(() => {
        planOrderPrint(this.selectionList.map(v => v.id)).then(res => {
          this.selectionList = []
          this.$refs.listTable.clearSelection()
        })
        this.getCurrentTableData()
      }).catch(() => {
      })
    },
    deleteItem(planCode,billNo) {
      const that=this
      const deletebillNo=billNo
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        outPlandelete(planCode).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$confirm('是否跳转至原业务单?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$store.dispatch('delVisitedViews', view[0]).then(() => {
                that.$router.push({
                  path: `/outgoing/businessorder`,
                  query: { billNo: deletebillNo }
                })
              }).catch(err => {
              })
            }).catch(() => {
             this.getCurrentTableData()
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped="">
.outgoing-quiry-container {
  .routerLink {
    color: #3399ea;
    white-space: nowrap;
    margin-right: 10px;
    cursor: pointer;
  }
}
.tableLinkBox {
  display: flex;
  .tableLink {
    cursor: pointer;
    color: #3399ea;
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
