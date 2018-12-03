<template lang="html">
  <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
        <el-tab-pane label="我的待办" name="willtodo">
           <span slot="label">
            <i class="el-icon-date"></i> 我的待办
            <el-badge :value="nums" class="item"></el-badge>
          </span>
          <el-table :data="showlist" border style="height:500px;overflow-y:auto">
            <el-table-column
              show-overflow-tooltip
              align="center"

              label="标题">
              <template slot-scope="scope">
                <!-- <a :href="'/workflow/request/workflow.jsp?requestid=' + scope.row.requestid" target="_blank" v-if="scope.row.urlflag === 0">
                  {{scope.row.title}}
                </a> -->

                <router-link :to="{ path: `/purchasecontract/purchasecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-if="scope.row.type === '采购合同'">
                  {{scope.row.title}}
                </router-link>

                 <router-link :to="{ path: `/abnormalGoods/detail?title=${scope.row.title}` }" v-else-if="scope.row.type === '采购退货申请'">
                  {{scope.row.title}}
                </router-link>

                <router-link :to="{ path: `/salecontract/salecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-else-if="scope.row.type === '销售合同'">
                  {{scope.row.title}}
                </router-link>

                <template v-else-if="scope.row.type === '财务付款'">
                  <router-link :to="{ path: `/payment/apply/detail?processInstanceId=${scope.row.processInstanceId}&taskId=${scope.row.taskId}&taskName=${scope.row.nodename}&from=needWork` }" v-if="!scope.row.nodename.includes('出纳付款')" >
                      {{scope.row.title}}
                  </router-link>
                  <router-link :to="{ path: `/payment/register/detail?processInstanceId=${scope.row.processInstanceId}&taskId=${scope.row.taskId}&taskName=${scope.row.nodename}&from=needWork` }" v-else>
                    {{scope.row.title}}
                  </router-link>
                </template>
               
                <span v-else>{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="类型"
              prop="type"
              align="center"

              >
            </el-table-column>
            <el-table-column
              label="操作节点"
              prop="nodename"
              align="center"

              >
            </el-table-column>
            <el-table-column
              label="操作人"
              prop="objname"
              align="center"

              >
            </el-table-column>
            <el-table-column
              prop="createdatetime"
              align="center"
              :formatter="formatTime"
              label="创建时间">
            
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的在办" name="tobedone">
           <span slot="label"><i class="el-icon-date"></i> 我的在办 <el-badge :value="nownums" class="item"></el-badge></span>
            <el-table :data="nowlist" border style="height:500px;overflow-y:auto">
              <el-table-column
                show-overflow-tooltip
                prop="title"
                align="center"
                label="标题">
                <template slot-scope="scope">
                  <!-- <a :href="'/workflow/request/workflow.jsp?requestid=' + scope.row.bussinessKey" target="_blank" v-if="scope.row.urlflag === 0">
                    {{scope.row.bussinessKey}}
                  </a> -->

                  <router-link :to="{ path: `/purchasecontract/purchasecontractdetail/${scope.row.title}/${scope.row.taskId}` }" v-if="scope.row.type === '采购合同'">
                    {{scope.row.title}}
                  </router-link>

                 <router-link :to="{ path: `/abnormalGoods/detail?title=${scope.row.title}` }" v-else-if="scope.row.type === '采购退货申请'">
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
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作节点"
                prop="nodename"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作人"
                prop="objname"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="createdatetime"
                :formatter="formatTime"
                align="center"
                >
              </el-table-column>
            </el-table>
        </el-tab-pane>
     </el-tabs>
</template>

<script>
import { WorkFlowNode,WorkFlowNodeTigger, ZyUser, bssLogin, NowWorkFlowNode } from '@/api/planorder'
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
      nowloading: false,
      tabActive:'willtodo',
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
      WorkFlowNode({truename:this.userInfo.truename,userId:this.userInfo.id,roles:this.userInfo.roles}).then(res => {
        
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
    
    
    // tabClick(name) {
    //   if (name.paneName === '1' && this.nowlist.length === 0) {
    //     this.getNowData()
    //   } else if (name.paneName === '0' && this.list.length === 0) {
    //     this.getDefaultData()
    //   }
    // },
    activeChange(tab){
        if (tab.name=='willtodo') {
            this.getDefaultData()
        } else if (tab.name=='tobedone'){
            this.getNowData()
        }
      },
    getNowData() {
      this.nowloading = true
      NowWorkFlowNode(this.userInfo.truename,this.userInfo.roles).then(res => {
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
