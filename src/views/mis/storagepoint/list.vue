<template>
  <div class="storagepoint">
      <search @submit="submit" :searchForm="searchForm"></search>

      <div class="operationitem">
          <el-button type="primary" size="mini"  @click="showDialog('add')">新增仓配点</el-button>
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
      <el-dialog
      :visible.sync="projectVisible"
      width="600px"
      title="关联项目部"
    >
      <el-table
      :data="projectData"
      border
      size="small"
      style="margin-bottom:12px"
      @selection-change="handleSelectionChange"
      ref="linkTable"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="项目部编码"
        prop="projectCode"
      ></el-table-column>
      <el-table-column
        label="项目部名称"
        prop="projectName"
      ></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleProjectCurrentPageChange"
      :current-page="projectpageNum"
      :page-sizes="[10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="projecttotal"
    >
    </el-pagination>
    <div style="text-align:center;">
      <el-button style="margin:10px" size="mini" @click="linkSubmit(false)">关闭</el-button>
      <el-button type="primary" style="margin:10px" size="mini" @click="linkSubmit(true)">提交</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
  import search from './components/search'
  import addForm from './components/addForm'
  import BaseTable from '@/components/Table'
  import { warehouseSelect , warehouseSave ,warehouseUpdate ,warehouseDel } from '@/api/storagepoint'
  import { storagepointListConfig,storagepointDetailConfig} from './components/config'
  import { projectInfo, warehouseProjectContact, warehouseProjectInfo } from '@/api/mis'
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
        tableData:[],
        projectVisible:false,
        projectData:[],
        projectpageNum: 1,
        projectpageSize: 10,
        projecttotal: 0,
        linkData:[],
        submitInfo:null,
        contactedData:[],
        pageSize:10,
        contactedData:[]
      }
    },

    mounted(){
      this.fetch()
      // this.projectInfo()
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
      showProject(row){
      this.projectVisible=true
      this.submitInfo=row
      this.getCarrierProjectInfo(row.warehouseNo)
    },
    getCarrierProjectInfo(val){
      warehouseProjectInfo({warehouseNo:val}).then(res=>{
        if (res.success) {
          this.contactedData=res.data&&res.data.length>0?res.data:[]
          this.checkedTable()
        }else{
          this.contactedData=[]
        } 
      }).catch(err=>{
        this.contactedData=[]
      })
    },
    checkedTable(){
      this.currentPageContact=[]
      if(this.contactedData && this.contactedData.length>0){
        this.$refs.linkTable.clearSelection()
        this.contactedData.map(item=>{
          this.projectData.map(val=>{
            if(val.projectCode==item.projectCode){
              this.$refs.linkTable.toggleRowSelection(val,true)
              this.currentPageContact.push(item)
            }
          })
        })
      }
    },
    firstprojectInfo() {
      projectInfo({ pageNum: this.projectpageNum, pageSize: this.projectpageSize,projectStatus:1 }).then(res => {
        const result = res.data
        this.projectData = result && result.list
        this.projecttotal = result.total
        this.$nextTick(function () {
          this.checkedTable()
        })
      }).catch(err => {
      })
    },
    projectInfo() {
      projectInfo({ pageNum: this.projectpageNum, pageSize: this.projectpageSize }).then(res => {
        const result = res.data
        this.projectData = result && result.list
        this.projecttotal = result.total
        this.$nextTick(function () {
          this.checkedTable()
        })
      }).catch(err => {
      })
    },
    currentContact(){
      let deleteData=[]
      let contactedProjectCode=[]
      if(this.currentPageContact.length>0){
        if(this.linkData.length>0){
          this.linkData.map(item=>{
            contactedProjectCode.push(item.projectCode)
          })
          this.currentPageContact.map(val=>{
            if(!(contactedProjectCode.indexOf(val)>-1)){
              this.contactedData.splice(this.contactedData.findIndex(indexItem => indexItem.projectCode === val.projectCode),1)
            }
          })
          this.linkData.map(item=>{
            if(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode)<0){
              this.contactedData.push({
                projectCode:item.projectCode,
                projectName:item.projectName
              })
            }
          })
        }else{
          this.currentPageContact.map(item=>{
            this.contactedData.splice(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode), 1)
          })
        }
      }else{
        if(this.linkData.length>0){
          this.linkData.map(item=>{
            if(this.contactedData.findIndex(indexItem => indexItem.projectCode === item.projectCode)<0){
              this.contactedData.push({
                projectCode:item.projectCode,
                projectName:item.projectName
              })
            }
          })
        }
      }
    },
    // handleProjectSizeChange(val) {
    //   this.projectpageSize = val
    //   this.projectInfo()
    // },
    handleProjectCurrentPageChange(val) {
      this.projectpageNum = val
      this.currentContact()
      this.projectInfo()
    },
    handleSelectionChange(val){
      this.linkData=[]
      this.linkData=val
    },
    linkSubmit(val){
      let isSubmit=val
      if(isSubmit){
        this.currentContact()
        // if(this.contactedData.length<=0){
        //   this.$message.error('请勾选选项')
        //   return
        // }
        let submitData=[]
        if(this.contactedData.length>0){
          this.contactedData.map(item=>{
            submitData.push({
              projectCode:item.projectCode,
              projectName:item.projectName
            })
          })
        }
        warehouseProjectContact({warehouseNo:this.submitInfo.warehouseNo,warehouseName:this.submitInfo.warehouseName,projectList:submitData}).then(res=>{
          if (res.success) {
            this.$message.success('关联成功')
            this.projectVisible=false
            this.$refs['linkTable'].clearSelection()
            this.linkData=[]
          } else {
            this.$message.error('操作失败')
          }
        })
      }else{
        this.$refs['linkTable'].clearSelection()
        this.linkData=[]
        this.projectVisible=false
      }
    },
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
