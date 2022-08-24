<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack :title="'待评价'" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      :scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="bg-white p-4">
        <van-search :value="keyword" shape="round" placeholder="请输入搜索内容" @search="onSearch" />
      </div>

      <div class="m-4">
        <div class="p-4 rounded-lg mb-4 bg-white">
          <div class="flex">
            <van-image round width="3rem" height="3rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="ml-2 flex flex-col justify-between">
              <div class="font-medium">ddd</div>
              <div class="text-gray-400 text-sm">宇宙太阳系地球</div>
            </div>
          </div>
          <van-divider />
          <div class="text-right">
            <van-button type="primary" size="small" plain @click="handleEdit">去评价</van-button>
          </div>
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCommentTask } from '@/apis'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      keyword: null,
      listData: [],
      pagination: {
        total: 0,
        page: 1
      }
    }
  },
  onLoad() {
    this.getData()
  },
  created() {},
  methods: {
    getData() {
      this.showLoading = true
      getCommentTask(this.keyword, this.pagination.page)
        .then((res) => {
          this.listData = res.data.list
          this.pagination.total = res.data.total || 0
        })
        .catch(() => {
          if (!this.pagination.page > 1) this.pagination.page -= 1
        })
        .finally(() => {
          this.showLoading = false
        })
    },
    onScrolltolower() {
      if (this.listData.length >= this.pagination.total) return
      this.pagination.page += 1
      this.getData()
    },
    onSearch(val) {
      this.keyword = val.detail
      this.onRefresh()
    },
    onRefresh() {
      this.pagination.page = 1
      this.getData()
    },
    handleEdit() {
      uni.navigateTo({
        url: `edit/index?id=${23}`,
        fail: (e) => {
          console.log(e)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
