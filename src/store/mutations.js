// 同步的处理数据的方法
import Vue from 'vue'
const mutations = {
  // 向state.js传入选入购物车的商品信息
  ADD_SHOPCART (state, obj) { // state为state.js里的数据，obj为别的组件传入进来的数据
    let haveData = false
    state.shopcartData.forEach(item => { // 与每条数据进行对比
      if (item.id === obj.data.id) { // 商品已经存在购物车中
        haveData = true
        item.count += obj.num
      }
    })
    if (!haveData) {
      Vue.set(obj.data, 'count', obj.num) // 给传过来的数据添加一个字段来记录数量
      Vue.set(obj.data, 'checked', true) // 点击立即购买进入购物车页面后商品默认选中
      state.shopcartData.push(obj.data) // 将传入的数据添加到state中
    }
    // 处理完后放在shopcartdateLocal
    localStorage.setItem('shopcartdateLocal', JSON.stringify(state.shopcartData))
  },
  // 点击删除框删除商品
  DEL_SHOPCART (state, id) {
    state.shopcartData.forEach((item, index) => {
      if (item.id === id) {
        state.shopcartData.splice(index, 1)
      }
    })
  },
  // 增加数量
  INCREASE_SHOPCART (state, id) {
    state.shopcartData.forEach(item => {
      if (item.id === id) {
        item.count++
      }
    })
  },
  // 减少数量
  REDUCE_SHOPCART (state, id) {
    state.shopcartData.forEach(item => {
      if (item.id === id && item.count > 1) {
        item.count--
      }
    })
  },
  // 点击选中框选中或取消选中
  CHECK_GOODS (state, id) {
    state.shopcartData.forEach(item => {
      if (item.id === id) {
        item.checked = !item.checked
      }
    })
  },
  // 点击全部选中或全部都不选
  CHECK_ALL_GOODS (state, checked) {
    state.shopcartData.forEach(item => {
      item.checked = !checked
    })
  },
  // 移出已提交订单的购物车中的商品
  REMOVE_GOODS (state) {
    state.shopcartData = state.shopcartData.filter(item => !item.checked)
  }
}
export default mutations
