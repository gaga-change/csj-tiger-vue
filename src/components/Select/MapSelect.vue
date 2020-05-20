<template>
  <el-select
    :value="val"
    @change="handleChange"
    placeholder="请选择"
    clearable
    :loading="loading"
  >
    <el-option
      v-for="item in mapConfig[map]"
      :key="item.key"
      :label="item.value"
      :value="item.key"
    ></el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: Number,
    map: String,
    name: String,
  },
  data() {
    return {
      val: undefined,
    }
  },
  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
    }),
    loading() {
      return this.mapConfig.loading
    }
  },
  watch: {
    mapConfig(val) {
      if (val.loading === true) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      const map = this.map
      if (!this.mapConfig[map]) {
        console.error(`MapSelect: 【${map}】枚举不存在`)
      } else if (this.value === undefined || this.value === null) {
        this.$emit('update:name', '')
      } else {
        let temp = this.mapConfig[map].find(v => v.key === this.value)
        if (temp) {
          this.val = this.value
        } else {
          this.$emit('update', undefined)
        }
        this.$emit('update:name', temp && temp.value)
      }

    },
    handleChange(v) {
      const map = this.map
      this.val = v
      let temp = this.mapConfig[map].find(item => item.key === v)
      this.$emit('update', v)
      this.$emit('update:name', temp && temp.value)
    }
  }
}
</script>