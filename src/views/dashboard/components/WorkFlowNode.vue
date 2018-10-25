<template lang="html">
  <el-tabs type="border-card" style="height:400px;" @tab-click="tabClick">
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-date"></i> 我的待办
        <el-badge :value="nums" class="item"></el-badge>
      </span>
      <el-row :gutter="10">
        <el-col v-if="loading" :span="24">正在获取数据...</el-col>
        <!-- <el-col v-else-if="loadingfail" :span="24">登录章鱼系统失败，请<el-button type="text" @click="retry">重试</el-button></el-col> -->
        <el-col
          :span="24"
          class="colclass"
          v-else
        >
        <el-table :data="showlist" :max-height="310" style="border-bottom:none">
          <el-table-column
            width="220"
            show-overflow-tooltip
            label="标题">
            <template slot-scope="scope">
              <!-- <a :href="'/workflow/request/workflow.jsp?requestid=' + scope.row.requestid" target="_blank" v-if="scope.row.urlflag === 0">
                {{scope.row.title}}
              </a> -->
              <router-link :to="{ path: `/purchasecontract/purchasecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-if="scope.row.type === '采购合同'">
                {{scope.row.title}}
              </router-link>
              <router-link :to="{ path: `/salecontract/salecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-else-if="scope.row.type === '销售合同'">
                {{scope.row.title}}
              </router-link>
              <span v-else>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="类型"
            prop="type"
            >
          </el-table-column>
          <el-table-column
            label="操作节点"
            prop="nodename"
            >
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="objname"
            >
          </el-table-column>
          <el-table-column
            width="160"
            prop="createdatetime"
            :formatter="formatTime"
            label="创建时间">
           
          </el-table-column>
        </el-table>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 我的在办 <el-badge :value="nownums" class="item"></el-badge></span>
      <el-row :gutter="10">
        <!-- <el-col v-if="nowloading" :span="24">正在获取数据...</el-col>
        <el-col v-else-if="loadingfail" :span="24">登录章鱼系统失败，请<el-button type="text" @click="retry">重试</el-button></el-col>
        <el-col
          :span="24"
          class="colclass"
          v-else
        > -->
        <el-table :data="nowlist" :max-height="310" style="border-bottom:none">
          <el-table-column
            width="220"
            show-overflow-tooltip
            prop="title"
            label="标题">
            <template slot-scope="scope">
              <!-- <a :href="'/workflow/request/workflow.jsp?requestid=' + scope.row.bussinessKey" target="_blank" v-if="scope.row.urlflag === 0">
                {{scope.row.bussinessKey}}
              </a> -->
              <router-link :to="{ path: `/purchasecontract/purchasecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-if="scope.row.type === '采购合同'">
                {{scope.row.title}}
              </router-link>
              <router-link :to="{ path: `/salecontract/salecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-else-if="scope.row.type === '销售合同'">
                {{scope.row.title}}
              </router-link>
              <span v-else>{{scope.row.title}}</span>
             </template> 
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="类型"
            prop="type"
            >
          </el-table-column>
          <el-table-column
            label="操作节点"
            prop="nodename"
            >
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="objname"
            >
          </el-table-column>
          <el-table-column
            width="160"
            label="创建时间"
            prop="createdatetime"
            :formatter="formatTime"
            >
          </el-table-column>
        </el-table>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { WorkFlowNode, ZyUser, bssLogin, NowWorkFlowNode } from '@/api/planorder'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      list: [],
      loading: false,
      loadingfail: false,
      nums: null,
      nownums: null,
      isclose: false,
      nowlist: [],
      nowloading: false
    }
  },
  computed: {
    showlist() {
      return this.list
    },
     ...mapGetters({
      userInfo: 'userInfo',
    })
  },
  created() {
    this.getDefaultData()
    // this.getLoadingData()
    this.getNowData()
  },
  methods: {
    formatTime(row, col, cellval, index){
      return moment(cellval).format('YYYY-MM-DD')
    },
    retry() {
      this.$router.go(0)
    },
    // getLoadingData() {
    //   this.loading = true
    //   ZyUser().then(resa => {
    //     bssLogin({ j_username: resa.data.longonname, j_password: resa.data.logonpass }).then(res => {
    //       console.log(res)
    //       this.loading = false
    //     }).catch(err => {
    //       // this.loadingfail = true
    //       this.loading = false
    //       console.log(err)
    //     })
    //   }).catch(erra => {
    //     console.log(erra)
    //     this.loading = false
    //     // this.loadingfail = true
    //   })
    // },
    getDefaultData() {
      this.loading = true
      WorkFlowNode(this.userInfo.truename).then(res => {
        
        if(res&&res.data){
          this.list = res.data || []
          this.nums = res.data.length
        }

        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    tabClick(name) {
      if (name.paneName === '1' && this.nowlist.length === 0) {
        this.getNowData()
      } else if (name.paneName === '0' && this.list.length === 0) {
        this.getDefaultData()
      }
    },
    getNowData() {
      this.nowloading = true
      NowWorkFlowNode(this.userInfo.truename).then(res => {
        if(res&&res.data){
          this.nowlist = res.data || []
          this.nownums = res.data.length
        }
        this.nowloading = false
      }).catch(err => {
        console.log(err)
        this.nowloading = false
      })
    }
  }
}
</script>

<style lang="css" scoped>
.colclass {
  margin: 4px 0;
}
a {
  color:#409EFF;
}
</style>
