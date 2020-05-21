<template>
  <div class="">
    <div>
      <el-form
        class="BaseForm"
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
          prop="billOrganize"
          key="billOrganize"
        >
          <ApiSelect
            api="asiaOrganizeList"
            :config="['organizationCode', 'organizationName']"
            v-model="formData.billOrganize"
          />
        </el-form-item>
        <el-form-item
          label="单据类型"
          prop="outBusiBillType"
          key="outBusiBillType"
          v-if="formData.billOrganize"
        >

          <ApiSelect
            api="asiaBillTypeList"
            :config="['billTypeCode', 'billTypeName']"
            :params="{organizationCode:  formData.billOrganize, busiTypeCode: '001'}"
            v-model="formData.outBusiBillType"
          />
        </el-form-item>
        <el-form-item
          label="货主"
          prop="ownerCode"
          key="ownerCode"
        >
          <OwnerSelect
            v-model="formData.ownerCode"
            :name.sync="formData.ownerName"
          />
        </el-form-item>
        <el-form-item
          label="客户"
          prop="providerCode"
          key="providerCode"
          v-if="formData.ownerCode"
        >
          <CustomerSelect
            label="客户"
            v-model="formData.providerCode"
            :name.sync="formData.providerName"
            :params="{ownerCode: formData.ownerCode, billType: 21}"
            @change="validate('providerCode')"
          />
        </el-form-item>
        <el-form-item
          label="是否生产相关"
          prop="isProduct"
          key="isProduct"
        >
          <map-select
            map="isPrint"
            v-model="formData.isProduct"
          ></map-select>
        </el-form-item>
        <el-form-item
          label="受益部门"
          prop="benefitDepartment"
          key="benefitDepartment"
          v-if="formData.billOrganize"
        >

          <ApiSelect
            api="asiaDepartmentList"
            :config="['departmentCode', 'departmentName']"
            :params="{organizationCode:  formData.billOrganize}"
            v-model="formData.benefitDepartment"
          />
        </el-form-item>
        <el-form-item
          label="仓库"
          prop="warehouseCode"
          key="warehouseCode"
          v-if="formData.ownerCode"
        >

          <ApiSelect
            api="ownerWarehouseList"
            :config="['warehouseCode', 'warehouseName']"
            :params="{ownerCode: formData.ownerCode}"
            v-model="formData.warehouseCode"
            :name.sync="formData.warehouseName"
          />
        </el-form-item>
        <el-form-item
          label="研发项目"
          prop="developProject"
          key="developProject"
        >

          <ApiSelect
            api="asiaProjectList"
            :config="['projectCode', 'projectName']"
            v-model="formData.developProject"
          />
        </el-form-item>
        <el-form-item
          label="服务与费用"
          prop="serviceCost"
          key="serviceCost"
        >

          <ApiSelect
            api="asiaServiceCostList"
            :config="['serviceCostCode', 'serviceCostName']"
            v-model="formData.serviceCost"
          />
        </el-form-item>
        <el-form-item
          label="工作号"
          prop="workNo"
          key="workNo"
          v-if="formData.developProject"
        >
          <ApiSelect
            api="asiaWorkList"
            :config="['workCode', 'workName']"
            :params="{projectCode: formData.developProject}"
            v-model="formData.workNo"
          />
        </el-form-item>
      </el-form>
      <template v-if="formData.ownerCode && formData.providerCode">
        <CommdityAddAndModifyOut
          numberKey="planInQty"
          :tableConfig="commdityTableConfig"
          :params="{ownerCode:formData.ownerCode }"
          :checkInput="checkInput"
          v-model="formData.detailItemList"
        />
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { inBillAdd, } from '@/api'
import CommdityAddAndModifyOut from '@/components/Select/CommdityAddAndModifyOut'
import OwnerSelect from '@/components/Select/OwnerSelect'
import CustomerSelect from '@/components/Select/CustomerSelect'
import { mapGetters } from 'vuex'

const commdityTableConfig = [
  { label: '商品编码', prop: 'skuCode', width: 120 },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'customerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'planInQty', edit: true, inputType: 'number', width: 160 },
  { label: '进货价', prop: 'purchasePrice', },
  { label: '生产订单号', prop: 'ownerOrderNo', edit: true, inputType: 'input', width: 150 },
  { label: '零成本', prop: 'zoroCost', type: 'enum', enum: 'isPrint', edit: true, inputType: 'map', width: 150 },
]
export default {
  components: { CommdityAddAndModifyOut, OwnerSelect, CustomerSelect },
  data() {
    return {
      commdityTableConfig,
      loading: false,
      formData: {
        busiType: '001',
        fromSystemId: 'QLL',
        //  ... 表单字段
        billOrganize: undefined,
        outBusiBillType: undefined,
        ownerCode: undefined,
        ownerName: undefined,
        providerCode: undefined,
        providerName: undefined,
        isProduct: undefined,
        benefitDepartment: undefined,
        warehouseCode: undefined,
        warehouseName: undefined,
        workNo: undefined,
        developProject: undefined,
        serviceCost: undefined,
        detailItemList: [],
      },
      rules: {
        billOrganize: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        outBusiBillType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        ownerCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        providerCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        isProduct: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        benefitDepartment: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        warehouseCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
      }
    }
  },
  computed: {
    ...mapGetters({
      'mapConfig': 'mapConfig',
      visitedViews: 'visitedViews'
    }),
  },
  methods: {
    /** 确定 */
    confirm() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = { ...this.formData }
          const { detailItemList } = params
          if (!detailItemList.length) {
            return this.$message.error('请添加商品!')
          }
          if (detailItemList.some(v => !v._hideEdit)) {
            return this.$message.error('请完善商品信息!')
          }
          const api = inBillAdd

          this.loading = true
          api(params).then(res => {
            this.loading = false
            if (!res) return
            this.$message.suownerCodeess('操作成功！')
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                path: '/otherOrder/otherOrderInList',
              })
            })
          })
          // this.loading = true

          // saveApi(params).then(res => {
          //   this.loading = false
          //   if (!res) return
          //   this.$message.suownerCodeess('操作成功！')
          //   this.$emit('submited')
          //   this.close()
          // })
        }
      })
    },
    validate(prop) {
      this.$refs['form'] && this.$refs['form'].validateField(prop)
    },
    checkInput(row) {
      const { planInQty, zoroCost } = row
      let msg = ''
      if (zoroCost === undefined || zoroCost === null) {
        msg = '请完善数据，填写是否为零成本！'
      } else if (!planInQty) {
        msg = '请完善数据，填写数量！'
      }
      if (msg) {
        this.$message.error(msg)
      }
      return !msg
    }
  }
}
</script>