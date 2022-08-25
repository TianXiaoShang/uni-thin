<template>
  <view class="flex wrap py-8px bg-white justify-around">
    <div class="icon flex items-center" @click="handleTransmit">
      <img class="w-22px h-22px" src="/image/zhuanfa.png" alt="" />
      <span class="mt-2px text-gray-500 text-xs ml-5px">{{ articleDetail.transmit || 0 }}</span>
    </div>
    <div class="icon flex items-center" @click="handleLike">
      <img v-if="articleDetail.is_like == 1" class="w-22px h-22px" src="/image/dianzan.png" alt="" />
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
    articleId: String,
    articleDetail: Object,
    canLove: Boolean,
    loveActive: Boolean
  },
  data() {
    return {}
  },
  onLoad() {},
  created() {},
  methods: {
    handleTransmit() {
      transmitArticle().then((res) => {
        if (res.errno == 1) {
          this.toast.success('成功')
        }
      })
    },
    handleLike() {
      if (this.articleDetail.is_like == 1) {
        addLike().then((res) => {
          if (res.errno == 1) {
            this.toast.success('成功')
          }
        })
      } else {
        removeLike().then((res) => {
          if (res.errno == 1) {
            this.toast.success('成功')
          }
        })
      }
    },
    handleCollect() {
      if (this.articleDetail.is_collect == 1) {
        addCollect().then((res) => {
          if (res.errno == 1) {
            this.toast.success('成功')
          }
        })
      } else {
        removeCollect().then((res) => {
          if (res.errno == 1) {
            this.toast.success('成功')
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
