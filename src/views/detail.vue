<!--商品详情页面-->
<template>
    <div class="bg-white">
        <v-header></v-header>
        <div class="detail-wrapper">
            <div class="bread">
                <span>首页</span>
                <span class="arrow"> > </span>
                <span>全部</span>
                <span class="arrow"> > </span>
                <span class="last-bread">手机</span>
            </div>
            <!--商品界面-->
            <div class="clearfix">
                <!--大图展示-->
                <div class="fl detail-images">
                    <images-list :data="infoData.colorImageUrls" type="big"></images-list>
                </div>
                <!--详细操作-->
                <div class="fl detail-props">
                    <h1 class="prop-title">{{infoData.goodsName}}</h1>
                    <p class="prop-desc">{{infoData.goodsDesc}}</p>
                    <div class="prop-sale">
                        <span class="prop-name">价<span class="prop-space"></span>格:</span>
                        <span class="prop-price">￥{{infoData.goodsPrice}}</span>
                    </div>
                    <div>
                        <span class="prop-name">支<span class="prop-space"></span>持：</span>
                        <ul class="service-list">
                            <li class="list-item"><i class="icon-font icon-check-circle"></i>百城速达</li>
                            <li class="list-item"><i class="icon-font icon-check-circle"></i>顺丰包邮</li>
                            <li class="list-item"><i class="icon-font icon-check-circle"></i>七天无理由退货</li>
                        </ul>
                    </div>
                    <div>
                        <span class="prop-name">服<span class="prop-space"></span>务：</span>
                        <span>本商品由 魅族 负责发货并提供售后服务</span>
                    </div>
                    <div>
                        <span class="prop-name">数<span class="prop-space"></span>量：</span>
                        <div class="clearfix prop-number">
                            <input class="fl prop-input" v-model="purchaseQuantity" type="number">
                            <div class="fl change-box">
                                <div class="change-value" @click="increase">+</div>
                                <div class="change-value" @click="reduce">-</div>
                            </div>
                        </div>
                    </div>
                    <div class="prop-buy">
                        <a href="javascript:" class="btn danger mr20" @click="purchase">立即购买</a>
                        <a href="javascript:" class="btn success mr20" @click="addShopcart">加入购物车</a>
                    </div>
                </div>
            </div>
            <!--商品详情图片-->
            <div class="detail-info_wrapper">
                <div class="detail-info">
                    <a href="" class="info-title">商品详情</a>
                </div>
                <img class="detail-images" :src="item" alt="" v-for="(item, index) in infoData.information"
                     :key="index">
            </div>
        </div>
        <v-footer></v-footer>
        <!--弹窗内容-->
        <v-dialog :show.sync="dialogShow" :width="360" :height="80" :confirm-button-show="false" :cancel-button-show="false">
            <div>
                <i class="icon-font icon-check-circle add-sucess"></i>成功加入购物车
            </div>
            <a class="go-shopcart" href="javascript:;" @click="goToShopcart">进入购物车</a>
        </v-dialog>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/footer'
import imagesList from '../components/imagesList'
import vDialog from '../components/dialog'

export default {
  name: 'detail',
  data () {
    return {
      infoData: {},
      purchaseQuantity: 1,
      dialogShow: false
    }
  },
  components: {
    vHeader,
    vFooter,
    imagesList,
    vDialog
  },
  mounted () {
    this.getDetail(this.$route.params.id)
  },

  methods: {
    // 获取商品详情信息
    async getDetail (id) {
      const { data } = await axios.get(`/categoryList/${id}`)
      this.infoData = data
    },
    // 增加数量
    increase () {
      this.purchaseQuantity = parseInt(this.purchaseQuantity) + 1 // 因为输入框可能识别的是字符串，所以需要强制转换成数字
    },
    // 减少数量
    reduce () {
      if (this.purchaseQuantity > 1) {
        this.purchaseQuantity = parseInt(this.purchaseQuantity) - 1
      }
    },
    // 加入购物车逻辑
    addShopcart () {
      this.$store.commit('ADD_SHOPCART', { // 向store里的mutation.js提交数据
        data: this.infoData, // 商品详细信息
        num: parseInt(this.purchaseQuantity) // 商品数量
      })
      this.dialogShow = true // 弹出提示
    },
    // 点击购买
    purchase () {
      this.$store.commit('ADD_SHOPCART', { // 向store里的mutation.js提交数据
        data: this.infoData, // 商品详细信息
        num: parseInt(this.purchaseQuantity)// 商品数量
      })
      this.goToShopcart()
    },
    // 网址添加到购物车的路由
    goToShopcart () {
      this.$router.push({
        name: 'Shopcart'
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .bg-white {
        background-color: white;
    }

    .bread {
        height: 40px;
        line-height: 40px;

        .arrow, .last-bread {
            color: #999;
        }
    }

    .detail-wrapper {
        width: 1240px;
        margin: 0 auto;

        .detail-images {
            width: 495px;
        }

        .detail-props {
            width: 675px;
            font-size: 12px;

            .prop-title {
                font-size: 24px;
                font-weight: 400;
                color: #000;
                margin-bottom: 10px;
            }

            .prop-desc {
                font-size: 16px;
                color: #e22841;
                margin-bottom: 15px;
            }

            .prop-name {
                padding: 0 10px;
                line-height: 34px;

                .prop-space {
                    padding: 0 12px;
                }
            }

            .prop-sale {
                height: 55px;
                background-color: #f5f5f5;
                margin-bottom: 26px;

                .prop-price {
                    font-size: 24px;
                    color: #e02b41;
                    line-height: 55px;
                }
            }

            .service-list {
                display: inline-block;

                .list-item {
                    display: inline-block;
                    margin-right: 20px;

                    i {
                        margin-right: 5px;
                        color: #00c3f5;
                    }
                }
            }

            .prop-number {
                display: inline-block;
                vertical-align: middle;

                .prop-input {
                    width: 53px;
                    height: 38px;
                    line-height: 38px;
                    border: 1px solid #dcdcdc;
                    color: #333;
                    text-align: center;
                }

                .change-box {
                    margin-left: 6px;
                }

                .change-value {
                    width: 20px;
                    height: 16px;
                    font-size: 14px;
                    color: #666;
                    border: 1px solid #dcdcdc;
                    line-height: 14px;
                    cursor: pointer;
                    text-align: center;

                    &:last-child {
                        margin-top: 6px;
                    }
                }
            }

            .prop-buy {
                margin-top: 17px;
            }

            .mr20 {
                margin-right: 20px;
            }
        }

        /*商品详情图片*/

        .detail-info_wrapper {
            font-size: 0;
            margin-top: 60px;
            margin-bottom: 80px;

            .detail-info {
                height: 62px;
                border-bottom: 1px solid #dcdcdc;
            }

            .info-title {
                font-size: 16px;
                height: 62px;
                line-height: 62px;
                color: #00c3f5;
                border-bottom: 1px solid #00c3f5;
                padding: 0 20px;
                margin-bottom: -1px;
                box-sizing: border-box;
                display: inline-block;
            }

            .detail-images {
                width: 1240px;
            }
        }
    }
    .add-sucess{
        color: #00c3f5;
        margin-right: 5px;
    }
    .go-shopcart{
        color: #00c3f5;
        text-decoration: underline;
    }
</style>
