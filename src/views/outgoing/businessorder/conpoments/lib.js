
import { outBillDelete, outBillCheck } from '@/api'
import { outBillClose } from '@/api/outgoing'

export function operation(row, api, tip) {
  //接口配置
  let apiConfig = { outBillCheck, outBillDelete, outBillClose };
  let data = row.id;
  if (api === 'outBillClose') {
    data = row.billNo
  } else if (api === 'outBillCheck') {
    data = {
      outWarehouseBillId: row.id,
      checkFlag: 1,
    }
  }

  //请求配置
  let submit = (append) => {
    let temp = data
    if (append && typeof temp === 'object') {
      temp = { ...temp, ...append }
    }
    apiConfig[api](temp).then(res => {
      if (!res) return
      if (res.success) {
        this.$message({ type: 'success', message: '操作成功' });
        if (api === 'outBillDelete' && this.$router.history.current.path === '/outgoing/businessorder-detail') {
          const view = this.visitedViews.filter(v => v.path === this.$route.path)
          this.$store.dispatch('delVisitedViews', view[0]).then(() => {
            this.$router.push({ path: '/outgoing/businessorder' })
          }).catch(err => {
            console.error(err)
          })
        } else {
          this.getCurrentTableData()
        }
      }
    })
  }

  let component = this.$confirm;
  if (['outBillCheck'].includes(api)) {
    component = this.$prompt;
  }

  //对话配置
  component(tip, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(({ value }) => {
    submit({ checkAdvice: value })
  }).catch((err) => {
    console.error(err)
    this.$message({
      type: 'info',
      message: '已取消操作'
    });
  });
}