<template>
  <div class="addform">
    <el-form
      ref="searchForm"
      labelWidth="90px"
      :model="searchForm"
    >
      <el-row>
        <el-col>
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
        </el-col>

        <el-col>
          <el-form-item
            label="商品名称:"
            prop="skuName"
          >
            <el-input
              v-model="searchForm.skuName"
              disabled
              placeholder="商品名称"
              size="small"
              class="formitem"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item
            label="数量:"
            prop="planInQty"
            :rules="[{ required: true, message: '该项为必填'}]"
          >
            <el-input
              v-model="searchForm.planInQty"
              placeholder="请输入数量"
              size="small"
              class="formitem"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item
            label="商品供应商名称:"
            labelWidth="120px"
          >
            <el-input
              disabled
              v-model="searchForm.providerSkuName"
              placeholder="商品供应商名称"
              size="small"
              class="formitem"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item
            label="商品供应商编码:"
            labelWidth="120px"
          >
            <el-input
              disabled
              v-model="searchForm.providerSkuCode"
              placeholder="商品供应商编码"
              size="small"
              class="formitem"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item
            label="订货进价:"
            prop="purchasePrice"
            :rules="[{ required: true, message: '该项为必填'}]"
          >
            <el-input
              v-model="searchForm.purchasePrice"
              placeholder="请输入订货进价"
              size="small"
              class="formitem"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btnBox">
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
      <select-sku
        :commodityList="commodityList"
        @select="selectChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import selectSku from './selectSku'

export default {
  components: { selectSku },

  props: {
    searchForm: {
      type: Object,
      default: () => { }
    },
    commodityList: {
      type: Array,
      default: () => []
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
      this.skuCodeChange(record.skuCode)
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
.addform {
  .btnBox {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
