<template>
  <div id="my_dataBuy">
    <van-nav-bar
      :left-text="titleName"
      style="background-color: #ECECEC;text-align: left;border: 0;position: fixed;top: 0;color:#000;width:100%;"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs @click="swiperIcon" v-model="active" background="#ECECEC" title-inactive-color="#000" title-active-color="#F27856" color="#F27856">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        id="loadSign"
        :check="200"
        style="overflow: hidden;overflow-y: scroll"
        :style="{height: (windowHeight-120) + 'px'}"
        @load="onLoad"
      >
      <van-tab v-for="(item,key) in tabList" :title="item.title" :key="key">
        <div id="MDB_list">
          <div v-for="(item,idx) in list" class="MDB_listItem" @click="checkDetail(item,idx)">
            <div class="MDB_litop">
              <div>{{item.createTime}}</div>
              <span v-if="item.type == 1" style="color:green">+{{item.coin}}</span>
              <span v-if="item.type == 2" style="color:red">-{{item.coin}}</span>
            </div>
            <div class="MDB_libot" v-if="item.type == 2">{{item.way}}</div>
            <div class="MDB_libot" v-if="item.type == 1">充值购买</div>
          </div>
        </div>
      </van-tab>
      </van-list>
    </van-tabs>

  </div>
</template>

<script>
    export default {
      name: "my_dataBuy",
      data(){
        return{
          titleName:"我的数据",
          active: 0,
          tabList:[
            {
              title:'全部'
            },
            {
              title:'买金币'
            },
            {
              title:'花金币'
            }
          ],
          list:[],
          userInfo:{},

          windowHeight:0,
          loading: false,
          finished: false,
          error:false,
          page:0,
          pageCount:0,
        }
      },
      mounted:function () {
        this.titleName = this.$route.query.name;
        var userInfo = localStorage.getItem('userInfo');
        this.userInfo = JSON.parse(userInfo);
        this.list = [];
        this.page = 1;
        this.pageCount = 0;
        console.log('---mounted')
        this.check_list(0);
        this.windowHeight = document.documentElement.offsetHeight;
        console.log(document.documentElement.offsetHeight)
        window.addEventListener('resize', function() {
          this.windowHeight = document.documentElement.offsetHeight;
          console.log(document.documentElement.offsetHeight);
        });
      },
      methods:{
        onClickLeft(){
          this.$router.back()
        },
        onLoad(){
          if(this.page < this.pageCount){
            this.page = this.page +1;
            console.log(this.page,'---onLoad')
            this.check_list(this.active);
          }
        },
        swiperIcon(active){
          var _this = this;
          _this.active = active;
          _this.page = 1;
          _this.pageCount = 0;
          _this.list = [];
          _this.loading=false;
          _this.finished=false;
          console.log( _this.page,'----swiperIcon')
          _this.check_list(_this.active);
        },
        //查询列表
        check_list(active){
          var _this = this;
          if(active == 0){
            var type = '';
          }else if(active == 1){
            var type = 1;
          }else if(active == 2){
            var type = 2;
          }
          this.axios.post('/soccer/SoccerOrder/getPageList.do?',{
            mubanId:'10015',
            userId:this.userInfo.userId,
            pageIndex:this.page,
            type:type,
            pageSize:20
          }).then((res) =>{
            console.log(res,'查询全部花费');
            if(res.data.code == 200){
              var lsit = res.data.data;
              _this.pageCount = Math.ceil(res.data.size / 10);
              lsit.forEach((item,key) =>{
                var time = new Date(item.createTime);
                var Y = time.getFullYear();
                var M = (time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1);
                var D = time.getDate()<10?'0'+time.getDate():time.getDate();
                var H = time.getHours()<10?'0'+time.getHours():time.getHours();
                var m = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
                var s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
                item.createTime = Y+'-'+M+'-'+D+' '+H+':'+m+':'+s;
              })
              _this.list = _this.list.concat(lsit);
              _this.loading = false;
              if (_this.page == _this.pageCount || lsit.length == 0) {  //数据全部加载完成
                _this.finished = true;
              }else{
                _this.finished = false;
              }
            }else{
              _this.list = [];
            }
          })
        },

        //查询购买详情
        checkDetail(item,idx) {
          var _this = this;
          this.axios.post('/soccer/SoccerGame/getPageList.do?',{
            userId:_this.userInfo.userId,
            gameId:item.gameId,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'购买的详情');
            if(res.data.code == 200){
              var list = res.data.data[0];
              localStorage.setItem('bigData', JSON.stringify(list));
              this.$router.push({
                path:'/detail_BigdataPage'
              })
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #my_dataBuy{
    width: 100%;
    height: 100%;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-icon{
      color:#000 !important;
    }
    /deep/.van-tabs__wrap{
      position: fixed;
      top: 45px;
    }
    /deep/.van-tabs__content{
      width: 100%;
      height: 60%;
      position: absolute;
      top: 90px;
    }
    /deep/.van-list__loading{
      width: 100%;
      position: absolute;
      top: 0;
    }
    /deep/.van-list__error-text{
      position: fixed;
      bottom: 10px;
      padding: 1%;
      color: #3a8ee6;
      width: 100%;
      text-align: center;
    }
    #MDB_list{
      width: 90%;
      height: 100%;
      margin: 20px auto;
      .MDB_listItem{
        width: 96%;
        height: 100%;
        padding: 10px 2%;
        border-bottom: 1px solid #e1e1e1;
        letter-spacing: 1px;
        .MDB_litop{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
          font-size:14px;
        }
        .MDB_libot{
          width: 100%;
          font-size:14px;
          height: 30px;
          line-height: 30px;
          color: #A4A4A4;
        }
      }
    }

  }
</style>
