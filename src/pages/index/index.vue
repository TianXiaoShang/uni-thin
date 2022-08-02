<template>
  <view>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar :title="'首页'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="true"
      :refresher-triggered="triggered"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      dddddddd
      <img :src="img1" alt="">
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import img1 from 'image/icon_sy1@2x.png';
export default {
  name: 'Index',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      img1,
      showLoading: false,
    }
  },
  onLoad() {
  },
  created() {
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
  }
}
</script>

<style lang="less" scoped>

</style>
