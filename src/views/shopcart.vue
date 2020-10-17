<template>
    <div>
        <m-header></m-header>
        <div v-if="shopcartData.length > 0" class="shopcart-wrapper">
            <!-- 标题行 -->
            <table class="shopcart-header">
                <tr>
                    <td class="cart-select">
                        <input :checked="isAllChecked" @click="checkAllGoods" class="cart-checkbox" type="checkbox">
                        <span>全选</span>
                    </td>
                    <td class="cart-name">商品</td>
                    <td class="cart-price">单价(元)</td>
                    <td class="cart-num">数量</td>
                    <td class="cart-total">小计(元)</td>
                    <td class="cart-operate">操作</td>
                </tr>
            </table>
            <!-- 内容 -->
            <div class="shopcart-list">
                <table>
                    <tr v-for="(item, index) in shopcartData" :key="index" class="cart-product">
                        <td class="cart-select">
                            <input class="cart-checkbox" :checked="item.checked" @click="checkedGoods(item.id)"
                                   type="checkbox">
                            <img class="cart-img" :src="item.imageUrl" alt="">
                        </td>
                        <td class="cart-name">
                            <span class="cart-title">{{item.goodsName}}</span>
                            <span class="cart-desc">{{item.goodsDesc}}</span>
                        </td>
                        <td class="cart-price">￥{{item.goodsPrice}}</td>
                        <td class="cart-num">
                            <div class="cart-input clearfix">
                                <button class="fl" @click="reduce(item.id)">-</button>
                                <input class="fl" v-model="item.count" type="number">
                                <button class="fl" @click="increase(item.id)">+</button>
                            </div>
                        </td>
                        <td class="cart-total">￥{{item.count * item.goodsPrice}}</td>
                        <td class="cart-operate">
                            <i class="icon-font icon-close" @click="delGoods(item.id)"></i>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 结算 -->
            <div class="clearfix shopcart-footer">
                <div class="fl">
                    <input :checked="isAllChecked" @click="checkAllGoods" type="checkbox" class="cart-checkbox">
                    <span>全选</span>
                    <span class="footer-remove">删除选中的商品</span>
                    <span>共<span class="footer-number gray">{{shopcartTotal}}</span>件商品，已选<span
                            class="footer-number blue">{{checkedGoodsTotal}}</span>件商品</span>
                </div>
                <div class="fr">
                    <span>已优惠<span class="footer-number red">0.00</span>元，合计(不含运费)：<span
                            class="footer-number red footer-total">￥{{checkedGoodsPrice}}</span></span>
                    <a href="javascript:;" class="btn success" :class="{'cancel':checkedGoodsTotal <= 0}"
                       @click="goToOrder">去结算</a>
                </div>
            </div>
        </div>
        <!--购物车没有商品的显示页面-->
        <div v-else class="shopcart-empty">
            <div class="empty-content">
                <div class="empty-left"></div>
                <div class="empty-right">
                    <p class="empty-desc">购物车内还没有商品，赶紧去选购吧</p>
                    <a href="Javascript:;" class="btn success" @click="goToIndex">返回商城首页</a>
                </div>
            </div>
        </div>
        <m-footer></m-footer>
        <v-dialog :show.sync="dialogShow" title="提示" :width="500" @confirm="confirmDelete" @cancel="dialogShow = false">
            <div style="height: 120px; line-height: 120px">您确定删除该商品吗？</div>
        </v-dialog>
    </div>
</template>

<script type="text/javascript">
import mHeader from '../components/header'
import mFooter from '../components/footer'
import vDialog from '../components/dialog'
// import {mapMutations} from "vuex";
// import {mapGetters} from "vuex";
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'shopcart',
  data () {
    return {
      dialogShow: false,
      currentId: null
    }
  },
  components: {
    mFooter,
    mHeader,
    vDialog
  },
  computed: {
    // 获取state里的购物车公共数据
    shopcartData () {
      return this.$store.state.shopcartData
    },
    // 判断加入购物车的所有商品打钩的属性
    ...mapGetters([
      'isAllChecked',
      'checkedGoodsTotal',
      'checkedGoodsPrice',
      'shopcartTotal'
    ])
  },
  methods: {
    ...mapMutations([
      'INCREASE_SHOPCART',
      'REDUCE_SHOPCART',
      'CHECK_GOODS',
      'CHECK_ALL_GOODS',
      'DEL_SHOPCART'
    ]),
    // 点击数量加
    increase (id) {
      this.INCREASE_SHOPCART(id)
      // this.$store.commit("INCREASE_SHOPCART",id);  等效于
    },
    // 点击数量减
    reduce (id) {
      this.REDUCE_SHOPCART(id)
    },
    // 点击全选
    checkedGoods (id) {
      this.CHECK_GOODS(id)
    },
    // 点击全选或者全不选
    checkAllGoods () {
      this.CHECK_ALL_GOODS(this.isAllChecked)
    },
    // 点击删除
    delGoods (id) {
      this.dialogShow = true
      this.currentId = id
    },
    confirmDelete () {
      this.DEL_SHOPCART(this.currentId)
      this.dialogShow = false
    },
    // 回到首页
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    goToOrder () {
      this.$router.push({
        name: 'Order'
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .shopcart-wrapper {
        width: 1240px;
        margin: 10px auto;

        .shopcart-header {
            height: 50px;
            background-color: #fff;
            border-bottom: 1px solid #efefef;
            color: #333;
        }

        .cart-select {
            padding-left: 45px;
            text-align: left;
            width: 220px;

            .cart-img {
                width: 100px;
                height: 100px;
                margin-left: 35px;
                vertical-align: middle;
            }
        }

        .cart-checkbox {
            width: 18px;
            height: 18px;
            border-color: #bdbdbd;
            display: inline-block;
            background-color: #fff;
            border-radius: 2px;
            font-size: 10px;
            vertical-align: middle;
        }

        .cart-name {
            width: 270px;
            text-align: left;

            .cart-title {
                display: inline-block;
                width: 100%;
                overflow: hidden; //当文字描述过长时，可以不会影响到其他元素
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .cart-desc {
                color: #999;
            }
        }

        .cart-price {
            width: 220px;
            text-align: center;
        }

        .cart-num {
            width: 200px;
            text-align: center;
        }

        .cart-total {
            width: 160px;
            text-align: center;
        }

        .cart-operate {
            width: 170px;
            padding-right: 40px;
            text-align: right;
        }

        .shopcart-list {
            background-color: #fff;
            margin-bottom: 10px;
        }

        .cart-product {
            height: 150px;
            border-top: 1px solid #efefef;

            &:last-child {
                border-bottom: 1px solid #efefef;
            }
        }

        .cart-input {
            width: 140px;
            height: 38px;
            border: 1px solid #efefef;
            border-radius: 4px;
            margin: 0 auto;

            button {
                width: 38px;
                height: 38px;
                text-align: center;
                background: transparent;
                border: none;
                font-size: 20px;
                cursor: pointer;
            }

            input {
                width: 58px;
                height: 36px;
                border: none;
                border-left: 1px solid #efefef;
                border-right: 1px solid #efefef;
                text-align: center;
            }
        }

        .shopcart-footer {
            height: 70px;
            line-height: 70px;
            background-color: #fff;
            padding: 0 45px;
            color: #666;

            .footer-remove {
                color: #999;
                margin: 0 30px 0 20px;
            }

            .footer-number {
                font-weight: bold;
                margin: 0 5px;
            }

            .gray {
                color: #333;
            }

            .blue {
                color: #00c3f5;
            }

            .red {
                color: #e02b41;
            }

            .footer-total {
                font-size: 20px;
                margin-right: 35px;
            }
        }
    }

    .shopcart-empty {
        width: 1240px;
        margin: 10px auto;
        background-color: #fff;
        display: table;
        height: 360px;

        .empty-content {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        .empty-left {
            display: inline-block;
            width: 100px;
            height: 114px;
            background: url("../assets/images/shopcart.png") no-repeat;
            margin-right: 30px;
            vertical-align: middle;
        }

        .empty-right {
            display: inline-block;
            vertical-align: middle;
            text-align: left;
        }

        .empty-desc {
            color: #666;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
        }
    }
</style>
