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
            size="small"
            label-width="70px"
            label-position="left"
            class="demo-form-inline"
          >
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
                label="调拨单号"
                prop="transferNo"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.transferNo"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入调拨单号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              style="min-width:300px"
            >
              <el-form-item
                label="单据状态"
                prop="transferStatus"
              >
                <el-select
                  @change="submitForm('ruleForm')"
                  v-model="ruleForm.transferStatus"
                  placeholder="请选择单据状态"
                >
                  <el-option
                    v-for="item in transferBillStatusEnum"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
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

    <div class="operationitem">
      <router-link :to="`/requisition/requisitionplanadd?type=add&time=${moment().valueOf()}`">
        <el-button
          type="primary"
          size="mini"
        >新建调度单</el-button>
      </router-link>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      ref="listTable"
      row-key="transferNo"
      size="small"
      border
    >
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
              :to="`/requisition/requisitionplan-detail?id=${scope.row.id}`"
              class="tableLink"
            >查看</router-link>
            <router-link
              v-if="[0].includes(scope.row.transferStatus)"
              :to="`/requisition/requisitionplanadd?type=modify&id=${scope.row.id}&time=${moment().valueOf()}`"
              class="tableLink"
            >修改</router-link>
            <span
              v-if="[0].includes(scope.row.transferStatus)"
              class="tableLink"
              @click="operation(scope.row,1,'确定要提交吗 ?')"
            >提交</span>
            <span
              v-if="[0,2].includes(scope.row.transferStatus)"
              class="tableLink"
              @click="operation(scope.row,9,'确定要删除吗 ?')"
            >删除</span>
            <!-- <span
              v-if="[0].includes(scope.row.transferStatus)"
              class="tableLink"
              @click="operation(scope.row,2,'确定要关闭吗 ?')"
            >关闭</span> -->
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
      v-if="total>ruleForm.pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
import { requisitionList } from '@/api/requisition'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
import { indexTableConfig } from './config';
import { operation } from './conpoments/lib';
import moment from 'moment';
import { transferBillStatusEnum } from "@/utils/enum.js";
export default {
  name: 'requisitionplan',
  components: { BaseTable },
  data() {
    return {
      ruleForm: {
        busitransferNo: '',
        ownerCode: '',
        arrivalName: '',
        contractNo: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableConfig: indexTableConfig,
      loading: false,
      tableData: [{}],
      transferBillStatusEnum,
      selectionList: [],
      batchLoading: false,
      t: null,
    }
  },

  mounted() {
    // const end = new Date();
    // const start = new Date();
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    // this.$set(this.ruleForm, 'time', [start, end])
    this.getCurrentTableData()
    this.t = this.$route.query.t
  },

  watch: {
    $route(val) {
      // 根据路由变化，判断是否要刷新页面
      if (val.name === 'requisitionplan') {
        if (val.query.t !== this.t) {
          this.t = val.query.t
          this.getCurrentTableData()
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])  },

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
        check: item => item.transferStatus === 0,
        del: item => item.transferStatus === 0,
        add: item => item.transferStatus === 1 && item.planOutQty > item.planOutQtyForPlan
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
          this.$message.success('操作成功！')
          this.$refs.listTable.clearSelection()
          this.getCurrentTableData()
        }
      }).catch(err => {
        this.batchLoading = false
      })
    },
    // selectionChange(val) {
    //   this.selectionList = val
    // },
    // uploadRes(result) {
    //   this.getCurrentTableData()
    // },
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
        if (this.ruleForm[i] !== undefined && this.ruleForm[i] !== '') {
          if (i === 'time') {
            const timeArr = this.ruleForm[i] || []
            let arr = timeArr.map(v => moment(v).valueOf());
            if (arr.every(v => v) && arr.length > 1) {
              json['gmtCreateBegin'] = arr[0];
              json['gmtCreateEnd'] = arr[1];
            }
          } else {
            json[i] = this.ruleForm[i]
          }
        }
      }
      let data = { ...json }
      requisitionList(data).then(res => {
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
