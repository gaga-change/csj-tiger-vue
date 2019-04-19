
import { outBillCheck,outBillDelete,outBillClose } from '@/api/outgoing'

export  function operation(row,api,tip){
  //接口配置
  let apiConfig={ outBillCheck,outBillDelete,outBillClose };
  let data=row.id;
  if(api==='outBillClose'){
    data=row.busiBillNo
  }

  //请求配置
  let submit=()=>apiConfig[api](data).then(res=>{
    if(res.success){
      this.$message({type:'success', message:'操作成功' });
      if(api==='outBillDelete'&&this.$router.history.current.path==='/outgoing/businessorder-detail'){
        const view = this.visitedViews.filter(v => v.path === this.$route.path)
        this.$store.dispatch('delVisitedViews', view[0]).then(() => {
          this.$router.push({path:'/outgoing/businessorder'})
        }).catch(err=>{
          console.log(err)
        })
      } else{
        this.getCurrentTableData()
      }
    } else{
      this.$message.error('操作失败')
    }
  }).catch(err=>{
    this.$message.error('操作失败')
    console.log(err)
  })
  
  let component=this.$confirm;
  if(['outBillCheck'].includes(api)){
    component=this.$prompt;
  }
  
  //对话配置
  component(tip, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    submit()
  }).catch((err) => {
    console.log(err)
    this.$message({
      type: 'info',
      message: '已取消操作'
    });
  });

}