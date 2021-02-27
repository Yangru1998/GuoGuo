import Vue from 'vue'
import Router from 'vue-router'
import StartPage from 'pages/StartPage'
import LoginPage from 'pages/LoginPage'
import IndexPage from 'pages/IndexPage'
import BigdataPage from 'pages/BigdataPage'
import MycenterPage from 'pages/MycenterPage'
import detail_BigdataPage from 'pages/detail_BigdataPage'
import my_userInfo from 'pages/my_userInfo'
import EditMyName from 'pages/EditMyName'
import EditMyPhone from 'pages/EditMyPhone'
import my_BuyLuckyCoins from 'pages/my_BuyLuckyCoins'
import my_dataBuy from 'pages/my_dataBuy'
import my_bindAccount from 'pages/my_bindAccount'
import my_contactUs from 'pages/my_contactUs'
import detailBig_score from 'pages/detailBig_score'
import LoginBinding from 'pages/LoginBinding'
import AgreementPage from 'pages/AgreementPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/StartPage'
    },
    {
      path: '/StartPage',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/IndexPage',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/BigdataPage',
      name: 'BigdataPage',
      component: BigdataPage,
    },
    {
      path: '/MycenterPage',
      name: 'MycenterPage',
      component: MycenterPage
    },
    {
      path: '/detail_BigdataPage',
      name: 'detail_BigdataPage',
      component: detail_BigdataPage
    },
    {
      path: '/my_userInfo',
      name: 'my_userInfo',
      component: my_userInfo
    },
    {
      path: '/EditMyName',
      name: 'EditMyName',
      component: EditMyName
    },
    {
      path: '/EditMyPhone',
      name: 'EditMyPhone',
      component: EditMyPhone
    },
    {
      path: '/my_BuyLuckyCoins',
      name: 'my_BuyLuckyCoins',
      component: my_BuyLuckyCoins
    },
    {
      path: '/my_dataBuy',
      name: 'my_dataBuy',
      component: my_dataBuy
    },
    {
      path:'/my_bindAccount',
      name: 'my_bindAccount',
      component: my_bindAccount
    },
    {
      path:'/my_contactUs',
      name: 'my_contactUs',
      component: my_contactUs
    },
    {
      path:'/detailBig_score',
      name: 'detailBig_score',
      component: detailBig_score
    },
    {
      path:'/LoginBinding',
      name: 'LoginBinding',
      component: LoginBinding
    },
    {
      path:'/AgreementPage',
      name: 'AgreementPage',
      component: AgreementPage
    }
  ]
})
