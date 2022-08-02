
<template>
  <view>
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
      dddddddd
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
    }
  },
  onLoad() {
  },
  created() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
