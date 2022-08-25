<template>
  <view class="page-wrap">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loadDataLoading" />
    <nav-bar showBack :title="'案例详情'" :titlePos="'center'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      scroll-y="true"
      class="page-container box-border bg-white w-full min-h-full relative"
      :style="{ height: `calc(${getScrollViewHeight(true, true, true, 39)})` }"
    >
      <div class="p-15px pb-15px">
        <title :title="'32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈'" :number="15"></title>
        <div class="text-gray-400 text-sm mt-10px font-normal leading-5">
          32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，32岁，哺乳妈妈，三个月内成功哺乳妈妈，<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，<br />
          三个月内成功瘦掉1515斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
          三个月内成功瘦掉15斤哈哈32岁，哺乳妈妈，三个月内成功瘦掉15斤哈哈<br />
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
    </scroll-view>
    <control :canLove="false"></control>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBar from '@/component/filter-bar/index'
import Title from '../example/component/title'
import Control from '../example/component/control'
import Images from '../example/component/images'
import { getArticleDetail } from '@/apis'

export default {
  name: 'Example',
  computed: {
    ...mapGetters([])
  },
  components: { FilterBar, Title, Images, Control },
  data() {
    return {
      id: '',
      articleDetail: {}
    }
  },
  onLoad(opt) {
    this.id = opt.id
    this.getData()
  },
  created() {},
  methods: {
    getData() {
      this.loadDataLoading = true
      getArticleDetail(this.id)
        .then(() => {
          this.articleDetail = res.data
        })
        .finally(() => {
          this.loadDataLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  color: rgb(237, 108, 54);
  background: rgba(237, 108, 54, 0.2);
  border-radius: 3px;
}
</style>
