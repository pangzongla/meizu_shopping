<!--   头部导航部分组件     -->
<template>
  <div class="header">
    <!--    导航标题固定部分    -->
    <div class="header-wrapper clearfix">
      <div class="header-logo fl" @click="goToIndex"></div>
      <div class="header-cart fr">
        <span class="icon-moon icon-cart" @click="goToShopcart">
          <div><p>{{checkedGoodsTotal}}</p></div>
        </span>
      </div>
      <div class="header-user fr">
        <span class="icon-moon icon-user"></span>
      </div>
      <div class="header-search fr">
        <input class="search-input" type="text" placeholder="点这填写搜索" />
        <span class="search-icon icon-moon icon-search"></span>
      </div>
      <!-- 导航标题 -->
      <ul class="header-nav fr">
        <li v-for="(item, index) in navData" :key="index" @mouseenter="showChildren(item)">
          <a class="nav-item" href="javascript:" @click="goToCategory">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <!--    悬浮模块    -->
    <transition name="nav">
      <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
        <div class="children-wrapper">
          <transition-group tag="ul" @enter="enter">
            <li
              class="children-item"
              v-for="(item, index) in childrenDate"
              :key="item.pic"
              :data-index="index"
            >
              <img :src="item.pic" alt />
              <p>{{item.name}}</p>
              <p>{{item.price}}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Velocity from 'velocity-animate'

export default {
  name: 'vHeader',
  data () {
    return {
      navData: [], // 存放后端传来的所有数据
      childrenDate: [], // 存放悬浮模块信息，是动态的，是对应name的children信息
      childrenShow: false // show的默认状态
    }
  },
  computed: {
    // 显示购物车现在有多少商品
    checkedGoodsTotal () {
      return this.$store.getters.checkedGoodsTotal
    }
  },
  mounted () {
    // 方法是不会自动执行的，需要用到这个。可以先理解为通常是为methods函数提前定义（ 类似提前声明变量 进入页面内容全部渲染完成后自动引函数）
    this.getNavData()
  },
  methods: {
    // 获取后端数据的方法
    async getNavData () {
      const { data } = await axios.get('/nav') // 通过代理服务器获取后端数据
      this.navData = data // 数据存放在navData
      // console.log (data);//测试数据接收成功了没
    },
    // 鼠标移入标题触发的方法
    showChildren (item) {
      this.childrenShow = true // 修改show的默认值，让悬浮模块显示
      // this.childrenShow = !this.childrenShow 切记不能为本值的取反，否则移入移出触发乱
      this.childrenDate = item.children // 把传入的悬浮模块信息存储
    },
    // 鼠标移开悬浮模块后
    hideChildren () {
      this.childrenShow = false // 悬浮模块隐藏
      this.childrenDate = [] // 清空是为了移出鼠标后再移入能够重新渲染dom节点，生成动画
    },
    // 悬浮模块的进入动画，每渲染一个li标签就执行一次
    enter (el) {
      // console.log(el);
      const timeOut = el.dataset.index * 150 // 给每一条设定渲染等待时间
      setTimeout(function () {
        Velocity(el, {
          // 这里写的是最终的效果，标签的初始样式要写在css中
          opacity: 1, // 不透明度
          translateX: '-50px' // 位移
        })
      }, timeOut)
    },
    goToCategory () {
      this.$router.push({
        name: 'Category'
      })
    },
    goToShopcart () {
      this.$router.push({
        name: 'Shopcart'
      })
    },
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*导航标题行 */
.header {
  width: 100%;
  background-color: white;
  position: relative;

  .header-wrapper {
    width: 1240px;
    margin: 0 auto;

    .header-logo {
      width: 140px;
      height: 26px;
      margin: 28px 0;
      cursor: pointer;
      background: url("../assets/images/logo.png") no-repeat center;
    }

    .header-cart,
    .header-user {
      padding: 29px 10px 0 20px;
      font-size: 24px;
      line-height: 1;

      span {
        cursor: pointer;
        position: relative;

        div {
          position: absolute;
          right: -10px;
          top: -10px;
          width: 16px;

          p {
            font-size: 12px;
            color: white;
            border-radius: 50%;
            background: #e02b41;
            text-align: center;
            line-height: 16px;
          }
        }
        &:hover {
          color: #31a5e7;
        }
      }

    }

    .header-search {
      width: 172px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 2px;
      position: relative;
      margin: 25px 0;

      .search-input {
        width: 127px;
        height: 20px;
        font-size: 12px;
        border: 0;
        outline: none;
        position: absolute;
        left: 5px;
        top: 6px;
      }

      .search-icon {
        font-size: 16px;
        position: absolute;
        right: 10px;
        top: 8px;
      }
    }
    /*导航标题*/
    .header-nav {
      margin-right: 20px;

      li {
        display: inline-block;
      }

      a.nav-item {
        display: inline-block;
        padding: 33px 20px;
        font-size: 16px;
        line-height: 1;
        cursor: pointer;
        transition: color 0.1s ease;

        &:hover {
          color: #31a5e7;
        }
      }
    }
  }
  /*悬浮模块*/
  .nav-children {
    width: 100%;
    height: 156px;
    background-color: white;
    // 这里绝对定位是为了不影响外界排布
    position: absolute;
    left: 0;
    top: 82px;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1;

    .children-wrapper {
      width: 1240px;
      padding-left: 150px;
      margin: 0 auto;
    }

    .children-item {
      opacity: 0; //配合valocity动画，从透明度0到1过渡
      width: 136px;
      height: 145px;
      display: inline-block;
      text-align: center;
      font-size: 12px;
      color: #666;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }
  /*transition的动画效果*/
  .nav-enter-active {
    height: 156px;
    transition: height 0.3s ease-in-out;
  }

  .nav-enter {
    height: 0;
  }

  .nav-leave-active {
    height: 0px;
    transition: height 0.2s ease-in-out;
  }

  .nav-leave {
    height: 156px;
  }
}
</style>
