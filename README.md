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
      userFormatter:'',
      useLocalEnum:'',
      format:'',
  }
]

```

| 属性  | 描述  |  类型 |
| --- | --- |  --- | --- | 
| title | 标题   |  String  | 




####  UploadMode(文件上传组件组件)

####  BaseTable(后端分页table组件)

####  WebPaginationTable(前端分页table组件)

####  EditTable(可编辑table组件,仅支持前端分页)

####  NestingTable(多功能嵌套table组件,仅支持前端分页)


