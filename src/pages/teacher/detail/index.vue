<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack title="老师详情页" :backgroundColor="'transparent'" :titlePos="'center'"></nav-bar>

    <div class="mb-2 bg-white rounded-lg p-4">
      <div class="mb-2 flex">
        <van-image round width="3rem" height="3rem" fit="cover" :src="detailData.avatar" />
        <div class="ml-2 flex flex-col justify-between flex-1">
          <div class="flex">
            <div class="font-medium truncate">{{ detailData.realname }}</div>
            <div class="ml-2">
              <van-icon color="#ffce5d" name="star" />
              <span class="ml-2 text-gray-400">{{ detailData.grade }}</span>
            </div>
          </div>
          <div class="text-sm text-gray-400">{{ detailData.company }}</div>
        </div>
        <van-button
          v-if="detailData.is_attention == 0"
          round
          type="primary"
          icon="plus"
          size="small"
          @click="handleAttention"
          >关注</van-button
        >
        <van-button v-else round type="primary" size="small" @click="handleCancelAttention">取消关注</van-button>
      </div>
      <van-divider />
      <div class="text-sm">
        <span class="">简介：</span>
        <span>
          <u-parse :loading="false" :content="detailData.introductory" />
        </span>
      </div>
      <div class="text-sm mt-2">
        <span class="">擅长：</span>
        <span class="text-gray-400 whitespace-pre">{{ detailData.skilled }}</span>
      </div>
      <div class="mt-2">
        <van-tag v-for="id of detailData.group_id" :key="id" class="mr-2" type="primary">{{ id }}</van-tag>
      </div>
    </div>

    <div class="text-sm bg-white px-4 py-2">
      <div class="font-medium mb-4">评价（{{ pagination.total }}）</div>
      <scroll-view
        :refresher-enabled="false"
        :refresher-triggered="triggered"
        @refresherrestore="onRestore"
        @refresherrefresh="onRefresh"
        @scrolltolower="onScrolltolower"
        :scroll-y="true"
      >
        <!-- :style="{ height: `calc(${getScrollViewHeight()})` }" -->
        <div v-for="(item, i) of commentList" :key="item.id">
          <div>
            <div class="w-full flex items-start">
              <span class="text-gray-400 mr-2">{{ item.is_anonymity == 1 ? '匿名用户' : item.member_nickname }}</span>
              <van-rate readonly :value="item.grade" />
            </div>
            <div class="mt-2 whitespace-pre">{{ item.content }}</div>
            <div class="mt-2 text-gray-400 text-sm">{{ item.create_time | date }}</div>
          </div>
          <van-divider v-if="i < commentList.length - 1" />
        </div>
      </scroll-view>
    </div>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPersonDetail, getPersonComment, attentionPerson, cancelAttentionPerson } from '@/apis'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      showLoading: false,
      id: '',
      pagination: {
        total: 0,
        page: 1
      },
      detailData: {},
      commentList: []
    }
  },
  onLoad(opt) {
    this.id = opt.id
    this.getDetail()
    this.getComment()
  },
  created() {},
  methods: {
    getDetail() {
      getPersonDetail(this.id).then((res) => {
        this.detailData = res.data.person
      })
    },
    getComment() {
      this.showLoading = true
      getPersonComment(this.id, '', this.pagination.page)
        .then((res) => {
          this.commentList = res.data.list
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
      this.getComment()
    },
    onRefresh() {
      this.pagination.page = 1
      this.getComment()
    },
    handleAttention() {
      attentionPerson(this.id).then((res) => {
        if (res.errno == 1) {
          this.$notify({ type: 'success', message: '关注成功' })
          this.getDetail()
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
      })
    },
    handleCancelAttention() {
      cancelAttentionPerson(this.id).then((res) => {
        if (res.errno == 1) {
          this.$notify({ type: 'success', message: '取消关注成功' })
          this.getDetail()
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
