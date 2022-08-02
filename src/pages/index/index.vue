<template>
  <view>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loading || loadDataLoading" />
    <nav-bar :title="'首页'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="true"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div v-for="(item, index) in list" :key="index">{{item}}</div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      list:[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,,1,1,1,1]
    }
  },
  onLoad() {
  },
  created() {
  },
  methods: {
    // 刷新和滚动至底部处理
    onRefresh() {
      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
    onScrolltolower() {
      // if ((this.currentPage + 1) * this.pageSize >= this.totalCount) {
      //   return;
      // }
      if (this.loadDataLoading) {
        return;
      }
      this.loadDataLoading = true;
      this.currentPage++;
      setTimeout(() => {
        this.loadDataLoading = false;
        this.list.push(...[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2])
      }, 1000);
    },
  }
}
</script>

<style lang="less" scoped>

</style>
