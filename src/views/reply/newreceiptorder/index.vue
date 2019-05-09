<template>
  <div>
    <sticky :className="'sub-navbar published'">
      <template v-if="fetchSuccess">
        <template>
          <el-button  size="small"  type="primary" @click="submitOrder('ruleForm')" v-loading="submitloading">
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
          <el-col :span="6" v-if="planform.signNo"  style="min-width:300px">
            <el-form-item label="回单号:" prop="signNo">
              {{planform.signNo}}
            </el-form-item>
          </el-col>
          <el-col :span="6" style="min-width:300px">
            <el-form-item label="出库计划单号:" label-width="100px"   prop="planCode">
              {{planform.planCode}}
            </el-form-item>
          </el-col>
          <el-col :span="6" style="min-width:300px">
            <el-form-item label="收货企业:" prop="arrivalName">
              {{planform.arrivalName}}
            </el-form-item>
          </el-col>
          <el-col :span="6" style="min-width:300px">
            <el-form-item label="发货仓库" prop="planWarehouseName">
              {{planform.planWarehouseName}}
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px;margin-right:20px">
            <el-form-item
             label="签收人"
             :rules="[
                { required: true, message: '该项为必填'},
              ]"
              prop="signName">
              <el-input v-model="planform.signName"   placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px;margin-right:20px">
            <el-form-item
              label="签收人电话"
              label-width="90px"
              :rules="[
                { required: true,pattern:/^[1][3,4,5,7,8][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/,message: '请输入正确规则的手机号或电话号'},
              ]"
             prop="signTel">
              <el-input
              v-model="planform.signTel"
                placeholder="请输入签收人电话"></el-input>
            </el-form-item>
          </el-col>

        <el-col :span="6">
          <el-form-item
            label="签收日期"
            label-width="74px"
            style="min-width:330px;margin-right:20px"
            :rules="[
                { required: true, message: '该项为必填'},
              ]"
              prop="signCreateTime">
              <el-date-picker
                v-model="planform.signCreateTime"
                type="date"
                placeholder="选择日期"
                 align="right"
                >
              </el-date-picker>
          </el-form-item>
        </el-col>

      <el-col :span="6" style="min-width:300px">
        <el-form-item
          :rules="[
            { required: true, message: '该项为必填'},
          ]"
          label="上传附件">
          <el-button
            size="mini"
            type="primary"
            @click="importFile">
            {{files.length ? '继续上传' : '上传附件'}}
          </el-button>
          <span v-show="files.length">{{filelength}}个文件</span>
        </el-form-item>
          <span v-show="filesRequired" style="color:#f56c6c;font-size:12px;margin-left:70px;top:132px;left:0;position: absolute;"> 附件为必选</span>
        </el-col>


        <el-col :span="6" style="min-width:300px">
            <el-form-item
             label="签收依据"
             :rules="[
                { required: true, message: '该项为必选'},
              ]"
              prop="type">
              <!-- demodemo -->
              <el-select v-model="planform.type"  placeholder="请选择签收依据">
              <el-option
                v-for="item in signTypes"
                :key="item.type"
                :label="item.desc"
                :disabled="!item.showFlag"
                :value="item.type">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
              :width="120"
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
              label="计划出库量"
              prop="planOutQty">
            </el-table-column>
            <el-table-column
              label="已出库量"
              prop="realOutQty">
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
              label="签收重量"
              fixed="right"
               width="130">
              <template slot-scope="scope">
                <template v-if="scope.row.edit && scope.row.settleUnit">
                  <el-input-number
                    size="mini"
                    :max="scope.row.planOutWeight"
                    :min="0"
                     style="width:120px"
                     v-model="scope.row.signWeight" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.signWeight}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="签收数量"
              fixed="right"
               width="130">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number
                    size="mini"
                    :max="planform.type===0?scope.row.realOutQty-scope.row.rejectQty:scope.row.planOutQty-scope.row.rejectQty"
                    :min="0"
                     style="width:120px"
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
              fixed="right"
              width="130">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-input-number
                  :max="planform.type===0?scope.row.realOutQty-scope.row.signQty:scope.row.planOutQty-scope.row.signQty"
                  :min="0"
                  size="mini"
                  style="width:120px"
                   v-model="scope.row.rejectQty" >
                   </el-input-number>
                </template>
                <span v-else>
                  {{scope.row.rejectQty}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              fixed="right"
              width="150">
              <template slot-scope="scope">
                <div style="width:150px">
                  <el-button v-if="scope.row.edit" type="success" @click="goeditrow(scope.$index)" size="mini" >确定</el-button>
                  <el-button v-else @click="goeditrow(scope.$index)" size="mini" >编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </el-form-item>
        </el-row>
      </el-form>
    </div>


    <el-dialog
    title="提示"
    :visible.sync="filesDialogVisible"
    center
    width="50%">
    <el-upload
      class="upload-demo"
      ref="filesupload"
      :action="filesuploadUrl"
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
    name:'newreceiptorder',
    components: { Sticky },
    data(){
      return {
        planform:{
          planCode:'',
          ownerName:'',
          planWarehouseName:'',
          signName:'',
          signTel:'',
          signCreateTime:'',
          details:[],
          deleteSignDetailIds:[],
          type:0,
        },
        signTypes:[],
        filesRequired:false,
        fileList: [],
        fetchSuccess: true,
        submitloading: false,
        loading:false,
        id:'',

        filesDialogVisible:false,
        filesuploadUrl: '/webApi/fileupload/common/filetoserver',
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

      files() {
        this.filesRequired=false;
        let url = []
        this.fileList.forEach(
          file =>
           {
              if (file.response) {
                url.push({ name: file.name, path: file.response.data&&file.response.data.filePath })
              } else if (file.name && file.url) {
                url.push({ name: file.name, path: file.url })
              }
            }
          );
        return url
      },
    },

    mounted(){
      this.onload()
    },

    // activated(){
    //   this.onload()
    // },

    methods:{
     onload(){
      let {id,modify}=this.$route.query||{};
      this.id=id;
      let data=_.cloneDeep(this.planform);
      this.planform=data;
      this.loading=true;
      if(modify){
          signDetail({signId:id}).then(res=>{
          this.loading=false;
          let fileList=res.data&&res.data.files||[];
          this.fileList=fileList.map((v,i)=>{
              let json={};
              json.name=v.name||`附件${i+1}`;
              json.url=v.path;
              return json;
          })
          this.signTypes=res.data.signTypes;
          if(res.data&&Array.isArray(res.data.itemList)){
            data={...data,...res.data}
            data.planCode=data.outPlanCode
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
            data={...data,...res.data}
            let dataList=res.data.itemList;
            dataList=dataList.map(v=>{
                let json=v;
                json['signQty']=json.realOutQty
                json.signWeight = json.planOutWeight
                json['rejectQty']=0;
                return json;
            })
          this.signTypes = res.data&&res.data.signTypes || []

            data.details=dataList;
            this.planform=data;
          }
        }).catch(err=>{
            this.loading=false;
        })
       }
      },

      submitOrder(formName){
        let {modify}=this.$route.query||{};
        let Api=signBuildSale;
        if(modify){
           Api=signUpdate;
        }
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        this.$refs[formName].validate((valid) => {
          if (valid&&this.files.length>0) {
            this.submitloading=true;
            let data=_.cloneDeep(this.planform);
            data.files=this.files;
            data.signCreateTime=moment(data.signCreateTime).valueOf();
            let json={};
            for(let i in data){
              if(['signName','signTel','signCreateTime','files','deleteSignDetailIds', 'type','ownerCode','ownerName'].includes(i)){
                json[i]=data[i]
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
                  rejectQty:v.rejectQty,
                  signWeight: v.signWeight
                }
              } else{
                return {
                  outPlanDetailId:v.id,
                  signQty:v.signQty,
                  rejectQty:v.rejectQty,
                  signWeight: v.signWeight
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
                this.replyid=typeof res.data==="string"?res.data:res.data.id;
                  this.$message({
                    type:'success',
                    message:'操作成功,1.5s后跳往详情页',
                    duration:1500,
                    onClose:()=>{
                       this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                       this.$router.push({
                       path: '/reply/newreceiptorder-detail',
                       query:{
                        id:modify?this.id:this.replyid,
                        approveStatus:0,
                        }
                      })
                     })
                    }
                  })
            }).catch(err=>{
              this.submitloading=false;
            })
          } else {
            this.filesRequired=this.files.length>0?false:true;
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
        let {modify}=this.$route.query||{};
        this.planform.details.splice(index, 1)
        this.planform.deleteSignDetailIds.push(row.id)
      },




      importFile() {
        this.filesDialogVisible = true
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
       this.$refs.filesupload.submit()
     },

    }
 }
</script>


<style rel="stylesheet/scss" lang="scss" >
  .el-form-item{
    height:30px;
    margin-bottom: 26px;
  }

  .el-table .cell{
     white-space: nowrap;
  }
</style>
