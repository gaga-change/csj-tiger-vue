<template>
  <div class="SearchFormComponents">
    <el-card
      class="simpleCard"
      shadow="never"
      body-style="padding:12px"
    >
      <el-form
        :model="searchForms"
        :rules="searchRules"
        ref="searchForm"
        label-width="80px"
        :inline="true"
      >
        <el-form-item
          v-for="(item,index) in config"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.type === 'input'">
            <el-input
              style="width:178px;"
              type="text"
              :placeholder="`请输入${item.label}`"
              v-model="searchForms[item.prop]"
            ></el-input>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="searchForms[item.prop]"
              clearable
              :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="item in selectEnums[item.prop]"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'selectMap'">
            <el-select
              v-model="searchForms[item.prop]"
              clearable
              :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="item in mapConfig[item.mapKey]"
                :label="item.value"
                :key="item.key"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type==='dateTimeRange'">
            <el-date-picker
              v-model="searchForms[item.prop]"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </template>
          <template v-else-if="item.type==='dateRange'">
            <el-date-picker
              v-model="searchForms[item.prop]"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'monthRange'">
            <el-date-picker
              v-model="searchForms[item.prop]"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :picker-options="monthPickerOptions"
            >
            </el-date-picker>
          </template>
          <template v-else>
            <div>
              配置文件异常，没有相应 【type = {{item.type}}】
            </div>
          </template>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label-width="0">
              <el-button
                size="mini"
                type="primary"
                @click="hanldeSubmit"
                :disabled="resetLoading"
                :loading="submitLoading"
              >查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="hanldeResetForm"
                :disabled="submitLoading"
                :loading="resetLoading"
              >重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as Enum from "@/utils/enum"
export default {
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    configRange() {
      return this.config.filter(v => v.props)
    },
    inputItems() {
      return this.config.filter(v => !v.type)
    },
    ...mapGetters([
      'mapConfig',
    ])
  },
  watch: {
    config(val) {
      this.bindKeys()
    }
  },
  data() {
    return {
      monthPickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      resetLoading: false,
      submitLoading: false,
      searchForms: {},
      searchRules: {},
      selectEnums: {},
    }
  },
  created() {
    this.bindKeys()
  },
  methods: {
    bindKeys() {
      this.config.forEach(v => {
        this.$set(this.searchForms, v.prop, undefined)
        switch (v.type) {
          case 'select':
            this.selectEnums[v.prop] = Enum[v.enum]
            break
          default:
            break
        }
      })
    },
    hanldeSubmit() {
      this.submitLoading = true
      let searchForms = { ...this.searchForms }
      // 获取需要解析的字段, 针对 范围型数据
      if (this.configRange.length) {
        this.configRange.forEach(({ prop, props }) => {
          let valArr = searchForms[prop]
          delete searchForms[prop]
          if (valArr && valArr.length === 2) {
            searchForms[props[0]] = new Date(valArr[0]).getTime()
            searchForms[props[1]] = new Date(valArr[1]).getTime()
          }
        })
      }
      this.$emit('search', searchForms, () => {
        this.submitLoading = false
      })
    },
    hanldeResetForm() {
      this.resetLoading = true
      this.$refs['searchForm'].resetFields()
      this.$emit('search', {}, () => {
        this.resetLoading = false
      })
    }
  }
}
</script>
<style lang="scss" >
.SearchFormComponents {
  .el-range-separator {
    box-sizing: content-box;
  }
}
</style>

