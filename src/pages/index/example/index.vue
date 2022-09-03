<template>
  <view class="page-wrap">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <loading v-show="loadDataLoading" />
    <nav-bar showBack :title="'成功案例'" :titlePos="'center'"></nav-bar>
    <filter-bar :group="group" :group-id="activeGroup" @update-group="handleUpdateGroup"></filter-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
      @scrolltolower="onScrolltolower"
      :scroll-y="true"
      class="page-container box-border bg-gray-100 w-full min-h-full relative"
      :style="{ height: `calc(${getScrollViewHeight(true, true, true, 36)})` }"
    >
      <div class="p-15px">
        <div
          class="w-full box-border relative z-99 bg-white rounded-xl overflow-hidden shadow-lg mb-15px"
          v-for="item in listData"
          :key="item.id"
        >
          <div class="inner p-15px" @click="toExampleDetail(item.id)">
            <title :title="item.title" :number="15"></title>
            <div class="text-gray-400 text-sm mt-10px font-normal leading-5 text-content">
              <u-parse :loading="false" :content="item.content" />
            </div>
            <images
              :sudoku="item.image_mode == 0"
              :images="item.image_mode == 0 ? item.across_picture : item.vertical_picture"
            ></images>
            <div class="tags flex flex-wrap mt-5px">
              <div v-for="g of item.group_id" :key="g" class="mr-8px text-xs tag py-2px mt-5px px-8px">
                # {{ groupMap[g].title }}
              </div>
            </div>
          </div>
          <control :canLove="true" :article-detail="item" @update="handleUpdateArticle"></control>
        </div>
        <van-empty v-if="!listData.length" description="暂无数据" />
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBar from '@/component/filter-bar/index'
import Title from './component/title'
import Control from './component/control'
import Images from './component/images'
import { getArticleExtra, getArticleList, getArticleDetail } from '@/apis'
export default {
  name: 'Example',
  computed: {
    ...mapGetters(['groupMap', 'group'])
  },
  components: { FilterBar, Title, Images, Control },
  data() {
    return {
      plateId: '',
      keyword: '',
      listData: [],
      pagination: {
        total: 0,
        page: 1
      },
      activeGroup: ''
    }
  },
  onLoad(opt) {
    this.plateId = opt.id
    this.getArticleOther()
    this.getList()
  },
  created() {},
  methods: {
    getArticleOther() {
      return getArticleExtra(this.plateId).then((res) => {
        const { group, marks } = res.data
        const groupData = Object.keys(group).map((k) => group[k])
        const markData = Object.keys(marks).map((k) => marks[k])
        this.$store.commit('UPDATE_GROUP', groupData)
      })
    },
    getList() {
      this.loadDataLoading = true
      getArticleList({
        plate_id: this.plateId,
        keyword: this.keyword,
        group_id: this.activeGroup,
        page: this.pagination.page
      })
        .then((res) => {
          console.log(res)
          this.listData = res.data.list
          this.pagination.total = res.data.total || 0
        })
        .catch(() => {
          if (!this.pagination.page > 1) this.pagination.page -= 1
        })
        .finally(() => {
          this.loadDataLoading = false
        })
    },
    // 刷新和滚动至底部处理
    onRefresh() {
      this.pagination.page = 1
      this.getList()
    },
    onScrolltolower() {
      if (this.listData.length >= this.pagination.total) return
      this.pagination.page += 1
      this.getList()
    },
    toExampleDetail(id) {
      uni.navigateTo({
        url: `/pages/index/example-detail/index?id=${id}`
      })
    },
    handleUpdateGroup(id) {
      this.activeGroup = id
      this.onRefresh()
    },
    handleUpdateArticle(id) {
      if (!id) return
      getArticleDetail(id).then((res) => {
        const { article } = res.data
        const idx = this.listData.findIndex((d) => d.id == id)
        if (idx == -1) return
        this.$set(this.listData, idx, article)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.text-content {
  display: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
  -webkit-box-orient: inherit; //必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
  text-overflow: ellipsis; //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.tag {
  color: rgb(237, 108, 54);
  background: rgba(237, 108, 54, 0.2);
  border-radius: 3px;
}
</style>
