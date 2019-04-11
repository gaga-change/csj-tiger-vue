
export function deepExistMenu(menu,deepExist) {
    var arr =[], index = 0;
    if(!Array.isArray(menu)){
        return arr
    }
    for(var i = 0;i<deepExist.length;i++){
        for(var j=0;j<menu.length;j++){
                if(deepExist[i].path === menu[j].path){
                    arr[index] = deepExist[i]
                    if(deepExist[i].children&&deepExist[i].children.length>0){
                        arr[index].children = deepExistMenu(menu[j].children,deepExist[i].children)
                    }
                    index++
                }
            }
    }
    return arr
  }
  

export function jsonFamart(bakmenu,_import,Layout,reportCenterUrl){
    let menutemp=[];
    bakmenu.forEach(item => {
        const subchildren = []
        if (item.children && item.children.length) {
          item.children.forEach(subitem => {
            subchildren.push({
              path: subitem.path,
              component: subitem.component ? _import(subitem.component) : null,
              name: subitem.code,
              meta: isJSON(item.meta)&&JSON.parse(subitem.meta),
              outLinkUrl: subitem.outLinkUrl ? reportCenterUrl(subitem.outLinkUrl) : '',
              hidden: subitem.hidden === 'true'
            })
          })
        }
        menutemp.push({
          path: item.path,
          component: item.component === 'Layout' ? Layout : null,
          redirect: item.redirect,
          name: item.code,
          outLinkUrl: item.outLinkUrl ? reportCenterUrl(item.outLinkUrl) : '',
          hidden: item.hidden === 'true',
          alwaysShow: item.alwaysShow,
          meta: isJSON(item.meta)&&JSON.parse(item.meta),
          children: subchildren
        })
      })
      return menutemp
}


export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}
