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
      :key="item.billTypeCode"
      :label="item.billTypeName"
      :value="item.billTypeCode"
    ></el-option>
  </el-select>
</template>

<script>
import { asiaBillTypeList } from '@/api'
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: String,
    organizationCode: String, // 组织编码
    busiTypeCode: String,  // 业务类型编码，杂收：001 杂发：002 采购退 :003 调拨：004
  },
  data() {
    return {
      loading: true,
      val: undefined,
      dataList: []
    }
  },
  created() {
    this.init()
  },
  watch: {
    organizationCode() {
      this.init()
    },
  },
  methods: {
    init() {
      this.dataList = []
      this.val = undefined
      this.loading = true
      const { organizationCode, busiTypeCode } = this
      asiaBillTypeList({ pageNum: 1, pageSize: 9999, organizationCode, busiTypeCode }).then(res => {
        this.loading = false
        if (!res) return
        this.dataList = res.data.list
        if (this.value) { // 初始化
          let temp = this.dataList.find(v => v.billTypeCode === this.value)
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
      let temp = this.dataList.find(item => item.billTypeCode === v)
      this.$emit('update', v)
      this.$emit('change', temp)
    }
  }
}
</script>