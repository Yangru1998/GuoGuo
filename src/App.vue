<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted(){
    if(window.plus){
      this.plusReady()
    }else{
      document.addEventListener('plusready',this.plusReady,false)
    }
  },
  methods:{
    plusReady(){
      //手机返回键返回
      var webview = plus.webview.currentWebview();
      plus.key.addEventListener('backbutton', ()=> {
        webview.canBack((e)=> {
          if(e.canBack) {
            webview.back();
          } else {
            //webview.close(); //hide,quit
            //plus.runtime.quit();
            //首页返回键处理
            //处理逻辑：1秒内，连续两次按返回键，则退出应用；
            if (!first) {
              first = new Date().getTime();
              plus.nativeUI.toast('再按一次退出应用')
              console.log('再按一次退出应用');
              setTimeout(function() {
                first = null;
              }, 1000);
            } else {
              if (new Date().getTime() - first < 1500) {
                plus.runtime.quit();
              }
            }
          }
        })
      });
    }
  },
  watch: {
  }
}
</script>

<style>
  html,body {
    height: 100%;
  }
	.van-nav-bar__text {
	  color:#fff !important;
	  font-size:16px;
	  letter-spacing: 1px;
	}
/*
html5doctor.com Reset Stylesheet
v1.4.1
2010-03-01
Author: Richard Clark - http://richclarkdesign.com
*/
  html, body {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    box-sizing:border-box;
    height: 100%;
    /*width: 100%;*/
  }
#app {
  height: 100%;
}
/*body {*/
  /*line-height:1;*/
  /*height: 100%;*/
  /*width: 100%;*/
/*}*/

/*:focus {*/
    /*outline: 1;*/
/*}*/

/*article,aside,canvas,details,figcaption,figure,*/
/*footer,header,hgroup,menu,nav,section,summary {*/
    /*display:block;*/
/*}*/

/*ul {*/
    /*list-style:none;*/
/*}*/

/*blockquote, q {*/
    /*quotes:none;*/
/*}*/

/*blockquote:before, blockquote:after,*/
/*q:before, q:after {*/
    /*content:'';*/
    /*content:none;*/
/*}*/

/*a {*/
    /*margin:0;*/
    /*padding:0;*/
    /*border:0;*/
    /*font-size:100%;*/
    /*vertical-align:baseline;*/
    /*background:transparent;*/
/*}*/

/*ins {*/
    /*background-color:#ff9;*/
    /*color:#000;*/
    /*text-decoration:none;*/
/*}*/

/*mark {*/
    /*background-color:#ff9;*/
    /*color:#000;*/
    /*font-style:italic;*/
    /*font-weight:bold;*/
/*}*/

/*del {*/
    /*text-decoration: line-through;*/
/*}*/

/*abbr[title], dfn[title] {*/
    /*border-bottom:1px dotted #000;*/
    /*cursor:help;*/
/*}*/

/*table {*/
    /*border-collapse:collapse;*/
    /*border-spacing:0;*/
/*}*/

/*hr {*/
    /*display:block;*/
    /*height:1px;*/
    /*border:0;*/
    /*border-top:1px solid #cccccc;*/
    /*margin:1em 0;*/
    /*padding:0;*/
/*}*/

/*input, select {*/
    /*vertical-align:middle;*/
/*}*/
</style>
