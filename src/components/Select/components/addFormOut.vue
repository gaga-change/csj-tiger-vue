<template>
  <div>
    <el-form
      class="BaseForm"
      ref="searchForm"
      label-width="100px"
      :model="searchForm"
      :inline="true"
    >
      <el-form-item
        label="商品编码:"
        prop="skuCode"
        :rules="[{ required: true, message: '该项为必填'}]"
      >
        <div style="width:200px">
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
          size="mini"
          class="formitem"
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
          size="mini"
          class="formitem"
        ></el-input>
      </el-form-item>

      <el-form-item label="备注:">
        <el-input
          v-model="searchForm.remarkInfo"
          placeholder="请输入备注"
          size="mini"
          class="formitem"
          type="textarea"
          maxlength="100"
        ></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right">
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
      append-to-body
    >
      <div v-if="selectVisiable">
        <select-sku
          @select="selectChange"
          :params="params"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import selectSku from './selectSkuOut'

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
    }
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
