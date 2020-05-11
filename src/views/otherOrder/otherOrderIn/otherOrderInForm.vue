<template>
  <div class="">
    <div>
      <el-form
        :inline="true"
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
        <div class="text-right mb20">
          <el-button
            type="primary"
            :loading="loading"
            @click="confirm()"
          >保 存</el-button>
        </div>
        <el-form-item
          label="单据组织"
          prop="AA"
        >
          <el-select
            style="width:200px;"
            v-model="formData.AA"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="单据类型"
          prop="BB"
        >
          <el-select
            style="width:200px;"
            v-model="formData.BB"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="货主"
          prop="CC"
        >
          <el-select
            style="width:200px;"
            v-model="formData.CC"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="供应商"
          prop="DD"
        >
          <el-select
            style="width:200px;"
            v-model="formData.DD"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否生产相关"
          prop="EE"
        >
          <el-select
            style="width:200px;"
            v-model="formData.EE"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="受益部门"
          prop="FF"
        >
          <el-select
            style="width:200px;"
            v-model="formData.FF"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="仓库"
          prop="GG"
        >
          <el-select
            style="width:200px;"
            v-model="formData.GG"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="工作号"
          prop="HH"
        >
          <el-select
            style="width:200px;"
            v-model="formData.HH"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="研发项目"
          prop="II"
        >
          <el-select
            style="width:200px;"
            v-model="formData.II"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="服务与费用"
          prop="JJ"
        >
          <el-select
            style="width:200px;"
            v-model="formData.JJ"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in []"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right">
          <el-button
            type=""
            @click="handleAddProd"
          >添加商品</el-button>
        </div>
        <div class="">
          <item-title text="商品明细" />
          <base-table
            :config="commdityConfig"
            :data="commodityList"
          ></base-table>
        </div>
      </el-form>
    </div>
    <template v-if="selectProdVisible">
      <selectProd
        :visible.sync="selectProdVisible"
        :selected="commodityList"
        @submited="handleAddSubmit"
      />
    </template>
  </div>
</template>

<script>
import _ from 'lodash';

/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
import { skuListByCondition } from '@/api'
import selectProd from './components/selectProd'
const commdityConfig = [
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'providerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '备注', prop: 'remarkInfo' }
]
export default {
  components: { selectProd },
  data() {
    return {
      commdityConfig,
      loading: false,
      selectProdVisible: false,
      skuInfoListLoading: false,
      commodityList: [],
      addCommodityForm: {},
      formData: {
        //  ... 表单字段
        AA: undefined,
        BB: undefined,
        CC: undefined,
        DD: undefined,
        EE: undefined,
        FF: undefined,
        GG: undefined,
        HH: undefined,
        II: undefined,
        JJ: undefined,
        detailItemList: []
      },
      rules: {
        //  ... 表单校验
        AA: [{ required: true, message: '必填项', trigger: 'blur' }],
        BB: [{ required: true, message: '必填项', trigger: 'blur' }],
        CC: [{ required: true, message: '必填项', trigger: 'blur' }],
        DD: [{ required: true, message: '必填项', trigger: 'blur' }],
        EE: [{ required: true, message: '必填项', trigger: 'blur' }],
        FF: [{ required: true, message: '必填项', trigger: 'blur' }],
        GG: [{ required: true, message: '必填项', trigger: 'blur' }],
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
          for (let key in params) {
            if (params[key] === undefined) {
              params[key] = ''
            }
          }
          // saveApi(params).then(res => {
          //   this.loading = false
          //   if (!res) return
          //   this.$message.success('操作成功！')
          //   this.$emit('submited')
          //   this.close()
          // })
        }
      })
    },
    /** 添加商品按钮 点击事件 */
    handleAddProd() {
      this.selectProdVisible = true
    },
    /** 添加商品数据 */
    handleAddSubmit(rows) {
      console.log(rows, '##')
      this.commodityList.push(...rows)
    }
  }
}
</script>