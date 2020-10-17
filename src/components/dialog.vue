<!--弹窗组件-->
<template>
  <transition name="dialog">
    <div class="dialog-mask" v-show="show">
      <div class="dialog-box">
        <div class="dialog-wrapper" :style="dialogBox">
          <div class="dialog-header" :class="{'dialog-title': title}">
            {{title}}
            <i class="dialog-close icon-font icon-close" @click="close"></i>
          </div>
          <div :style="dialogContent">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="confirmButtonShow || cancelButtonShow">
            <button
              v-show="confirmButtonShow"
              class="btn success wd100 "
              @click="confirm"
            >{{confirmButtonText}}</button>
            <button
              v-show="cancelButtonShow"
              class="btn cancel wd100 ml20"
              @click="cancel"
            >{{cancelButtonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vDialog',
  // 从外面传递要求
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    },
    // 弹窗高度
    height: {
      type: Number,
      default: 280
    },
    // 弹框宽度
    width: {
      type: Number,
      default: 760
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    },
    // 确认按键是否显示
    confirmButtonShow: {
      type: Boolean,
      default: true
    },
    // 取消按键是否显示
    cancelButtonShow: {
      type: Boolean,
      default: true
    },
    // 确认按键的文本
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    // 取消按键的文本
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    dialogBox () {
      return {
        width: `${this.width}px`
      }
    },
    dialogContent () {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    // 点击x时
    close () {
      this.$emit('update:show', false)
    },
    // 点击确认时
    confirm () {
      this.$emit('confirm')
    },
    // 点击取消时
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, 0.6);
  display: table;

  .dialog-box {
    display: table-cell;
    vertical-align: middle;
  }

  .dialog-wrapper {
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
  }

  .dialog-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px 4px 0 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    position: relative;
  }

  .dialog-title {
    border-bottom: 1px solid #efefef;
  }

  .dialog-close {
    position: absolute;
    right: 26px;
    top: 16px;
    color: #bdbdbd;
  }

  .dialog-footer {
    padding-bottom: 30px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .wd100 {
    width: 100px;
  }
}
.dialog-enter-active {
  transition: opacity 0.3s;
}
.dialog-enter {
  opacity: 0;
}
</style>
