
import { PaymentPurchaseAudit} from '@/api/pay'

export default function Modify(type, name, needfresh, api) {
  // 0 驳回
  let params = {
    taskId:this.$route.query.taskId,
    taskName:this.$route.query.taskName,
    id: this.$route.query.id,
    operator:this.userInfo.id,
    operatorName:this.userInfo.truename,
    fromSystemCode:'CSJSCM'
  }
  if (type == 'payReject') {
    this.$prompt('请输入驳回原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      PaymentPurchaseAudit({
        isPass: false,
        opinion :value,
        ...params
      }).then(res => {
        if(res.success){
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
        }else{
          this.$message({
            type: 'warn',
            message: '驳回失败!'
          })
        } 
        this.needfresh()
      }).catch(err => {
        this.$message({
          type: 'warn',
          message: '驳回失败!'
        })
        this.needfresh()
      })
    }).catch(()=>{
       this.$message({
          type: 'info',
          message: '驳回取消'
        })
        this.needfresh()
    })
  } else if (type == 'payCheck') {//审核通过，待登记
    this.$prompt('请输入审核通过原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      
      receiptFinaCheck({
        isPass: true,
        opinion :value,
        ...params
      }).then(res => {
        if(res.success){
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
        }else{
          this.$message({
            type: 'warn',
            message: '审核失败!'
          })
        } 
        console.log(3666);
        
        this.needfresh()
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '审核失败'
        })
        this.needfresh()
      })
    }).catch(()=>{
      
      this.needfresh()
    })
  }
}