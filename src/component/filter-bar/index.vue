<template>
  <view class="w-full bg-white box-border p-5px relative flex items-center">
    <div class="tabs-list w-full box-border pr-42px overflow-y-hidden whitespace-nowrap overflow-x-scroll">
      <div
        v-for="item of group"
        :key="item.id"
        class="inline-block tag mr-8px bg-gray-100 px-12px py-3px rounded-md text-gray-500 text-sm"
        :class="{ active: selectedKeys.includes(item.id) }"
        @click.stop="handleGroup(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      @click="show = !show"
      class="icon bg-white w-80px absolute right-0 h-full top-0 flex justify-end items-center"
      style="
        font-size: 0;
        background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
      "
    >
      <img src="/image/icon_shaixuan@3x.png" class="mr-10px w-26px h-26px" alt="" />
    </div>

    <!-- 真机上下面 van-popup 不需要计算顶部栏statusBarHeight高度-->
    <!-- :custom-style="`top: ${statusBarHeight + navBarHeight}px`" -->
    <van-popup
      :show="show"
      position="top"
      :custom-style="`top: ${statusBarHeight + navBarHeight}px`"
      @close="onClose"
      :lock-scroll="true"
    >
      <div class="filte-list-wrap max-h-300px overflow-y-scroll bg-white box-border w-full p-15px">
        <template v-for="item of filterData">
          <div :key="item.id" class="title text-md text-gray-500 mb-10px">{{ item.title }}</div>
          <div class="items" :key="item.id">
            <div
              v-for="d of item.children"
              :key="d.id"
              :class="{ active: selectedKeys.includes(d.id) }"
              class="inline-block tag mr-8px bg-gray-100 px-25px py-5px rounded-md text-gray-500 text-sm"
              @click.stop="handleSelect(d.id)"
            >
              {{ d.title }}
            </div>
          </div>
        </template>
      </div>
      <div class="btn flex p-15px justify-between">
        <van-button type="default" @click.stop="handleReset">重置</van-button>
        <van-button color="#ED6C36" @click.stop="handleConfirm">确定</van-button>
      </div>
    </van-popup>

    <!-- 假装顶部nav-bar,覆盖上面空的地方，用魔法打败魔法 -->
    <van-popup :show="true" position="top" :overlay="false" duration="0">
      <nav-bar :showBack="!show" :title="'成功案例'" :titlePos="'center'"></nav-bar>
    </van-popup>
  </view>
</template>

<script>
import { getStatusBarInfo } from '@/util/index.js'
export default {
  name: 'Search',
  props: {
    filterData: { type: Array, value: () => [] },
    groupIds: { type: Array }
  },
  computed: {
    group() {
      const arr = []
      this.filterData.forEach((d) => {
        arr.push(...d.children)
      })
      return arr
    }
  },
  data() {
    return {
      show: false,
      statusBarHeight: 20 /* 状态栏高度 */,
      navBarHeight: 45 /* 导航栏高度 */,
      selectedKeys: []
    }
  },
  created() {
    const { statusBarHeight, navBarHeight, contentWidth } = getStatusBarInfo()
    this.statusBarHeight = statusBarHeight
    this.navBarHeight = navBarHeight
    this.selectedKeys = this.groupIds || []
  },
  methods: {
    handleGroup(id) {
      // this.$emit('update-group', id)
      this.handleSelect(id)
      this.handleConfirm()
    },
    onClose() {
      this.show = false
    },
    handleSelect(id) {
      if (this.selectedKeys.includes(id)) {
        this.selectedKeys = this.selectedKeys.filter((d) => d != id)
      } else {
        this.selectedKeys = [...this.selectedKeys, id]
      }
    },
    handleReset() {
      this.selectedKeys = []
      this.show = false
      this.handleConfirm()
    },
    handleConfirm() {
      this.show = false
      this.$emit('confirm', this.selectedKeys.slice())
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background: #ed6c36;
  color: white;
}
.btn van-button {
  border-radius: 5px;
  overflow: hidden;
  width: 48%;
}
.btn /deep/ button {
  border-radius: 5px;
  width: 100%;
  height: 40px !important;
}
</style>
