import { signApprove,signDelete } from '@/api/reply'
export function Prompt(type){
  if(type=='examine'){
     this.$prompt('请输入审核意见', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        signApprove({
          approveRemark:value,
          purcBatchNo:this.config.purcBatchNo,
          signId:this.signId,
          code:1
        }).then(res=>{
          if(res.success){
            this.approveStatus=1;
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.$router.replace({
              path:'/reply/newreceiptorder-detail',
              query:{data:JSON.stringify({
                id:this.signId,
                approveStatus:1
              })}
            })
          } else{
            this.$message({
              type: 'error',
              message: '审核失败!'
            })
          }
        }).catch(err=>{
          this.$message({
            type: 'error',
            message: '审核失败!'
          })
        })
      }).catch(err=>{
        this.$message({
          type: 'info',
          message: '已取消审核!'
        })
    })
  } else if(type=='reject'){
    this.$confirm('是否确定驳回?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      signApprove({
        signId:this.signId,
        code:2
      }).then(res=>{
        if(res.success){
          this.approveStatus=2;
          this.$router.replace({
            path:'/reply/newreceiptorder-detail',
            query:{data:JSON.stringify({
              id:this.signId,
              approveStatus:2
            })}
          })
        } else{
          this.$message({
            type: 'error',
            message: '驳回失败,已取消驳回'
          })
        }
       
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: '驳回失败,已取消驳回'
        })
      })
    
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消驳回'
      })
    })
  } else if(type=='delete'){
    this.$confirm('是否确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      signDelete({
        signId:this.signId,
      }).then(res=>{
        if(res.success){
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$router.back()
        } else{
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: '删除失败'
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