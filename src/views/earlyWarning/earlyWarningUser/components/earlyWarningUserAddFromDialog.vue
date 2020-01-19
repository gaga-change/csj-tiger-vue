<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="配置预警接收人"
      :visible="visible"
      width="600px"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        <base-form
          :config="formConfig"
          :rules="rules"
          ref="form"
        >
        </base-form>
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
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="confirm()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const formConfig = [
  { label: '货主', prop: 'ownerCode', type: 'enum', enum: 'ownerInfoMap' },
  { label: '单据类型', prop: 'billType', type: 'enum', enum: 'getBaseDateType' },
  { label: '异常类型', prop: 'exceptionType', type: 'enum', enum: 'getExceptionType' },
  { label: '用户', prop: 'userId', type: 'enum', enum: 'getWxUser' },
]
const rules = {
  ownerCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
  billType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
  exceptionType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
  receiveName: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
}
/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
import { exceptionReceiverSave } from '@/api'
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },
  data() {
    return {
      formConfig,
      rules,
      loading: false,
    }
  },
  methods: {
    /** 确定 */
    confirm() {
      this.$refs['form'].validate((valid, params) => {
        if (valid) {
          let owner = this.mapConfig['ownerInfoMap'].find(v => v.key === params.ownerCode)
          let receive = this.mapConfig['getWxUser'].find(v => v.key === params.userId)
          params.ownerName = owner.value
          params.receiveName = receive.value
          this.loading = true
          exceptionReceiverSave(params).then(res => {
            this.loading = false
            if (!res) return
            this.$message.success('操作成功！')
            this.$emit('submited')
            this.close()
          })
        }
      })
    },
    /** 关闭弹窗 */
    close() {
      // 初始化表单
      this.$refs['form'] && this.$refs['form'].resetFields()
      // 初始化没有挂载到表单的数据
      // ...
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