<template>
  <div>
    <el-form
      class="BaseForm"
      ref="searchForm"
      label-width="150px"
      :model="searchForm"
      :inline="true"
    >
      <el-form-item
        label="商品编码"
        prop="skuCode"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <div style="min-height: 28px;line-height: 28px;">
          <span>
            {{!!searchForm.skuCode ? searchForm.skuCode : ''}} <a
              href="JavaScript:void(0)"
              style="color:#409EFF;white-space: nowrap;"
              @click="showDialogTable"
            >选择商品</a>
          </span>
        </div>
      </el-form-item>

      <el-form-item
        label="商品名称:"
        prop="skuName"
      >
        <el-input
          v-model="searchForm.skuName"
          disabled
          placeholder="商品名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="数量:"
        prop="number"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <el-input
          v-model="searchForm.number"
          placeholder="请输入数量"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品供应商名称:">
        <el-input
          disabled
          v-model="searchForm.providerSkuName"
          placeholder="商品供应商名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品供应商编码:">
        <el-input
          disabled
          v-model="searchForm.providerSkuCode"
          placeholder="商品供应商编码"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="订货进价:"
        prop="purchasePrice"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <el-input
          v-model="searchForm.purchasePrice"
          placeholder="请输入订货进价"
        ></el-input>
      </el-form-item>
    </el-form>

    <div
      style="text-align:right"
      class="mr20"
    >
      <el-button @click="$emit('handleClose')">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </div>
    <el-dialog
      title="添加商品"
      :visible.sync="selectVisiable"
      width="80%"
      height="60%"
      destroy-on-close
      append-to-body
    >
      <select-sku
        :params="params"
        @select="selectChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import selectSku from './selectSkuIn'

export default {
  components: { selectSku },

  props: {
    searchForm: {
      type: Object,
      default: () => ({})
    },
    params: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      selectVisiable: false,
    }
  },

  methods: {
    selectChange(record) {
      this.selectVisiable = false
      this.skuCodeChange(record)
    },
    showDialogTable() {
      this.selectVisiable = true
    },
    skuCodeChange(value) {
      this.$emit('skuCodeChange', value)
    },
    submit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', 'addCommodity', this.searchForm)
        }
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
</style>
