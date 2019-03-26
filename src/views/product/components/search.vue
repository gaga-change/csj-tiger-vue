<template lang="html">
  <el-card shadow="hover">
    <el-form :model="form" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品名称:" prop="skuName">
            <el-input
              type="text"
              v-model.trim="form.skuName"
              size="small"
              class="inputstyle"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌:" prop="brandName">
            <el-input
              type="text"
              v-model.trim="form.brandName"
              size="small"
              class="inputstyle"
              placeholder="请输入品牌"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格:" prop="skuFormat">
            <el-input
              type="text"
              v-model.trim="form.skuFormat"
              size="small"
              class="inputstyle"
              placeholder="请输入规格"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="货主:" prop="ownerCode">
            <el-select
              v-model="form.ownerCode"
              clearable
              size="small"
              placeholder="请选择货主"
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
        <el-col :span="8">
          <el-form-item label="分类:" prop="categoryCode">
            <choice-category @categorySubmit="categorySubmit" ref="categoryChoice"></choice-category>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间:" label-width="80px">
            <el-date-picker
              v-model="form.createDate"
              type="daterange"
              size="small"
              align="right"
              style="width:220px"
              ref="timepicker"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-button type="primary" size="small" @click="searchSubmit"
          >查询</el-button
        >
        <el-button size="small" @click="searchReset">重置</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import choiceCategory from './choiceCategory'
import { mapGetters } from 'vuex'
export default {
  components: { choiceCategory },
  data() {
    return {
      form: {
        skuName: '',
        brandName: '',
        skuFormat: '',
        ownerCode: '',
        categoryCode: '',
        createDate: []
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      needreset: false
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    categorySubmit(item) {
      this.form.categoryCode = item.currentCode
    },
    searchSubmit() {
      this.$emit('searchSubmit', this.form)
    },
    searchReset() {
      this.$refs['searchForm'].resetFields()
      this.form.categoryCode = ''
      this.$refs.categoryChoice.reset()
      this.$set(this.form, 'createDate', [])
    }
  }
}
</script>

<style lang="css" scoped>
.inputstyle {
  width: 220px;
}
</style>
