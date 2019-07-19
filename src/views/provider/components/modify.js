import * as LocalApi from '@/api/provider'
export default function Modify({flag,prompt,successTips,errorTips,api}) {
    let component=this.$confirm;
    let Api=LocalApi[api];
    if(api==='registerApprove'){
      component=this.$prompt
    }
     component(prompt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      if(api==='registerApprove'){
        if(flag===0){
          this.examineLoding=true;
        } else if(flag===1){
          this.rejectLoding=true;
        }
      }else if(api==='registerDrop'){
        this.deletLoding=true;
      } else if(api==='registerCommit'){
        this.subLoding=true;
      } 

      Api({
        flag:flag,
        id:Number(this.$route.query.id),
      }).then(res=>{
        this.subLoding=false;
        this.examineLoding=false;
        this.rejectLoding=false;
        this.deletLoding=false;
        if(res.success){
          this.$message({
            type: 'success',
            message: successTips,
            onClose:()=>{
              if(api==='registerDrop'){
                const view = this.visitedViews.filter(v => v.path === this.$route.path)
                this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({
                      path:'/provider/list',
                    })
                    return ''
                }).catch(err=>{ 
                  console.error(err)
                }) 
              }
             }
          })
        } else{
          this.$message({
            type: 'error',
            message:errorTips
          })
        }
        this.getCurrentTableData(); 
      }).catch(err=>{
        this.subLoding=false;
        this.examineLoding=false;
        this.rejectLoding=false;
        this.deletLoding=false;
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

