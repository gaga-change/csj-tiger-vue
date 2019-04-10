
import * as LocalApi from '@/api/abnormalGoods'; 

export default function Modify({billStatus,prompt,successTips,errorTips,api}) {
    let component=this.$confirm;
    let Api=LocalApi[api];
    if([3].includes(billStatus)){
      component=this.$prompt
    }
     component(prompt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      Api({
        flag:this.$route.query.title?0:1,
        id:Number(this.$route.query.id),
        billStatus:billStatus
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
        if(billStatus===-1){
          this.$router.push({
            path:`/abnormalGoods/list`,
          });
          return ''
        }
        this.getPurcRejectApplyApi(); 
      }).catch(err=>{
        this.$message({
          type: 'error',
          message:errorTips
        })
        this.getPurcRejectApplyApi(); 
      })

    }).catch(()=>{
       this.$message({
          type: 'info',
          message: '操作取消'
        })
    })
  } 

