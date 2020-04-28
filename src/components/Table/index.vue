<template>
  <div class="Component_Table_index">
    <el-table
      v-loading="loading"
      :element-loading-text="elementLoadingText"
      :element-loading-background="elementLoadingBackground"
      :data="tableData"
      :highlight-current-row="highlightCurrentRow"
      @current-change="handleCurrentRedioChange"
      @selection-change="handleSelectionChange"
      :summary-method="summaryMethod"
      :border="border"
      :show-summary="showSummary"
      size="mini"
      :style="tableStyle"
    >
      <el-table-column
        type="selection"
        v-if="showMul"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-for="item in tableConfig"
        :formatter="item.formatter"
        :fixed="item.fixed"
        :width="item.width"
        :min-width="item.minWidth"
        :key="item.lable"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>

    </el-table>

    <el-pagination
      :style="paginationStyle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="tableCurrentPage"
      :page-sizes="pageSizes"
      size="mini"
      :page-size="tablePageSize"
      :layout="layout"
      v-if="total>maxTotal"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>

import _ from 'lodash';
import moment from 'moment';
import { mapGetters } from 'vuex'
import * as Enum from "@/utils/enum.js";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    useRadio: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      defalut: false
    },
    summaryMethod: {
      type: Function,
      default: () => { }
    },
    tableData: {
      type: Array,
      default: () => []
    },
    config: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 50, 100, 500]
    },
    pageSize: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    maxTotal: {
      type: Number,
      default: 10
    },
    elementLoadingText: {
      type: String,
      default: "加载中"
    },
    elementLoadingBackground: {
      type: String,
      default: "rgba(255, 255, 255, 0.5)"
    },
    border: {
      type: Boolean,
      default: true
    },
    tableStyle: {
      type: String,
      default: "width: 100%"
    },
    paginationStyle: {
      type: String,
      default: "marginTop:16px"
    },
    total: {
      type: Number,
      default: 0
    },
    showMul: {//多选框
      type: Boolean,
      default: false
    }

  },

  data() {
    return {
      tableConfig: [],
    }
  },
  created() {

  },
  beforeMount() {
    let tableConfig = _.cloneDeep(this.config);
    for (let i in tableConfig) {
      if (tableConfig[i].type) {
        if (tableConfig[i].useApi) {
          tableConfig[i].formatter = (row, column, cellValue, index) => this.mapConfig[tableConfig[i].type] && this.mapConfig[tableConfig[i].type].find(v => v.key == cellValue) && this.mapConfig[tableConfig[i].type].find(v => v.key == cellValue).value || cellValue
        } else if (tableConfig[i].useLocalEnum) {
          tableConfig[i].formatter = (row, column, cellValue, index) => Enum[tableConfig[i].type] && Enum[tableConfig[i].type].find(v => v.value == cellValue) && Enum[tableConfig[i].type].find(v => v.value == cellValue).name || cellValue
        } else {
          switch (tableConfig[i].type) {
            case 'time': tableConfig[i].formatter = (row, column, cellValue, index) => cellValue ? moment(cellValue).format(tableConfig[i].format || 'YYYY-MM-DD HH:mm:ss') : ''; break;
            case 'Boolean': tableConfig[i].formatter = (row, column, cellValue, index) => cellValue ? '是' : '否'; break;
            case 'index': tableConfig[i].formatter = (row, column, cellValue, index) => (this.pageSize) * (this.currentPage - 1) + index + 1; break;
            case 'toFixed': tableConfig[i].formatter = (row, column, cellValue, index) => cellValue && Number(Number(cellValue).toFixed(2)) || tableConfig[i].format || ''; break;
            case 'code': tableConfig[i].formatter = (row, column, cellValue, index) => <bar-code code={cellValue} />; break;
            case 'files': tableConfig[i].formatter = (row, column, cellValue, index) => {
              let files = row.files || row.filePathList;
              if (!files || files.length < 1) {
                return ''
              }
              if(row.files){
                return <el-dropdown>
                  <span class="el-dropdown-link">
                    查看附件<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    {
                      files.map((v, i) => <el-dropdown-item>
                        <a class="el-dropdown-link" target="_blank" href={v.path}>{v.name || `附件${i + 1}`}</a>
                      </el-dropdown-item>)
                    }
                  </el-dropdown-menu>
                </el-dropdown>
              }else{
                return <p>
                  <div>
                    {
                      files.map((v, i) => 
                        <div class="tableLinkBox"><a class="tableLink" target="_blank" href={v.filePath}>{v.fileName || `附件${i + 1}`}</a></div>
                      )
                    }
                  </div>
                </p>
              }
            }; break;
          }
        }
      } else if (tableConfig[i].dom) {
        tableConfig[i].formatter = tableConfig[i].dom
      } else if (tableConfig[i].linkTo) {
        tableConfig[i].formatter = (row, column, cellValue, index) => {
          let json = {};
          tableConfig[i].query.forEach(item => {
            json[item.key] = row[item.value]
          })
          return <router-link to={{ path: tableConfig[i].linkTo, query: json }} style={{ color: '#3399ea' }}>{tableConfig[i].linkText ? tableConfig[i].linkText : cellValue}</router-link>
        }

      } else {
        tableConfig[i].formatter = (row, column, cellValue, index) => cellValue !== undefined && cellValue !== null && cellValue !== '' ? cellValue : ''
      }
    }
    this.tableConfig = tableConfig;

  },

  computed: {

    ...mapGetters([
      'mapConfig',
    ]),

    tablePageSize: {
      get: function () {
        return this.pageSize
      },
      set: function () {

      }
    },

    tableCurrentPage: {
      get: function () {
        return this.currentPage
      },
      set: function () {

      }
    },

  },

  methods: {

    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },

    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    },

    handleCurrentRedioChange(currentRow, oldCurrentRow) {
      this.$emit('currentRedioChange', currentRow, oldCurrentRow);
    },
    handleSelectionChange(val) {
      this.$emit('selectionPartentChange', val)
    }



  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.Component_Table_index {
  width: 100%;
  .el-radio__label {
    display: none;
  }
}
</style>
