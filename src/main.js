// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import qs from 'qs';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import components from "components/index";
// import VConsole from 'vconsole'
//
// var vConsole = new VConsole();

Object.keys(components).forEach((key)=>{
  console.log(key,components[key], 121)
  Vue.component(key,components[key]);
});

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(Vant);
Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.axios = axios
axios.defaults.timeout = 5000
const baseURL = 'http://snow.aapppp.cn/soccer/'
axios.defaults.baseURL = baseURL

axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, function(error) {
  return Promise.reject(error);
});

import highcharts from 'highcharts'

import VueHighcharts from 'vue-highcharts'

import highcharts3d from 'highcharts/highcharts-3d'
Vue.use(VueHighcharts)
highcharts3d(highcharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{

    moreChart() {
      var options = this.getMoreOptions(this.type);

      if (this.chart) {
        this.chart.destroy();
      };
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  }
})
