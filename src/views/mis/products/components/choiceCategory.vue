<template lang="html">
  <div>
    <el-input
      :value="showText"
      :disabled="disabled"
      size="small"
      :style="{ width: width + 'px' }"
      placeholder="请选择"
      @focus="selectParentClass()"
    ></el-input>
    <el-dialog title="选择分类" :visible.sync="categoryVisible" width="320px">
      <el-tree
        :data="tree"
        :props="defaultProps"
        accordion
        @node-click="getparentcategory"
      >
      </el-tree>
      <div v-show="choice.text" style="margin-top:30px;">
        确定选择分类:<span style="color:#f89604;">{{ choice.text + '?' }}</span>
      </div>
      <el-button
        class="companybtn"
        size="mini"
        style="margin-top:30px;"
        type="primary"
        @click="getNewparentcategory()"
        >确定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import { categoryList } from '@/api/productcenter'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 220
    }
  },
  data() {
    return {
      categoryVisible: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      choice: {},
      loading: false,
      tree: [],
      showText: ''
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    reset() {
      this.choice = {}
    },
    selectParentClass() {
      this.categoryVisible = true
    },
    getparentcategory(item) {
      this.choice = item
    },
    fetchCategory(params) {
      function findCategory(trees = [], params = {}) {
        for (let i = 0; i < trees.length; i++) {
          if (trees[i].currentCode === params.currentCode) {
            return trees[i]
          } else if (trees[i].children && trees[i].children.length) {
            let temp = findCategory(trees[i].children, params)
            if (temp) return temp
          }
        }
        return null
      }
      if (!this.tree.length) {
        this.getTree().then(() => {
          this.choice = findCategory(this.tree, params) || {}
        })
      } else {
        this.choice = findCategory(this.tree, params) || {}
      }
    },
    getTree() {
      return new Promise((resolve, reject) => {
        this.loading = true
        categoryList()
          .then(res => {
            this.tree = res.data.children || [];
            this.loading = false
            resolve()
          })
          .catch(err => {
            console.error(err)
            this.loading = false
            reject()
          })
      })
    },
    getNewparentcategory() {
      this.showText = this.choice.text
      this.$emit('categorySubmit', this.choice)
      this.categoryVisible = false
    }
  }
}
</script>

<style lang="css"></style>
