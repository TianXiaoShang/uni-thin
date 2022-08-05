<template>
  <view class="w-full bg-white box-border p-5px relative flex items-center" >
    <div class="tabs-list w-full box-border pr-42px overflow-y-hidden whitespace-nowrap overflow-x-scroll">
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm" :class="{active: true}">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-10斤</div>
      <div class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm">5-15斤</div>
    </div>
    <div @click="show = !show" class="icon bg-white w-80px absolute right-0 h-full top-0 flex justify-end items-center" 
      style="font-size:0; background: linear-gradient(to right, rgba(255,255,255,0.1),rgba(255,255,255,1), rgba(255,255,255,1));"
    >
      <img src="/image/icon_shaixuan@3x.png" class="mr-10px w-26px h-26px" alt="">
    </div>

    <van-popup
      :show="show"
      position="top"
      :custom-style="`;top: ${statusBarHeight + navBarHeight}px`"
      safe-area-inset-top
      @close="onClose"
    >
    <div class="filte-list-wrap max-h-300px overflow-y-scroll bg-white box-border w-full p-15px">
      <div class="title text-md text-gray-500 mb-10px">
        性别
      </div>
      <div class="items">
        <div :class="{active: true}" class="inline-block tag mr-8px bg-gray-100 px-25px py-5px rounded-md text-gray-500 text-sm">男</div>
        <div class="inline-block tag mr-8px bg-gray-100 px-25px py-5px rounded-md text-gray-500 text-sm">女</div>
      </div>
      <div class="title text-md text-gray-500 mb-10px mt-15px">
        斤数
      </div>
      <div class="items">
        <div :class="{active: true}" class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">5-10斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">10-15斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">15-25斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">25-35斤</div>
        <div :class="{active: true}" class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">35-45斤</div>
      </div>
      <div class="title text-md text-gray-500 mb-10px mt-15px">
        疾病
      </div>
      <div class="items">
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">产品经理</div>
        <div :class="{active: true}" class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">程序员</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">设计师</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">设计师</div>
        <div :class="{active: true}" class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">设计师</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">设计师</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">设计师</div>
        <div class="inline-block mt-8px tag mr-8px bg-gray-100 px-12px py-5px rounded-md text-gray-500 text-sm">其他职业</div>
      </div>
    </div>
    <div class="btn flex p-15px justify-between">
      <van-button  type="default">重置</van-button>
      <van-button  color="#ED6C36">确定</van-button>
    </div>
    </van-popup>

    <!-- 假装顶部nav-bar,覆盖上面空的地方，用魔法打败魔法 -->
    <van-popup
      :show="true"
      position="top"
      :overlay="false"
      duration="0"
    >
     <nav-bar showBack :title="'成功案例'" :titlePos="'center'"></nav-bar>
    </van-popup>
  </view>
</template>

<script>
import { getStatusBarInfo } from '@/util/index.js'
export default {
  name: "Search",
  data() {
    return {
      show: false,
      statusBarHeight: 20 /* 状态栏高度 */,
      navBarHeight: 45 /* 导航栏高度 */,
    };
  },
  created(){
    const { statusBarHeight, navBarHeight, contentWidth } = getStatusBarInfo()
    this.statusBarHeight = statusBarHeight
    this.navBarHeight = navBarHeight
  },
  methods: {
    onClose(){
      console.log(1)
      this.show = false
    }
  }
};
</script>

<style lang='less' scoped>
.active{
  background: #ED6C36;
  color: white;
}
.btn van-button{
  border-radius: 5px;
  overflow: hidden;
  width: 48%;
}
.btn /deep/ button{
  border-radius: 5px;
  width: 100%;
  height: 40px !important;
}
</style>
