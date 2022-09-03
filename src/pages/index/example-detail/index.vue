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
        <title :title="articleDetail.title" :number="15"></title>
        <div class="text-gray-400 text-sm mt-10px font-normal leading-5">
          <u-parse :loading="false" :content="articleDetail.content" />
        </div>
        <images
          :sudoku="articleDetail.image_mode == 0"
          :images="articleDetail.image_mode == 0 ? articleDetail.across_picture : articleDetail.vertical_picture"
        ></images>
        <div class="tags flex flex-wrap mt-5px">
          <div v-for="g of articleDetail.group_id" :key="g" class="mr-8px text-xs tag py-2px mt-5px px-8px">
            # {{ groupMap[g].title }}
          </div>
        </div>
      </div>
    </scroll-view>
    <control :canLove="false" :article-detail="articleDetail" @update="handleUpdateArticle"></control>
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
    ...mapGetters(['groupMap'])
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
        .then((res) => {
          this.articleDetail = res.data.article
        })
        .finally(() => {
          this.loadDataLoading = false
        })
    },
    handleUpdateArticle(id) {
      if (!id) return
      getArticleDetail(id).then((res) => {
        this.articleDetail = res.data.article
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
