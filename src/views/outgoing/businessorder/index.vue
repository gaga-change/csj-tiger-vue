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
            ref="ruleForm"
            :model="ruleForm"
            size="mini"
            label-width="70px"
            label-position="left"
            class="demo-form-inline"
          >
            <el-col
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="业务类型"
                prop="busiBillType"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.busiBillType"
                  placeholder="请选择业务类型"
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
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="业务单号"
                prop="billNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.billNo"
                  placeholder="请输入业务单号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="合同编号"
                prop="contractNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.contractNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入合同编号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col
              :span="6"
              style="min-width:300px"
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
              :span="6"
              style="min-width:300px"
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
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="单据状态"
                prop="billStatus"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.billStatus"
                  placeholder="请选择单据状态"
                >
                  <el-option
                    v-for="item in outBillStatusEnum"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="执行状态"
                prop="billState"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.billState"
                  placeholder="请选择执行状态"
                >
                  <el-option
                    v-for="item in outBillStateEnum"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label-width="80px"
                label="外部订单号"
                prop="busiBillNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.busiBillNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入外部订单号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划状态">
                <el-select
                  v-model="ruleForm.planStatusList"
                  placeholder="请选择计划状态"
                  @change="submitForm('ruleForm')"
                  multiple
                >
                  <el-option
                    v-for="item in planStatusList"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="制单日期"
                prop="time"
              >
                <el-date-picker
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
                  size="mini"
                  @click="submitForm('ruleForm')"
                >查询</el-button>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resetForm('ruleForm')"
                >重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </div>

    <div class="operationitem">
      <PopoverBtn
        @onOk="oprateBatch('add')"
        text="确定批量创建计划单吗？"
        :loading="batchLoading"
      >批量创建计划单</PopoverBtn>
      <PopoverBtn
        @onOk="oprateBatch('check')"
        text="确定批量审核吗？"
        :loading="batchLoading"
      >批量审核</PopoverBtn>
      <PopoverBtn
        @onOk="oprateBatch('del')"
        text="确定批量删除吗？"
        :loading="batchLoading"
      >批量删除</PopoverBtn>
      <router-link :to="`/outgoing/businessorderadd?type=add&time=${moment().valueOf()}`">
        <el-button
          type="primary"
          size="mini"
        >新建出库业务单</el-button>
      </router-link>
      <upload-excel
        style="margin:0 10px"
        @uploadRes="uploadRes"
        :name="'file'"
        :importText="'批量导入出库业务单'"
        :modelUrl="'/static/templet/outgoingTemp.xlsx'"
        :filesuploadUrl="'/webApi/out/bill/import/batch'"
      ></upload-excel>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      ref="listTable"
      row-key="billNo"
      @selection-change="selectionChange"
      size="mini"
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
          <span v-if="column.type === 'index'">{{ scope.$index + 1 }}</span>
          <span v-else-if="column.type === 'time' && scope.row[column.prop]">{{
            scope.row[column.prop] | parseTime
            }}</span>
          <span v-else-if="column.useLocalEnum && column.type">{{
            scope.row[column.prop] | localEnum(column.type)
            }}</span>
          <span v-else-if="column.useApi && column.type">{{
            scope.row[column.prop] | apiEnum(mapConfig, column.type)
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
              :to="`/outgoing/businessorder-detail?id=${scope.row.id}`"
              class="tableLink"
            >查看</router-link>
            <router-link
              v-if="[0,2].includes(scope.row.billStatus) && scope.row.busiBillType!=23"
              :to="`/outgoing/businessorderadd?type=modify&id=${scope.row.id}&time=${moment().valueOf()}`"
              class="tableLink"
            >修改</router-link>
            <router-link
              v-if="(scope.row.billStatus === 1 && scope.row.billState !== 8) && scope.row.busiBillType!=23"
              :to="`/outgoing/businessorderadd?type=revision&id=${scope.row.id}&time=${moment().valueOf()}`"
              class="tableLink"
            >调整</router-link>
            <router-link
              v-if="(scope.row.billStatus === 1 && scope.row.planOutQty > scope.row.planOutQtyForPlan && scope.row.billState !== 8 && !scope.row.billNo.includes('DB')) && scope.row.busiBillType!=23"
              :to="`/outgoing/businessorderAddPlanOrder?id=${scope.row.id}&time=${moment().valueOf()}`"
              class="tableLink"
            >创建计划单</router-link>
            <span
              v-if="[0,2].includes(scope.row.billStatus)&& scope.row.busiBillType!=23"
              class="tableLink"
              @click="operation(scope.row,'outBillCheck','请输入审核意见 !')"
            >审核</span>
            <span
              v-if="[0,2,4].includes(scope.row.billStatus) && scope.row.busiBillType!=23"
              class="tableLink"
              @click="operation(scope.row,'outBillDelete','确定要删除吗 ?')"
            >删除</span>
            <span
              v-if="[0,2,1].includes(scope.row.billStatus) && scope.row.busiBillType!=23"
              class="tableLink"
              @click="operation(scope.row,'outBillClose','确定要关闭吗 ?')"
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
  </div>
</template>

<script>
import { outBillList } from '@/api'
import { outBillCheck, outBillClose, outBillCheckBatch, outBillDeleteBatch, outBillAddBatch } from '@/api/outgoing'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
import { indexTableConfig } from './config';
import { operation } from './conpoments/lib';
import moment from 'moment';
import { outBillStatusEnum, outBillStateEnum, planStatusList } from "@/utils/enum.js";
export default {
  name: 'outgoing-businessorder-index',
  components: { BaseTable },
  data() {
    return {
      ruleForm: {
        busiBillType: '',
        busiBillNo: '',
        ownerCode: '',
        arrivalName: '',
        contractNo: '',
        pageNum: 1,
        pageSize: 10,
        billNo: undefined,
        planStatusList: [0, 1]
      },
      total: 0,
      tableConfig: indexTableConfig,
      loading: false,
      tableData: [{}],
      outBillStatusEnum,
      outBillStateEnum,
      planStatusList,
      selectionList: [],
      batchLoading: false,
      t: null,
      originbillNo: null,
    }
  },

  mounted() {
    this.t = this.$route.query.t
    this.originbillNo = this.$route.query.billNo
    if (!this.originbillNo) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.$set(this.ruleForm, 'time', [start, end])
    } else {
      this.$set(this.ruleForm, 'time', [])
    }
    this.ruleForm.billNo = this.originbillNo ? this.originbillNo : null
    this.getCurrentTableData()
  },

  watch: {
    $route(val) {
      // 根据路由变化，判断是否要刷新页面
      if (val.name === 'outgoing-businessorder-index') {
        if ((val.query.t !== this.t) || (val.query.billNo !== this.originbillNo)) {
          this.t = val.query.t
          this.originbillNo = val.query.billNo
          if (!this.originbillNo) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            this.$set(this.ruleForm, 'time', [start, end])
          } else {
            this.$set(this.ruleForm, 'time', [])
          }
          this.ruleForm.billNo = this.originbillNo ? this.originbillNo : null
          this.getCurrentTableData()
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },

  methods: {
    moment,
    operation,
    oprateBatch(type) {
      if (!this.selectionList.length) {
        this.$message.info('请勾选相关业务单！')
        return
      }
      const Methods = {
        check: outBillCheckBatch,
        del: outBillDeleteBatch,
        add: outBillAddBatch
      }
      const Filters = {
        check: item => item.billStatus === 0,
        del: item => item.billStatus === 0,
        add: item => item.billStatus === 1 && item.planOutQty > item.planOutQtyForPlan
      }
      const items = this.selectionList.filter(Filters[type])

      // 清除不符合条件的选项
      this.$refs.listTable.clearSelection()
      items.map(row => {
        this.$refs.listTable.toggleRowSelection(row)
      })

      const ids = items.map(item => item.id)
      if (!ids.length) {
        this.$message.warning('没有符合条件的项！')
        return
      }
      this.batchLoading = true
      Methods[type](ids).then(res => {
        this.batchLoading = false
        if (res.success) {
          let showmessage = (res.data ? res.data : '操作成功！')
          this.$message({
            message: showmessage,
            type: 'success',
            duration: 5000
          })
          // this.$message.success(showmessage)
          this.$refs.listTable.clearSelection()
          this.getCurrentTableData()
        }
      }).catch(err => {
        this.batchLoading = false
      })
    },
    selectionChange(val) {
      this.selectionList = val
    },
    uploadRes(result) {
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
      this.ruleForm.planStatusList = []
      this.ruleForm = { ...this.ruleForm, pageSize: 10, pageNum: 1 }
      this.getCurrentTableData()
    },

    timeChange(value) {
      this.ruleForm = { ...this.ruleForm, time: value };
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
            let arr = timeArr.map(v => moment(v).valueOf());
            if (arr.every(v => v) && arr.length > 1) {
              json['createTimeFrom'] = arr[0];
              json['createTimeTo'] = arr[1];
            }
          } else {
            json[i] = this.ruleForm[i]
          }
        }
      }
      let data = { ...json, fromSystemId: 'TIGER' }
      outBillList(data).then(res => {
        this.loading = false;
        if (!res) return
        let data = res.data;
        this.tableData = data.list || [];
        this.total = data.total;
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
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
.operationitem {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
}
</style>
