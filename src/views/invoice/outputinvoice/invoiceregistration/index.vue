<template>
  <div class="outgoing-quiry-container">
  <div style="margin:12px">
    <search-invoice @searchTrigger="submitForm" @resetSearch="resetForm" :searchForms="ruleForm"></search-invoice>
  </div>

  <div class="tableTotal" v-if="tableData.length>0">
      <span>已录入发票金额</span> : <span>{{tableData[0]&&tableData[0]['enterTotalAmount']&&Number(tableData[0]['enterTotalAmount']).toFixed(2)}}</span>
      <span>已登记发票金额</span> : <span>{{tableData[0]&&tableData[0]['amountToBeRegistered']&&Number(tableData[0]['amountToBeRegistered']).toFixed(2)}}</span>
      <span>申请发票张数</span> : <span>{{tableData[0]&&tableData[0]['sumInvoiceQty']}}</span>
      <span>其中蓝票</span> : <span>{{tableData[0]&&tableData[0]['sumBlueInvoiceQty']}}</span>
      <span>其中红票</span> : <span>{{tableData[0]&&tableData[0]['sumRedInvoiceQty']}}</span>
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
      searchItem:'register',
      pageNum: 1,
      pageSize:10,
    }


    import moment from 'moment';
    import { getSalesInvoiceInquiry } from '@/api/invoicetigger'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { indexTableConfigRegistration } from '../components/config';
    import SearchInvoice from '../components/search'
    

    export default {
      components: { BaseTable, SearchInvoice},
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
      indexTableConfigRegistration.map(item=>{
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
            let status = Number(row.invoiceCancelStatus)
            let ticketStatus=Number(row.ticketStatus)
            if(status==0&&ticketStatus==4){
              return <div><router-link  to={{path:`/invoice/outputinvoice/invoiceregistration/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link> <router-link  to={{path:`/invoice/outputinvoice/invoiceregistration/detail`,query:{id:id}}} style={{color:'#3399ea'}}>作废申请</router-link></div>
            } else{
              return <router-link  to={{path:`/invoice/outputinvoice/invoiceregistration/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link>
            }     
         };
         default:return value
        }
         
       },
       submitForm(ruleForm) {
                  
        this.ruleForm={...ruleForm,pageSize:10,pageNum:1,searchItem:'register'}
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
          path:'/invoice/outputinvoice/invoiceregistration',
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
   .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
</style>

