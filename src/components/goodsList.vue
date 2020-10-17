<!--商品悬浮展示组件-->
<template>
  <ul class="clearfix">
    <li
      class="goods-list"
      v-for="(item,index) in data"
      :key="index"
      :class="{'last-child':(index + 1)%4 === 0}"
    >
      <router-link to="/item.href">
        <img class="goods-img" :src="item.goodsUrl" alt />
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-desc">{{item.goodsDesc}}</div>
        <div class="goods-price">
          <i>￥</i>
          {{item.goodsPrice}}
          <span class="lower" v-if="item.lower">起</span>
          <span class="goods-oldPrice" v-if="item.oldPrice">{{item.oldPrice}}</span>
        </div>
      </router-link>
      <div v-if="item.newProduct" class="goods-new">新品</div>
    </li>
  </ul>
</template>

<script type="text/javascript">
export default {
  name: 'goods-List',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  float: left;
  width: 303px;
  height: 400px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-top: 10px;
  margin-right: 9px;
  overflow: hidden;
  text-align: center;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); //阴影悬浮效果
  }

  &.last-child {
    margin-right: 0;
  }
}

.goods-img {
  height: 230px; //只设高度，让宽度自动，防止拉伸变形
  margin-top: 30px;
}

.goods-name {
  margin-top: 30px;
  margin-bottom: 2px;
  color: #333;
  font-size: 16px;
}

.goods-desc {
  font-size: 14px;
  color: #999;
}

/*价格样式*/
.goods-price {
  position: relative;
  display: inline-block;
  padding-left: 14px;
  font-size: 22px;
  color: #c00;

  i {
    font-style: normal; //除去倾斜的效果
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 5px;
  }

  .lower {
    font-size: 16px;
  }

  .goods-oldPrice {
    text-decoration: line-through; //划线
    color: #666;
    font-size: 14px;
    margin-left: 8px;
  }
}

/*新品提示样式*/
.goods-new {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50%;
  background: linear-gradient(120deg, #2e74f6, #56bdf9); //渐变色
  color: #fff;
}
</style>
