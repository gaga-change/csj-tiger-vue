<template>
  <div class="ediTabel-box">
    <el-table
    :data="tableData"
     size="mini"
     align="center"
     style="width: 100%">
    <el-table-column label="商品信息" align="center" >
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
        prop="skuFormat"
        label="规格型号">
      </el-table-column>

      <el-table-column
        label="已收票数量" >
        <template slot-scope="scope">
            <span >{{scope.row.invoicedQty||0}}</span>
          </template>
      </el-table-column>

      <el-table-column
        prop="skuUnitName"
        label="单位" >
      </el-table-column>
      
      <el-table-column
        prop="taxRate"
        label="税率" >
      </el-table-column>
    </el-table-column>

    <el-table-column label="入库信息" align="center">
      <el-table-column
        prop="inPrice"
        label="入库单价" >
        <template slot-scope="scope">
            <span >{{Number(scope.row.inPrice).toFixed(2)}}</span>
          </template>
      </el-table-column>

      <el-table-column
        prop="realInQty"
        label="已入库数量" >
      </el-table-column>

      <el-table-column
        label="已入库金额" >
        <template slot-scope="scope">
            <span >{{Number(scope.row.realInQty*scope.row.inPrice).toFixed(2)}}</span>
          </template>
      </el-table-column>
    </el-table-column>

  <el-table-column label="本张发票商品信息" align="center">
    <el-table-column
        :width="110"
        :label="labelMak?'红冲数量':'数量'" >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input
              size="mini"
              style="width:80px"
              v-model="scope.row.invoiceQty" >
              </el-input>
          </template>
           <span v-else>
            {{scope.row.invoiceQty}}
          </span>
      </template>
    </el-table-column>

     <el-table-column
         :width="110"
         label="单价" >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input
              size="mini"
              style="width:80px"
              v-model="scope.row.incomingUnitPrice" >
              </el-input>
          </template>
           <span v-else>
            {{scope.row.incomingUnitPrice}}
          </span>
      </template>
    </el-table-column>

    <el-table-column
      label="金额" >
       <template slot-scope="scope">
          <span >{{Number(scope.row.invoiceQty*scope.row.incomingUnitPrice).toFixed(2)}}</span>
        </template>
    </el-table-column>
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
  </div>
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
    goeditrow(index,type){
       this.$emit('goeditrow',index,type)
    },
    handleDelete(index,row){
       this.$emit('handleDelete',index,row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >

  .ediTabel-box{
    .el-table--border{
    border-color:#dbdee3; 
    *{
      border-color:#dbdee3 !important;
    }
    
    }
    border-bottom: 1px solid #dbdee3;
    margin-bottom: -4px;
  }

</style>


