<template>
  <el-select
    :value="val"
    @change="handleChange"
    placeholder="请选择"
    clearable
    :loading="loading"
  >
    <el-option
      v-for="item in dataList"
      :key="item.organizationCode"
      :label="item.organizationName"
      :value="item.organizationCode"
    ></el-option>
  </el-select>
</template>

<script>
import { asiaOrganizeList } from '@/api'
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: String,
  },
  data() {
    return {
      loading: true,
      val: undefined,
      dataList: []
    }
  },
  created() {
    this.dataList = []
    this.val = undefined
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      asiaOrganizeList({ pageNum: 1, pageSize: 9999 }).then(res => {
        this.loading = false
        if (!res) return
        this.dataList = res.data.list
        if (this.value) { // 初始化
          let temp = this.dataList.find(v => v.organizationCode === this.value)
          if (temp) {
            this.val = this.value
          } else {
            this.$emit('update', undefined)
            this.$emit('change', {})
          }
        }
      })
    },
    handleChange(v) {
      this.val = v
      let temp = this.dataList.find(item => item.organizationCode === v)
      this.$emit('update', v)
      this.$emit('change', temp)
    }
  }
}
</script>