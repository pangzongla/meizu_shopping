<template>
    <div>
        <v-header></v-header>
        <div class="category-wrapper">
            <div class="bread">
                <span>首页</span>
                <span class="arrow"> > </span>
                <span>全部</span>
                <span class="arrow"> > </span>
                <span class="last-bread">手机</span>
            </div>
            <!--  条件筛选区域  -->
            <filter-box :data="filterListData" @filter="getQuery"></filter-box>
            <!--  推荐、新品、价格排序区域  -->
            <sort-box @getKey="getSortKey" @getStock="getSortStock"></sort-box>
            <!--  筛选商品展示部分  -->
            <category-list @clickItem="goToDetail" :data="categoryListData"></category-list>
            <!--  热卖商品推荐  -->
            <recommend-list :data="recommendListData"></recommend-list>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/footer'
import categoryList from '../components/categoryList'
import filterBox from '../components/filterBox'
import sortBox from '../components/sortBox'
import recommendList from '../components/recommendList'

export default {
  name: 'category',
  data () {
    return {
      // 所有商品的详细数据
      categoryListData: [],
      categoryListCopy: [],
      // 条件筛选数据
      filterListData: [],
      // 热门商品其他推荐的数据
      recommendListData: [],
      // 条件筛选组件发过来的筛选信息
      currentQuery: null,
      currentStock: null,
      currentKey: null
    }
  },
  components: {
    vFooter,
    vHeader,
    categoryList,
    filterBox,
    sortBox,
    recommendList
  },
  mounted () {
    this.getCategoryListData()
    this.getFilterListData()
    this.getRecommendListData()
  },
  methods: {
    // 获取所有商品的详细数据
    async getCategoryListData () {
      const { data } = await axios.get('/categoryList')
      this.categoryListData = data
      this.categoryListCopy = [].concat(data)
    },
    // 获取条件筛选区域的数据
    async getFilterListData () {
      const { data } = await axios.get('/queryList')
      this.filterListData = data
    },
    // 获取热门商品其他推荐的数据
    async getRecommendListData () {
      const { data } = await axios.get('/smartSale')
      this.recommendListData = data
    },
    // 接收条件筛序的信息
    getQuery (val) {
      this.currentQuery = val
      this.sortGoods()
    },
    // 接收推荐、新品、价格排序的信息
    getSortKey (key) {
      this.currentKey = key
      this.sortGoods()
    },
    // 接收子组件是否有货的信息
    getSortStock (val) {
      this.currentStock = val
      this.sortGoods()
    },
    // 排序机制
    sortGoods () {
      // 先把存放的全部手机数据恢复到获取时的状态
      this.categoryListData = [].concat(this.categoryListCopy)
      if (this.currentQuery) {
        Object.keys(this.currentQuery).forEach((key) => {
          if (this.currentQuery[key]) {
            this.categoryListData = this.categoryListData.filter((item) => {
              return item.features.indexOf(this.currentQuery[key]) >= 0
            })
          }
        })
      }
      // 把是否有货信息筛选出来
      if (this.currentStock) {
        this.categoryListData = this.categoryListData.filter((item) => {
          return item.available // 返回是否有货
        })
      }
      // 推荐、新品、价格条件排序顺序调整
      if (this.currentKey) {
        // 按推荐
        if (this.currentKey === 'recommend') {
          this.categoryListData.sort((a, b) => {
            return b.shelveTime - a.shelveTime // 排序其中一个属性，整个元素会相应的进行排列
          })
          // 按新品
        } else if (this.currentKey === 'new') {
          this.categoryListData.sort((a, b) => {
            return b.publishedTime - a.publishedTime
          })
          // 按价格低开始
        } else if (this.currentKey === 'low') {
          this.categoryListData.sort((a, b) => {
            return b.goodsPrice - a.goodsPrice
          })
          // 按价格高开始
        } else if (this.currentKey === 'high') {
          this.categoryListData.sort((a, b) => {
            return a.goodsPrice - b.goodsPrice
          })
        }
      }
    },
    goToDetail (item) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: item.id// 给网址添加id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .category-wrapper {
        width: 1240px;
        margin: 0 auto;
        padding-bottom: 60px;

        .bread {
            height: 40px;
            line-height: 40px;

            .arrow, .last-bread {
                color: #999;
            }
        }
    }
</style>
