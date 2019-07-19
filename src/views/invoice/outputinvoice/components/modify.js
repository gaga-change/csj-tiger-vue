
import { getSalesInvoiceBillingReview,obsoleteApplication,obsoleteDocument, getSalesInvoiceBillingReject,getSalesInvoiceComplex } from '@/api/invoicetigger'

export default function Modify(type, name, needfresh, api,tips) {
  // 0 驳回
  if (type === 5) {
    this.$prompt('请输入驳回意见', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      getSalesInvoiceBillingReject({
        id: this.$route.query.id,
        ticketStatusEnum: type,
        remarkInfo:value
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
  }else if (type === 4) {//复核通过
    this.$confirm('是否确定复核通过?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      getSalesInvoiceComplex({
        id: this.$route.query.id,
        ticketStatusEnum: type,
      }).then(res => {
        this.$message({
          type: 'success',
          message: '复核成功!'
        })
        this.needfresh()
      }).catch(err => {
        console.error(err)
        this.$message({
          type: 'error',
          message: '复核失败'
        })
        this.needfresh()
      })
    }).catch(()=>{
      this.needfresh()
    })
  } else if(type===-1){
    this.$confirm('是否确定要作废', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      obsoleteApplication({
        id:this.$route.query.id
      }).then(res=>{
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.push({
          path:`/invoice/outputinvoice/invoiceinvalid/detail?id=${this.$route.query.id}`,
        })
      }).catch(err=>{
         console.error(err)
      })
    }).catch((err)=>{
      console.error(err)
    })
  } else if(type===-2){
    this.$confirm('是否确定要作废', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      obsoleteDocument({
        id:this.$route.query.id,
        invoiceCancelStatus:2
      }).then(res=>{
         this.$message({
          type: 'success',
          message: '作废成功!'
        })
         this.getCurrentTableData()
      }).catch(err=>{
        console.error(err)
      })
    }).catch(err=>{

    })
  } else if(type===-3){
    this.$confirm('是否确定要驳回', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      obsoleteDocument({
        id:this.$route.query.id,
        invoiceCancelStatus:3
      }).then(res=>{
        this.$message({
          type: 'success',
          message: '驳回成功!'
        })
        this.getCurrentTableData()
      }).catch(err=>{
        console.error(err)
      }) 
    }).catch(err=>{

    })

  }
}