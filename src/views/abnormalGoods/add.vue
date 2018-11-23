<template>
  <div  class="abnormalGoods">
      <add-search  :searchForm="searchForm"   @submit="this.submit"  ></add-search >
      <div class="add-buttom" >
        <item-title text="商品明细" />
        <el-button type="primary" size="mini" >增加商品明细</el-button>
     </div>
  </div> 
</template>

<script>
import AddSearch from './components/addSearch'
export default {
  components: { AddSearch },
   data() {
    return {
      searchForm:{

      }
    }
  },

  mounted(){
  
  },

  created(){

  },

  methods:{
    submit(value,type){
      console.log({...value},type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
</style>

