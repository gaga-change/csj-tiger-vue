<template lang="html">
    <div class="addform">
        <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
          <el-row>
              <el-col>
                <el-form-item label="商品编码"   prop="skuCode" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-select v-model="searchForm.skuCode" filterable   @change="skuCodeChange"  placeholder="请选择货主"  >
                    <el-option 
                      value="" v-if="commodityList.length" :disabled="true">
                      <div class="providerList"> 
                        <span>商品编码</span> 
                        <span>商品名称</span> 
                      </div>
                    </el-option>
                    <el-option
                      v-for="item in commodityList" :key="item.skuCode" :label="item.skuName" :value="item.skuCode">
                        <div class="providerList">
                          <span >{{ item.skuCode }}</span>
                          <span >{{ item.skuName }}</span>
                        </div>
                    </el-option>
                  </el-select>           
                </el-form-item>
              </el-col>  

              <el-col>
                 <el-form-item label="商品名称:" prop="skuName" :rules="[{ required: true, message: '该项为必填'}]">
                    <el-input v-model="searchForm.skuName" placeholder="请输入商品名称" size="small" class="formitem"></el-input>
                 </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="数量:" prop="planInQty" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.planInQty" placeholder="请输入数量" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="商品供应商名称:" labelWidth="120px" >
                  <el-input v-model="searchForm.providerSkuName" placeholder="请输入商品供应商名称" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="商品供应商编码:" labelWidth="120px" >
                  <el-input v-model="searchForm.providerSkuCode" placeholder="请输入商品供应商编码" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="订货进价:" prop="purchasePrice" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.purchasePrice" placeholder="请输入订货进价" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col>
                <el-form-item label="入库仓库:" prop="出库仓库" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.出库仓库" clearable  placeholder="请选择出库仓库" size="small" class="formitem">
                    <el-option v-for="item in []" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>  -->
          </el-row>
        </el-form>

        <div class="btnBox">
          <el-button @click="$emit('handleClose')">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </div> 
</template>

<script>
export default {

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
     commodityList:{
       type:Array,
       default:()=>[]
     }
  },

  methods: {
    
    skuCodeChange(value){
      this.$emit('skuCodeChange',value)
    },

     submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit','addCommodity',this.searchForm)
          }
       })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .addform{
    .btnBox{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
