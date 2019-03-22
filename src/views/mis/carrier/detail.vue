<template>
  <div  class="carrier_detail">
     <div>
        <item-title text="基本信息"/>
        <item-card :config="carrierDetailConfig" :loading="loading"   :cardData="baseinfoData"  />
     </div>
  </div> 
</template>

<script>

import { carrierDetailConfig  } from './components/config';
export default {
   data() {
    return {
      loading:false,
      carrierDetailConfig,
      baseinfoData:{},
    }
  },

  mounted(){

  },

  methods:{
  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
   .carrier_detail{

   }
  
</style>

