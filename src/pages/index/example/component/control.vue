<template>
  <view class="flex wrap py-8px bg-white justify-around">
    <div class="icon flex items-center" @click="handleTransmit">
      <img class="w-22px h-22px" src="/image/zhuanfa.png" alt="" />
      <span class="mt-2px text-gray-500 text-xs ml-5px">{{ articleDetail.transmit || 0 }}</span>
    </div>
    <div class="icon flex items-center" @click="handleLike">
      <img v-if="articleDetail.is_like == 1" class="w-22px h-22px" src="/image/icon_dianzan_sel@3x.png" alt="" />
      <img v-else class="w-22px h-22px" src="/image/dianzan.png" alt="" />
      <span class="mt-2px text-gray-500 text-xs ml-5px">{{ articleDetail.like || 0 }}</span>
    </div>
    <div class="icon flex items-center" v-if="canLove" @click="handleCollect">
      <img class="w-22px h-22px" v-if="articleDetail.is_collect == 1" src="/image/love-active.png" alt="" />
      <img class="w-22px h-22px" v-else src="/image/love.png" alt="" />
      <span class="mt-2px text-gray-500 text-xs ml-5px">{{ articleDetail.collect || 0 }}</span>
    </div>
  </view>
</template>

<script>
import { addLike, removeLike, transmitArticle, addCollect, removeCollect } from '@/apis'
export default {
  name: 'Control',
  props: {
    articleDetail: Object,
    canLove: Boolean,
    loveActive: Boolean
  },
  data() {
    return {}
  },
  computed: {
    articleId() {
      return this.articleDetail?.id
    }
  },
  onLoad() {},
  created() {},
  methods: {
    emitUpdate() {
      this.$emit('update', this.articleId)
    },
    handleTransmit() {
      if (!this.articleId) return
      transmitArticle(this.articleId).then((res) => {
        if (res.errno == 1) {
          this.toast.success('转发成功')
          this.emitUpdate()
        }
      })
    },
    handleLike() {
      if (!this.articleId) return
      if (this.articleDetail.is_like == 0) {
        addLike(this.articleId).then((res) => {
          if (res.errno == 1) {
            this.toast.success('点赞成功')
            this.emitUpdate()
          }
        })
      } else {
        removeLike(this.articleId).then((res) => {
          if (res.errno == 1) {
            this.toast.success('取消点赞')
            this.emitUpdate()
          }
        })
      }
    },
    handleCollect() {
      if (!this.articleId) return
      if (this.articleDetail.is_collect == 0) {
        addCollect(this.articleId).then((res) => {
          if (res.errno == 1) {
            this.toast.success('收藏成功')
            this.emitUpdate()
          }
        })
      } else {
        removeCollect(this.articleId).then((res) => {
          if (res.errno == 1) {
            this.toast.success('取消收藏')
            this.emitUpdate()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  border-top: 1px solid #eee;
}
</style>
