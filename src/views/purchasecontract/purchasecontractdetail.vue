 <template lang="html">
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'" >
      <template v-if="fetchSuccess">
        <template v-if="ruleForm.pstatus == 4">
          <el-button  style="margin-left: 10px;" type="primary" size="small"  @click="()=>{contractModify(1,{},refresh,needValue);this.buttonLoading=true}":disabled="!$haspermission('purchaseContractCheckPass')||this.buttonLoading">审核</el-button>
          <el-button  style="margin-left: 10px;" type="error" size="small"   @click="()=>{contractModify(0,{},refresh,needValue);this.buttonLoading=true}" :disabled="!$haspermission('purchaseContractCheckPassNot')||this.buttonLoading">驳回</el-button>
        </template>
        <template v-else>
          <el-tag>暂无操作</el-tag>
        </template>

      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>

    </sticky>
    <el-form  class="form-container" label-position="left" :model="ruleForm" ref="postForm">
      <div class="createPost-main-container">
      <item-title text="基本信息"/>
        <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
        <el-row>
          <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
            <template v-if="item.value != 'elecontract'">
              <span class="card-title">{{item.title}}</span> : <span class="card-text">{{formatter(item.type,config[item.value])}}</span>
            </template>
            <template v-else>
              <span class="card-title">{{item.title}}</span> : <span class="card-text">

              <template v-for="enclosure in elecontract">
                <a :href="`/webApi/download/file?pathUrl=${enclosure.url}&pathName=${enclosure.name}`" target="_blank" style="padding-right:4px;color:#128fe7;">{{enclosure.name}}</a><br/>
                <!-- <a :href="link.url" target="_blank" style="color:blue">{{link.name}}</a> -->
              </template>
              </span>
            </template>
            
            
              
          </el-col>
       </el-row>
      </el-card>
<item-title text="销售合同明细" style="margin-top:10px;"/>
        <el-form-item style="margin-bottom: 40px;" label-width="0">
          <el-table
            :data="contactItems"
            ref="inputInvoiceTable"
            style="width: 100%"
            border
            max-height="600">
            <el-table-column
              label="小分类"
              prop="categoryname"
              >
            </el-table-column>
            <el-table-column
              label="客户商品编号"
              prop="custommaterialno"
              width="160">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="materialname"
              >
            </el-table-column>
            <el-table-column
              label="规格"
              prop="materialrule"
              >
            </el-table-column>
            <el-table-column
              label="数量"
              prop="materialnum"
              >
            </el-table-column>
            <el-table-column
              label="单位"
              prop="unit"
              >
            </el-table-column>
             <el-table-column
              label="单价"
              prop="price"
              >
            </el-table-column>
            <el-table-column
              label="金额"
              prop="amount"
              width="100">
            </el-table-column>
            <el-table-column
              label="使用单位"
              prop="department"
              width="60">
            </el-table-column>
            <el-table-column
              label="备注"
              prop="memos"
              width="80">
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import { CotractDetail, CotractCheck } from '@/api/planorder.js'
import contractModify from '@/utils/contractModify'
import Sticky from '@/components/Sticky' // 粘性header组件
import { mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'


const infoConfig=[
   {title:'合同档案编号',value:'contractno',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'合同名称',value:'contractname',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'客户合同编号',value:'cuscontractno',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'客户名称',value:'customname',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'业务负责人',value:'leader',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'代签人',value:'proxy',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'合同类型',type:'contractType',value:'contracttype',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务板块',type:'businesstype',value:'businesstype',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'备注',value:'memos',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:true},
   {title:'付款方式',type:'paymethod',value:'paymethod',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:false},
   {title:'付款方式说明',value:'instruction',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:false},
   {title:'合同日期',value:'orderdate',type:'time',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:false},
   {title:'交货方式',type:'deliverway',value:'deliverway',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:false},
   {title:'合同扫描件',value:'elecontract',type:'json',style:'minWidth:310px;marginBottom:16px',span:8,nthShow:false},
 ]
const paymethodFormate = ['','货到付款','货到票到付款','先款后货']
const deliverwayFormate = ['','库发','供应商直发','自提']

export default {
  components: {
    Sticky
  },
  data() {
    return {
      ruleForm:{},
      contactItems: [],
      fetchSuccess: true,
      config:{},
      loading:false,
      elecontract:[],
      buttonLoading:false,
      infoConfig
    }
  },
  computed: {
    ...mapGetters({
      company: 'company',
      companyId: 'companyId',
      userInfo: 'userInfo',
      visitedViews: 'visitedViews'
    })
  },
  created() {  
    this.getDetail()
  },
  methods: {
    contractModify,
    refresh(){
      this.getDetail();
    },
    getDetail() {
       CotractDetail(
        this.$route.params.contractno
      ).then(res => {
        this.ruleForm = res.data
        this.contactItems = res.data && res.data.itemList || []
        this.elecontract = res.data && res.data.elecontract && JSON.parse(res.data.elecontract) || []
        this.config = res.data && _.cloneDeep(res.data) || {}
        this.buttonLoading = false

      }).catch(err => {
        console.log(err)
        this.fetchSuccess = false
        this.buttonLoading = false
      })
    },
    needValue(){
      this.buttonLoading=false
    },
    formatter(type,value){
        if(value!=undefined){
          switch(type){
            case 'time': return moment(value).format('YYYY-MM-DD');
            case 'statusFilter': return value || value ==0 ?this.$options.filters.statusFilter(value) :'';
            case 'contractType':return value == 1 ? '销售合同' : '采购合同';
            case 'businesstype': return value ==1 ? '汽车板块':'钢铁板块'
            case 'money': return `￥${value}`
            case 'boolean': return Number(value)?'是':'否';
            case 'json': return JSON.parse(value);
            case 'deliverway': return deliverwayFormate[value];
            case 'paymethod': return paymethodFormate[value];
            default : return value
          }
        } 
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
