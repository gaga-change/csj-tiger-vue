import { ContractCheck } from '@/api/planorder'
export default function contractModify(type, params, needfresh, api) {
  const CotractCheck = api || CotractCheck
  const checkUser = this.userInfo.truename
  const ticketNo = this.$route.params.ticketno
  if(!this.$route.params){
    this.$message({
      type: 'warn',
      message: '审核失败，请刷新重试!'
    })
  }
  // 0 审核
  if (type === 1) {
    this.$prompt('请输入审核意见', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      ContractCheck({
        workflowid: this.$route.params.workflowid,
        contractno: this.$route.params.contractno,
        checkFlag: type,
        checkAdvice: value
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '审核成功!'
        })
        if (needfresh) {
          this.needfresh()
        } else {
          
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warn',
          message: '审核失败!'
        })
      })
    })
  } else if (type === 1) {
    this.$prompt('是否确定驳回?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      ContractCheck({
        workflowid: this.$route.params.workflowid,
        contractno: this.$route.params.contractno,
        checkFlag: type,
        checkAdvice: value
      }).then(res => {
      
        this.$message({
          type: 'success',
          message: '驳回成功!'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '驳回失败'
        })
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消驳回'
      })
    })
  } else if (type === 3) {
    this.$confirm('是否确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      CotractCheck({
        ticketNo: ticketNo,
        checkFlag: type,
        checkUser: checkUser
      }).then(res => {
        console.log(res)
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$store.dispatch('delVisitedViews', view[0]).then(() => {
          this.$router.back()
        })
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  } 
}
