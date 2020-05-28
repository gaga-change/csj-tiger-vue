<template>
  <el-cascader
    :show-all-levels="false"
    :clearable="true"
    :props="outBusiBillTypeCascaderProps"
    v-model="val"
    :placeholder="'请选择'"
    @change="change"
  ></el-cascader>
</template>
<script>
import { asiaOrganizeList, asiaBillTypeList } from '@/api'

export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: String,
    busiTypeCode: [String, Number]
  },
  watch: {
    value(newV, oldV) {
      if (oldV && !newV) { // 重置
        this.val = []
      }
    }
  },
  data() {
    const busiTypeCode = this.busiTypeCode
    return {
      outBusiBillTypeCascaderProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, } = node;
          if (level === 0) {
            asiaOrganizeList({ pageNum: 1, pageSize: 999 }).then(res => {
              if (!res) {
                resolve([])
              } else {
                const nodes = res.data.list.map(v => ({
                  value: v.organizationCode,
                  label: v.organizationName,
                  leaf: false,
                }))
                resolve(nodes)
              }
            })
          } else {
            asiaBillTypeList({ organizationCode: node.value, busiTypeCode }).then(res => {
              if (!res) {
                resolve([])
              } else {
                const nodes = res.data.list.map(v => ({
                  value: v.billTypeCode,
                  label: v.billTypeName,
                  leaf: true,
                }))
                resolve(nodes)
              }
            })
          }
          // setTimeout(() => {
          //   const nodes = Array.from({ length: level + 1 })
          //     .map(item => ({
          //       value: Math.random(),
          //       label: `选项${id}`,
          //       leaf: level >= 1
          //     }));
          //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          //   resolve(nodes);
          // }, 1000);
        }
      },
      val: []
    }
  },
  methods: {
    change(val) {
      console.log(val)
      this.$emit('update', val[1])
      this.$emit('change', val[1])
    }
  }
}
</script>