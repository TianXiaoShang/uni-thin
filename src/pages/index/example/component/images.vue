<template>
  <view class="flex justify-between w-full">
    <div class="w-8/9 flex justify-between flex-wrap mt-15px image-list-wrap">
      <div class="w-1/3 inline-block" use-slot v-for="(img, i) of images" :key="img">
        <div
          @click.stop="onPreview(i)"
          class="isImg mb-10px bg-center bg-no-repeat bg-cover"
          :class="{ longImg: !sudoku }"
          :style="{ 'background-image': `url(${img})` }"
        ></div>
      </div>
      <!-- <div class="w-1/3 inline-block" use-slot>
            <div @click="onPreview" class="isImg mb-10px bg-center bg-no-repeat bg-cover" :class="{'longImg': !sudoku}" :style="{'background-image': `url(${'https://img.yzcdn.cn/vant/cat.jpeg'})`}"></div>
        </div>
        <div class="w-1/3 inline-block" use-slot>
            <div @click="onPreview" class="isImg mb-10px bg-center bg-no-repeat bg-cover" :class="{'longImg': !sudoku}" :style="{'background-image': `url(${'https://img.yzcdn.cn/vant/cat.jpeg'})`}"></div>
        </div>
        <div class="w-1/3 inline-block" use-slot>
            <div @click="onPreview" class="isImg mb-10px bg-center bg-no-repeat bg-cover" :class="{'longImg': !sudoku}" :style="{'background-image': `url(${'https://img.yzcdn.cn/vant/cat.jpeg'})`}"></div>
        </div>
        <div class="w-1/3 inline-block" use-slot>
            <div @click="onPreview" class="isImg mb-10px bg-center bg-no-repeat bg-cover" :class="{'longImg': !sudoku}" :style="{'background-image': `url(${'https://img.yzcdn.cn/vant/cat.jpeg'})`}"></div>
        </div> -->
    </div>
  </view>
</template>

<script>
export default {
  name: 'Images',
  props: {
    sudoku: Boolean,
    images: Array
  },
  data() {
    return {
      showImages: []
    }
  },
  onLoad() {},
  created() {
    if (!this.sudoku) {
      this.showImages = this.images.splice(0, 3)
    }
  },
  methods: {
    onPreview(idx) {
      uni.previewImage({
        urls: this.images,
        current: idx
      })
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  background: linear-gradient(to right, rgba(237, 108, 54, 0), rgba(237, 108, 54, 0.3));
  color: rgb(237, 108, 54);
}
.isImg {
  width: calc(100% - 10px);
  height: 0;
  padding-bottom: calc(100% - 10px);
}
.longImg {
  padding-bottom: calc(200% - 10px) !important;
}
.image-list-wrap::after {
  content: '';
  flex: auto;
}
</style>
