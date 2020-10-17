<!--条件排序区域组件-->
<template>
  <div class="clearfix sort-box">
    <div class="fl sort-order">
      <a
        href="javascript:;"
        :class="{'active':activeSorKey==='recommend'}"
        @click="setSorKey('recommend')"
      >推荐</a>
      <a href="javascript:;" :class="{'active':activeSorKey==='new'}" @click="setSorKey('new')">新品</a>
      <a
        href="javascript:;"
        :class="{'active':activeSorKey==='low' || activeSorKey==='high'}"
        @click="changePrice"
      >
        价格
        <i class="icon-font arrow" :class="sortArrow"></i>
      </a>
    </div>
    <div class="fr">
      <input v-model="haveStock" type="checkbox" />
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: '',
  data () {
    return {
      activeSorKey: '',
      activePrice: 'low',
      haveStock: false
    }
  },
  computed: {
    // 改变价格箭头符号
    sortArrow () {
      if (this.activePrice === 'low') {
        return 'icon-down'
      } else {
        return 'icon-up'
      }
    }
  },
  watch: {
    //  监视，一旦打钩了，就会改变checkbox的状态
    haveStock (val) {
      this.$emit('getStock', val)
    }
  },
  mounted () {
    // 页面默认为推荐排序
    this.setSorKey('recommend')
  },
  methods: {
    // 向父组件页面传递排序信息
    setSorKey (val) {
      this.activeSorKey = val
      this.$emit('getKey', this.activeSorKey)
    },
    // 排序信息修改成价格排序
    changePrice () {
      if (this.activeSorKey === this.activePrice) {
        this.activePrice = this.activePrice === 'low' ? 'high' : 'low'
      }
      this.setSorKey(this.activePrice)
    }
  }
}
</script>

<style lang="less" scoped>
.sort-box {
  margin: 30px auto 20px;
  color: #666;

  .sort-order {
    a {
      margin-right: 50px;

      &:hover {
        color: #00c3f5;
        transition: all 0.2s;
      }

      &:hover,
      .arrow {
        display: inline;
      }
    }

    .arrow {
      display: none;
    }
  }
}
.active {
  color: #00c3f5;
  transition: all 0.2s;
}
</style>
