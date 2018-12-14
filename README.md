### 一、知识参考

1. [vue.js](https://cn.vuejs.org/)

2. [ECMAScript 6 入门](http://es6.ruanyifeng.com/)

3. [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

4. [element-ui](http://element-cn.eleme.io/#/zh-CN)

5. [Lodash 中文文档 ](https://www.css88.com/doc/lodash/)

6. [webpack概述 ](https://webpack.css88.com/)

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

### 三、目录结构

> 参考[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

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
| useApi | 是否使用本地api枚举,使用时只需将useApi设置为true,同时给type传递一个api枚举的方法名即可  |  Boolean  | 
| useLocalEnum | 是否使用本地前端定义的枚举,使用时只需将useLocalEnum设置为true,同时给type传递一个枚举的方法名即可  |  Boolean  | 
| userFormatter | 格式化函数  |  function  | 
| format | type为time时的时间展示格式(默认:YYYY-MM-DD)  |  String  | 

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
| defailFileList | 默认已上传的列表数组 [ {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]    |  Array  | -  |  否  |
| filesuploadUrl | 文件上传的地址    |  String  | /webApi/fileupload/common/filetoserver |  否  |



####  BaseTable(后端分页table组件)

####  WebPaginationTable(前端分页table组件)

####  EditTable(可编辑table组件,仅支持前端分页)

####  NestingTable(多功能嵌套table组件,仅支持前端分页)


