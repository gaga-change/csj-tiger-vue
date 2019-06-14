function Creater(options) {
  return new Check(options).docheck()
}
class Check {
  constructor(options) {
    const {
      global,
      ...rest
    } = options
    this.global = global
    this.$options = rest
  }
  docheck() {
    return new Promise((resolve, reject) => {
      const vm = this.global
      const title = this.$options.agree === 0 ? '驳回' : this.$options.agree === 1 ? '审核' : '提示'
      const postData = {
        planCode: this.$options.planCode,
        agree: this.$options.agree
      }
      vm.loading = true
      vm.$prompt('请输入意见', title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(({
          value
        }) => {
          postData.reason = value
          this.$options.apiStart && this.$options.apiStart()
          this.$options.api(postData).then(res => {
            vm.loading = false
            if (res.success) {
              resolve(res)
            } else {
              reject()
            }
          }).catch(() => {
            vm.loading = false
            reject()
          })
        })
        .catch(() => {
          vm.loading = false
          reject()
        })
    })
  }
}
export default Creater
