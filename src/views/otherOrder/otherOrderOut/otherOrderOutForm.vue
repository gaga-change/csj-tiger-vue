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
            :params="{organizationCode:  formData.billOrganize, busiTypeCode: 20}"
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
          prop="arrivalCode"
          key="arrivalCode"
          v-if="formData.ownerCode"
        >
          <CustomerSelect
            label="客户"
            v-model="formData.arrivalCode"
            :name.sync="formData.arrivalName"
            :params="{ownerCode: formData.ownerCode, billType: 20}"
            @change="validate('arrivalCode')"
          />
        </el-form-item>
        <el-form-item
          label="客户地址"
          prop="_arrivalIndex"
          v-if="formData.arrivalCode"
        >
          <ApiSelect
            api="customerAddrInfo"
            :config="['_index', 'arrivalAddress']"
            :params="{customerCode: formData.arrivalCode, billType: 20}"
            v-model="formData._arrivalIndex"
            :name.sync="formData.arrivalAddress"
            @change="handleAddressChnage"
            @loadedEnum="hnadleCustomerLoadedEnum"
          />
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="arrivalLinkUser"
        >
          <el-input
            v-model="formData.arrivalLinkUser"
            placeholder="请输入联系人"
            size="mini"
            class="formitem"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="联系电话"
          prop="arrivalLinkTel"
        >
          <el-input
            v-model="formData.arrivalLinkTel"
            placeholder="请输入联系电话"
            size="mini"
            class="formitem"
          ></el-input>
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
      <CommdityAddAndModifyOut
        numberKey="planOutQty"
        :tableConfig="commdityTableConfig"
        :params="{ownerCode:formData.ownerCode }"
        :checkInput="checkInput"
        v-model="formData.outWarehouseBillDetailList"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { outBillAdd } from '@/api'
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
  { label: '数量', prop: 'planOutQty', edit: true, inputType: 'number', width: 160 },
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
        busiBillType: 20,
        fromSystemId: 'QLL',
        //  ... 表单字段
        billOrganize: undefined,
        outBusiBillType: undefined,
        ownerCode: undefined,
        ownerName: undefined,
        arrivalCode: undefined,
        arrivalName: undefined,
        isProduct: undefined,
        benefitDepartment: undefined,
        warehouseCode: undefined,
        warehouseName: undefined,
        workNo: undefined,
        developProject: undefined,
        serviceCost: undefined,
        outWarehouseBillDetailList: [],
        _arrivalIndex: undefined, // 地址序号
        arrivalAddress: undefined, // 地址
        arrivalLinkUser: undefined, // 联系人
        arrivalLinkTel: undefined, // 联系方式
      },
      rules: {
        billOrganize: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        outBusiBillType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        ownerCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        isProduct: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        benefitDepartment: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        warehouseCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        _arrivalIndex: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalAddress: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalLinkUser: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalLinkTel: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
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
    /** 地址载入 设置默认值 */
    hnadleCustomerLoadedEnum(list) {
      const def = list.find(v => v.isDefault)
      if (def) {
        this.formData.arrivalAddress = def.arrivalAddress
        this.formData._arrivalIndex = def._index
        this.handleAddressChnage(def)
      }
    },
    /** 地址改变 */
    handleAddressChnage(add) {
      if (add) {
        this.formData.arrivalLinkUser = add.arrivalLinkUser
        this.formData.arrivalLinkTel = add.arrivalLinkTel
        this.formData.arrivalCity = add.arrivalCity
      } else {
        this.formData.arrivalLinkUser = ''
        this.formData.arrivalLinkTel = ''
        this.formData.arrivalCity = ''
      }
    },
    /** 确定 */
    confirm() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = { ...this.formData }
          const { outWarehouseBillDetailList } = params
          if (!outWarehouseBillDetailList.length) {
            return this.$message.error('请添加商品!')
          }
          if (outWarehouseBillDetailList.some(v => !v._hideEdit)) {
            return this.$message.error('请完善商品信息!')
          }
          const api = outBillAdd

          this.loading = true
          api(params).then(res => {
            this.loading = false
            if (!res) return
            this.$message.success('操作成功！')
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                path: '/otherOrder/otherOrderOutList',
              })
            })
          })
        }
      })
    },
    validate(prop) {
      this.$refs['form'] && this.$refs['form'].validateField(prop)
    },
    checkInput(row) {
      const { planOutQty, zoroCost } = row
      let msg = ''
      if (zoroCost === undefined || zoroCost === null) {
        msg = '请完善数据，填写是否为零成本！'
      } else if (!planOutQty) {
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