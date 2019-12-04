<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="加入结算表"
      :visible="visible"
      width="600px"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        <el-form
          :inline="false"
          :model="formData"
          :rules="rules"
          label-width="100px"
          ref="form"
        >
          <!-- 
          1. 确认元素
          2. 配置文案&描述 、调整样式
          3. 字段配置
          4. 规则配置
          -->
          <!-- 输入框 -->
          <el-form-item
            label="结算日期"
            prop="date"
          >
            <el-date-picker
              v-model="formData.date"
              type="date"
              placeholder="选择结算日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
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
import { addOrDeleteSattle } from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    /** 数据初始 */
    rows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        //  ... 表单字段
        date: new Date(),
      },
      rules: {
        //  ... 表单校验
        date: [
          { required: true, message: '必填项', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    /** 确定 */
    confirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = { ...this.formData }
          addOrDeleteSattle({
            flag: 0,
            voList: this.rows.map(v => {
              return {
                id: v.id,
                costSettlementDate: params.date,
                tag: v.tag
              }
            })
          }).then(res => {
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