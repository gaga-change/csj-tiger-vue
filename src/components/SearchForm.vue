<template>
  <div>
    <el-card
      class="simpleCard"
      shadow="never"
      body-style="padding:12px"
    >
      <el-form
        :model="searchForms"
        :rules="searchRules"
        ref="searchForm"
        :label-width="labelWidth+'px'"
        :inline="true"
      >
        <el-form-item
          v-for="(item,index) in config"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : undefined"
        >
          <template v-if="item.type === 'enum'">
            <el-select
              v-model="searchForms[item.prop]"
              clearable
              filterable
              :placeholder="`请选择${item.label}`"
              @change="hanldeSubmit"
              size="mini"
            >
              <el-option
                v-for="(item, index) in mapConfig[item.enum]"
                :key="index"
                :label="item.value"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="searchForms[item.prop]">
              <el-radio
                :label="v.value"
                v-for="v in mapConfig[item.radio]"
                :key="v.value"
              >{{v.name}}</el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'timeArea'">
            <el-date-picker
              size="mini"
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
          <template v-else-if="item.type==='numRange'">
            <el-input-number
              v-model="searchForms[item.props[0]]"
              controls-position="right"
              :min="0"
              placeholder="开始金额"
            ></el-input-number>至<el-input-number
              v-model="searchForms[item.props[1]]"
              controls-position="right"
              :min="searchForms[item.props[0]]"
              placeholder="结束金额"
            ></el-input-number>
          </template>
          <template v-else>
            <el-input
              style="width:178px;"
              type="text"
              size="mini"
              :placeholder="`请输入${item.label}`"
              v-model="searchForms[item.prop]"
            ></el-input>
          </template>
        </el-form-item>
        <el-form-item :style="btnInline ? '' : 'display: block'">
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    config: {
      type: Array,
      default: () => []
    },
    /** 搜索 label宽度 */
    labelWidth: {
      type: Number,
      default: 80
    },
    btnInline: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    inputItems() {
      return this.config.filter(v => !v.type)
    }
  },
  watch: {
    config(val) {
      this.bindKeys()
    }
  },
  data() {
    return {
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
      spanMap: {
        'timeArea': 16
      }
    }
  },
  computed: {
    configRange() {
      return this.config.filter(v => v.props)
    },
    ...mapGetters([
      'mapConfig'
    ]),
  },
  created() {
    this.bindKeys()
  },
  methods: {
    bindKeys() {
      const query = this.$route.query
      this.config.forEach(v => {
        if (v.default !== undefined && v.default !== null) {
          this.$set(this.searchForms, v.prop, v.default)
        } else {
          this.$set(this.searchForms, v.prop, undefined)
        }
        if (query[v.prop]) {
          let temp = query[v.prop]
          if (typeof temp === 'string') {
            if (/^\d+$/.test(temp)) {
              temp = Number(temp)
            }
          }
          this.$set(this.searchForms, v.prop, temp)
        }
      })
    },
    hanldeSubmit() {

      let searchForms = { ...this.searchForms }
      let nextStep = true
      // 获取需要解析的字段, 针对 范围型数据
      if (this.configRange.length) {
        this.configRange.forEach(({ prop, props, type }) => {
          let valArr = searchForms[prop]
          delete searchForms[prop]
          if (valArr && valArr.length === 2) {
            searchForms[props[0]] = new Date(valArr[0]).getTime()
            searchForms[props[1]] = new Date(valArr[1]).getTime()
          }
          if (type === 'numRange') {
            if (searchForms[props[0]] > searchForms[props[1]]) {
              this.$message.error('结束金额必须大于等于开始金额')
              nextStep = false
            }
          }
        })
      }
      if (!nextStep) {
        return
      }
      this.submitLoading = true
      Object.keys(searchForms).forEach(key => {
        if (searchForms[key] === null || searchForms[key] === '') {
          searchForms[key] = undefined
        }
      })
      this.$emit('search', this.paramsTrim(searchForms), () => {
        this.submitLoading = false
      })
    },
    hanldeResetForm() {
      this.resetLoading = true
      this.$refs['searchForm'].resetFields()
      this.config.forEach(v => {
        this.$set(this.searchForms, v.prop, undefined)
        if (v.type === 'numRange') {
          this.$set(this.searchForms, v.props[0], undefined)
          this.$set(this.searchForms, v.props[1], undefined)
        }
      })
      this.$nextTick(() => {
        this.$emit('search', this.paramsTrim(this.searchForms), () => {
          this.resetLoading = false
        })
      })
    },
    /** 对字符串进行 去空格操作 */
    paramsTrim(form) {
      let temp = { ...form }
      Object.keys(temp).forEach(key => {
        let val = temp[key]
        if (typeof val === 'string') {
          temp[key] = temp[key].trim()
        }
      })
      return temp
    }
  }
}
</script>
