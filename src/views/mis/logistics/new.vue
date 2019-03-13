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
    <el-row class="mt20">
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

  <el-dialog :visible.sync="outStoreVisible">
    
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      addForm: {},
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
      outTableData: [{orderNo: 't1aacc001'}],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      }
    }
  },
  computed: {
    ...mapGetters(['mapConfig'])
  },
  methods: {
    delOutStore(row) {

    },
    onSubmit() {
      console.log(this.addForm);
    },
    onCancel() {

    },
    unionOutStore() {

    }
  }
}
</script>

<style lang="css">
</style>
