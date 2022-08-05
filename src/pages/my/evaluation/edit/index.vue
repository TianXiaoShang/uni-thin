<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack :title="'评价'" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="p-4 rounded-md mb-4 bg-white">
        <div class="flex items-center">
          <van-image round width="4rem" height="4rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="ml-2 flex flex-col justify-between">
            <div class="font-medium">ddd</div>
            <div class="text-gray-400">宇宙太阳系地球</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4">
        <div>您对老师满意吗？</div>
        <div class="my-4">
          <van-rate v-model="rate" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
        </div>
        <div class="bg-gray-500">
          <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入您的评价"
            :autosize="{ maxHeight: 300, minHeight: 200 }"
            :border="false"
          />
        </div>
        <van-checkbox v-model="hidden">匿名提交</van-checkbox>

        <van-button class="fixed bottom-0 left-0 right-0" type="primary" block>提交</van-button>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EvaluationEdit',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      value: null,
      rate: 0,
      message: '',
      hidden: false
    }
  },
  onLoad(options) {
    console.log(options)
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
