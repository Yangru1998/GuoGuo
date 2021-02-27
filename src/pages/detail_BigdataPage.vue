<template>
    <div id="detail_Bigdata">
      <van-nav-bar
        left-text="数据详情"
        style="background-color: #f5f5f5;text-align: left;"
        left-arrow
        @click-left="onClickLeft"
      />
      <!--选项卡 *** 开始-->
      <van-tabs @change="onClick_tab" v-model="active" color="#F36038" title-active-color="#F46038" line-height="2px" line-width="20%" background="#F5F5F5">
        <van-tab v-for="(item,key) in titleList" :title="item" :key="key">
          <!--选项卡部分 *** 开始-->
          <div slot="title">
            <img v-if="tabIndex != key" style="width: 29px;height: 30px;margin-top: 4px;" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/43.png"/>
            <img v-else style="width: 29px;height: 30px;margin-top: 4px;" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/42.png"/>
            <div>{{item}}</div>
          </div>
          <!--选项卡部分 *** 结束-->
        </van-tab>
      </van-tabs>

      <!--全场胜平负 *** 开始-->
      <div v-if="tabIndex == 0" class="tabContent" :style="{height:(windowHeight-46-68-180)+'px'}">
        <div class="tabC_title">{{detail.home}} VS {{detail.guest}}</div>
        <div  :style="{height:(windowHeight-46-68-180-60-20)+'px'}" style="width: 98%;display: flex;justify-content: space-between;margin: 10px auto;">
          <div class="tabC_leftIcon">
            <img v-if="tabIndex == 0" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/44.png"/>
            <img  @click="lastTab" v-if="tabIndex == 1 || tabIndex == 2" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/46.png"/>
          </div>
          <!--圆饼图-->
          <div class="tabC_middle">
            <!--<fm-charts id="redux_main_0" :options="options_1" />-->
            <div id="redux_main_0"  :style="{height:(windowHeight-46-68-180-60-20)+'px'}"></div>
          </div>

          <div class="tabC_rightIcon">
            <img  @click="nextTab" v-if="tabIndex != 3" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/45.png"/>
          </div>
        </div>
      </div>

      <div v-if="tabIndex == 1" class="tabContent" :style="{height:(windowHeight-46-68-180)+'px'}">
        <div class="tabC_title">{{detail.home}} VS {{detail.guest}}</div>
        <div  :style="{height:(windowHeight-46-68-180-60-20)+'px'}" style="width: 98%;display: flex;justify-content: space-between;margin: 10px auto;">
          <div class="tabC_leftIcon">
            <img v-if="tabIndex == 0" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/44.png"/>
            <img  @click="lastTab" v-if="tabIndex == 1 || tabIndex == 2" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/46.png"/>
          </div>
          <!--圆饼图-->
          <div class="tabC_middle">
            <div id="redux_main_1"  :style="{height:(windowHeight-46-68-180-60-20)+'px'}"></div>
          </div>

          <div class="tabC_rightIcon">
            <img  @click="nextTab" v-if="tabIndex != 3" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/45.png"/>
          </div>
        </div>
      </div>

      <div v-if="tabIndex == 2" class="tabContent" :style="{height:(windowHeight-46-68-180)+'px'}">
        <div class="tabC_title">{{detail.home}} VS {{detail.guest}}</div>
        <div  :style="{height:(windowHeight-46-68-180-60-20)+'px'}" style="width: 98%;display: flex;justify-content: space-between;margin: 10px auto;">
          <div class="tabC_leftIcon">
            <img v-if="tabIndex == 0" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/44.png"/>
            <img  @click="lastTab" v-if="tabIndex == 1 || tabIndex == 2" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/46.png"/>
          </div>
          <!--圆饼图-->
          <div class="tabC_middle">
            <div id="redux_main_2"  :style="{height:(windowHeight-46-68-180-60-20)+'px'}"></div>
          </div>

          <div class="tabC_rightIcon">
            <img  @click="nextTab" v-if="tabIndex != 3" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/45.png"/>
          </div>
        </div>
      </div>

      <!--其他图例-->
      <div v-if="tabIndex == 3" class="tabContent" :style="{height:(windowHeight-46-68-240)+'px'}">
        <div v-if="detail.allGoal == 'true'" class="tabC_title">{{detail.home}} VS {{detail.guest}}</div>
        <div v-if="detail.allGoal == 'true'" :style="{height:(windowHeight-46-68-240-60-20)+'px'}" style="width: 98%;display: flex;justify-content: space-between;margin: 10px auto;">

          <div class="tabC_leftIcon">
            <img  @click="lastTab" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/46.png"/>
          </div>

          <!--圆柱图-->
          <div class="tabC_middle">
            <!--<div id="container" :style="{height:(windowHeight-46-68-240-60-20)+'px'}"></div>-->
            <!--<div ref="category_main"  :style="{height:(windowHeight-46-68-240-60-20)+'px'}"></div>-->
            <Highcharts :id="id" :style="{height:(windowHeight-46-68-240-60-20)+'px'}" :option="option1" ></Highcharts>
          </div>

          <div class="tabC_rightIcon">
            <img  v-if="tabIndex == 3" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/47.png"/>
          </div>
        </div>
      </div>
      <!--选项卡 *** 结束-->


      <!-- *** 底部列表部分 ***-->
      <div class="tabC_bottom" v-show="tabIndex == 0"  v-if="detail.allWinLose == 'true'">
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">主胜</span>
          <div>{{detail.allProbabilityHomeWin}}</div>
          <span>平均价位：{{detail.allPriceHomeWin}}</span>
        </div>
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">平局</span>
          <div>{{detail.allProbabilityDogfall}}</div>
          <span>平均价位：{{detail.allPriceDogfall}}</span>
        </div>
        <div class="tabC_Bitem" style="border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">客胜</span>
          <div>{{detail.allProbabilityGuestWin}}</div>
          <span>平均价位：{{detail.allPriceGuestWin}}</span>
        </div>
        <div class="tabC_Bitem_1">
          <div>匹配场次：{{detail.allSession}}场</div>
          <div>首选：{{detail.allFirstChoice}}</div>
          <div>次选：{{detail.allSecondChoice}}</div>
        </div>
      </div>

      <div class="tabC_bottom" v-show="tabIndex == 1"  v-if=" detail.halfWinLose == 'true'">
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;line-height: 50px;display: block;height: 50%;">主胜</span>
          <div>{{detail.halfProbabilityHomeWin}}</div>
        </div>
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;line-height: 50px;display: block;height: 50%;">平局</span>
          <div>{{detail.halfProbabilityDogfall}}</div>
        </div>
        <div class="tabC_Bitem" style="border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;line-height: 50px;display: block;height: 50%;">客胜</span>
          <div>{{detail.halfProbabilityGuestWin}}</div>
        </div>
        <div class="tabC_Bitem_1" style="vertical-align: middle;display: grid;">
          <div style="line-height: 40px">首选：{{detail.halfFirstChoice}}</div>
          <div style="line-height: 40px">次选：{{detail.halfSecondChoice}}</div>
        </div>
      </div>

      <div class="tabC_bottom" v-show="tabIndex == 2"  v-if="detail.letWinLose == 'true'">
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">主胜</span>
          <div>{{detail.letProbabilityHomeWin}}</div>
          <span>平均价位：{{detail.letPriceWin}}</span>
        </div>
        <div class="tabC_Bitem" style="border-bottom:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">平局</span>
          <div>{{detail.letProbabilityDogfall}}</div>
          <span>平均价位：{{detail.letPriceDogfall}}</span>
        </div>
        <div class="tabC_Bitem" style="border-right:1px solid #fff;">
          <span style="color:#7F7F7F;font-weight: 600;font-size:16px;">客胜</span>
          <div>{{detail.letProbabilityGuestWin}}</div>
          <span>平均价位：{{detail.letPriceLose}}</span>
        </div>
        <div class="tabC_Bitem_1" style="vertical-align: middle;display: grid;">
          <div style="line-height: 40px">首选：{{detail.letFirstChoice}}</div>
          <div style="line-height: 40px">次选：{{detail.letSecondChoice}}</div>
        </div>
      </div>

      <!--其他-->
      <div id="tabC_OtherBottom" v-show="tabIndex == 3">
        <div class="tabC_ob_item" v-if="detail.halfGoal == 'true'">
          <span></span>
          <div class="tabC_obiborder">
            <span>半场进球数</span>
            <div>
              <span>大于0.5球概率：{{detail.halfGoalBig}}</span>
              <span>小于0.5球概率：{{detail.halfGoalSmall}}</span>
            </div>
          </div>
        </div>
        <div class="tabC_ob_item" v-if="detail.allGoal == 'true'">
          <span></span>
          <div class="tabC_obiborder">
            <span>全场进球数</span>
            <div>
              <span>首选：{{detail.allGoalFirstChoice}} 概率：{{Q_1}}</span>
              <span>次选：{{detail.allGoalSecondChoice}} 概率：{{Q_2}}</span>
            </div>
          </div>
        </div>
        <div class="tabC_ob_item" v-if="detail.score == 'true'">
          <span></span>
          <div class="tabC_obiborder" @click="scoreEvent">
            <span>比分</span>
            <div>
              <span>首选：{{detail.scoreFirstChoice}}</span>
              <span>次选：{{detail.scoreSecondChoice}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  // var Highcharts = require('highcharts');
  // require('highcharts/modules/exporting')(Highcharts);
  import FmCharts from 'components/FmCharts'
  import Highcharts from 'components/Highcharts'
  // const echarts = require('echarts');
  // const echarts2 = require('echarts');
  // const echarts3 = require('echarts');

  export default {
    name: "detail_BigdataPage",
    data(){
        return{
          windowHeight:0, //屏幕高度

          tabIndex:0,
          active:0,
          itemTitle:'全场胜平负',
          titleList:['全场胜平负','半场胜平负','让球胜平负','其他'],
          detail:{},
          Q_1:'',
          Q_2:'',
          options_1: {},

          id:'container',
          option1:{
            renderTo: 'container',
            chart: {
              type: 'column',
              backgroundColor: 'rgba(0,0,0,0)',
              options3d: {
                enabled: true,
                alpha: 18,
                beta: 2,
                depth: 100,
                viewDistance:25
              },
              reflow:true,
              height:233,
              marginBottom: 50
            },
            title:{
              text:''
            },
            credits:{
              text:' '
            },
            legend: {//方框所在的位置(不知道怎么表达)  
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -10,
              y: 100,
              borderWidth: 0,
              enabled:true
            },
            showInLegend: true,
            plotOptions: {
              enable:true,
              column: {
                pointPadding:30,
                borderWidth: 0,
                borderRadius: 180,
                pointWidth: 18,
                animation: true,
                dataLabels: { //图上是否显示数据标签
                  enabled: true,
                  align: "center",
                  //color: 'red',
                  rotation: 270,
                  staggerLines: 0,
                  step: 0,
                  style: 0,
                  x: 0,
                  y: -6
                },
              }
            },
            xAxis: {
              gridLineWidth: 0,
              title: {
                text: null
              },
              categories: ['0球','1球','2球','3球','4球','5球','6球','7+球']
            },
            yAxis: {
              gridLineWidth: 0,
              title: {
                text: null
              },
              labels:{
                enabled: false,
              }
            },
            series: [{
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5],
              name: 'column',
              color:"#FE8C25",
              showInLegend: false
            }]
          },

        }
    },
    created() {
    },
    mounted:function(){
      var that = this;
      that.windowHeight = document.documentElement.offsetHeight;
      console.log(document.documentElement.offsetHeight)
      window.addEventListener('resize', function() {
        that.windowHeight = document.documentElement.offsetHeight;
        console.log(document.documentElement.offsetHeight)
      });
      var a = localStorage.getItem('bigData');
      that.detail = JSON.parse(a);
      var Q1 = Math.min(parseInt(that.detail.allGoalFirstChoice), 7);
      var Q2 = Math.min(parseInt(that.detail.allGoalSecondChoice), 7);
      var arr = [that.detail.allGoalZreo,that.detail.allGoalOne,that.detail.allGoalTwo,that.detail.allGoalThree,that.detail.allGoalFour,that.detail.allGoalFive,that.detail.allGoalSix,that.detail.allGoalSeven];
      that.Q_1 = arr[Q1];
      that.Q_2 = arr[Q2];
      console.log(arr[Q1],that.detail,'详情')
      that.onClick_tab(0);
      that.option1 = {
        renderTo: 'container',
        chart: {
          type: 'column',
          backgroundColor: 'rgba(0,0,0,0)',
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance:25,
            frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
              // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
              // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
              bottom: {
                size: 10
              },
              side: {
                size:100,
                color: 'transparent'
              },
              back: {
                size: 100,
                color: 'transparent'
              }
            }
          },
          reflow:true,
          height:(that.windowHeight-46-68-240-60-20)+'px',
          marginBottom: 50,
          marginLeft:0,
          marginRight:0,
          spacingLeft: 0
        },
        title:{
          text:''
        },
        credits:{
          text:' '
        },
        showInLegend: true,
        plotOptions: {
          series: {
            shadow: true,           //不显示阴影
            depth:25,
            groupZPadding: 1,
            pointPadding: 0.2,
            pointWidth:18,
            borderWidth: 0,
            borderRadius: 20,
            dataLabels: {                //柱状图数据标签
              enabled: true,              //是否显示数据标签
              formatter: function() {
                return  this.y*0.1 +'%'
              }
            },
            events:{
              click(e){
                console.log(e,'点击')
              }
            }
          }
        },
        xAxis: {
          gridLineWidth: 0,
          title: {
            text: null
          },
          categories: ['0球','1球','2球','3球','4球','5球','6球','7+球']
        },
        yAxis: {
          gridLineWidth: 0,
          title: {
            text: null
          },
          labels:{
            enabled: false,
          }
        },
        series: [{
          data: [that.detail.allGoalZreo.replace("%","")*10, that.detail.allGoalOne.replace("%","")*10, that.detail.allGoalTwo.replace("%","")*10, that.detail.allGoalThree.replace("%","")*10, that.detail.allGoalFour.replace("%","")*10	, that.detail.allGoalFive.replace("%","")*10, that.detail.allGoalSix.replace("%","")*10, that.detail.allGoalSeven.replace("%","")*10],
          name: 'column',
          color:"#FE8C25",
          showInLegend: false,
          tooltip:{
            headerFormat: '{point.key}： ',
            pointFormatter: function(e) {
              console.log(e,'pointFor')
              return  this.y*0.1 +'%'
            },
            enabled:true
          }
        }]
      };

      // var webview = plus.webview.currentWebview();
      // plus.key.addEventListener('backbutton', function() {
      //   webview.canBack(function(e) {
      //     if(e.canBack) {
      //       webview.back();
      //     } else {
      //       webview.close(); //hide,quit
      //       //plus.runtime.quit();
      //     }
      //   })
      // });
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },
      //tab点击事件
      onClick_tab(index){
        this.tabIndex = index;

          if(index == 0){
            this.$nextTick(() => {
              this.firstChart();
            })
          }else if(index == 1){
            this.$nextTick(() => {
              this.secondChart();
            })
          }else if(index == 2){
            this.$nextTick(() => {
              this.thirdChart();
            })
          }else if(index == 3){
            this.onlyChart();
          }

      },

      //第一个饼状图
      firstChart(){
        console.log('000')
        this.$echarts.disconnect();
        var myChart = this.$echarts.init(document.getElementById('redux_main_0'));
        var t1=this.detail.allTrendHomeWin.replace("%","");
        t1= t1*10;
        var t2=this.detail.allTrendDogfall.replace("%","");
        t2= t2*10;
        var t3=this.detail.allTrendGuestWin.replace("%","");
        t3= t3*10;
        console.log(t1,t2,t3,'ttt')
        var options = {
          visualMap: {
            show: false,
            min: 80,
            max: 80,
            inRange: {
              colorLightness: [0,1.2]
            }
          },
          series : [
            {
              type:'pie',
              radius : '85%',
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position:'inside'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '26',
                    fontWeight: '400'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:t1, name:this.detail.allTrendHomeWin,itemStyle:{normal:{color:'#ff774d'}}},
                {value:t2, name:this.detail.allTrendDogfall,itemStyle:{normal:{color:'#ffc450'}}},
                {value:t3, name:this.detail.allTrendGuestWin,itemStyle:{normal:{color:'#60a2ee'}}}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ],
          color: ['#ff774d','#ffc450','#60a2ee']
        };

        myChart.setOption(options)
        this.options_1 = options;
      },
      //第二个饼状图
      secondChart(){
        var myChart = null;
        this.$echarts.disconnect();
        myChart = this.$echarts.init(document.getElementById('redux_main_1'));
        var t1=this.detail.halfProbabilityHomeWin.replace("%","");
        t1= t1*10;
        var t2=this.detail.halfProbabilityDogfall.replace("%","");
        t2= t2*10;
        var t3=this.detail.halfProbabilityGuestWin.replace("%","");
        t3= t3*10;
        console.log(t1,t2,t3,'ttt')
        console.log(myChart)
        // console.log(myChart, 1000);

        var options = {
          visualMap: {
            show: false,
            min: 80,
            max: 80,
            inRange: {
              colorLightness: [0,1.2]
            }
          },
          series : [
            {
              type:'pie',
              radius : '85%',
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position:'inside'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '26',
                    fontWeight: '400'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:t1, name:this.detail.halfProbabilityHomeWin,itemStyle:{normal:{color:'#ff774d'}}},
                {value:t2, name:this.detail.halfProbabilityDogfall,itemStyle:{normal:{color:'#ffc450'}}},
                {value:t3, name:this.detail.halfProbabilityGuestWin,itemStyle:{normal:{color:'#60a2ee'}}}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ],
          color: ['#ff774d','#ffc450','#60a2ee']
        };
        myChart.setOption(options);
        // myChart.dispose();
      },
      //第三个饼状图
      thirdChart(){
        console.log('222')
        this.$echarts.disconnect();
        var myChart = this.$echarts.init(document.getElementById('redux_main_2'));
        var t1=this.detail.letProbabilityHomeWin.replace("%","");
        t1= t1*10;
        var t2=this.detail.letProbabilityDogfall.replace("%","");
        t2= t2*10;
        var t3=this.detail.letProbabilityGuestWin.replace("%","");
        t3= t3*10;
        console.log(myChart)
        var options = {
          visualMap: {
            show: false,
            min: 80,
            max: 80,
            inRange: {
              colorLightness: [0,1.2]
            }
          },
          series : [
            {
              type:'pie',
              radius : '85%',
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position:'inside'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '26',
                    fontWeight: '400'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:t1, name:this.detail.letProbabilityHomeWin,itemStyle:{normal:{color:'#ff774d'}}},
                {value:t2, name:this.detail.letProbabilityDogfall,itemStyle:{normal:{color:'#ffc450'}}},
                {value:t3, name:this.detail.letProbabilityGuestWin,itemStyle:{normal:{color:'#60a2ee'}}}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ],
          color: ['#ff774d','#ffc450','#60a2ee']
        };
        myChart.setOption(options)
      },
      //第一个圆柱图
      onlyChart(){
        console.log('333')
        Highcharts.chart('container', {
          renderTo: 'container',
          chart: {
            type: 'column',
              backgroundColor: 'rgba(0,0,0,0)',
              options3d: {
              enabled: true,
                alpha: 18,
                beta: 2,
                depth: 100,
                viewDistance:25
            },
            reflow:true,
              height:233,
              marginBottom: 50
          },
          title:{
            text:''
          },
          credits:{
            text:' '
          },
          legend: {//方框所在的位置(不知道怎么表达)  
            layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -10,
              y: 100,
              borderWidth: 0,
              enabled:true
          },
          showInLegend: true,
            plotOptions: {
            enable:true,
              column: {
              pointPadding:30,
                borderWidth: 0,
                borderRadius: 180,
                pointWidth: 18,
                animation: true,
                dataLabels: { //图上是否显示数据标签
                enabled: true,
                  align: "center",
                  //color: 'red',
                  rotation: 270,
                  staggerLines: 0,
                  step: 0,
                  style: 0,
                  x: 0,
                  y: -6
              },
            }
          },
          xAxis: {
            gridLineWidth: 0,
              title: {
              text: null
            },
            categories: ['0球','1球','2球','3球','4球','5球','6球','7+球']
          },
          yAxis: {
            gridLineWidth: 0,
              title: {
              text: null
            },
            labels:{
              enabled: false,
            }
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5],
            name: 'column',
            color:"#FE8C25",
            showInLegend: false
          }]
        });
      },

      //下一个tab页面
      nextTab:function () {
        var that = this;
        if(that.tabIndex == 0){
          var index = 1;
          this.$nextTick(() => {
            that.secondChart();
          })
        }else if(that.tabIndex == 1){
          var index = 2;
          this.$nextTick(() => {
            that.thirdChart();
          })
        }else if(that.tabIndex == 2){
          var index = 3;
          // that.onlyChart();
        }
        that.active = index;
        that.tabIndex = index;
        console.log(that.active,'nextTab----active',that.tabIndex)
      },
      //上一个tab页面
      lastTab:function () {
        var that = this;
        if(that.tabIndex == 1){
          var index = 0;
          this.$nextTick(() => {
            that.firstChart();
          })
        }else if(that.tabIndex == 2){
          var index = 1;
          this.$nextTick(() => {
            that.secondChart();
          })
        }else if(that.tabIndex == 3){
          var index = 2;
          this.$nextTick(() => {
            that.thirdChart();
          })
        }
        that.active = index;
        // that.tabIndex = index;
        console.log(that.active,'lastTab----active',that.tabIndex)
      },

      //点击比分---查看详情
      scoreEvent:function () {
        // this.$router.push({
        //   path:'/detailBig_score'
        // })
      }
    },
    components: {
      FmCharts,Highcharts
    }
  }
</script>

<style lang="less">
  #detail_Bigdata{
    width: 100%;
    min-height: 100%;
    background: #EEEEEE;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-tabs__nav{
      background: #f5f5f5;
      border-top: 0;
    }
    .van-icon{
      color:#000 !important;
    }
    .van-tabs__wrap{
      height: 68px;
    }
    .van-tab{
      line-height: 20px;
      .van-tab--active{
        color: rgb(255, 119, 077) !important;
      }
    }
    .tabContent{
      width: 100%;
      background: #F9F9F9;
      margin-top: 26px;
      position: relative;
      .tabC_title{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-weight: bold;
        color: #F36038;
        font-size:24px;
        letter-spacing: 1px;
      }
      .tabC_leftIcon{
        width: 50px;
        height: 100%;
        position: relative;
        img{
          width: 100%;
          height: 50px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .tabC_middle{
        width: 90%;
        height: 100%;
      }
      .tabC_rightIcon{
        width: 50px;
        height: 100%;
        position: relative;
        img{
          width: 100%;
          height: 50px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .tabC_bottom{
      width: 98%;
      height: 180px;
      display: flex;
      flex-wrap: wrap;
      padding: 0 1%;
      position: relative;
      .tabC_Bitem{
        width: 49.4%;
        height: 80px;
        padding: 5px 0;
        text-align: center;
        margin: 0 auto;
        letter-spacing: 1px;
        div{
          font-size:25px;
          /*font-weight: bold;*/
          color: #FF774D;
          line-height: 26px;
        }
        span{
          font-size:12px;
          color: grey;
          line-height: 26px;
        }
      }
      .tabC_Bitem_1{
        width: 49.4%;
        height: 80px;
        padding: 5px 0;
        text-align: left;
        margin: 0 auto;
        letter-spacing: 1px;
        div{
          font-size:13px;
          line-height: 26px;
          width: 100%;
          text-align: center;
        }
      }
    }
    #tabC_OtherBottom{
      width: 98%;
      height: 240px;
      padding: 0 1%;
      background: #f9f9f9;
      position: relative;
      top: -5px;
      .tabC_ob_item{
        display: flex;
        width: 94%;
        margin: 5px auto;
        padding-top: 4px;
        span{
          width: 3px;
          height: 70px;
          background: #FF774D;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .tabC_obiborder{
          width: 95%;
          height: 56px;
          background: #EEEEEE;
          border-radius: 4px;
          -moz-box-shadow:2px 1px 5px #eee;
          -webkit-box-shadow:2px 1px 5px #eee;
          box-shadow:2px 1px 5px #eee;
          padding: 7px 2%;
          letter-spacing: 1px;
          span{
            width: 96%;
            margin-left: 4%;
            height: 28px;
            line-height: 28px;
            background: transparent;
            font-size:15px;
          }
          div{
            width: 96%;
            margin-left: 4%;
            height: 28px;
            line-height: 28px;
            display: flex;
            span{
              background: transparent;
              font-size:12px;
              width: 100%;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
</style>
