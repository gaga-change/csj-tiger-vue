<template>
  <div class="AddCostRule">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="计费规则"
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
          <!-- 区间 -->
          <div
            v-for="(item, index) in formData.rulesList"
            :key="index"
          >
            <el-divider v-if="index > 0"></el-divider>
            <div>
              <span style="margin-right: 24px;">
                <el-radio
                  v-model="item.noEndWeight"
                  :label="false"
                  :disabled="index < formData.rulesList.length - 1 "
                >（ {{item.startWeight}}，
                  <el-input-number
                    style="width: 50px"
                    :controls="false"
                    v-model="item.endWeight"
                    :disabled="index < formData.rulesList.length - 1 "
                  >
                  </el-input-number>
                  】范围内</el-radio>
              </span>
              <span>
                <el-radio
                  v-model="item.checkPrice"
                  :label="true"
                >一口价 <el-input-number
                    style="width: 50px"
                    :controls="false"
                    v-model="item.price"
                  >
                  </el-input-number>
                </el-radio>
              </span>
            </div>
            <div class="mt15">
              <span style="margin-right: 68px;">
                <el-radio
                  v-model="item.noEndWeight"
                  :label="true"
                  :disabled="index < formData.rulesList.length - 1 "
                >（ {{item.startWeight}}，∞ 】范围内</el-radio>
              </span>
              <span>
                <el-radio
                  v-model="item.checkPrice"
                  :label="false"
                >单价 <el-input-number
                    style="width: 50px"
                    :controls="false"
                    v-model="item.unitPrice"
                  >
                  </el-input-number>
                </el-radio>
              </span>
              <span class="ml35">
                <el-link
                  type="primary"
                  v-show="index === formData.rulesList.length - 1 && formData.rulesList.length !== 1 "
                  @click="handleRemove(index)"
                >删除</el-link>
                <el-link
                  type="primary"
                  v-show="formData.rulesList.length - 1 === index && item.noEndWeight==false"
                  @click="handleAdd(item)"
                >继续添加区间</el-link>
              </span>
            </div>
          </div>
          <div class="mt25">
            <!-- 数字框 -->
            <el-form-item
              label="最低一票"
              prop="lowPrice"
            >
              <el-input-number
                placeholder="最低一票"
                v-model="formData.lowPrice"
                :precision="0"
                :min="0"
                :max="99999999"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </div>
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
/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
// import { saveApi } from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    /** 数据初始 */
    row: {
      type: Object,
      default: {}
    }
  },
  computed: {
    /** 防止父级传递 null */
    rowData() {
      return this.row || {}
    }
  },
  watch: {
    /** 监听数据切换，重置表单 */
    visible(val) {
      if (!val) return
      if (this.rowData.rulesList.length) {
        this.$set(this.formData, 'rulesList', this.rowData['rulesList'])
        this.$set(this.formData, 'lowPrice', this.rowData['lowPrice'])
      } else {
        this.$set(this.formData, 'rulesList', [
          {
            startWeight: 0,
            endWeight: undefined,
            noEndWeight: false,
            unitPrice: undefined,
            price: undefined,
            checkPrice: true,
          }
        ])
        this.$set(this.formData, 'lowPrice', undefined)
      }
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        //  ... 表单字段
        rulesList: [
          {
            startWeight: 0,
            endWeight: undefined,
            noEndWeight: false,
            unitPrice: undefined,
            price: undefined,
            checkPrice: true,
          }
        ],
        lowPrice: undefined
      },
      rules: {
        //  ... 表单校验
        packageDesc: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 0, max: 20, message: '不能超过20个字符', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              value > 0 ? callback() : callback('数值必须大于0')
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    /** 删除 */
    handleRemove(index) {
      this.formData.rulesList.splice(index, 1)
    },
    /** 添加 */
    handleAdd(item) {
      item = this.$copy(item)
      if (item.endWeight <= item.startWeight) {
        return this.$message.error('范围数值错误，范围最大值不能小于等于最小值')
      }
      if (!item.noEndWeight && !item.endWeight) {
        return this.$message.error('请补充范围')
      }
      if (item.checkPrice && (item.price === undefined || item.price === '')) {
        return this.$message.error('请输入一口价')
      }
      if (!item.checkPrice && (item.unitPrice === undefined || item.unitPrice === '')) {
        return this.$message.error('请输入单价')
      }
      item.startWeight = item.endWeight
      item.endWeight = undefined
      item.noEndWeight = false
      item.unitPrice = undefined
      item.price = undefined
      item.checkPrice = true
      this.formData.rulesList.push(item)
    },
    /** 确定 */
    confirm() {
      let strList = []
      let params = this.$copy(this.formData)
      for (let i = 0; i < params.rulesList.length; i++) {
        let item = params.rulesList[i]
        if (item.endWeight <= item.startWeight) {
          return this.$message.error('范围数值错误，范围最大值不能小于等于最小值')
        }
        if (!item.noEndWeight && !item.endWeight) {
          return this.$message.error('请补充范围')
        }
        if (item.checkPrice && (item.price === undefined || item.price === '')) {
          return this.$message.error('请输入一口价')
        }
        if (!item.checkPrice && (item.unitPrice === undefined || item.unitPrice === '')) {
          return this.$message.error('请输入单价')
        }
        let str = ''
        if (item.noEndWeight) {
          str += `${item.startWeight}${this.rowData.typeName}以上`
        } else {
          str += `${item.endWeight}${this.rowData.typeName}以内`
        }
        if (item.checkPrice) {
          str += `${item.price}元`
          item.unitPrice = undefined
        } else {
          str += `，单价${item.unitPrice}元`
          item.price = undefined
        }
        strList.push(str)
      }
      if (!params.rulesList[params.rulesList.length - 1].noEndWeight) {
        return this.$message.error('配置不完整，最后一项区间结束必须为 ∞ ')
      }
      if (params.lowPrice) {
        strList.push(`最低一票${params.lowPrice}元`)
      }
      this.$emit('submited', {
        lowPrice: params.lowPrice,
        rulesList: this.$copy(params.rulesList),
        rulesListName: strList.join('\r\n')
      })
      this.close()
    },
    /** 关闭弹窗 */
    close() {
      // 初始化表单
      // this.$refs['form'] && this.$refs['form'].resetFields()
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

<style lang="scss">
.AddCostRule {
  .el-input-number--mini {
    .el-input {
      input {
        padding: 0;
      }
    }
  }
}
</style>