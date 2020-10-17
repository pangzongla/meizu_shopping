<!--筛选商品展示区域的展示图片组件-->
<template>
  <div :class="{'images-wrapper':type === 'small','images-wrapper_big':type === 'big'}">
    <!--大图片-->
    <img class="img" :src="data[activeIndex]" alt />
    <!--小图选择-->
    <ul class="imgs">
      <li
        class="images-item"
        :class="{'active': activeIndex === index}"
        v-for="(item, index) in data"
        @click.stop="changeImage(index)"
        :key="index"
      >
        <img :src="item" alt />
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'images-list',
  data () {
    return {
      activeIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    // 点击小图同步大图
    changeImage (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.images-wrapper {
  text-align: center;

  .img {
    height: 230px;
    margin-top: 20px;
  }

  .imgs {
    overflow: hidden;
    margin: 13px auto 15px;

    .images-item {
      display: inline-block;
      width: 43px;
      height: 43px;
      border-radius: 4px;
      border: 1px solid #efefef;
      margin: 0 4px;
      cursor: pointer;
      box-sizing: border-box;

      &.active {
        border-color: #00c3f5;
        border-width: 2px;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
/*商品详情的大图片展示*/
.images-wrapper_big {
  text-align: center;

  .img {
    height: 375px;
    margin: 20px auto;
  }

  .imgs {
    overflow: hidden;
    margin-top: 10px;

    .images-item {
      display: inline-block;
      width: 75px;
      height: 75px;
      border-radius: 4px;
      border: 1px solid transparent;
      margin: 0 5px;
      cursor: pointer;

      &.active {
        border-color: #dcdcdc;
      }

      img {
        width: 75px;
        height: 75px;
      }
    }
  }
}
</style>
