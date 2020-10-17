// 存放公共数据
const state = {
  // shopcartData: []
  shopcartData: JSON.parse(localStorage.getItem('shopcartdateLocal')) || []
}
export default state
