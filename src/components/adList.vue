<!-- 大图悬浮模块组件 -->
<template>
  <div class="clearfix">
    <div class="fl ad-list">
      <a :href="data[0] && data[0].href">
        <img class="ad-img" :src="data[0] && data[0].imgUrl" alt />
      </a>
    </div>
    <div class="fr">
      <div class="ad-right-top">
        <a :href="data[1] && data[1].href">
          <img class="ad-img" :src="data[1] && data[1].imgUrl" alt />
        </a>
      </div>
      <div class="clearfix">
        <div class="fl ad-right-bottom">
          <a :href="data[2] && data[2].href">
            <img class="ad-img" :src="data[2] && data[2].imgUrl" alt />
          </a>
        </div>
        <div class="fr ad-right-bottom">
          <a :href="data[3] && data[3].href">
            <img class="ad-img" :src="data[3] && data[3].imgUrl" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ad-list',
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
.ad-list {
  width: 615px;
  height: 450px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}

.ad-right-top {
  width: 616px;
  height: 220px;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}

.ad-right-bottom {
  width: 303px;
  height: 220px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}

.ad-img {
  width: 100%;
  height: 100%;
}
</style>
