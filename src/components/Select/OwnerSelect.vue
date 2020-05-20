<template>
  <el-select
    :value="val"
    @change="handleChange"
    filterable
    size="mini"
    placeholder="请选择"
  >
    <el-option
      value=""
      v-if="mapConfig['billOwnerInfoMap']&&mapConfig['billOwnerInfoMap'].length"
      :disabled="true"
    >
      <div class="OwnerSelect_providerList">
        <span>货主编号</span>
        <span>货主名称</span>
      </div>
    </el-option>
    <el-option
      v-for="item in mapConfig['billOwnerInfoMap']"
      :key="item.key"
      :label="item.value"
      :value="item.key"
    >
      <div class="OwnerSelect_providerList">
        <span>{{ item.key }}</span>
        <span>{{ item.value }}</span>
      </div>
    </el-option>
  </el-select>

</template>

<script>
import { asiaOrganizeList } from '@/api'
import { mapGetters } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: String,
    name: String,
  },
  data() {
    return {
      loading: true,
      val: undefined,
    }
  },
  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
    }),
  },
  watch: {
    mapConfig(val) {
      this.init()
    }
  },
  created() {
    // this.val = undefined
  },
  methods: {
    init() {
      if (!this.mapConfig['billOwnerInfoMap']) {
        console.error('OwnerSelect： 枚举 【billOwnerInfoMap】 不存在')
        return
      }
      let temp = this.mapConfig['billOwnerInfoMap'].find(item => item.key === this.value)
      this.val = temp && temp.key
      this.$emit('update:name', temp && temp.value)
    },
    handleChange(v) {
      let temp = this.mapConfig['billOwnerInfoMap'].find(item => item.key === v)
      this.val = v
      this.$emit('update', v)
      this.$emit('update:name', temp && temp.value)
    }
  }
}
</script>

<style lang="scss">
.OwnerSelect_providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
</style>