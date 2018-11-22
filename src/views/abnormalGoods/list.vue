<template>
  <div  class="abnormalGoods">
     <search-invoice  :searchForm="searchForm"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
  </div> 
</template>

<script>
import SearchInvoice from './components/search'
export default {
  components: { SearchInvoice },
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
    submit(){

    },
    reset(){
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    
  }
</style>

