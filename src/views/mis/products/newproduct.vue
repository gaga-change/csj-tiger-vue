<template lang="html">
<div class="app-container">
  <el-form :model="productForm" ref="productForm" labelWidth="100px">
    <item-title text="商品明细" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品分类：" prop="warehouseCode">
            <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择商品分类" size="small" class="formitem">
              <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品编码：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入商品编码" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品名称：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入商品名称" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品简称：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入商品简称" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="商品描述：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入商品描述" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="包装单位：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入商品包装单位" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="采用开始日：" prop="warehouseCode" >
            <el-date-picker
              v-model="productForm.beginDate"
              size="small"
              class="formitem"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="品牌：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入品牌" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="规格：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入规格" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="型号：" prop="warehouseCode" :rules="[{max:20, message:'最长20位', trigger: 'blur'}]">
            <el-input v-model="productForm.warehouseCode" placeholder="请输入型号" size="small" class="formitem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物料状态：" prop="warehouseCode">
            <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择商品分类" size="small" class="formitem">
              <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeTab" type="card" class="mt20">
      <el-tab-pane label="基本信息" name="first">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="订货区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择订货区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品管理区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择商品管理" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="基准结算价：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入基准结算价">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="销售区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择销售区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="进项税率：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入进项税率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="销项税率：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入销项税率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="商品标签区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择商品标签" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="期望毛利率：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入期望毛利率">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="尺寸单位区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择尺寸单位" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="重量：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入重量">
                <span slot="suffix">kg</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="保质期区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择保质期区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="安全库存系数：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入安全库存系数">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="长：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入长度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="体积：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入体积">
                <span slot="suffix">m³</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="保质期：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入保质期">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="目标周转日数：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入周转日数">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="宽：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入宽度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="等级：" >
              <el-input type="text" v-model="productForm.boxnum" class="formitem" size="small" placeholder="请输入等级">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="退货区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择保质期区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="最大在库数量：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入最大在库数量">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="高：" >
              <el-input type="number" v-model.number="productForm.boxnum" class="formitem" size="small" placeholder="请输入高度">
                <span slot="suffix">m</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="产地：" >
              <el-input type="text" v-model="productForm.boxnum" class="formitem" size="small" placeholder="请输入产地">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="在库区分：" prop="warehouseCode">
              <el-select  v-model="productForm.warehouseCode" clearable  placeholder="请选择在库区分" size="small" class="formitem">
                <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="备注：" prop="warehouseCode">
              <el-input type="text" v-model="productForm.boxnum" class="formitem" size="small" placeholder="请输入产地">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="客户信息" name="second">
        <search
          :config="customerConfig"
          :justify="'end'"
          :confirmText="confirmText"
          :labelWidth="100"
          :formData="customerEditData"
          :showResetButton="false"
          ref="customerForm"
          @submitForm="submitCustomerForm"></search>
        <el-table
          :data="customerTableData"
          border>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column v-for="(column, index) in customerConfig" :key="index" :prop="column.prop" :label="column.label">
            <template slot-scope="scope">
              <span v-if="column.type === 'date'">{{scope.row[column.prop] | parseTime}}</span>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <a :style="linkstyle" @click="delRow(scope.row)">删除</a>
              <a :style="linkstyle" @click="editRow(scope.row)">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="供应商信息" name="third">
        <search
          :config="servicerConfig"
          :justify="'end'"
          :confirmText="servicerConfirmText"
          :labelWidth="100"
          :formData="servicerEditData"
          :showResetButton="false"
          ref="servicerForm"
          @submitForm="submitServicerForm"></search>
        <el-table
          :data="servicerTableData"
          border>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column v-for="(column, index) in servicerConfig" :key="index" :prop="column.prop" :label="column.label">
            <template slot-scope="scope">
              <span v-if="column.type === 'date'">{{scope.row[column.prop] | parseTime}}</span>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <a :style="linkstyle" @click="delServicerRow(scope.row)">删除</a>
              <a :style="linkstyle" @click="editServicerRow(scope.row)">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-row class="mt20 mb30">
      <el-button
        type="primary"
        @click="onSubmit"
        v-loading="submitloading"
        :disabled="submitloading"
        >保存</el-button
      >
      <el-button @click="onCancel">取消</el-button>
    </el-row>
  </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from '@/components/Search'
export default {
  components: { search },
  data() {
    return {
      productForm: {},
      activeTab: 'first',
      customerConfig: [
        { label: '客户', prop: 'customer', placeholder: '请选择客户', type: 'select', selectOptions: [{ value: '客户1', key: 1 }] },
        { label: '客户物料编码', prop: 'itemCode', placeholder: '请输入物料编码' },
        { label: '采用开始日', prop: 'useDate', type: 'date' },
        { label: '客户销价', prop: 'salePrice', type: 'number', placeholder: '请输入客户销价' },
        { label: '物料分类码', prop: 'categoryCode', placeholder: '请输入客户物料分类码' },
        { label: '价格有效期', prop: 'expiryDate', type: 'date' },
        { label: '客户物料名称', prop: 'itemName', placeholder: '请输入客户物料名称' },
        { label: '备注', prop: 'memos', type: 'textarea' },
      ],
      servicerConfig: [
        { label: '供应商', prop: 'servicer', placeholder: '请选择供应商', type: 'select', selectOptions: [{ value: '供应商1', key: 1 }] },
        { label: '进货价', prop: 'itemPrice', placeholder: '请输入进货价', type: 'number' },
        { label: '价格有效期', prop: 'expiryDate', type: 'date' },
        { label: '供应商物料编码', prop: 'servicerCode', placeholder: '请输入供应商编码' },
        { label: '大包装单位', prop: 'bigunit', placeholder: '请输入大包装单位' },
        { label: '订货计量单位', prop: 'orderUnit', placeholder: '请选择订货计量单位', type: 'select', selectOptions: [{ value: '大包装单位', key: 1 }] },
        { label: '交货周期', prop: 'deliveryCycle', placeholder: '请输入交货周期' },
        { label: '供应商物料名称', prop: 'servicerName', placeholder: '请输入供应商物料名称' },
        { label: '中包装单位', prop: 'midunit', placeholder: '请输入中包装单位' },
        { label: '订货计量重量', prop: 'itemWeight', placeholder: '请输入订货计量重量', type: 'number' },
        { label: '订货计量体积', prop: 'itemSize', placeholder: '请输入订货计量体积', type: 'number' },
        { label: '供应商物料分类', prop: 'servicerCategory', placeholder: '请输入供应商物料分类' },
        { label: '备注', prop: 'memos', type: 'textarea' },
      ],
      customerEditData: {},
      customerTableData: [],
      servicerEditData: {},
      servicerTableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      confirmText: '添加',
      servicerConfirmText: '添加',
      submitloading: false
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    onSubmit() {

    },
    onCancel() {
      this.$router.back()
    },
    submitCustomerForm(val) {
      console.log(val);
      if (val.edit) {
        let position = -1
        this.customerTableData.forEach((item, index) => {
          if(item.edit) position = index
        })
        console.log(position);
        this.customerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.$refs.customerForm.resetForm()
        this.confirmText = '添加'
      } else {
        this.customerTableData.push(JSON.parse(JSON.stringify(val)))
      }
    },
    submitServicerForm(val) {
      console.log(val);
      if (val.edit) {
        let position = -1
        this.servicerTableData.forEach((item, index) => {
          if(item.edit) position = index
        })
        console.log(position);
        this.servicerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.$refs.servicerForm.resetForm()
        this.servicerConfirmText = '添加'
      } else {
        this.servicerTableData.push(JSON.parse(JSON.stringify(val)))
      }
    },
    delRow(row) {
      console.log(row);
      this.customerTableData = this.customerTableData.filter(item => item !== row)
    },
    editRow(row) {
      row.edit = true
      this.confirmText = '确定修改'
      this.customerEditData = row
      this.$refs.customerForm.loadData()
    },
    delServicerRow(row) {
      console.log(row);
      this.servicerTableData = this.servicerTableData.filter(item => item !== row)
    },
    editServicerRow(row) {
      row.edit = true
      this.servicerConfirmText = '确定修改'
      this.servicerEditData = row
      this.$refs.servicerForm.loadData()
    }
  }
}
</script>

<style lang="css">
</style>
