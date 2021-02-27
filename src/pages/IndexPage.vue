<template>
  <!--主页面 *** 情报中心-->
  <div id="Message_center">
    <van-nav-bar left-text="国国侃球大数据" style="background-color: #fe5919;text-align: left;" fixed :border="false"/>
	<div class="bannerClss">
		<van-swipe class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		  :autoplay="3000"  interval="5000" :duration="1000" @change="cardSwiper" indicator-color="#fa553c"
		   indicator-active-color="#fa553c">
		   <van-swipe-item
			v-for="(item,index) in swiperList"
			 :key="index" 
			 :class="cardCur==index?'cur':''"
			 >
			<div class="swiper-item"
			:style="'transform: scale(calc'+(0.5 +index) / 10+')); margin-left: calc'+( item.mLeft * 50 - 75)+'px;z-index:'+index"
			>
			 <img :src="item.image" mode="aspectFill"></img>
			</div>
		   </van-swipe-item>
		</van-swipe>
	</div>
	
	<!--消息通知栏-->
	<div class="noticeClass">
		<div class="noticeLeft">
			<label>数据</label>
			<label>快报</label>
		</div>
		<div class="noticeRight">
			<van-notice-bar :scrollable="false">
			  <van-swipe
			    vertical
			    class="notice-swipe"
			    :autoplay="3000"
			    :show-indicators="false"
				 v-for="(item,index) in noticList" :key="index"
			  >
			  	 <van-swipe-item>
					 <div class="noticeLine">
						 <label>{{item.title}}</label>
						 <span>{{item.text}}</span>
					 </div>
				 </van-swipe-item>
			  </van-swipe>
			</van-notice-bar>
		</div>
	</div>		
	
	<!--人工大数据-->
    <div class="dataClass">
		<div class="dataclass_title">人工智能数据</div>
		<div class="dataclass_border">
			<div class="dataItem" v-for="(item,index) in dataList" :key="index">
				<div class="dataitem_left">
					<img :src="item.img" />
				</div>
				<div class="dataitm_right">
					<label>{{item.title}}</label>
				</div>
			</div>
		</div>
	</div>
    <navTabbar active="IndexPage"></navTabbar>
  </div>
</template>

<script>
  import FmScroll from 'components/FmScroll'

  export default {
    name: "IndexPage",
    data(){
        return{
          windowHeight:0,//屏幕高度,
		  userId:'',
		  userInfo:{},
		  pageAccount:0,
		  page: 1,
		  
		  cardCur: 0,
		  dotStyle: false,
		  towerStart: 0,
		  direction: '',
		  
		  swiperList:[
			  {
				  image:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/xyzj/banner_01.png'
			  },
			  {
			  	  image:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/xyzj/banner_2.png'
			  }
		  ],
		  noticList:[
			  {
				  title:'[红球]',
				  text:'命中率5：2，大概率中奖'
			  },
			  {
				  title:'[红球]',
				  text:'命中率5：2，大概率中奖'
			  },
			  {
				  title:'[红球]',
				  text:'命中率5：2，大概率中奖'
			  }
		  ],
		  dataList:[
			  {
				 image:'',
				 title:'足球大数据' ,
				 content:'啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
			  }
		  ]
          
        }
    },
    mounted:function () {
      var that = this;
      that.windowHeight = document.documentElement.offsetHeight;
      window.addEventListener('resize', function() {
        that.windowHeight = document.documentElement.offsetHeight;
      });
	  this.TowerSwiper('swiperList');

      var userInfo = localStorage.getItem('userInfo');
      this.userInfo = JSON.parse(userInfo);
      this.userId = this.userInfo.userId;
    },
    methods:{
		
		DotStyle(e) {
		  this.dotStyle = e
	   },
	   // cardSwiper
	   cardSwiper(e) {
		this.cardCur = e
	   },
	   // towerSwiper
	   // 初始化towerSwiper
	   TowerSwiper(name) {
	   	let list = this[name];
	   	for (let i = 0; i < list.length; i++) {
	   		list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
	   		list[i].mLeft = i - parseInt(list.length / 2)
	   	}
	   	this.swiperList = list
	   },
	   
	   // towerSwiper触摸开始
	   TowerStart(e) {
	   	this.towerStart = e.touches[0].pageX
	   },
	   
	   // towerSwiper计算方向
	   TowerMove(e) {
	   	this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
	   },
	   
	   // towerSwiper计算滚动
	   TowerEnd(e) {
	   	let direction = this.direction;
	   	let list = this.swiperList;
	   	if (direction == 'right') {
	   		let mLeft = list[0].mLeft;
	   		let zIndex = list[0].zIndex;
	   		for (let i = 1; i < this.swiperList.length; i++) {
	   			this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
	   			this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
	   		}
	   		this.swiperList[list.length - 1].mLeft = mLeft;
	   		this.swiperList[list.length - 1].zIndex = zIndex;
	   	} else {
	   		let mLeft = list[list.length - 1].mLeft;
	   		let zIndex = list[list.length - 1].zIndex;
	   		for (let i = this.swiperList.length - 1; i > 0; i--) {
	   			this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
	   			this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
	   		}
	   		this.swiperList[0].mLeft = mLeft;
	   		this.swiperList[0].zIndex = zIndex;
	   	}
	   	this.direction = ""
	   	this.swiperList = this.swiperList
	   },
		
    },
    components: {
      FmScroll
    }
  }
</script>

<style scoped lang="less">
  #Message_center{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
  .bannerClss{
	  background-color: #fa553c;
	  border-bottom-left-radius: 75px;
	  border-bottom-right-radius: 75px;
	  height: 125px;
	  position: relative;
	  top: 46px;
  }
  .my-swipe{
	   height: 175px;
	   position: relative;
   } 
  .van-swipe-item{
      color: #fff;
      font-size: 20px;
      text-align: center;
	  overflow: hidden;
	  width: 60%;
	  position: relative;
	  top: 0;
	  .swiper-item{
		  width: 100%;
		  display: block;
		  height: 100%;
		  border-radius: 5px;
		  -webkit-transform: scale(0.9);
		  transform: scale(0.9);
		  -webkit-transition: all 0.2s ease-in 0s;
		  transition: all 0.2s ease-in 0s;
		  overflow: hidden;
		  img{
			 width: 100%;
			 height: 100%;
			 border-radius: 8px;
		  }
	  }
	 
    }
  .noticeClass{
	  width: 90%;
	  padding: 10px 5%;
	  display: flex;
	  position: relative;
	  top: 100px;
	  border-top: 2px solid #f9f9f9;
	  border-bottom: 2px solid #f9f9f9;
	  align-items: center;
	  .noticeLeft{
		  width: 20%;
		  label{
			  width: 100%;
			  display: block;
			  text-align: left;
			  font-size: 26px;
			  font-weight: 600;
			  align-items: center;
			  &:last-child{
				  color: #fa553c;
			  }
		  }
	  }
	  .noticeRight{
		  width: 80%;
		  /deep/.notice-swipe {
		      line-height: 30px;
			  width: 100%;
			  height: 30px;
		    }
			/deep/.van-notice-bar{
				width: 100%;
				height: 90px;
				padding: 0;
				// background-color: #fff;
				// color: #000;
			}
			.noticeLine{
				width: 100%;
				height: 30px;line-height: 30px;display: flex;
				label{
					color: #fa553c;
				}
			}
	  }
  }
  
  .dataClass{
	  width: 90%;
	  padding: 10px 5%;
	  position: relative;
	  top: 100px;
	  align-items: center;
	  .dataclass_title{
		  width: 100%;
		  font-weight: 600;
	  }
	  .dataclass_border{
		  width: 100%;
		  .dataItem{
			  
		  }
	  }
  }
	
</style>
