<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack title="老师详情页" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="mb-2 bg-white rounded-lg p-4">
        <div class="mb-2 flex">
          <van-image round width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="ml-2 flex flex-col justify-between flex-1">
            <div class="flex">
              <div class="font-medium truncate">ddd</div>
              <div class="ml-2">
                <van-icon color="#ffce5d" name="star" />
                <span class="ml-2 text-gray-400">5.0</span>
              </div>
            </div>
            <div class="text-sm text-gray-400">宇宙太阳系地球</div>
          </div>
          <van-button round type="primary" icon="plus" size="small">关注</van-button>
        </div>
        <van-divider />
        <div class="text-sm">
          <span class="">简介：</span>
          <span class="text-gray-400">跑步跑步跑步跑步，跑步跑步跑步跑步</span>
        </div>
        <div class="text-sm mt-2">
          <span class="">擅长：</span>
          <span class="text-gray-400">跑步跑步跑步跑步，跑步跑步跑步跑步</span>
        </div>
        <div class="mt-2">
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
          <van-tag class="mr-2" type="primary">标签</van-tag>
        </div>
      </div>

      <div class="text-sm bg-white px-4 py-2">
        <div class="font-medium mb-4">评价（666）</div>
        <div v-for="(item, i) of 5" :key="i">
          <div>
            <div class="w-full flex items-start">
              <span class="text-gray-400 mr-2">匿名用户</span>
              <van-rate readonly :value="5" />
            </div>
            <div class="mt-2">dddddddddddddddddddddd</div>
            <div class="mt-2 text-gray-400 text-sm">2001-12-12</div>
          </div>
          <van-divider v-if="i < 4" />
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
