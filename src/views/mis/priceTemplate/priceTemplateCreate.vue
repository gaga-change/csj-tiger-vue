<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      :inline="true"
      ref="form"
      label-width="95px"
    >
      <el-form-item
        label="费用模板名称"
        prop="templateName"
      >
        <el-input
          v-model="form.templateName"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="承运商"
        prop="consoildatorCode"
      >
        <el-select
          v-model="form.consoildatorCode"
          clearable
          placeholder="请选择承运商"
          class="formitem"
        >
          <el-option
            v-for="item in consoil"
            :label="item.consoildatorName"
            :key="item.consoildatorCode"
            :value="item.consoildatorCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="发货点"
        prop="warehouseList"
      >
        <el-select
          v-model="form.warehouseList"
          multiple
          value-key="warehouseCode"
          clearable
          placeholder="请选择仓配点"
          style="width:300px;"
        >
          <el-option
            v-for="item in warehouse"
            :label="item.warehouseName"
            :key="item.id"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-form-item
          label="计费模式"
          prop="costCalcWay"
          label-width="70px"
        >
          <el-radio-group
            v-model="form.costCalcWay"
            @change="costCalcWayChange"
          >
            <el-radio :label="2">重量</el-radio>
            <el-radio :label="1">体积</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <template v-if="form.costCalcWay === 2">
        <div class="weightcard">
          <el-form-item
            label="首重"
            label-width="45px"
          >
            <el-input-number
              v-model="form.firstWeight"
              :min="0"
              style="width:120px"
            ></el-input-number>KG，
          </el-form-item>
          <span>超出首重，按照首重费用+续重费用计算</span>
          <span class="fr">
            <upload-excel
              filesuploadUrl="/webApi/freightTemplate/importInfoByWeight"
              modelUrl="/static/templet/pricetemp.xlsx"
              @uploadRes="uploadRes"
              name="file"
              type="text"
            ></upload-excel>
            <a href="/static/templet/pricetemp.xlsx">
              <el-button type="text">下载模板</el-button>
            </a>
          </span>
        </div>
        <el-table
          :data="tableData"
          border
          max-height="300"
          style="width:100%"
        >
          <el-table-column
            type="index"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="destinationName"
            label="运送到地区"
          >
          </el-table-column>
          <el-table-column
            prop="firstWeightPrice"
            label="首重"
          >
          </el-table-column>
          <el-table-column
            prop="continuousWeightPrice"
            label="续重"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="sureDel(scope.row, scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="form.costCalcWay === 1">
        <div class="weightcard">
          <span class="fr">
            <upload-excel
              filesuploadUrl="/webApi/freightTemplate/importInfoByVolumn"
              modelUrl="/static/templet/pricetempV.xlsx"
              @uploadRes="uploadRes"
              name="file"
              type="text"
            ></upload-excel>
            <a href="/static/templet/pricetempV.xlsx">
              <el-button type="text">下载模板</el-button>
            </a>
          </span>
        </div>
        <el-table
          :data="tableData"
          border
          max-height="300"
          style="width:100%"
        >
          <el-table-column
            type="index"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="destinationName"
            label="运送到地区"
          >
          </el-table-column>
          <el-table-column
            prop="firstWeightPrice"
            label="重货"
          >
          </el-table-column>
          <el-table-column
            prop="continuousWeightPrice"
            label="轻货"
          >
          </el-table-column>
          <el-table-column
            prop="lowestPrice"
            label="最低价格"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="sureDel(scope.row, scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-form-item prop="isDefault">
        <el-checkbox v-model="form.isDefault">默认使用该模板</el-checkbox>
      </el-form-item>
      <el-row>
        <el-button
          type="primary"
          @click="savePriceTemplet"
          :disabled="loading"
          v-loading="loading"
        >保存</el-button>
        <el-button @click="cancelSubmit">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { consoilInfoList } from '@/api/carrier'
import { warehouseSelect } from '@/api/storagepoint'
import { saveFreightTemplate } from '@/api/mis'
import BaseTable from '@/components/Table'
const required = { required: true, message: '必填项', trigger: ['change', 'blur'] }
export default {
  components: { BaseTable },
  data() {
    return {
      form: {
        templateName: '费用模板',
        costCalcWay: 2,
        warehouseList: []
      },
      consoil: [],
      warehouse: [],
      rules: {
        templateName: [required],
        consoildatorCode: [required],
        warehouseList: [required],
        costCalcWay: [required],
      },
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getConsoilInfoList()
    this.getWarehose()
  },
  methods: {
    costCalcWayChange() {
      this.tableData = []
    },
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.error(err)
        })
    },
    getWarehose() {
      warehouseSelect({ pageSize: 9999, pageNum: 1 }).then(res => {
        if (res.success) {
          const result = res.data && res.data.list || []
          this.warehouse = result.map(item => {
            const { warehouseNo, warehouseName, id } = item
            return { warehouseCode: warehouseNo, warehouseName, id }
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    uploadRes(res) {
      if (res.success) {
        this.tableData = res.data
      }
    },
    sureDel(row, index) {
      this.$confirm(`确定删除目的地是${row.destinationName}的相关信息吗`, {
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      })
    },
    savePriceTemplet() {
      if (this.tableData.length === 0) {
        this.$message.error('请导入模板数据~')
        return false
      }
      this.$refs.form.validate((ok) => {
        if (ok) {
          const postData = { ...this.form }
          postData.consoildatorName = this.consoil.find(item => item.consoildatorCode === this.form.consoildatorCode).consoildatorName
          postData.items = this.tableData
          postData.isDefault = 'isDefault' in postData ? Number(postData.isDefault) : 0
          this.loading = true
          saveFreightTemplate(postData).then(res => {
            this.loading = false
            if (res.success) {
              this.$confirm(`操作成功~`, {
                type: 'success',
                confirmButtonText: '继续添加',
                cancelButtonText: '返回列表'
              }).then(() => {
                this.$refs.form.resetFields()
                this.tableData = []
              }).catch(() => {
                this.$router.replace('/priceTemplate/list')
              })
            }
          }).catch(err => {
            this.loading = false
          })
        }
      })
    },
    cancelSubmit() {
      this.$refs.form.resetFields()
      this.form = {
        templateName: '费用模板',
        costCalcWay: 2,
        warehouseList: []
      }
      this.tableData = []
    }
  }
}
</script>
<style scoped>
.weightcard {
  line-height: 26px;
  font-size: 14px;
  height: 42px;
  overflow: hidden;
}
</style>