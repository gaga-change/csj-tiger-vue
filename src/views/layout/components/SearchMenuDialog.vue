<template>
  <div class="SearchMenuDialog">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="搜索"
      :visible="visible"
      width="70%"
      :before-close="handleClose"
      @close="close"
      append-to-body
      center
    >
      <div class="SearchMenuDialogContent">
        <div
          class="search-header"
          @keypress.enter="handleSearch"
        >
          <el-input
            type="text"
            style="width:400px"
            placeholder="输入菜单名称，按回车键搜索"
            v-model.lazy="searchVal"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </div>
        <div class="mt20">
          <el-row :gutter="10">
            <el-col
              :span="6"
              v-for="(value, key ) in locationMenuMapFilter"
              :key="key"
            >
              <el-card>
                <item-title>
                  {{key}}
                </item-title>
                <div>
                  <div
                    v-for="item in value"
                    :key="item.name"
                  >
                    <template v-for="son in item.children">
                      <div
                        :key="son.name"
                        v-if="!son.hidden"
                        class="link-item"
                      >
                        <el-link
                          type="primary"
                          @click.prevent="changeMenu(`${item.path}/${son.path}`, key)"
                        >{{item.meta.title}} - {{son.meta.title}}
                        </el-link>
                        <i
                          v-show="!son.love"
                          class="star el-icon-star-off"
                          @click="handleStar(son)"
                        ></i>
                        <i
                          v-show="son.love"
                          class="stared el-icon-star-on"
                          @click="handleDelStar(son)"
                        ></i>
                      </div>
                    </template>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const storeKey = "LINK_LOVE"
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchVal: '',
      locationMenuMap: {},
      locationMenuMapFilter: {},
      loves: ""
    }
  },
  computed: {
    ...mapGetters([
      'fetchMapLocationMenu',
    ]),
  },
  created() {
    this.loves = window.localStorage.getItem(storeKey) || ""
    let res = {}
    let temp = this.$copy(this.fetchMapLocationMenu)
    temp.forEach(item => {
      if (!item.mark) return
      res[item.mark] = res[item.mark] || []
      item.children.forEach(son => {
        son.love = !!~this.loves.indexOf('#' + son.name)
      })
      res[item.mark].push(item)
    })
    this.locationMenuMap = this.locationMenuMapFilter = res
  },
  methods: {
    handleStar(son) {
      if (~this.loves.indexOf('#' + son.name)) {
        return
      }
      this.loves += '#' + son.name
      window.localStorage.setItem(storeKey, this.loves)
      son.love = true
    },
    handleDelStar(son) {
      this.loves = this.loves.replace('#' + son.name, '')
      window.localStorage.setItem(storeKey, this.loves)
      son.love = false
    },
    handleSearch() {
      let locationMenuMapFilter = { ...this.locationMenuMap }
      for (let key in locationMenuMapFilter) {
        locationMenuMapFilter[key] = [...locationMenuMapFilter[key]].map(v => {
          let item = { ...v }
          item.children = item.children.filter(son => {
            let title = item.meta.title + son.meta.title
            return ~title.indexOf(this.searchVal)
          })
          return item
        })
      }
      this.locationMenuMapFilter = locationMenuMapFilter
    },
    changeMenu(path, mark) {
      this.$store.dispatch('setLocalmenu', mark)
      this.$nextTick(() => {
        this.$router.push(path)
        this.close()
      })
    },
    /** 关闭弹窗 */
    close() {
      this.searchVal = ""
      this.locationMenuMapFilter = this.locationMenuMap
      this.visible && this.$emit('update:visible', false)
    },
    handleClose(done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => { })
    }
  }
}
</script>

<style lang="scss">
.SearchMenuDialogContent {
  .search-header {
    text-align: center;
  }
  .link-item {
    .star {
      opacity: 0;
      transition: 1s all;
    }
    .star,
    .stared {
      cursor: pointer;
    }
    &:hover {
      .star {
        opacity: 1;
      }
    }
  }
}
</style>