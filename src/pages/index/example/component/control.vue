<template>
  <view class="flex wrap py-8px bg-white justify-around">
    <div class="icon flex items-center">
        <img class="w-22px h-22px" src="/image/zhuanfa.png" alt="">
        <span class="mt-2px text-gray-500 text-xs ml-5px">3324</span>
    </div>
    <div class="icon flex items-center">
        <img class="w-22px h-22px" src="/image/dianzan.png" alt="">
        <span class="mt-2px text-gray-500 text-xs ml-5px">433</span>
    </div>
    <div class="icon flex items-center" v-if="canLove">
        <img class="w-22px h-22px" v-if="loveActive" src="/image/love-active.png" alt="">
        <img class="w-22px h-22px" v-else src="/image/love.png" alt="">
        <span class="mt-2px text-gray-500 text-xs ml-5px">324</span>
    </div>
  </view>
</template>

<script>
export default {
  name: 'Control',
  props:{
    canLove: Boolean,
    loveActive: Boolean,
  },
  data() {
    return {
    }
  },
  onLoad() {
  },
  created() {
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>
.wrap{
    border-top: 1px solid #eee;
}
</style>
