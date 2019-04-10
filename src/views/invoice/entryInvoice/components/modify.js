
import { commitFinaPurchaseInvoice,checkFinaPurchaseInvoice ,invalidFinaPurchaseInvoice} from '@/api/void'

export default function Modify({type,status,prompt,successTips,errorTips}) {

  if (type === 0) {
    this.$prompt(prompt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      checkFinaPurchaseInvoice({
        flag:status,
        finaPurchaseInvoiceId:this.$route.query.finaPurchaseInvoiceId
      }).then(res=>{
        if(res.success){
          this.$message({
            type: 'success',
            message: successTips
          })
        } else{
          this.$message({
            type: 'error',
            message:errorTips
          })
        }
        this.findFinaPurchaseInvoiceApi()
      }).catch(err=>{
        this.$message({
          type: 'error',
          message:errorTips
        })
        this.findFinaPurchaseInvoiceApi()
      })

    }).catch(()=>{
       this.$message({
          type: 'info',
          message: '操作取消'
        })
    })
  } else if (type === 1) {
      commitFinaPurchaseInvoice({
        finaPurchaseInvoiceId:this.$route.query.finaPurchaseInvoiceId
      }).then(res=>{
        if(res.success){
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        } else{
          this.$message({
            type: 'error',
            message: '提交失败!'
          }) 
        }
        this.findFinaPurchaseInvoiceApi()
      }).catch(err=>{
        this.findFinaPurchaseInvoiceApi() 
      })
  } else if(type===3){
    this.$confirm(prompt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      invalidFinaPurchaseInvoice({
        flag:status,
        finaPurchaseInvoiceId:this.$route.query.finaPurchaseInvoiceId
      }).then(res=>{
        if(res.success){
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else{
          this.$message({
            type: 'error',
            message: '操作失败!'
          }) 
        }
        this.findFinaPurchaseInvoiceApi() 
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: '操作失败!'
        }) 
        this.findFinaPurchaseInvoiceApi() 
      })
    }).catch(err=>{
      this.$message({
        type: 'error',
        message: '操作失败!'
      }) 
    })
  }
}