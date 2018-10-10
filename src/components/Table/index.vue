<template>
  <div class="ctabel">
      <el-table
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-background="elementLoadingBackground"
        :data="tableData"
        :border="border"
        :style="tableStyle">

        <el-table-column
          v-for="item in config"
          :formatter="item.formatter"
          :key="item.lable"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>

      </el-table>

      <el-pagination
        :style="paginationStyle"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        v-if="total>maxTotal"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
export default {
   props: {
     loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default:()=>[]
    },
    config:{
      type: Array,
      default:()=> []
    },
    currentPage:{
      type: Number,
      default: 1
    },
    pageSizes:{
      type: Array,
      default:()=> [7,10, 15, 20, 30]
    },
    pageSize:{
      type: Number,
      default: 1
    },
    layout:{
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    maxTotal:{
      type: Number,
      default: 10
    },
    elementLoadingText:{
      type: String,
      default: "加载中"
    },
    elementLoadingBackground:{
      type: String,
      default: "rgba(255, 255, 255, 0.5)"
    },
    border:{
      type: Boolean,
      default: true
    },
    tableStyle:{
      type: String,
      default: "width: 100%"
    },
    paginationStyle:{
      type: String,
      default: "marginTop:16px"
    },
    total:{
      type: Number,
      default: 0
    }
   
  },

  data() {
    return {

    }
  },

  beforeMount(){
    
  },

  mounted(){
    
    
  },

  methods: { 
    
     handleSizeChange(val){
        this.$emit('sizeChange', val); 
     },
     
     handleCurrentChange(val){
        this.$emit('currentChange', val); 
     }


  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ctabel{
    width: 100%;
  }
</style>

