<template>
  <view class="wrapper">
    <div class="main-wrap">
      <div class="cover" v-if="showImage">
        <img :src="image || img" alt="" />
      </div>
      <p class="theme-color title">{{ title }}</p>
      <p class="text-cont">{{ text }}</p>
    </div>
  </view>
</template>
<script>
import { ASSETS_BASE_URL } from '@/services/environment.service';
const img = ASSETS_BASE_URL + '/root/nodata2.png';
export default {
  name: "NoData",
  props: {
    showImage: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      img,
    }
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.wrapper {
  background: #fff;
  padding: 10px 0;
  .main-wrap {
    box-sizing: border-box;
    text-align: center;
    .cover{
      width: 750rpx;
      height: 360rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title{
      font-size: 16px;
      margin-top: 20px;
      line-height: 22px;
      font-weight: bold;
    }
    .text-cont{
      margin: 0px auto;
      font-size: 14px;
      margin-top: 10px;
      line-height: 20px;
      color: #999;
      width: 270px;
    }
  }
}
</style>
