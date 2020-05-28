
import { handleTransferNo } from '@/api/requisition'

export function operation(row, status, tip) {
  //接口配置
  let apiConfig = { handleTransferNo };
  let data = { id: row.id, statusFlag: status };

  //请求配置
  let submit = () => apiConfig['handleTransferNo'](data).then(res => {
    if (res.success) {
      this.$message({ type: 'success', message: '操作成功' });
      this.getCurrentTableData()
    }
  }).catch(err => {
    console.error(err)
  })

  let component = this.$confirm;

  //对话配置
  component(tip, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    submit()
  }).catch((err) => {
    console.error(err)
    this.$message({
      type: 'info',
      message: '已取消操作'
    });
  });

}