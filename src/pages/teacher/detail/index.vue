<template>
  <view class="bg-gray-50">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="showLoading" />
    <nav-bar showBack title="老师详情页" :backgroundColor="'white'" :titlePos="'center'"></nav-bar>

    <div class="flex flex-col overflow-hidden" :style="{ height: `calc(${containerHeight})` }">
      <div class="mb-2 bg-white rounded-lg p-4">
        <div class="mb-2 flex">
          <van-image round width="3rem" height="3rem" fit="cover" :src="detailData.avatar" />
          <div class="ml-2 flex flex-col justify-between flex-1">
            <div class="flex">
              <div class="font-medium truncate">{{ detailData.realname }}</div>
              <div class="ml-2">
                <van-icon color="#ffce5d" name="star" />
                <span class="ml-2 text-gray-400">{{ detailData.grade | toFixed }}</span>
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
          <div class="max-h-15vh overflow-y-scroll" @click.stop="openIntroductory">
            <u-parse :loading="false" :content="detailData.introductory" />
          </div>
        </div>
        <div class="text-sm mt-2 max-h-10vh overflow-y-scroll">
          <span class="">擅长：</span>
          <span class="text-gray-400 whitespace-pre-wrap" @click.stop="openSkilled">{{ detailData.skilled }}</span>
        </div>
        <div class="mt-2">
          <van-tag v-for="id of detailData.group_id" :key="id" class="mr-2" type="primary">{{
            teamGroupMap[id].title
          }}</van-tag>
        </div>
      </div>

      <div class="text-sm bg-white px-4 py-2 flex flex-1 flex-col">
        <div class="font-medium mb-4">评价（{{ pagination.total }}）</div>
        <div class="flex-1" id="comment-view">
          <scroll-view
            :refresher-enabled="false"
            :refresher-triggered="triggered"
            @refresherrestore="onRestore"
            @refresherrefresh="onRefresh"
            @scrolltolower="onScrolltolower"
            :scroll-y="true"
            :style="{ height: commentHeight + 'px' }"
          >
            <!-- :style="{ height: `calc(${getScrollViewHeight()})` }" -->
            <div v-for="(item, i) of commentList" :key="item.id">
              <div>
                <div class="w-full flex items-start">
                  <span class="text-gray-400 mr-2">{{
                    item.is_anonymity == 1 ? '匿名用户' : item.member_nickname
                  }}</span>
                  <van-rate readonly :value="item.grade" />
                </div>
                <div class="mt-2 whitespace-pre-wrap">{{ item.content }}</div>
                <div class="mt-2 text-gray-400 text-sm">{{ item.create_time | date }}</div>
              </div>
              <van-divider v-if="i < commentList.length - 1" />
            </div>
            <van-empty v-if="!commentList.length" description="暂无数据" />
          </scroll-view>
        </div>
      </div>
    </div>

    <!-- 简介overlay -->
    <van-overlay :show="showIntroductory" :z-index="100" @click="onClickHide">
      <view class="h-full flex justify-center items-center">
        <div class="w-70vw bg-white p-4 flex flex-col" @click.stop="stopFn">
          <div class="pb-2 -mx-4 font-medium text-base text-center mb-2 shadow-xl">简介</div>
          <scroll-view style="height: 60vh" scroll-y>
            <u-parse :loading="false" :content="detailData.introductory" />
          </scroll-view>
          <view class="text-center py-4 shadow-top -mb-4 -mx-4">
            <van-icon name="cross" class="text-3xl" @click.stop="onClickHide" />
          </view>
        </div>
      </view>
    </van-overlay>
    <!-- 擅长overlay -->
    <van-overlay :show="showSkilled" :z-index="100" @click="onClickHide">
      <view class="h-full flex justify-center items-center">
        <div class="w-70vw bg-white p-4 flex flex-col" @click.stop="stopFn">
          <div class="pb-2 -mx-4 font-medium text-base text-center mb-2 shadow-xl">擅长</div>
          <scroll-view style="height: 60vh" scroll-y>
            <div class="text-gray-400 whitespace-pre-wrap">{{ detailData.skilled }}</div>
          </scroll-view>
          <view class="text-center py-4 shadow-top -mb-4 -mx-4">
            <van-icon name="cross" class="text-3xl" @click.stop="onClickHide" />
          </view>
        </div>
      </view>
    </van-overlay>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPersonDetail, getPersonComment, attentionPerson, cancelAttentionPerson } from '@/apis'
export default {
  name: 'Evaluation',
  computed: {
    ...mapGetters(['teamGroupMap'])
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
      commentList: [],
      commentHeight: 100,
      showIntroductory: false,
      showSkilled: false,
      containerHeight: ''
    }
  },
  onLoad(opt) {
    this.id = opt.id
  },
  created() {},
  mounted() {
    console.log()
    this.containerHeight = this.getScrollViewHeight()
    this.getDetail()
    this.getComment()
    this.updateRect()
  },
  methods: {
    getDetail() {
      getPersonDetail(this.id).then((res) => {
        this.detailData = res.data.person
        this.$nextTick(() => {
          this.updateRect()
        })
      })
    },
    getComment() {
      this.showLoading = true
      getPersonComment(this.id, '', this.pagination.page)
        .then((res) => {
          const { list = [] } = res.data
          this.commentList = [...this.commentList, ...list]
          this.pagination.total = res.data.total || 0
        })
        .catch(() => {
          if (!this.pagination.page > 1) this.pagination.page -= 1
        })
        .finally(() => {
          this.showLoading = false
        })
    },
    updateRect() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#comment-view')
        .boundingClientRect((data) => {
          console.log(data)
          this.commentHeight = data.height
        })
        .exec()
    },
    onScrolltolower() {
      if (this.commentList.length >= this.pagination.total) return
      this.pagination.page += 1
      this.getComment()
    },
    onRefresh() {
      this.pagination.page = 1
      this.commentList = []
      this.getComment()
    },
    handleAttention() {
      attentionPerson(this.id).then((res) => {
        if (res.errno == 1) {
          this.toast({ type: 'success', message: '关注成功' })
          this.getDetail()
        } else {
          this.toast({ type: 'fail', message: res.message })
        }
      })
    },
    handleCancelAttention() {
      cancelAttentionPerson(this.id).then((res) => {
        if (res.errno == 1) {
          this.toast({ type: 'success', message: '取消关注成功' })
          this.getDetail()
        } else {
          this.toast({ type: 'fail', message: res.message })
        }
      })
    },
    openIntroductory() {
      this.showIntroductory = true
    },
    openSkilled() {
      this.showSkilled = true
    },
    onClickHide() {
      this.showIntroductory = false
      this.showSkilled = false
    },
    stopFn() {}
  }
}
</script>

<style lang="less" scoped>
.shadow-top {
  box-shadow: 0 -5px 10px 5px rgba(0, 0, 0, 0.1);
}
</style>
