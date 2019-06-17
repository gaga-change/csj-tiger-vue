<template lang="html">
  <el-popover
    placement="top"
    width="160"
    v-model="visible">
    <p>{{text}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onOk">确定</el-button>
    </div>
    <el-button type="primary" size="mini" class="mr10" slot="reference" :loading="loading" :disabled="loading">
      <slot></slot>
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'PopoverBtn',
  data() {
    return {
      visible: false
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '确定继续吗？'
    },
    btnText: {
      type: String
    }
  },
  methods: {
    onOk() {
      this.visible = false
      this.$emit('onOk')
    }
  }
}
</script>

<style lang="css">
</style>
