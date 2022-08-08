<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loading" />
    <nav-bar :title="'我的'" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="bg-white flex p-4 rounded-lg m-4">
        <van-image round width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="ml-2 flex flex-col justify-between">
          <div>雪茄</div>
          <div class="text-gray-400 text-sm">ID:33333333</div>
        </div>
      </div>
      <div class="m-4 rounded-lg overflow-hidden">
        <van-cell-group inset>
          <van-cell icon="/image/icon_pinglun@3x.png" title="待评价" is-link url="evaluation/index"
            ><span
              class="rounded-full bg-red-500 text-white inline-flex justify-center items-center text-xs leading-none w-4 h-4"
              >6</span
            ></van-cell
          >
          <van-cell icon="/image/icon_wodeshoucang@3x.png" title="我的收藏" is-link url="collect/index" />
          <van-cell icon="/image/icon_wodeguanzhu@3x.png" title="我的关注" is-link url="attention/index" />
          <van-cell icon="/image/icon_wodelishi@3x.png" title="历史记录" is-link url="history/index" />
        </van-cell-group>
      </div>
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
