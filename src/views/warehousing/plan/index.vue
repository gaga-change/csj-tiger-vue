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
                label="入库类型"
                prop="busiBillType"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.busiBillType"
                  placeholder="请选择入库类型"
                >
                  <el-option
                    v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('入库'))"
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
                label="制单人"
                prop="busiBillCreater"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.busiBillCreater"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入制单人"
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
                label="入库仓库"
                prop="planWarehouseCode"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.planWarehouseCode"
                  placeholder="请选择入库仓库"
                >
                  <el-option
                    v-for="(item,index) in mapConfig['getWarehouse']"
                    :label="item.value"
                    :key="index"
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
                label="供应商名称"
                label-width="78px"
                prop="providerName"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.providerName"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入供应商名称"
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
                  v-model="ruleForm.ownerCode"
                  clearable
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

            <el-col :span="16">
              <el-form-item
                label="计划入库日期"
                label-width="100px"
                prop="time"
              >
                <el-date-picker
                  :clearable="true"
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
      <PopoverBtn
        @onOk="oprateBatch('check')"
        text="确定批量审核吗？"
        :loading="batchLoading"
      >批量审核</PopoverBtn>
      <!-- <PopoverBtn @onOk="oprateBatch('reject')" text="确定批量驳回吗？" :loading="batchLoading">批量驳回</PopoverBtn> -->
      <a :href="`/webApi/in/plan/export?${stringify(this.linkData)}`">
        <el-button
          type="primary"
          size="mini"
        >导出Excel</el-button>
      </a>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      row-key="id"
      ref="listTable"
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
          <span v-if="column.type === 'index'">{{ scope.$index + 1 }}</span>
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
              :to="`/warehousing/plan-detail?planCode=${scope.row.planCode}`"
              class="tableLink"
            >查看</router-link>
            <router-link
              v-if="scope.row.planState === '0' || scope.row.planState === '1'"
              :to="`/warehousing/plan-modify?id=${scope.row.id}&planCode=${scope.row.planCode}`"
              class="tableLink"
            >修改</router-link>
            <router-link
              v-if="scope.row.operator === 1"
              :to="`/warehousing/plan-detail?planCode=${scope.row.planCode}&history=${true}`"
              class="tableLink"
            >手工入库</router-link>
            <span
              v-if="scope.row.planState === '0' || scope.row.planState === '1'"
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

  </div>
</template>

<script>
import moment from 'moment';
import { inPlanSelect, batchApprovePlan, inPlanClose } from '@/api/warehousing'
import BaseTable from '@/components/Table'
import { indexTableConfig } from './config';
import { warehousingPlanBillStatus } from "@/utils/enum.js";
import editTable from '@/components/Table/editTable';
import { mapGetters } from 'vuex'
import { stringify } from 'qs';
export default {
  name: 'warehousing-plan-index',
  components: { BaseTable, editTable },
  data() {
    return {
      ruleForm: {
        busiBillType: '',
        busiBillNo: '',
        busiBillCreater: '',
        planCode: '',
        planWarehouseCode: '',
        providerName: '',
        ownerCode: '',
        time: '',
        execStatus: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableConfig: indexTableConfig,
      warehousingPlanBillStatus,
      rules: {

      },
      loading: false,
      tableData: [],
      linkData: '',
      batchLoading: false,
      selectionList: []
    }
  },

  computed: {
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
    /** 关闭计划单 */
    closePlan(row) {
      const { planCode } = row
      this.$confirm('此操作将关闭该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        inPlanClose(planCode).then(res => {
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
        check: batchApprovePlan,
        reject: batchApprovePlan
      }
      const Filters = {
        check: item => item.planState === '1' || item.planState === '0',
        reject: item => item.planState === '1' || item.planState === '0'
      }
      const items = this.selectionList.filter(Filters[type])

      // 清除不符合条件的选项
      this.$refs.listTable.clearSelection()
      items.map(row => {
        this.$refs.listTable.toggleRowSelection(row)
      })

      const ids = items.map(item => item.planCode)
      if (!ids.length) {
        this.$message.warning('没有符合条件的项~')
        return
      }
      const postData = {
        check: {
          agree: 1,
          planCodeList: ids
        },
        reject: {
          agree: 0,
          planCodeList: ids
        }
      }
      this.batchLoading = true
      Methods[type](postData[type]).then(res => {
        console.log(res)
        this.batchLoading = false
        if (res.success) {
          this.$message.success('操作成功~')
          this.$refs.listTable.clearSelection()
          this.getCurrentTableData()
        }
      }).catch(err => {
        this.batchLoading = false
        console.log(err)
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

    resetForm(formName) {
      this.$refs[formName].resetFields();
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
        if (this.ruleForm[i] !== undefined && this.ruleForm[i] !== '' && this.ruleForm[i] !== null) {
          if (i === 'time') {
            const timeArr = this.ruleForm[i] || []
            let arr = timeArr.map(v => moment(v).valueOf());
            if (arr.every(v => v) && arr.length > 1) {
              json['planInTimeStart'] = arr[0];
              json['planInTimeEnd'] = arr[1];
            }
          } else {
            json[i] = this.ruleForm[i]
          }
        }
      }
      let data = { ...json }
      this.linkData = data;
      inPlanSelect(data).then(res => {
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

<style rel="stylesheet/scss" lang="scss" scoped>
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
.outgoing-quiry-container {
  .routerLink {
    color: #3399ea;
    white-space: nowrap;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
