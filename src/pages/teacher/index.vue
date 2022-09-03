<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar type="search" :titlePos="'center'" @search="onSearch"></nav-bar>
    <div class="tabs-list w-full box-border pr-42px overflow-y-hidden whitespace-nowrap overflow-x-scroll bg-white">
      <div
        v-for="item of teamTags"
        :key="item.id"
        class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm"
        :class="{ active: activeTag === item.id }"
        @click="handleTag(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      :scroll-y="true"
      :style="{ height: `calc(${getScrollViewHeight(true, true, true, 26)})` }"
    >
      <div class="p-4">
        <div
          class="mb-4 bg-white rounded-lg p-4"
          @click="handleDetail(item.id)"
          v-for="item of listData"
          :key="item.id"
        >
          <div class="mb-2 flex">
            <van-image round width="3rem" height="3rem" fit="cover" :src="item.avatar" />
            <div class="ml-2 flex flex-col justify-between flex-1">
              <div class="font-medium truncate mb-2">{{ item.realname }}</div>
              <div class="text-sm text-gray-400">{{ item.company }}</div>
            </div>
            <div class="">
              <van-icon color="#ffce5d" name="star" />
              <span class="ml-2 text-gray-400">{{ item.grade | toFixed }}</span>
            </div>
          </div>
          <div>
            <van-tag v-for="id of item.group_id" :key="id" class="mr-2" type="primary">{{
              teamGroupMap[id].title
            }}</van-tag>
          </div>
          <div class="text-sm mt-2">
            <span class="">擅长：</span>
            <span class="text-gray-400 whitespace-pre-wrap">{{ item.skilled }}</span>
          </div>
        </div>
        <van-empty v-if="!listData.length" description="暂无数据" />
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTeamList, getTeamOther } from '@/apis'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters(['teamGroupMap'])
  },
  data() {
    return {
      showLoading: false,
      keyword: '',
      listData: [],
      teamTags: [],
      activeTag: '',
      pagination: {
        total: 0,
        page: 1
      }
    }
  },
  onLoad() {
    this.init()
  },
  created() {},
  methods: {
    init() {
      getTeamOther().then((res) => {
        const group = res.data.group || {}
        const arr = Object.keys(group).map((k) => group[k])
        this.teamTags = arr

        this.$store.commit('UPDATE_TEAM_GROUP', arr)
        // this.activeTag = arr[0]?.id
      })
      this.getData()
    },
    getData() {
      this.showLoading = true
      getTeamList(this.activeTag, this.keyword, this.pagination.page)
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
      this.keyword = val
      this.onRefresh()
    },
    onRefresh() {
      this.pagination.page = 1
      this.listData = []
      this.getData()
    },
    handleTag(id) {
      this.activeTag = id == this.activeTag ? '' : id
      this.onRefresh()
    },
    handleDetail(id) {
      uni.navigateTo({
        url: `detail/index?id=${id}`,
        fail: (e) => {
          console.log(e)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background: #ed6c36;
  color: white;
}
</style>
