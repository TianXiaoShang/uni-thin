<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar type='search' :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="m-4 bg-white rounded-lg p-4" @click="handleDetail">
        <div class="  mb-2  flex ">
          <van-image round  width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="ml-2 flex flex-col justify-between flex-1">
            <div class="font-medium truncate mb-2">ddd</div>
            <div class=" text-sm text-gray-400">宇宙太阳系地球</div>
          </div>
          <div class="">
            <van-icon color="#ffce5d" name="star" />
            <span class="ml-2 text-gray-400">5.0</span>
          </div>
        </div>
        <div>
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
        </div>
        <div class="text-sm mt-2">
          <span class="">擅长：</span>
          <span class="text-gray-400">跑步跑步跑步跑步，跑步跑步跑步跑步</span>
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
  methods: {
    handleDetail() {
      uni.navigateTo({ url: `detail/index`, fail: (e) => {console.log(e);} })
    }
  }
}
</script>

<style lang="less" scoped></style>
