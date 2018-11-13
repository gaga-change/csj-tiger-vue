<template>
  <div class="outgoing-quirydetail-container">

  <item-title :text='infoName'/>
  <item-card :config="receiptInfoConfig" :loading="loading"   :cardData="cardData"  />
 

     <item-title :text='tableName'/>
      <el-table
          :data="tableData"
          border
          :span-method="nInOne"
          max-height="600">
          <el-table-column
            label="序号"
            width="55">
            <template slot-scope="scope">
              <span >{{ scope.$index+1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品编码"
            width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.custommaterialno"></el-input>
              </template>
              <span v-else>{{ scope.row.custommaterialno }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.materialname"></el-input>
              </template>
              <span v-else>{{ scope.row.materialname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="品牌"
            width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.materialtag"></el-input>
              </template>
              <span v-else>{{ scope.row.materialtag }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            width="200">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.materialrule"></el-input>
              </template>
              <span v-else>{{ scope.row.materialrule }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            width="80">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.ordernum"></el-input>
              </template>
              <span v-else>{{ scope.row.ordernum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            width="80">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.orderunit"></el-input>
              </template>
              <span v-else>{{ scope.row.orderunit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="采购单价"
            width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.orderprice"></el-input>
              </template>
              <span v-else>{{ scope.row.orderprice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="采购金额"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.orderprice*scope.row.ordernum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="税率"
            width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.taxrate"></el-input>
              </template>
              <span v-else>{{ scope.row.taxrate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.memos"></el-input>
              </template>
              <span v-else>{{ scope.row.memos }}</span>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
  import _ from 'lodash'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 let count = 0
  import { receiptInfoConfig,  execInfoConfig} from './config'
 export default {
    name: 'InvoiceDetail', 
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        receiptInfoConfig,
        execInfoConfig,
        
        searchForm:{},
        recordData:[],
        loading:false,

        card:{},
        deConfig:{}        
      }
    },
    props:{
      name:{
        type:String,
        default:''
      },
      detailtableConfig:{
        type:Array,
        required:false,
        default:()=>[]
      },
      cardData:{
        type: Object,
        required:false,
        default:()=>{}
      },

      tableData:{
        type: Array,
        required:false,
        default:()=> [] 
      },
    },
    methods:{
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row, column, rowIndex, columnIndex);
        let tableData = this.tableData
        let equalRow = 0,inNumber = 0
        tableData.map(item=>{
          if(item.id == row.id){
            ++equalRow
          }
        })
        count += equalRow
        if (/0|1/.test(columnIndex)) {
          if ((rowIndex-count) % equalRow === 0) {
            return {
              rowspan: equalRow,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        
        
      },
    }
 }

</script>

