<template>
  <view class="page-wrap">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loading || loadDataLoading" />
    <nav-bar showBack :title="'成功案例'" :titlePos="'center'"></nav-bar>
    <filter-bar></filter-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      scroll-y="true"
      class="page-container box-border bg-gray-100 w-full min-h-full relative"
      :style="{ height: `calc(${getScrollViewHeight(true, true, true, 36)})` }"
    >
        <div class="p-15px">
            <div @click="toExampleDetail" class="w-full box-border relative z-99 bg-white rounded-xl overflow-hidden shadow-lg mb-15px" v-for="item in 10" :key="item">
                <div class="inner p-15px">
                    <title :title="'32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈'" :number="15"></title>
                    <div class="text-gray-400 text-sm mt-10px font-normal leading-5 text-content">
                        32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，<br/>
                    </div>
                    <images :sudoku="true"></images>
                    <div class="tags flex flex-wrap mt-5px">
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 5斤</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 哺乳期</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 哈哈</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 厉害了</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 厉害了</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 厉害了</div>
                        <div class="mr-8px text-xs tag py-2px mt-5px px-8px"># 厉害了</div>
                    </div>
                </div>
                <control :canLove="true"></control>
            </div>
        </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import FilterBar from '@/component/filter-bar/index';
import Title from './component/title';
import Control from './component/control';
import Images from './component/images';
export default {
  name: 'Example',
  computed: {
    ...mapGetters([])
  },
  components:{FilterBar, Title, Images, Control},
  data() {
    return {
      list:[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,,1,1,1,1]
    }
  },
  onLoad() {
  },
  created() {
  },
  methods: {
    // 刷新和滚动至底部处理
    onRefresh() {
      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
    onScrolltolower() {
      // if ((this.currentPage + 1) * this.pageSize >= this.totalCount) {
      //   return;
      // }
      if (this.loadDataLoading) {
        return;
      }
      this.loadDataLoading = true;
      this.currentPage++;
      setTimeout(() => {
        this.loadDataLoading = false;
        this.list.push(...[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2])
      }, 1000);
    },
    toExampleDetail(){
        uni.navigateTo({
            url: '/pages/index/example-detail/index'
        })
    }
  }
}
</script>

<style lang="less" scoped>
.text-content{
    display: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
    -webkit-box-orient: inherit; //必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
    text-overflow: ellipsis; //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.tag{
    color: rgb(237,108,54);
    background: rgba(237,108,54, .2);
    border-radius: 3px;
}
</style>
