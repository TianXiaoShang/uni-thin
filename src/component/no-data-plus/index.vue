<template>
  <view class="wrapper" :style="{ 'margin-top': top + 'px' }">
    <div class="main-wrap">
      <div class="cover">
        <img
          :style="{
            width: imageWidth ? imageWidth : '750rpx',
            height: imageHeight ? imageHeight : '360rpx',
          }"
          mode="scaleToFill"
          :src="image"
          alt=""
        />
      </div>
      <p class="title" :style="{ color: titleColor ? titleColor : '#3FCDA0' }">
        {{ title }}
      </p>
      <p class="text-cont" :style="{ color: textColor ? textColor : '#999' }">
        {{ text }}
      </p>
    </div>
  </view>
</template>
<script>
export default {
  name: "NoDataPlus",
  props: {
    image: String,
    imageWidth: String,
    imageHeight: String,
    top: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    titleColor: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "",
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.wrapper {
  padding: 10px 0;
  .main-wrap {
    box-sizing: border-box;
    text-align: center;
    .cover {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 16px;
      margin-top: 25px;
      line-height: 22px;
      font-weight: bold;
    }
    .text-cont {
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
