<template lang="html">
  <div class="app-container">
    <div class="left">
      <div class="menuspan">
        <div class="treefoot" @click="getCategory({ id: 0 })">平台商品分类</div>
        <el-tree
          :data="tree"
          :props="defaultProps"
          class="treeclass"
          accordion
          @node-click="getCategory"
        >
        </el-tree>
      </div>
    </div>
    <div class="right" v-loading="loading">
      <div class="itemscont">
        <div style="text-align:right;">
          <el-button type="primary" size="mini" @click="addnewcategory()">新增分类</el-button>
        </div>
        <el-form :model="categoryForm" ref="categoryForm" key="categoryForm">
          <el-table
            :data="list"
            style="width:100%;margin-top:20px;"
            ref="multipleTable"
            :header-cell-style="{ background: '#ebf1f5' }"
            border
          >
            <el-table-column width="80" label="序号">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分类编码">
              <template slot-scope="scope">
                <span>{{ scope.row.categoryCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分类名称">
              <template slot-scope="scope">
                <span>{{ scope.row.categoryName }}</span>
              </template>
            </el-table-column>
            <el-table-column width="80" label="是否启用">
              <template slot-scope="scope">
                <span>{{
                  scope.row.isEnable === 1
                    ? '已启用'
                    : scope.row.isEnable === 0
                    ? '已禁用'
                    : ''
                }}</span>
              </template>
            </el-table-column>
            <el-table-column width="160" fixed="right" label="操作">
              <template slot-scope="scope">
                <span
                  style="color:#409EFF;cursor:pointer;margin-right:10px;"
                  @click="modifyCategory(scope.row)"
                  >修改</span
                >
                <span
                  style="color:#409EFF;cursor:pointer;"
                  @click="handleChangeState(scope.row)"
                  >{{
                    scope.row.isEnable === 1
                      ? '禁用'
                      : scope.row.isEnable === 0
                      ? '启用'
                      : ''
                  }}</span
                >
                <span
                  style="cursor:pointer;color:red;"
                  @click="handleDeletecategory(scope.row)"
                  >删除</span
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <!-- 新增弹框 -->
    <el-dialog title="分类" :visible.sync="createshow" width="50%">
      <div class="formdetail">
        <el-form
          :model="addForm"
          :rules="formrules"
          ref="createForm"
          label-width="120px"
        >
          <el-row>
            <el-col>
              <el-form-item label="分类名称" prop="categoryName">
                <el-input
                  v-model="addForm.categoryName"
                  style="width: 220px;"
                  placeholder="请输入分类名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="上级分类" prop="parentClassName">
                <el-input
                  v-model="addForm.parentClassName"
                  :disabled="type === 'edit'"
                  style="width: 220px;"
                  placeholder="请选择"
                  @focus="selectParentClass()"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="是否启用" prop="isEnable">
                <el-radio
                  v-model="addForm.isEnable"
                  :label="1"
                  :disabled="type === 'edit'"
                  >是</el-radio
                >
                <el-radio
                  v-model="addForm.isEnable"
                  :label="0"
                  :disabled="type === 'edit'"
                  >否</el-radio
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formonCancel">取 消</el-button>
        <el-button
          class="companybtn"
          @click="formonSubmit"
          :disabled="dialogbtn"
          type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分类 -->
    <el-dialog title="上级分类" :visible.sync="categoryVisible" width="320px">
      <div class="treefoot" @click="getfirstparentcategory">平台商品分类</div>
      <el-tree
        :data="tree"
        :props="defaultProps"
        accordion
        @node-click="getparentcategory"
      >
      </el-tree>
      <div v-show="addForm.parentClassName" style="margin-top:30px;">
        确定选择上级分类:<span style="color:#f89604;">{{
          addForm.parentClassName + '?'
        }}</span>
      </div>
      <el-button
        class="companybtn"
        size="mini"
        style="margin-top:30px;"
        type="primary"
        @click="getNewparentcategory()"
        >确定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import {
  categoryList,
  getCategoryListById,
  categoryAdd,
  deleteCategory,
  getCategoryDetailById,
  editCategory,
  disableOrEnableCategory
} from '@/api/productcenter'
export default {
  name: 'categorylist',
  data() {
    return {
      list: [],
      tree: [],
      multipleSelection: [],
      dialogVisible: false,
      categoryForm: {},
      ruleForm: {},
      loading: false,
      addForm: {
        categoryName: '',
        parentClassName: '',
        isEnable: null
      },
      formrules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        isEnable: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        parentClassName: [
          {
            required: true,
            message: '请选择上级分类',
            trigger: ['change', 'blur']
          }
        ]
      },
      createshow: false,
      categoryVisible: false,
      dialogbtn: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      type: ''
    }
  },
  created() {
    this.getCategory({ id: 0 })
    this.getTree()
  },
  methods: {
    handleChangeState(row) {
      const loading = this.$loading({ text: '正在处理...' })
      disableOrEnableCategory({
        categoryCode: row.categoryCode,
        disOrEnable: row.isEnable === 1 ? 0 : 1
      })
        .then(res => {
          loading.close()
          this.getCategory({ id: row.parentId || 0 })
        })
        .catch(err => {
          console.error(err)
          loading.close()
        })
    },
    addnewcategory() {      
      this.createshow = true
      this.$nextTick(() => {
        this.$refs['createForm'].resetFields()
      })
      this.type = 'add'
    },
    selectParentClass() {
      this.categoryVisible = true
    },
    formonCancel() {
      this.$nextTick(() => {
        this.$refs['createForm'].resetFields()
      })
      this.createshow = false
    },
    modifyCategory(row) {
      this.createshow = true
      this.dialogbtn = true
      this.type = 'edit'
      getCategoryDetailById(row.id)
        .then(res => {
          let { parentCategoryName, parentId, ...rest } = res.data
          this.dialogbtn = false
          if (parentId === 0) {
            parentCategoryName = '平台商品分类'
          }
          this.addForm = {
            parentClassName: parentCategoryName,
            parentId,
            ...rest
          }
        })
        .catch(err => {
          console.error(err)
          this.dialogbtn = false
        })
    },
    formonSubmit() {
      const Method = {
        add: categoryAdd,
        edit: editCategory
      }
      this.$refs['createForm'].validate(valid => {
        if (valid) {
          this.dialogbtn = true
          let postForm = {}
          if (this.type === 'edit') {
            postForm = {
              skuCategoryId: this.addForm.id,
              skuCategoryName: this.addForm.categoryName
            }
          } else if (this.type === 'add') {
            postForm = this.addForm
          }
          Method[this.type](postForm)
            .then(res => {
              this.dialogbtn = false
              this.createshow = false
              this.getCategory({ id: this.addForm.parentId || 0 })
              this.getTree()
              this.formonCancel()
            })
            .catch(err => {
              console.error(err)
              this.dialogbtn = false
            })
        }
      })
    },
    getCategory(item) {
      this.loading = true
      getCategoryListById(item.id)
        .then(res => {
          if (res.success) {
            this.list = res.data
            this.loading = false
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    getTree() {
      this.loading = true
      categoryList()
        .then(res => {
          this.tree = res.data.children || []
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    getparentcategory(item) {
      this.$set(this.addForm, 'parentClassName', item.text)
      this.addForm.parentCategoryCode = item.currentCode
      this.addForm.parentId = item.id
      this.addForm.isFirstLevel = 0
    },
    getfirstparentcategory() {
      this.$set(this.addForm, 'parentClassName', '平台商品分类')
      this.addForm.isFirstLevel = 1
    },
    getNewparentcategory() {
      this.categoryVisible = false
    },
    editRow(row, id, udf, udfValue) {
      row.value.edit = false
      let udfRow = row
      if (udfRow.value.type == 1) {
        if (!udfRow.value.key) {
          this.$message({
            message: '自定义属性名称/类型/是否禁用不能为空',
            type: 'error'
          })
          udfRow.value.edit = true
          return
        }
      } else if (udfRow.value.type == 2) {
        if (!udfRow.value.key || !udfRow.value.value) {
          this.$message({
            message: '自定义属性名称/类型/属性值/是否禁用不能为空',
            type: 'error'
          })
          udfRow.value.edit = true
          return
        }
      }
      udfValue = JSON.stringify(udfValue)
      addcategorytype({ id: id, udf: udf, type: 1, udfValue: udfValue })
        .then(res => {
          if (res.data.code == 'success') {
            this.$message({
              message: '自定义属性保存成功',
              type: 'success'
            })
            this.getCategory(id)
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    codeeditrow(index) {
      this.list5[index].value.edit = true
      this.$set(this.list5, this.list5[index], {
        edit: true,
        ...this.list5[index].value
      })
    },
    categoryeditrow(index) {
      this.list[index].edit = true
      this.$set(this.list, index, { edit: true, ...this.list[index] })
    },
    handleDeleteCode(index, id, udf, type, udfValue) {
      udfValue = JSON.stringify(udfValue)
      this.$alert('确认删除？', '提示', {
        confirmButtonText: '确认',
        type: 'success'
      }).then(_ => {
        addcategorytype({ id: id, udf: udf, type: 2, udfValue: udfValue })
          .then(res => {
            if (res.data.code == 'success') {
              this.$message({
                message: '成功删除一条数据',
                type: 'success'
              })
              this.getCategory(id)
              this.list5.splice(index, 1)
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              message: '失败',
              type: 'error'
            })
          })
      })
    },
    addtype() {
      let udf = ''
      for (let i = 1; i < 11; i++) {
        udf = 'udf' + i
        if (!this.udfdata[udf]) {
          break
        }
      }
      this.list5.push({
        id: this.udfdata.id,
        udf: udf,
        value: {
          key: '', //名称
          type: 1, //类型
          value: '', //属性值
          status: 1, //是否禁用
          edit: true
        }
      })
    },
    handleDeletecategory(item) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        deleteCategory(item.categoryCode)
          .then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getCategory({ id: item.parentId })
            this.getTree()
          })
          .catch(err => {
            this.$message({
              message: '失败',
              type: 'error'
            })
          })
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.dlink {
  color: #409eff;
}
h3 {
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  border: 1px solid #00a4ff;
  border-radius: 2px;
}
.leveldescri {
  color: #666;
  font-size: 14px;
}
.itemscont {
  background: #fff;
  padding: 15px 20px;
  border-radius: 5px;
}
.left {
  float: left;
  width: 220px;
}
.right {
  margin-left: 230px;
}
.menuspan {
  height: 600px;
  background: #f7f7f7;
  border: #f2f2f2 1px solid;
}
.treefoot {
  padding: 10px;
  color: #409eff;
  cursor: pointer;
}
</style>
