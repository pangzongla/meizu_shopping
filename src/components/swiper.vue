<!--写一个可以公用的轮播图组件-->
<template>
    <div class="swiper" :style="swiperSize">
        <ul class="swiper-ul" :style="ListWrapper" @transitionend="setDuration">
            <li class="swiper-List" v-for="(item, index) in data" :key="index">
                <a :href="item.href">
                    <img :src="item.imgUrl" :style="swiperSize" alt="">
                </a>
            </li>
            <!-- 在轮播图后插入一张第一张轮播图-->
            <li v-if="data.length > 1" class="swiper-List" :key="data.length + 1">
                <a :href="data[0].href">
                    <img :style="swiperSize" :src="data[0].imgUrl" alt="">
                </a>
            </li>
        </ul>
        <ul class="swiper-pagination">
            <li v-for="(item,index) in data" @click="changeImg(index)" :class="{'active':activeIndex === index}" :key="index"></li>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'swiper',
  // 轮播图的验证和设定默认值
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: Number,
      default: 1240
    },
    height: {
      type: Number,
      default: 500
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    // 可自定义轮播图区域的大小
    swiperSize () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    // 横排的轮播图自动播放效果
    ListWrapper () {
      return {
        width: `${(this.data.length + 1) * this.width}px`,
        height: `${this.height}px`,
        transform: `translateX(-${this.activeIndex * this.width}px)`,
        transitionDuration: this.haveDuration ? '.5s' : '' // 控制动画的过渡效果
      }
    }
  },
  data () {
    return {
      activeIndex: 0,
      timer: null,
      haveDuration: true // 决定是否断掉动画
    }
  },
  mounted () {
    this.setTimer()
  },
  methods: {
    // 轮播图自动播放机制
    setTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.activeIndex === (this.data.length)) {
          this.activeIndex = 0
          this.haveDuration = false
        } else {
          this.activeIndex++
          this.haveDuration = true
        }
      }, this.delay)
    },
    // 点击圆点换图片
    changeImg (index) {
      this.activeIndex = index
      this.haveDuration = true
      clearInterval(this.timer)
      this.setTimer()
    },
    // 轮播到最后一张重复的时候做的事
    setDuration () {
      if (this.activeIndex === this.data.length) {
        this.activeIndex = 0
        this.haveDuration = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .swiper {
        position: relative;
        overflow: hidden; //图片超出的部分不显示

        .swiper-ul{
            font-size: 0;
        }

        .swiper-List {
            display: inline-block;
        }

        .swiper-pagination {
            position: absolute;
            left: 45%;
            bottom: 20px;

            li {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin: 0 5px;
                background-color: white;
                cursor: pointer;

                &.active {
                    background-color: transparent;
                    border: 1px solid #fff;
                }
            }
        }
    }
</style>
