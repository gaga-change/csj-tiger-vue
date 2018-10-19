<template>
  <div>
    <sticky :className="'sub-navbar published'">
      <template v-if="fetchSuccess">
        <template>
          <el-button  size="small" type="primary" @click="submitOrder('ruleForm')" v-loading="submitloading">
            提交
          </el-button>
        </template>
      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>
    </sticky>
    <div class="reply-query-container">
      <el-form :model="planform" ref="ruleForm" label-width="70px"  label-position="left" size="small" >
      <div style="margin:8px 0 12px">
       <item-title text="基本信息"/>
        <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
        <el-row >
          <el-col :span="6" v-if="planform.saleSignReq.signNo">
            <el-form-item label="回单号:" prop="saleSignReq.signNo">
              {{planform.saleSignReq.signNo}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出库计划单号:" label-width="100px"   prop="saleSignReq.planCode">
              {{planform.saleSignReq.planCode}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货企业:" prop="saleSignReq.ownerName">
              {{planform.saleSignReq.ownerName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货仓库" prop="saleSignReq.planWarehouseName">
              {{planform.saleSignReq.planWarehouseName}}
            </el-form-item>
          </el-col>
          
          <el-col :span="6">
            <el-form-item
             label="签收人"
             :rules="[
                { required: true, message: '该项为必填'},
              ]"
              prop="saleSignReq.signName">
              <el-input v-model="planform.saleSignReq.signName" style="width:180px"  placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item 
              label="签收人电话"
              label-width="90px"
              :rules="[
                { required: true,pattern:/^[1][3,4,5,7,8][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/,message: '请输入正确规则的手机号或电话号'},
              ]"
             prop="saleSignReq.signTel">
              <el-input  
              style="width:180px" 
              v-model="planform.saleSignReq.signTel"
                placeholder="请输入签收人电话"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item 
            label="签收日期" 
            label-width="74px"
            :rules="[
                { required: true, message: '该项为必填'},
              ]"
              prop="saleSignReq.signCreateTime">
              <el-date-picker
                v-model="planform.saleSignReq.signCreateTime"
                type="datetime"
                placeholder="选择日期时间"
                 align="right"
                default-time="12:00:00">
              </el-date-picker>
          </el-form-item>
        </el-col>

      <!-- <el-col :span="8">
        <el-form-item label="上传附件">
          <el-button
            size="mini"
            type="primary"
            @click="importFile">
            {{enclosure.length ? '继续上传' : '上传附件'}}
          </el-button>
          <span v-show="enclosure.length">{{filelength}}个文件</span>
        </el-form-item>
      </el-col> -->

          </el-row>
        </el-card>
      </div> 
       <item-title text="相关明细"/>
        <el-row >
          <el-form-item label-width="0" prop="details">
            <el-table
              :data="planform.details"
              size="small"
              v-loading="loading"
              
              max-height="600">
              <el-table-column
                label="序号"
                type="index">
              </el-table-column>
              <el-table-column
                label="商品编码"
                prop="skuCode" >
              </el-table-column>
            <el-table-column
              label="商品名称"
              prop="skuName">
            </el-table-column>
            <el-table-column
              label="品牌"
              prop="skuBrandName">
            </el-table-column>
            <el-table-column
              label="规格"
              prop="skuFormat">
            </el-table-column>
            <el-table-column
              label="单位"
              prop="skuUnitName">
            </el-table-column>
            <el-table-column
              label="出库数量"
              prop="realOutQty">
              <template slot-scope="scope">
                <span >{{ scope.row.realOutQty }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              prop="skuPrice">
            </el-table-column>
            <el-table-column
              label="转换率"
              prop="skuUnitConvert">
            </el-table-column>
      
            <el-table-column
              label="签收数量"
               width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number 
                    size="mini"
                    :max="scope.row.realOutQty-scope.row.rejectQty" 
                    :min="0" 
                     style="width:100px"
                    v-model="scope.row.signQty" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.signQty}}
                </span>
              </template>
            </el-table-column>

             <el-table-column
              label="拒收数量"
              width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number 
                  :max="scope.row.realOutQty-scope.row.signQty" 
                  :min="0" 
                  size="mini"
                  style="width:100px"
                   v-model="scope.row.rejectQty" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.rejectQty}}
                </span>
              </template>
            </el-table-column>
   
            <el-table-column
              v-if="!($route.query.id)"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
                <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-form-item>
        </el-row>   
      </el-form>
    </div>


    <el-dialog
    title="提示"
    :visible.sync="enclosureDialogVisible"
    center
    width="50%">
    <el-upload
      class="upload-demo"
      ref="enclosureupload"
      :action="enclosureuploadUrl"
      :file-list = "fileList"
      multiple
      :before-upload="beforeUpload"
      :limit="10"
      :on-exceed="handleFileExceed"
      :on-remove="handleRemove"
      name="myFile"
      :on-change="handelUploadChange"
      :on-success="handleEnclosureUploadSuccess"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitEnclosureUpload" v-show="uploadButtonVisible">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">文件最大不能超过5M。 </div>
    </el-upload>


  </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment';
  import { planDetail,signBuildSale,signDetail,signUpdate } from '@/api/reply'
  import _  from 'lodash';
  import Sticky from '@/components/Sticky'
  import { mapGetters } from 'vuex'
  export default {
    components: { Sticky },
    data(){
      return {
        planform:{
          saleSignReq:{
             planCode:'',
             ownerName:'',
             planWarehouseName:'',
             signName:'',
             signTel:'',
             signCreateTime:''
          },
          details:[]
        },
        fileList: [],
        fetchSuccess: true,
        submitloading: false,
        loading:false,
        id:'',

        enclosureDialogVisible:false,
        enclosureuploadUrl: '/planapi/api/fileupload/filetoserver',
        uploadButtonVisible: false,

        reply:'',
      }
      
    },

    computed:{
      ...mapGetters({
        visitedViews: 'visitedViews',
      }),

      filelength() {
        return this.fileList.length
      },
      enclosure() {
        const url = []
        this.fileList.forEach(
          file => {
            if (file.response) {
              url.push({ name: file.name, url: file.response.data })
            } else if (file.name && file.url) {
              url.push({ name: file.name, url: file.url })
            }
          }
        );
        return url
      },
    },

    mounted(){
      let {id,modify}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.id=id;
      let data=_.cloneDeep(this.planform); 
      this.planform=data;
      this.loading=true;
      if(modify){
          signDetail({signId:id}).then(res=>{
          this.loading=false;
          if(res.data&&Array.isArray(res.data.itemList)){
            data.saleSignReq={...data.saleSignReq,...res.data}
            data.saleSignReq.planCode=data.saleSignReq.outPlanCode
            let dataList=res.data.itemList;
            dataList=dataList.map(v=>{
                let json=v;
                json['signQty']=json.signQty
                json['rejectQty']=json.rejectQty;
                return json;
            })
            data.details=dataList;
            this.planform=data;
          }
        }).catch(err=>{
           this.loading=false;
        })
      } else {
        planDetail({id}).then(res=>{
          this.loading=false;
          if(res.data&&Array.isArray(res.data.itemList)){
            data.saleSignReq={...data.saleSignReq,...res.data}
            let dataList=res.data.itemList;
            dataList=dataList.map(v=>{
                let json=v;
                json['signQty']=json.realOutQty
                json['rejectQty']=0;
                return json;
            })
            data.details=dataList;
            this.planform=data;
          }
        }).catch(err=>{
            this.loading=false;
        })
      }
    },

    methods:{
      submitOrder(formName){
        let {modify}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
        let Api=signBuildSale;
        if(modify){
           Api=signUpdate;
        }
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitloading=true;
            let data=_.cloneDeep(this.planform);
            data.saleSignReq.enclosure=JSON.stringify(this.enclosure)
            data.saleSignReq.signCreateTime=moment(data.saleSignReq.signCreateTime).valueOf();
            let json={};
            for(let i in data['saleSignReq']){
              if(['signName','signTel','signCreateTime'].includes(i)){
                json[i]=data['saleSignReq'][i]
              }
            }
            if(modify){
              json['saleSignId']=this.id;
            }

            json['details']=data['details'].map(v=>{
              if(modify){
                return {
                  signDetailId:v.id,
                  signQty:v.signQty,
                  rejectQty:v.rejectQty
                }
              } else{
                return {
                  outPlanDetailId:v.id,
                  signQty:v.signQty,
                  rejectQty:v.rejectQty
                }
              }
              
            })

            if(!json['details'].every(v=>v.signQty!==undefined&&v.rejectQty!==undefined)){
                this.$message({
                showClose: true,
                message: '签收数量和拒收数量不能为空',
                type: 'error'
              });
              return;
            }

            Api(json).then(res=>{
                this.submitloading=false;
                this.replyid=res.data;
                this.$confirm('操作成功！', '提示', {
                confirmButtonText: '详情',
                cancelButtonText: '关闭',
                type: 'success'
              }).then(
                _ => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      path: '/reply/newreceiptorder-detail',
                      query:{data:JSON.stringify({
                        id:modify?this.id:this.replyid,
                        approveStatus:0,         
                      })}
                    })
                  })
                }
              ).catch(err=>{
                 
              })
            }).catch(err=>{
              this.submitloading=false;
            })
          } else {
            return false;
          }
        });
      },
      goeditrow(index) {
        let data=_.cloneDeep(this.planform);
        data.details[index].edit = !data.details[index].edit
        this.planform=data;
      },

      handleDelete(index, row) {
        this.planform.details.splice(index, 1)
        this.$message({
          message: '成功删除一条记录！',
          type: 'success'
        })
      },




      importFile() {
        this.enclosureDialogVisible = true
      },


      beforeUpload(file) {
        if (file.size > 5000 * 1000) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
      },

      handleFileExceed(files, fileList) {
        this.$message.warning(`当前限制选择上传 10 个文件`)
      },

      handleRemove(file, fileList) {
        this.fileList = fileList
      },

      handelUploadChange(file, fileList) {
        // 选择文件时显示上传按钮
        if (Object.keys(file).length && fileList.length) {
          this.uploadButtonVisible = true
        } else {
          this.uploadButtonVisible = false
        }
      },

      handleEnclosureUploadSuccess(res, file, fileList) {
        if (res.code === '200') {
          this.fileList = fileList;
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      },

     submitEnclosureUpload() {
       this.$refs.enclosureupload.submit()
     },

    }
 }
</script>

