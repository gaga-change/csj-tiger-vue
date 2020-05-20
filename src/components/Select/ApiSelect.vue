<template>
  <el-select
    :value="val"
    filterable
    @change="handleChange"
    :placeholder="placeholder"
    clearable
    :loading="loading"
  >
    <el-option
      v-for="item in dataList"
      :key="item[config[0]]"
      :label="item[config[1]]"
      :value="item[config[0]]"
    ></el-option>
  </el-select>
</template>

<script>
import * as api from '@/api'
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: String,
    api: String,
    config: Array,
    name: String,
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: true,
      val: undefined,
      dataList: [],
      oldParams: ''
    }
  },
  watch: {
    params(val) {
      if (JSON.stringify(val) !== this.oldParams) {
        this.init()
      }
    }
  },
  computed: {
    placeholder() {
      if (this.loading) {
        return '数据加载中...'
      }
      if (!this.dataList.length) {
        return '无相关数据'
      }
      return '请选择'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const config = this.config
      if (!api[this.api]) {
        console.error(`ApiSelect: 【${this.api}】不存在`)
        return
      }
      this.dataList = []
      this.val = undefined
      this.loading = true
      this.oldParams = JSON.stringify(this.params)
      api[this.api]({ pageNum: 1, pageSize: 9999, ...(this.params || {}) }).then(res => {
        this.loading = false
        if (!res) return
        if (Array.isArray(res.data)) {
          this.dataList = res.data
        } else {
          this.dataList = res.data.list
        }
        if (this.value) { // 初始化
          let temp = this.dataList.find(v => v[this.config[0]] === this.value)
          if (temp) {
            this.val = this.value
          } else {
            this.$emit('update', undefined)
          }
          this.$emit('update:name', temp && temp[config[1]])
        } else {
          this.$emit('update:name', '')
        }
      })
    },
    handleChange(v) {
      const config = this.config
      this.val = v
      let temp = this.dataList.find(item => item[this.config[0]] === v)
      this.$emit('update', v)
      this.$emit('update:name', temp && temp[config[1]])
    }
  }
}
</script>