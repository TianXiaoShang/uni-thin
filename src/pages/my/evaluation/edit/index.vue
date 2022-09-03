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
      <div class="flex h-full flex-col">
        <div class="p-4 rounded-lg mb-4 bg-white">
          <div class="flex">
            <van-image round width="3rem" height="3rem" fit="cover" :src="evaluateData.avatar" />
            <div class="ml-2 flex flex-col justify-between">
              <div class="font-medium">{{ evaluateData.realname }}</div>
              <div class="text-gray-400 text-sm">{{ evaluateData.company }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 flex-1">
          <div>您对老师满意吗？</div>
          <div class="my-4">
            <van-rate
              :value="rate"
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              @change="handleRateChange"
            />
          </div>
          <div class="bg-gray-500">
            <van-field
              :value="message"
              type="textarea"
              placeholder="请输入您的评价"
              :autosize="{ maxHeight: 300, minHeight: 200 }"
              :border="false"
              @change="handleMessageChange"
            />
          </div>
          <van-checkbox :value="hidden" @change="handleHideChange">匿名提交</van-checkbox>

          <van-button
            :style="{ bottom: safeAreaBottom + 'px' }"
            class="fixed left-0 right-0"
            type="primary"
            block
            :loading="loading"
            @click="handleSubmit"
            >提交</van-button
          >
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { toEvaluate, getEvaluate } from '@/apis'
export default {
  name: 'EvaluationEdit',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      id: '',
      value: null,
      rate: 0,
      message: '',
      hidden: false,
      safeAreaBottom: 0,
      evaluateData: {},
      taskData: {}
    }
  },
  onLoad(options) {
    console.log(options)
    this.id = options.id
    this.safeAreaBottom = uni.getSystemInfoSync()?.safeAreaInsets?.bottom || 0
    this.getDetail()
  },
  created() {},
  methods: {
    getDetail() {
      getEvaluate(this.id).then((res) => {
        this.evaluateData = res.data.person
        this.taskData = res.data.task
      })
    },
    handleRateChange(e) {
      this.rate = e.detail
    },
    handleMessageChange(e) {
      this.message = e.detail
    },
    handleHideChange(e) {
      this.hidden = e.detail
    },
    handleSubmit() {
      if (!this.rate) {
        this.toast.fail('请打分')
        return
      }
      if (!this.message) {
        this.toast.fail('请输入评价')
        return
      }
      this.loading = true
      toEvaluate({
        task_id: this.taskData.id,
        grade: this.rate,
        content: this.message,
        is_anonymity: this.hidden ? 1 : 0
      })
        .then((res) => {
          this.toast.success('评价成功')
          uni.navigateBack({ delta: 1 })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
