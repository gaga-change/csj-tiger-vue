<template>
  <div :style="boxStyle">
  <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" :body-style="bodyStyle" >
   <el-row>
      <el-col  class="card-list"  v-for="item in config" :key="item.value"  :span="item.span||6">
          <span class="card-title">{{item.title}}</span> : <span class="card-text">{{formatter(item.type,cardData[item.prop],item.useApi)}}</span>
      </el-col>
   </el-row>
  </el-card>   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
   props: {
    config:{
      type: Array,
      required:true
    },
    cardData:{
      type: Object,
      required:true
    },
    loading:{
      type:Boolean,
      required:false,
      default:false
    },
    boxStyle:{
      type: String,
      required:false,
      default:'marginBottom:12px'
    },
    bodyStyle:{
      type: String,
      required:false,
      default:'padding:12px'
    }
  },

    methods:{
      formatter(type,value,useApi){
        if(value!=undefined){
          if(useApi){
            return this.mapConfig[type].find(v=>v.key==value)&&this.mapConfig[type].find(v=>v.key==value).value||''
          } else{
            switch(type){
              case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
              case 'boolean': return Number(value)?'是':'否';
              default : return value
            }
          }
        } else{
          return ''
        }
      }
    },

    computed: {
     ...mapGetters([
       'mapConfig',
     ])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .card-list{
    margin-bottom: 12px;
    &:last-child{
      margin-bottom: 0;
    }
  }
</style>

