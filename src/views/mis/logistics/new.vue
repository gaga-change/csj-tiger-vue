<template lang="html">
<div class="app-container">
  <el-form :model="addForm" ref="addForm" label-width="80px">
    <item-title text="承运商信息" />
    <el-card shadow="hover">
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送类型" prop="sendtype">
            <el-select  v-model="addForm.warehouseCode" clearable  placeholder="请选择配送类型" size="small" class="formitem">
              <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="承运商" prop="carrier">
            <el-select  v-model="addForm.carrier" value-key="id" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in carrier" :label="item.name" :key="item.id"  :value="item">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6" v-show="addForm.carrier&&addForm.carrier.value">
          <el-form-item label="承运商编码" >
            <el-input :value="addForm.carrier&&addForm.carrier.value" class="formitem" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="结算方式" prop="sendtype">
            <el-select  v-model="addForm.warehouseCode" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in mapConfig['getWarehouse']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="物流单号" prop="sendtype">
            <el-input v-model="addForm.logisticsNo" class="formitem" size="small" placeholder="请输入物流单号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="出库单信息" class="mt10" />
    <el-card shadow="hover">
      <el-row>
        <el-button type="primary" @click="unionOutStore" size="mini">关联出库单</el-button>
      </el-row>
      <el-table
        :data="outTableData"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              @click="delOutStore(scope.row)"
              :style="linkstyle"
            >
              删除
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <item-title text="客户信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="客户名称" >
            <el-input v-model="outTableData[0]&&outTableData[0].customer" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="地址" >
            <el-input v-model="outTableData[0]&&outTableData[0].address" class="formitem" size="small" placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系人" >
            <el-input v-model="outTableData[0]&&outTableData[0].linkUser" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="联系电话" >
            <el-input v-model="outTableData[0]&&outTableData[0].phone" class="formitem" size="small" disabled placeholder="请关联出库单"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <item-title text="明细信息" class="mt10"  />
    <el-card shadow="hover" >
      <el-row>
        <el-col :span="8">
          <el-form-item label="费用计算区分" labelWidth="100px">
            <el-select  v-model="addForm.computeType" value-key="id" clearable  placeholder="请选择结算方式" size="small" class="formitem">
              <el-option v-for="item in computeTypes" :label="item.name" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item labelWidth="0">
            <el-checkbox v-model="addForm.isUseFormula" :checked="true">使用公司计算运费</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="addForm.computeType === 1">
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="箱数" >
            <el-input type="number" v-model.number="addForm.boxnum" class="formitem" size="small" placeholder="请输入箱数">
              <span slot="suffix">箱</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积" >
            <el-input type="number" v-model.number="addForm.size" class="formitem" size="small" placeholder="请输入体积">
              <span slot="suffix">m³</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="单价" >
            <el-input type="number" v-model.number="addForm.price" class="formitem" size="small" placeholder="请输入体积">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="addForm.computeType === 2">
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量" >
            <el-input type="number" v-model.number="addForm.weight" class="formitem" size="small" placeholder="请输入重量">
              <span slot="suffix">kg</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="首重价格" >
            <el-input type="number" v-model.number="addForm.firstPrice" class="formitem" size="small" placeholder="请输入首重价格">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="续重单价" >
            <el-input type="number" v-model.number="addForm.price" class="formitem" size="small" placeholder="请输入续重单价">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="运费" >
            <el-input type="number" v-model.number="addForm.freight" class="formitem" size="small" placeholder="请输入运费">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="配送费" >
            <el-input type="number" v-model.number="addForm.distributionFee" class="formitem" size="small" placeholder="请输入配送费">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保价" >
            <el-input type="number" v-model.number="addForm.parcel" class="formitem" size="small" placeholder="请输入保价">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="保费" >
            <el-input type="number" v-model.number="addForm.premium" class="formitem" size="small" placeholder="请输入保费">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="车牌号" >
            <el-input type="text" v-model="addForm.carNumber" class="formitem" size="small" placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出发公里数" >
            <el-input type="number" v-model.number="addForm.gokm" class="formitem" size="small" placeholder="请输入出发公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="返回公里数" >
            <el-input type="number" v-model.number="addForm.backkm" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="过路费" >
            <el-input type="number" v-model.number="addForm.backkm" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="油费" >
            <el-input type="number" v-model.number="addForm.backkm" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="里程" >
            <el-input type="number" v-model.number="addForm.backkm" class="formitem" size="small" placeholder="请输入返回公里数">
              <span slot="suffix">km</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="24" :lg="16" :xl="12">
          <el-form-item label="备注" >
            <el-input  type="textarea" v-model="addForm.memos" :rows="1" placeholder="请输入备注">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-row class="mt20 mb30">
      <el-button
        type="primary"
        @click="onSubmit"
        v-loading="submitloading"
        :disabled="submitloading"
        >提交</el-button
      >
      <el-button @click="onCancel">取消</el-button>
    </el-row>
  </el-form>

  <el-dialog :visible.sync="outStoreVisible" width="80%">
    <outstore ref="outStore" @selectionChange="outStoreSelectionChange"></outstore>
    <span slot="footer" class="dialog-footer">
      <el-button @click="outStoreVisible = false">取 消</el-button>
      <el-button type="primary" @click="outStoreSure">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import outstore from './components/outstore'
export default {
  components: { outstore },
  data() {
    return {
      addForm: {
        computeType: 1
      },
      carrier: [
        {value:'ABC000aaa4',name:'中通速读运输有限公司',id:1}
      ],
      submitloading: false,
      columns: [
        {label:'业务单号',prop:'orderNo'},
        {label:'出库单号',prop:'outNo'},
        {label:'货主',prop:'owner'},
        {label:'客户名称',prop:'customer'}
      ],
      outTableData: [],
      multipleData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      outStoreVisible: false,
      computeTypes: [
        {name:'按体积计算',value:1},
        {name:'按重量计算',value:2}
      ]
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    outStoreSelectionChange(val) {
      this.multipleData = val
    },
    outStoreSure() {
      this.outTableData = this.multipleData
      this.outStoreVisible = false
    },
    delOutStore(row) {
      this.outTableData = this.outTableData.filter(item => item !== row)
    },
    onSubmit() {
      console.log(this.addForm);
    },
    onCancel() {

    },
    unionOutStore() {
      this.outStoreVisible = true
      this.$nextTick(() => {
        this.$refs.outStore.fetchData()
      })
    }
  }
}
</script>

<style lang="css">
</style>
