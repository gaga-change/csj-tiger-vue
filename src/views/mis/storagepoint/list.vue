<template>
  <div class="storagepoint">
      <search @submit="submit" :searchForm="searchForm"></search>

      <div class="operationitem">
          <el-button type="primary" size="small"  @click="showDialog('add')">新增仓配点</el-button>
      </div>

      <base-table
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total"
        :config="storagepointListConfig"
        :tableData="tableData"/>

      <el-dialog
        :title="addFormTitle"
        :visible.sync="addVisible"
        :before-close="handleClose">
          <add-form @submit="submit" :searchForm="addForm" @handleClose="handleClose" ></add-form>
      </el-dialog>

       <el-dialog
         title="详情"
        :visible.sync="detailVisible"
         width="600px"
        :before-close="()=>detailVisible=false">
          <item-title text="基本信息"/>
          <item-card :config="storagepointDetailConfig" :loading="false"  :cardData="baseinfoData"  />
      </el-dialog>
  </div>
</template>

<script>
  import search from './components/search'
  import addForm from './components/addForm'
  import BaseTable from '@/components/Table'
  import { warehouseSelect , warehouseSave ,warehouseUpdate ,warehouseDel } from '@/api/storagepoint'
  import { storagepointListConfig,storagepointDetailConfig} from './components/config'
  import _  from 'lodash';
  import moment from 'moment';
  export default {
    components: { search,BaseTable,addForm},
    data() {
      return {

        //详情项
        detailVisible:false,
        storagepointDetailConfig,
        baseinfoData:{},


        //新增项
        addFormTitle:'新增仓配点',
        addVisible:false,
        addForm:{
          regionalCenter:'',
          warehouseName:''
        },

        //搜索项
        searchForm:{
          warehouseName:'',
          warehouseNo:'',
          regionalCenter:'',
          pageSize:10,
          pageNum:1
        },
        total:0,

        //table配置
        loading:false,
        storagepointListConfig,
        tableData:[]
      }
    },

    mounted(){
      this.fetch()
    },

    created(){
      this.storagepointListConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink" onClick={this.showDialog.bind(this,'detail',row)}>查看</span>
                     }

                     {
                       <span class="tableLink"  onClick={this.showDialog.bind(this,'update',row)}>修改</span>
                     }

                     {
                       [2].includes(row.warehouseState)&&
                       <span class="tableLink" onClick={this.operation.bind(this,'delete',row)}>删除</span>
                     }

                     {
                       <span class="tableLink" onClick={this.operation.bind(this,'switch',row)}>{row.warehouseState===1?'禁用':'启用'}</span>
                     }

                </div>
              )
            }
        }
      })
    },

    methods: {
      moment,
      handleSizeChange(val) {
        this.searchForm={...this.searchForm,pageSize:val,pageNum:1};
        this.fetch()
      },

      handleCurrentChange(val) {
        this.searchForm={...this.searchForm,pageNum:val};
        this.fetch()
      },

      operation(type,row){
        if(type==='switch'){
           warehouseUpdate({
             id:row.id,
             warehouseNo:row.warehouseNo,
             warehouseState:row.warehouseState===1?2:1
           }).then(res=>{
             if(res.success){
               this.$message({type:'success', message:'操作成功' })
               this.fetch();
             } else{
               this.$message.error('操作失败')
             }
           }).catch(err=>{
              this.$message.error('操作失败')
           })
        } else if(type==='delete'){

          //请求配置
           let submit=()=>warehouseDel({
             id:row.id,
           }).then(res=>{
             if(res.success){
               this.$message({type:'success', message:'操作成功' })
               this.fetch();
             } else{
               this.$message.error('操作失败')
             }
           }).catch(err=>{
              this.$message.error('操作失败')
           })

           //对话配置
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            submit()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      submit(type,value){
        if(type==='select'){
           this.searchForm=_.cloneDeep(value);
           this.fetch()
        } else if(type==='add'){
          let api=warehouseSave;
          if(this.addFormTitle==="修改仓储点"){
            api=warehouseUpdate;
          }
          api(value).then(res=>{
            if(res.success){
               this.$message({
                 type:'success',
                 message:'操作成功'
               })
               this.fetch();
            } else{
               this.$message.error('操作失败')
            }
            this.addVisible=false;
          }).catch(err=>{
            this.$message.error('操作失败')
            this.addVisible=false;
          })
        }

      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
        this.loading=true;
        warehouseSelect(json).then(res=>{
          if(res.success){
            this.tableData=res.data&&Array.isArray(res.data.list)&& res.data.list||[] ;
            this.total=res.data&&res.data.total
          }
           this.loading=false
        }).catch(err=>{
           this.loading=false
           console.error(err)
        })
      },

      handleClose(){
        this.addVisible=false;
      },


      showDialog(type,row){
         if(type==="add"){
           this.addVisible=true;
           this.addFormTitle="新增仓储点"
           this.addForm={ regionalCenter:'', warehouseName:'', area:[]};
         } else if(type==='update'){
           this.addVisible=true;
           this.addFormTitle="修改仓储点"
           this.addForm={
             ...row
           }
           this.addForm.area=[row.warehouseProvince, row.warehouseCity, row.warehouseArea]
         } else if(type==='detail'){
           this.detailVisible=true;
           this.baseinfoData=row;
           this.baseinfoData.area=row.warehouseProvince?(row.warehouseProvince+row.warehouseCity+row.warehouseArea):null
         }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body{
    padding-top: 12px;;
  }
  .storagepoint{
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
    .tableLinkBox{
       display: flex;
      .tableLink{
        cursor: pointer;
        color:#3399ea;
        margin-right:12px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>
