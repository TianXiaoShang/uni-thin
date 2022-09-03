<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack :title="'历史记录'" :backgroundColor="'white'" :titlePos="'center'"></nav-bar>
    <div class="bg-white p-4 flex">
      <van-search class="flex-1" :value="keyword" shape="round" placeholder="请输入搜索内容" @search="onSearch" />
      <div class="flex flex-col items-center ml-2" @click.stop="handleClear">
        <img class="w-5 h-5" src="/image/icon_qingkong@3x.png" alt="" />
        <span class="text-xs">清空</span>
      </div>
    </div>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      :scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight()} - 68px)` }"
    >
      <div class="p-4">
        <div class="mb-4" v-for="item of listData" :key="item.id" @click.stop="handleDetail(item.article_id)">
          <div class="p-4 rounded-lg mb-4 bg-white flex">
            <div class="mr-2 flex flex-col flex-1">
              <div class="font-medium truncate mb-2">{{ item.article_title }}</div>
              <div class="text-sm text-gray-400 text-content">
                <u-parse :loading="false" :content="item.article_content" />
              </div>
            </div>
            <van-image
              width="4rem"
              height="4rem"
              fit="cover"
              :src="
                item.article_image_mode == 0
                  ? item.article_across_picture && item.article_across_picture[0]
                  : item.article_vertical_picture && item.article_vertical_picture[0]
              "
            />
          </div>
        </div>
        <van-empty v-if="!listData.length" description="暂无数据" />
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHistory, clearVisit } from '@/apis'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      keyword: '',
      listData: [],
      pagination: {
        total: 0,
        page: 1
      }
    }
  },
  onLoad() {},
  onShow() {
    this.onRefresh()
  },
  created() {},
  methods: {
    getData() {
      this.showLoading = true
      getHistory(this.keyword, this.pagination.page)
        .then((res) => {
          const { list = [] } = res.data
          this.listData = [...this.listData, ...list]
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
      this.listData = []
      this.getData()
    },
    handleClear() {
      const beforeClose = (action) =>
        new Promise((resolve) => {
          if (action === 'confirm') {
            return clearVisit().then(
              (res) => {
                this.toast.success('清空历史成功')
                this.onRefresh()
                return resolve(true)
              },
              () => {
                return resolve(false)
              }
            )
          }
          resolve(true)
        })
      this.dialog.confirm({
        message: '确认清空历史记录?',
        beforeClose
      })
    },
    handleDetail(id) {
      uni.navigateTo({
        url: `/pages/index/example-detail/index?id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.text-content {
  display: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
  -webkit-box-orient: inherit; //必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
  text-overflow: ellipsis; //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
