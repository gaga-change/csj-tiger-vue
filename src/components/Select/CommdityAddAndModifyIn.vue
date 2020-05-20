<template>
  <div class="CommdityAddAndModify">
    <div class="tableBox">
      <div class="tableTitle">
        <item-title text="商品明细" />
        <div class="tableBtn">
          <el-button
            size="mini"
            class="addCommodity"
            @click="showDialog('add')"
            type="primary"
          >添加商品</el-button>
        </div>
      </div>
      <base-table
        :showIndex="true"
        :showControl="true"
        :config="tableConfig"
        :data="dataList"
      >
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">{{scope.row._hideEdit ? '编辑': '确认'}}</el-button>
          <el-button @click="handleDelete(scope.index)">删除</el-button>
        </template>
      </base-table>
    </div>
    <el-dialog
      title="新增商品"
      :visible.sync="addVisible"
      width="600px"
      :before-close="handleClose"
    >
      <add-form
        v-loading="skuInfoListLoading"
        @submit="submit"
        :params="params"
        @skuCodeChange="skuCodeChange"
        :searchForm="addCommodityForm"
        @handleClose="handleClose"
      ></add-form>
    </el-dialog>
  </div>
</template>
<script>
import editTable from '@/components/Table/editTable';
import addForm from './components/addFormIn'

export default {
  components: { editTable, addForm },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    numberKey: String,
    value: Array,
    tableConfig: Array,
    checkInput: Function
  },
  data() {
    return {
      skuInfoListLoading: false,
      addVisible: false,
      skuList: [],
      addCommodityForm: {},
      dataList: [],
      oldParams: ''
    }
  },
  watch: {
    params(val) {
      if (JSON.stringify(val) !== this.oldParams) {
        this.oldParams = JSON.stringify(val)
        this.dataList = []
        this.$emit('update', [])
      }
    }
  },
  created() {
    if (this.value) {
      this.dataList = [...this.value].map(v => ({ ...v, _hideEdit: true }))
    }
  },
  methods: {
    showDialog(type) {

      this.addVisible = true;
      this.skuList = []
      this.addCommodityForm = {}
    },
    handleEdit(row) {
      if (!row._hideEdit) {
        if (this.checkInput(row)) {
          row._hideEdit = !row._hideEdit
          this.$emit('update', [...this.dataList])
        }
      } else {
        row._hideEdit = !row._hideEdit
        this.$emit('update', [...this.dataList])
      }
    },
    handleDelete(index) {
      this.dataList.splice(index, 1)
      this.$emit('update', [...this.dataList])
    },
    handleClose() {
      this.addVisible = false;
    },
    //添加商品时选择商品编码的回调
    skuCodeChange(value) {
      this.addCommodityForm = value
    },
    submit(type, value) {
      let index = this.dataList.findIndex(v => v.skuCode === value.skuCode);
      if (index !== -1) {
        this.$alert('该商品已在列表中')
      } else {
        value = this.$copy(value)
        value[this.numberKey] = value.number
        value._hideEdit = false
        this.dataList.push(value);
        this.addCommodityForm = {};
        this.addVisible = false;
        this.$emit('update', [...this.dataList])
      }
    }
  }
}
</script>

<style lang="scss">
.CommdityAddAndModify {
  .tableBox {
    .tableTitle {
      display: flex;
      justify-content: space-between;
      margin: 16px 0;
    }
    .tableBtn {
      display: flex;
    }
    .addCommodity {
      height: 28px;
      line-height: 26px;
      padding: 0 12px;
      margin-left: 12px;
    }
  }
}
</style>