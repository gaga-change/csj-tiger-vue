<template>
  <div class="FreightTemDdd">
    <el-form
      :inline="true"
      :model="formData"
      :rules="rules"
      label-width="100px"
      ref="form"
    >
      <!-- 基础表单 -->
      <div>
        <el-form-item
          label="模版名称"
          prop="templateName"
        >
          <el-input
            maxlength="50"
            style="width:200px;"
            v-model="formData.templateName"
            placeholder="请输入模版名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="承运商"
          prop="consoildatorCode"
        >
          <el-select
            style="width:200px;"
            v-model="formData.consoildatorCode"
            placeholder="请选择承运商"
            @change="consoildatorCodeChange"
            clearable
          >
            <el-option
              v-for="(item, index) in mapConfig['_consoilInfoList_state31'] || []"
              :key="index"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="运输种类"
          prop="templateType"
        >
          <el-select
            style="width:200px;"
            v-model="formData.templateType"
            placeholder="请选择运输种类"
            clearable
          >
            <el-option
              v-for="(item, index) in mapConfig['getTemplateTransport'] || []"
              :key="index"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="出发地"
          prop="startPlace"
        >
          <el-cascader
            style="width:200px;"
            :options="Area"
            v-model="formData.startPlace"
            placeholder="请选择出发地"
          >
          </el-cascader>
        </el-form-item>
      </div>
      <!-- table操作栏 -->
      <div class="mt10">
        <table class="input-table">
          <tr>
            <th>目的地</th>
            <th>{{formData.templateType == 0 ? '计费规则（重货）' : '计费规则'}}</th>
            <th>{{'计费规则（抛货）'}}</th>
            <th>操作</th>
          </tr>
          <tr
            v-for="(item, index) in formData.costRulesList"
            :key="item.key"
          >
            <td style="position: relative;padding-right: 30px;">
              <template v-if="formData.templateType + '' === '0'">
                {{item.checkProvinceListName}}
                <el-link
                  style="position: absolute;right: 5px;bottom: 5px;"
                  type="primary"
                  @click="handleEditPlace(item)"
                >编辑</el-link>
              </template>
              <template v-else-if="formData.templateType + '' === '1'">
                {{item.checkCityListName}}
                <el-link
                  style="position: absolute;right: 5px;bottom: 5px;"
                  type="primary"
                  @click="handleEditCity(item)"
                >编辑</el-link>
              </template>
              <template v-else>
                <span style="color:#909399;font-size:12px">请先选择运输种类</span>
              </template>
            </td>
            <td style="position: relative;padding-right: 30px;">
              <span style="white-space: pre;">{{item.heavy.rulesListName}}</span>
              <el-link
                style="position: absolute;right: 5px;bottom: 5px;"
                type="primary"
                @click="selectedRow=item.heavy;addCostRuleVisible=true"
              >编辑</el-link>
            </td>
            <td style="position: relative;padding-right: 30px;">
              <span style="white-space: pre;">{{item.light.rulesListName}}</span>
              <el-link
                style="position: absolute;right: 5px;bottom: 5px;"
                type="primary"
                @click="selectedRow=item.light;addCostRuleVisible=true"
              >编辑</el-link>
            </td>
            <td>
              <el-link
                type="warning"
                icon="el-icon-delete"
                @click="handleDel(item, index)"
              >删除</el-link>
            </td>
          </tr>
        </table>
        <div class="mt15 text-right">
          <el-link
            type="primary"
            icon="el-icon-plus"
            @click="handleAdd"
          >增加目的地运费</el-link>
        </div>
      </div>
      <!-- 备注 -->
      <div class="mt15">
        <el-form-item
          label="备注"
          prop="remarkInfo"
        >
          <el-input
            style="width:400px;"
            v-model="formData.remarkInfo"
            type="textarea"
            placeholder="请输入备注"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </div>
      <!-- 确认 - 取消 -->
      <div class="text-right">
        <el-button @click="close()">取 消</el-button>
        <el-button
          class="mr35"
          type="primary"
          :loading="loading"
          @click="confirm()"
        >确 定</el-button>
      </div>
    </el-form>
    <addProvince
      :visible.sync="addProvinceVisible"
      :row="selectedRow"
      @submited="handleSelectProvince"
    />
    <addCity
      :visible.sync="addCityVisible"
      :row="selectedRow"
      @submited="handleSelectCity"
    />
    <addCostRule
      :visible.sync="addCostRuleVisible"
      :row="selectedRow"
      @submited="handleCostRule"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Area } from '@/utils/area2'
import { consoilInfoList, saveTemplate } from '@/api'
import addProvince from './components/addProvince'
import addCity from './components/addCity'
import addCostRule from './components/addCostRule'
const getItem = () => (
  {
    key: Date.now(),
    endPlaseList: '',
    checkProvinceList: [],
    checkProvinceListName: '',
    checkCityList: [],
    checkCityListName: '',
    heavy: {
      rulesList: [],
      rulesListName: '',
      typeName: '公斤',
      lowPrice: undefined,
    },
    light: {
      rulesList: [],
      rulesListName: '',
      typeName: '方',
      lowPrice: undefined,
    }
  }
)
export default {
  components: { addProvince, addCity, addCostRule },
  data() {
    return {
      Area,
      loading: false,
      addProvinceVisible: false,
      addCityVisible: false,
      addCostRuleVisible: false,
      selectedRow: null,
      formData: {
        templateName: '',
        consoildatorCode: '',
        consoildatorName: '',
        templateType: undefined,
        startPlace: '',
        remarkInfo: '',
        costRulesList: [
          getItem()
        ],
      },
      rules: {
        templateName: [{ required: true, message: '必填项', trigger: ['blur', 'change'] },],
        consoildatorCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] },],
        consoildatorName: [{ required: true, message: '必填项', trigger: ['blur', 'change'] },],
        templateType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] },],
        startPlace: [{ required: true, message: '必填项', trigger: ['blur', 'change'] },],
      },
    }
  },
  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    }),
  },
  created() {
    this.getConsoilInfoList()
  },
  methods: {
    confirm() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = this.$copy(this.formData)
          params.startPlace = params.startPlace.join('_')
          if (params.costRulesList.length == 0) {
            return this.$message.error('请填写目的地运费！')
          }
          for (let i = 0; i < params.costRulesList.length; i++) {
            console.log(params, params.costRulesList)
            let item = params.costRulesList[i]
            item.groupId = i + 1
            if (params.templateType == 0) {
              item.endPlaseList = item.checkProvinceList
            } else {
              item.endPlaseList = item.checkCityList
            }
            if (item.endPlaseList.length == 0) {
              return this.$message.error('请选择目的地！')
            }
            if (item.heavy.rulesList.length == 0) {
              return this.$message.error('请完善计费规则！')
            }
            item.heavyRulesList = item.heavy.rulesList
            if (item.light.rulesList.length == 0) {
              return this.$message.error('请完善计费规则！')
            }
            item.lightRulesList = item.light.rulesList
            item.heavyLowPrice = item.heavy.lowPrice
            item.lightLowPrice = item.light.lowPrice
            delete item.light
            delete item.heavy
            delete item.checkProvinceList
            delete item.checkProvinceListName
            delete item.checkCityList
            delete item.checkCityListName
            delete item.key
          }
          this.loading = true
          saveTemplate(params).then(res => {
            this.loading = false
            if (!res) return
            this.$message({
              type: 'success',
              message: '操作成功,即将跳转到列表页！',
              duration: 1500,
              onClose: () => {
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path: `/freight/freightTem/list`,
                  })
                }).catch(err => {
                  console.error(err)
                })
              }
            })
          })
        }
      })
    },
    /** 增加一行 */
    handleAdd() {
      this.formData.costRulesList.push(getItem())
    },
    /** 删除某行 */
    handleDel(item, index) {
      this.formData.costRulesList.splice(index, 1)
    },
    /** 规则选择结束 */
    handleCostRule({ rulesList, rulesListName, lowPrice }) {
      this.selectedRow.rulesList = rulesList
      this.selectedRow.rulesListName = rulesListName
      this.selectedRow.lowPrice = lowPrice
    },
    /** 城市选择结束 */
    handleSelectCity({ checkCityList, checkCityListNames }) {
      this.selectedRow.checkCityList = checkCityList
      this.selectedRow.checkCityListName = checkCityListNames.join('，')
    },
    /** 城市编辑 按钮点击事件 */
    handleEditCity(row) {
      this.selectedRow = row
      this.addCityVisible = true
    },
    /** 省份选择结束 返回选择结果 */
    handleSelectProvince({ checkProvinceList, checkProvinceListNames }) {
      this.selectedRow.checkProvinceList = checkProvinceList
      this.selectedRow.checkProvinceListName = checkProvinceListNames.join('，')
    },
    /** 省份编辑  按钮点击事件 */
    handleEditPlace(row) {
      this.selectedRow = row
      this.addProvinceVisible = true
    },
    consoildatorCodeChange(val) {
      this.formData.consoildatorName = this.mapConfig['_consoilInfoList_state31'].find(v => v.key === val).value
    },
    getConsoilInfoList() {
      consoilInfoList({
        consoildatorState: 31,
        pageSize: 9999,
        pageNum: 1
      }).then(res => {
        if (!res) return
        res.data.list
        this.$store.commit('ADD_MAP', {
          name: '_consoilInfoList_state31',
          keyValue: (res.data.list || []).map(v => {
            return {
              value: v.consoildatorName,
              key: v.consoildatorCode
            }
          })
        })
      })
    },
    close() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          path: `/freight/freightTem/list`,
        })
      }).catch(err => {
        console.error(err)
      })
    },

  }
}

</script>
<style lang="scss">
.FreightTemDdd {
  .input-table {
    width: 100%;
    font-size: 0;
    color: #606266;
    // border: 1px solid;
    border: 1px solid #ebeef5;
    border-right: none;
    border-bottom: none;
    border-collapse: collapse;
    th,
    td {
      font-size: 14px;
      padding: 5px 0;
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      text-align: center;
      .el-form-item {
        margin: 0;
        &.is-error {
          margin-bottom: 18px;
        }
      }
    }
    th {
      font-weight: normal;
    }
  }
}
</style>