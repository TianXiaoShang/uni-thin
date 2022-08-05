<template>
  <view class="page-wrap">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loading || loadDataLoading" />
    <nav-bar :title="'首页'" :backgroundColor="'#ED6C36'" :theme="'dark'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      class="page-container box-border bg-gray-100 w-full min-h-full mt-10px rounded-t-3xl"
      :style="{ height: `calc(${getScrollViewHeight(true, true, true, 10)})` }"
    >
      <div class="white" :style="{top: `${statusBarHeight + navBarHeight + 10}px`}"></div>
      <div class="w-full p-15px box-border relative z-999">
        <div class="swiper rounded-xl overflow-hidden">
          <swiper
            class="w-full box-border rounded-xl"
            style="height: 220rpx"
            circular
            :autoplay="true"
            :interval="30000"
            :duration="1000"
          >
            <swiper-item @click="toExample">
              <img style="height: 220rpx" class="w-full overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
            </swiper-item>
            <swiper-item @click="toExample">
              <img style="height: 220rpx" class="w-full overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
            </swiper-item>
            <swiper-item @click="toExample">
              <img style="height: 220rpx" class="w-full overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
            </swiper-item>
          </swiper>
        </div>
        <div class="img-list box-border w-full" style="font-size: 0;">
          <img style="height: 270rpx" class="mt-10px w-full rounded-xl overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
          <img style="height: 270rpx" class="mt-10px w-full rounded-xl overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
          <img style="height: 270rpx" class="mt-10px w-full rounded-xl overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
          <img style="height: 270rpx" class="mt-10px w-full rounded-xl overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
          <img style="height: 270rpx" class="mt-10px w-full rounded-xl overflow-hidden" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { getStatusBarInfo } from '@/util/index.js'
import { mapGetters } from 'vuex';
export default {
  name: 'Index',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      statusBarHeight: 20 /* 状态栏高度 */,
      navBarHeight: 45 /* 导航栏高度 */,
    }
  },
  onLoad() {
  },
  created() {
    const { statusBarHeight, navBarHeight } = getStatusBarInfo()
    this.statusBarHeight = statusBarHeight
    this.navBarHeight = navBarHeight
  },
  methods: {
    toExample(){
      uni.navigateTo({
        url: '/pages/index/example/index'
      })
    }
    
  }
}
</script>

<style lang="less" scoped>
.white{
  left: 0;
  background: #fff;
  width: 100%;
  height: 200rpx;
  border-radius: 1.5rem;
  position: fixed;
}
.page-wrap{
  background: #ED6C36;
}
.page-container{
  position: relative;
}
</style>
