<template>
    <el-table
    :data="[]"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="商品编码"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="name"
      label="规格型号"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="address"
      label="单位" >
    </el-table-column>

     <el-table-column
      prop="address"
      label="单价" >
    </el-table-column>
    
  </el-table>
</template>

<script>
export default {
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


