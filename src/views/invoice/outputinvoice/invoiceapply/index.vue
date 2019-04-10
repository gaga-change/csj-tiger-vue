<template>
  <div class="outgoing-quiry-container">
  <div >
    <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    <el-button  style="margin-left: 10px;" type="success" size="small"
        @click="linkToInvoice()" :disabled="!$haspermission('salseinvoicecreate')">新建发票申请</el-button>
  </sticky>
    <search-invoice @searchTrigger="submitForm" @resetSearch="resetForm" :searchForms="ruleForm"></search-invoice>
  </div>
   <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="tableConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="ruleForm.pageSize"
      :currentPage="ruleForm.pageNum"
      :tableData="tableData"/>
  </div>
</template>

<script>
    const ruleForm = {
      searchItem:'apply',
      pageNum: 1,
      pageSize:10,
    }


    import moment from 'moment';
    import { getSalesInvoiceInquiry } from '@/api/invoicetigger'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { indexTableConfigApply } from '../components/config';
    import SearchInvoice from '../components/search'


    const tableConfig=indexTableConfigApply


    export default {
      components: { BaseTable, SearchInvoice,Sticky},
      data() {
      return {
        ruleForm: ruleForm,
        total:0,
        rules: {},
        loading:false,
        tableData: [],
        tableConfig:[],
      }
    },

     created(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }
       let tableConfig = []
      indexTableConfigApply.map(item=>{
        if(item.userLink){
          item.dom = this.formatter('operate');
        }
        tableConfig.push(item)
      })
      this.tableConfig = tableConfig;
      this.getCurrentTableData();
     
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
       formatter(type,value){
            switch(type){
              case 'operate' :return  (row, column, cellValue, index)=>{
                let id = row.id
                let status = Number(row.ticketStatus)
                switch(status){
                    case 0: return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>编辑</router-link>&nbsp;&nbsp;<router-link  to={{path:`/invoice/outputinvoice/newoutputinvoice`,query:{id:id,from:'rebuild',time:moment().valueOf()}}} style={{color:'#3399ea'}}>提交</router-link>&nbsp;&nbsp;<router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>删除</router-link></div>
                    case 5: return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>编辑</router-link>&nbsp;&nbsp;<router-link  to={{path:`/invoice/outputinvoice/newoutputinvoice`,query:{id:id,from:'rebuild',time:moment().valueOf()}}} style={{color:'#3399ea'}}>提交</router-link>&nbsp;&nbsp;<router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>删除</router-link></div>
                    case 1: return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link>&nbsp;&nbsp;<router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>审核</router-link></div>
                    default: return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceapply/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link></div>
                }
              };
              default:return value
            }
       },
       submitDemo(id){
         console.log(11,id);
         
       },
      linkToInvoice(){
        if(this.$haspermission('salseinvoicecreate')){
          this.$router.push({
            path:`/invoice/outputinvoice/newoutputinvoice?time=${moment().valueOf()}&time=${moment().valueOf()}`,
          })
        }else{
          this.$message({type:'info',message:'您无法新建发票，请联系管理员',duration:2000})
        }
        
      },
       submitForm(ruleForm) {
         console.log(ruleForm,'register');
          if(ruleForm.applyLastAllowTime){
            ruleForm.applyLastAllowTime = +(new Date(ruleForm.applyLastAllowTime))
          }
        this.ruleForm={...ruleForm,pageSize:10,pageNum:1,searchItem:'apply'}
        this.getCurrentTableData();
          
      },

      resetForm() {
        this.ruleForm={ ...ruleForm }
        this.getCurrentTableData()
      },

      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
        this.getCurrentTableData()
      },

      handleSizeChange(val) {
        this.ruleForm={...this.ruleForm,pageSize:val,pageNum:1}
        this.getCurrentTableData()
      },

      handleCurrentChange(val) {
        this.ruleForm={...this.ruleForm,pageNum:val}
        this.getCurrentTableData()
      },

      getCurrentTableData(){
        this.$router.replace({
          path:'/invoice/outputinvoice/invoiceapply',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)){
                 json['planTimeFrom']=arr[0];
                 json['planTimeTo']=arr[1];
               } 
            } else{
               if(i=="searchItem"){
                continue
              }
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
       getSalesInvoiceInquiry(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list||[];
          this.total=data.total;
       }
        this.loading=false;

     }).catch(err=>{
         this.loading=false;
     })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

