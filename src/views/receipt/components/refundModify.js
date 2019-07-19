
import * as LocalApi from '@/api/refund.js'; 

export default function Modify({flag,status,prompt,successTips,errorTips,api,loding}) {
    let component=this.$confirm;
    let Api=LocalApi[api];
    if(status!==undefined&&[1].includes(status)){
      component=this.$prompt
    }
     component(prompt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
       for(let i in this.lodingConfig){
        this.lodingConfig[i]=i===loding?true:false;
        this.disableConfig[i]=i===loding?false:true;
       }
      Api({
        id:Number(this.$route.query.id),
        approveReason:value,
        flag:flag
      }).then(res=>{
        for(let i in this.lodingConfig){
          this.lodingConfig[i]=false;
          this.disableConfig[i]=false;
         }
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
        if(api==='refundRemove'){
          const view = this.visitedViews.filter(v => v.path === this.$route.path)
          this.$message({
            type:'success',
            message:'操作成功,1.5s后跳往列表页',
            duration:1500,
            onClose:()=>{
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:'/receipt/refundList',
                  })
              }).catch(err=>{ 
                console.error(err)
              })  
            }
          })
        }
        this.getCurrentTableData();
      }).catch(err=>{
        for(let i in this.lodingConfig){
          this.lodingConfig[i]=false;
          this.disableConfig[i]=false;
         }
        this.$message({
          type: 'error',
          message:errorTips
        })
        this.getCurrentTableData();
      })

    }).catch(()=>{
       this.$message({
          type: 'info',
          message: '操作取消'
        })
    })
  } 

