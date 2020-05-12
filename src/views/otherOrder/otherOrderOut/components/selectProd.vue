<template>
  <div class="SelectProdComponents">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="添加商品"
      :visible="visible"
      width="70%"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        <base-list
          ref="baseList"
          :tableConfig="tableConfig"
          :searchConfig="searchConfig"
          :api="listApi"
          :showControl="false"
          :controlWidth="160"
          :select="true"
          @selectionChange="selectionChange"
          :selectable="() => true"
        >
        </base-list>
      </div>
      <!-- <el-alert
        class="mt15"
        title="温馨提示："
        type="info"
        :closable="false"
      >
        <p>举例，商品最小单位默认为1,4个最小单位为一个内包装【一个内包装数量为4】，
          2个内包装为1箱【一箱数量8】，10箱为一个容器【一容器数量为80】</p>
      </el-alert> -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="close()"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          :loading="loading"
          @click="confirm()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
// import { saveApi } from '@/api'
import { skuListByCondition } from '@/api'

const tableConfig = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'providerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '备注', prop: 'remarkInfo' }
]

const searchConfig = [
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
]
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    /** 数据初始 */
    selected: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    /** 防止父级传递 null */
    rowData() {
      return this.row || {}
    }
  },
  data() {
    return {
      loading: false,
      tableConfig,
      searchConfig,
      listApi: skuListByCondition,
      selectRows: [],
      // 可选 附加查询条件
      appendSearchParams: {},
      formData: {
        //  ... 表单字段
      }
    }
  },
  methods: {
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 主表多选 */
    selectionChange(selectRows) {
      this.selectRows = [...selectRows]
    },
    /** 删除当前行 */
    handleDeleteRow(row) {
      // this.$apiConfirm('是否确定删除？', () => delApi(row.id)).then(res => {
      //   if (!res) return
      //   this.$message.success('操作成功！')
      //   this.getTableData()
      // })
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || []
      let total = res.data.total
      data.forEach(v => {
        v.updateLockStatusOutLoading = false
        v.updateLockStatusInLoading = false
      })
      return { data, total }
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/qualityTesting/create' })
    },
    /** 确定 */
    confirm() {
      this.visible && this.$emit('submited', this.$copy(this.selectRows))
      this.close()
    },
    /** 关闭弹窗 */
    close() {
      // this.$refs['form'] && this.$refs['form'].resetFields()
      this.visible && this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss">
.SelectProdComponents {
  .el-dialog__body {
    padding: 0 15px;
  }
}
</style>