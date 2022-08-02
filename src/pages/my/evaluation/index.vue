<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar :title="'待评价'" :backgroundColor="'transparent'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="bg-white p-4">
        <van-search :value="value" shape="round" placeholder="请输入搜索内容" />
      </div>

      <div class="m-4">
        <div class="p-4 rounded-md mb-4 bg-white">
          <div class="flex items-center">
            <van-image round width="4rem" height="4rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="ml-2 flex flex-col justify-between">
              <div class="font-medium">ddd</div>
              <div class="text-gray-400">宇宙太阳系地球</div>
            </div>
          </div>
          <van-divider />
          <div class="text-right">
            <van-button type="primary" size="small" plain>去评价</van-button>
          </div>
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      value: null
    }
  },
  onLoad() {},
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
