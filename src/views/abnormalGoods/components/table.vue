<template>
    <el-table
    :data="tableData"
     size="small"
     align="center"
     style="width: 100%">

     <el-table-column
      type="index"
      label="序号">
    </el-table-column>

     
    <el-table-column
      prop="skuCode"
      label="商品编码">
    </el-table-column>

    <el-table-column
      width="120px"
      prop="skuName"
      label="商品名称">
    </el-table-column>

    <el-table-column
      prop=""
      label="采购单价">
    </el-table-column>

    <el-table-column
      prop=""
      label="供应商名称" >
    </el-table-column>


     <el-table-column
      prop=""
      label="采购合同编号" >
    </el-table-column>

     <el-table-column
      prop=""
      label="仓库" >
    </el-table-column>

     <el-table-column
      prop=""
      label="申请数量" >
      <template slot-scope="scope">
        <template v-if="scope.row.edit">
          <el-input
            size="mini"
            style="width:70px"
            v-model.number="scope.row.申请数量" >
            </el-input>
        </template>
          <span v-else>
          {{scope.row.申请数量}}
        </span>
    </template>
    </el-table-column>

     <el-table-column
      prop=""
      label="金额" >
    </el-table-column>

     <el-table-column
      width="160"
      label="操作" >
      <template slot-scope="scope">
          <div style="width:160px">
              <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index,'确定')" size="mini" >确定</el-button>
              <el-button v-else @click="goeditrow(scope.$index,'编辑')" size="mini" >编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
export default {

  props:{
    tableData:{
       type:Array,
       default:()=>[]
     },
  },

  methods:{
    goeditrow(index,type){
       this.$emit('goeditrow',index,type)
    },
    handleDelete(index,row){
       this.$emit('handleDelete',index,row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


