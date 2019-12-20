<template lang="html">
  <div  class="freightcount" style="width:1200px;margin:60px auto;">
    <div style="padding:30px;background:#eee;">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="原寄地:"  prop="startPlace"  :rules="[{ required: true, message: '该项为必填'}]" >
            <div @click="showarea('start',$event)" style="width:280px;">
              <el-input v-model="searchForm.startPlaceName" size="mini" style="width:100% !important;" :disabled="true"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="目的地:"  prop="endPlace"  :rules="[{ required: true, message: '该项为必填'}]" >
            <div @click="showarea('end',$event)" style="width:280px;">
              <el-input v-model="searchForm.endPlaceName" size="mini" style="width:100% !important;" :disabled="true"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量:"  prop="weight"  :rules="[{ required: true, message: '该项为必填',pattern:/^[\.\d]*$/,trigger: ['blur']}]" >
            <el-input v-model="searchForm.weight" size="mini" class="formitem" style="width:100%;" @blur="typeCount">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积:"  prop="volume" :rules="[{ required: false, message: '必须为数字',pattern:/^[\.\d]*$/,trigger: ['blur']}]">
           <el-input v-model="searchForm.volume" size="mini" class="formitem" style="width:100%;" @blur="typeCount">
             <template slot="append">m³</template>
           </el-input>
          </el-form-item>
        </el-col> 
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <div style="margin-top:30px;color:#606266;">
            <span v-if="searchForm.ruleType==0">重货</span>
            <span v-if="searchForm.ruleType==1">抛货</span>
          </div>
        </el-col>       
    </el-row>
    <el-row style="margin-top:15px;">
      <el-button type="primary" size="large" @click="submit">估算费用</el-button>
    </el-row>
    </el-form>
    <div class="areadiv" id="areadiv" v-show="areaVisible">
      <div class="title">
        <span class="titleactive" style="display:inline-block;width:90px;text-align:center;line-height:38px;border:1px solid #ccc;margin:0;">大陆</span>
        <span style="display:inline-block;width:90px;text-align:center;line-height:38px;line-height:38px;border:1px solid #ccc;margin:0;">港澳台</span>
      </div>
        <el-tabs v-model="activeName">
          <el-tab-pane  name="proviceName" label="省份">
            <div style="height:200px;overflow-y:scroll;">
              <template v-for="item in provinceData">
                <div style="margin-bottom:5px;" class="clearfix">
                  <p class="pinyin" v-if="item.pinyin">{{item.pinyin}}</p>
                  <div style="float:left;padding-top:12px;margin-left:5px;width:360px;">
                    <el-row>
                      <template v-for="subitem in item.provinceList">
                        <el-col :span="6">
                          <span class="provincename" @click="nextStep('province',subitem)">{{subitem.label}}</span>
                        </el-col>
                      </template>
                    </el-row>
                  </div>
                </div>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane name="cityName" label="城市">
            <div style="height:200px;overflow-y:scroll;">
                <div class="clearfix" style="width:360px;">
                  <template v-for="item in cityData">
                    <span class="provincename cityname" @click="nextStep('city',item)">{{item.label}}</span>
                  </template>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="areaName" label="区县">
            <div style="height:200px;overflow-y:scroll;">
              <div class="clearfix" style="width:360px;">
                <template v-for="item in areaInfoData">
                  <span class="provincename cityname" @click="nextStep('area',item)">{{item.label}}</span>
                </template>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    </div>
    <div v-if="showElement" style="margin-top:20px;">
      <template v-if="showData && showData.length>0">
        <ul>
          <li v-for="item in showData">
            <h2>方案一:{{item.carrierName}}</h2>
            <div>
              <span>{{searchForm.ruleType==0?'重货:':'抛货:'}}</span>
              <template v-if="item.rulesList && item.rulesList" v-for="subitem in item.rulesList">
                <template v-if="subitem.startWeight>=0 && subitem.endWeight">
                  <span>
                    <span>{{subitem.startWeight+'~'+subitem.endWeight+(searchForm.ruleType==0?'公斤':'m³')}}</span>
                    <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(searchForm.ruleType==0?'公斤；':'m³；')):subitem.price+'元；'}}</span>
                  </span>
                </template>
                <template v-else-if="subitem.startWeight>=0 && !subitem.endWeight">
                  <span>
                    <span>{{subitem.startWeight+(searchForm.ruleType==0?'公斤':'m³')+'以上'}}</span>
                    <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(searchForm.ruleType==0?'公斤；':'m³；')):subitem.price+'元；'}}</span>
                  </span>
                </template>
                <template v-else-if="!subitem.startWeight && subitem.endWeight">
                  <span>
                      <span>{{subitem.endWeight+(searchForm.ruleType==0?'公斤':'m³')+'以内'}}</span>
                      <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(searchForm.ruleType==0?'公斤；':'m³；')):subitem.price+'元；'}}</span>
                    </span>
                </template>
              </template>
              <span>{{(item.lowPrice==0 || item.lowPrice)?('最低一票'+item.lowPrice+'元'):''}}</span>
           </div>
            <div class="price">预估价格:{{item.budgetPrice}}元</div>
          </li>
        </ul>
      </template>
      <template v-else>
        <span>暂无报价</span>
      </template>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { costCount } from '@/api/freight'
import BaseTable from '@/components/Table'
import { Area } from '@/utils/area2'
export default {
  name: 'newQuation',
  components: { Sticky },
  data() {
    return {
      searchForm: {
        startPlace:null,
        startPlaceName:null,
        endPlace:null,
        endPlaceName:null,
        weight:null,
        volume:null,
        ruleType:0
      },
      provinceData:[
        {pinyinArea:['a','b','c','d','e','f'],pinyin:'A-F',provinceList:[]},
        {pinyinArea:['g'],pinyin:'G-G',provinceList:[]},
        {pinyinArea:['h','i'],pinyin:'H-I',provinceList:[]},
        {pinyinArea:['j','k','l','m','n','o','p','q','r'],pinyin:'J-R',provinceList:[]},
        {pinyinArea:['s','t','u','v','w'],pinyin:'S-W',provinceList:[]},
        {pinyinArea:['x','y','z'],pinyin:'x-z',provinceList:[]},
      ],
      otherProvince:[],
      cityData:[],
      areaInfoData:[],
      activeName:'proviceName',
      startPlace:[],
      startPlaceName:[],
      endPlace:[],
      endPlaceName:[],
      areaType:null,
      areaVisible:false,
      showData:[],
      showElement:false
    }
  },

  computed: {
  },
  created(){
    let areaData=[]
    Area.forEach(item => {
      if(item.pinyin){
        areaData.push(item)
      }else{
        this.otherProvince.push(item)
      }
    })
    areaData.forEach(item=>{
      this.provinceData.map(subitem=>{
        if(subitem.pinyinArea.indexOf(item.pinyin.substring(0,1))>-1){
          subitem.provinceList.push(item)
          return
        }
      })
    })
  },
  mounted() {
    
  },
  methods: {
    showarea(type,event,element) {
      this.areaType=type
      console.log(event.target.offsetTop)
      let menu = document.getElementById("areadiv")
      menu.style.left = event.clientX-60 + "px"
      menu.style.top = event.clientY+10 + "px"
      this.areaVisible =true
    },
    nextStep(type,value){
      if(type=='province'){
        if(this.areaType=='start'){
          this.startPlace=[]
          this.startPlaceName=[]
          this.startPlace.push(value.value)
          this.startPlaceName.push(value.label)
        }else if(this.areaType=='end'){
          this.endPlace=[]
          this.endPlaceName=[]
          this.endPlace.push(value.value)
          this.endPlaceName.push(value.label)
        }
        this.cityData=[]
        this.areaInfoData=[]
        this.cityData=value.children
        this.activeName='cityName'
      }else if(type=='city'){
        if(this.areaType=='start'){
          if(this.startPlace.length>=2){
            this.startPlace.splice(1,this.startPlace.length-1)
            this.startPlaceName.splice(1,this.startPlaceName.length-1)
          }
          this.startPlace.push(value.value)
          this.startPlaceName.push(value.label)
        }else if(this.areaType=='end'){
          if(this.endPlace.length>=2){
            this.endPlace.splice(1,this.endPlace.length-1)
            this.endPlaceName.splice(1,this.endPlaceName.length-1)
          }
          this.endPlace.push(value.value)
          this.endPlaceName.push(value.label)
        }
        this.areaInfoData=[]
        this.areaInfoData=value.children
        this.activeName='areaName'
      }else if(type=='area'){
        if(this.areaType=='start'){
          if(this.startPlace.length>=3){
            this.startPlace.splice(2,1)
            this.startPlaceName.splice(2,1)
          }
          this.startPlace.push(value.value)
          this.startPlaceName.push(value.label)
          this.searchForm.startPlace=this.startPlace.join('_')
          this.searchForm.startPlaceName=this.startPlaceName.join('_')
        }else if(this.areaType=='end'){
          if(this.endPlace.length>=3){
            this.endPlace.splice(2,1)
            this.endPlaceName.splice(2,1)
          }
          this.endPlace.push(value.value)
          this.endPlaceName.push(value.label)
          this.searchForm.endPlace=this.endPlace.join('_')
          this.searchForm.endPlaceName=this.endPlaceName.join('_')
        }
        this.areaVisible=false
        this.activeName='proviceName'
        this.cityData=[]
        this.areaInfoData=[]
      }
    },
    submit() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let api = costCount
          api(this.searchForm).then(res => {
            if (res.success) {
              this.showElement=true
              this.showData=res.data
            } else {
              this.$message.error('操作失败')
            }
          }).catch(err => {
            this.$message.error('操作失败')
          })
        }
      })
    },
    typeCount(){
      if(this.searchForm.weight && this.searchForm.volume){
        if(this.searchForm.volume/0.6>this.searchForm.weight){
          this.searchForm.ruleType=0
        }else{
          this.searchForm.ruleType=1
        }
      }else{
        this.searchForm.ruleType=0
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
}

.providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
.titleactive{
  background:#003c8d;
  color:#fff;
}
.pinyin{
  background:#ffe100;
  color:#003c8d;
  float:left;
  width:60px;
  text-align:center;
  line-height:36px;
}
.provincename{
  float:left;
  width:80px;
  height:30px;
  max-height:38px;
  padding:0 10px;
  margin-top:10px;
  cursor:pointer;
  font-size:15px;
  &.cityname{
    display:block;
    width:90px;
    float:left;
    margin-bottom:20px;
  }
}
.areadiv{
  width:500px;
  padding:20px;
  background:#fff;
  border:1px solid #666;
  height:320px;
  overflow:hidden;
  position:fixed;
  top:50px;
  left:500px;
  z-index:1000;
}
.freightcount{
  ul{
    padding-left:0;
    margin-top:50px;
  }
  li{
    list-style:none;
    border-bottom:1px dashed #666;
    padding-bottom:20px;
    .price{
      margin-top:10px;
    }
    h2{
      font-weight:normal;
      line-height:22px;
    }
  }
}
</style>
