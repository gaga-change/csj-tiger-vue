<template lang="html">
  <div class="app-container">
    <search :config="searchConfig" @submitForm="submitSearchForm" @resetForm="resetSearchForm"></search>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">创建商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="importProduct">批量导入商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">批量修改</el-button>
    </el-row>
    <base-table
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="productConfig"
      :total="total"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"
    />
    <!-- 上传弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      center
      width="50%">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        :limit="1"
        name="file"
        :file-list="fileList"
        :accept="'.xls,.xlsx'"
        :on-change="handelUploadChange"
        :on-success="handleUploadSuccess"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-show="uploadButtonVisible">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls和xlsx文件,文件最大不能超过5M。
          <a class="dlink" :href="templetUrl" >下载模板</a>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { productConfig } from './components/config'
import { getProductList } from '@/api/productcenter'
import BaseTable from '@/components/Table'
import { mapGetters } from 'vuex'
export default {
  components: { search, BaseTable },
  data() {
    return {
      searchData: {},
      pageSize: 10,
      pageNum: 1,
      total: 0,
      loading: false,
      tableData: [],
      linkstyle: {
          color: '#3399ea',
          whiteSpace: 'nowrap',
          margin: '0 10px 0 0'
      },
      productConfig,
      dialogVisible: false,
      uploadUrl: '/webApi/sku/info/import',
      templetUrl: '/static/templet/product.xls',
      fileList: [],
      uploadButtonVisible: false
    }
  },
  computed: {
    searchConfig() {
      const selectOptions = this.mapConfig['ownerInfoMap']
      return  [
        { label: '商品名称:', prop: 'skuName', placeholder: '请输入商品名称' },
        { label: '商品编码:', prop: 'skuCode', placeholder: '请输入商品编码' },
        { label: '规格:', prop: 'skuFormat', placeholder: '请输入规格' },
        { label: '创建时间:', prop: 'gmtCreate', type: 'daterange' },
        { label: '货主:', prop: 'ownerCode', placeholder: '请选择货主', type: 'select', selectOptions },
      ]
    },
    ...mapGetters(['mapConfig'])
  },
  created() {
    this.productConfig.map(item => {
      if (item.useLink) {
        item.dom = (row, column, cellValue, index) => {
          return (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <span>
              <a
                onClick={() => {
                  this.view({ skuCode: row.skuCode })
                }}
                style={this.linkstyle}
              >
                查看
              </a>
                <a
                  onClick={() => {
                    this.edit({ skuCode: row.skuCode })
                  }}
                  style={this.linkstyle}
                >
                  修改
                </a>
              </span>
            </div>
          )
        }
      }
    })
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleUploadSuccess(res, file, fileList) {
      if (res.code === '200') {
        this.$confirm(res.message, '提示', {
          confirmButtonText: '完成',
          cancelButtonText: '继续导入',
          type: 'success'
        }).then(_ => {
          this.dialogVisible = false
          this.fetchData()
        }).catch(_ => {})
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.$refs['upload'].clearFiles()
    },
    handelUploadChange(file, fileList) {
      // 选择文件时显示上传按钮
      if (Object.keys(file).length && fileList.length) {
        this.uploadButtonVisible = true
      } else {
        this.uploadButtonVisible = false
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    importProduct() {
      this.dialogVisible = true
    },
    edit(query) {
      this.$router.push({ name: 'newproduct', query })
    },
    view(query) {
      this.$router.push({ name: 'misproductdetail', query })
    },
    newProduct() {
      this.$router.push('newproduct')
    },
    newPayment() {
      this.dialogFormVisible = true
    },
    submitSearchForm(val) {
      this.searchData = val
      this.fetchData()
    },
    resetSearchForm() {
      this.searchData = {}
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      const { gmtCreate, ...rest } = this.searchData
      const postData = {startDate: gmtCreate && new Date(gmtCreate[0]).getTime(), endDate: gmtCreate && new Date(gmtCreate[1]).getTime(), ...rest}
      getProductList({ ...postData, pageSize: this.pageSize, pageNum: this.pageNum }).then(res => {
        this.tableData = res.data && res.data.list
        this.total = res.data.total
        this.pageNum = res.data.pageNum
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.fetchData()
    },
  }
}
</script>

<style lang="css">
</style>
