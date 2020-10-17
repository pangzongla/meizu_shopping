<!--条件筛选区域组件-->
<template>
  <ul class="filter-box">
    <li class="box-item clearfix" v-for="(item, index) in data" :key="index">
      <div class="fl filter-title">{{item.name}}:</div>
      <ul class="fl">
        <li
          class="filter-item"
          :class="{'active': activeFilter[item.key] === info.value}"
          v-for="(info, ii) in item.queryList"
          :key="ii"
          @click="changeFiler(item.key,info.value)"
        >{{info.name}}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script type="text/javascript">
export default {
  name: 'filter-box',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    // 存放筛选的条件
    return {
      activeFilter: {}
    }
  },
  components: {},
  methods: {
    // 将筛选条件记录
    changeFiler (key, val) {
      this.$set(this.activeFilter, key, val)
      this.$emit('filter', this.activeFilter)
    }
  }
}
</script>

<style lang="less" scoped>
.filter-box {
  background-color: white;
  padding: 15px 10px;
  border: 1px solid #efefef;

  .box-item {
    line-height: 46px;
  }

  .filter-title {
    width: 85px;
    padding-left: 10px;
    white-space: nowrap;
    color: #333333;
    overflow: hidden;
  }

  .filter-item {
    cursor: pointer;
    margin-right: 62px;
    display: inline-block;

    &.active {
      color: #00c3f5;
    }
  }
}
</style>
