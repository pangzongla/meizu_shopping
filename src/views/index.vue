<!--首页 -->
<template>
    <div>
<!--   头部导航部分     -->
      <v-header></v-header>
<!--    轮播图    -->
      <div class="swiper-wrapper">
          <swiper :data="swiperDate"></swiper>    <!--将数据传入轮播图子组件的date属性-->
          <ul class="menus">
              <li v-for="(item, index) in menuDate" :key="index">
                  <!-- <a href="item.href">
                      {{item.name}}
                  </a> -->
                  <a href="javascript:" @click="goToCategory">
                      {{item.name}}
                  </a>
              </li>
          </ul>
      </div>
<!--    广告图    -->
      <ul class="post-wrapper clearfix">
          <li v-for="(item, index) in postData" :key="index">
              <a :href="item.href">
                  <img :src="item.imgUrl" alt="">
              </a>
          </li>
      </ul>
<!--    商品展示区    -->
      <div class="index-container">
          <div class="sale">
              <h3 class="title">热卖商品</h3>
              <goods-List :data="hotSaleData"></goods-List>
          </div>
      </div>
        <div class="index-container">
            <div class="sale">
                <h3 class="title">手机</h3>
                <ad-list :data="phoneAdData"></ad-list>
                <goods-List :data="phoneSaleData"></goods-List>
            </div>
        </div>
        <div class="index-container">
            <div class="sale">
                <h3 class="title">智能配件</h3>
                <ad-list :data="smartAdData"></ad-list>
                <goods-List :data="smartSaleData"></goods-List>
            </div>
        </div>
      <v-footer></v-footer>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import vHeader from '../components/header.vue'
import swiper from '../components/swiper.vue'
import goodsList from '../components/goodsList'
import adList from '../components/adList'
import vFooter from '../components/footer'

export default {
  name: 'index',
  // 获取的后台数据放置区
  data () {
    return {
      swiperDate: [],
      menuDate: [],
      postData: [],
      hotSaleData: [],
      phoneSaleData: [],
      smartSaleData: [],
      phoneAdData: [],
      smartAdData: []
    }
  },
  components: {
    vHeader,
    swiper,
    goodsList,
    adList,
    vFooter
  },
  mounted () {
    this.getSwiperDate()
    this.getMenDate()
    this.getPostData()
    this.getHotSaleData()
    this.getPhoneSaleData()
    this.getSmartSaleData()
    this.getPhoneAdData()
    this.getSamrtAdData()
  },
  methods: {
    // 获取轮播图数据
    async getSwiperDate () {
      const { data } = await axios.get('/advertise')
      this.swiperDate = data
    },
    // 获取轮播图菜单数据
    async getMenDate () {
      const { data } = await axios.get('/menu')
      this.menuDate = data
    },
    // 获取广告活动数据
    async getPostData () {
      const { data } = await axios.get('/post')
      this.postData = data
    },
    // 获取热卖商品数据
    async getHotSaleData () {
      const { data } = await axios.get('/hotSale')
      this.hotSaleData = data
    },
    // 获取手机商品数据
    async getPhoneSaleData () {
      const { data } = await axios.get('/phoneSale')
      this.phoneSaleData = data
    },
    // 获取智能配件数据
    async getSmartSaleData () {
      const { data } = await axios.get('/smartSale')
      this.smartSaleData = data
    },
    // 获取手机商品广告信息
    async getPhoneAdData () {
      const { data } = await axios.get('/phoneRecommend')
      this.phoneAdData = data
    },
    // 获取智能设备广告信息
    async getSamrtAdData () {
      const { data } = await axios.get('/smartRecommend')
      this.smartAdData = data
    },
    // 转跳到手机筛选页面
    goToCategory () {
      this.$router.push({
        name: 'Category'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*轮播图部分*/
    .swiper-wrapper{
        width: 1240px;
        height: 500px;
        position: relative;
        margin: 0 auto;

        .menus{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 303px;
            background-color: rgba(0,0,0,.5);
            padding-top: 17px;

            li{
                height: 57px;
                line-height: 57px;
            }

            a{
                font-size: 16px;
                padding-left: 40px;
                color: #fff;
                /*cursor: pointer;*/
                transition: color .3s;

                &:hover{
                    color: #31a5e7;
                }
            }
        }
    }
/*广告区*/
    .post-wrapper{
        width: 1240px;
        margin: 10px auto 50px;

        li{
            float: left;
            width: 303px;
            height: 180px;
            margin-right: 9px;

            a{
                transition: opacity .3s ease-in-out;

                &:hover{
                    opacity: .85;
                }
            }

            &:last-child{
                margin-right: 0;
            }
        }
    }
/*商品区*/
    .index-container{
        width: 1240px;
        margin: 0 auto;

        .title{
            font-size: 30px;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .sale{
            margin-bottom: 50px;
        }
    }

</style>
