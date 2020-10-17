<template>
  <div class='box'>
      <v-header></v-header>
      <p>抱歉，此页面待开发，请使用其他功能。</p>
      <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '../components/footer'
import vHeader from '../components/header'
export default {
  name: 'undeveloped',
  components: {
    vFooter,
    vHeader
  }
}
</script>
<style lang="less" scoped>
.box{
    height: 100vh;
    display: flex;
    flex-direction: column;
}
p {
    font-size: 35px;
    text-align: center;
    padding-top: 100px;
    flex: 1;
}
</style>
