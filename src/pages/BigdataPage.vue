<template>
  <!--主页面 *** 足球大数据-->
  <div id="big_Data">
    <van-nav-bar left-text="国国侃球大数据" style="background-color: #EDEDED;text-align: left;" fixed :border="false"/>
    <!--顶部日期-->
    <div class="bigBorder_top">
      <div class="bigB_Tbutton">
        <button v-if="status_lastDay == false" @click="lastDayEvent">上一天</button>
        <button v-if="status_lastDay == true" style="background:#CCCCCC ">上一天</button>
      </div>
      <span>{{datetime}}比赛</span>
      <div class="bigB_Tbutton">
        <button v-if="status_nextDay == true" style="background:#CCCCCC ">下一天</button>
        <button  v-if="status_nextDay == false" @click="nextDayEvent">下一天</button>
      </div>
    </div>
    <!--列表-->
    <div class="bigBorder_listborder">
      <div class="bigB_lbItem" v-for="(item,key) in list" @click="scrollTopElem(key)" ref="myBox">
        <!--卡片展示部分-->
        <div class="bigBl_itemTop" @click="tipEvent(key)" :style="{background: 'url(' + backList[key%4].images +')', backgroundSize: '100%',backgroundRepeat: 'no-repeat'}">
          <div class="itemT_top">
            <span>{{item.number}}</span>
            <span>{{item.time}}</span>
            <span>{{item.competition}}</span>
          </div>
          <div class="itemT_bottom">
            <span>{{item.home}}</span>
            <span>VS</span>
            <span>{{item.guest}}</span>
          </div>
        </div>
        <!--购买展示部分-->
        <div class="bigBl_itemBottom" v-show="item.choose == true">
          <div class="itemB_left">
            <div v-if="item.allWinLose == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>全场胜平负</div>
            </div>
            <div v-if="item.halfWinLose == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>半场胜平负</div>
            </div>
            <div v-if="item.letWinLose == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>让球胜平负</div>
            </div>
          </div>
          <div class="itemB_middle">
            <img @click="payFor(key,item)" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/15.png"/>
            <div>-{{item.money}}</div>
          </div>
          <div class="itemB_left">
            <div v-if="item.allGoal == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>全场进球数</div>
            </div>
            <div v-if="item.score == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>比分</div>
            </div>
            <div v-if="item.halfGoal == 'true'">
              <van-icon name="passed" color="#6CF273"	style="margin-top: 7px;margin-right: 4px;" />
              <div>半场进球数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <navTabbar active="BigdataPage"></navTabbar>
  </div>

</template>

<script>
    import { Dialog } from 'vant';
    export default {
      name: "BigdataPage",
      data(){
        return{
          datetime:'',
          timeList:[],
          list:[],
          backList:[
            {
              images:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/11.png'
            },
            {
              images:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/12.png'
            },
            {
              images:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/13.png'
            },
            {
              images:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/14.png'
            }
          ],
          userInfo:{},

          status_lastDay:false,//是否是最开始的日期
          status_nextDay:false,//是否是最后的日期

          dayKey:0,
          pageStatus:0
        }
      },
      created() {
        var that = this;
        var a = that.list;
        a.forEach((item,key) =>{
          this.$set(this.list[key], 'choose', false)
        })
      },
      mounted:function(){
        var userInfo = localStorage.getItem('userInfo');
        this.userInfo = JSON.parse(userInfo);
        // this.check_Unread();
        this.check_time();
        this.checkUserInfo();
        this.checkStatus();

      },
      updated() {
        setTimeout(() =>{
          this.check_time();
        },7200000)
        console.log(1221, 'updated')
      },
      methods:{
        checkStatus(){
          var that = this;
          this.axios.post('/clothing/ClothingStatus/find.do?',{
            mubanId:'10015',
            status:0
          }).then((res) =>{
            console.log(res,'查询状态信息')
            if(res.data.code == 200){
              that.pageStatus = res.data.data[0].status;
            }else{
              that.pageStatus  = 0;
            }
          })
        },

        scrollTopElem (idx) {
          console.log(this.$refs.myBox[idx], this.$refs.myBox)
          console.log(this.$refs.myBox[idx].offsetTop)
          window.scroll(0, this.$refs.myBox[idx].offsetTop)
        },
        //查询时间列表
        check_time:function(){
          var _this = this;
          _this.status_lastDay = false;
          this.axios.post('/soccer/SoccerDate/getPageList.do?',{
            mubanId:'10015',
            pageIndex:1,
            pageSize:100
          }).then((res) =>{
            console.log(res,'时间列表查询')
            if(res.data.code == 200){
              var list = res.data.data;
              var arr = [];

              //当前日期时间
              var temsp = new Date();
              console.log(temsp,'当前日期时间')
              var year = temsp.getFullYear()+'-';
              var mm = ((temsp.getMonth()+1)>=10?(temsp.getMonth()+1):'0'+(temsp.getMonth()+1))+'-';
              var dd = temsp.getDate()>=10?temsp.getDate():'0'+temsp.getDate();
              temsp = year+mm+dd;
              console.log(temsp,'当前日期时间')
              list.sort((a, b) => a.date - b.date)
              list.forEach((item,key) =>{
                item.date = item.date.replace(/-/g, '/');
                var tem = new Date(item.date-0);
                var year = tem.getFullYear();
                var mm = ((tem.getMonth()+1)>=10?(tem.getMonth()+1):'0'+(tem.getMonth()+1))+'-';
                var dd = tem.getDate()>=10?tem.getDate():'0'+tem.getDate();
                tem = year+ '-'+ mm+dd;
                console.log(tem,'数据时间')
                arr.push(tem);
              })
              var len = arr.length;
              var num = parseInt(len - 5);
              arr.sort()
              console.log(arr, 'sort前')
              console.log(len,num)
              var newArr = arr.splice(-5,5);
              _this.timeList = newArr;
              var _idx = -1;
              console.log(newArr,222000)
              newArr.forEach((itt,key) =>{
                if (_idx == -1) {
                  if (itt == temsp){
                    _idx = key
                  } else if (itt > temsp){
                    _idx = Math.max(0, key - 1)
                  }
                }
              })
              _idx = _idx == -1?newArr.length-1:_idx;
              if(_idx == newArr.length-1){
                _this.status_nextDay = true;
                _this.status_lastDay = false;
              }else if(_idx == 0){
                _this.status_lastDay = true;
              }
              _this.dayKey = _idx;
              _this.datetime = newArr[_idx];
              _this.check_matchList(_this.datetime);
              _this.checkUserInfo();
            }
          })
        },
        //查询赛事列表
        check_matchList:function(time){
          var _this = this;
          this.axios.post('/soccer/SoccerGame/getPageList.do?',{
            mubanId:'10015',
            pageIndex:1,
            date:time,
            pageSize:200
          }).then((res) =>{
            console.log(res,'赛事列表查询')
            if(res.data.code == 200){
              var list  = res.data.data;
              list.forEach((item,key) =>{
                item.choose = false;
                var b = 0;
                var c = 0;
                var d = 0;
                var e = 0;
                var f = 0;
                var a = 0;
                if(item.allWinLose == 'true'){
                  a = item.allCoin;
                }
                if(item.halfWinLose == 'true'){
                  b = item.halfCoin;
                }
                if(item.letWinLose == 'true'){
                  c = item.letCoin;
                }
                if(item.halfGoal == 'true'){
                  d = item.halfGoalCoin;
                }
                if(item.allGoal == 'true'){
                  e = item.allGoalCoin;
                }
                if(item.score == 'true'){
                  f = item.scoreCoin;
                }
                item.money = a+b+c+d+e+f;//支付幸运币数
              })
              _this.list = list;
              _this.checkUserInfo();
            }else{
              _this.list = [];
            }
          })
        },

        //上一天
        lastDayEvent:function(){
          var _this = this;
          var arr = _this.timeList;
          console.log(_this.dayKey)
          _this.dayKey = parseInt(_this.dayKey) - 1;
          console.log(_this.dayKey,' _this.dayKey')
          if(_this.dayKey == 0){
            _this.status_lastDay = true;
          }else if(_this.dayKey < arr.length){
            _this.status_nextDay = false;

            //只能查最近5天赛事
            if(_this.dayKey == arr.length-5){
              console.log(arr.length-5,'arr.length')
              _this.status_lastDay = true;
            }else{
              console.log(_this.dayKey,'arr.length--_this.dayKey')
              _this.status_lastDay = false;
            }
          }
          _this.datetime = arr[_this.dayKey];
          _this.check_matchList(_this.datetime);
        },

        //下一天
        nextDayEvent:function(){
          var _this = this;
          var arr = _this.timeList;
          _this.dayKey = parseInt(_this.dayKey) + 1;
          if(_this.dayKey == arr.length-1){
            _this.status_nextDay = true;
          }else if(_this.dayKey > 0){
            _this.status_lastDay = false;
          }
          _this.datetime = arr[_this.dayKey];
          _this.check_matchList(_this.datetime);
        },

        //点击展开模态框
        tipEvent:function (key) {
          var vm = this;
          var userId = vm.userInfo.userId;
          var gameId = vm.list[key].gameId;
          this.axios.post('/soccer/SoccerOrder/findOrders.do?',{
            userId:userId,
            gameId:gameId
          }).then((res) =>{
            console.log(res,'是否购买赛事');
            if(res.data.code == 200){
              vm.list[key].choose = false;
              var gameId = res.data.data.gameId;
              this.axios.post('https://huang.zgsj1.com/soccer/SoccerGame/getPageList.do?',{
                userId: userId,
                gameId: gameId,
                mubanId: 10015
              }).then((res) =>{
                console.log(res,'查询赛事详情')
                if(res.data.code == 200){
                  var list = res.data.data[0];
                  localStorage.setItem('bigData', JSON.stringify(list));
                  vm.checkUserInfo();
                  this.$router.push({
                    path:'/detail_BigdataPage'
                  })
                }
              })
            }else{
              vm.checkUserInfo();
              let status = !vm.list[key].choose;
              vm.list[key].choose = status;

            }
          })
        },

        //点击支付
        payFor:function (key,item) {
          var that = this;
          if(item.money > (parseInt(that.userInfo.luckyCoin)-0)){
            Dialog.confirm({
              title: '大数据提示',
              message: '剩余幸运币不足',
              confirmButtonText:'充值'
            }).then(() =>{
              that.$router.push({
                path:'/my_BuyLuckyCoins'
              })
              // on confirm
            }).catch(() =>{
              // on cancel
            })
          }else{
            Dialog.confirm({
              title: '消费提示',
              message: '该赛事将消费'+item.money+'幸运币',
              confirmButtonText:'购买'
            }).then(() => {
              // on confirm
              var name = '购买记录 '+item.home+' VS '+item.guest;
              this.axios.post('/soccer/SoccerOrder/save.do?',{
                mubanId:'10015',
                type:2,
                gameId:item.gameId,
                userId:that.userInfo.userId,
                coin:item.money,
                way:name
              }).then((res) =>{
                console.log(res)
                if(res.data.code === 200){
                  that.list[key].choose = false;
                  var gameId = res.data.data.gameId;
                  this.axios.post('https://huang.zgsj1.com/soccer/SoccerGame/getPageList.do?',{
                    userId: that.userInfo.userId,
                    gameId: gameId,
                    mubanId: 10015
                  }).then((res) =>{
                    console.log(res,'查询赛事详情')
                    if(res.data.code == 200){
                      var list = res.data.data[0];
                      localStorage.setItem('bigData', JSON.stringify(list));
                      that.checkUserInfo();
                      setTimeout( ()=>{
                        this.$router.push({
                          path:'/detail_BigdataPage'
                        })
                      },1000)
                    }
                  })
                }else{
                  this.$toast(res.data.msg)
                }
              })
            }).catch(() => {
              // on cancel
            });
          }
        },
        //查询用户信息
        checkUserInfo:function () {
          var that = this;
          this.axios.post('/soccer/SoccerUser/findById.do?',{
            mubanId:'10015',
            userId:that.userInfo.userId,
          }).then((res) =>{
            console.log(res,'查询用户信息')
            if(res.data.code == 200){
              localStorage.setItem('userInfo', JSON.stringify(res.data.data));
              that.userInfo = res.data.data;
            }else{
              var auths = null;
              plus.oauth.getServices(function(services){
                auths = services;
                console.log(services, 1001)
                for(var i in auths) {
                  var s = auths[i];
                  s.logout(function(e) {
                    console.log(e,'auths.logout')
                  })
                  that.$router.push({
                    path:'/LoginPage'
                  });
                  localStorage.clear();
                }

              }, function(e){
                plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
              } );
            }
          })
        },


        //查询未读消息
        check_Unread() {
          var that = this;
          this.axios.post('/soccer/SoccerChat/getSize.do?',{
            mubanId:'10015',
            fromId:0,
            toId:0,
            isRead:that.userInfo.userId
          }).then((res) =>{
            console.log(res,'未读消息查询');
            if(res.data.code == 200){
              if(res.data.size > 0){
                that.count = res.data.size;
              }else{
                that.count = '';
              }
            }else{
              that.count = '';
            }
          })
        }
      },
      beforeRouteUpdate() {
        console.log('更新了哦')
      },
      watch:{
        $route(to,from){
          console.log(to.path);
        }
      }
    }
</script>

<style lang="less">
  #big_Data{
    width: 100%;
    min-height: 100%;
    background: #F7F7F7;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .bigBorder_top{
      width: 92%;
      display: flex;
      justify-content: space-between;
      height: 33px;
      padding: 15px 4%;
      margin-top: 46px;
      background: #EDEDED;
      .bigB_Tbutton{
        width: 22%;
        height: 30px;
        color: #fff;
        border-radius: 15px;
        font-size:14px;
        button{
          width: 100%;
          height: 30px;
          background: #F26F3B;
          border-radius: 18px;
          outline: none;
          border: 0;
          text-align: center;
          line-height: 30px;
          font-size: 10px;
        }
      }
      span{
        line-height: 33px;
        font-size:14px;
        display: block;
        padding: 0 2%;
      }
    }
    .bigBorder_listborder{
      width: 100%;
      padding-bottom: 180px;
      padding-top: 10px;
      .bigB_lbItem{
        width: 100%;
        margin-bottom: 6px;
        .bigBl_itemTop{
          width: 100%;
          height: 115px;
          background-size: 100% 100%;
          position: relative;
          .itemT_top{
            width: 80%;
            padding: 0 10%;
            display: flex;
            justify-content: space-between;
            color: #fff;
            font-size:15px;
            height: 40px;
            line-height: 40px;
            letter-spacing: 1px;
            padding-top: 16px;
          }
          .itemT_bottom{
            width: 60%;
            padding: 0 20%;
            display: flex;
            justify-content: space-between;
            color: #fff;
            font-size:15px;
            height: 30px;
            line-height: 30px;
            letter-spacing: 1px;
            padding-top: 6px;
          }
        }
        .bigBl_itemBottom{
          width: 80%;
          height: 95px;
          padding: 10px 5%;
          background: #fff;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          position: relative;
          top: -5px;
          left: 5%;
          -moz-box-shadow:2px 1px 5px #F1F1F1;
          -webkit-box-shadow:2px 1px 5px #F1F1F1;
          box-shadow:2px 1px 5px #F1F1F1;
          display: flex;
          justify-content: space-between;
          .itemB_left{
            width: 32%;
            position: relative;
            div{
              display: flex;
              margin-top: 6px;
              position: relative;
              div{
                font-size:12px;
              }
            }
          }
          .itemB_middle{
            width: 30%;
            img{
              width: 73px;
              height: 71px;
              margin-left: 10px;
            }
            div{
              width: 100%;
              text-align: center;
              color: #FFD732;
              font-size:18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>
