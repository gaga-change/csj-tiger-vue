
import { receiptFinaCheck , receiptRelateCheck} from '@/api/receipt'

export default function Modify(type, name, needfresh, api) {
  // 0 驳回
  if (type == 'FinaReject') {
    this.$prompt('请输入驳回原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      receiptFinaCheck({
        id: this.$route.query.id,
        checkFlag: false,
        approveInfo :value
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
  } else if (type == 'FinaCheck') {//审核通过，待登记
    this.$prompt('请输入审核通过原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      
      receiptFinaCheck({
        id: this.$route.query.id,
        checkFlag: true,
        approveInfo :value
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
        this.needfresh()
      }).catch(err => {
        console.error(err)
        this.$message({
          type: 'error',
          message: '审核失败'
        })
        this.needfresh()
      })
    }).catch(()=>{
      
      this.needfresh()
    })
  }else if (type == 'RelateCheck') {//执行单审核
    this.$prompt('请输入审核原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      receiptRelateCheck({
        id: this.$route.query.id,
        checkFlag: true,
        relationApproveInfo:value
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
        this.needfresh()
      }).catch(err => {
        console.error(err)
        this.$message({
          type: 'error',
          message: '审核失败'
        })
        this.needfresh()
      })
    }).catch(()=>{
      this.needfresh()
    })
  }else if (type == 'RelateReject') {//执行单审核
    this.$prompt('请输入驳回原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      receiptRelateCheck({
        id: this.$route.query.id,
        checkFlag: false,
        relationApproveInfo:value
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
        console.error(err)
        this.$message({
          type: 'error',
          message: '驳回失败'
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
  }
}