<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
    <search-invoice @searchTrigger="submitForm" @resetSearch="resetForm" :searchForms="ruleForm"></search-invoice>
  </div>
     <div style="display: flex;justify-content: flex-end;margin-bottom: 12px;font-size:14px;color:#606266">
        <span v-for="info in infoConfig" :key="info.title" style="margin-right:12px;"><span style="font-weight: 600">{{info.title}}：</span><span>{{(cardData[info.prop]||0).toFixed(2)}}</span></span>
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
      isRegisterflag:true,//登记单查询
    }


    import moment from 'moment';
    import { getPaymentListAndDetail, infoPaymentTotal } from '@/api/pay'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { reisterTableConfig } from '../components/config';
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
        tableConfig:[],
        infoConfig:[ 
          { title:'已付货款合计', prop:'totalPaymentAmt',type:'money' },
          { title:'贴息合计', prop:'totalInterestAmt',type:'money' },
        ],
        cardData:{},
      }
    },

     created(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }
      let tableConfig = []
      reisterTableConfig.map(item=>{
        if(item.userLink){
          item.dom = this.formatter('operate');
        }
        // if(item.prop=='receiveNo'){
        //   item.linkTo = '/receipt/associate/detail'
        // }
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
            let status = Number(row.paymentStatus)
            switch(status){
              // case 4: return <div><router-link  to={{path:`/payment/register/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link>&nbsp;&nbsp;<router-link  to={{path:`/payment/register/detail`,query:{id:id}}} style={{color:'#3399ea'}}>付款登记</router-link></div>
              // case 5: return <div><router-link  to={{path:`/payment/register/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link>&nbsp;&nbsp;<router-link  to={{path:`/payment/register/detail`,query:{id:id}}} style={{color:'#3399ea'}}>提交</router-link></div>
              default: return <router-link  to={{path:`/payment/register/detail`,query:{id:id}}} style={{color:'#3399ea'}}>查看</router-link>
            }
          };
          default:return value
        } 
      },
       submitForm(ruleForm) {
        this.ruleForm={...ruleForm,pageSize:10,pageNum:1,searchItem:'associate'}
        this.getCurrentTableData();
          
      },

      resetForm() {
        this.ruleForm={ ...ruleForm }
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
          path:'/payment/register',
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
        getPaymentListAndDetail(data).then(res=>{
          
          if(res.success){
              let data=res.data;
              this.tableData=res.list||[];
              this.total=res.total;
              
          }
          
            this.loading=false;

        }).catch(err=>{
            this.loading=false;
        })
        infoPaymentTotal(data).then(res => {
          if(res.success){
            this.cardData = res.data
          }
        })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

