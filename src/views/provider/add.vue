<template>
  <div class="provider-add">
    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          type="success"
          size="mini"
          @click="submit('save')"
          :loading="saveLoading"
        >保存</el-button>
        <el-button
          type="success"
          size="mini"
          @click="submit('submit')"
          :loading="submitLoading"
        >提交</el-button>
      </template>
    </sticky>

    <el-card
      class="simpleCard"
      shadow="never"
      body-style="padding:12px;padding-bottom:0"
    >
      <el-form
        :model="searchForm"
        ref="searchForm"
        label-width="70px"
        label-position="left"
      >
        <el-row>
          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="收货企业"
              label-width="80px"
              style="width:300px"
            >
              <el-input
                type="text"
                size="mini"
                :disabled="true"
                @keyup.enter.native="submit"
                v-model="searchForm.arrivalName"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="销售订单号"
              label-width="90px"
              style="width:300px"
            >
              <el-input
                type="text"
                size="mini"
                :disabled="true"
                @keyup.enter.native="submit"
                v-model="searchForm.busiBillNo"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="销售合同号"
              label-width="80px"
              style="width:300px"
            >
              <el-input
                type="text"
                size="mini"
                :disabled="true"
                @keyup.enter.native="submit"
                v-model="searchForm.contractNo"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              label="收货日期"
              label-width="100px"
              style="width:300px"
              prop="receiveCreateTime"
              :rules="[
                    { required: true, message: '该项为必填'},
                    ]"
            >
              <el-date-picker
                v-model="searchForm.receiveCreateTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="收货人"
              label-width="80px"
              style="width:300px"
              prop="receiveName"
              :rules="[
                      { required: true, message: '该项为必填'},
                     ]"
            >
              <el-input
                type="text"
                size="mini"
                @keyup.enter.native="submit"
                placeholder="请输入收货人"
                v-model="searchForm.receiveName"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="联系电话"
              label-width="80px"
              style="width:300px"
            >
              <el-input
                type="text"
                size="mini"
                @keyup.enter.native="submit"
                placeholder="请输入联系电话"
                v-model="searchForm.receiveTel"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item
              label="收货地址"
              label-width="70px"
              prop="receiveAddr"
              :rules="[
                    { required: true, message: '该项为必填'},
                 ]"
            >
              <el-input
                type="textarea"
                :rows="1"
                resize="none"
                placeholder="请输入收货地址"
                v-model="searchForm.receiveAddr"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width:300px"
          >
            <el-form-item
              label="上传附件"
              label-width="70px"
              style="width:300px"
            >
              <upload-mode
                @fileListChange="fileListChange"
                :defailFileList="searchForm.files||[]"
              >
              </upload-mode>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </el-card>

    <item-title text="相关明细" />
    <nesting-table
      :loading="loading"
      :useEdit="true"
      :useDelet="false"
      :useEditExpand="true"
      :defaultExpandAll="true"
      childTableDataKey="billDetailList"
      editText="登记收货量"
      :config="addTableConfig"
      :childConfig="addChildTableConfig"
      :allTableData="tableData"
      @goeditrow="goeditrow"
    />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import NestingTable from '@/components/Table/nestingTable'
import { addTableConfig, addChildTableConfig } from './components/config';
import { toAddRegister, addReceiveRegiste, registerDetail, registerUpdate } from '@/api/provider'
import { mapGetters } from 'vuex'
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'providerAdd',
  components: { Sticky, NestingTable },
  data() {
    return {
      searchForm: {
        arrivalName: '',
        busiBillNo: '',
        contractNo: '',
        receiveCreateTime: '',
        receiveName: '',
        receiveTel: '',
        receiveAddr: '',
      },
      successfulUploadFiles: [],
      addTableConfig,
      addChildTableConfig,
      tableData: [],
      loading: false,
      saveLoading: false,
      submitLoading: false,
    }
  },

  mounted() {
    this.onLoad()
  },

  // activated(){
  //   this.onLoad()
  // },
  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    }),
  },

  methods: {

    onLoad() {
      let dataApi = toAddRegister;
      if (this.$route.query.edit) {
        dataApi = registerDetail;
      }
      dataApi({
        id: this.$route.query.id
      }).then(res => {
        if (res.success) {
          let arr = res.data && res.data.itemList || [];
          if (this.$route.query.edit) {
            this.searchForm = res.data;
            this.searchForm.arrivalName = res.data && res.data.receiveEnterprise;
            this.searchForm.busiBillNo = res.data && res.data.outBusiBillNo;
            this.tableData = arr.map(v => {
              let json = v;
              json.billDetailList = v.detailList || [];
              return json;
            });
          } else {
            this.searchForm.arrivalName = res.data && res.data.arrivalName
            this.searchForm.busiBillNo = res.data && res.data.busiBillNo
            this.searchForm.contractNo = res.data && res.data.contractNo
            this.tableData = arr.map(v => {
              let json = v;
              if (v.detailList && Array.isArray(v.detailList)) {
                json.billDetailList = v.detailList.map(item => {
                  let childJson = item;
                  childJson.receiveQty = (item.purchaseQty - item.realInQty) || 0;
                  return childJson;
                })
              }
              return json;
            });
          }
        }
      }).catch(err => {
        console.error(err)
      });

    },


    goeditrow(index) {
      let data = _.cloneDeep(this.tableData);
      if (!data[index]['billDetailList'] || !data[index]['billDetailList'].length) {
        return ''
      }
      data[index].edit = !data[index].edit;
      data[index]['billDetailList'] = data[index]['billDetailList'].map(v => {
        let json = v;
        json.edit = !v.edit
        return json;
      })
      this.tableData = data;
    },

    fileListChange(successfulUploadFiles) {
      this.successfulUploadFiles = successfulUploadFiles
    },

    submit(type) {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      let subApi = addReceiveRegiste;
      if (this.$route.query.edit) {
        subApi = registerUpdate;
      }
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let json = _.cloneDeep(this.searchForm);
          json.planCode = this.$route.query.planCode;
          if (type === "save") {
            json.receiveStatus = 0;
            this.saveLoading = true;
          } else if (type === "submit") {
            json.receiveStatus = 1;
            this.submitLoading = true;
          }
          json.files = this.successfulUploadFiles;
          json.itemList = this.tableData.map(v => {
            let json = v;
            json.outPlanDetailid = v.id;
            json.detailList = [];
            if (Array.isArray(v.billDetailList)) {
              json.detailList = v.billDetailList.map(v => {
                let childJson = v;
                childJson.planQty = v.purchaseQty;
                childJson.realQty = v.realInQty;
                return childJson;
              })
            }
            return json;
          });
          if (json.receiveCreateTime) {
            json.receiveCreateTime = moment(json.receiveCreateTime).valueOf()
          }
          subApi(json).then(res => {
            if (res.success) {
              this.saveLoading = false;
              this.$message({
                type: 'success',
                message: '操作成功,1.5s后跳往详情页',
                duration: 1500,
                onClose: () => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    if (this.$route.query.edit) {
                      this.$router.push({
                        path: '/provider/detail',
                        query: { id: this.$route.query.id }
                      })
                    } else {
                      this.$router.push({
                        path: '/provider/detail',
                        query: { id: res.data.id }
                      })
                    }
                  }).catch(err => {
                    console.error(err)
                  })
                }
              })
            }
          }).catch(err => {
            this.$message({ type: 'error', message: '操作失败' })
            console.error(err)
            this.saveLoading = false;
            this.submitLoading = false;
          })
        } else {
          return false;
        }
      })
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.provider-add {
  .el-form-item {
    height: 30px;
    margin-bottom: 36px;
  }
}
</style>