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
        <el-card
          shadow="hover"
          class="box-card BaseFormCard "
        >
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
              :params="{organizationCode:  formData.billOrganize, busiTypeCode: 22}"
              v-model="formData.outBusiBillType"
            />
          </el-form-item>
          <el-form-item
            label="仓库"
            prop="outWarehouseCode"
            key="outWarehouseCode"
            v-if="formData.billOrganize"
          >

            <ApiSelect
              api="asiaWareHouseList"
              :config="['outWarehouseCode', 'outWarehouseName']"
              :params="{organizationCode: formData.billOrganize}"
              v-model="formData.outWarehouseCode"
              :name.sync="formData.warehouseName"
            />
          </el-form-item>
        </el-card>
        <el-card
          shadow="hover"
          class="box-card BaseFormCard mt10"
        >
          <el-form-item
            label="退料理由"
            prop="returnReason"
          >
            <el-input
              v-model="formData.returnReason"
              placeholder="不能超过20个字符"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remarkInfo"
          >
            <el-input
              v-model="formData.remarkInfo"
              placeholder="不能超过20个字符"
            ></el-input>
          </el-form-item>
        </el-card>
        <el-card
          shadow="hover"
          class="box-card BaseFormCard mt10"
        >
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
            label="供应商"
            prop="arrivalCode"
            key="arrivalCode"
            v-if="formData.ownerCode"
          >
            <CustomerSelect
              label="供应商"
              v-model="formData.arrivalCode"
              :name.sync="formData.arrivalName"
              :params="{ownerCode: formData.ownerCode, billType: 22}"
              @change="validate('arrivalCode')"
            />
          </el-form-item>
          <el-form-item
            label="供应商地址"
            prop="_arrivalIndex"
            v-if="formData.arrivalCode"
          >
            <ApiSelect
              api="customerAddrInfo"
              :config="['_index', 'arrivalAddress']"
              :params="{customerCode: formData.arrivalCode, billType: 22}"
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
        </el-card>
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
import { outBillAdd } from '@/api'
import CommdityAddAndModifyOut from '@/components/Select/CommdityAddAndModifyOut'
import OwnerSelect from '@/components/Select/OwnerSelect'
import CustomerSelect from '@/components/Select/CustomerSelect'
import { mapGetters } from 'vuex'

const commdityTableConfig = [
  { label: '商品编码', prop: 'skuCode', width: 120 },
  { label: '商品名称', prop: 'skuName' },
  { label: '货主商品编码', prop: 'ownerSkuCode' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'planOutQty', edit: true, inputType: 'number', width: 160 },
  { label: '进货价', prop: 'costPrice', },
  { label: '备注', prop: 'remarkInfo', edit: true, inputType: 'input', width: 160 },
]
export default {
  components: { CommdityAddAndModifyOut, OwnerSelect, CustomerSelect },
  data() {
    return {
      commdityTableConfig,
      loading: false,
      formData: {
        busiBillType: 22,
        fromSystemId: 'QLL',
        //  ... 表单字段
        billOrganize: undefined,
        outBusiBillType: undefined,
        ownerCode: undefined,
        ownerName: undefined,
        arrivalCode: undefined,
        arrivalName: undefined,
        outWarehouseCode: undefined,
        warehouseName: undefined,
        outWarehouseBillDetailList: [],
        _arrivalIndex: undefined, // 地址序号
        arrivalAddress: undefined, // 地址
        arrivalLinkUser: undefined, // 联系人
        arrivalLinkTel: undefined, // 联系方式
        returnReason: undefined,  // 退料理由
        remarkInfo: undefined, // 备注
      },
      rules: {
        billOrganize: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        outBusiBillType: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        ownerCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        outWarehouseCode: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        _arrivalIndex: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalAddress: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalLinkUser: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        arrivalLinkTel: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        returnReason: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }, { min: 0, max: 20, message: '不能超过20个字符', trigger: ['blur', 'change'] }],
        remarkInfo: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }, { min: 0, max: 20, message: '不能超过20个字符', trigger: ['blur', 'change'] }],
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
          outWarehouseBillDetailList.forEach(v => {
            v.outStorePrice = 0
          })
          const api = outBillAdd

          this.loading = true
          api(params).then(res => {
            this.loading = false
            if (!res) return
            this.$message.success('操作成功！')
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                path: '/otherOrder/salesReturnList',
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
      const { planOutQty } = row
      let msg = ''
      if (!planOutQty) {
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
