<template>
  <view class="navbar" v-if="!blankBar">
    <view class="navbar-fixed" :style="{ background: backgroundColor }">
      <!-- 状态栏小程序撑起高度 -->
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <view class="content-wrap" v-if="!justStatusBar">
        <view class="navbar-content" :style="{ height: navBarHeight + 'px', width: contentWidth + 'px' }">
          <!-- 返回按钮 -->
          <view class="back-btn" v-if="showBack && backType == 'arrows'" @click="back">
            <van-icon v-if="theme === 'light'" name="arrow-left" size="22px"/>
            <van-icon v-if="theme === 'dark'" name="arrow-left" size="22px" color="#fff"/>
          </view>
          <!-- 返回首页按钮 -->
          <view class="back-btn" v-if="showBack && backType == 'home'" @click="backHome">
            <van-icon name="wap-home" size="22px" />
          </view>
          <!-- 中间内容区域 -->
          <view class="content">
            <!-- title -->
            <view
              class="title"
              :class="{ 'title-center': titlePos === 'center' }"
              v-if="type === 'title'"
              :style="{ 'text-align': titlePos, color: color }"
              >{{ title }}</view
            >
            <!-- 搜索 -->
            <search v-if="type === 'search'" :placeholder="placeholder" @search="search($event)"></search>
            <!-- 支持插槽 -->
            <slot></slot>
          </view>
        </view>
      </view>
    </view>
    <!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）-->
    <view :style="{ height: statusBarHeight + (justStatusBar ? 0 : navBarHeight) + 'px' }"></view>
  </view>
</template>

<script>
import Search from '@/component/search'
import { getStatusBarInfo } from '@/util/index.js'

export default {
  name: 'Navbar',
  computed: {
    color() {
      if (this.theme === 'light') {
        return '#333'
      }
      if (this.theme === 'dark') {
        return '#fff'
      }
      return '#333'
    }
  },
  components: { Search },
  props: {
    // 是否展示返回键
    showBack: {
      type: Boolean,
      default: false
    },
    backType: {
      type: 'arrows' | 'home',
      default: 'arrows'
    },
    // 类型
    type: {
      type: 'search' | 'title',
      default: 'title'
    },
    // title文字内容
    title: {
      type: String,
      default: ''
    },
    // 搜索组件的placeholder
    placeholder: {
      type: String,
      default: '搜索'
    },
    // title的位置
    titlePos: {
      type: 'left' | 'center',
      default: 'center'
    },
    // 空白导航，只有胶囊
    blankBar: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      statusBarHeight: 20 /* 状态栏高度 */,
      navBarHeight: 45 /* 导航栏高度 */,
      contentWidth: 375 /* 窗口宽度 */
    }
  },
  created() {
    const { statusBarHeight, navBarHeight, contentWidth } = getStatusBarInfo()
    this.statusBarHeight = statusBarHeight
    this.navBarHeight = navBarHeight
    this.contentWidth = contentWidth
  },
  methods: {
    back() {
      uni.navigateBack()
    },
    backHome() {
      uni.reLaunch({ url: '/pages/index/index' })
    },
    search(val) {
      this.$emit('search', val)
    }
  }
}
</script>

<style lang="less">
.navbar {
  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    .content-wrap {
      width: 100%;
      position: relative;
      .navbar-content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 30rpx;
        height: 45px;
        box-sizing: border-box;
        .custom-btn {
          margin-right: 10px;
          font-size: 0;
          width: 24px;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .back-btn {
          // padding: 0 5rpx;
          margin-right: 10px;
          font-size: 20px;
          width: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 12px;
            height: 24px;
          }
        }
        .city {
          margin-right: 10px;
          .city-name {
            margin-right: 4px;
          }
          img {
            font-size: 0;
            width: 14px;
            height: 14px;
            transform: rotate(270deg);
          }
        }
        .content {
          flex: 1;
          .title {
            padding: 0 18rpx;
            padding-left: 0;
            font-size: 18px;
            font-weight: 500;
          }
          .title-center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
