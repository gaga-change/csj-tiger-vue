
import { getSalesInvoiceBillingReview } from '@/api/invoice'

export default function Modify(type, name, needfresh, api) {
  // 0 驳回
  if (type === 0) {
    this.$confirm('是否确定驳回', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      getSalesInvoiceBillingReview({
        id: this.$route.query.id,
        ticketStatusEnum: type,
      }).then(res => {
        this.$message({
          type: 'success',
          message: '驳回成功!'
        })
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
  } else if (type === 2) {//审核通过，待登记
    this.$confirm('是否确定审核通过?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      getSalesInvoiceBillingReview({
        id: this.$route.query.id,
        ticketStatusEnum: type,
      }).then(res => {
        this.$message({
          type: 'success',
          message: '审核成功!'
        })
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
  }else if (type === 4) {//复核通过
    this.$confirm('是否确定复核通过?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      getSalesInvoiceBillingReview({
        id: this.$route.query.id,
        ticketStatusEnum: type,
      }).then(res => {
        this.$message({
          type: 'success',
          message: '复核成功!'
        })
        this.needfresh()
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '复核失败'
        })
        this.needfresh()
      })
    }).catch(()=>{
      this.needfresh()
    })
  }
}