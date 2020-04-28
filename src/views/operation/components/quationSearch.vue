<template lang="html">
  <el-card shadow="hover" style="margin-bottom:10px;">
    <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主:">
               <el-select  v-model="searchForm.ownerCode" clearable filterable placeholder="请搜索货主：" size="mini" class="formitem">
                 <el-option v-for="item in mapConfig['ownerInfoMap']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="创建时间段:">
              <el-date-picker
                v-model="searchForm.createTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
    </el-row>

      <el-row>
        <el-button @click="submit" type="primary">查询</el-button>
        <el-button @click="resetForm" >重置</el-button>
      </el-row>

    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },

  computed: {
      ...mapGetters([
        'mapConfig',
      ])
  },
  data(){
    return{
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {

     submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit',this.searchForm)
          }
       })
    },

    resetForm(){
      let json={};
      for(let i in this.searchForm){
        if(Array.isArray(this.searchForm[i])){
          json[i]=[]
        } else{
          json[i]=''
        }
      }
      json.messageType=0
      this.$emit('submit',{...json, pageSize:10,pageNum:1})
    }

  }
}

</script>

<style lang="css">
</style>
