<!--热门商品推荐区域-->
<template>
    <div>
        <!--标题部分-->
        <div class="clearfix recommend-header">
            <h3 class="fl title">推荐商品</h3>
            <div class="fr">
                <i class="icon-font icon-left pagination-item" @click="prev"
                   :class="{'disabled':activeIndex === 0}"></i>
                <i class="icon-font icon-right pagination-item" @click="next"
                   :class="{'disabled':activeIndex === pageSize}"></i>
            </div>
        </div>
        <!--商品展示部分-->
        <div class="recommend-content">
            <ul class="clearfix" :style="listWrapper">
                <li class="goods-list" v-for="(item, index) in data" :key="index"
                    :class="{'last-child': (index + 1) % 4 === 0}">
                    <a :href="item.href">
                        <img :src="item.goodsUrl" alt="">
                        <div class="goods-name">{{item.goodsName}}</div>
                        <div class="goods-desc">{{item.goodsDesc}}</div>
                        <div class="goods-price">
                            <i>￥</i>
                            {{item.goodsPrice}}
                            <span class="lower" v-if="item.lower">起</span>
                            <span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
                        </div>
                    </a>
                    <div v-if="item.newProduct" class="goods-new">新品</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'recommend-List',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 记录页数
      activeIndex: 0
    }
  },
  computed: {
    // 标签整体平移效果
    listWrapper () {
      return {
        width: `${(this.data.length) * 250}px`,
        transform: `translateX(-${this.activeIndex * 1240}px)`,
        transitionDuration: '.5s'
      }
    },
    // 计算一共多少页
    pageSize () {
      return Math.floor(this.data.length / 5)
    }
  },
  methods: {
    // 点击下一页记录页数+1
    prev () {
      if (this.activeIndex === 0) return
      this.activeIndex -= 1
    },
    // 点击上一页记录页数-1
    next () {
      if (this.activeIndex === this.pageSize) return
      this.activeIndex += 1
    }
  }
}
</script>

<style lang="less" scoped>
    .recommend-header {
        margin: 30px auto 10px;

        .title {
            font-size: 30px;
            font-weight: 400;
        }

        .pagination-item {
            display: inline-block;
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            color: #00c3f5;
            font-size: 12px;
            border: 1px solid #00c3f5;
            margin-left: 5px;

            &.disabled {
                color: #EFEFEF;
                border-color: #dcdcdc;
            }
        }
    }

    .recommend-content {
        width: 1240px;
        background-color: white;
        overflow: hidden;

        .goods-list {
            float: left;
            width: 220px;
            margin: 0 15px;
            padding: 34px 0 15px;
            background-color: #fff;
            cursor: pointer;
            transition: all .3s ease;
            position: relative;
            overflow: hidden;
            text-align: center;

            img {
                height: 180px;
                transition: all .3s ease 0s;

                &:hover {
                    transform: scale(1.2);
                }
            }

            &.last-child {
                margin-right: 0;
            }
        }

        .goods-name {
            margin-top: 20px;
            margin-bottom: 2px;
            color: #555757;
            font-size: 14px;
        }

        .goods-desc {
            font-size: 12px;
            color: #999;
        }

        .goods-price {
            position: relative;
            display: inline-block;
            padding-left: 14px;
            font-size: 16px;
            color: #c00;
            margin-top: 8px;

            i {
                font-style: normal;
                font-size: 12px;
                position: absolute;
                left: 0;
                top: 2px;
            }

            .lower {
                font-size: 16px;
            }

            .goods-oldprice {
                text-decoration: line-through;
                color: #666;
                font-size: 14px;
                margin-left: 8px;
            }
        }

        .goods-new {
            position: absolute;
            left: 30px;
            top: 30px;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-radius: 50%;
            background: linear-gradient(120deg, #2e74f6, #56bdf9);
            color: #fff;
        }
    }

</style>
