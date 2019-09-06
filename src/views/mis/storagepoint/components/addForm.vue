<template lang="html">
    <div class="addform">
        <el-form ref="searchForm" labelWidth="110px" :model="searchForm">
          <el-row>
              <el-col>
                <el-form-item label="区域中心:" prop="regionalCenter" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.regionalCenter" clearable  placeholder="请选择区域中心" size="small" class="formitem">
                    <el-option v-for="item in mapConfig['getRegional']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="仓配点名称:" prop="warehouseName" :rules="[{ required: true, message: '该项为必填'}]">
                  <el-input v-model="searchForm.warehouseName" placeholder="请输入仓配点名称" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="WMS:" prop="warehouseSysCode" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.warehouseSysCode" clearable  placeholder="请选择WMS系统" size="small" class="formitem">
                    <el-option v-for="item in mapConfig['getWarehouseArea']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              
              <el-col>
                <el-form-item label="仓库类型:" prop="warehouseType" :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select  v-model="searchForm.warehouseType" clearable  placeholder="请选择仓库类型" size="small" class="formitem">
                    <el-option v-for="item in mapConfig['getWarehouseType']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="接收人:" prop="warehouseLinkName">
                  <el-input v-model="searchForm.warehouseLinkName" placeholder="请输入接收人" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="仓配点所在地区:">
                  <el-cascader
                    :options="Area"
                    v-model="searchForm.area"
                    size="small"
                    class="formitem"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="详细地址:" prop="warehouseAddress">
                  <el-input v-model="searchForm.warehouseAddress" placeholder="请输入详细地址" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="联系方式:" prop="linkTel" :rules="[{ required: false, message:'请输入正确格式的手机号',pattern:/^1[34578]\d{9}$/ }]">
                  <el-input v-model="searchForm.linkTel" placeholder="请输入联系方式" size="small" class="formitem"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
        </el-form>

        <div class="btnBox">
          <el-button @click="$emit('handleClose')">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Area } from '@/utils/area'
export default {
  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },
  data(){
    return{
      Area
    }
  },
  computed: {
      ...mapGetters([
        'mapConfig',
      ])
  },
  methods: {
    submit(){
      if(this.searchForm.area && this.searchForm.area.length>0){
        this.searchForm.warehouseProvince=this.searchForm.area[0]
        this.searchForm.warehouseCity=this.searchForm.area[1]
        this.searchForm.warehouseArea=this.searchForm.area[2]
      }
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit','add',this.searchForm)
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
