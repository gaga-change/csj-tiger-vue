### 一、知识参考

1. [vue.js](https://cn.vuejs.org/)

2. [ECMAScript 6 入门](http://es6.ruanyifeng.com/)

3. [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

4. [element-ui](http://element-cn.eleme.io/#/zh-CN)

5. [Lodash 中文文档 ](https://www.css88.com/doc/lodash/)

6. [webpack概述 ](https://webpack.css88.com/)

--------------------------------------------

### 二、代码拉取以及启动方式


####  拉取


http方式:

```
git clone http://lis530@192.168.1.226/deliverGroup/csj-shark-vue.git

```

ssh方式:

```
git clone git@192.168.1.226:deliverGroup/csj-shark-vue.git

```

####  启动方式

```
npm run start

```

####  打包方式



测试环境:

```
npm run build-test

```


正式环境:

```
npm run build

```

--------------------------------------------

### 三、目录结构

> 参考[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

--------------------------------------------

### 四、组价介绍

####  ItemTitle(模块标题组件)
> 模块的标题,突出该模块


使用方式


```
 <item-title text="基本信息"/>
 
```


属性介绍

| 属性  | 描述  |  类型 | 默认值 | 是否必填  |
| --- | --- |  --- | --- | --- | 
| text | 标题名称    |  String  | -  |  是  |
| boxStyle | 标题盒子的样式    |  String  | width:100%  |  否  |

------------------------------------------------------

####  ItemCard(详情页基本信息卡片组件)
> 详情页基本信息卡片

使用方式


```
 <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />
 
```

属性介绍

| 属性  | 描述  |  类型 | 默认值 | 是否必填  |
| --- | --- |  --- | --- | --- | 
| config | 配置属性   |  Array  | -  |  是  |
| cardData | 数据源   |  Object  | {}  |  是  |
| loading | loading   |  Boolean  | false  |  否  |
| boxStyle | 外层盒子的样式   |  String  | marginBottom:12px  |  否  |
| bodyStyle | 卡片的样式   |  String  | padding:12px  |  否  |



config配置项参数介绍

```
[
  {
      title:'',
      prop:'',
      type:'',
      useApi:'',
      useLocalEnum:'',
      userFormatter:'',
      format:'',
  }
]

```

| 属性  | 描述  |  类型 |
| --- | --- |  --- | --- | 
| title | 标题   |  String  | 
| prop | 索引key   |  String  | 
| type | 类型:time,boolean,toFixed,其他本地定义的api方法名或枚举名(结合useLocalEnum,useApi),可以很方便的进行数据的格式化和类型转换  |  String  | 
| format | type为time时的时间展示格式(默认:YYYY-MM-DD)  |  String  |
| useApi | 是否使用本地api枚举,使用时只需将useApi设置为true,同时给type传递一个api枚举的方法名即可  |  Boolean  | 
| useLocalEnum | 是否使用本地前端定义的枚举,使用时只需将useLocalEnum设置为true,同时给type传递一个枚举的方法名即可  |  Boolean  | 
| userFormatter | 格式化函数  |  function  | 
| uesStringify | 文本插件```{ title:'入参',prop:'paramData',span:24,uesStringify:true,rows:4},``` |  Boolean  | 
| useIf | 可以实现诸如 files、link、linkDom的渲染 |  String  | 


useIf配置项参数介绍

| 属性  | 描述  |
| --- | --- |  --- | --- | 
| files | 数据源是一个数组 [{path:'',name:''}]  |    | 
| link | 结合linkTo、query使用 ```useIf:'link',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]```    |
| linkDom |结合linkTo、query、linkText使用```useIf:'linkDom',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'signNo'}],linkText:'查看入库详情' ```  |  


------------------------------------------------------

####  UploadMode(文件上传组件组件)

> 上传附件组件

使用方式


```
  <upload-mode
    @fileListChange="fileListChange" 
    :defailFileList="[]" >
  </upload-mode>
 
```

属性介绍

| 属性  | 描述  |  类型 | 默认值 | 是否必填  |
| --- | --- |  --- | --- | --- | 
| defailFileList | 默认已上传的列表数组 [{  name: '', url: ''}]   注:name:文件名,url：绝对路径 |  Array  | -  |  否  |
| filesuploadUrl | 文件上传的地址    |  String  | /webApi/fileupload/common/filetoserver |  否  |


方法介绍

| 方法  | 描述  |  返回值 |
| --- | --- |  --- | 
| fileListChange | 上传成功和移除文件的回调   | 上传成功的文件列表 |


### table组件

#### 1. BaseTable(后端分页table组件)

> 后端分页组件,支持后端分页，,多用于主页table

使用方式

```
   <template>
     <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="listIndexConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>
   </template>
   
   <script>
     import BaseTable from '@/components/Table'
     export default {
       components: { BaseTable},    
     }
   </script>
 
```


#### 2. WebPaginationTable(前端分页table组件)
> 前端分页组件,多用于详情页table

使用方式
```
   <template>
    <web-pagination-table 
    :loading="loading"
    :config="detailAbnormalReceipt" 
    :allTableData="detailAbnormalReceiptData"/>
   </template>
   
   <script>
   import WebPaginationTable from '@/components/Table/webPaginationTable'
     export default {
       components: { WebPaginationTable},    
     }
   </script>
 
```


#### 3. EditTable(可编辑table组件,仅支持前端分页)
> 参考出库技术>手工出库页面

使用方式
```
   <template>
      <edit-table 
        :loading="loading"
        :config="tableConfig" 
        :allTableData="tableData"
        @goeditrow="goeditrow"
        @handleDelete="handleDelete"/>
   </template>
   
   <script>
    import editTable from '@/components/Table/editTable'
     export default {
       components: { EditTable},    
     }
   </script>
 
```

#### 4.  NestingTable(多功能嵌套table组件,仅支持前端分页)
> 参考供应商直发登记页面

使用方式
```
   <template>
      <nesting-table 
        :loading="loading"
        :useEdit="true"
        :useDelet="false"
        :useEditExpand="true"
        :defaultExpandAll="true"
        childTableDataKey="billDetailList"
        editText="登记收货量"
        :config="addTableConfig" 
        :childConfig="addChildTableConfig"
        :allTableData="tableData"
        @goeditrow="goeditrow"/>
   </template>
   
   <script>
    import NestingTable from '@/components/Table/nestingTable'
     export default {
       components: { NestingTable},    
     }
   </script>
 
```

属性介绍

| 属性  | 描述  |  类型 | 默认值 | 是否必填  |
| --- | --- |  --- | --- | --- | 
| loading | loading  |  Boolean  | false  |  否  |
| elementLoadingText | loading提示文字  |  String  | 加载中  |  否  |
| elementLoadingBackground | loading背景颜色  |  String  | rgba(255, 255, 255, 0.5)  |  否  |
| highlightCurrentRow | 是否要高亮当前行  可以用此做单选    |  Boolean  | false |  否  |
| config | 配置属性   |  Array  | -  |  是  |
| tableData |后端分页数据源(后端分页参数)    |  Array  | -|  是  |
| allTableData | 前端分页数据源(前端分页参数)    |  Array  | -|  是  |
| usePagination | 是否使用前端分页 (前端分页参数)    |  Boolean  | false |  否  |
| total | 数据的总长度 |  Number  | 0 |  是  |
| currentPage | 当前页码 (后端分页参数)   |  Number  | 1  |  否  |
| pageSize | 每页显示的条数 (后端分页参数)  |  Number  | 10  |  否  |
| pageSizes | 分页规格数组   |  Array  | [10, 50, 100, 500]  |  否  |
| maxTotal | 只有表格的数据条数大于这个值的时候才显示分页 |  Number  | 10  |  否  |
| layout | 布局组件 参考element-ui   |  String  | total, sizes, prev, pager, next, jumper  |  否  |
| border | 是否展示纵向边框 |  Boolean  | true  |  否  |
| tableStyle | 表格的样式 |  String  | width: 100%  |  否  |
| paginationStyle | 分页器的样式 |  String  | marginTop:16px  |  否  |

config配置项参数介绍

```
[
  {
      lable:'',
      prop:'',
      minWidth:'',
      fixed:'',
      width:'',
      type:'',
      useApi:'',
      useLocalEnum:'',
      format:'',
      dom:'',
      linkTo:'',
      query：[],
      linkText:'',
  }
]

```

| 属性  | 描述  |  类型 |
| --- | --- |  --- | --- | 
| lable | 表头   |  String  | 
| prop | 索引key   |  String  | 
| type | 类型:time,Boolean,toFixed,index,files其他本地定义的api方法名或枚举名(结合useLocalEnum,useApi),可以很方便的进行数据的格式化和类型转换,对应列的类型 |  String  | 
| columnType | element的原生type   如果设置了 columnType:'selection' 则显示多选框   |  String  | 
| format | type为time时的时间展示格式(默认:YYYY-MM-DD)  |  String  | 
| useApi | 是否使用本地api枚举,使用时只需将useApi设置为true,同时给type传递一个api枚举的方法名即可  |  Boolean  | 
| useLocalEnum | 是否使用本地前端定义的枚举,使用时只需将useLocalEnum设置为true,同时给type传递一个枚举的方法名即可  |  Boolean  | 
| minWidth | 单元格最小宽度  |  Number或者String  | 
| width | 单元格宽度  |  Number或者String  |
| fixed | 是否固定表头  |  Boolean或者String('left'、'right')  |
| dom | dom传递  |  function类型:``` (row, column, cellValue, index)=>return <div>{cellValue}</div> ``` |
| linkTo | 跳转的路径,该属性需要结合query  |  String  |
| query | 页面跳转时query上的属性以及所使用的索引 ```query:[{key:'warehouseExeCode',value:'warehouseExeCode'}] ``` |  Array  |
| linkText | link随时用的文案（不穿时直接为单元格值） |  String  |


方法介绍

| 方法  | 描述  |  返回值 |
| --- | --- |  --- | 
| sizeChange | pageSize变化后的回调 (后端分页回调)   | pageSize：当前每页展示多少条 |
| currentChange | 页码变化后的回调 (后端分页回调)   | currentPage: 当前页码 |
| currentRedioChange | 点击某一行 (后端分页回调),可以用此做单选  同时将highlightCurrentRow设置为true 选中时高亮   | currentRow:当前该行数据, oldCurrentRow:上一行数据 |
| SelectionChange | 多选选中后的回调 (前端分页回调)   | val：选中的行数组成的数组 |


