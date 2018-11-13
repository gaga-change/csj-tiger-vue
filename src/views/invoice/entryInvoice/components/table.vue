<template>
    <el-table
    :data="tableData"
     size="small"
     align="center"
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
      prop="realInQty"
      label="已入库数量" >
    </el-table-column>

     <el-table-column
      label="已入库金额" >
       <template slot-scope="scope">
          <span >{{scope.row.realInQty*scope.row.taxPrice}}</span>
        </template>
    </el-table-column>

     <el-table-column
      prop="invoicedQty"
      label="已开票数量" >
    </el-table-column>

      <el-table-column
      label="已开票金额" >
       <template slot-scope="scope">
          <span >{{scope.row.invoicedQty*scope.row.taxPrice}}</span>
        </template>
    </el-table-column>

     <el-table-column
      prop="taxCode"
      label="税率" >
    </el-table-column>

    <el-table-column
        :label="labelMak?'红冲数量':'本次开票数量'" >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input-number 
              size="mini"
              :max="scope.row.realInQty-scope.row.invoicedQty" 
              :min="0" 
              style="width:100px"
              v-model="scope.row.invoiceQty" >
              </el-input-number>
          </template>
           <span v-else>
            {{scope.row.invoiceQty}}
          </span>
      </template>
    </el-table-column>

     <el-table-column
      label="本次开票金额" >
       <template slot-scope="scope">
          <span >{{scope.row.invoiceQty*scope.row.taxPrice}}</span>
        </template>
    </el-table-column>

     <el-table-column
      width="150"
      label="操作" >
      <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
          <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
     labelMak:{
       type:Boolean,
       default:false
     }
  },

  methods:{
    goeditrow(index){
       this.$emit('goeditrow',index)
    },
    handleDelete(index,row){
       this.$emit('handleDelete',index,row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


