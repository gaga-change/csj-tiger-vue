/**
 *paramSortArray 通过某一参数字段进行数组的排 
 *
 * @param {*} itemData 需处理的数组
 * @param {*} keyName 排序的字段
 */
export function paramSortArray(itemData,keyName){//
  var items = itemData || []
  var filterArr = [], skuCodeObj = {} 
  var len = items.length
  items.map((item,index) => {
    skuCodeObj[item[keyName]]= skuCodeObj[item[keyName]] ? skuCodeObj[item[keyName]] : [];//hash数组
    skuCodeObj[item[keyName]].push(index)
  })
  for(var item in skuCodeObj){
    if(skuCodeObj.hasOwnProperty(item)){
      skuCodeObj[item].map(index => {
        filterArr.push(items[index])
      })
    }
  }
  return filterArr
}