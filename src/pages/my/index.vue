<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loading" />
    <nav-bar :title="'个人中心'" :backgroundColor="'transparent'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="bg-white flex p-4 rounded-md items-center mb-4">
        <van-image round width="4rem" height="4rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="ml-2 flex flex-col justify-between">
          <div>雪茄</div>
          <div class="text-gray-400">ID:33333333</div>
        </div>
      </div>
      <van-cell-group inset>
        <van-cell title="待评价" is-link url="evaluation/index" ><span  class="rounded-full bg-red-500 text-white inline-flex justify-center items-center text-xs leading-none w-4 h-4" >6</span></van-cell>
        <van-cell title="我的收藏" is-link  url="collect/index"/>
        <van-cell title="我的关注" is-link url="attention/index" />
        <van-cell title="历史记录" is-link url="history/index" />
      </van-cell-group>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'My',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false
    }
  },
  onLoad() {},
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
