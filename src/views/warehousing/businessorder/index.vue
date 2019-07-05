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
          >
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
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
                label="供应商名称"
                label-width="72px"
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
                label="货主电话"
                prop="linkTel"
              >
                <el-input
                  v-model.lazy.trim="ruleForm.linkTel"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入货主电话"
                ></el-input>
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
                  v-model="ruleForm.billStatus"
                  placeholder="请选择单据状态"
                >
                  <el-option
                    v-for="item in misWarehousingBillStatusEnum"
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
              <el-form-item label="执行状态">
                <el-select
                  v-model="ruleForm.billState"
                  placeholder="请选择执行状态"
                >
                  <el-option
                    v-for="item in misWarehousingBillStateEnum"
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
      <router-link :to="`/warehousing/businessorderadd?type=add&time=${moment().valueOf()}`">
        <el-button
          type="primary"
          size="mini"
        >新建入库业务单</el-button>
      </router-link>
      <upload-excel
        style="margin:0 10px"
        @uploadRes="uploadRes"
        :name="'file'"
        :importText="'批量导入入库业务单'"
        :modelUrl="'/static/templet/warehousingTemp.xlsx'"
        :filesuploadUrl="'/webApi/in/bill/import/batch'"
      ></upload-excel>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      row-key="billNo"
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
              :to="`/warehousing/businessorder-detail?id=${scope.row.id}`"
              class="tableLink"
            >查看</router-link>
            <template v-if="[0,2].includes(scope.row.billStatus)">
              <span
                class="tableLink"
                @click="operation('examine', scope.row)"
              >审核</span>
              <span
                class="tableLink"
                @click="operation('close', scope.row)"
              >关闭</span>
              <span
                class="tableLink"
                @click="operation('delete', scope.row)"
              >删除</span>
              <router-link
                :to="`/warehousing/businessorderadd?id=${scope.row.id}&time=${moment().valueOf()}`"
                class="tableLink"
              >修改</router-link>
            </template>
            <router-link
              v-if="scope.row.billStatus === 1 && scope.row.planInQty > scope.row.planInQtyForPlan"
              :to="`/warehousing/warehousingAddPlanOrder?id=${scope.row.id}&time=${moment().valueOf()}`"
              class="tableLink"
            >创建计划单</router-link>
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
import { inBillSelect, inBillUpdateStatus, batchInBill, batchAdd } from '@/api/warehousing'
import { misWarehousingBillStatusEnum, misWarehousingBillStateEnum } from "@/utils/enum.js";
import { getBillType, getExecState } from '@/api/map'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
import { indexTableConfig } from './config';

const validatorLinkTel = (rule, value, callback) => {
  if (value == undefined || value == '' || /^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确格式的号码'));
  }
};

export default {
  name: 'warehousing-businessorder-index',
  components: { BaseTable },
  data() {
    return {
      ruleForm: {
        busiBillType: '',
        busiBillNo: '',
        ownerCode: '',
        providerName: '',
        contractNo: '',
        linkTel: '',
        pageNum: 1,
        pageSize: 10,
        time: ''
      },
      total: 0,
      rules: {
        linkTel: [
          { required: false, validator: validatorLinkTel, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
      },
      loading: false,
      tableData: [],
      tableConfig: indexTableConfig,
      misWarehousingBillStatusEnum,
      misWarehousingBillStateEnum,
      selectionList: [],
      batchLoading: false,
      t: null,
    }
  },

  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.$set(this.ruleForm, 'time', [start, end])
    this.getCurrentTableData();
    this.t = this.$route.query.t
  },

  watch: {
    $route(val) {
      // 根据路由变化，判断是否要刷新页面
      if (val.name === 'warehousing-businessorder-index') {
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
    ])
  },

  methods: {
    moment,
    oprateBatch(type) {
      if (!this.selectionList.length) {
        this.$message.info('请勾选相关业务单！')
        return
      }
      const Methods = {
        del: batchInBill,
        check: batchInBill,
        add: batchAdd
      }
      const Filters = {
        check: item => item.billStatus === 0,
        del: item => item.billStatus === 0,
        add: item => item.billStatus === 1 && item.planInQty > item.planInQtyForPlan
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
      const postData = {
        check: {
          statusFlag: 1,
          inWarehouseBillIdList: ids
        },
        del: {
          statusFlag: 9,
          inWarehouseBillIdList: ids
        },
        add: [...ids]
      }
      this.batchLoading = true
      Methods[type](postData[type]).then(res => {
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
    selectionChange(val) {
      this.selectionList = val
    },
    uploadRes(result) {
      this.getCurrentTableData()
    },
    operation(type, row) {
      let component = this.$confirm;
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
        inWarehouseBillId: row.id,
        statusFlag,
      }).then(res => {
        if (res.success) {
          this.$message({ type: 'success', message: '操作成功' });
          this.getCurrentTableData()
        } else {
          this.$message.error('操作失败')
        }
      }).catch(err => {
        this.$message.error('操作失败')
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
      let data = { ...json }
      inBillSelect(data).then(res => {
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
