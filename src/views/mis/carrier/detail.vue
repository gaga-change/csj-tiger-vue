<template>
  <div  class="carrier_detail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
          <router-link  :to="`/carrier/add?consoildatorCode=${this.$route.query.consoildatorCode}&id=${this.$route.query.id}&type=modify`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>

         <el-button  size="small" @click="onDelete">删除</el-button>
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
import { consoilInfoDetail,consoilInfoDel} from '@/api/carrier'
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
export default {
  components: {Sticky},
   data() {
    return {
      loading:false,
      carrierDetailConfig,
      baseinfoData:{},
    }
  },

  computed: {
      ...mapGetters({
        'mapConfig':'mapConfig',
         visitedViews: 'visitedViews'
      })
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
    onDelete(){
       const view = this.visitedViews.filter(v => v.path === this.$route.path)
       consoilInfoDel({
          carrierNo:this.$route.query.consoildatorCode
        }).then(res=>{
          if(res.success){
             this.$message({
                type:'success', 
                message:'操作成功,即将跳转到列表页！' ,
                duration:1500,
                onClose:()=>{
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      path:`/carrier/list`,
                    })
                  }).catch(err=>{
                    console.log(err)
                  })  
                }
            })
          } else{
             this.$message.error('操作失败')
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error('操作失败')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
   .carrier_detail{

   }
  
</style>

