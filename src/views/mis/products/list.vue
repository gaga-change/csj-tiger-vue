<template lang="html">
  <div class="app-container">
    <search :config="searchConfig" @submitForm="submitSearchForm" @resetForm="resetSearchForm"></search>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="small" style="margin:10px" @click="newProduct">创建商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="importProduct">批量导入商品</el-button>
      <el-button type="primary" size="small" style="margin:10px" @click="editProducts">批量修改</el-button>
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
   <!--  <el-dialog
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
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-show="uploadButtonVisible" :loading="uploadLoading">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls和xlsx文件,文件最大不能超过5M1。
          <a class="dlink" :href="templetUrl" style="color:#409EFF;" >下载模板</a>
        </div>
      </el-upload>
    </el-dialog> -->
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
        :http-request="uploadFile"
        :on-change="handelUploadChange"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-show="uploadButtonVisible" :loading="uploadLoading">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls和xlsx文件,文件最大不能超过5M1。
          <a class="dlink" :href="templetUrl" style="color:#409EFF;" >下载模板</a>
        </div>
      </el-upload>
    </el-dialog>
    <!-- 上传弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      center
      width="50%">
      <el-upload
        class="upload-demo"
        ref="editUpload"
        :action="editUploadUrl"
        :limit="1"
        name="file"
        :file-list="editFileList"
        :accept="'.xls,.xlsx'"
        :on-change="handelEditUploadChange"
        :on-success="handleEditUploadSuccess"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="editSubmitUpload" v-show="editUploadButtonVisible" :loading="editUploadLoading">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls和xlsx文件,文件最大不能超过5M2。
          <a class="dlink" :href="editTempletUrl" style="color:#409EFF;">下载模板</a>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import search from '@/components/Search'
import { productConfig } from './components/config'
import { getProductList, deleteProduct, RequestUploads } from '@/api/productcenter'
import BaseTable from '@/components/Table'
import moment from 'moment';
import { mapGetters } from 'vuex'
export default {
  name: 'productsList',
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
      templetUrl: '/static/templet/skuImport.xlsx',
      fileList: [],
      uploadButtonVisible: false,
      editDialogVisible: false,
      editUploadUrl: '/webApi/sku/info/importUpdate',
      editTempletUrl: '/static/templet/skuImport.xlsx',
      editFileList: [],
      editUploadButtonVisible: false,
      uploadLoading: false,
      editUploadLoading: false,
      isCheck:true
    }
  },
  computed: {
    searchConfig() {
      const selectOptions = this.mapConfig['billOwnerInfoMap']
      return [
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
            <div style={{ display: 'flex', flexWrap: 'nowrap'}}>
              <span>
                <a
                  onClick={() => {
                    this.view({ skuCode: row.skuCode, ownerCode: row.ownerCode })
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
                <a
                  onClick={() => {
                    this.deleteItem({ skuCode: row.skuCode, ownerCode:row.ownerCode })
                  }}
                  style={this.linkstyle}
                >
                  删除
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
    uploadFile(params){
      this.uploadLoading = false
      const _file = params.file;
      const isLt5M = _file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("请上传5M以下的.xlsx文件");
        return false;
      }
      // 通过 FormData 对象上传文件
      let that=this
      this.isCheck=true
      var formData = new FormData();
      formData.append('file', _file);
      formData.append('isCheck', this.isCheck);
      RequestUploads(formData).then(res => {
        if (res.code === '200') {
          if (res.success) {
            this.dialogVisible = false
            this.fetchData()
          } else {
            this.$message({ message: res.errorMsg, type: 'error' })
          }
        }else if(res.code=='ratel-40620008') {
          this.$confirm(res.errorMsg, '提示', {
            confirmButtonText: '继续导入',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(_ => {
            that.isCheck=false
            formData.set('isCheck', that.isCheck)
            RequestUploads(formData).then(res=>{
              if (res.code === '200') {
                if (res.success) {
                  that.dialogVisible = false
                  that.fetchData()
                } else {
                  that.$message({ message: res.errorMsg, type: 'error' })
                }
              }else{
                that.$message({
                  message: res.errorMsg,
                  type: 'error'
                })
              }
            })
          }).catch(_ => {
            that.dialogVisible = false
          })
        }else{
          this.$message({
            message: res.errorMsg,
            type: 'error'
          })
          // this.$refs['upload'].clearFiles()
        }
        this.$refs['upload'].clearFiles()
      })
    },
    handleUploadSuccess(res, file, fileList) {
      this.uploadLoading = false
      if (res.code === '200') {
        if (res.success) {
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message({ message: res.errorMsg, type: 'error' })
        }
        // this.$confirm(res.message, '提示', {
        //   confirmButtonText: '完成',
        //   cancelButtonText: '继续导入',
        //   type: 'success'
        // }).then(_ => {
        //   this.dialogVisible = false
        //   this.fetchData()
        // }).catch(_ => {})
      } else {
        this.$message({
          message: res.errorMsg,
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
      this.uploadLoading = true
      this.$refs.upload.submit()
    },
    handleEditUploadSuccess(res, file, fileList) {
      this.editUploadLoading = false
      if (res.code === '200') {
        this.$confirm(res.message, '提示', {
          confirmButtonText: '完成',
          cancelButtonText: '继续导入',
          type: 'success'
        }).then(_ => {
          this.editDialogVisible = false
          this.fetchData()
        }).catch(_ => { })
      } else {
        this.$message({
          message: res.errorMsg,
          type: 'error'
        })
      }
      this.$refs['editUpload'].clearFiles()
    },
    handelEditUploadChange(file, fileList) {
      // 选择文件时显示上传按钮
      if (Object.keys(file).length && fileList.length) {
        this.editUploadButtonVisible = true
      } else {
        this.editUploadButtonVisible = false
      }
    },
    editSubmitUpload() {
      this.editUploadLoading = true
      this.$refs.editUpload.submit()
    },
    importProduct() {
      this.dialogVisible = true
    },
    editProducts() {
      this.editDialogVisible = true
    },
    edit(query) {
      this.$router.push({
        path: `/mis/products/newproduct`,
        query: { ...query, time: moment().valueOf() }
      })
    },
    view(query) {
      this.$router.push({ name: 'misproductdetail', query })
    },
    deleteItem(data){
      this.$confirm('是否删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'success'
        }).then(_ => {
          deleteProduct(data).then(res=>{
            if(res.success){
              this.$message.success('删除成功')
              this.fetchData()
            }else{
              this.$message.success('删除失败')
            }
          })
        }).catch(_ => { })
    },
    newProduct() {
      this.$router.push({
        path: `/mis/products/newproduct?time=${moment().valueOf()}`
      })
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
      const postData = {
        startDate: gmtCreate && new Date(gmtCreate[0]).getTime(),
        endDate: gmtCreate && new Date(gmtCreate[1]).getTime(),
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...rest
      }

      getProductList(postData).then(res => {
        this.tableData = res.data && res.data.list
        this.total = res.data.total
        this.pageNum = res.data.pageNum
        this.loading = false
      }).catch(err => {
        console.error(err)
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
