<template>
  <div>
    <van-tabbar v-model="tabbar" @change="changeHandler">
      <van-tabbar-item :info="count" name="IndexPage" replace to="/IndexPage">
        <span>情报中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="tabbar == 'IndexPage' ? icon.active : icon.normal "
        >
      </van-tabbar-item>
      <van-tabbar-item name="BigdataPage" replace to="/BigdataPage">
        <span>足球大数据</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="tabbar == 'BigdataPage' ? icon1.active : icon1.normal "
        >
      </van-tabbar-item>
      <van-tabbar-item name="MycenterPage" replace to="/MycenterPage">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="tabbar == 'MycenterPage' ? icon2.active : icon2.normal "
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabbar: "IndexPage",

        icon: {
          normal: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/5.png',
          active: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/4.png'
        },
        icon1: {
          normal: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/6.png',
          active: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/7.png'
        },
        icon2: {
          normal: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/8.png',
          active: 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/9.png'
        }
      };
    },
    props: {
      active: "",
      count: ''
    },
    mounted() {
      // console.log(this.active, '====')
      this.tabbar = this.active
    },
    methods: {
      changeHandler() {
        console.log(this.active, 12)
        this.tabbar = this.active
      }
    }
  };
</script>
<style lang="less">
  .van-tabbar{
    display: flex;
    width: 100%;
    height: 67px;
    background-color: #fff;
    .van-tabbar-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      color: #7d7e80;
      font-size: 12px;
      line-height: 0;
      .van-tabbar-item__icon {
        position: relative;
        margin-bottom: 5px;
        font-size: 18px;
        img{
          height: 41px;
          display: block;
        }
        .van-tabbar-item__text{
          margin-top: -5px;
        }
      }

    }
    .van-tabbar-item--active {
      color: #F46038;
    }
  }
</style>

