<template>
  <div
    class="FreightTemDdd"
    v-loading="selectTemplateInfoLoading"
  >
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
            :disabled="!!$route.query.id"
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
            @change="formData.startPlace = undefined"
            placeholder="请选择运输种类"
            clearable
          >
            <el-option
              v-for="(item, index) in mapConfig['getTemplateTransport'] || []"
              :key="index"
              :label="item.value"
              :value="(item.key + '')"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="出发地"
          prop="startPlace"
        >
          <el-cascader
            v-if="formData.templateType + '' === '0'"
            style="width:200px;"
            :options="provinceOptions"
            v-model="formData.startPlace"
            placeholder="请选择出发地"
          >
          </el-cascader>
          <el-cascader
            v-else-if="formData.templateType + '' === '1'"
            style="width:200px;"
            :options="cityOptions"
            v-model="formData.startPlace"
            placeholder="请选择出发地"
          >
          </el-cascader>
          <el-input
            v-else
            placeholder="请先选择运输种类"
            disabled="disabled"
          >

          </el-input>
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
import _ from 'lodash'
import { Area, areaTools } from '@/utils/area2'
import { consoilInfoList, saveTemplate, selectTemplateInfo, updateTemplateInfo } from '@/api'
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
    let provinceOptions = Area.map(v => {
      return {
        ...v,
        children: undefined
      }
    })
    let cityOptions = Area.map(v => {
      return {
        ...v,
        children: v.children.map(v => {
          return {
            ...v,
            children: undefined
          }
        })
      }
    })
    return {
      Area,
      getCityByCode: areaTools().getCityByCode,
      provinceOptions,
      cityOptions,
      loading: false,
      selectTemplateInfoLoading: false,
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
    if (this.$route.query.id) {
      this.initDetail()
    }
  },
  methods: {
    initDetail() {
      this.selectTemplateInfoLoading = true
      selectTemplateInfo({ id: this.$route.query.id }).then(res => {
        this.selectTemplateInfoLoading = false
        if (!res) return
        let detail = res.data
        let keys = 'templateName consoildatorCode consoildatorName remarkInfo'
        keys.split(' ').forEach(key => {
          this.formData[key] = detail[key]
        })
        this.formData.templateType = detail.templateType + ''
        this.formData.startPlace = [detail.startPlace]
        if (detail.templateType == 1) {
          this.formData.startPlace.unshift(detail.startPlace.substr(0, 2) + '0000')
        }
        this.formData.costRulesList = detail.costRulesList.map((costItem, index) => {
          let item = {
            key: Date.now() + Math.random(),
            endPlaseList: [],
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
          if (detail.templateType == 0) {
            item.checkProvinceList = costItem.endPlaseList
            item.checkProvinceListName = item.checkProvinceList.map(code => this.Area.find(v => v.value === code).label).join('，')
          } else {
            item.checkCityList = costItem.endPlaseList
            item.checkCityListName = item.checkCityList.map(code => this.getCityByCode(code)).join('，')
          }
          item.heavy.rulesList = costItem.heavyRulesList.map(v => {
            return {
              startWeight: v.startWeight,
              endWeight: v.endWeight,
              noEndWeight: v.endWeight === undefined || v.endWeight === null,
              unitPrice: v.unitPrice,
              price: v.price,
              checkPrice: v.price !== undefined || v.price !== null,
            }
          })
          item.light.rulesList = costItem.lightRulesList.map(v => {
            return {
              startWeight: v.startWeight,
              endWeight: v.endWeight,
              noEndWeight: v.endWeight === undefined || v.endWeight === null,
              unitPrice: v.unitPrice,
              price: v.price,
              checkPrice: v.price !== undefined || v.price !== null,
            }
          })
          item.heavy.lowPrice = costItem.heavyLowPrice
          item.light.lowPrice = costItem.lightLowPrice
          item.heavy.rulesListName = this.turnRuleName(item.heavy)
          item.light.rulesListName = this.turnRuleName(item.light)
          return item
        })
      })
    },
    turnRuleName(formData) {
      let strList = []
      for (let i = 0; i < formData.rulesList.length; i++) {
        let item = formData.rulesList[i]
        let str = ''
        if (item.noEndWeight) {
          str += `${item.startWeight}${formData.typeName}以上`
        } else {
          str += `${item.endWeight}${formData.typeName}以内`
        }
        if (item.checkPrice) {
          str += `${item.price || 0}元`
        } else {
          str += `，单价${item.unitPrice || 0}元`
        }
        strList.push(str)
      }
      if (formData.lowPrice) {
        strList.push(`最低一票${formData.lowPrice}元`)
      }
      return strList.join('\r\n')
    },
    confirm() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = this.$copy(this.formData)
          params.startPlace = params.startPlace.pop()
          if (params.costRulesList.length == 0) {
            return this.$message.error('请填写目的地运费！')
          }
          for (let i = 0; i < params.costRulesList.length; i++) {
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
          let api = saveTemplate
          if (this.$route.query.id) {
            api = updateTemplateInfo
            params.id = this.$route.query.id
          }
          this.loading = true
          api(params).then(res => {
            if (!res) {
              this.loading = false
              return false
            }
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