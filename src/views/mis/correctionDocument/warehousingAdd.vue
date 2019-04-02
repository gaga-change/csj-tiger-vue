<template>
  <div class="addCarrier">
    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主">
              <el-select v-model="searchForm._owner" clearable placeholder="请选择货主：" size="small" class="formitem">
                <el-option v-for="item in owners" :label="item.ownerName" :key="item.ownerCode" :value="item.ownerCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="(searchForm._owner + '')">
            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="入库单号">
                <el-select v-model="searchForm._orderCode" clearable placeholder="请选择入库单号：" size="small" class="formitem">
                  <el-option v-for="(item, index) in orderCodes" :label="item" :key="index" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="业务单号:">
                <el-input v-model="searchForm.busiBillNo" placeholder="请输入业务单号" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="供应商:">
                <el-input v-model="searchForm.供应商" placeholder="请输入供应商" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="订正类型">
                <el-select @change="revisalTypeChange" v-model="searchForm.revisalType" clearable placeholder="请选择订正类型："
                  size="small" class="formitem">
                  <el-option v-for="item in revisalTypeEnum" :label="item.name" :key="item.value" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>

      <el-tabs v-model="activeName">
        <el-tab-pane label="商品明细" name="Inventory">
          <div class="revisalEditTable">
            <edit-Table @currentRedioChange="handleCurrentRedioChange" :highlightCurrentRow="true" :loading="loading"
              :config="carrierDetail_Config" :allTableData="carrierDetail_data" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="订正记录" name="records">
          <web-pagination-table :loading="loading" :config="carrierrecords_Config" :allTableData="carrierrecords_data" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <div class="operationitem">
      <el-button @click="submit('save')" type="primary">保存</el-button>
      <el-button @click="submit('submit')" type="primary">提交</el-button>
    </div>

  </div>
</template>

<script>
import { revisalTypeEnum } from "@/utils/enum.js";
import { carrierrecords_Config, carrierDetail_Config } from './components/config'
import webPaginationTable from '@/components/Table/webPaginationTable';
import editTable from '@/components/Table/editTable';
import { queryOwners, inOrderCode } from '@/api/correction'
import _ from 'lodash';
export default {
  name: 'warehousingAdd',
  components: { webPaginationTable, editTable },
  data() {
    return {
      searchForm: {
        revisalType: 1,
        _owner: '',
        _orderCode: '',
      },
      //标签项
      activeName: 'Inventory',
      //订正枚举
      revisalTypeEnum,
      //商品明细
      carrierDetail_Config,
      carrierDetail_data: [{ id: 1, 调整数量: '/', 调整金额: '/' }, { id: 3, 调整数量: '/', 调整金额: '/' }],//需要id
      //订正记录
      loading: false,
      carrierrecords_Config,
      carrierrecords_data: [],
      owners: [], // 货主列表
      orderCodes: [], // 单号
    }
  },
  computed: {
    checkOwner() {
      return (this.searchForm._owner + '') || ''
    }
  },
  watch: {
    checkOwner(newVal, oldVal) {
      this.initOrder(newVal)
    }
  },
  created() {
    this.initOwner()
  },
  methods: {
    /** 初始化 货主列表 */
    initOwner() {
      queryOwners().then(res => {
        this.owners = res.data || []
      })
    },
    /** 初始化 单号列表 */
    initOrder(code) {
      this.orderCodes = []
      this.searchForm._orderCode = ''
      if (code) {
        inOrderCode(code).then(res => {
          this.orderCodes = res.data
        })
      } else {
        this.orderCodes = []
      }
    },
    revisalTypeChange(value) {
      let config = _.cloneDeep(this.carrierDetail_Config);
      let data = _.cloneDeep(this.carrierDetail_data);
      if (value === 1) {
        config[config.length - 1] = { label: '调整金额 ', prop: '调整金额', useEdit: true, width: 150 }
      } else if (value === 2) {
        config[config.length - 1] = { label: '调整数量 ', prop: '调整数量', useEdit: true, width: 150 }
      }
      this.carrierDetail_Config = config;
      this.carrierDetail_data = data.map(v => {
        v.调整数量 = '/';
        v.调整金额 = '/';
        v.edit = false;
        return v;
      });


      //操作dom样式
      let td = [...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr td')];
      td.forEach(v => {
        v.style.cssText = ""
      })

    },

    submit(type) {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let json = _.cloneDeep(this.searchForm);
          json.item = this.carrierDetail_data.filter(v => v.edit);
          console.log({ ...json })
        }
      })
    },

    //点击某一行的回调
    handleCurrentRedioChange(currentRow, oldCurrentRow) {

      if (!currentRow) {
        return false
      }

      let data = _.cloneDeep(this.carrierDetail_data);
      data = data.map(v => {
        if (v.id === _.cloneDeep(currentRow).id) {
          return { ...v, edit: true }
        } else {
          return { ...v }
        }
      })

      this.carrierDetail_data = data;


      //高亮效果  此处有异步问题
      setTimeout(() => {
        let revisalEditTable = [...document.querySelectorAll('.revisalEditTable .el-table__body-wrapper  tbody tr')];
        revisalEditTable.forEach(item => {
          let td = [...item.querySelectorAll('td')]
          if (item.innerHTML.includes('el-input-number')) {
            td.forEach(v => {
              v.style.cssText = "color:#fff;background:green !important"
            })
          }
        })
      }, 20)
    },

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  width: 1200px;
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
  .el-table__row {
    cursor: pointer;
  }
}
</style>
