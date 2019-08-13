<template lang="html">
  <div>
    <el-form ref="detailForm" label-width="120px" class="formb0">
      <item-title text="基本信息" />
      <el-form-item label="租户编码：">
        {{detailForm.ownerCode}}
      </el-form-item>
      <el-form-item label="客户类型："prop="ownerType">
        {{filter('ownerType',detailForm.ownerType)}}
      </el-form-item>

      <el-form-item label="租户名称：" prop="ownerName">
        {{detailForm.ownerName}}
      </el-form-item>

      <el-form-item label="状态：" prop="ownerState">
        {{filter('ownerState',detailForm.ownerState)}}
      </el-form-item>

      <el-form-item label="营业执照:">
        <div v-for="file in detailForm.files" class="photoview">
          <img :src="file.path" height="150" />
          <i class="el-icon-close close" style="pointer:cursor"></i>
        </div>
      </el-form-item>

      <item-title text="仓库信息" />
      <el-form-item label="所属仓库：">
        {{curWarehouses}}
      </el-form-item>


      <item-title text="企业联系人" />
      <el-form-item label="联系人：" prop="ownerLinkUser">
        {{detailForm.ownerLinkUser}}
      </el-form-item>
      <el-form-item label="电话：" >
        {{detailForm.ownerLinkuserTel}}
      </el-form-item>


      <item-title text="开票信息" />
      <el-form-item label="组织机构代码：" prop="ownerDcno">
        {{detailForm.ownerDcno}}
      </el-form-item>
      <el-form-item label="企业地址：">
        {{detailForm.ownerAddress}}
      </el-form-item>
      <el-form-item label="企业电话：">
        {{detailForm.ownerTel}}
      </el-form-item>
      <el-form-item label="开户行支行：">
        {{detailForm.openBank}}
      </el-form-item>
      <el-form-item label="银行账户名称：">
        {{detailForm.openBankName}}
      </el-form-item>
      <el-form-item label="银行账户：">
        {{detailForm.openBankAccount}}
      </el-form-item>
      <item-title text="其他" />
      <el-form-item label="备注：">
        {{detailForm.remarkInfo}}
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tenantDetail, ownerWarehouseList } from '@/api/tenant'
export default {
  name: '',
  data() {
    return {
      detailForm: {},
      warehouses: []
    }
  },
  computed: {
    curWarehouses() {
      let warehouses = ''
      this.warehouses.forEach(item => {
        warehouses += ',' + item.warehouseName
      })
      return warehouses.slice(1)
    },
    ...mapGetters(['mapConfig', 'visitedViews'])
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const loading = this.$loading({
        lock: true,
        text: '加载中'
      })
      const { ownerCode } = this.$route.query
      tenantDetail({ ownerCode }).then(res => {
        this.detailForm = res.data
        loading.close()
      }).catch(err => {
        console.error(err)
        loading.close()
      })
      ownerWarehouseList({ ownerCode }).then(res => {
        this.warehouses = res.data || []
      }).catch(err => {
        console.error(err)
      })
    },
    filter(type, val) {
      if (type === 'ownerType') {
        switch (val) {
          case 1:
            return '仓储客户'
          case 2:
            return '采购商'
          case 3:
            return '供应商'
          case 4:
            return '服务商'
          default:
            return ''
        }
      }
      if (type === 'roleType') {
        switch (val) {
          case 1:
            return '租户'
          default:
            return ''
        }
      }
      if (type === 'ownerState') {
        switch (val) {
          case 1:
            return '启用'
          case 2:
            return '禁用'
          default:
            return ''
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.photoview {
  display: block;
  position: relative;
}
.photoview .close {
  position: absolute;
  top: 0;
}
.el-form-item {
  min-height: 40px;
}
</style>
