<template lang="html">
  <div  class="freightcount" style="width:1200px;margin:60px auto;">
    <div style="padding:30px;background:#eee;">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="原寄地"  prop="startPlace"  :rules="[{ required: true, message: '该项为必填'}]" >
            <div @click="showarea('start',$event)" style="width:280px;">
              <el-input v-model="searchForm.startPlaceName" size="mini" style="width:100% !important;" :disabled="true" id="startele"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="目的地"  prop="endPlace"  :rules="[{ required: true, message: '该项为必填'}]" >
            <div @click="showarea('end',$event)" style="width:280px;">
              <el-input v-model="searchForm.endPlaceName" size="mini" style="width:100% !important;" :disabled="true" id="endele"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="重量"  prop="weight"  :rules="[{ required: true, message: '该项为必填',pattern:/^[\.\d]*$/,trigger: ['blur']}]" >
            <el-input v-model="searchForm.weight" size="mini" class="formitem" style="width:100%;">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="体积"  prop="volume" :rules="[{ required: false, message: '必须为数字',pattern:/^[\.\d]*$/,trigger: ['blur']}]">
           <el-input v-model="searchForm.volume" size="mini" class="formitem" style="width:100%;">
             <template slot="append">m³</template>
           </el-input>
          </el-form-item>
        </el-col> 
         <el-col :span="24">
          <el-form-item label="寄件时间"  prop="time"  :rules="[{ required: true, message: '该项为必填',trigger: ['blur']}]" >
            <el-date-picker
              style="width:280px;"
              v-model="searchForm.time"
              type="datetime"
              placeholder="请选择寄件时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <div style="margin-top:30px;color:#606266;">
            <span v-if="searchForm.ruleType==0">重货</span>
            <span v-if="searchForm.ruleType==1">抛货</span>
          </div>
        </el-col>        -->
    </el-row>
    <el-row style="margin-top:15px;">
      <el-button type="primary" size="large" @click="submit">估算费用</el-button>
    </el-row>
    </el-form>
    <div class="areadiv" id="areadiv" v-show="areaVisible">
      <div class="title">
        <span :class="areaPath==1?'titleactive':''" style="display:inline-block;width:90px;text-align:center;line-height:38px;border:1px solid #ccc;margin:0;cursor:pointer;" @click="changeProvince('1')">大陆</span>
        <span :class="areaPath==2?'titleactive':''" style="display:inline-block;width:90px;text-align:center;line-height:38px;line-height:38px;border:1px solid #ccc;margin:0;cursor:pointer;" @click="changeProvince('2')">港澳台</span>
      </div>
        <el-tabs v-model="activeName" :before-leave="tableave" @tab-click="tabclick">
          <el-tab-pane  name="proviceName" label="省份">
            <div style="height:200px;overflow-y:scroll;">
              <template v-if="areaPath==1">
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
              </template>
              <template v-else-if="areaPath==2">
                <el-row>
                  <template v-for="item in provinceData">
                    <el-col :span="6">
                      <span class="provincename" @click="nextStep('province',item)">{{item.label}}</span>
                    </el-col>
                  </template>
                </el-row>
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
          <li v-for="(item,index) in showData">
            <h2>{{'方案'+(index+1)+':'+item.carrierName}}</h2>
            <template v-if="item.rulesInfo && item.rulesInfo.length>0" v-for="childitem in item.rulesInfo">
              <div>
                <span>{{childitem.type==1?'重货:':'抛货:'}}</span>
                <template v-if="childitem.ruleList && childitem.ruleList" v-for="subitem in childitem.ruleList">
                  <template v-if="subitem.startWeight>=0 && subitem.endWeight">
                    <span>
                      <span>{{subitem.startWeight+'~'+subitem.endWeight+(childitem.type==1?'公斤':'m³')}}</span>
                      <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(childitem.type==1?'公斤；':'m³；')):'一口价'+subitem.price+'元 ；'}}</span>
                    </span>
                  </template>
                  <template v-else-if="subitem.startWeight>=0 && !subitem.endWeight">
                    <span>
                      <span>{{subitem.startWeight+(childitem.type==1?'公斤':'m³')+'以上'}}</span>
                      <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(childitem.type==1?'公斤；':'m³；')):'一口价'+subitem.price+'元 ；'}}</span>
                    </span>
                  </template>
                  <template v-else-if="!subitem.startWeight && subitem.endWeight">
                    <span>
                        <span>{{subitem.endWeight+(childitem.type==1?'公斤':'m³')+'以内'}}</span>
                        <span>{{subitem.unitPrice?(subitem.unitPrice+'元/'+(childitem.type==1?'公斤；':'m³；')):'一口价'+subitem.price+'元；'}}</span>
                      </span>
                  </template>
                </template>
                <span>{{(childitem.lowPrice && childitem.lowPrice>=0)?('最低一票'+childitem.lowPrice+'元'):''}}</span>
             </div>
            </template>
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
        ruleType:null,
        time:null
      },
      mainLandData:[
        {pinyinArea:['a','b','c','d','e','f'],pinyin:'A-F',provinceList:[]},
        {pinyinArea:['g'],pinyin:'G-G',provinceList:[]},
        {pinyinArea:['h','i'],pinyin:'H-I',provinceList:[]},
        {pinyinArea:['j','k','l','m','n','o','p','q','r'],pinyin:'J-R',provinceList:[]},
        {pinyinArea:['s','t','u','v','w'],pinyin:'S-W',provinceList:[]},
        {pinyinArea:['x','y','z'],pinyin:'x-z',provinceList:[]},
      ],
      provinceData:[],
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
      showElement:false,
      areaPath:1,
      ishide:false
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
      this.mainLandData.map(subitem=>{
        if(subitem.pinyinArea.indexOf(item.pinyin.substring(0,1))>-1){
          subitem.provinceList.push(item)
          return
        }
      })
    })
    this.provinceData=JSON.parse(JSON.stringify(this.mainLandData))
  },
  mounted() {
    
  },
  methods: {
    changeProvince(value){
      this.areaPath=value
      if(this.areaPath==1){
        this.provinceData=JSON.parse(JSON.stringify(this.mainLandData))
      }else{
        this.provinceData=JSON.parse(JSON.stringify(this.otherProvince))
      }
    },
    showarea(type,event,element) {
      this.ishide=false
      this.areaType=type
      let menu = document.getElementById("areadiv")
      menu.style.left = event.clientX-60 + "px"
      menu.style.top = event.clientY+10 + "px"
      let body = document.querySelector('body')
      this.areaVisible =true
      window.addEventListener('click',(e)=>{
        this.showevent(e,menu)
      },false)
      this.areaPath=1
      this.provinceData=[]
      this.provinceData=JSON.parse(JSON.stringify(this.mainLandData))
      this.activeName='proviceName'
      this.cityData=[]
      this.areaInfoData=[]
      if(this.areaType=='start'){
        this.startPlace=[]
        this.startPlaceName=[]
      }else if(this.areaType=='end'){
        this.endPlace=[]
        this.endPlaceName=[]
      }
    },
    showevent(e,menu){
      let showIdData=['startele','endele','areadiv']
      if(showIdData.indexOf(e.target.id)>-1 || (menu.contains(e.target) && !this.ishide)){
        this.areaVisible=true
      }else{
        this.areaVisible=false
      }
    },
    nextStep(type,value){
      if(this.areaPath==1){
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
          this.ishide=false
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
          this.ishide=false
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
          this.ishide=true
          this.areaVisible=false
          this.activeName='proviceName'
          this.cityData=[]
          this.areaInfoData=[]
        }
      }else if(this.areaPath==2){
        if(type=='province'){
          if(this.areaType=='start'){
            this.startPlace=[]
            this.startPlaceName=[]
            this.startPlace.push(value.value)
            this.startPlaceName.push(value.label)
            this.searchForm.startPlace=this.startPlace.join('_')
            this.searchForm.startPlaceName=this.startPlaceName.join('_')
          }else if(this.areaType=='end'){
            this.endPlace=[]
            this.endPlaceName=[]
            this.endPlace.push(value.value)
            this.endPlaceName.push(value.label)
            this.searchForm.endPlace=this.endPlace.join('_')
            this.searchForm.endPlaceName=this.endPlaceName.join('_')
          }
          this.ishide=true
          this.areaVisible=false
          this.activeName='proviceName'
          this.cityData=[]
          this.areaInfoData=[]
        }
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
              if(this.showData && this.showData.length>0){
                this.showData.map(item=>{
                  let rulesListData=[]
                  if(item.heavyRulesList && item.heavyRulesList.length>0){
                    rulesListData.push({
                      type:1,
                      ruleList:item.heavyRulesList,
                      lowPrice:item.heavyLowPrice
                    })
                  }
                  if(item.lightRulesList && item.lightRulesList.length>0){
                    rulesListData.push({
                      type:2,
                      ruleList:item.lightRulesList,
                      lowPrice:item.lightLowPrice
                    })
                  }
                  item.rulesInfo=rulesListData
                })
              }
            } else {
              this.$message.error('操作失败')
            }
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
    },
    tableave(activeName, oldActiveName){
      if(oldActiveName==='proviceName'){
        if(this.areaType=='start'){
          if(this.startPlace.length<=0){
            return false
          }
        }else if(this.areaType=='end'){
          if(this.endPlace.length<=0){
            return false
          }
        }
      }else if(oldActiveName==='cityName' && activeName==='areaName' ){
        if(this.areaType=='start'){
          if(this.startPlace.length<=1){
            return false
          }
        }else if(this.areaType=='end'){
          if(this.endPlace.length<=1){
            return false
          }
        }
      }
    },
    tabclick(tab, event){
      if(tab.name=='proviceName'){
        if(this.areaType=='start'){
          this.startPlace=[]
          this.startPlaceName=[]
        }else if(this.areaType=='end'){
          this.endPlace=[]
          this.endPlaceName=[]
        }
        this.cityData=[]
        this.areaInfoData=[]
      }else if(tab.name=='cityName'){
        if(this.areaType=='start'){
          if(this.startPlace.length>=2){
            this.startPlace.splice(1,this.startPlace.length-1)
            this.startPlaceName.splice(1,this.startPlaceName.length-1)
          }
        }else if(this.areaType=='end'){
          if(this.endPlace.length>=2){
            this.endPlace.splice(1,this.endPlace.length-1)
            this.endPlaceName.splice(1,this.endPlaceName.length-1)
          }
        }
        this.areaInfoData=[]
      }
    },
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
