<template>
  <div  class="carrier_detail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
          <router-link  :to="`/carrier/add?consoildatorCode=${this.$route.query.consoildatorCode}&id=${this.$route.query.id}&type=modify`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>
      </template>
    </sticky>
     <div>
        <item-title text="基本信息"/>
        <item-card :config="carrierDetailConfig" :loading="loading"   :cardData="baseinfoData"  />
     </div>
  </div> 
</template>

<script>

import { carrierDetailConfig  } from './components/config';
import { consoilInfoDetail } from '@/api/carrier'
import Sticky from '@/components/Sticky'
export default {
  components: {Sticky},
   data() {
    return {
      loading:false,
      carrierDetailConfig,
      baseinfoData:{},
    }
  },

  mounted(){
    consoilInfoDetail({
      consoildatorCode:this.$route.query.consoildatorCode
    }).then(res=>{
      if(res.success){
        this.baseinfoData=res.data;
      }
    }).catch(err=>{
      console.log(err)
    })
  },

  methods:{
  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
   .carrier_detail{

   }
  
</style>

