<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.approveStatus == 0">
         <el-button  style="margin-left: 10px;" size="mini"   type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')"
         v-loading="buttonDisabled"
            @click="linkToCreate('rebulid')">编辑
        </el-button>
         <el-button  style="margin-left: 10px;" size="mini" type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="submitReceipt()">提交
        </el-button>  
         <el-button  style="margin-left: 10px;" size="mini"   type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="deleteIt">删除
          </el-button>
      </template> 
      <template v-else-if="cardData.approveStatus == 1">
          <el-button  style="margin-left: 10px;" size="mini"  type="primary" :disabled="buttonDisabled||!$haspermission ('receiptFinaCheck')" v-loading="buttonDisabled"
            @click="Modify('FinaCheck')">审核
          </el-button>  
          <el-button  style="margin-left: 10px;" size="mini"  type="warning" :disabled="buttonDisabled||!$haspermission('receiptFinaCheck')" v-loading="buttonDisabled"
              @click="Modify('FinaReject')">驳回
          </el-button>  
      </template>
       <el-button  style="margin-left: 10px;" v-else-if="cardData.approveStatus == 2 && cardData.relationStatus==0" size="mini" type="primary"  :disabled="buttonDisabled||!$haspermission('receiptSalesman')" v-loading="buttonDisabled"
            @click="salesman()">提交 
        </el-button>  
        <template v-else-if="cardData.approveStatus==3">
          <el-button  style="margin-left: 10px;" size="mini"   type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="linkToCreate('rebulid')">编辑
          </el-button>  
           <el-button  style="margin-left: 10px;" size="mini"   type="primary" :disabled="buttonDisabled||!$haspermission('receiptcreate')" v-loading="buttonDisabled"
            @click="deleteIt">删除
          </el-button>  
        </template>
          
        <el-tag v-else>
          暂无操作
        </el-tag>
  </sticky>
    <invoice-detail :cardData="cardData"  
    :detailtableConfig="detailtableConfigDetail"
    :tableData="relateOrderData"  :name="name"/>
      <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.approveStatus==2&&cardData.relationStatus==0">
      <el-form :model="searchForm" :rule="rules" label-width="100px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="分配业务员"  :rules="[
                { required: true, message: '该项为必填'},
              ]" prop="userId">
            <!-- <el-input type="text" size="mini" v-model="searchForm.username" ></el-input> -->
             <el-select v-model="searchForm.userId" 
             placeholder="请选择业务员">
              <el-option
                v-for="item in salesmans"
                :key="item.userId"
                :label="item.username"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
     </el-card>
      <el-card class="simpleCard" shadow="never" body-style="padding:12px" v-if="cardData.approveStatus==3">
      <el-form  label-width="140px" label-position="left">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="上次审核/驳回建议：" >
            <span>{{cardData.approveInfo}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
     </el-card>
  </div>
  
  </div>
</template>

<script>
    import moment from 'moment';
    import { relateSalesMan, getReceiptDetail,receiptFinaSubmit, dropReceive, allSaleman } from '@/api/receipt'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { detailtableConfig } from '../components/config';
    const name = "register"
    const detailtableConfigDetail = []
       
        detailtableConfig.map(item=>{
          if(name&&(item.show.indexOf(name)!=-1)){
            detailtableConfigDetail.push(item)
          }
        })

    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          // rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          relateOrderData:[],
          cardData:{},
          finaSaleInvoiceDetailDOList:[],
          detailtableConfigDetail,
          name,
          searchForm:{
            username:'',
            userId:'',
          },
          salesmans:[],
          rules:{
             username: [
            { required: true, message: '请输入业务员', trigger: 'blur' }
          ],
          }
        }
      },

     created(){
      this.getCurrentTableData();  
      this.getAllSaleman()
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},
    watch:{
      searchForm:{
        handler(val,oldVal){
          
          if(!val.userId){
            return
          }else{
            this.salesmans.map(item => {
              if(item.userId == val.userId){
                this.searchForm.username = item.username
              } 
            })
          }
        },
        deep:true
      }
      // 'searchForm.userId':(val,oldVal)=>{//埋坑，Error in callback for watcher "searchForm.userId": "TypeError: Cannot read property 'map' of undefined"
      //   if(val == oldVal){
      //     return
      //   }else{
      //     this.salesmans.map(item => {
      //       if(item.userId == val){
      //         this.searchForm.username = item.username
      //       } 
      //     })
      //   }
      // }
    },
    methods: {
      Modify,
      isActive(route) {
        return route.path === this.$route.path
      },
       deleteIt(){
        this.$confirm('要删除该条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          dropReceive(this.$route.query.id).then(res => {
           if(res.success){
              this.$message({
                type: 'success',
                message: '删除成功!',
                 duration:1500,
                onClose:()=>{
                    var a = this.$store.state.tagsView.visitedViews
                    var view = {};
                    a.map(item => {if(item.name === 'receiptRegisterDetail'){view=item}})
                    this.$message({
                          type: 'success',
                          message: '删除成功!',
                          onClose:()=>{
                            this.$store.dispatch('delVisitedViews', view).then((views) => {
                                if (this.isActive(view)) {
                                  const latestView = views.slice(-1)[0]
                                  if (latestView) {
                                    this.$router.push(latestView)
                                  } else {
                                    this.$router.push('/')
                                  }
                                }
                            })
                          }
                        })
                }
              })
            }else{
              this.$message({
                type: 'warn',
                message: '删除失败!'
              })
              this.needfresh()
            } 
            
          }).catch(err => {
            this.$message({
              type: 'warn',
              message: '删除失败!'
            })
            this.needfresh()
          })
        }).catch(()=>{
          // this.$message({
          //     type: 'info',
          //     message: '删除取消'
          //   })
            this.needfresh()
        })
      },
      submitReceipt(){
        this.buttonDisabled = true
        receiptFinaSubmit({id:this.$route.query.id}).then(res=>{
          if(res.success){
            this.$message({type:'success',message:'提交成功',duration:2000})
            
          }
          this.needfresh()
        }).catch(_=>{
          this.needfresh()
        })
      },
      getAllSaleman(){
        allSaleman().then(res=>{
          if(res.success){
            this.salesmans = res.data
          }else{
            this.salesmans = []
          }
        })
      },
      salesman(){
          
        if(this.searchForm.username){
          this.buttonDisabled = true
          relateSalesMan({id:this.cardData.id,username:this.searchForm.username,userId:this.searchForm.userId}).then((res)=>{
              if(res.success){
                this.$message({type:'success',message:'关联业务员成功',duration:2000})
                
              }
              this.needfresh();
          }).catch(err=>{
            this.$message({type:'error',message:'关联业务员失败',duration:2000})
            this.needfresh();
          })
        }else{
          this.$message({type:'info',message:'请输入业务员姓名',duration:2000})
        }
        
      },
      needfresh() {
        this.getCurrentTableData()
      },
      linkToCreate(type){
        this.$confirm('去新建收款页修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
        this.$router.push({
              path:`/receipt/newreceipt?id=${this.$route.query.id}&from=rebuild&time=${+ (new Date())}`,
            })
        })
         
      },
      getCurrentTableData(){
        this.loading=true;
        getReceiptDetail(this.$route.query.id).then(res=>{
          if(res.success){
              let data=res.data;
              this.tableData=data.list||[];
              this.relateOrderData = res.data && res.data.relationVos || []
              this.cardData = res.data.finaReceiveDO
              this.cardData.fileInfos = res.data.fileInfos
          }
          this.loading=false;
          this.buttonDisabled = false
        }).catch(err=>{
            this.loading=false;
            this.buttonDisabled = false
        })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

