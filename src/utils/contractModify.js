
import { ContractCheck } from '@/api/planorder'
export default function contractModify(type, params, needfresh, needValue) {
  const CotractCheck = CotractCheck
  const checkUser = this.userInfo.truename
  const ticketNo = this.$route.params.ticketno
  // if(!this.$route.params){
  //   this.$message({
  //     type: 'warn',
  //     message: '审核失败，请刷新重试!'
  //   })
  // }
  // 1 审核
  if (type === 1) {
    this.$prompt('请输入审核意见', '提示', {
      confirmButtonText: '确定', 
      cancelButtonText: '取消'
    }).then(({ value }) => {
      if(!value){
        this.$message({
          type: 'error',
          message: '请输入审核意见,不能为空'
        })
        if(needValue){
          needValue()
        }
        return false
      }
      ContractCheck({
        workflowid: this.$route.params.workflowid,
        contractno: this.$route.params.contractno,
        checkFlag: type,
        checkAdvice: value,
        userId:this.$store.state && this.$store.state.user && this.$store.state.user.userInfo && this.$store.state.user.userInfo.id
      }).then(res => {
        console.log(res)
       
        if(res.code != 200){
          
          this.$message({
            type: 'warn',
            message:  res.errorMsg || '审核失败!'
          })
          if (needfresh) {  
            needfresh()
          }
        }else{
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          if (needfresh) {  
            
            needfresh()
          }
        }
      }).catch(err => {
        this.$message({
          type: 'warn',
          message: '审核失败!'
        })
        if (needfresh) {  
          needfresh()
        }
      })
    }).catch(err=>{
      if (needfresh) {  
        needfresh()
      }
    })
  } else if (type === 0) {//驳回
    this.$prompt('是否确定驳回?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({value}) => {
      if(!value){
        this.$message({
          type: 'error',
          message: '请输入驳回意见，不能为空'
        })
        if(needValue){
          needValue()
        }
        return false
      }
      ContractCheck({
        workflowid: this.$route.params.workflowid,
        contractno: this.$route.params.contractno,
        checkFlag: type,
        checkAdvice: value,
        userId:this.$store.state && this.$store.state.user && this.$store.state.user.userInfo && this.$store.state.user.userInfo.id
      }).then(res => {
        if(res.code == 200){
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
        }else{
          this.$message({
            type: 'warn',
            message:  res.errorMsg || '驳回失败!'
          })
        }
        if (needfresh) {
          needfresh()
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '驳回失败'
        })
        if (needfresh) {
          needfresh()
        }
      })
    }).catch((err) => {
      console.log(err);
      
      this.$message({
        type: 'info',
        message: '已取消驳回'
      })
      if (needfresh) {
        needfresh()
      }
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
