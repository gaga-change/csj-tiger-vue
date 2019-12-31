<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :showIndex="true"
      :controlWidth="120"
      :parseData="parseData"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="handelDel(scope.row)"
        >删除</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link
          type="primary"
          @click="$router.push({path:`/freight/freightTem/add`,query:{id: scope.row.id}})"
        >修改</el-link>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <el-link
          type="primary"
          @click="$router.push({path:`/freight/freightTem/add`,query:{id: scope.row.id}})"
        >查看</el-link> -->
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="handleCreate"
        >
          新建模板
        </el-button>
        <router-link :to="`/freight/quationList/add`">
          <el-button
            type="primary"
            size="mini"
          >
            报价
          </el-button>
        </router-link>
      </template>
    </base-list>
  </div>
</template>

<script>
import { queryTemplateList, consoilInfoList, deleteTemplateInfo } from '@/api'
import { Area, areaTools } from '@/utils/area2'

const tableConfig = [
  { label: '模板名称', prop: 'templateName' },
  { label: '承运商 ', prop: 'consoildatorName' },
  { label: '运输种类', prop: 'templateType', type: 'enum', enum: 'getTemplateTransport' },
  { label: '出发地', prop: 'startPlaceName' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time', width: 140 },
  { label: '创建者', prop: 'createrName' },
]

const searchConfig = [
  { label: '承运商 ', prop: 'consoildatorCode', type: 'enum', enum: '_consoilInfoList_state31' },
  { label: '运输种类', prop: 'templateType', type: 'enum', enum: 'getTemplateTransport' },
]

export default {
  data() {
    return {
      Area,
      getCityByCode: areaTools().getCityByCode,
      tableConfig,
      searchConfig,
      listApi: queryTemplateList,
      // 可选 附加查询条件
      appendSearchParams: {},
    }
  },
  created() {
    consoilInfoList({
      consoildatorState: 31,
      pageSize: 9999,
      pageNum: 1
    }).then(res => {
      if (!res) return
      res.data.list
      this.$store.commit('ADD_MAP', {
        name: '_consoilInfoList_state31',
        keyValue: (res.data.list || []).map(v => {
          return {
            value: v.consoildatorName,
            key: v.consoildatorCode
          }
        })
      })
    })
  },
  methods: {
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || []
      let total = res.data.total
      data.forEach(v => {
        if (v.templateType == 1 && v.startPlace) {
          let temp = v.startPlace.split('_')
          if (temp.length === 2) {
            v.startPlaceName = [this.Area.find(item => item.value === temp[0]).label, this.getCityByCode(temp[1])].join(' - ')
          }
        } else if (v.startPlace) {
          let place = this.Area.find(item => item.value === v.startPlace)
          v.startPlaceName = place ? place.label : v.startPlace
        }
      })
      return { data, total }
    },
    /** 删除 */
    handelDel(row) {
      this.$delConfirm('此操作将永久删除该模板, 是否继续?', () => deleteTemplateInfo({ id: row.id }).then(res => {
        if (!res) return
        this.$message.success('删除成功！')
        this.getTableData()
      }))
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: '/freight/freightTem/add' })
    }
  }
}
</script>