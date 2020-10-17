// 公共计算属性逻辑
const getters = {
  // 购物车全选状态的判定
  isAllChecked (state) {
    let checked = true
    state.shopcartData.forEach(item => {
      // 遍历如果有没选中的返回一个false，全部选中返回默认true
      if (!item.checked) {
        checked = false
      }
    })
    return checked
  },
  // 购物车选中商品的总数量
  checkedGoodsTotal (state) {
    let total = 0
    state.shopcartData.forEach(item => {
      if (item.checked) {
        total += item.count
      }
    })
    return total
  },
  // 购物车中选中商品的总价格
  checkedGoodsPrice (state) {
    let total = 0
    state.shopcartData.forEach(item => {
      if (item.checked) {
        total += (item.count * item.goodsPrice)
      }
    })
    return total
  },
  // 购物车商品的总数量
  shopcartTotal (state) {
    let total = 0
    state.shopcartData.forEach(item => {
      total += item.count
    })
    return total
  }
}
export default getters
