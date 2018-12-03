<template>
  <span>
     <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
            @click="Modify('payCheck')">审核
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentReject')" v-loading="buttonDisabled" type="primary"
              @click="Modify('payReject')">驳回
          </el-button>  
  </span>
 
</template>

<script>
 export default {
    name: 'CheckButton', 
    data(){
      return {}
    },
    props:{
      buttonDisabled:{
        type:Boolean,
        default:false
      },
      Modify:{
        type:Function,
        default:()=>{}
      }
    }
 }

</script>

