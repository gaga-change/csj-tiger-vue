<template>
    <el-table
    :data="tableData"
     size="small"
     style="width: 100%">
     
    <el-table-column
      prop="skuCode"
      label="商品编码">
    </el-table-column>

    <el-table-column
      prop="skuFormat"
      label="规格型号">
    </el-table-column>

    <el-table-column
      prop="skuUnitName"
      label="单位" >
    </el-table-column>

     <el-table-column
      prop="taxPrice"
      label="单价" >
    </el-table-column>

     <el-table-column
      prop="realInQty "
      label="已入库数量" >
    </el-table-column>

     <el-table-column
      prop=""
      label="已入库金额" >
    </el-table-column>

     <el-table-column
      prop="invoicedQty"
      label="已开票数量" >
    </el-table-column>

     <el-table-column
      prop=""
      label="税率" >
    </el-table-column>

    <el-table-column
      prop="invoiceQty"
      label="本次开票数量" >
    </el-table-column>

     <el-table-column
      prop=""
      label="本次开票金额" >
    </el-table-column>

     <el-table-column
      prop=""
      label="操作" >

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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


