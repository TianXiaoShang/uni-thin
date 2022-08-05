<template>
  <view class="flex justify-between">
    <div class="text-lg">
        {{title || 'titile将扩大开放啊就大师放假啊大家反馈啊接口了大师减肥'}}
    </div>
    <div class="icon -mr-15px pl-15px text-white" :style="{width: number.length + 2 + 'em', height: '30px', 'text-align': center, 'line-height': '30px'}">
        -{{number}}
        <span class="text-xs">斤</span>
    </div>
  </view>
</template>

<script>
export default {
  name: 'Title',
  props:{
    title: String,
    number: String,
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
.icon{
    background: linear-gradient(to right, rgba(237,108,54,0), rgba(237,108,54,.3));
    color: rgb(237,108,54);
}
</style>
