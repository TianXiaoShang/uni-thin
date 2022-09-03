<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack :title="'我的关注'" :backgroundColor="'white'" :titlePos="'center'"></nav-bar>
    <div class="bg-white p-4">
      <van-search :value="keyword" shape="round" placeholder="请输入搜索内容" @search="onSearch" />
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
        <div class="mb-4">
          <div
            v-for="item of listData"
            :key="item.id"
            class="p-4 rounded-lg mb-4 bg-white flex items-center justify-between"
          >
            <div class="flex-1 flex">
              <van-image round width="3rem" height="3rem" fit="cover" :src="item.person_avatar" />
              <div class="ml-2 flex flex-col justify-between flex-1">
                <div class="mb-2">
                  <span class="font-medium truncate mr-2">{{ item.person_nickname }}</span>
                  <span class="text-gray-400 text-sm"
                    ><van-icon class="text-orange-400 mr-2" name="star" />{{ 0 }}</span
                  >
                </div>
                <div class="text-sm text-gray-400">{{ item.person_company }}</div>
              </div>
            </div>
            <van-button round size="small" plain type="primary" @click.stop="handleAttention(item.person_id)"
              >已关注</van-button
            >
          </div>
        </div>
        <van-empty v-if="!listData.length" description="暂无数据" />
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAttention, cancelAttentionPerson } from '@/apis'
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
  onLoad() {
    this.getData()
  },
  created() {},
  methods: {
    getData() {
      this.showLoading = true
      getAttention(this.keyword, this.pagination.page)
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
    handleAttention(id) {
      const beforeClose = (action) =>
        new Promise((resolve) => {
          if (action === 'confirm') {
            return cancelAttentionPerson(id).then(
              (res) => {
                this.toast.success('取消关注成功')
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
        // title: '标题',
        message: '确认取消关注?',
        beforeClose
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
