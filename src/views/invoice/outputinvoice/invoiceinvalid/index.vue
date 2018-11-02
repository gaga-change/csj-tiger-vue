<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
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
      searchItem:'invalid',
      pageNum: 1,
      pageSize:10,
    }


    import moment from 'moment';
    import { outPlanSelect} from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import {indexTableConfigInvalid } from '../components/tableConfig';
    import Sticky from '@/components/Sticky' // 粘性header组件
    import SearchInvoice from '../components/search'
    export default {
      components: { BaseTable, SearchInvoice, Sticky},
      data() {
      return {
        ruleForm: ruleForm,
        total:0,
        rules: {},
        loading:false,
        tableData: [],
        tableConfig:indexTableConfigInvalid,
      }
    },

     created(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

      this.getCurrentTableData();
     
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
      
      searchTrigger(ruleForm){
        console.log(ruleForm);
      },
      resetSearch(ruleForm){
        console.log(ruleForm);    
      },
       submitForm(ruleForm) {
         console.log(ruleForm,'invalid');
                  
        this.ruleForm={...ruleForm,pageSize:10,pageNum:1,searchItem:'invalid'}
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
          path:'/invoice/outputinvoice/invoiceinvalid',
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
       outPlanSelect(data).then(res=>{
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

