<template>
  <div class="carrier">

      <search @submit="submit" :searchForm="searchForm"></search>

      <div class="operationitem">
          <el-button type="primary" size="small" @click="showAddDialog('add')">创建供应商</el-button>
      </div>

      <base-table
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="searchForm.pageSize"
        :currentPage="searchForm.pageNum"
        :loading="loading"
        :total="total"
        :config="supplierTbale_config"
        :tableData="tableData"/>

      <el-dialog
        :title="dialogTitle"
        :visible.sync="addVisible"
         width="80%"
        :before-close="()=>this.handleClose('addform')">
         <add-search @submit="submit" :searchForm="addForm"  @handleClose="()=>this.handleClose('addform')"></add-search>
      </el-dialog>

      <el-dialog
        :visible.sync="relationVisible"
        :before-close="()=>this.handleClose('relation')">
        <div class="relationDialog">
            <el-form :model="ownerListForm" ref="unionForm">
              <el-form-item label="关联货主" prop="owners">
                <el-select v-model="ownerListForm.ownerList" multiple filterable placeholder="请选择需要关联的货主" style="width:400px">
                  <el-option
                    v-for="item in mapConfig['ownerInfoMap']"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    <span style="float: left">{{ item.key }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px; margin-right: 30px">{{item.value}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="btnBox">
                <el-button type="primary" size="small" @click="submit('addShipper')">确定</el-button>
                <el-button size="small" @click="()=>this.handleClose('relation')">取消</el-button>
            </div>
        </div>
      </el-dialog>

      <el-dialog
        title="地址列表"
        :visible.sync="addressVisible"
         width="80%"
        :before-close="()=>this.handleClose('address')">
          <div class="btnBox" style="margin-bottom:12px">
            <el-button type="primary" size="small"  @click="showAddDialog('addAddress')">新增地址</el-button>
          </div>
          <web-pagination-table
            :loading="false"
            :config="address_config"
            :allTableData="address_data"/>

          <el-dialog
            :title="addAddressDialogTitle"
            :visible.sync="addAddressVisible"
            width="80%"
            :modal="false"
            :before-close="()=>this.handleClose('addAddress')">
             <add-address-search  :searchForm="addAddressSearchForm" @submit="submit" @handleClose="handleClose('addAddress')"/>
            </el-dialog>
      </el-dialog>

  </div>
</template>

<script>
  import search from './components/search'
  import addSearch from './components/addsearch'
  import addAddressSearch from './components/addAddressSearch'
  import BaseTable from '@/components/Table'
  import { supplierTbale_config ,address_config} from './components/config'
  import webPaginationTable from '@/components/Table/webPaginationTable';
  import { providerPagelist,providerSave,providerUpdate,providerDel,ownerProviderList,updateOwnerProvider,providerAddrSave,providerAddrList,
    providerAddrUpdate,providerAddrDel, providerSetDefaultAddress} from '@/api/supplierManagement'
  import _  from 'lodash';
  import { mapGetters } from 'vuex'
  import moment from 'moment';
  export default {
    components: { search,BaseTable,addSearch,webPaginationTable,addAddressSearch},
    data() {
      return {

        //搜索项
        searchForm:{
          providerCode:'',
          providerState:'',
          providerName:'',
          pageSize:10,
          pageNum:1
        },
        total:0,

        // list列表 table配置
        loading:false,
        supplierTbale_config,
        tableData:[],

        //添加项
        dialogTitle:'新增供应商',
        addVisible:false,
        addForm:{
           providerLevel:1,
           providerState:1
        },

        //关联货主项
        relationVisible:false,
        ownerListForm:{
          ownerList:[]
        },

        //地址配置项
        addressVisible:false,
        address_config,
        address_data:[{}],
        addAddressDialogTitle:'新增地址',

        //新增地址弹框  子弹框
        addAddressVisible:false,
        addAddressSearchForm:{

        },

        //当前选中的行
        activeRow:{},
        addAddressEditRow:{}
      }
    },

  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },

    mounted(){
      this.fetch()
    },

    created(){
      this.supplierTbale_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink"  onClick={this.showAddDialog.bind(this,'update',row,true)} >修改</span>
                     }

                     {

                       <span class="tableLink" onClick={this.delete.bind(this,'delectProvider',row)}>删除</span>
                     }

                     {
                       <span class="tableLink" onClick={this.showAddDialog.bind(this,'relation',row,true)}>关联货主</span>
                     }

                     {
                       <span class="tableLink" onClick={this.showAddDialog.bind(this,'address',row,true)}>退换货地址</span>
                     }

                </div>
              )
            }
        }
      }),
      this.address_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">

                     {
                       <span class="tableLink" onClick={this.delete.bind(this,'deleteAddAddress',row)}>删除</span>
                     }
                     {
                       <span class="tableLink"  onClick={this.showAddDialog.bind(this,'editAddAddress',row,false)}>编辑</span>
                     }
                     { row.isDefault === 1 &&
                       <el-tag type="success">默认地址</el-tag>
                     }
                     { row.isDefault !== 1 &&
                       <span class="tableLink"  onClick={this.setDefault.bind(this,row)}>设为默认</span>
                     }
                </div>
              )
            }
        }
      })
    },

    methods: {
      moment,
      setDefault(row = {}) {
        const { id } = row
        providerSetDefaultAddress({ id }).then(res => {
          if (res.success) {
            this.$message.success('操作成功')
            this.showAddDialog('address',this.activeRow)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      //展示弹框
      showAddDialog(type,row,saveRow){
        if(row&&saveRow){
          this.activeRow=row;
        }
        if(type==='update'){
          this.addVisible=true;
          this.dialogTitle="修改供应商"
          this.addForm=row
        } else if(type==='add'){
          this.addVisible=true;
          this.dialogTitle="新增供应商"
          this.addForm={
            providerLevel:1,
            providerState:1
          }
        } else if(type==='relation'){
          this.relationVisible=true;
          this.ownerProviderListApi()
        } else if(type==='address'){
          this.addressVisible=true;
          this.providerAddrListApi({providerId:row.id})
        } else if(['editAddAddress','addAddress'].includes(type)){
          if(type==='addAddress'){
            this.addAddressDialogTitle='新增地址';
            this.addAddressSearchForm={};
          } else{
            this.addAddressDialogTitle='修改地址';
            let addAddressSearchForm=_.cloneDeep(row);
            addAddressSearchForm.area=[];
            ['providerProvince','providerCity','providerArea'].forEach((v,i)=>{
               addAddressSearchForm.area[i]=addAddressSearchForm[v]
            })
            this.addAddressSearchForm=addAddressSearchForm;
            this.addAddressEditRow=row;
          }
          this.addAddressVisible=true;
        }
      },

      //关闭弹框
      handleClose(type){
        if(type==='addform'){
           this.addVisible=false;
        } else if(type==='relation'){
          this.relationVisible=false;
        } else if(type==='address'){
          this.addressVisible=false;
          this.addAddressVisible=false
        } else if(type==='addAddress'){
          this.addAddressVisible=false
        }
      },

      submit(type,value){
        if(type==='select'){
          this.searchForm=_.cloneDeep(value);
          this.fetch()
        } else if(type==='add'){
          let api=this.dialogTitle==='新增供应商'?providerSave:providerUpdate;
          api(value).then(res=>{
            if(res.success){
               this.$message({type:'success', message:'操作成功' });
               this.fetch()
               this.addVisible=false;
            } else{
              this.$message.error('操作失败')
            }
          }).catch(err=>{
            this.$message.error('操作失败')
            console.error(err)
          })
        } else if(type==='addShipper'){
          updateOwnerProvider({
            id:this.activeRow.id,
            providerCode:this.activeRow.providerCode,
            ...this.ownerListForm
          }).then(res=>{
            if(res.success){
               this.$message({type:'success', message:'操作成功' });
               this.ownerProviderListApi();
               this.relationVisible=false;
            } else{
               this.$message.error('操作失败')
            }
          }).catch(err=>{
             console.error(err)
             this.$message.error('操作失败')
          })
        } else if(type==='addAddress'){
          let api=providerAddrSave;
          let json=_.cloneDeep(value);
          if(this.addAddressDialogTitle==='新增地址'){
            api=providerAddrSave
          } else{
            api=providerAddrUpdate;
            json.id=this.addAddressEditRow.id;
          }

          json.providerId=this.activeRow.id;
          delete json.area;
          if(value.area&&Array.isArray(value.area)){
            ['providerProvince','providerCity','providerArea'].forEach((v,i)=>{
               json[v]=value.area[i]
            })
          }
          api(json).then(res=>{
            if(res.success){
              this.$message({type:'success', message:'操作成功' });
              this.providerAddrListApi({providerId:this.activeRow.id});
              this.addAddressVisible=false
            } else{
              this.$message.error('操作失败')
            }
          }).catch(err=>{
            console.error(err)
            this.$message.error('操作失败')
          })

        }
      },

      delete(type,row){
        //基础数据准备
        let api=providerDel;
        let data={};
        if(type==='delectProvider'){
          api=providerDel;
          data={ providerCode:row.providerCode }
        } else if(type==='deleteAddAddress'){
          api=providerAddrDel;
          data={id:row.id}
        }
        //请求配置
        let submit=()=>api(data).then(res=>{
          if(res.success){
            this.$message({type:'success', message:'操作成功' });
            if(type==='delectProvider'){
              this.fetch()
            } else{
              this.providerAddrListApi({providerId:this.activeRow.id});
            }

          } else{
            this.$message.error('操作失败')
          }
        }).catch(err=>{
          this.$message.error('操作失败')
          console.error(err)
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
      },


      providerAddrListApi(data){
        providerAddrList(data).then(res=>{
           if(res.success){
             this.address_data=res.data;
           }
        }).catch(err=>{
          console.error(err)
        })
      },


      ownerProviderListApi(){
        ownerProviderList({
           providerCode:this.activeRow.providerCode,
        }).then(res=>{
          if(res.success){
            let json={};
            json.ownerList=[];
            for(let i=0;i<res.data.length;i++){
              if(!json.ownerList.includes(res.data[i])){
                json.ownerList.push(res.data[i])
              }
            }
            this.ownerListForm=json;
          }
        }).catch(err=>{
           console.error(err)
        })
      },

      fetch(){
        let json= _.cloneDeep(this.searchForm);
        for(let i in json){
           if(json[i]===''){
             delete json[i]
           }
        }
        this.loading=true;
        providerPagelist(json).then(res=>{
          if(res.success){
            let data=res.data;
            this.tableData=data.list||[];
            this.total=data.total;
          }
          this.loading=false;
        }).catch(err=>{
          console.error(err)
          this.loading=false;
        })
      },

      handleSizeChange(val) {
        this.searchForm={...this.searchForm,pageSize:val,pageNum:1};
        this.fetch()
      },

      handleCurrentChange(val) {
        this.searchForm={...this.searchForm,pageNum:val};
        this.fetch()
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .carrier{
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
    .relationDialog{

    }
    .el-dialog__body{
      padding-top: 16px;
    }
    .btnBox{
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
</style>
