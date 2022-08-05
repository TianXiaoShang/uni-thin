<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack :title="'我的关注'" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="bg-white">
        <van-search :value="value" shape="round" placeholder="请输入搜索内容" />
      </div>

      <div class="m-4">
        <div class="p-4 rounded-md mb-4 bg-white flex items-center justify-between">
          <div class="flex-1 flex">
            <van-image round width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="ml-2 flex flex-col justify-between flex-1">
              <div class="mb-2">
                <span class="font-medium truncate mr-2">ddd</span>
                <span class="text-gray-400 text-sm"><van-icon class="text-orange-400 mr-2" name="star" /> 5.0</span>
              </div>
              <div class="text-sm text-gray-400">宇宙太阳系地球</div>
            </div>
          </div>
          <van-button round size="small" plain type="primary">已关注</van-button>
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
