<template>
  <el-card shadow="hover">
    <el-form
      ref="searchForm"
      labelWidth="90px"
      :model="searchForm"
    >
      <el-row>
        <el-col
          :sm="12"
          :md="8"
          :lg="8"
          :xl="6"
        >
          <el-form-item
            label="承运商："
            prop="consoildatorCode"
          >
            <el-select
              v-model="searchForm.consoildatorCode"
              clearable
              placeholder="请选择承运商"
              size="mini"
              class="formitem"
            >
              <el-option
                v-for="item in consoil"
                :label="item.consoildatorName"
                :key="item.consoildatorCode"
                :value="item.consoildatorCode"
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
            label="配送单号："
            prop="dispatchNo"
            :rules="[{max:20, message:'最长20位', trigger: 'blur'}]"
          >
            <el-input
              v-model="searchForm.dispatchNo"
              placeholder="请输入配送单号"
              size="mini"
              class="formitem"
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
            label="物流单号："
            prop="logisticsOrderCode"
          >
            <el-input
              v-model="searchForm.logisticsOrderCode"
              placeholder="请输入物流单号"
              size="mini"
              class="formitem"
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
            label="制单日期："
            prop="orderDate"
          >
            <el-date-picker
              v-model="searchForm.orderDate"
              type="daterange"
              size="mini"
              unlink-panels
              class="formitem"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :sm="12"
          :md="8"
          :lg="8"
          :xl="6"
        >
          <el-form-item
            label="客户名称："
            prop="customerName"
          >
            <el-input
              v-model="searchForm.customerName"
              placeholder="请输入客户名称"
              size="mini"
              class="formitem"
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
            label="结算方式"
            prop="settlementType"
          >
            <el-select
              v-model="searchForm.settlementType"
              clearable
              placeholder="请选择结算方式"
              size="mini"
            >
              <el-option
                v-for="item in mapConfig['getSettlementType']"
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
            label="货主："
            prop="ownerCode"
          >
            <el-select
              v-model="searchForm.ownerCode"
              filterable
              clearable
              placeholder="请选择货主"
              size="mini"
              class="formitem"
            >
              <el-option
                v-for="item in mapConfig['ownerInfoMap']"
                :label="item.value"
                :key="item.key"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          @click="submit"
          type="primary"
        >查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    consoil: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchForm: {}
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    submit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.searchForm)
        }
      })
    },
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.searchForm = {}
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="css">
</style>
